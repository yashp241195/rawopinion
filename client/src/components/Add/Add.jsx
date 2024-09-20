import React, { useState, useCallback} from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import InputAdornment from '@mui/material/InputAdornment';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import useWindowSize from '../../hooks/useWindowSize'
import { useQuery, useMutation, gql } from '@apollo/client';
import validationRules from '../../config/isValid';
import Joi from 'joi';
import ImageGalleryContext from './Utils/ImageGalleryContext';
import { useNavigate } from 'react-router-dom';

import Cropper from 'react-easy-crop'
import { getCroppedImg, getRotatedImg } from '../EditImage/cropImage'
import FilterView from '../EditImage/FilterView'



const EditProfile = () => {

  const [width,] = useWindowSize()
  const navigate = useNavigate()




  const [selectedImage, setSelectedImage] = React.useState("");
  const [openImageModal, setOpenImageModal] = React.useState(false);

  const [profilepic, setProfilepic] = useState(null)

  const [imageUploadingStatus, setImageUploadingStatus] = useState(false)

  const [withIcon, setWithIcon] = useState(false)
  const [imageId, setImageId] = useState(-1)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [aspectRatio, setAspectRatio] = useState(3 / 4)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const [imageError, setImageError] = useState(null)
  const [imagefilter, setImageFilter] = React.useState("Original");
  const [imagefilterCounter, setImageFilterCounter] = React.useState(0);
  const [imagefilterSwipe, setImageFilterSwipe] = React.useState("R");


  const my_filters_list = [
    "Original", "Grayscale", "Sepia", "Vintage",
    "Clarendon", "Gingham", "Juno", "Lark",
    "Mayfair", "Sierra", "Valencia", "Walden",
  ]


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
      console.error(e)
    }
  }, [croppedAreaPixels, setSelectedImage, selectedImage, rotation,])


  const [addnewinfo, setAddNewInfo] = useState({ addnew:"POST" })
  const [profileError, setProfileError] = useState(null)
  const [profilePic, setProfilePic] = useState(null)

  const GET_PROFILE_INFO_QUERY = gql`
    query GetProfileInfo{
      getProfileInfo{
        bio 
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

  const { data, loading, error } = useQuery(GET_PROFILE_INFO_QUERY, { fetchPolicy: "network-only" })
  const [doChangeProfileInfo, { data: data1, loading: loading1, error: error1 }] = useMutation(EDIT_PROFILE_INFO_QUERY, { fetchPolicy: "network-only" })

  const changeProfileSchema = Joi.object({
    bio: validationRules.bio,
    openfor: validationRules.openfor,
  })

  if (data) {
    if (!addnewinfo) {
      const {
        bio, openfor, profilePic
      } = data.getProfileInfo

      setAddNewInfo({
        bio, openfor,
      })

      setProfilePic(profilePic)
    
    }
  }

  if(error){ console.log("error",error) }

  

  const onChangeEditProfile = () => {
    const {profilePic, ...profileinfo2 } = addnewinfo 
    const errorValid = changeProfileSchema.validate(profileinfo2).error
    if (!errorValid) {
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

  const wrapMenuItem = (item) => {
    const { minWidth, label, value, menuItemList } = item
    return <FormControl sx={{ m: 1, minWidth: minWidth, }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select defaultValue={''}
        onChange={(e) => {
          setAddNewInfo({ ...addnewinfo, [value]: e.target.value })
        }}
        value={addnewinfo && addnewinfo[value] || ""}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
        size="small" label={label} >
        <MenuItem value=""><em>None</em></MenuItem>
        {
          menuItemList.map((it, i) => {
            return <MenuItem key={i} value={it}>{it}</MenuItem>
          })
        }
      </Select>
    </FormControl>
  }

  const wrapTextInputItem = (item) => {
    const { label, value, width, marginLeft, defaultValue, size, min, max, endlabel } = item
    return <TextField
      value={addnewinfo && addnewinfo[value] || ""}
      style={{ marginLeft: marginLeft, width: width }}
      defaultValue={defaultValue}
      onChange={(e) => { setAddNewInfo({ ...addnewinfo, [value]: e.target.value }) }}
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
      setImageId(id)

      const targetFile = e.target.files[0]
      const optionImage = { maxSizeMB: 4, maxWidthOrHeight: 2024, useWebWorker: true, }
      const image = await compressImage(targetFile, optionImage)

      if (id == 1) { setWithIcon(true) }
      else { setWithIcon(false) }

      setSelectedImage({ id: id, url: URL.createObjectURL(image), ar: ar })
    }

    const imgurlfinal = imgurl || croppedImage

    return <div key={id} style={{ padding: 5 }}>
      <div style={{ height: height, width: ar * height, border: "1px solid #efefef" }}>
        {
          selectedImage.id !== id ?
            <div style={{ display: "flex", justifyContent: "center", flexDirection: ar < 1 ? "column" : "row", border: "1px solid #fff", height: "100%" }}>
              <IconButton style={{ width: "100%" , height: "100%" }} color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={(e) => { handleChange(e, id) }} />
                <PhotoCamera />
              </IconButton>
            </div>
            :
            <div>
              <div style={{ height: "100%", width: "100%", overflowY: "hidden" }}>
                <FilterView
                  filter={imagefilter}
                  height={200}
                  width={200 * selectedImage.ar}
                  image={imgurlfinal} />
              </div>
            </div>
        }
      </div>
    </div>
  }

  const getDesktopView = () => {
    return <div style={{display:"flex", justifyContent:"center", }}>
              <div>
                <div style={{ fontSize: 22, paddingBottom: 15, padding: 5, }}>
                  <div style={{ display:"flex" }}>
                    
                    <div>
                      {
                        addnewinfo.addnew === "POST"?
                        <div style={{paddingTop:8}} >
                          {wrapTextInputItem({ label: "Post Title", size: "small", value: "post_title", width: 550, marginLeft: 10 })}
                        </div>
                        :<></>
                      }

                    </div>
                  </div>
                  
                </div>
                {
                  addnewinfo.addnew === "POST"?
                    <div style={{ height: "65vh", overflowY: "auto", padding: 5, }}>
                      <div>
                      </div>
                      <div style={{border:"1px solid #fff", display:"flex",paddingTop:5, padding:5   }}>
                        <div>
                          <div style={{ display: "flex", padding: 5, width:400, }}>
                            <TextField 
                                fullWidth
                                value={addnewinfo && addnewinfo.bio}
                                onChange={(e) => {
                                  setAddNewInfo({ ...addnewinfo, bio: e.target.value })
                                }}
                                InputLabelProps={{ shrink: true }} 
                                placeholder='Write content here ...' label="Content" 
                                multiline rows={7} defaultValue="" 
                            />
                          </div>
                        </div>
                        <div>
                          {wrapImage({ height: 140, id: 1, ar: 3 / 3, })}
                        </div>
                      </div>
                      
                    
                      <div style={{ padding: 5, color: "red", width: 500 }}>
                        {profileError && "Error : " + profileError.message || error1 && "Error : " + error1.message }
                      </div>
                      <div style={{ padding: 5, color: "green", width: 500 }}>
                        {data1 ? "addnewinfo successfully changed" : ""}
                      </div>
                      <div style={{ display: "flex", padding: 5, paddingLeft:7 }}>
                        {wrapButtonView({ text: 'Add New Post', size: "medium" })}
                      </div>
                    </div> 
                    :<></>
                }
                 
                  
              </div>
            </div>
  }

  const getMobileView = () => {
    return <div style={{ height: "80vh",  padding: 5, overflowY: "scroll", overflowX:'hidden' }}>
      <div>
        
        { addnewinfo.addnew === "POST"?
          <div style={{}}>
            <div style={{ display: "flex", flexDirection: "column", padding: 5, }}>
              {wrapTextInputItem({ label: "Post Title", size: "small", value: "post_title", width: "96%", marginLeft: 5 })}
            </div>
            <div style={{ paddingLeft: 7, border: "1px solid #fff",padding:10 }}>
              <TextField fullWidth
                value={addnewinfo && addnewinfo.bio}
                onChange={(e) => {
                  setAddNewInfo({ ...addnewinfo, bio: e.target.value })
                }}
                InputLabelProps={{ shrink: true }} placeholder="Write content here ..." label="Content" multiline rows={8} defaultValue="" />
            </div>
            <div>
              <div style={{padding:5}}>
                {wrapImage({ height: 80, id: 1, ar: 3 / 3, })} 
              </div>
            </div>
            <div style={{ padding: 5, color: "red", width: 250,  paddingLeft:10,  }}>
              {profileError && "Error : " + profileError.message || error1 && "Error : " + error1.message }
            </div>
            <div style={{ padding: 5, color: "green", width: 250,  paddingLeft:8 }}>
              {data1 ? "addnewinfo successfully changed" : ""}
            </div>
            <div style={{ display: "flex", padding: 5,  paddingLeft:10 }}>
              {wrapButtonView({ text: 'Add New Post', size: "medium" })}
            </div>
          </div>
          :<></>
        }
        
      </div>
    </div>
  }


  return (
    <div style={{  }}>
      {
        !loading?
          <div>
            {(width > 600 ? getDesktopView() : <></>)}
            {(width < 600 ? getMobileView() : <></>)}
          </div>
          :
          <div style={{ display:"flex", justifyContent:"center", height:"100%", flexDirection:"column" }}>
            <div style={{display:"flex", justifyContent:"center"}}>
              <CircularProgress />
            </div>
          </div>
      }
    </div>
  )
}

export default EditProfile