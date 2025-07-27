import React from 'react'
import Typography from '@mui/material/Typography';
import useWindowSize from '../../hooks/useWindowSize';


const FAQ = () => {

  const [width,] = useWindowSize()

    const faqlist = [
      {
        "question": "What is Opinion?",
        "answer": "Opinion is a blockchain-based discussion forum that allows users to freely express their opinions. It offers an optional feature to publish posts and comments on the blockchain, ensuring secure and transparent conversations."
      },
      {
        "question": "How does Opinion use blockchain?",
        "answer": "Opinion allows users to optionally publish posts and comments on the blockchain. This feature ensures that content is secure and transparent, though it is not mandatory for all interactions on the platform."
      },
      {
        "question": "Is my data secure on Opinion?",
        "answer": "Yes, Opinion uses industry-standard security measures to protect your data. If you choose to publish content on the blockchain, it will be secured and immutable. Posts and comments can be deleted from the app, but once published on the blockchain, they cannot be removed and will remain accessible from the blockchain node."
      },
      {
        "question": "Can I delete my posts or comments on Opinion?",
        "answer": "You can delete posts and comments from the app, but if they were published on the blockchain, they cannot be deleted from the blockchain. Once content is published on the blockchain, it becomes permanent and immutable, ensuring transparency and accountability."
      },
      {
        "question": "Who can use Opinion?",
        "answer": "Anyone over the age of 16 can use Opinion. The platform is designed to facilitate global conversations and provides options for users to manage their content according to their preferences."
      }
    ]
    
    
    
  




  const getDesktopView = () => {
    return <div style={{ padding: 20, }}>
      <Typography variant="h5" gutterBottom>
        Frequently Asked Questions (FAQs)
      </Typography>
      <div style={{ height: "55vh", overflowY: "auto", padding: 2, paddingRight: 20 }}>
        {
          faqlist.map((item, i) => {
            return <div  key={i} >
                    <Typography variant="subtitle1" gutterBottom>Q{i + 1}. {item.question}</Typography>
                    <Typography variant="subtitle2" gutterBottom>{item.answer}</Typography>
                  </div>
          })
        }
      </div>
    </div>

  }

  const getMobileView = () => {
    return <div style={{ padding: 20,}}>
      <div style={{fontSize:22}}>
        FAQs
      </div>
      <div style={{ height: "65vh", overflowY: "auto", padding: 2, paddingTop:10 }}>
        {
          faqlist.map((item, i) => {
            return <div  key={i} >
                    <div style={{ fontFamily:"sans-serif", fontSize:14, paddingBottom:15, fontWeight:"bold" }}>{item.question}</div>
                    <div style={{ fontFamily:"sans-serif", fontSize:14, paddingBottom:15, color:"#595959" }}>{item.answer}</div>
                  </div>
          })
        }
      </div>
    </div>
  }

  return (
    <div>
      {(width > 800) ? getDesktopView() : <></>}
      {(width < 800) ? getMobileView() : <></>}
    </div>
  )
}

export default FAQ