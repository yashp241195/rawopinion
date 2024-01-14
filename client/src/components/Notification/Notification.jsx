import React, { useEffect, useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';
import { Menu, MenuItem, Chip, CircularProgress, Skeleton } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom'
import { AutoSizer, List, } from 'react-virtualized/dist/commonjs';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Notification = () => {

    const [width,] = useWindowSize()

    const [notificationlist, setNotificationlist] = useState(null)
    const [selectedNotificationType, setSelectedNotificationType] = useState("all")

    const GET_NOTIFICATION_QUERY = gql`
        query GetNotifications($type:String){
            getNotifications(type:$type){
                id sender_username
                sender_pic message type
            }
        }
    `

    const SEND_NOTIFICATION_ACTION_QUERY = gql`
        mutation SelectNotifications($notification_id:String, $option:String){
            selectNotifications(notification_id:$notification_id, option:$option)
        }
    `

    const [doGetNotification, { data: data0, error: error0, loading: loading0 }] = useLazyQuery(GET_NOTIFICATION_QUERY, { fetchPolicy: "network-only", })
    const { data, error, loading } = useQuery(GET_NOTIFICATION_QUERY, { variables: { type: "all" }, fetchPolicy: "network-only", })
    const [doSendNotificationAction, { data: data1, error: error1, loading: loading1 }] = useMutation(SEND_NOTIFICATION_ACTION_QUERY, { fetchPolicy: "network-only", })

    const [selected, setSelected] = useState(-1)
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
        const { id } = notificationlist[selected]
        switch (option) {
            case "DELETE_CONVO":
                doSendNotificationAction({
                    variables: {
                        notification_id: id,
                        option: option
                    },
                    fetchPolicy: "network-only"
                })
                break;
        }
        setAnchorEl(null);
    };


    if (data) {
        if (!notificationlist) {
            if (data.getNotifications) {
                setNotificationlist(data.getNotifications)
            }
        }
    }

    useEffect(() => {
        if (data0) {
            if (data0.getNotifications) {
                setNotificationlist(data0.getNotifications)
            }
        }
    }, [data0])


    if (error) { console.log("error", error) }

    useEffect(() => {
        if (data1) {
            if (data1.selectNotifications) {
                const newList = notificationlist.filter(it => it.id !== notificationlist[selected].id)
                setNotificationlist(newList)
            }
        }
    }, [data1])

    useEffect(() => {

        doGetNotification({
            variables: {
                type: selectedNotificationType
            },
            fetchPolicy: "network-only"
        })

    }, [selectedNotificationType])


    const rowRenderer = ({ key, index, style, }) => {

        const {
            id, sender_username,
            sender_pic,
            message, type
        } = notificationlist[index]

        const type_dict = [
            { type: "MATCH", text: "Match", url: "/profile/matches?user=" + sender_username },
            { type: "COMMUNICATION_FEEDBACK", text: "Communication", url: "/profile/matches?user=" + sender_username }
        ]

        const { text: type_text, url: type_url } = type_dict.filter(it => it.type === type)[0]

        return <div key={key} style={{ ...style, width: "100%", paddingLeft: 10 }}>
            <div style={{ width: "97%", border: "1px solid #fafafa", }} >
                <div style={{ display: "flex", width: "97%", }}>
                    <div style={{ paddingLeft: 10, paddingTop: 5 }}>
                        <div style={{ display: "flex", }}>
                            <div style={{ paddingTop: 8 }}>
                                <Avatar src={sender_pic} ></Avatar>
                            </div>
                            <div style={{ paddingLeft: 10 }}>
                                <ListItemText
                                    primary={
                                        <div>
                                            <Link style={{ color: "#000" }} to={type_url} >
                                                {type_text}
                                            </Link>
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
                    <div style={{ flexGrow: 1 }}></div>

                    <div style={{ paddingRight: 14, paddingTop: 5, }} >
                        <IconButton
                            size="small"
                            id={`basic-button`}
                            aria-controls={open ? `basic-menu` : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(e) => { handleClick(e, index) }}
                        >
                            <MoreHorizIcon />
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
                            <MenuItem style={{ fontSize: 12, fontWeight: "bold", color: "#595959" }} value={1} onClick={() => handleMenuItemClick("DELETE_CONVO")}>Delete Notification</MenuItem>
                        </Menu>
                    </div>
                </div>

            </div>
        </div>
    };

    const rowMobileRenderer = ({ key, index, style, }) => {

        const {
            id, sender_username,
            sender_pic, message, type
        } = notificationlist[index]

        const type_dict = [
            { type: "MATCH", text: "Match", url: "/profile/matches?user=" + sender_username },
            { type: "COMMUNICATION_FEEDBACK", text: "Communication", url: "/profile/matches?user=" + sender_username }
        ]

        const { text: type_text, url: type_url } = type_dict.filter(it => it.type === type)[0]


        return <div key={key} style={{ ...style, width: "97%",}}>
            <div style={{ display: "flex",   width:"98%", paddingLeft:5, }} >
                <div style={{ flexGrow: 1,}}>
                    <Link style={{ color: "#000", textDecoration: "none", }} to={type_url} >
                            <div style={{ paddingTop: 0 }}>
                                <div style={{ display: "flex", }}>
                                    <div style={{  paddingRight: 10, border:"1px solid #fff", paddingTop:5 }}>
                                        <Avatar sx={{height:30, width:30, }}></Avatar>
                                    </div>
                                    <div style={{  flexGrow:1, padding:5 , fontSize:14, border:"1px solid #fff"   }}>
                                        {message}
                                    </div>
                                </div>
                            </div>
                    </Link>
                </div>
                <div style={{ }} >
                    <IconButton
                        size="small"
                        id={`basic-button`}
                        aria-controls={open ? `basic-menu` : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(e) => { handleClick(e, index) }}
                    >
                        <MoreVertIcon sx={{fontSize:18}} />
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
                        <MenuItem style={{ fontSize: 12, fontWeight: "bold", color: "#595959" }} value={1} onClick={() => handleMenuItemClick("DELETE_CONVO")}>Delete Notification</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    };



    const getDesktopView = () => {
        return <div style={{ height: 450, width: 800, paddingLeft: 70 }}>
            <div style={{ fontSize: 22, paddingBottom: 20, paddingLeft: 20 }}>
                <div>
                    Notifications
                </div>
                <div style={{ paddingTop: 5 }}>
                    <Chip
                        style={{ margin: 3, border: "1px solid #efefef", color: selectedNotificationType == "all" ? "#fff" : "#000", background: selectedNotificationType == "all" ? "#595959" : "#fff" }}
                        size="small" label="all"
                        onClick={() => {
                            setSelectedNotificationType("all")
                        }}
                    />
                    <Chip style={{ margin: 3, border: "1px solid #efefef", color: selectedNotificationType == "matches" ? "#fff" : "#000", background: selectedNotificationType == "matches" ? "#595959" : "#fff" }} size="small" label="matches"
                        onClick={() => {
                            setSelectedNotificationType("matches")
                        }} />
                    <Chip style={{ margin: 3, border: "1px solid #efefef", color: selectedNotificationType == "communication" ? "#fff" : "#000", background: selectedNotificationType == "communication" ? "#595959" : "#fff" }} size="small" label="communication" onClick={() => { setSelectedNotificationType("communication") }} />
                </div>
            </div>
            <div>
                <div style={{ height: 360, width: 650, paddingLeft: 10, }}>
                    {
                        loading ?
                            <div style={{ display: "flex", justifyContent: "center", }}>
                                    <CircularProgress />
                            </div>
                            :
                            <div style={{ display: "flex", justifyContent: "center", fontSize: 18, color: "#595959" }}>
                                {!notificationlist && "No Notification found"}
                            </div>
                    }
                    {
                        !loading && notificationlist && notificationlist.length > 0 ?
                            <AutoSizer>
                                {({ width, height }) => (
                                    <List
                                        width={width * 0.98}
                                        height={height}
                                        rowCount={notificationlist.length}
                                        rowHeight={
                                            70
                                        }
                                        rowRenderer={rowRenderer}
                                    />
                                )}
                            </AutoSizer>
                            :
                            <div></div>
                    }
                </div>
            </div>
        </div>
    }

    const getMobileView = () => {
        return <div style={{width:width*0.8, }}>
            <div style={{ fontSize: 22, paddingBottom: 20,paddingLeft:5  }}>
                <div style={{paddingLeft:5}}>
                    Notifications
                </div>
                <div style={{ paddingTop: 10,paddingLeft:5 }}>
                    <Chip style={{ margin: 3, border: "1px solid #efefef", color: selectedNotificationType == "all" ? "#fff" : "#000", background: selectedNotificationType == "all" ? "#595959" : "#fff" }} size="small" label="all" onClick={() => { setSelectedNotificationType("all") }} />
                    <Chip style={{ margin: 3, border: "1px solid #efefef", color: selectedNotificationType == "matches" ? "#fff" : "#000", background: selectedNotificationType == "matches" ? "#595959" : "#fff" }} size="small" label="matches" onClick={() => { setSelectedNotificationType("matches") }} />
                    <Chip style={{ margin: 3, border: "1px solid #efefef", color: selectedNotificationType == "communication" ? "#fff" : "#000", background: selectedNotificationType == "communication" ? "#595959" : "#fff" }} size="small" label="communication" onClick={() => { setSelectedNotificationType("communication") }} />
                </div>
            </div>
            <div>
                <div style={{ height: "60vh", paddingLeft:5   }}>
                    {
                        loading ?
                            <div style={{  height:"100%", display:"flex", justifyContent:"center", flexDirection:"column" }}>
                                <div style={{display:"flex", justifyContent:"center",}}>
                                    <CircularProgress />
                                </div>
                            </div>
                            :
                            <div style={{ display: "flex", justifyContent: "center", fontSize: 20, color: "#595959" }}>
                                {!notificationlist ? "No notification found" : ""}
                            </div>
                    }


                    {!loading && notificationlist && notificationlist.length > 0 ?
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    width={width * 1}
                                    height={height}
                                    rowCount={notificationlist.length}
                                    rowHeight={
                                        ({index})=>{
                                            const { message } = notificationlist[index]
                                            let line = Math.ceil(message.length/30)
                                            console.log("line",line)
                                            if(line == 1) return 50
                                            return 50+(line-1)*20

                                        }
                                    }
                                    rowRenderer={rowMobileRenderer}
                                />
                            )}
                        </AutoSizer>
                        :
                        <div></div>
                    }
                    <div>
                    </div>
                </div>
            </div>

        </div>
    }


    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
                {(width > 800 ? getDesktopView() : <></>)}
                {(width < 800 ? getMobileView() : <></>)}
            </div>
        </div>
    )
}

export default Notification