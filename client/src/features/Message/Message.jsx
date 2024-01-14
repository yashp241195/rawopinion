import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import Grid from '@mui/material/Grid';
import Senderslist from '../../components/Message/Senderslist';
import Conversation from '../../components/Message/Conversation';
import { useNavigate, useParams } from 'react-router-dom';

const Message = () => {

  const [width,] = useWindowSize()
  const {username} = useParams()

  const getDesktopView = () => {
    return <Grid  style={{}} container>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <div style={{border:'1px solid #fafafa', height:"75vh"}}>
                  <Senderslist />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{border:'1px solid #fafafa', height:"75vh"}}>
                  <Conversation />
                </div>
              </Grid>
              <Grid item xs={1}></Grid>
          </Grid>

  }

  const getMobileView = () => {
    return <div>
      {username == "to"?<Senderslist />:<Conversation />}
    </div>
  }

  return (
    <div style={{display:"flex", justifyContent:"center"}}>
        {(width>800)?getDesktopView():<></>}
        {(width<800)?getMobileView():<></>}
    </div>
  )
}

export default Message