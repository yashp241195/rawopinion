import React from 'react'
import Typography from '@mui/material/Typography';
import useWindowSize from '../../hooks/useWindowSize';


const Privacy = () => {

    const [width, ] = useWindowSize()

    const privacypolicylist = [
      {
        pt:"Information Collection: We collect your name, email, location, education details, work experience and work preferences to create your profile and improve recruitment process. We also gather recommendations from connections."
      },
      {
        pt:"Information Usage: Your data is used for recruitment purposes."
      },
      {
        pt:"Data Protection: We employ industry-standard security measures to safeguard your data from unauthorized access. We may engage trusted third-party services for storage, analytics, or communication."
      },
      {
        pt:"Information Sharing: We do not sell, rent, or share your personal information without your consent, except as required by law. We encourage important conversations to take place on secure private messengers."
      },
      {
        pt:"Data Retention: We retain your personal information as long as necessary to fulfill app purposes or as required by law."
      },
      {
        pt:"Updates and Contact: We may update this Privacy Policy and will notify you accordingly. For questions or concerns, contact our support team."
      },

    ]



    const getDesktopView = () => {
      return <div style={{padding:20,  }}>
              <Typography variant="h5" gutterBottom>
                Privacy Policy
              </Typography>
              <div style={{height:"55vh", overflowY:"auto",padding:2, paddingRight:20 }}>
                <Typography variant="subtitle2" gutterBottom>
                  We prioritize your privacy and are committed to protecting your personal information. By using our Workoso app, you consent to our data practices outlined below.
                </Typography>
                {
                  privacypolicylist.map((item, i)=>{
                    return <Typography key={i} variant="subtitle2" gutterBottom>{i+1}. {item.pt}</Typography>
                  })
                }
                <Typography variant="subtitle2" gutterBottom>
                  By using our app, you agree to our Privacy Policy. We prioritize your privacy, security, and satisfaction throughout recruitment process.
                </Typography>
              </div>
            </div>

            }

    const getMobileView = () => {
      return <div style={{padding:20,  }}>
                <div style={{ fontSize:22 }}>
                  Privacy Policy
                </div>
                <div style={{height:"65vh", overflowY:"auto", paddingRight:10 }}>
                  <div style={{paddingTop:15,paddingBottom:15,  fontSize:14}}>
                    We prioritize your privacy and are committed to protecting your personal information. By using our Workoso app, you consent to our data practices outlined below.
                  </div>
                  {
                    privacypolicylist.map((item, i)=>{
                      return <div key={i} style={{ fontFamily:"sans-serif", fontSize:14, paddingBottom:15, color:"#595959" }}>{i+1}. {item.pt}</div>
                    })
                  }
                  <div style={{ fontFamily:"sans-serif", fontSize:14, paddingBottom:15, color:"#595959" }}>
                    By using our app, you agree to our Privacy Policy. We prioritize your privacy, security, and satisfaction throughout your recruitment process.
                  </div>
                </div>
              </div>
              }

  return (
    <div>
        {(width>800)?getDesktopView():<></>}
        {(width<800)?getMobileView():<></>}
    </div>
  )
}

export default Privacy