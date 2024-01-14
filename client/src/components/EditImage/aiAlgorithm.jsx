
import { IMAGE_AI_BACKEND } from "../../config/config";

const processImageAI = async (inputImage) => {

    try{

      const blob = await fetch(inputImage).then(response => response.blob());
      const file = new File([blob], "filename", { type: blob.type });
      const formData = new FormData();
      formData.append('image', file);

      const data = await fetch(IMAGE_AI_BACKEND, {
        method: 'POST',
        body: formData,
      }).then(response => response.json())
      
      const nude_detection = data.nude_detection
      const face_detection = data.face_detection.map(it=>{return {"score":it.score}})
      const identifiedAs = Object.keys(nude_detection).reduce((a, b) => parseFloat(nude_detection[a]) > parseFloat(nude_detection[b]) ? a : b);
      const first_face_accuracy = face_detection.length === 1?face_detection[0].score:0
      const AIResponse  = {
        face_detection:face_detection,
        nude_detection:nude_detection,
        face_count:face_detection.length,
        first_face_accuracy:first_face_accuracy,
        identifiedAs:identifiedAs,
      }
      
      return AIResponse

    }catch(e){
      throw new Error("Image AI analysis Failed")
    }

  }

export default processImageAI