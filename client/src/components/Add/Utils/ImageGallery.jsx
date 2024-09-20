import React, { useState, useCallback, useEffect, useRef } from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button } from '@mui/material'

import useWindowSize from '../../../hooks/useWindowSize'
import { useMutation, gql } from '@apollo/client';

import compressImage from '../../EditImage/compressImage';
import uploadImageCloudinary from '../../EditImage/uploadCloudinary';

import { getCroppedImg, getRotatedImg } from '../../EditImage/cropImage'
import FilterView from '../../EditImage/FilterView'
import Cropper from 'react-easy-crop'

import RotateRightIcon from '@mui/icons-material/RotateRight';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import LinearProgress from '@mui/material/LinearProgress';
import processImageAI from '../../EditImage/aiAlgorithm'
import Modal from '@mui/material/Modal';
import Badge from '@mui/material/Badge';

import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import ImageGalleryContext from './ImageGalleryContext';

import CancelIcon from '@mui/icons-material/Cancel';


const ImageGallery = () => {

  const [width,] = useWindowSize()
  const navigate = useNavigate();

  const imgCtx = useContext(ImageGalleryContext)

  const [selectedImage, setSelectedImage] = React.useState("");
  const [openImageModal, setOpenImageModal] = React.useState(false);
  const editImageInputArrayRef = Array.from({ length: 5 }, () => useRef(null));

  const [pic, setPic] = useState(null)
  const [imageId, setImageId] = useState(-1)
  const [imageUploadingStatus, setImageUploadingStatus] = useState(false)

  const [withIcon, setWithIcon] = useState(false)

  const [crop, setCrop] = useState({ x: 0, y: 0,  })
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
      // console.error(e)
    }
  }, [croppedAreaPixels, setSelectedImage, selectedImage, rotation,])



  const UPLOAD_IMAGE_QUERY = gql`
    mutation uploadImage($image:ImageInput) {
      uploadImage(image:$image)
    }
  `;

  const [doUploadImage, { data: data2, loading: loading2, error: error2 }] = useMutation(UPLOAD_IMAGE_QUERY, { fetchPolicy: "network-only" })

  if (data2) { navigate(0) }

  useEffect(() => { showRotatedImage() }, [rotation])


  useEffect(() => {

    const loadImageAI = async () => {
      try {
        if (croppedImage) {
          let AIResponse = await processImageAI(croppedImage)
          const { face_count, identifiedAs, first_face_accuracy } = AIResponse
          switch (imageId) {
            case 1:
              if (face_count != 1) { throw Error("Profile picture must feature the face of exactly one person") }
              if (first_face_accuracy <= 0.8) { throw Error("Face must be properly visible") }
              if (identifiedAs == "neutral" || identifiedAs == "sexy") {
                setPic({ ...AIResponse, imagefilter, isSafe: true })
              }
              else { throw Error("Identifed as " + identifiedAs) }
              break;
            case 2:
              if (face_count != 1) { throw Error("Second picture must feature the face of exactly one person") }
              if ((identifiedAs == "neutral" || identifiedAs == "sexy")) {
                setPic({ ...AIResponse, imagefilter, isSafe: true })
              }
              else { throw Error("Identifed as " + identifiedAs) }
              break;
            case 3:
              if (identifiedAs == "porn" || identifiedAs == "hentai") { throw Error("Identifed as " + identifiedAs) }
              else {
                setPic({ ...AIResponse, imagefilter, isSafe: true })
              }
              break;
            case 4:
              if (identifiedAs == "porn" || identifiedAs == "hentai") { throw Error("Identifed as " + identifiedAs) }
              else {
                setPic({ ...AIResponse, imagefilter, isSafe: true })
              }
              break;
          }

        }
      }
      catch (e) {
        setImageError(e.message)
      }
    }

    loadImageAI()

  }, [croppedImage])


  const onUploadImage = async () => {
    setImageUploadingStatus(true)
    const UploadResponse = await uploadImageCloudinary(croppedImage, withIcon)
    if (UploadResponse) {
      setImageUploadingStatus(false)
      doUploadImage({
        variables: {
          image: {
            imgid: imageId,
            url: UploadResponse.url,
            icon_url: UploadResponse.icon_url,
            filter: imagefilter,
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

  const wrapImage = ({ height, id, ar }) => {

    const handleChange = async (e, id) => {
      setOpenImageModal(true);
      const targetFile = e.target.files[0]
      const optionImage = { maxSizeMB: 4, maxWidthOrHeight: 2024, useWebWorker: true, }
      const image = await compressImage(targetFile, optionImage)
      if (id == 1) { setWithIcon(true) }
      else { setWithIcon(false) }
      setSelectedImage({ id: id, url: URL.createObjectURL(image), ar: ar })
    }

    let currentImage = {}
    let imageContent = {}

    if (imgCtx && imgCtx.imageGallery && imgCtx.imageGallery.find(it => it.imgid == id)) {

      currentImage = imgCtx.imageGallery.find(it => it.imgid == id)

      imageContent = <div>
        <div style={{ height: "100%", width: "100%", overflowY: "hidden", }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            badgeContent={
              <div style={{ width: 50, paddingLeft: 20 }}>
                <IconButton
                  onClick={(e) => {
                    editImageInputArrayRef[id].current.click();
                  }}
                  style={{ background: "#fff" }}
                >
                  <input hidden accept="image/*" type="file"
                    onChange={(e) => {
                      setImageId(id)
                      handleChange(e, id)
                    }}
                    ref={editImageInputArrayRef[id]}
                  />
                  <EditIcon />
                </IconButton>
              </div>
            }
          >
            <FilterView
              filter={currentImage.filter || "Original"}
              height={height}
              width={height * selectedImage.ar}
              image={currentImage.url} />
          </Badge>
        </div>
      </div>

    } else {

      imageContent = <div style={{ width: ar * height, display: "flex", justifyContent: "center", flexDirection: ar < 1 ? "column" : "row", height: "100%" }}>
        <IconButton style={{ width: ar < 1 ? "100%" : "66%", height: ar < 1 ? "75%" : "100%" }} color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file"
            onChange={(e) => {
              setImageId(id)
              handleChange(e, id)
            }} />
          <PhotoCamera />
        </IconButton>
      </div>

    }

    return <div style={{ padding: 5, }}>
      <div style={{ height, width: ar * height, }}>
        {imageContent}
      </div>
    </div>

  }

  const desktopImageModalView = () => {

    let modalContent = {}

    if (croppedImage) {

      modalContent = <div>
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
                {pic && pic.isSafe ?
                  <div style={{ color: "green" }}>
                    Image is safe
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
            disabled={pic ? (!pic.isSafe) : true}
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
            aspect={imageId == 3 ? 1.5 : 0.75}
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
        width: 780,
        height: 450,
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
      <div style={{ display: "flex", height: 450, justifyContent: "center" }}>
        <div style={{ background: "#fff", width: "100%", height: "100%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}>
            </div>
            <div style={{ fontSize: 24, padding: 5, paddingTop:15 }}> {(croppedImage) ? "Applying Filter : " + imagefilter : "Crop"} </div>
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
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: 400 }}>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
              {modalContent}
            </div>
          </div>

        </div>
      </div>
    </Modal>

  }

  const mobileImageModalView = () => {

    let modalContent = {}

    if (croppedImage) {
      modalContent = <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ border: "1px solid #fff", display: "flex", justifyContent: 'center', }}>
            <FilterView
              filter={imagefilter}
              height={"60vh"}
              width={width * 0.8}
              image={croppedImage} />
          </div>
          <div style={{ fontSize: 16, display: "flex", justifyContent: 'center', paddingTop:15, paddingBottom:15 }}>
            <div>
              <div style={{ padding: 5, paddingBottom: 2 }}>
                {
                  imageError ?
                    <div style={{ color: "red" }}>
                      Error : {imageError}
                    </div>
                    :
                    <div style={{ color: "green" }}>
                      {pic && pic.isSafe ?
                        <div style={{ color: "green" }}>
                          Image is safe
                        </div>
                        :
                        <div style={{ width: 280, padding: 5, color: "#1976d2" }}>
                          <div>
                            <LinearProgress />
                          </div>
                          <div style={{paddingTop:15}}>
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
                    <div style={{ width: 280, padding: 5, color: "#1976d2" }}>
                      <div>
                        <LinearProgress />
                      </div>
                      <div style={{paddingTop:15}}>
                        Uploading
                      </div>
                    </div>
                    :
                    <div></div>
                }
              </div>

            </div>
          </div>
          <div style={{ display: "flex", justifyContent: 'center', }}>
            <div style={{
              width: "100%",
              display: "flex", justifyContent: 'center',
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
                    background:(imagefilterSwipe == "L")?"#1976d2":"#fff"

                  }}

                >
                  <KeyboardArrowLeftIcon sx={{ fontSize: 32, color:(imagefilterSwipe == "L")?"#fff":"#595959" }} />
                </IconButton>
              </div>
              <div style={{paddingLeft:10}}>
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
                  border:(imagefilterSwipe == "R")?"":"1px solid #efefef", 
                  background:(imagefilterSwipe == "R")?"#1976d2":"#fff"
                }}

                >
                  <KeyboardArrowRightIcon sx={{ fontSize: 32, color:(imagefilterSwipe == "R")?"#fff":"#595959" }} />
                </IconButton>
              </div>
              <div style={{ flexGrow: 1 }}></div>
              <div style={{}}>
                <Button
                  disabled={pic ? (!pic.isSafe) : true}
                  onClick={() => { onUploadImage() }}
                  style={{ textTransform: 'none', width: 180, }}
                  variant="contained" >Upload</Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    } else {
      modalContent = <div>
        <div>
          <div style={
            {
              position: 'relative',
              width: "100%",
              height: 300,
              background: '#333',
            }
          } >
            <Cropper
              image={selectedImage.url}
              crop={crop}
              zoom={zoom}
              onRotationChange={setRotation}
              aspect={0.75}
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
      </div>
    }

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
      <div style={{ display: "flex", height: "100vh", justifyContent: "center" }}>
        <div style={{ background: "#fff", width: "100%", height: "100%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}></div>
            <div style={{ fontSize: 18, paddingLeft: 10, paddingTop: 10 }}> {(croppedImage) ? "Applying Filter : " + imagefilter : "Crop"} </div>
            <div style={{ flexGrow: 1 }}></div>
            <div>
              <IconButton

                color="error" style={{ textTransform: "none" }}
                onClick={() => {
                  navigate(0)
                }}>
                <CancelIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "1px solid #fff", height: "90vh" }}>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
              {modalContent}
            </div>
          </div>
        </div>
      </div>
    </Modal>

  }


  const getDesktopView = () => {
    return <div style={{}}>
      {desktopImageModalView()}
      <div style={{}}>
        <div style={{ display: "flex", padding: 10 }}>
          <div style={{ border: "1px solid #efefef", background: "#efefef", paddingTop: 20 }}>
            {wrapImage({ height: 260, id: 1, ar: 3 / 4, })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: 117 }}>

              </div>
              <div style={{ border: "1px solid #efefef", marginLeft: 8 }}>
                {wrapImage({ height: 140, id: 2, ar: 3 / 4 })}
              </div>
            </div>
            <div style={{ display: "flex", paddingTop: 10 }}>
              <div style={{ border: "1px solid #efefef", marginLeft: 22 }}>
                {wrapImage({ height: 140, id: 3, ar: 3 / 2 })}
              </div>
            </div>

            <div>

            </div>
          </div>

        </div>
      </div>
    </div>
  }

  const getMobileView = () => {
    return <div style={{ width: 280, padding: 5, overflowY: "scroll" }}>
      <div>
        {mobileImageModalView()}
        <div>
          <div style={{ display: "flex", padding: 10 }}>
            <div style={{ border: "1px solid #efefef" }}>
              {wrapImage({ height: 220, id: 1, ar: 3 / 4 })}
            </div>
          </div>
          <div style={{ display: "flex", padding: 10, paddingTop: 0 }}>
            <div style={{ border: "1px solid #efefef" }}>
              {wrapImage({ height: 140, id: 2, ar: 3 / 4 })}
            </div>
            <div style={{ border: "1px solid #efefef", marginLeft: 5 }}>
              {wrapImage({ height: 140, id: 4, ar: 3 / 4 })}
            </div>
          </div>
        </div>

      </div>
    </div>
  }

  return (
    <div>
      {(width > 600 ? getDesktopView() : <></>)}
      {(width < 600 ? getMobileView() : <></>)}
    </div>
  )


}

export default ImageGallery