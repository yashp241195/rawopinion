import React, { useState, useCallback, useRef, useEffect } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
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
import { useQuery, useMutation, gql } from '@apollo/client';
import validationRules from '../../config/isValid';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

import Cropper from 'react-easy-crop'
import { getCroppedImg, getRotatedImg } from '../EditImage/cropImage'
import FilterView from '../EditImage/FilterView'
import compressImage from '../EditImage/compressImage';
import uploadImageCloudinary from '../EditImage/uploadCloudinary';
import processImageAI from '../EditImage/aiAlgorithm'


import { Avatar, } from '@mui/material'

const EditProfile = () => {

  const [width,] = useWindowSize()
  const navigate = useNavigate()

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

  const [profileinfo, setProfileInfo] = useState(null)
  const [profileError, setProfileError] = useState(null)
  const [profilePic, setProfilePic] = useState(null)

  const [pic, setPic] = useState(null)

  const GET_PROFILE_INFO_QUERY = gql`
    query GetProfileInfo{
      getProfileInfo{
        firstname lastname 
        bio location
        profilePic{
          imgid url icon_url 
          identifiedAs filter 
          isProfileSafe isSafe
          neutral porn drawing sexy hentai
        }
      }
    }
  `;

  const EDIT_PROFILE_INFO_QUERY = gql`
    mutation EditProfileInfo($profileInfoInput:EditProfileInfoInput) {
      editProfileInfo(profileInfoInput:$profileInfoInput)
    }
  `;

  const UPLOAD_IMAGE_QUERY = gql`
    mutation uploadImage($image:ImageInput) {
      uploadImage(image:$image)
    }
  `;

  const [doUploadImage, { data: data2, loading: loading2, error: error2 }] = useMutation(UPLOAD_IMAGE_QUERY, { fetchPolicy: "network-only" })

  const { data, loading, error } = useQuery(GET_PROFILE_INFO_QUERY, { fetchPolicy: "network-only" })
  const [doChangeProfileInfo, { data: data1, loading: loading1, error: error1 }] = useMutation(EDIT_PROFILE_INFO_QUERY, { fetchPolicy: "network-only" })

  const changeProfileSchema = Joi.object({
    firstname: validationRules.firstname,
    lastname: validationRules.lastname,
    bio: validationRules.bio,
    location: validationRules.location,
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
        selectedImage.url,
        croppedAreaPixels,
        rotation
      )
      setSelectedImage({ ...selectedImage, url: croppedImage })
    } catch (e) {
      // console.error(e)
    }
  }, [croppedAreaPixels, setSelectedImage, selectedImage, rotation,])

  useEffect(() => { showRotatedImage() }, [rotation])

  const onUploadImage = async () => {

    setImageUploadingStatus(true)
    
    const UploadResponse = await uploadImageCloudinary(croppedImage, true, false)
    
    if (UploadResponse) {
      
      setImageUploadingStatus(false)
      // console.log("UploadResponse",UploadResponse)

      doUploadImage({
        variables: {
          image: {
            imgid: 1,
            url: UploadResponse.url,
            icon_url: UploadResponse.icon_url,
            filter: "Original",
            identifiedAs: pic.identifiedAs,
            isProfileSafe: pic.isSafeProfilePic,
            isSafe: pic.isSafe,
            porn: pic.nude_detection.porn,
            drawing: pic.nude_detection.drawing,
            sexy: pic.nude_detection.sexy,
            hentai: pic.nude_detection.hentai,
            neutral: pic.nude_detection.neutral,
          }
        },
        fetchPolicy: "network-only"
      })

      setOpenImageModal(false);

    }

  }

  if (data2) { navigate(0) }

  // if (data1) {
  //   console.log("data1", data1)
  // }

  // if (error1) {
  //   console.log("error1", error1)
  // }

  if (data) {
    if (!profileinfo) {

      const {
        bio, firstname, lastname, location, profilePic,
      } = data.getProfileInfo

      setProfileInfo({
        bio, firstname, lastname, location
      })

      setProfilePic(profilePic)

    }
  }

  if (error) { console.log("error", error) }

  useEffect(() => {

    const loadImageAI = async () => {
      try {
        if (croppedImage) {

          let AIResponse = await processImageAI(croppedImage)
          const { face_count, identifiedAs, first_face_accuracy } = AIResponse
          // console.log("AIResponse",AIResponse)

          if (face_count != 1) { throw Error("Profile picture must feature the face of exactly one person") }
          if (first_face_accuracy <= 0.8) { throw Error("Face must be properly visible") }
          if (identifiedAs == "neutral" || identifiedAs == "sexy") {
            setPic({ ...AIResponse, isSafe: true })
          }
          else { throw Error("Identifed as " + identifiedAs) }

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
                  <div style={{ width: 250, padding: 5, color: "#1976d2" }}>
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
              <div style={{ width: 250, padding: 5, color: "#1976d2" }}>
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

  const onChangeEditProfile = () => {

    const { profilePic, ...profileinfo2 } = profileinfo

    const errorValid = changeProfileSchema.validate(profileinfo2).error

    if (!errorValid) {
      // console.log(profileinfo2)

      doChangeProfileInfo({
        variables: {
          profileInfoInput: {
            ...profileinfo2,
          },
        },
        fetchPolicy: "network-only",
      })
    }
    else {
      setProfileError({ message: errorValid.message })
    }
  }

  const wrapTextInputItem = (item) => {

    const {
      label, value, width, marginLeft, defaultValue,
      size, min, max, endlabel } = item

    return <TextField
      value={profileinfo && profileinfo[value] || ""}
      style={{ marginLeft: marginLeft, width: width }}
      defaultValue={defaultValue}
      onChange={(e) => { setProfileInfo({ ...profileinfo, [value]: e.target.value }) }}
      size={size} label={label}
      type="text" variant="outlined"
    />
  }

  const wrapButtonView = ({ text, size }) => {
    return <div style={{ padding: 5 }}>
      <Button
        color="primary" size={size}
        onClick={() => { onChangeEditProfile() }}
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

    if (profilePic && profilePic.imgid == 1) {

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
            image={profilePic.url} />
        </Badge>
      </div>
    }

    return <div>
      <div style={{ width: 130, display: "flex", justifyContent: "center", height: 130, border:"1px solid #efefef", borderRadius:5 }}>
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
    return <div style={{ display: "flex", justifyContent: "center", }}>
      <div>
        {imageModalView("DESKTOP")}
        <div style={{ fontSize: 22, paddingBottom: 15, padding: 5, paddingLeft: 7 }}>EditProfile</div>
        <div style={{ height: "65vh", overflowY: "auto", }}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", padding: 5, paddingLeft: 4 }}>
                {wrapTextInputItem({ label: "First Name", size: "small", value: "firstname", width: 180, marginLeft: 5 })}
              </div>
              <div style={{ display: "flex", padding: 5, paddingLeft: 4 }}>
                {wrapTextInputItem({ label: "Last Name", size: "small", value: "lastname", width: 180, marginLeft: 5 })}
              </div>
              <div style={{ display: "flex", padding: 5, paddingLeft: 4 }}>
                {wrapTextInputItem({ label: "Location", size: "small", value: "location", width: 180, marginLeft: 5 })}
              </div>
            </div>
            <div style={{ border: "1px solid #fff", display: "flex", paddingLeft: 20, paddingTop: 10 }}>
              <div>
                {wrapImage({ height: 130, id: 1, ar: 3 / 3, })}
              </div>
            </div>
          </div>
          <div style={{ paddingLeft: 7, width: 470, paddingTop: 15 }}>
            <TextField fullWidth
              value={profileinfo && profileinfo.bio}
              onChange={(e) => {
                setProfileInfo({ ...profileinfo, bio: e.target.value })
              }}
              InputLabelProps={{ shrink: true }} 
              placeholder='Write something about yourself' label="Bio" 
              multiline rows={4} defaultValue="" />
          </div>

          <div style={{ padding: 5, color: "red", width: 500 }}>
            {profileError && "Error : " + profileError.message || error1 && "Error : " + error1.message}
          </div>
          <div style={{ padding: 5, color: "green", width: 500 }}>
            {data1 ? "Profileinfo successfully changed" : ""}
          </div>
          <div style={{ display: "flex", padding: 5 }}>
            {wrapButtonView({ text: 'Update Profile', size: "medium" })}
          </div>
        </div>

      </div>
    </div>
  }

  const getMobileView = () => {
    return <div style={{ height: "80vh", padding: 5, overflowY: "scroll", overflowX: 'hidden' }}>
      <div>
        {imageModalView("MOBILE")}
        <div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: 10, }}>
          <div style={{ padding: 5 }}>
            {wrapTextInputItem({ label: "First Name", size: "small", value: "firstname", })}
          </div>
          <div style={{ padding: 5 }}>
            {wrapTextInputItem({ label: "Last Name", size: "small", value: "lastname", })}
          </div>
          <div style={{ padding: 5 }}>
            {wrapTextInputItem({ label: "Location", size: "small", value: "location", })}
          </div>
        </div>
        <div style={{ padding: 5, border:"1px solid #fff", display:"flex", justifyContent:"left" }}>
          <div style={{ paddingLeft:10 }}>
            {wrapImage({ height: 170, id: 1, ar: 3 / 3, })}          
          </div>
          
        </div>

        <div style={{ paddingLeft: 7, border: "1px solid #fff", padding: 10 }}>
          <TextField fullWidth
            value={profileinfo && profileinfo.bio}
            onChange={(e) => {
              setProfileInfo({ ...profileinfo, bio: e.target.value })
            }}
            InputLabelProps={{ shrink: true }} placeholder='Write something about yourself'
            label="Bio" multiline rows={8} defaultValue="" />
        </div>
        <div style={{ padding: 5, color: "red", width: 250 }}>
          {profileError && "Error : " + profileError.message || error1 && "Error : " + error1.message}
        </div>
        <div style={{ padding: 5, color: "green", width: 250 }}>
          {data1 ? "Profileinfo successfully changed" : ""}
        </div>
        <div style={{ display: "flex", padding: 5 }}>
          {wrapButtonView({ text: 'Update Profile', size: "medium" })}
        </div>
      </div>
    </div>
  }


  return (
    <div style={{}}>
      {
        !loading ?
          <div>
            {(width > 600 ? getDesktopView() : <></>)}
            {(width < 600 ? getMobileView() : <></>)}
          </div>
          :
          <div style={{ display: "flex", justifyContent: "center", height: "100%", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          </div>
      }
    </div>
  )
}

export default EditProfile