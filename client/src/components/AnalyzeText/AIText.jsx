
import { TEXT_AI_BACKEND } from "../../config/config";

const processTextAI = async (inputText, type) => {

  try{

    let inputQuery = ``

    if(type == "POST"){ 
        
        inputQuery = `
        
            Please analyze the following content to check for potential issues related to 
            
            a. hate speech, misinformation, pseudoscience, violence, harassment, misleading information, or illegal activities. 
            b. generalised quotes (espcially motivational) or statements with no nuances.
            c. if question is asked then make sure it must be bit specific.
            d. blaming people for their condition without any nuonces.

            Please list each identified issue along with a brief description and suggestions for improvement. 
            Keep them short and minimal and combine similar issues.

            Please don't analyze and return empty content_analysis array below

            a. People talking about something related to their personal life or experiences and it doesn't contain anything hateful or harmful.

            Provide the output in JSON format with the following structure:

            {
                "content_analysis": [
                    {
                        "issue_type": "<Type of Issue (e.g., Hate Speech, Misinformation)>",
                        "description": "<Brief description of the issue identified in the content>",
                        "suggestions": "<Suggestions for improving or resolving the issue>"
                    }
                ]
            }

            CONTENT STARTS HERE

            ${inputText}

            CONTENT ENDS HERE

            Please return only JSON nothing else so that it can be parse in javascript from the string

            JSON.parse(string)

        `

    }


    const formData = new FormData();
    formData.append('query', inputQuery);

    const data = await fetch(TEXT_AI_BACKEND, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())

    const AIResponse  = {
        text: inputText,
        type:type,
        ai: data
    }
    
    return AIResponse
  }
  catch(e){
    throw new Error("Text AI analysis Failed")
  }

}

export default processTextAI