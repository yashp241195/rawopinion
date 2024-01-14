import React, { useEffect, useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { BsMessenger } from 'react-icons/bs'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Avatar from '@mui/material/Avatar';
import { Button, ListItemButton } from '@mui/material';
import { useQuery, gql, useMutation } from '@apollo/client'
import TelegramIcon from '@mui/icons-material/Telegram';
import { Modal, Menu, MenuItem, CircularProgress } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Link, useSearchParams } from 'react-router-dom'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


const Connections = () => {

  const [width,] = useWindowSize()
  const [searchParams] = useSearchParams();

  const GET_MY_ACTIVITY_QUERY = gql`
    query GetActivities{
      getActivities{
        activityStatement 
        postId 
        postedBy 
        postTitle
        postImage{
          imgid
          icon_url
        } 
      }
    }
  `

  const SEND_REQUEST_QUERY = gql`
    mutation SendRequest($requestInput:RequestInput){
      sendRequest(requestInput:$requestInput)
    }
  `

  const { data, loading, error } = useQuery(GET_MY_ACTIVITY_QUERY, { fetchPolicy: "network-only" })
  const [ doSendRequest, { data: data1, loading: loading1, error: error1 } ] = useMutation(SEND_REQUEST_QUERY, { fetchPolicy: "network-only" })

  const [activitylist, setActivitylist] = useState(null)

  const [openModal, setOpenModal] = useState(false)
  const [feedback, setFeedback] = React.useState(null);

  const [selected, setSelected] = useState(-1)
  const [selectedMenu, setSelectedMenu] = useState(null)

  const [selectedActivityType, setSelectedActivityType] = useState("My Posts")

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, index) => {
    setSelected(index)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    setSelectedMenu(option)
    setOpenModal(true)
    setAnchorEl(null);
  };

  const wrapMenuItem = (item) => {
    const { minWidth, label, value, menuItemList } = item
    return <FormControl sx={{ m: 1, minWidth: minWidth, }} size="small">
      {/* <InputLabel>{label}</InputLabel> */}
      <Select defaultValue={''}
        onChange={(e) => {
          // setProfileInfo({ ...profileinfo, [value]: e.target.value })
        }}
        value={"followers"}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
        variant='standard'
        size="small" 
        // label={label} 
        >
        <MenuItem value=""><em>None</em></MenuItem>
        {
          menuItemList.map((it, i) => {
            return <MenuItem key={i} value={it}>{it}</MenuItem>
          })
        }
      </Select>
    </FormControl>
  }

  if (data) {
    if (!activitylist) {
      if (data.getActivities) {
        setActivitylist(data.getActivities)
      }
    }
  }

  if (error) { console.log("error", error) }

  useEffect(()=>{


    if (data1) {
      const { public_username } = activitylist[selected]

      switch(selectedMenu){
        case "GIVE_FEEDBACK":
          break;
        case "REMOVE_MATCH":
          const newList1 = activitylist.filter(it=>it.public_username !== public_username)
          setActivitylist(newList1)
          break;
        case "BLOCK":
          const newList2 = activitylist.filter(it=>it.public_username !== public_username)
          setActivitylist(newList2)
          break;
      }

      setOpenModal(false)
    }
  

  },[data1])


  const handleSendRequest = () => {
    
    const { public_username } = activitylist[selected]
    
    if(public_username){

      switch (selectedMenu) {
        case "GIVE_FEEDBACK":
          if(feedback){
            if(feedback.texting && feedback.speaking && feedback.listening){
              doSendRequest({
                variables: {
                  requestInput: {
                    public_username: public_username,
                    communication: {
                      texting:feedback && feedback.texting,
                      speaking:feedback && feedback.speaking,
                      listening:feedback && feedback.listening
                    },
                  }
                },
                fetchPolicy: "network-only"
              })
            }
          }
          
          break;
        case "REMOVE_MATCH":
          doSendRequest({
            variables: {
              requestInput: {
                public_username: public_username,
                reqStatus:"UNMATCH",
              }
            },
            fetchPolicy: "network-only"
          })
          break;
        case "BLOCK":
          doSendRequest({
            variables: {
              requestInput: {
                public_username: public_username,
                reqStatus:"BLOCK",
              }
            },
            fetchPolicy: "network-only"
          })
          break;
      }
    }
  }

  const wrapChip = ({ id, label, }) =>{
    return <Chip size="small" 
              style={{ 
                fontSize:"0.75rem",
                margin:3, color: selectedActivityType == label ? "#fff" : "#000", 
                background: selectedActivityType == label ? "#595959" : "#fff", 
                border:"1px solid #efefef"
              }} 
              onClick={()=>{  
                setSelectedActivityType(label)
              }} label={label} variant='outlined' 
            />
          
  }

  console.log("selectedActivityType", selectedActivityType)

  const rowRenderer = ({ key, index, style }) => {

    const {
      activityStatement, postId, postedBy,  postTitle, postImage
    } = activitylist[index]

    return <div key={key} 
              style={{ 
                ...style, width: "97%", border: "1px solid #efefef",  
                height: selectedActivityType === "My Activities"?140:120, 
                borderRadius:5,  
                }}>
      {
        selectedActivityType === "My Activities"?
          <div style={{ display: "flex", height: 15, padding:5, fontSize:"1rem", }} >
            {activityStatement}
          </div>
        :""
      }
      <div style={{ display: "flex", height: 85, borderRadius:5 , }} >
        <div style={{ paddingLeft: 10, paddingTop: 5 }}>
          <div style={{ display: "flex", width: 300, }}>
            <div style={{ paddingTop: 7 }}>
              <Avatar
                variant="rounded"
                src={postImage.icon_url}
                sx={{ height: 60, width: 60 }} />
            </div>
            <div style={{ paddingLeft: 10, paddingTop: 0, width: 300 }}>
              <ListItemText
                sx={{ width: 300 }}
                primary={
                  <div style={{ fontSize: 16, display:"flex" }}>
                    <div>
                      <Link style={{color:"#000"}} to={"/profile/view/" + postId}>
                        {postedBy} 
                      </Link>
                    </div>
                    <div style={{ color:"#595959", paddingLeft:10, fontSize:"0.8rem" }} >
                      1 Jan, 2024
                    </div>
                    
                  </div>
                }
                secondary={
                  <div>
                    <div style={{ fontSize: 13 }}>
                      {postTitle} 
                    </div>
                    <div style={{ fontSize: 13 }}>
                      {/* {openfor == "DISCUSSION"?"Open for discussion":""} */}
                    </div>
                  </div>
                }
              ></ListItemText>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div style={{  fontSize:"0.8rem", paddingTop:10, paddingLeft:5, paddingRight:5 }}>
          <div>22 Upvotes</div>
          <div>5 Downvote</div>
          <div>3 Context out</div>
          <div>44 Comments</div>
        </div>
        <div style={{ width: 10 }}></div>
      </div>
      <div style={{ display: "flex", height: 15, borderRadius:5, padding:5, fontSize:"0.9rem", }} >
        <div style={{ flexGrow:1 }}>
 
        </div>
        <div style={{ color:"#595959", paddingRight:10 }}>
            Published on blockchain : VGHgFiFGefEyoiWWWdsdFuHs
        </div>
      </div>
    </div>
  };

  const rowMobileRenderer = ({
    key,
    index,
    style,
  }) => {

    const {
      activityStatement, postId, postedBy,  postTitle, postImage
    } = activitylist[index]


    return <div key={key} style={{ ...style,  }}>
      <div style={{ display: "flex", border: "1px solid #fafafa", width:"97%" , paddingTop:10,  paddingBottom:10, borderRadius:5 }} >
        <div style={{ flexGrow: 1, }}>
          <Link style={{ color: "#000", textDecoration: "none", }} to={"/profile/view/" + postId} >
            <div style={{ display: "flex",  }}>
              <div style={{ paddingTop: 0, paddingRight:7, paddingLeft:7 }}>
                <Avatar
                  src={postImage.icon_url}
                  variant="round"
                  sx={{ height: 50, width: 50 }} />
              </div>
              <div style={{flexGrow:1}}>
                <div style={{ fontSize: "1rem",paddingTop:0 }}>
                  {postedBy} 
                </div>
                <div style={{  paddingTop:2, }}>
                  <div style={{ fontSize: "0.8rem",color:"#595959" }}>
                    {postTitle}
                  </div>
                  <div style={{ fontSize: "0.8rem", color:"#595959" }}>
                    {/* {openfor} */}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  };

  const displayDesktopModel = () => {

    let content = ''

    if (selectedMenu == "GIVE_FEEDBACK") {

      const { firstname, lastname } = activitylist[selected]
      content = <div style={{ display: "flex", justifyContent: "center", border: "1 px solid #efefef", background: "#fff", height: 250, width: 400 }}>
        <div style={{ display: "flex", flexDirection: "column", width: 270 }}>
          <div style={{ fontSize: 20, paddingTop: 8 }}>
            Give feedback to {firstname} {lastname}
          </div>
          <div style={{ flexGrow: 1 }}></div>
          <div style={{ display: "flex", fontSize: 18, paddingTop: 10 }}>
            <div style={{ width: 80 }}>
              Texting
            </div>
            <div>
              <Rating
                size="small"
                name="simple-controlled"
                value={feedback && feedback.texting}
                onChange={(event, newValue) => {
                  setFeedback({ ...feedback, texting: newValue });
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 18, paddingTop: 10 }}>
            <div style={{ width: 80 }}>
              Speaking
            </div>
            <div>
              <Rating

                size="small"
                name="simple-controlled"
                value={feedback && feedback.speaking}
                onChange={(event, newValue) => {
                  setFeedback({ ...feedback, speaking: newValue });
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 18, paddingTop: 10 }}>
            <div style={{ width: 80 }}>
              Listening
            </div>
            <div>
              <Rating
                size="small"
                name="simple-controlled"
                value={feedback && feedback.listening}
                onChange={(event, newValue) => {
                  setFeedback({ ...feedback, listening: newValue });
                }}
              />
            </div>
          </div>
          <div style={{ flexGrow: 1 }}></div>
          <div style={{ fontSize: 14, paddingTop: 10, color: "#595959" }}>Only total score will be notified to {firstname}</div>
          <div style={{ color: "red" }}>{error1 && "Error : Can't send feedback"}</div>
          <div style={{ paddingTop: 10 }}>
            <Button
              onClick={() => {
                handleSendRequest()
              }}
              style={{ textTransform: "none" }}
              size="small"
              variant='contained'>Submit Feedback</Button>
            <Button
              onClick={() => {
                setOpenModal(false)
                setFeedback(null)
              }}
              color="error"
              style={{ textTransform: "none", marginLeft: 10 }}
              size="small"
              variant='contained'>Cancel</Button>
          </div>
          <div style={{ flexGrow: 1 }}></div>
        </div>
      </div>
    }

    if (selectedMenu == "REMOVE_MATCH") {

      const { firstname, lastname } = activitylist[selected]

      content = <div style={{ display: "flex", justifyContent: "center", border: "1 px solid #fff", background: "#fff", height: 250, width: 400 }}>
        <div style={{ paddingTop: 70, width: 250 }}>
          <div style={{ fontSize: 20 }}>
            Do you really wish to unmatch with {firstname} ?
          </div>
          <div style={{ color: "red" }}>{error1 && "Error : Can't remove Connections"}</div>
          <div style={{ paddingTop: 30 }}>
            <Button
              onClick={() => {
                handleSendRequest()
              }}
              style={{ textTransform: "none" }}
              size="small"
              color="error"
              variant='contained'>Unmatch</Button>
            <Button
              onClick={() => {
                setOpenModal(false)
                setFeedback(null)
              }}
              color="error"
              style={{ textTransform: "none", marginLeft: 10 }}
              size="small"
              variant='outlined'>No</Button>
          </div>
        </div>
      </div>
    }

    if (selectedMenu == "BLOCK") {

      const { firstname, lastname } = activitylist[selected]

      content = <div style={{ display: "flex", justifyContent: "center", border: "1 px solid #fff", background: "#fff", height: 250, width: 400 }}>
        <div style={{ paddingTop: 70, width: 250 }}>
          <div style={{ fontSize: 20 }}>
            Do you really wish to block {firstname} ?
          </div>
          <div style={{ color: "red" }}>{error1 && "Error : Can't block"}</div>
          <div style={{ paddingTop: 30 }}>
            <Button
              onClick={() => {
                handleSendRequest()
              }}
              style={{ textTransform: "none" }}
              size="small"
              color="error"
              variant='contained'>Block</Button>
            <Button
              onClick={() => {
                setOpenModal(false)
                setFeedback(null)
              }}
              color="error"
              style={{ textTransform: "none", marginLeft: 10 }}
              size="small"
              variant='outlined'>No</Button>
          </div>
        </div>
      </div>
    }

    return <Modal
      style={{
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: "#fff",
        width: 400,
        height: 250,
        backgroundColor: '#ffffff00',
        border: '2px solid #efefef',
        boxShadow: 24,
        p: 4,
      }}

      open={openModal}
      onClose={() => { setOpenModal(false) }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{ display: "flex", height: "60vh", justifyContent: "center" }}>
        {content}
      </div>
    </Modal>

  }

  const displayMobileModel = () => {

    let content = ''

    if (selectedMenu == "GIVE_FEEDBACK") {

      const { firstname, lastname } = activitylist[selected]
      content = <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "1 px solid #efefef", background: "#fff", height: "100vh", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: 250, }}>
            <div style={{ fontSize: 20 }}>
              Give feedback to {firstname} {lastname}
            </div>
            <div style={{ display: "flex", fontSize: 16, paddingTop: 20 }}>
              <div style={{ width: 80 }}>
                Texting
              </div>
              <div>
                <Rating
                  size="small"
                  name="simple-controlled"
                  value={feedback && feedback.texting}
                  onChange={(event, newValue) => {
                    setFeedback({ ...feedback, texting: newValue });
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 16, paddingTop: 10 }}>
              <div style={{ width: 80 }}>
                Speaking
              </div>
              <div>
                <Rating
                  size="small"
                  name="simple-controlled"
                  value={feedback && feedback.speaking}
                  onChange={(event, newValue) => {
                    setFeedback({ ...feedback, speaking: newValue });
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 16, paddingTop: 10 }}>
              <div style={{ width: 80 }}>
                Listening
              </div>
              <div>
                <Rating
                  size="small"
                  name="simple-controlled"
                  value={feedback && feedback.listening}
                  onChange={(event, newValue) => {
                    setFeedback({ ...feedback, listening: newValue });
                  }}
                />
              </div>
            </div>
            <div style={{ color: "red" }}>{error1 && "Error : Can't send feedback"}</div>
            <div style={{ paddingTop: 15 }}>
              <Button
                onClick={() => {
                  handleSendRequest()
                }}
                style={{ textTransform: "none" }}
                size="small"
                variant='contained'>Submit Feedback</Button>
              <Button
                onClick={() => {
                  setOpenModal(false)
                  setFeedback(null)
                }}
                color="error"
                style={{ textTransform: "none", marginLeft: 10 }}
                size="small"
                variant='contained'>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    }

    if (selectedMenu == "REMOVE_MATCH") {

      const { firstname, lastname } = activitylist[selected]

      content = <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "1 px solid #efefef", background: "#fff", height: "100vh", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: 250, }}>
            <div style={{ fontSize: 20 }}>
              Do you really wish to unmatch with {firstname} ?
            </div>
            <div style={{ color: "red" }}>{error1 && "Error : Can't remove Connections"}</div>
            <div style={{ paddingTop: 30 }}>
              <Button
                onClick={() => {
                  handleSendRequest()
                }}

                style={{ textTransform: "none" }}
                size="small"
                color="error"
                variant='contained'>Unmatch</Button>
              <Button
                onClick={() => {
                  setOpenModal(false)
                  setFeedback(null)
                }}
                color="error"
                style={{ textTransform: "none", marginLeft: 10 }}
                size="small"
                variant='outlined'>No</Button>
            </div>
          </div>
        </div>
      </div>
    }

    if (selectedMenu == "BLOCK") {

      const { firstname, lastname } = activitylist[selected]

      content = <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "1 px solid #efefef", background: "#fff", height: "100vh", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: 250, }}>
            <div style={{ fontSize: 20 }}>
              Do you really wish to block {firstname} ?
            </div>
            <div style={{ color: "red" }}>{error1 && "Error : Can't block"}</div>
            <div style={{ paddingTop: 30 }}>
              <Button
                onClick={() => {
                  handleSendRequest()
                }}
                style={{ textTransform: "none" }}
                size="small"
                color="error"
                variant='contained'>Block</Button>
              <Button
                onClick={() => {
                  setOpenModal(false)
                  setFeedback(null)
                }}
                color="error"
                style={{ textTransform: "none", marginLeft: 10 }}
                size="small"
                variant='outlined'>No</Button>
            </div>
          </div>
        </div>
      </div>
    }

    return <Modal
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: "#fff",
        width: "100%",
        height: "100%",
        bgcolor: 'background.paper',
        border: '2px solid #efefef',
        boxShadow: 24,
        p: 4,
      }}

      open={openModal}
      onClose={() => { setOpenModal(false) }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{ display: "flex", height: "60vh", justifyContent: "center" }}>
        {content}
      </div>
    </Modal>
  }

  
  const getDesktopView = () => {
    return <div>
      {selected >= 0 ? displayDesktopModel() : <></>}
      <div style={{ display:"flex", flexDirection:"column", border:"1px solid #fff" }} >
        <div style={{ fontSize: 22, flexGrow:1 }}>My Activities</div>
        <div style={{ paddingTop:10, display:"flex" }}>
          { wrapChip({id:1, label:"My Posts" }) }
          { wrapChip({id:2, label:"My Posts on Blockchain" }) }
          { wrapChip({id:3, label:"My Activities" }) }
        </div>
      </div>
      <div style={{ height: 350, width: 560, paddingTop:10 }}>
        {activitylist && activitylist.length > 0 ?
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width * 0.98}
                height={height}
                rowCount={activitylist.length}
                rowHeight={selectedActivityType === "My Activities"?145:125}
                rowRenderer={rowRenderer}
                scrollToIndex={activitylist.findIndex(it => it.public_username === searchParams.get("user"))}
              />
            )}
          </AutoSizer>
          :
          <div style={{ color: "#595959", fontSize: 16 }}>
            No Activities found
          </div>
        }
      </div> 
     
    </div>
  }

  const getMobileView = () => {
    return <div >
      {selected >= 0 ? displayMobileModel() : <></>}
      <div style={{ display:"flex", flexDirection:"column", border:"1px solid #fff" }} >
        <div style={{ paddingTop:10, paddingBottom:10, display:"flex" }}>
          { wrapChip({id:1, label:"My Posts" }) }
          { wrapChip({id:2, label:"My Posts on Blockchain" }) }
          { wrapChip({id:3, label:"My Activities" }) }
        </div>
      </div>
      <div style={{ height: "85vh",  }}>
        {activitylist && activitylist.length > 0 ?
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width*1}
                height={height}
                rowCount={activitylist.length}
                rowHeight={80}
                rowRenderer={rowMobileRenderer}
                // scrollToIndex={activitylist.findIndex(it => it.public_username === searchParams.get("user"))}
              />
            )}
          </AutoSizer>
          :
          <div style={{ display: "flex", justifyContent: "center", color: "#595959", fontSize: 20 }}>
            No connections found
          </div>
        }
      </div>
    </div>
  }



  return (
    <div style={{  }}>
      {
        !loading ?
          <div>
            {(width > 800 ? getDesktopView() : <></>)}
            {(width < 800 ? getMobileView() : <></>)}
          </div>
          :
          <div style={{ display: "flex", justifyContent: "center", height: "100%", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          </div>
      }
    </div>
  )
}

export default Connections