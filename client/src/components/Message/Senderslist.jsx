import React, { useEffect, useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { Menu, MenuItem, Button, Chip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import ListItemButton from '@mui/material/ListItemButton';
import { Modal, } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { Link, useParams } from 'react-router-dom';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';

const Senderslist = () => {

    const [width,] = useWindowSize()

    const [selected, setSelected] = useState(-1)
    const [selectedMenu, setSelectedMenu] = useState(-1)
    const [openModal, setOpenModal] = useState(false)

    const [messageNodeList, setMessageNodeList] = useState(null)

    const [selectedChat, setSelectedChat] = useState([])
    const [selectedChatAction, setSelectedAction] = useState(null)

    const [selectedInbox, setSelectedInbox] = useState('INBOX')

    const { username: currentUsername } = useParams()


    const GET_SENDERS_QUERY = gql`
        query FindSenders($type:String){
            findsenders(type:$type){
                username
                firstname
                lastname
                message
            }
        }
    `

    const SELECT_CONVERSATION_QUERY = gql`
        mutation SelectConversation($usernamelist:[String], $option:String){
            selectConversation(usernamelist:$usernamelist, option:$option)
        }
    `


    const { data, loading, error } = useQuery(GET_SENDERS_QUERY, { variables: { search:null, type: "INBOX" }, fetchPolicy: "network-only" })
    const [doChangeInbox, { data: data1, loading: loading1, error: error1 }] = useLazyQuery(GET_SENDERS_QUERY, { variables: { type: "INBOX" }, fetchPolicy: "network-only" })
    const [doSelectConversation, { data: data2, loading: loading2, error: error2 }] = useMutation(SELECT_CONVERSATION_QUERY, { fetchPolicy: "network-only" })

    useEffect(() => {

        if (data2) {
            if (data2.selectConversation) {
                switch (selectedMenu) {
                    case "PIN":
                        const pinned = messageNodeList[selected]
                        const newList1 = messageNodeList.filter(it => it.username !== pinned.username)
                        setMessageNodeList([pinned, ...newList1])
                        break;
                    case "ARCHIVE":
                        const archive = messageNodeList[selected]
                        const newList2 = messageNodeList.filter(it => it.username !== archive.username)
                        setMessageNodeList(newList2)
                        break;
                    case "UNARCHIVE":
                        const unarchive = messageNodeList[selected]
                        const newList21 = messageNodeList.filter(it => it.username !== unarchive.username)
                        setMessageNodeList(newList21)
                        break;
                    case "DELETE_CONVO":
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

                switch (selectedChatAction) {
                    case "DELETE_CONVO":

                        const deletemultiple = selectedChat
                        const newListS1 = messageNodeList.filter((it) => {
                            for (let user of deletemultiple) {
                                if (it.username === user) {
                                    return false
                                }
                            }
                            return true
                        })
                        setMessageNodeList(newListS1)

                        break;
                    case "ARCHIVE":

                        const archivemultiple = selectedChat
                        const newListS2 = messageNodeList.filter((it) => {
                            for (let user of archivemultiple) {
                                if (it.username === user) {
                                    return false
                                }
                            }
                            return true
                        })

                        setMessageNodeList(newListS2)
                        break;

                    case "UNARCHIVE":

                        const unarchivemultiple = selectedChat
                        const newListS3 = messageNodeList.filter((it) => {
                            for (let user of unarchivemultiple) {
                                if (it.username === user) {
                                    return false
                                }
                            }
                            return true
                        })

                        setMessageNodeList(newListS3)
                        break;

                }
                setSelectedMenu(-1)
                setSelectedChat([])
                setSelectedAction(null)
                setOpenModal(false)

            }
        }

    }, [data2])


    if (error2) {
        console.log("error2", error2)
    }

    useEffect(() => {
        console.log("chainging inbox")
        doChangeInbox({ variables: { type: selectedInbox }, fetchPolicy: "network-only" })
    }, [selectedInbox])


    useEffect(() => {

        switch (selectedChatAction) {
            case "ARCHIVE":
                doSelectConversation({
                    variables: {
                        usernamelist: [...selectedChat],
                        option: "ARCHIVE"
                    },
                    fetchPolicy: "network-only"
                })
                break;
            case "UNARCHIVE":
                doSelectConversation({
                    variables: {
                        usernamelist: [...selectedChat],
                        option: "UNARCHIVE"
                    },
                    fetchPolicy: "network-only"
                })
                break;
            case "DELETE_CONVO":
                setOpenModal(true)
                break;

        }

    }, [selectedChatAction])

    if (data) {
        if (!messageNodeList) {
            if (data.findsenders) {
                setMessageNodeList(data.findsenders)
            }
        }
    }

    useEffect(()=>{

        if (data1) {
            if (data1.findsenders) {
                setMessageNodeList(data1.findsenders)
                setSelectedMenu(-1)
            }
        }

    },[data1])



    if (loading) {
        console.log("loading", loading)
    }

    if (error) {
        console.log("error", error.message)
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

        switch (option) {
            case "PIN":
                doSelectConversation({
                    variables: {
                        usernamelist: [username],
                        option: "PIN"
                    },
                    fetchPolicy: "network-only"
                })
                break;
            case "ARCHIVE":

                doSelectConversation({
                    variables: {
                        usernamelist: [username],
                        option: "ARCHIVE"
                    },
                    fetchPolicy: "network-only"
                })

                break;
            case "DELETE_CONVO":
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

        if (selectedMenu == "DELETE_CONVO") {

            const { firstname, } = messageNodeList[selected]

            content = <div style={{ display: "flex", justifyContent: "center", border: "1 px solid #fff", background: "#fff", height: 200, width: 400 }}>
                <div style={{ paddingTop: 50, width: 300 }}>
                    <div style={{ fontSize: 20 }}>
                        Do you really wish to delete conversation with {firstname} ?
                    </div>
                    <div style={{ paddingTop: 30 }}>
                        <Button
                            style={{ textTransform: "none" }}
                            size="small"
                            color="error"
                            onClick={() => {

                                doSelectConversation({
                                    variables: {
                                        usernamelist: [...selectedChat],
                                        option: "DELETE"
                                    },
                                    fetchPolicy: "network-only"
                                })

                            }}
                            variant='contained'>Delete</Button>
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

        if (selectedChatAction == "DELETE_CONVO") {


            content = <div style={{ display: "flex", justifyContent: "center", border: "1 px solid #fff", background: "#fff", height: 200, width: 400 }}>
                <div style={{ paddingTop: 50, width: 300 }}>
                    <div style={{ fontSize: 20 }}>
                        Do you really wish to delete conversation with {selectedChat.length} people ?
                    </div>
                    <div style={{ paddingTop: 30 }}>
                        <Button
                            style={{ textTransform: "none" }}
                            size="small"
                            color="error"
                            onClick={() => {

                                doSelectConversation({
                                    variables: {
                                        usernamelist: [...selectedChat],
                                        option: "DELETE"
                                    },
                                    fetchPolicy: "network-only"
                                })


                            }}
                            variant='contained'>Delete</Button>
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

            const { firstname, lastname } = messageNodeList[selected]

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
                                        usernamelist: [...selectedChat],
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

        if (selectedMenu == "DELETE_CONVO") {

            const { firstname, } = messageNodeList[selected]

            content = <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "1 px solid #efefef", background: "#fff", height: "100vh", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ paddingTop: 50, width: 250 }}>
                        <div style={{ fontSize: 20 }}>
                            Do you really wish to delete conversation with {firstname} ?
                        </div>
                        <div style={{ paddingTop: 30 }}>
                            <Button
                                style={{ textTransform: "none" }}
                                size="small"
                                color="error"
                                onClick={() => {
                                    doSelectConversation({
                                        variables: {
                                            usernamelist: [...selectedChat],
                                            option: "DELETE"
                                        },
                                        fetchPolicy: "network-only"
                                    })
                                }}
                                variant='contained'>Delete</Button>
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

        if (selectedChatAction == "DELETE_CONVO") {

            content = <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "1 px solid #efefef", background: "#fff", height: "100vh", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ paddingTop: 50, width: 250 }}>
                        <div style={{ fontSize: 20 }}>
                            Do you really wish to delete conversation with {selectedChat.length} people ?
                        </div>
                        <div style={{ paddingTop: 30 }}>
                            <Button
                                style={{ textTransform: "none" }}
                                size="small"
                                color="error"
                                onClick={() => {
                                    doSelectConversation({
                                        variables: {
                                            usernamelist: [...selectedChat],
                                            option: "DELETE"
                                        },
                                        fetchPolicy: "network-only"
                                    })

                                }}
                                variant='contained'>Delete</Button>
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

            const { firstname, } = messageNodeList[selected]

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
                                            usernamelist: [...selectedChat],
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

        const { username, firstname, lastname, profilePic, message } = messageNodeList[index]

        return <div key={key} style={{ ...style, width: 260, paddingLeft: 10, paddingRight: 10 }}>
            <div style={{ display: "flex", border: "1px solid #fafafa", height: 75, background: username === currentUsername ? "#fafafa" : "#fff" }} >
                <Link style={{ textDecoration: "none", color: "#000", flexGrow: 1 }} to={"/message/" + username}>
                    <ListItemButton>
                        <div style={{ display: "flex", }}>
                            <div style={{ paddingLeft: 10, paddingTop: 5 }}>
                                <div style={{ display: "flex", }}>
                                    <div style={{ paddingTop: 8 }}>
                                        <Avatar></Avatar>
                                    </div>
                                    <div style={{ paddingLeft: 10 }}>
                                        <ListItemText
                                            primary={
                                                <div>
                                                    {firstname} {lastname}
                                                </div>
                                            }
                                            secondary={
                                                <div>
                                                    {message}
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
                    {
                        selectedMenu === "SELECT" ?
                            <Checkbox onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedChat([...selectedChat, username])
                                } else {
                                    const selChat = selectedChat.filter(it => it !== username)
                                    setSelectedChat(selChat)
                                }

                            }} />
                            :
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
                    }
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
                        <MenuItem style={{ fontSize: 12, fontWeight: "bold", color: "#595959" }} value={1} onClick={() => handleMenuItemClick("SELECT")}>Select</MenuItem>
                        <MenuItem style={{ fontSize: 12, fontWeight: "bold", color: "#595959" }} value={2} onClick={() => handleMenuItemClick("PIN")}>Pin</MenuItem>
                        <MenuItem style={{ fontSize: 12, fontWeight: "bold", color: "#595959" }} value={3} onClick={() => handleMenuItemClick("ARCHIVE")}>Archieve</MenuItem>
                        <MenuItem style={{ fontSize: 12, fontWeight: "bold", color: "#595959" }} value={4} onClick={() => handleMenuItemClick("DELETE_CONVO")}>Delete Conversation</MenuItem>
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

        const { username, firstname, lastname, profilePic, message } = messageNodeList[index]

        return <div key={key} style={{ ...style,  }}>
            <div style={{ display: "flex",  height: 60,   }} >
                <Link style={{ flexGrow: 1, textDecoration: "none", color: "#000" }} to={"/message/" + username}>
                    {/* <ListItemButton> */}
                        <div style={{  paddingTop: 0 }}>
                            <div style={{ display: "flex",   }}>
                                <div style={{ paddingTop: 8, paddingLeft:5 }}>
                                    <Avatar></Avatar>
                                </div>
                                <div style={{ paddingLeft: 10 }}>
                                    <ListItemText
                                        primary={
                                            <div>
                                                {firstname} {lastname}
                                            </div>
                                        }
                                        secondary={
                                            <div>
                                                {message}
                                            </div>
                                        }
                                    ></ListItemText>
                                </div>

                            </div>


                        </div>
                    {/* </ListItemButton> */}
                </Link>
                <div style={{ paddingRight: 5, paddingTop: 5, }} >
                    {
                        selectedMenu === "SELECT" ?
                            <Checkbox
                                checked={selectedChat.find(it => it.username === username)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedChat([...selectedChat, username])
                                    } else {
                                        const selChat = selectedChat.filter(it => it !== username)
                                        setSelectedChat(selChat)
                                    }

                                }} />
                            :
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
                    }
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
                    // value
                    >
                        <MenuItem style={{ fontSize: 14, }} value={1} onClick={() => handleMenuItemClick("SELECT")}>Select</MenuItem>
                        <MenuItem style={{ fontSize: 14, }} value={2} onClick={() => handleMenuItemClick("PIN")}>Pin</MenuItem>
                        <MenuItem style={{ fontSize: 14, }} value={3} onClick={() => handleMenuItemClick("ARCHIVE")}>Archieve</MenuItem>
                        <MenuItem style={{ fontSize: 14, }} value={4} onClick={() => handleMenuItemClick("DELETE_CONVO")}>Delete Conversation</MenuItem>
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
                <div style={{}}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={selectedInbox}
                            onChange={(e) => { setSelectedInbox(e.target.value) }}
                        >
                            <MenuItem value={"INBOX"}>Inbox</MenuItem>
                            <MenuItem value={"ARCHIVE"}>Archived</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div style={{ display: "flex", paddingLeft: 10, paddingRight: 10, paddingTop: 5 }} >
                {selectedMenu !== "SELECT" ?
                    <TextField
                        InputProps={{
                            endAdornment:
                                <IconButton>
                                    <CloseIcon />
                                </IconButton>
                        }}
                        variant='standard'
                        style={{ width: "100%" }}
                        size="small"
                        placeholder="Search"
                    />
                    :
                    <div style={{ display: "flex", width: "100%" }}>
                        <div style={{ flexGrow: 1 }}>
                            <IconButton
                                style={{ textTransform: "none" }}
                                onClick={() => {
                                    setSelectedMenu(-1)
                                    setSelectedChat([])
                                    setSelectedAction(null)
                                }}>
                                <CloseIcon />
                            </IconButton>
                            {selectedChat.length} Selected
                        </div>
                        <div>
                            {selectedInbox === "ARCHIVE" ?
                                <IconButton
                                    style={{ textTransform: "none" }}
                                    onClick={() => {
                                        setSelectedAction("UNARCHIVE")
                                    }}>
                                    <UnarchiveIcon />
                                </IconButton> : <></>
                            }
                            {selectedInbox === "INBOX" ?
                                <IconButton
                                    style={{ textTransform: "none" }}
                                    onClick={() => {
                                        setSelectedAction("ARCHIVE")
                                    }}>
                                    <ArchiveIcon />
                                </IconButton> : <></>}
                            <IconButton
                                style={{ textTransform: "none" }}
                                onClick={() => {
                                    setSelectedAction("DELETE_CONVO")
                                }}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                }
            </div>
            <div style={{ paddingTop: 10 }}></div>
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
                    <div style={{}}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={selectedInbox}
                                onChange={(e) => { setSelectedInbox(e.target.value) }}
                            >
                                <MenuItem value={"INBOX"}>Inbox</MenuItem>
                                <MenuItem value={"ARCHIVE"}>Archived</MenuItem>
                            </Select>

                        </FormControl>
                    </div>
                </div>
                <div style={{ display: "flex",  paddingTop: 5 }} >
                    {selectedMenu !== "SELECT" ?
                        <TextField
                            InputProps={{
                                endAdornment:
                                    <IconButton>
                                        <CloseIcon />
                                    </IconButton>
                            }}
                            variant='standard'
                            style={{ width: "100%" }}
                            size="small"
                            placeholder="Search" />
                        :
                        <div style={{ display: "flex", width: "100%" }}>
                            <div style={{ flexGrow: 1 }}>
                                <IconButton
                                    style={{ textTransform: "none" }}
                                    onClick={() => {
                                        setSelectedMenu(-1)
                                        setSelectedChat([])
                                    }}>
                                    <CloseIcon />
                                </IconButton>
                                {selectedChat.length} Selected
                            </div>
                            <div>
                                {selectedInbox === "ARCHIVE" ?
                                    <IconButton
                                        style={{ textTransform: "none" }}
                                        onClick={() => {
                                            setSelectedAction("UNARCHIVE")
                                        }}>
                                        <UnarchiveIcon />
                                    </IconButton> : <></>
                                }
                                {selectedInbox === "INBOX" ?
                                    <IconButton
                                        style={{ textTransform: "none" }}
                                        onClick={() => {
                                            setSelectedAction("ARCHIVE")
                                        }}>
                                        <ArchiveIcon />
                                    </IconButton> : <></>}
                                <IconButton
                                    style={{ textTransform: "none" }}
                                    onClick={() => {
                                        setSelectedAction("DELETE_CONVO")
                                    }}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>
                    }

                </div>
                <div style={{ paddingTop: 10 }}></div>
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

