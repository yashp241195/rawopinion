import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import useWindowSize from '../../hooks/useWindowSize';
import TextField from '@mui/material/TextField';


const Center = () => {

  const [width,] = useWindowSize()

  const [ search, setSearch] = useState("")

  const faqlist = [
    {
      "question": "What is RawOpinion?",
      "answer": "RawOpinion is a blockchain-based discussion forum that allows users to freely express their opinions. It offers an optional feature to publish posts and comments on the blockchain, ensuring secure and transparent conversations."
    },
    {
      "question": "How does RawOpinion use blockchain?",
      "answer": "RawOpinion allows users to optionally publish posts and comments on the blockchain. This feature ensures that content is secure and transparent, though it is not mandatory for all interactions on the platform."
    },
    {
      "question": "Is my data secure on RawOpinion?",
      "answer": "Yes, RawOpinion uses industry-standard security measures to protect your data. If you choose to publish content on the blockchain, it will be secured and immutable. Posts and comments can be deleted from the app, but once published on the blockchain, they cannot be removed and will remain accessible from the blockchain node."
    },
    {
      "question": "Can I delete my posts or comments on RawOpinion?",
      "answer": "You can delete posts and comments from the app, but if they were published on the blockchain, they cannot be deleted from the blockchain. Once content is published on the blockchain, it becomes permanent and immutable, ensuring transparency and accountability."
    },
    {
      "question": "Who can use RawOpinion?",
      "answer": "Anyone over the age of 16 can use RawOpinion. The platform is designed to facilitate global conversations and provides options for users to manage their content according to their preferences."
    },
    {
      "question": "How do I publish a post or comment on the blockchain?",
      "answer": "When creating a post or comment, you will have the option to choose whether to publish it on the blockchain. If you select this option, the content will be secured on the blockchain and cannot be deleted from it."
    },
    {
      "question": "What should I do if I encounter issues on RawOpinion?",
      "answer": "If you encounter any issues while using RawOpinion, please contact our support team through the app or visit our website's support section for assistance."
    }
  ]
  
  

  function filterListByFrequency(searchTerm, itemList) {
    const frequencyMap = {};
    itemList.forEach((item) => {
      const frequency = ((item.question + item.answer).match(new RegExp(searchTerm, 'gi')) || []).length;
      frequencyMap[item.question] = frequency;
    });
    const sortedList = itemList.sort((a, b) => frequencyMap[b.question] - frequencyMap[a.question]);
    return sortedList;
  }


  const getDesktopView = () => {
    return <div style={{ padding: 20, }}>
      <Typography variant="h5" gutterBottom>
        Help Center
      </Typography>
      <div style={{paddingBottom:20, width:200}}>
        <TextField 
        onKeyUp={(e)=>setSearch(e.target.value)}
        fullWidth id="standard-basic" label="Search" variant="standard" />
      </div>
      <div style={{ height: "45vh", overflowY: "auto", padding: 2, paddingRight: 20 }}>
        {
          filterListByFrequency(search, faqlist).map((item, i) => {
            return <div key={i} >
                    <Typography variant="subtitle1" gutterBottom>Q. {item.question}</Typography>
                    <Typography variant="subtitle2" gutterBottom>{item.answer}</Typography>
                  </div>
          })
        }
      </div>
    </div>

  }

  const getMobileView = () => {
    return <div style={{ padding: 20,}}>
      <div style={{ fontSize:22 }}>
        Help Center
      </div>
      <div style={{paddingBottom:10, width:220 }}>
        <TextField 
          onKeyUp={(e)=>setSearch(e.target.value)}
          fullWidth id="standard-basic" label="Search" variant="standard" />
      </div>
      <div style={{ height: "55vh", overflowY: "auto", padding: 2,  }}>
        {
          filterListByFrequency(search, faqlist).map((item, i) => {
            return <div  key={i} >
                    <p style={{ fontSize:14, fontWeight:"bold",fontFamily:"sans-serif" }}>{item.question}</p>
                    <p style={{ fontSize:14, fontFamily:"sans-serif", color:"#595959" }}>{item.answer}</p>
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

export default Center