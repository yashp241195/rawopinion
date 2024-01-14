import React from 'react'
import Typography from '@mui/material/Typography';
import useWindowSize from '../../hooks/useWindowSize';


const FAQ = () => {

  const [width,] = useWindowSize()

    const faqlist = [
      {
        "question": "What exactly is Workoso?",
        "answer": "Workoso is a sophisticated recruitment platform that links job seekers and employers worldwide, streamlining hiring procedures through innovative blockchain integration."
      },
      {
        "question": "How does Workoso utilize blockchain technology?",
        "answer": "Workoso leverages blockchain for secure and unchangeable sharing of work reviews between candidates and employers. This ensures reviews remain intact and credible once published on the platform."
      },
      {
        "question": "Can I or anyone edit or remove work reviews once posted on Workoso Blockchain?",
        "answer": "Workoso operates on blockchain technology, making work reviews immutable once published for transparency and reliability. Work review data stored on blockchain database at different locations (physically/virtually) can be edited/removed by unauthorized access (hacking) or accidentally but the latest blockchain hash of work review always trace the point of incorrections and correct it."
      },
      {
        "question": "How are candidates matched with job opportunities on Workoso?",
        "answer": "Workoso employs sophisticated algorithms considering skills, experience, and preferences to match candidates with suitable job listings, optimizing relevance and efficiency in recruitment."
      },
      {
        "question": "How can I delete my account?",
        "answer": "If you wish to delete your account, you can do so within the app's settings. Please note that deleting your account will remove all your profile information and connections permanently except work reviews deployed over blockchain."
      },
      {
        "question": "What should I do if I encounter an issue or have a question?",
        "answer": "If you have any issues, questions, or need assistance, please reach out to our support team. We are here to help and ensure you have a positive experience on our recruitment app. Please have a look at minimum working age required by your state to avoid future conflicts."
      },
      {
        "question": "Can I change my profile information and preferences?",
        "answer": "Yes, you can edit and update your profile information and preferences at any time. Simply navigate to the appropriate settings within the app and make the desired changes."
      },
      {
        "question": "Is there a minimum age requirement to use the app?",
        "answer": "Yes, you must be at least 16 years old to use our recruitment app. We strictly enforce this requirement to ensure a safe and responsible user community."
      },
      {
        "question": "Are there any fees associated with using the app?",
        "answer": "Our basic features are free to use, but we may offer additional premium features or subscriptions that require payment. The details of any fees or subscription options will be clearly communicated within the app."
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