import React, { useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Avatar from '@mui/material/Avatar';
import { Button, Checkbox, TextField, InputAdornment, IconButton } from '@mui/material';
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



const Saved = () => {

  const [width,] = useWindowSize()
  const [searchParams] = useSearchParams();

  const GET_SEARCH_RESULT_QUERY = gql`
    query GetSearchResults($searchInput:SearchInput){
      getSearchResults(searchInput:$searchInput){
        postList{
          postId postTitle postedBy 
          postStatus
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

  const GET_JOB_DETAILS_QUERY = gql`
    query GetJobDetails($jobId:String){
      getJobDetails(jobId:$jobId){
        jobId jobtitle jobLocation jobMode
        companyLogo companyName companyStatus
        experience ctc
      }
    }
  `

  const SEND_JOB_REQUEST_QUERY = gql`
    mutation SendJobRequest($requestInput:RequestInput){
      sendJobRequest(requestInput:$requestInput)
    }
  `

  const { data, loading, error } = useQuery(GET_SEARCH_RESULT_QUERY, { fetchPolicy: "network-only" })

  const [doGetJobDetails, { data: data2, loading: loading2, error: error2 }] = useLazyQuery(GET_JOB_DETAILS_QUERY, { fetchPolicy: "network-only" })

  const [doSendJobRequest, { data: data3, loading: loading3, error: error3 }] = useMutation(SEND_JOB_REQUEST_QUERY, { fetchPolicy: "network-only" })

  const [searchResults, setSearchResults] = useState(null)
  const [selectedJobDetail, setSelectedJobDetail] = useState(null)

  const [tabValue, setTabValue] = useState('2');


  const [fullScreenJobView, setFullScreenJobView] = useState(false)
  const [savedList, setSavedList] = useState([])

  if (data2) {
    if (!selectedJobDetail) {
      if (data2.getJobDetails) {
        setSelectedJobDetail(data2.getJobDetails)
      }
    }
  }

  if (data) {
    console.log("data", data)
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
        postId, postTitle, postedBy, postImage, postStatus
      } = searchResults.postList[index]

      content = <div>
        <div style={{ display: "flex", }} >
          <div style={{ width: "100%" }} >
            <Link
              // onClick={() => { doGetJobDetails({ variables: { jobId: jobId } }) }}
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
                        {postStatus === "Verified" ? <CheckCircleIcon sx={{ fontSize: "0.7rem", color: "green" }} /> : <></>}
                      </div>
                    </div>
                    <div style={{ fontSize: "0.9rem", paddingTop: 3, fontFamily: "sans-serif", color: "#000", }} >
                      {postTitle}
                    </div>
                  </div>
                </div>


              </div>
            </Link>
          </div>

          <div>
            <Checkbox
              sx={{ fontSize: 14 }}
              icon={<BookmarkBorderIcon sx={{ color: "#595959" }} />}
              checkedIcon={<BookmarkIcon sx={{ color: "#595959" }} />}
            />
          </div>

        </div>
      </div>

    }

    // const bgStyle = (searchParams.get("jobId") === jobId) ? "#fafafa" : "#fff"

    return <div
      key={key}
      style={{
        ...style, width: "99%", height: 80,
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
        postId, postTitle, postedBy, postImage
      } = searchResults.postList[index]

      content = <div style={{display:"flex", width:"98%"}}>
        <div style={{ flexGrow: 1, }}>
          <Link
            // onClick={() => { doGetJobDetails({ variables: { jobId: jobId } }) }}
            style={{ color: "#000", textDecoration: "none", }}
          //  to={"/Saved?jobId=" + jobId} 
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", }}>
                <div style={{ padding: 5 }}>
                  <Avatar src={postImage.icon_url} variant="rounded" sx={{ width: 60, height: 60 }} ></Avatar>
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: "flex", paddingTop: 5, paddingLeft: 0 }}>
                    <div style={{ fontSize: "0.8rem", fontFamily: "sans-serif", color: "#070675", }} >
                      {postedBy} 
                    </div>
                    <div style={{ paddingLeft: 5, paddingTop: 0 }}>
                      {/* {companyStatus === "Verified" ? <CheckCircleIcon sx={{ fontSize: "0.7rem", color: "green" }} /> : <></>} */}
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
        <div style={{}}>
          <Checkbox
            icon={<BookmarkBorderIcon sx={{ color: "#595959" }} />}
            checkedIcon={<BookmarkIcon sx={{ color: "#595959" }} />}
          />
        </div>
      </div>


    }

    return <div key={key} style={{ ...style, }}>
      <div style={{
        display: "flex", border: "1px solid #efefef", height: 70,
        width: "97%", paddingTop: 2, paddingBottom: 2, borderRadius: 5
      }}
      >
        {content}
      </div>
    </div>
  };




  const getDesktopView = () => {
    return <div>
      <div style={{ display: "flex", justifyContent: "center", height: "78vh", paddingTop: 10 }}>

        <div style={{ width: 330, }}>
          <div style={{ height: "62vh", border: "1px solid #efefef", borderRadius: 5, padding: 5 }}>
            
            {searchResults && searchResults.resultCount > 0 ?
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width * 1}
                    height={height * 0.86}
                    rowCount={searchResults.resultCount}
                    rowHeight={90}
                    rowRenderer={rowRenderer}
                  // scrollToIndex={searchResults.findIndex(it => it.jobtitle === searchParams.get("jobId"))}
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
            searchResults && searchResults.resultPageCount > 0 ?
              <div style={{ height: "8vh", paddingTop: 20, display: "flex", justifyContent: "center", width: "90%" }}>
                <Pagination size="small" count={searchResults.resultPageCount} color="primary" />
              </div>
              :
              <></>
          }

        </div>

        <div style={{ border: "1px solid #fff", height: "63vh", }}>
          <div style={{ display: "flex", }} >
            <div style={{ width: 480, height: "63vh", border: "1px solid #efefef", overflowY: "auto", borderRadius: 5 }} >
             
            </div>
          </div>
        </div>
      </div>
    </div>
  }



  const getMobileView = () => {
    return <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ height: "80vh", display: "flex", flexDirection: "column", width: "90%", border: "1px solid #fff" }}>
       

        {
          searchResults && searchResults.resultCount > 0 ?
            <div style={{ height: (fullScreenJobView) ? "75vh" : "22vh", }} >

              {
                data ?
                  <div style={{ fontFamily: "sans-serif", background: "#fff", border: "1px solid #efefef", overflowY: "auto", display: "flex", flexDirection: "column", borderRadius: 5, padding: 5, width: "94%" }} >
                    <div style={{ height: "12vh" }}>

                    </div>
                    {
                      fullScreenJobView ?
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ height: 600 }} >

                          </div>
                        </div>
                        :
                        <></>
                    }
                    <div style={{ flexGrow: 1 }} ></div>
                    <div style={{ display: "flex", }}>
                      <div style={{ flexGrow: 1 }}></div>
                      <div>
                        <Button
                          style={{ textTransform: "none", color: "#808080", }}
                          size="small"
                          onClick={() => { setFullScreenJobView(!fullScreenJobView) }}
                          endIcon={
                            (fullScreenJobView) ?
                              <FullscreenExitIcon style={{ color: "#808080" }} />
                              : <FullscreenIcon style={{ color: "#808080" }} />
                          }
                        >
                          {fullScreenJobView ? "see less" : "see more "}
                        </Button>
                      </div>
                    </div>
                  </div>
                  :
                  <div style={{ border: "1px solid #efefef", height: "97%", width: "97%", borderRadius: 5 }}>
                    <div style={{ display: "flex", justifyContent: "center", height: "100%", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        {(loading2) ? <CircularProgress /> : <></>}
                        {searchParams.get("jobId") ? <></> : <div> Please Select the Job </div>}
                      </div>
                    </div>
                  </div>
              }
            </div>
            :
            <></>
        }

        <div style={{ height: (fullScreenJobView) ? "0vh" : "54vh", marginTop: 2 }} >
          {searchResults && searchResults.resultCount > 0 ?
            <AutoSizer>
              {({ width, height }) => (
                <List
                  width={width * 1}
                  height={height}
                  rowCount={searchResults.resultCount}
                  rowHeight={80}
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
        {
          searchResults && searchResults.resultPageCount > 0 && !fullScreenJobView ?
            <div style={{ height: "5vh", marginTop: 5, paddingTop: 5, display: "flex", justifyContent: "center" }}>
              <Pagination size="small" count={searchResults.resultPageCount} color="primary" />
            </div>
            :
            <></>
        }







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