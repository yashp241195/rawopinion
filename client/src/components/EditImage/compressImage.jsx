import imageCompression from 'browser-image-compression';

const compressImage = async (image, option) => {

    const compressedFile = await imageCompression(image, option);
    const file = new File([compressedFile], "filename", { type: compressedFile.type });
    return file

}

export default compressImage