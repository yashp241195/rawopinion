import imageCompression from 'browser-image-compression';
import { CLOUDINARY_IMAGE_UPLOAD_PRESET,CLOUDINARY_IMAGE_URL } from "../../config/config";

const uploadImageCloudinary = async (inputImage, withIcon) => {

    const blob = await fetch(inputImage).then(response => response.blob());
    const file = new File([blob], "filename", { type: blob.type });

    const optionFull = { maxSizeMB: 2, maxWidthOrHeight: 1440, useWebWorker: true,}
    const compressedFileFull = await imageCompression(file, optionFull);

    const fileFull = new File([compressedFileFull], "filename", { type: compressedFileFull.type });

    const formData = new FormData()
    formData.append("file", fileFull)
    formData.append("upload_preset", CLOUDINARY_IMAGE_UPLOAD_PRESET)
    
    const uploadedImage = await fetch(CLOUDINARY_IMAGE_URL, {
        method: 'POST',
        body: formData,
    }).then(response => response.json())

    let uploadedIcon = null
    
    if(withIcon){

        const optionIcon = { maxSizeMB: 1, maxWidthOrHeight: 192, useWebWorker: true,}
        const compressedFile = await imageCompression(file, optionIcon);
        
        const fileIc = new File([compressedFile], "filename", { type: compressedFile.type });
   
        const formData = new FormData()
        formData.append("file", fileIc)
        formData.append("upload_preset", CLOUDINARY_IMAGE_UPLOAD_PRESET)
    
        uploadedIcon = await fetch(CLOUDINARY_IMAGE_URL, {
            method: 'POST',
            body: formData,
        }).then(response => response.json())
    
    }

    const UploadResponse = {
        inputImage:inputImage,
        url:uploadedImage.secure_url,
        icon_url: uploadedIcon && uploadedIcon.secure_url,
    }

    return UploadResponse

}

export default uploadImageCloudinary
