import React, { useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Avatar from '@mui/material/Avatar';
import { Button, Checkbox, TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client'
import { CircularProgress, Chip } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import Post from './../Post/Post'
import Comments from '../Comments/Comments'
import TablePagination from '@mui/material/TablePagination';



const Saved = () => {

  const [width,] = useWindowSize()
  const [searchParams] = useSearchParams();

  const GET_SEARCH_RESULT_QUERY = gql`
    query GetSearchResults($searchInput:SearchInput){
      getSearchResults(searchInput:$searchInput){
        postList{
          postId postTitle postedBy verifiedUser onBlockchain
          postImage{
            imgid
            icon_url
          } 
        } 
        personList{
          public_username firstname lastname
        }  
        pageList{
          public_username pageTitle 
        }
        resultType
        resultCount
        resultPageCount 
      }
    }
  `

  const { data, loading, error } = useQuery(GET_SEARCH_RESULT_QUERY, { fetchPolicy: "network-only" })
  const [searchResults, setSearchResults] = useState(null)
  const [fullScreenJobView, setFullScreenJobView] = useState(false)

  const [tabValue, setTabValue] = useState('2');
  const [rowHeight, setRowHeight] = useState(90)


  if (data) {
    if (!searchResults) {
      if (data.getSearchResults) {
        setSearchResults(data.getSearchResults)
      }
    }
  }

  if (error) { console.log("error", error) }

  const rowRenderer = ({ key, index, style }) => {

    const { resultType } = searchResults

    let content = ""

    if (resultType === "POST") {

      const {
        postId, postTitle, postedBy, postImage, postStatus, verifiedUser, onBlockchain
      } = searchResults.postList[index]

      content = <div>
        <div style={{ display: "flex", }} >
          <div style={{ width: "100%" }} >
            <Link
              // to={"/Saved?jobId=" + jobId} 
              style={{ textDecoration: "none" }} >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", }}>
                  <div style={{ padding: 5 }}>
                    <Avatar src={postImage.icon_url} variant="rounded" sx={{ width: 70, height: 70 }} ></Avatar>
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", paddingTop: 5, paddingLeft: 0 }}>
                      <div style={{ fontSize: "0.9rem", fontFamily: "sans-serif", color: "#070675", }} >
                        {postedBy}
                      </div>
                      <div style={{ paddingLeft: 5, paddingTop: 0 }}>
                        {verifiedUser? <VerifiedUserIcon sx={{ fontSize: "0.8rem", color: "green" }} /> : <></>}
                      </div>
                    </div>
                    <div style={{ fontSize: "0.8rem", paddingTop: 3, fontFamily: "sans-serif", color: "#000", display:"flex", paddingLeft:2 }} >
                      <div>
                        {postTitle}
                      </div>
                      <div style={{display:"flex", flexDirection:"column", }}>
                        <div style={{flexGrow:1}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div style={{ display:"flex", flexDirection:"column" }}>
            <div>
              <Checkbox
                sx={{ fontSize: 14 }}
                icon={<BookmarkBorderIcon sx={{ color: "#595959" }} />}
                checkedIcon={<BookmarkIcon sx={{ color: "#595959" }} />}
              />
            </div>
            <div>
                {onBlockchain?
                  <IconButton sx={{ fontSize: 12 }} >
                    <CurrencyBitcoinIcon sx={{ color: "#595959" }} />
                  </IconButton>
                :<></>}
            </div>
          </div>

        </div>
      </div>

    }

    // const bgStyle = (searchParams.get("jobId") === jobId) ? "#fafafa" : "#fff"

    return <div
      key={key}
      style={{
        ...style, width: "99%", height: 82,
        border: "1px solid #efefef",
        paddingTop: 2, borderRadius: 5,
        // background: bgStyle,
      }}
    >
      {content}
    </div>
  };

  const rowMobileRenderer = ({
    key,
    index,
    style,
  }) => {

    // const {
    //   jobtitle, jobId, jobLocation , jobMode,
    //   experience, ctc,
    //   companyLogo, companyName, companyStatus
    // } = searchResults[index]

    // const bgStyle = (searchParams.get("jobId") === jobId) ? "#f2f2f2" : "#fff"

    const { resultType } = searchResults

    let content = ""

    if (resultType === "POST") {

      const {
        postId, postTitle, postedBy, postImage, verifiedUser, onBlockchain
      } = searchResults.postList[index]

      content = <div style={{ display: "flex", width: "98%" }}>
        <div style={{ flexGrow: 1, }}>
          <Link
            style={{ color: "#000", textDecoration: "none", }}
          //  to={"/Saved?jobId=" + jobId} 
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", }}>
                <div style={{ padding: 5 }}>
                  <Avatar src={postImage.icon_url} variant="rounded" sx={{ width: 70, height: 70 }} ></Avatar>
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: "flex", paddingTop: 5, paddingLeft: 0 }}>
                    <div style={{ fontSize: "0.8rem", fontFamily: "sans-serif", color: "#070675", }} >
                      {postedBy}
                    </div>
                    <div style={{ paddingLeft: 5, paddingTop: 0 }}>
                      {verifiedUser? <VerifiedUserIcon sx={{ fontSize: "0.8rem", color: "green" }} /> : <></>}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.8rem", paddingTop: 3, fontFamily: "sans-serif", color: "#000", }} >
                    {postTitle}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div style={{display:"flex", flexDirection:"column"}}>
          <div>
            <Checkbox
              icon={<BookmarkBorderIcon sx={{ color: "#595959" }} />}
              checkedIcon={<BookmarkIcon sx={{ color: "#595959" }} />}
            />
          </div>
          <div>
            {onBlockchain?
              <IconButton sx={{ fontSize: 12 }} >
                <CurrencyBitcoinIcon sx={{ color: "#595959" }} />
              </IconButton>
            :<></>}
          </div>
          
        </div>
      </div>


    }

    return <div key={key} style={{ ...style, }}>
      <div style={{
        display: "flex",
        // background: bgStyle, 
        border: "1px solid #efefef", height: 80,
        width: "97%", paddingTop: 2, paddingBottom: 2, borderRadius: 5
      }}
      >
        {content}
      </div>
    </div>
  };




  const getDesktopView = () => {
    return <div>
      <div style={{ display: "flex", justifyContent: "center", height: "82vh", paddingTop: 10,  }}>
        <div style={{ width: 330, }}>
          <div style={{ height: "70vh", border: "1px solid #efefef", borderRadius: 5, padding: 5 }}>
            <div style={{ fontSize:"1.35rem", padding:5,paddingBottom:10 }}>
              Saved
            </div>
            {searchResults && searchResults.resultCount > 0 ?
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width * 1}
                    height={height * 0.9}
                    rowCount={searchResults.resultCount}
                    rowHeight={rowHeight}
                    rowRenderer={rowRenderer}
                  />
                )}
              </AutoSizer>
              :
              <div style={{ color: "#595959", fontSize: 16 }}>
                No results found
              </div>
            }
          </div>
          {
            searchResults && searchResults.resultPageCount > 1 ?
            <div style={{ paddingTop: 10, paddingBottom:10, display: "flex", justifyContent: "center", width: "90%", }}>
              <Pagination size="small" count={searchResults.resultPageCount} color="primary" />
            </div>
            :
            <></>
          }

        </div>

        <div style={{ border: "1px solid #fff", height: "71vh", }}>
          <div style={{ display: "flex", }} >
            <div style={{ width: 480, height: "71vh", border: "1px solid #efefef", overflowY: "auto", borderRadius: 5 }} >
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={tabValue}
                    onChange={(e, value) => { setTabValue(value) }}
                    aria-label="wrapped label tabs example"
                  >
                    <Tab sx={{ textTransform: "none" }} label="View Content" value="2" />
                    <Tab sx={{ textTransform: "none" }} label="Comments" value="3" />
                  </Tabs>
                </Box>
                { tabValue == "2"?<Post />:<></> }
                { tabValue == "3"?<Comments />:<></> }

              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  }



  const getMobileView = () => {
    return <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ height: "80vh", display: "flex", flexDirection: "column", width: "90%", border: "1px solid #fff" }}>
        <div style={{ display:"flex", border:"1px solid #fff" }}>
          <div style={{ flexGrow:1,  display:"flex", flexDirection:"column", justifyContent:"center" }} >
            <div style={{fontSize:"1.2rem", paddingLeft:2}}>
              Saved Posts
            </div>
          </div>
          <div>
            <TablePagination
              component="div"
              count={100}
              page={1}
              rowsPerPage={10}
              rowsPerPageOptions={-1}
              onRowsPerPageChange={false}
            />
          </div>
        </div>
        <div style={{ height: (fullScreenJobView) ? "0vh" : "74vh", marginTop: 2 }} >
          {searchResults && searchResults.resultCount > 0 ?
            <AutoSizer>
              {({ width, height }) => (
                <List
                  width={width * 1}
                  height={height}
                  rowCount={searchResults.resultCount}
                  rowHeight={90}
                  rowRenderer={rowMobileRenderer}
                />
              )}
            </AutoSizer>
            :
            <div style={{ display: "flex", justifyContent: "center", color: "#595959", fontSize: 20 }}>
              No saved posts found
            </div>
          }
        </div>
      </div>
    </div>
  }

  return (
    <div>
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

export default Saved