import React, { useState, useCallback, useRef, useEffect } from 'react'
import { TextField, Button, CircularProgress, Checkbox, FormControlLabel } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';

import InputAdornment from '@mui/material/InputAdornment';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import RotateRightIcon from '@mui/icons-material/RotateRight';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LinearProgress from '@mui/material/LinearProgress';


import useWindowSize from '../../hooks/useWindowSize'
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import validationRules from '../../config/isValid';
import Joi from 'joi';
import { useNavigate, useParams } from 'react-router-dom';

import Cropper from 'react-easy-crop'
import { getCroppedImg, getRotatedImg } from '../EditImage/cropImage'
import FilterView from '../EditImage/FilterView'
import compressImage from '../EditImage/compressImage';
import uploadImageCloudinary from '../EditImage/uploadCloudinary';
import processImageAI from '../EditImage/aiAlgorithm'

import processTextAI from '../AnalyzeText/AIText';

import { Avatar, } from '@mui/material'

const Add = () => {

  const [width,] = useWindowSize()
  const navigate = useNavigate()

  const { postId: pid } = useParams()
  const [ postID, setPostID ] = useState(null)

  const [selectedImage, setSelectedImage] = React.useState("");
  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [imageUploadingStatus, setImageUploadingStatus] = useState(false)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const [imageError, setImageError] = useState(null)
  const imageInputRef = useRef(null);

  const [postinfo, setpostinfo] = useState(null)
  const [picError, setPicError] = useState(null)
  const [postPic, setPostPic] = useState(null)

  const [pic, setPic] = useState(null)

  const GET_CONTENT_QUERY = gql`
    query GetContent($contentInput:ContentInput){
      getContent(contentInput:$contentInput){
        post{
          text
          textAIAnalysis
          image{
            imgid url icon_url thumb_url 
            identifiedAs isSafe
          }
        } 
      }
    }
  `;

  const ADD_CONTENT_QUERY = gql`
    mutation AddContent($contentInput:ContentInput) {
      addContent(contentInput:$contentInput)
    }
  `;

  const [doloadPost,{ data, loading, error }] = useLazyQuery(GET_CONTENT_QUERY, { fetchPolicy: "network-only" })
  const [doAddContent, { data: data1, loading: loading1, error: error1 }] = useMutation(ADD_CONTENT_QUERY, { fetchPolicy: "network-only" })

  const addPostSchema = Joi.object({
    text: Joi.string().min(12).max(2000),
    textAIAnalysis:Joi.any()
  })

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImage.url,
        croppedAreaPixels,
      )
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, selectedImage.url,])

  const showRotatedImage = useCallback(async () => {
    try {
      const croppedImage = await getRotatedImg(
        selectedImage.url, croppedAreaPixels, rotation
      )
      setSelectedImage({ ...selectedImage, url: croppedImage })
    } catch (e) {
      // console.error(e)
    }
  }, [croppedAreaPixels, setSelectedImage, selectedImage, rotation,])

  useEffect(() => { showRotatedImage() }, [rotation])

  const onUploadImage = async () => {

    setImageUploadingStatus(true)
    
    const UploadResponse = await uploadImageCloudinary(croppedImage, true, true)

    if (UploadResponse) {
      
      setImageUploadingStatus(false)
      
      const image = {
        imgid: 1,
        url: UploadResponse.url,
        icon_url: UploadResponse.icon_url,
        thumb_url:UploadResponse.thumb_url,
        identifiedAs: pic.identifiedAs,
        isSafe: pic.isSafe,
      }

      setPostPic(image)

      doAddContent({
        variables: {
          contentInput:{
            type:"POST",
            operation:"ADD",
            postInput:{
              postId:postID,
              textAIAnalysis:postinfo && postinfo.textAIAnalysis?postinfo.textAIAnalysis:"",
              text:postinfo && postinfo.text?postinfo.text:"",
              image:image 
            }
          }
        },
        fetchPolicy: "network-only"
      })

      setOpenImageModal(false);

    }

  }

  useEffect(()=>{

    if (data1 && data1.addContent) { 
      const result = data1.addContent
      if(result == "success"){
        navigate("/post/"+postID)
      }else{
        setPostID(result)
      }
    }
  
  },[ data1 ])

  if(error1){console.log("error1",error1)}

  useEffect(()=>{ 
    if(postID){ navigate("/add/edit/"+postID, { replace: true }) }
  }, [ postID ])

  useEffect(()=>{ if(pid){ setPostID(pid) } },[pid])

  useEffect(()=>{

    if(pid){
      doloadPost(
        {
          variables:{
            contentInput:{
              type:"POST",
              operation:"ADD",
              postInput:{
                postId: pid,
              }
            }
          }
        }
      )
  

    }
  },[doloadPost])

  useEffect(()=>{

    if (data) {
      if (data && data.getContent) {
        const { text, image, textAIAnalysis } = data.getContent.post
        setPostPic(image)
        setpostinfo({
          text:text?text:"",
          textAIAnalysis:textAIAnalysis?textAIAnalysis:""
        })
      }
    }

  }, [data, setPostID])

  if (error) { console.log("error", error) }

  useEffect(() => {

    const loadImageAI = async () => {
      
      try {
      
        if (croppedImage) {

          let AIResponse = await processImageAI(croppedImage)

          const { identifiedAs } = AIResponse

          if (identifiedAs != "porn" && identifiedAs != "hentai") {
            setPic({ ...AIResponse, isSafe: true })
          }
          else { 
            throw Error("Identifed as " + identifiedAs) 
          }

        }
      }
      catch (e) {
        setImageError(e.message)
      }
    }

    loadImageAI()

  }, [croppedImage])

  const imageModalView = (mode) => {

    let modalContent = {}

    if (croppedImage) {

      modalContent = <div>
        <div style={{ display: "flex" }}>
          <div style={{ border: "1px solid #fff", display: "flex", justifyContent: 'center', flexDirection: 'column' }}>
            <FilterView
              filter={"Original"}
              height={200}
              width={200}
              image={croppedImage} />
          </div>
        </div>
        <div style={{ padding: 5, paddingBottom: 2 }}>
          {
            imageError ?
              <div style={{ color: "red", width:250 }}>
                Error : {imageError}
              </div>
              :
              <div style={{ color: "green" }}>
                {pic && pic.isSafe ?
                  <div style={{ color: "green" }}>
                    Image is safe
                  </div>
                  :
                  <div style={{ width: 180, padding: 5, color: "#1976d2" }}>
                    <div>
                      <LinearProgress />
                    </div>
                    <div>
                      Validating image with A.I.
                    </div>
                  </div>
                }
              </div>
          }
        </div>
        <div style={{ padding: 5, paddingBottom: 10 }}>
          {
            imageUploadingStatus ?
              <div style={{ width: 180, padding: 5, color: "#1976d2" }}>
                <div>
                  <LinearProgress />
                </div>
                <div>
                  Uploading
                </div>
              </div>
              :
              <div></div>
          }
        </div>
        <div style={{ display: "flex" }}>
          <Button
            disabled={!pic}
            onClick={() => {
              onUploadImage()
            }}
            style={{ textTransform: 'none', }}
            variant="contained" >Upload</Button>
        </div>
      </div>

    }
    else {
      
      modalContent = <div>
        <div
          style={{
            position: 'relative',
            width: 240,
            height: 240,
            background: '#333',
          }}
        >
          <Cropper
            image={selectedImage.url}
            crop={crop}
            zoom={zoom}
            onRotationChange={setRotation}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div style={{ display: "flex", paddingTop: 10 }}>
          <div>
            <Button
              style={{ textTransform: 'none', border: "1px solid #efefef" }}
              size='small'
              onClick={() => {
                setRotation(rotation - 90)
              }}
              startIcon={<RotateLeftIcon />}
              variant="outlined"
              color="primary"
            >
              Left Rotate
            </Button>
          </div>
          <div style={{ flexGrow: 1 }}></div>
          <div>
            <Button
              style={{ textTransform: 'none', border: "1px solid #efefef" }}
              size='small'
              onClick={() => {
                setRotation(rotation + 90)
              }}
              variant="outlined"
              color="primary"
              endIcon={<RotateRightIcon />}
            >
              Right Rotate
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", paddingTop: 10 }}>
          <div>
            <Button
              style={{ textTransform: 'none' }}
              size='medium'
              onClick={() => {
                showCroppedImage();
              }}
              variant="contained"
              color="primary"
            >
              Crop & Continue
            </Button>
          </div>
        </div>
      </div>
    }

    return <Modal
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: "#fff",
        width: (mode == "DESKTOP")?"80%":"100%",
        height: (mode == "DESKTOP")?"80%":"100%",
        bgcolor: 'background.paper',
        border: '2px solid #efefef',
        boxShadow: 24,
        p: 4,
      }}
      open={openImageModal}
      onClose={() => { setOpenImageModal(false) }}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div style={{ display: "flex", height: (mode == "DESKTOP")?"100%":"100%", justifyContent: "center" }}>
        <div style={{ background: "#fff", width: "100%", height: "100%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}>
            </div>
            <div style={{ fontSize: 24, padding: 5, paddingTop:15 }}> {(croppedImage) ? "Uploading " :"Crop"} </div>
            <div style={{ flexGrow: 1 }}></div>
            <div>
              <IconButton
                color="error" 
                style={{ textTransform: "none" }}
                onClick={() => {
                  navigate(0)
                }}>
                <CancelIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "80%" }}>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
              {modalContent}
            </div>
          </div>
        </div>
      </div>
    </Modal>

  }


  const onDeleteContent = async () => {

    doAddContent({
      variables: {
        contentInput:{
          type:"POST",
          operation:"DELETE",
          postInput:{
            postId: postID,
          }
        }
      },
      fetchPolicy: "network-only"
    })


  }


  const onAddContent = async () => {

    let errorValid = false

    if(pid){
      errorValid = addPostSchema.validate(postinfo).error
    }

    if (!errorValid) {

      let ai_text = null
      let uploadedImage = null
  
      if(postID){

        const ai_analysis = await processTextAI(postinfo.text, "POST")
        ai_text = ai_analysis.ai.result
        ai_text = ai_text.match(/\{[\s\S]*\}/);

        if (ai_text) {
          ai_text = JSON.parse(ai_text[0]);
          console.log(ai_text);
          
        }else{
          ai_text = null
        } 
        

        ai_text = JSON.stringify(ai_text)
        console.log("ai_text2 : ",ai_text)

      }
      
      if(postPic){

        uploadedImage = {
          imgid: 1,
          url: postPic.url,
          icon_url: postPic.icon_url,
          thumb_url:postPic.thumb_url,
          identifiedAs: postPic.identifiedAs,
          isSafe: postPic.isSafe,
        }

      }

      doAddContent({
        variables: {
          contentInput:{
            type:"POST",
            operation:"ADD",
            postInput:{
              postId: postID,
              text: postinfo.text,
              textAIAnalysis: ai_text,
              image: uploadedImage
            }
          }
        },
        fetchPolicy: "network-only"
      })

    }
    else {
      setPicError({ message: errorValid.message })
    }
  }
 
  const wrapButtonView = ({ text, size, color }) => {
    return <div style={{ padding: 5 }}>
      <Button
        color={color} size={size}
        onClick={() => { onAddContent() }}
        style={{ textTransform: 'none', fontSize: 14 }}
        variant="contained">
        {text}
      </Button>
    </div>
  }

  const wrapImage = ({ height, id, imgurl, ar }) => {

    const handleChange = async (e, id) => {

      setOpenImageModal(true)

      const targetFile = e.target.files[0]
      const optionImage = { maxSizeMB: 4, maxWidthOrHeight: 2024, useWebWorker: true, }
      const image = await compressImage(targetFile, optionImage)

      setSelectedImage({ id: id, url: URL.createObjectURL(image), ar: ar })

    }

    if (postPic && postPic.imgid == 1) {

      return <div>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          badgeContent={
            <div style={{ width: 50, paddingLeft: 20 }}>
              <IconButton 
                style={{ background: "#efefef" }}
                onClick={() => imageInputRef.current.click()} 
              >
                <input hidden accept="image/*" type="file"
                  ref={imageInputRef}
                  onChange={(e) => {
                    handleChange(e, id)
                  }}
                />
                <EditIcon sx={{ fontSize:16 }} />
              </IconButton>
            </div>
          }
        >
          <FilterView
            filter={"Original"}
            height={height}
            width={height}
            image={postPic.url} />
        </Badge>
      </div>
    }

    return <div>
      <div style={{ width: height, display: "flex", justifyContent: "center", height: height, border:"1px solid #efefef", borderRadius:5 }}>
        <IconButton style={{ width:  "100%" , height: "100%" }} color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file"
            onChange={(e) => {
              handleChange(e, id)
            }} />
          <PhotoCamera />
        </IconButton>
      </div>
    </div>



  }

  const getDesktopView = () => {
    return <div style={{ display: "flex", justifyContent: "center", border:"1px solid #fff" }}>
      {!error?  
        <div>
          {imageModalView("DESKTOP")}
          <div style={{ fontSize: 22, paddingBottom: 5, padding: 5, paddingLeft: 7 }}>{postID?'Publish/Edit':'Create New'}</div>
          <div style={{ height: "75vh", overflowY: "auto", }}>
            <div style={{display:"flex"}}>
              <div style={{ paddingLeft: 7, width: 500, paddingTop: 10 }}>
                <TextField fullWidth
                  style={{ fontSize:12, color:"#000" }}
                  value={postinfo && postinfo.text}
                  onChange={(e) => {
                    setpostinfo({ ...postinfo, text: e.target.value })
                  }}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Add content for discussion, and please be specific if possible." 
                  label="Content" 
                  multiline rows={9} defaultValue="" />
                  <div style={{ border:"1px solid #fff", display:"flex" }}>
                    <div style={{flexGrow:1}}></div>
                    <div>
                      {postinfo && postinfo.text.length+"/2000"}
                    </div>
                  </div>
              </div>
              <div style={{ border: "1px solid #fff", display: "flex", paddingLeft: 20, paddingTop: 20, }}>
                <div>
                  {wrapImage({ height: 120, id: 1, ar: 3 / 3, })}
                </div>
              </div>
            </div>
            <div style={{ padding: 2, color: "red", width: 500 }}>
              {picError && "Error : " + picError.message || error1 && "Error : " + error1.message}
            </div>
            <div style={{ padding: 2, color: "green", width: 500 }}>
              {data1 ? "Post created successfully" : ""}
            </div>
            <div style={{ display: "flex", padding: 5 }}>
              {
                postID?
                <FormControlLabel
                value="blockchain"
                control={<Checkbox onChange={(e)=>{console.log(e.target.checked)}} size='small' />}
                label="Add to Blockchain"
                labelPlacement="right"
                />:""
              }
            </div>
            <div style={{ display: "flex", padding: 5 }}>
              {wrapButtonView({ text: postID?'Publish':'Create New', size: "small",  color:"primary" })}
              {postID?wrapButtonView({ text: 'Delete', size: "small", color:"error" }):""}
            </div>
          </div>
        </div>
        :
        <div>
          Post not found
        </div>
      }
    
    </div>
  }

  const getMobileView = () => {
    return <div style={{ height: "80vh", padding: 10, overflowY: "scroll", overflowX: 'hidden', border:"1px solid #fff" }}>
      <div>
        {imageModalView("MOBILE")}
        <div style={{ fontSize:20, display: "flex", flexDirection: "column", paddingLeft:20, padding:10, paddingLeft:15 }}>
          {postID?'Publish':'Create New'}
        </div>
        <div style={{ paddingLeft: 7, border: "1px solid #fff", padding: 10 }}>
          <TextField fullWidth
            value={postinfo && postinfo.text}
            onChange={(e) => {
              setpostinfo({ ...postinfo, text: e.target.value })
            }}
            InputLabelProps={{ shrink: true }} 
            placeholder="Add content for discussion, and please be specific if possible." 
            label="Content" multiline rows={10} defaultValue="" />
        </div>
        <br/>
        <div style={{ border:"1px solid #fff", display:"flex" }}>
          <div style={{flexGrow:1}}></div>
          <div>
            {postinfo && postinfo.text.length+"/2000"}
          </div>
        </div>
        <div style={{ padding: 5, border:"1px solid #fff", display:"flex", justifyContent:"left" }}>
          <div style={{ paddingLeft:10 }}>
            {wrapImage({ height: 80, id: 1, ar: 3 / 3, })}          
          </div>
        </div>
        <div style={{ padding: 5, color: "red", width: 250 }}>
          {picError && "Error : " + picError.message || error1 && "Error : " + error1.message}
        </div>
        <div style={{ padding: 5, color: "green", width: 250 }}>
          {data1 ? "Post created successfully" : ""}
        </div>
        <div style={{ display: "flex", padding: 5 }}>
          {wrapButtonView({ text: postID?'Publish':'Create New', size: "medium" })}
        </div>
      </div>
    </div>
  }


  return (
    <div style={{}}>
      {
        loading || loading1 ?
          <div style={{ display: "flex", justifyContent: "center", height: "100%", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          </div>
          :
          <div>
            {(width > 600 ? getDesktopView() : <></>)}
            {(width < 600 ? getMobileView() : <></>)}
          </div>
      }
    </div>
  )
}

export default Add