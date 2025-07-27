import React from 'react'
import Typography from '@mui/material/Typography';
import useWindowSize from '../../hooks/useWindowSize';


const Privacy = () => {

    const [width, ] = useWindowSize()

    /*
    






    */ 

    const privacypolicylist = [
      {
        pt:"Information Collection: We collect your username, email address, location, and any content you share on the platform to create your profile and enable participation in discussions. We may also collect feedback or votes from other users on your posts."
      },
      {
        pt:"Information Usage: Your data is used to facilitate discussions, personalize your experience, and improve the platform's functionality."
      },
      {
        pt:"Data Protection: We employ industry-standard security measures to protect your data from unauthorized access. Trusted third-party services may be engaged for storage, analytics, or communication support."
      },
      {
        pt:"Information Sharing: We do not sell, rent, or share your personal information without your consent, except as required by law. Discussions are decentralized and stored on the blockchain, ensuring transparency and immutability."
      },
      {
        pt:"Data Retention: We retain your personal information as long as necessary to maintain your account or as required by law. Posts on the blockchain are permanent and cannot be deleted."
      },
      {
        pt:"Updates and Contact: We may update this Privacy Policy and will notify you accordingly. For any questions or concerns, feel free to contact our support team."
      },

    ]



    const getDesktopView = () => {
      return <div style={{padding:20,  }}>
              <Typography variant="h5" gutterBottom>
                Privacy Policy
              </Typography>
              <div style={{height:"55vh", overflowY:"auto",padding:2, paddingRight:20 }}>
                <Typography variant="subtitle2" gutterBottom>
                At Opinion, we prioritize your privacy and are committed to protecting your personal information. By using our Opinion app, you consent to our data practices outlined below.
                </Typography>
                {
                  privacypolicylist.map((item, i)=>{
                    return <Typography key={i} variant="subtitle2" gutterBottom>{i+1}. {item.pt}</Typography>
                  })
                }
                <Typography variant="subtitle2" gutterBottom>
                  By using our app, you agree to this Privacy Policy. Your privacy, security, and freedom of speech are our top priorities at Opinion.
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
                  At Opinion, we prioritize your privacy and are committed to protecting your personal information. By using our Opinion app, you consent to our data practices outlined below.
                  </div>
                  {
                    privacypolicylist.map((item, i)=>{
                      return <div key={i} style={{ fontFamily:"sans-serif", fontSize:14, paddingBottom:15, color:"#595959" }}>{i+1}. {item.pt}</div>
                    })
                  }
                  <div style={{ fontFamily:"sans-serif", fontSize:14, paddingBottom:15, color:"#595959" }}>
                    By using our app, you agree to this Privacy Policy. Your privacy, security, and freedom of speech are our top priorities at Opinion.
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