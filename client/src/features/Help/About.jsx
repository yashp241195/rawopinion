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
                      Welcome to Workoso — our recruitment platform enhances work availability, flexibility, and expedites hiring processes through seamless integration of blockchain technology. 
                      By leveraging blockchain, we ensure a secure and unaltered exchange of work reviews, fostering trust and transparency between candidates and companies across distant geographies. 
                      Join us now to revolutionize the way recruitment works.
                    </Typography>
                </div>
    }

    const getMobileView = () => {
      return <div style={{padding:18, height:"70vh", overflowY:"auto" }}>
                  <div style={{ fontSize:22 }}>
                    About 
                  </div>
                  <p style={{ fontSize:14, paddingTop:5, fontFamily:"sans-serif", color:"#595959"  }}>
                    Welcome to Workoso — our recruitment platform enhances work availability, flexibility, and expedites hiring processes through seamless integration of blockchain technology. 
                    By leveraging blockchain, we ensure a secure and unaltered exchange of work reviews, fostering trust and transparency between candidates and companies across distant geographies. 
                  </p>
                  <p style={{ fontSize:14, paddingTop:5,fontFamily:"sans-serif", color:"#595959"}} >
                    Join us now to revolutionize the way recruitment works.
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