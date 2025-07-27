import React from 'react'
import Typography from '@mui/material/Typography';
import useWindowSize from '../../hooks/useWindowSize';


const About = () => {

    const [width, ] = useWindowSize()

    const getDesktopView = () => {
        return <div style={{padding:20, height:"62vh" }}>
                    <Typography variant="h5" gutterBottom>
                      About
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Welcome to Opinion — our discussion forum enhances freedom of speech, global accessibility, and
                      fosters open dialogue through seamless integration of blockchain technology. By leveraging blockchain, 
                      we ensure secure, uncensored conversations, promoting trust and transparency between users across 
                      diverse geographies. 
                      Join us now to revolutionize the way discussions happen.
                    </Typography>
                </div>
    }

    const getMobileView = () => {
      return <div style={{padding:18, height:"70vh", overflowY:"auto" }}>
                  <div style={{ fontSize:22 }}>
                    About 
                  </div>
                  <p style={{ fontSize:14, paddingTop:5, fontFamily:"sans-serif", color:"#595959"  }}>
                    Welcome to Opinion — our discussion forum enhances freedom of speech, global accessibility, and
                    fosters open dialogue through seamless integration of blockchain technology. By leveraging blockchain, 
                    we ensure secure, uncensored conversations, promoting trust and transparency between users across 
                    diverse geographies. 
                  </p>
                  <p style={{ fontSize:14, paddingTop:5,fontFamily:"sans-serif", color:"#595959"}} >
                    Join us now to revolutionize the way discussions happen.
                  </p>
              </div>
  }

  return (
    <div>
        {(width>800)?getDesktopView():<></>}
        {(width<800)?getMobileView():<></>}
    </div>
  )
}

export default About