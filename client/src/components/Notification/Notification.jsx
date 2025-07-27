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

    const GET_NOTIFICATION_QUERY = gql`
        query GetNotifications{
            getNotifications{
                username
                message
                type
                timestamp
            }
        }
    `

    const [doGetNotification, { data: data0, error: error0, loading }] = useLazyQuery(GET_NOTIFICATION_QUERY, { fetchPolicy: "network-only", })

    useEffect(() => {
        if (data0) {
            if (data0.getNotifications && data0.getNotifications.length > 0) {
                setNotificationlist(data0.getNotifications)

            }
        }
    }, [data0])


    if (error0) { console.log("error0", error) }

   
    useEffect(() => {

        doGetNotification(
            GET_NOTIFICATION_QUERY, 
            { fetchPolicy: "network-only", }
        )

    }, [doGetNotification])


    const rowRenderer = ({ key, index, style, }) => {

        const {
            message,
            type, 
            timestamp 
        } = notificationlist[index]

        const type_dict = [
            { type: "MATCH", text: "Match", url: "/profile/matches" },
        ]

        const { text: type_text, url: type_url } = type_dict.filter(it => it.type === type)[0]
        
        return <div key={key} style={{ ...style, width: "100%", paddingLeft: 10 }}>
            <div style={{ width: "97%", border: "1px solid #efefef", borderRadius:3 }} >
                <div style={{ display: "flex", width: "97%",  }}>
                    <div style={{ paddingLeft: 10, paddingTop: 5, width: "97%" }}>
                        <div style={{ display: "flex", }}>
                            <div style={{ paddingLeft: 10,  width:"100%",  }}>
                                <Link style={{ color: "#000", textDecoration:"none" }} to={type_url} >

                                <ListItemText
                                    primary={
                                        <div >
                                                {type_text}
                                        </div>
                                    }
                                    secondary={
                                        <div style={{display:"flex", width:"100%"}}>
                                            <div>
                                                {message}
                                            </div>
                                            <div style={{flexGrow:1}}></div>
                                            <div style={{ }}>
                                                {timestamp}
                                            </div>
                                        </div>
                                    }
                                ></ListItemText>
                            </Link>

                            </div>
                        </div>


                    </div>
                    <div style={{ flexGrow: 1 }}></div>

                    
                </div>

            </div>
        </div>
    };

    const rowMobileRenderer = ({ key, index, style, }) => {

        const {
            message,
            type, 
            timestamp 
        } = notificationlist[index]

        const type_dict = [
            { type: "MATCH", text: "Match", url: "/profile/matches" },
        ]

        const { text: type_text, url: type_url } = type_dict.filter(it => it.type === type)[0]
        

        return <div key={key} style={{ ...style, width: "97%",  }}>
            <div style={{ display: "flex",   width:"98%", paddingLeft:5, height: "90%", border: "1px solid #fff"}} >
                <div style={{ flexGrow: 1,}}>
                    <Link style={{ color: "#000", textDecoration: "none", }} to={type_url} >
                    <ListItemText
                                    primary={
                                        <div style={{ fontSize:14 }} >
                                                {type_text}
                                        </div>
                                    }
                                    secondary={
                                        <div style={{display:"flex", width:"100%", fontSize:12, paddingBottom:5}}>
                                            <div>
                                                {message}
                                            </div>
                                            <div style={{flexGrow:1}}></div>
                                            <div style={{ fontSize:12, paddingRight:10,  }}>
                                                {timestamp}
                                            </div>
                                        </div>
                                    }
                                ></ListItemText>
                    </Link>
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
               
            </div>
            <div>
                <div style={{ height: 360, width: 650, paddingLeft: 10, }}>
                    {
                        loading ?
                            <div style={{ display: "flex", justifyContent: "center", }}>
                                    <CircularProgress />
                            </div>
                            :
                            <div style={{ display: "flex", paddingLeft: 10, fontSize: 16, color: "#595959" }}>
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
                                        rowHeight={ 70 }
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
                            <div style={{ display: "flex",  paddingLeft: 5, fontSize: 16, color: "#595959" }}>
                                {!notificationlist ? "No notification found" : ""}
                            </div>
                    }


                    {!loading && notificationlist && notificationlist.length > 0 ?
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    width={width * 1}
                                    height={height }
                                    rowCount={notificationlist.length}
                                    rowHeight={
                                        ({index})=>{
                                            const { message } = notificationlist[index]
                                            let line = Math.ceil(message.length/30)
                                            console.log("line",line)
                                            if(line == 1) return 60
                                            return 60+(line-1)*30

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