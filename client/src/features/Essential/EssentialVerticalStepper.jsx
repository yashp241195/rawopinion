import React, { useState, useCallback, useEffect } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useWindowSize from '../../hooks/useWindowSize'
import { TextField, Button } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Modal from '@mui/material/Modal';
import Cropper from 'react-easy-crop'
import { getCroppedImg, getRotatedImg } from '../../components/EditImage/cropImage'
import FilterView from '../../components/EditImage/FilterView'
import RotateRightIcon from '@mui/icons-material/RotateRight';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useMutation } from '@apollo/client';
import Joi from 'joi';
import validationRules from '../../config/isValid'
import processImageAI from '../../components/EditImage/aiAlgorithm'
import compressImage from '../../components/EditImage/compressImage';
import uploadImageCloudinary from '../../components/EditImage/uploadCloudinary';
import { useNavigate } from 'react-router-dom';
import { gql, } from '@apollo/client';
import authVar from '../../vars/authVar';
import LinearProgress from '@mui/material/LinearProgress';

import CancelIcon from '@mui/icons-material/Cancel';

export default function EssentialVerticalStepper() {

  const UPDATE_ESSENTIAL_QUERY = gql`
    mutation updateEssential($essentialInput:EssentialInput) {
      updateEssential(essentialInput:$essentialInput)
    }
  `;

  const [width,] = useWindowSize()
  const navigate = useNavigate()

  const [essentials, setEssentials] = useState({})
  const [activeStep, setActiveStep] = React.useState(0);

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


  const calculateAge = (dateString) => Math.floor((Date.now() - new Date(dateString)) / (365.25 * 24 * 60 * 60 * 1000));

  const [doUpdateEssential, { data, loading, error }] = useMutation(UPDATE_ESSENTIAL_QUERY)

  const essentialSchema = Joi.object({
    firstname: validationRules.firstname,
    lastname: validationRules.lastname,
    openfor: validationRules.openfor,
    dateofbirth: Joi.string().required(),
    age: validationRules.validAge,
    gender: validationRules.gender,
    genderpreference: validationRules.gender,
    orientation: validationRules.orientation,
  })

  useEffect(() => {

    const loadImageAI = async () => {

      try {
        if (croppedImage) {
          let AIResponse = await processImageAI(croppedImage)
          const { face_count, first_face_accuracy, identifiedAs } = AIResponse
          if (face_count != 1) { throw Error("Profile picture must feature the face of exactly one person") }
          if (first_face_accuracy <= 0.8) { throw Error("Face must be properly visible") }
          if (identifiedAs == "neutral" || identifiedAs == "sexy") {
            setProfilepic({ ...AIResponse, imagefilter, isSafe: true, isSafeProfilePic: true })
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

  const onSubmitEssentials = () => {
    const error2 = essentialSchema.validate(essentials).error
    if (!error2 && profilepic.isSafeProfilePic && imageId >= 1) {
      doUpdateEssential(
        {
          variables: {
            essentialInput: {
              firstname: essentials.firstname,
              lastname: essentials.lastname,
              openfor: essentials.openfor,
              dateofbirth: essentials.dateofbirth,
              gender: essentials.gender,
              genderpreference: essentials.genderpreference,
              orientation: essentials.orientation,
              profilepic: {
                imgid: imageId,
                url: profilepic.url,
                icon_url: profilepic.icon_url,
                filter: profilepic.imagefilter,
                identifiedAs: profilepic.identifiedAs,
                isProfileSafe: profilepic.isSafeProfilePic,
                isSafe: profilepic.isSafe,
                porn: profilepic.nude_detection.porn,
                drawing: profilepic.nude_detection.drawing,
                sexy: profilepic.nude_detection.sexy,
                hentai: profilepic.nude_detection.hentai,
                neutral: profilepic.nude_detection.neutral,
              }
            }
          },
          fetchPolicy: 'network-only',
        }
      )
    }
  }

  const saveToLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value))
  const getFromLocal = (key) => JSON.parse(localStorage.getItem(key))


  if (data) {
    console.log("data : ", data)
    const auth = getFromLocal("auth")
    const newState = {
      ...auth,
      hasEssential: true,
    }

    saveToLocal("auth", newState)
    authVar(newState)
    navigate("/explore")
  }


  const onUploadImage = async () => {
    setImageUploadingStatus(true)
    const UploadResponse = await uploadImageCloudinary(croppedImage, withIcon)
    if (UploadResponse) {
      setProfilepic({ ...profilepic, ...UploadResponse, filter:imagefilter })

      setImageUploadingStatus(false)
      setOpenImageModal(false);
    }
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
              <IconButton style={{ width: ar < 1 ? "100%" : "66%", height: ar < 1 ? "75%" : "100%" }} color="primary" aria-label="upload picture" component="label">
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

  const desktopImageModalView = () => {
    return <Modal
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: "#fff",
        width: 750,
        height: 400,
        bgcolor: 'background.paper',
        border: '2px solid #efefef',
        boxShadow: 24,
        p: 4,
      }}
      open={openImageModal}
      onClose={() => {
        setOpenImageModal(false)
      }}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div style={{ display: "flex", height: 400, justifyContent: "center" }}>
        <div style={{ background: "#fff", width: "100%", height: "100%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}></div>
            <div style={{ fontSize: 20, padding: 5 }}> {(croppedImage) ? "Applying Filter : " + imagefilter : "Crop"} </div>
            <div style={{ flexGrow: 1 }}></div>
            <div>
              <Button
                color="error" style={{ textTransform: "none" }}
                onClick={() => {
                  setSelectedImage({ id: -1 });
                  setCroppedImage(null);
                  setOpenImageModal(false);
                }}>
                <CancelIcon sx={{ fontSize: 28 }} />
              </Button>
            </div>
          </div>
          <div style={{ fontSize: 18, display: "flex", justifyContent: "center", padding: 5 }}>
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
            {croppedImage ?
              <div>
                <div style={{ display: "flex" }}>
                  <div style={{ border: "1px solid #fff", display: "flex", justifyContent: 'center', flexDirection: 'column' }}>
                    <FilterView
                      filter={imagefilter}
                      height={selectedImage.id === 3 ? 200 : 220}
                      width={selectedImage.id === 3 ? 200 * selectedImage.ar : 220 * selectedImage.ar}
                      image={croppedImage} />
                  </div>
                  <div style={{ paddingLeft: 20, display: "flex", flexDirection: "column" }}>
                    {
                      my_filters_list.map((it, i) => {
                        if (i <= 5) {
                          return <Button key={i}
                            style={{ textTransform: 'none', margin: 2, border: "1px solid #efefef" }}
                            size='small'
                            onClick={() => { setImageFilter(it) }}
                            variant={(it == imagefilter) ? "contained" : "outlined"}
                            color="primary"
                          >
                            {it}
                          </Button>
                        } else {
                          return <></>
                        }
                      })
                    }
                  </div>
                  <div style={{ paddingLeft: 5, display: "flex", flexDirection: "column" }}>
                    {
                      my_filters_list.map((it, i) => {
                        if (i > 5 && i <= 12) {
                          return <Button key={i} style={{ textTransform: 'none', margin: 2, border: "1px solid #efefef" }}
                            size='small'
                            onClick={() => { setImageFilter(it) }}
                            variant={(it == imagefilter) ? "contained" : "outlined"}
                            color="primary"
                          >
                            {it}
                          </Button>
                        } else {
                          return <></>
                        }
                      })
                    }
                  </div>
                </div>
                <div style={{ padding: 5, paddingBottom: 2 }}>
                  {
                    imageError ?
                      <div style={{ color: "red" }}>
                        Error : {imageError}
                      </div>
                      :
                      <div style={{ color: "green" }}>
                        {profilepic && profilepic.isSafeProfilePic ?
                          <div style={{ color: "green" }}>
                            Profile image is safe
                          </div>
                          :
                          <div style={{ width: 300, padding: 5, color: "#1976d2" }}>
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
                      <div style={{ width: 300, padding: 5, color: "#1976d2" }}>
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
                    disabled={profilepic ? (!profilepic.isSafeProfilePic) : true}
                    onClick={() => {
                      onUploadImage()
                    }}
                    style={{ textTransform: 'none', }}
                    variant="contained" >Upload</Button>
                </div>
              </div>
              :
              <div>
                <div style={{
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
                    aspect={aspectRatio}
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
                        setRotation(270)
                        showRotatedImage();
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
                        setRotation(90)
                        showRotatedImage();
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
          </div>
        </div>
      </div>
    </Modal>

  }

  const mobileImageModalView = () => {
    return <Modal
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: "#fff",
        width: "100%",
        height: "100%",
        bgcolor: 'background.paper',
        border: '2px solid #efefef',
        boxShadow: 24,
        p: 4,
      }}
      open={openImageModal}
      onClose={() => {
        setOpenImageModal(false)
      }}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div style={{ display: "flex", height: "100vh", justifyContent: "center", }}>
        <div style={{ background: "#fff", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}></div>
            <div style={{ fontSize: 24, paddingLeft: 10, paddingTop: 10 }}> {(croppedImage) ? "Applying Filter : " + imagefilter : "Crop"} </div>
            <div style={{ flexGrow: 1 }}></div>
            <div>
              <IconButton
                color="error" style={{ textTransform: "none" }}
                onClick={() => {
                  setSelectedImage({ id: -1 });
                  setCroppedImage(null);
                  setOpenImageModal(false);
                }}>
                <CancelIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </div>
          </div>
          <div style={{ flexGrow: 1 }}></div>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
            {croppedImage ?
              <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ border: "1px solid #fff", display: "flex", justifyContent: 'center', }}>
                    <FilterView
                      filter={imagefilter}
                      height={"60vh"}
                      width={width * 0.8}
                      image={croppedImage} />
                  </div>
                  <div style={{ display: "flex", justifyContent: 'center', paddingTop: 20, fontSize: 18 }}>
                    <div style={{ width: "80%", }}>
                      <div style={{ padding: 5, paddingBottom: 2, }}>
                        {
                          imageError ?
                            <div style={{ color: "red" }}>
                              Error : {imageError}
                            </div>
                            :
                            <div style={{ color: "green" }}>
                              {profilepic && profilepic.isSafeProfilePic ?
                                <div style={{ color: "green" }}>
                                  Profile image is safe
                                </div>
                                :
                                <div style={{ padding: 5, color: "#1976d2" }}>
                                  <div>
                                    <LinearProgress />
                                  </div>
                                  <div>
                                    Validating Image with AI
                                  </div>
                                </div>
                              }
                            </div>
                        }
                      </div>
                      <div style={{ padding: 5, paddingBottom: 5 }}>
                        {
                          imageUploadingStatus ?
                            <div style={{ padding: 5, color: "#1976d2" }}>
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

                    </div>
                  </div>
                  <div style={{ border: "1px solid #fff", display: "flex", justifyContent: 'center', }}>
                    <div style={{
                      width: "80%",
                      display: "flex", justifyContent: 'center',
                      padding: 0, paddingBottom: 10, paddingTop: 20,
                      border: "1px solid #fff"
                    }}>

                      <div>
                        <IconButton
                          disabled={imagefilterCounter === 0}
                          size='small'
                          onClick={() => {
                            if (imagefilterCounter > 0) {
                              setImageFilter(my_filters_list[imagefilterCounter - 1])
                              setImageFilterCounter(imagefilterCounter - 1)
                              setImageFilterSwipe("L")
                            }
                          }}
                          style={{
                            textTransform: 'none',
                            border: (imagefilterSwipe == "L") ? "" : "1px solid #efefef",
                            background: (imagefilterSwipe == "L") ? "#1976d2" : "#fff"

                          }}
                        >
                          <KeyboardArrowLeftIcon sx={{ fontSize: 32, color: (imagefilterSwipe == "L") ? "#fff" : "#595959" }} />
                        </IconButton>
                      </div>
                      <div style={{ paddingLeft: 10 }}>
                        <IconButton
                          disabled={imagefilterCounter === my_filters_list.length - 1}
                          size='small'
                          onClick={() => {
                            if (imagefilterCounter <= my_filters_list.length - 2) {
                              setImageFilter(my_filters_list[imagefilterCounter + 1])
                              setImageFilterCounter(imagefilterCounter + 1)
                              setImageFilterSwipe("R")
                            }
                          }}
                          style={{
                            textTransform: 'none',
                            border: (imagefilterSwipe == "R") ? "" : "1px solid #efefef",
                            background: (imagefilterSwipe == "R") ? "#1976d2" : "#fff"
                          }}
                        >
                          <KeyboardArrowRightIcon sx={{ fontSize: 32, color: (imagefilterSwipe == "R") ? "#fff" : "#595959" }} />
                        </IconButton>
                      </div>
                      <div style={{ flexGrow: 1 }}></div>
                      <div style={{ display: "flex", }}>
                        <Button
                          disabled={profilepic ? (!profilepic.isSafeProfilePic) : true}
                          onClick={() => { onUploadImage() }}
                          style={{ textTransform: 'none', border: "1px solid #fff" }}
                          variant="contained" >Upload</Button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              :
              <div>
                <div style={
                  {
                    position: 'relative',
                    width: "100%",
                    height: "70vh",
                    background: '#333',
                  }
                } >
                  <Cropper
                    image={selectedImage.url}
                    crop={crop}
                    zoom={zoom}
                    onRotationChange={setRotation}
                    aspect={aspectRatio}
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
                        setRotation(270)
                        showRotatedImage();
                      }}
                      variant="outlined"
                      color="primary"
                      startIcon={<RotateLeftIcon />}
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
                        setRotation(90)
                        showRotatedImage();
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
          </div>
          <div style={{ flexGrow: 1 }}></div>
        </div>
      </div>
    </Modal>

  }

  const wrapTextInputItem = (item) => {

    const {
      label, value, width, marginLeft,
      defaultValue, size, min, max, endlabel
    } = item

    return <TextField
      style={{ marginLeft: marginLeft, width: width }}
      defaultValue={defaultValue}
      onChange={(e) => { setEssentials({ ...essentials, [value]: e.target.value }) }}
      size={size} label={label}
      type="text" variant="outlined"
    />
  }

  const BasicDatePicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            render
            onChange={(e) => { setEssentials({ ...essentials, "dateofbirth": JSON.stringify(e), "age": calculateAge(e) }) }}
            slotProps={{
              textField: { size: 'small' },
              popper: {
                placement: "top-start",
                style: { maxHeight: 243 }
              }
            }}
            format="DD-MM-YYYY"
            label="Date of Birth" />
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  const wrapMenuItem = (item) => {
    const { minWidth, label, value, menuItemList } = item
    return <FormControl sx={{ m: 1, minWidth: minWidth, }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select defaultValue={''}
        onChange={(e) => { setEssentials({ ...essentials, [value]: e.target.value }) }}
        value={essentials[value]} MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }} size="small" label={label} >
        <MenuItem value=""><em>None</em></MenuItem>
        {
          menuItemList.map((it, i) => {
            return <MenuItem key={i} value={it}>{it}</MenuItem>
          })
        }
      </Select>
    </FormControl>
  }

  const handleNext = () => {
    if (activeStep == 0) {
      const err = essentialSchema.validate(essentials).error
      if (!err) { setActiveStep((prevActiveStep) => prevActiveStep + 1); }
    }
    if (activeStep == 1) {
      onSubmitEssentials()
    }
  };


  const steps = [
    {
      label: 'Enter some basic information about yourself',
      description: <div>
        <div style={{ paddingLeft: 8, fontSize: 14, color: "#800080", paddingBottom: 15 }}>
          Please note that once you submit your name, gender, orientation and date of birth you won't be able to change this information in future
        </div>
        <div style={{ display: "flex", paddingLeft: 2 }}>
          {wrapTextInputItem({ label: "First Name", size: "small", value: "firstname", width: 180, marginLeft: 5 })}
          {wrapTextInputItem({ label: "Last Name", size: "small", value: "lastname", width: 180, marginLeft: 14 })}
        </div>
        <div style={{ display: "flex", paddingTop: 10 }}>
          {
            wrapMenuItem({
              value: 'openfor',
              minWidth: 150, label: "Open for",
              menuItemList: ["FRIENDSHIP", "DATING", "MARRIAGE"]
            })
          }
          {
            wrapMenuItem({
              value: 'gender',
              minWidth: 120, label: "Gender",
              menuItemList: ["MALE", "FEMALE", "OTHER"]
            })
          }
          {
            wrapMenuItem({
              value: 'orientation',
              minWidth: 178, label: "Orientation",
              menuItemList: ["STRAIGHT", "HOMOSEXUAL", "BISEXUAL", "OTHER"]
            })
          }
        </div>
        <div style={{ paddingLeft: 8, width: 250 }}>
          {BasicDatePicker()}
        </div>
        <div style={{ paddingTop: 5, }}>
          {
            wrapMenuItem({
              value: 'genderpreference',
              minWidth: 200, label: "Gender Preference",
              menuItemList: ["MALE", "FEMALE", "OTHER"]
            })
          }
        </div>
      </div>,
      disabled: essentialSchema.validate(essentials).error,
    },
    {
      label: 'Add your profile picture',
      description: <div>
        <div style={{ paddingTop: 10, paddingBottom: 5 }}>
          {wrapImage({ height: 200, id: 1, ar: 3 / 4 })}
        </div>
      </div>,
      disabled: croppedImage == null
    },

  ];

  const stepsMobile = [
    {
      label: 'Enter your full name',
      description: <div style={{ width: "100%" }}>
        <div style={{ paddingLeft: 8, fontSize: 12, color: "#800080", paddingBottom: 15 }}>
          Please note that once you submit your name, gender, orientation and date of birth you won't be able to change this information in future
        </div>
        <div style={{ paddingTop: 5, paddingLeft: 10 }}>
          {wrapTextInputItem({ label: "First Name", size: "small", value: "firstname", width: 180, marginLeft: 0 })}
        </div>
        <div style={{ paddingTop: 10, paddingLeft: 10 }}>
          {wrapTextInputItem({ label: "Last Name", size: "small", value: "lastname", width: 180, marginLeft: 0 })}
        </div>
        <div style={{ paddingTop: 5, paddingLeft: 2 }}>
          {
            wrapMenuItem({
              value: 'openfor',
              minWidth: 150, label: "Open for",
              menuItemList: ["FRIENDSHIP", "DATING", "MARRIAGE"]
            })
          }
        </div>
        <div style={{ paddingTop: 0, paddingLeft: 2 }}>
          {
            wrapMenuItem({
              value: 'gender',
              minWidth: 120, label: "Gender",
              menuItemList: ["MALE", "FEMALE", "OTHER"]
            })
          }
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {
            wrapMenuItem({
              value: 'orientation',
              minWidth: 178, label: "Orientation",
              menuItemList: ["STRAIGHT", "HOMOSEXUAL", "BISEXUAL", "OTHER"]
            })
          }
        </div>
        <div style={{ paddingTop: 0, paddingLeft: 8, paddingRight: 8 }}>
          {BasicDatePicker()}
        </div>
        <div style={{ paddingTop: 5, }}>
          {
            wrapMenuItem({
              value: 'genderpreference',
              minWidth: 200, label: "Gender Preference",
              menuItemList: ["MALE", "FEMALE", "OTHER"]
            })
          }
        </div>
      </div>,
      disabled: essentialSchema.validate(essentials).error,
    },

    {
      label: 'Add your profile picture',
      description: <div>
        <div style={{ width: 250, paddingTop: 20 }}>
          {wrapImage({ height: 200, id: 1, ar: 3 / 4 })}
        </div>
      </div>,
      disabled: croppedImage == null

    },
  ];

  const getDesktopView = () => {

    return (
      <Box sx={{ width: 550, height: "80vh" }}>
        <div style={{ paddingBottom: 10 }}>
          {desktopImageModalView()}
        </div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps && steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                optional={
                  index === 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <div style={{ paddingLeft: 8, color: "red" }}>{essentialSchema.validate(essentials).error && "Error : " + essentialSchema.validate(essentials).error.message}</div>
                <div style={{ paddingLeft: 8, color: "red" }}>{error && "Error : " + error.message}</div>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      disabled={step.disabled}
                      variant="contained"
                      onClick={() => { handleNext() }}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Typography>Going back to homepage ..</Typography>
          </Paper>
        )}
      </Box>
    );
  }

  const getMobileView = () => {

    return (
      <Box sx={{ maxWidth: 300 }}>
        <div style={{ paddingBottom: 10 }}>
          {mobileImageModalView()}
        </div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {stepsMobile && stepsMobile.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <div style={{ paddingLeft: 8, color: "red" }}>{essentialSchema.validate(essentials).error && "Error : " + essentialSchema.validate(essentials).error.message}</div>
                <div style={{ paddingLeft: 8, color: "red" }}>{error && "Error : " + error.message}</div>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      disabled={step.disabled}
                      variant="contained"
                      onClick={() => { handleNext() }}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === stepsMobile.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === stepsMobile.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Typography>Going back to homepage ..</Typography>
          </Paper>
        )}
      </Box>
    );

  }


  return (
    <div style={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
      {(width > 800) ? getDesktopView() : <></>}
      {(width < 800) ? getMobileView() : <></>}
    </div>
  )

}
