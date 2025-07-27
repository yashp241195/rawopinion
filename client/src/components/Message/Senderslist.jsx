import React, { useEffect, useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { Menu, MenuItem, Button, Chip, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import ListItemButton from '@mui/material/ListItemButton';
import { Modal, TextField } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';


const Senderslist = (props) => {

    const [width,] = useWindowSize()

    const [selected, setSelected] = useState(-1)
    const [selectedMenu, setSelectedMenu] = useState(-1)
    const [openModal, setOpenModal] = useState(false)
    const [selectedInbox, setSelectedInbox] = useState('INBOX')

    const [messageNodeList, setMessageNodeList] = useState(null)

    const { username: currentUsername } = useParams()

    const { liveMessages } = props

    useEffect(()=>{

        if(messageNodeList){
            const mylist = messageNodeList.map((item)=>{
                    
                    const { username, } = item
                    const unreadMessage = liveMessages.filter(it=>it.sender == username || it.receiver == username)
                    
                    const message1 = (unreadMessage.length == 0)?
                                item.latestMessage.message:
                                unreadMessage[unreadMessage.length-1].content.message

                    return {
                        ...item,
                        unreadMessageCount: unreadMessage.length,
                        latestMessage:{
                            message:message1
                        }
                    }

                }
            )

            mylist.sort((a,b)=>b.unreadMessageCount - a.unreadMessageCount)
            
            setMessageNodeList(mylist)
        }

    },[ liveMessages ])

    const GET_SENDERS_QUERY = gql`
        query FindSenders{
            findsenders{
                username
                firstname
                lastname
                profilePic
                latestMessage{
                    message
                }
            }
        }
    `

    const SELECT_CONVERSATION_QUERY = gql`
        mutation SelectConversation($username:String, $option:String){
            selectConversation(username:$username, option:$option)
        }
    `

    const [ doGetSenderlist ,{ data, loading, error }] = useLazyQuery(GET_SENDERS_QUERY, { fetchPolicy: "network-only" })
    const [ doSelectConversation, { data: data2, loading: loading2, error: error2 }] = useMutation(SELECT_CONVERSATION_QUERY, { fetchPolicy: "network-only" })

    useEffect(() => {

        if (data2) {
            if (data2.selectConversation) {
                switch (selectedMenu) {
                    case "UNMATCH":
                        const deleted = messageNodeList[selected]
                        const newList3 = messageNodeList.filter(it => it.username !== deleted.username)
                        setMessageNodeList(newList3)
                        break;
                    case "BLOCK":
                        const blocked = messageNodeList[selected]
                        const newList4 = messageNodeList.filter(it => it.username !== blocked.username)
                        setMessageNodeList(newList4)
                        break;
                }

                
                setSelectedMenu(-1)
                setOpenModal(false)

            }
        }

    }, [data2])

    useEffect(()=>{
        
        doGetSenderlist()

    },[doGetSenderlist])

    if (error2) {
        console.log("error2", error2)
    }


    useEffect(()=>{
        
        if (data) {
            if (!messageNodeList) {
                if (data.findsenders) {
                    setMessageNodeList(data.findsenders)
                }
            }
        }
    
    },[data])





    if (loading) {
        // console.log("loading", loading)
    }

    if (error) {
        // console.log("error", error.message)
    }

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

        const { username } = messageNodeList[selected]
        console.log(username, option, selected)

        switch (option) {
            case "UNMATCH":
                setOpenModal(true)
                break;
            case "BLOCK":
                setOpenModal(true)
                break;
        }
        setSelectedMenu(option)
        setAnchorEl(null);
    };

    const displayDesktopModel = () => {

        let content = ''

        if (selectedMenu == "UNMATCH") {

            const { firstname, username } = messageNodeList[selected]

            content = <div style={{ display: "flex", justifyContent: "center", border: "1 px solid #fff", background: "#fff", height: 200, width: 400 }}>
                <div style={{ paddingTop: 50, width: 300 }}>
                    <div style={{ fontSize: 20 }}>
                        Do you really wish to unmatch {firstname} ?
                    </div>
                    <div style={{ paddingTop: 30 }}>
                        <Button
                            style={{ textTransform: "none" }}
                            size="small"
                            color="error"
                            onClick={() => {

                                doSelectConversation({
                                    variables: {
                                        username: username,
                                        option: "UNMATCH"
                                    },
                                    fetchPolicy: "network-only"
                                })

                            }}
                            variant='contained'>Unmatch</Button>
                        <Button
                            onClick={() => {
                                setOpenModal(false)
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

            const { firstname, username } = messageNodeList[selected]

            content = <div style={{ display: "flex", justifyContent: "center", border: "1 px solid #fff", background: "#fff", height: 200, width: 400 }}>
                <div style={{ paddingTop: 50, width: 300 }}>
                    <div style={{ fontSize: 20 }}>
                        Do you really wish to block {firstname} ?
                    </div>
                    <div style={{ paddingTop: 30 }}>
                        <Button
                            style={{ textTransform: "none" }}
                            size="small"
                            color="error"
                            onClick={() => {

                                doSelectConversation({
                                    variables: {
                                        username: username,
                                        option: "BLOCK"
                                    },
                                    fetchPolicy: "network-only"
                                })

                            }}
                            variant='contained'>Block</Button>
                        <Button
                            onClick={() => {
                                setOpenModal(false)
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
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: "#fff",
                width: 400,
                height: 200,
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

        if (selectedMenu == "UNMATCH") {

            const { firstname, username } = messageNodeList[selected]

            content = <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "1 px solid #efefef", background: "#fff", height: "100vh", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ paddingTop: 50, width: 250 }}>
                        <div style={{ fontSize: 20 }}>
                            Do you really wish to unmatch {firstname} ?
                        </div>
                        <div style={{ paddingTop: 30 }}>
                            <Button
                                style={{ textTransform: "none" }}
                                size="small"
                                color="error"
                                onClick={() => {

                                    doSelectConversation({
                                        variables: {
                                            username: username,
                                            option: "UNMATCH"
                                        },
                                        fetchPolicy: "network-only"
                                    })
                                }}
                                variant='contained'>Unmatch</Button>
                            <Button
                                onClick={() => {
                                    setOpenModal(false)
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

            const { firstname, username } = messageNodeList[selected]

            content = <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "1 px solid #efefef", background: "#fff", height: "100vh", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ paddingTop: 50, width: 250 }}>
                        <div style={{ fontSize: 20 }}>
                            Do you really wish to block {firstname} ?
                        </div>
                        <div style={{ paddingTop: 30 }}>
                            <Button
                                style={{ textTransform: "none" }}
                                size="small"
                                color="error"
                                onClick={() => {
                                    doSelectConversation({
                                        variables: {
                                            username: username,
                                            option: "BLOCK"
                                        },
                                        fetchPolicy: "network-only"
                                    })
                                }}
                                variant='contained'>Block</Button>
                            <Button
                                onClick={() => {
                                    setOpenModal(false)
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

    const rowRenderer = ({
        key,
        index,
        style,
    }) => {

        const { username, firstname, lastname, profilePic, latestMessage } = messageNodeList[index]
        const {message} = latestMessage

        const fullName = firstname+" "+lastname

        return <div key={key} style={{ ...style, width: 260, paddingLeft: 10, paddingRight: 10 }}>
            <div style={{ display: "flex", border: "1px solid #fafafa", height: 75, background: username === currentUsername ? "#fafafa" : "#fff" }} >
                <Link  style={{ textDecoration: "none", color: "#000", flexGrow: 1 }} to={"/message/" + username}>
                    <ListItemButton onClick={()=>{console.log("cccc");  }} >
                        <div style={{ display: "flex", }}>
                            <div style={{ paddingLeft: 5, paddingTop: 5 }}>
                                <div style={{ display: "flex", }}>
                                    <div style={{ paddingTop: 8 }}>
                                        <Avatar style={{ height:32, width:32  }} src={profilePic} ></Avatar>
                                    </div>
                                    <div style={{ paddingLeft: 10 }}>
                                        <ListItemText
                                            primary={
                                                <div style={{fontSize:14}}>
                                                    {fullName.slice(0,16)}
                                                </div>
                                            }
                                            secondary={
                                                <div style={{fontSize:12}}>
                                                    {message.slice(0,20)}
                                                </div>
                                            }
                                        ></ListItemText>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ListItemButton>
                </Link>
                <div style={{ marginRight: 5, paddingTop: 5, }} >
                    <IconButton
                        size="small"
                        id={`basic-button`}
                        aria-controls={open ? `basic-menu` : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(e) => { handleClick(e, index) }}
                    >
                        <MoreHorizIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <Menu
                        id={`basic-menu`}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            paper: {
                                sx: {
                                    border: "1px solid #efefef",
                                    boxShadow: '0px 5px 5px #efefef'
                                }
                            }
                        }}
                        MenuListProps={{
                            'aria-labelledby': `basic-button`,
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem style={{ fontSize: 12, fontWeight: "bold", color: "#595959" }} value={3} onClick={() => handleMenuItemClick("UNMATCH")}>Unmatch</MenuItem>
                        <MenuItem style={{ fontSize: 12, fontWeight: "bold", color: "#595959" }} value={5} onClick={() => handleMenuItemClick("BLOCK")}>Block</MenuItem>

                    </Menu>
                </div>
            </div>
        </div>
    };

    const rowMobileRenderer = ({
        key,
        index,
        style,
    }) => {

        const { username, firstname, lastname, profilePic, latestMessage } = messageNodeList[index]
        const {message} = latestMessage

        const fullName = firstname+" "+lastname

        return <div key={key} style={{ ...style,  }}>
            <div style={{ display: "flex",  height: 60,   }} >
                <Link style={{ flexGrow: 1, textDecoration: "none", color: "#000" }} to={"/message/" + username}>
                        <div style={{  paddingTop: 0 }}>
                            <div style={{ display: "flex",   }}>
                                <div style={{ paddingTop: 8, paddingLeft:5 }}>
                                    <Avatar style={{ height:32, width:32  }} src={profilePic} ></Avatar>
                                </div>
                                <div style={{ paddingLeft: 10 }}>
                                    <ListItemText
                                        
                                        primary={
                                            <div style={{fontSize:14}}>
                                                {fullName.slice(0,16)}
                                            </div>
                                        }

                                        secondary={
                                            <div style={{fontSize:12}}>
                                                {message.slice(0,20)}
                                            </div>
                                        }
                                    ></ListItemText>
                                </div>

                            </div>
                        </div>
                </Link>
                <div style={{ paddingRight: 5, paddingTop: 5, }} >
                <IconButton
                        size="small"
                        id={`basic-button`}
                        aria-controls={open ? `basic-menu` : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(e) => { handleClick(e, index) }}
                    >
                        <MoreHorizIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <Menu
                        id={`basic-menu`}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            paper: {
                                sx: {
                                    border: "1px solid #efefef",
                                    boxShadow: '0px 2px 2px #efefef'
                                }
                            }
                        }}


                        MenuListProps={{
                            'aria-labelledby': `basic-button`,
                        }}

                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem style={{ fontSize: 14, }} value={4} onClick={() => handleMenuItemClick("UNMATCH")}>Unmatch</MenuItem>
                        <MenuItem style={{ fontSize: 14, }} value={5} onClick={() => handleMenuItemClick("BLOCK")}>Block</MenuItem>

                    </Menu>
                </div>
            </div>
        </div>
    };

    const getDesktopView = () => {
        return <div style={{ padding: 5, width: 280, }}>
            {openModal ? displayDesktopModel() : <></>}
            <div style={{ display: "flex", paddingLeft: 10, }}>
                <div style={{ fontSize: 24, paddingTop: 10 }}>
                    Message
                </div>
                <div style={{ flexGrow: 1 }} ></div>
                
            </div>

            <div style={{ paddingTop: 20 }}></div>
            <div style={{ height: 350, overflowY: "auto", overflowX: "hidden" }}>
                {messageNodeList && messageNodeList.length > 0 ?
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                width={width * 1}
                                height={messageNodeList.length * 80}
                                rowCount={messageNodeList.length}
                                rowHeight={80}
                                rowRenderer={rowRenderer}
                            />
                        )}
                    </AutoSizer> : <></>}
            </div>
        </div>
    }

    const getMobileView = () => {
        return <div style={{ width:0.95*width , display:"flex", justifyContent:"center", }}>
            {openModal ? displayMobileModel() : <></>}
            <div style={{    }}>
                <div style={{ display: "flex", }}>
                    <div style={{ fontSize: 22, paddingTop: 10 }}>
                        Message
                    </div>
                    <div style={{ flexGrow: 1 }} >
                    </div>
                </div>
               
                <div style={{ paddingTop: 30 }}></div>
                <div style={{ height: "60vh", overflowY: "auto", overflowX:"hidden", width:width*0.8 }}>
                    {messageNodeList ?
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    width={width}
                                    height={messageNodeList.length * 65}
                                    rowCount={messageNodeList.length}
                                    rowHeight={65}
                                    rowRenderer={rowMobileRenderer}
                                />
                            )}
                        </AutoSizer>
                        :
                        <></>
                    }
                </div>
            </div>

        </div>
    }


    return (
        <div style={{ display: "flex", justifyContent: "center", height: '100%' }}>
            <div>
                {(width > 800 ? getDesktopView() : <></>)}
                {(width < 800 ? getMobileView() : <></>)}
            </div>
        </div>
    )
}


export default Senderslist

