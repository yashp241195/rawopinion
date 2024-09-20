import React from 'react'
import Typography from '@mui/material/Typography';
import useWindowSize from '../../hooks/useWindowSize';


const Terms = () => {

    const [width, ] = useWindowSize()

    const termslist = [
      {
        pt: "Eligibility: You must be at least 16 years old to use RawOpinion. By using the app, you represent and warrant that you meet this eligibility requirement."
      },
      {
        pt: "Account Creation: You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and up-to-date information during the account creation process."
      },
      {
        pt: "App Usage: RawOpinion is intended for personal use to facilitate open discussions. You agree not to use the app for any illegal or unauthorized purposes and are solely responsible for your interactions with other users."
      },
      {
        pt: "Content Guidelines: You agree not to post or share any content that is unlawful, offensive, harmful, or violates the rights of others. We reserve the right to remove any content that breaches these guidelines or disrupts the platform’s integrity."
      },
      {
        pt: "Intellectual Property: All intellectual property rights in the app and its content belong to us. You may not use, modify, or distribute any copyrighted materials or content shared by others without explicit permission."
      },
      {
        pt: "Privacy: We collect and use your personal information in accordance with our Privacy Policy. By using the app, you consent to the collection and use of your data as outlined in the Privacy Policy."
      },
      {
        pt: "Termination: We reserve the right to suspend or terminate your account if you violate these Terms or engage in prohibited activities. You may terminate your account at any time by following the procedures within the app."
      },
      {
        pt: "Disclaimer of Warranty: The app is provided 'as is' without any warranties. We do not guarantee the accuracy, availability, or reliability of the app, its content, or the decentralized blockchain network."
      },
      {
        pt: "Limitation of Liability: We shall not be liable for any indirect, incidental, or consequential damages arising out of your use or inability to use the app or from discussions occurring within the platform."
      },
      {
        pt: "Governing Law: These Terms shall be governed by and construed in accordance with the laws of [jurisdiction]. Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts in [jurisdiction]."
      }
    ];
    


    const getDesktopView = () => {
      return <div style={{padding:20,  }}>
              <Typography variant="h5" gutterBottom>
                Terms of Service
              </Typography>
              <div style={{height:"55vh", overflowY:"auto",padding:2, paddingRight:20 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Please read these Terms of Service ("Terms") carefully before using our Workoso app. By accessing or using our app, you agree to be bound by these Terms.
                </Typography>
                {
                  termslist.map((item, i)=>{
                    return <Typography key={i} variant="subtitle2" gutterBottom>{i+1}. {item.pt}</Typography>
                  })
                }
                <Typography variant="subtitle2" gutterBottom>
                By using our dating app, you agree to comply with these Terms. If you do not agree with any provisions of these Terms, please refrain from using the app.
                </Typography>
              </div>
            </div>

            }

    const getMobileView = () => {
      return <div style={{padding:20,  }}>
                <div style={{fontSize:22}}>
                  Terms of Service
                </div>
                <div style={{height:"65vh", overflowY:"auto", paddingRight:10 }}>
                  <div style={{paddingTop:15,paddingBottom:15,  fontSize:14}}>
                  Please read these Terms of Service ("Terms") carefully before using our Workoso app. By accessing or using our app, you agree to be bound by these Terms.
                  </div>
                  {
                    termslist.map((item, i)=>{
                      return <div key={i} style={{ fontFamily:"sans-serif", fontSize:14, paddingBottom:15, color:"#595959" }}>{i+1}. {item.pt}</div>
                    })
                  }
                  <div style={{ fontFamily:"sans-serif", fontSize:14, paddingBottom:15, color:"#595959" }}>
                    By using our dating app, you agree to comply with these Terms. If you do not agree with any provisions of these Terms, please refrain from using the app.
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

export default Terms