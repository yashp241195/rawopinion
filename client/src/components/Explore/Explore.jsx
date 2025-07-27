import React, { useEffect, useState } from 'react'
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
import { Link, useSearchParams, useNavigate, useLocation, useParams } from 'react-router-dom'
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
import CloseIcon from '@mui/icons-material/Close';
import Post from './../Post/Post'
import Comments from '../Comments/Comments'
import Vote from './Post/Vote';

import RssFeedIcon from '@mui/icons-material/RssFeed';

import TablePagination from '@mui/material/TablePagination';
import { Modal, Menu, MenuItem, } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const Explore = () => {

  const [width,] = useWindowSize()


  const { option, section, pageNo } = useParams();

  const navigate = useNavigate()
  const location = useLocation()

  console.log("searchTerm 1",location.state)


  const GET_SEARCH_RESULT_QUERY = gql`
    query GetSearchResults($searchInput:SearchInput){
      getSearchResults(searchInput:$searchInput){
          posts{
            _id
            publicUsername 
            profilePicIcon
            text
            textAIAnalysis
            image{
              imgid url icon_url thumb_url 
              identifiedAs isSafe
            }
            upvoteCount downvoteCount
            commentsCount
            readerPicIcon 
            readerPublicUsername
            readerUpvoted
            timestamp
          } 
          people{
            firstname lastname 
            publicUsername 
            profilePicIcon
          }  
          currentPage
          totalPages
          totalCount
          type
      }
    }
  `

  const [loadSearchResults, { data, loading, error }] = useLazyQuery(GET_SEARCH_RESULT_QUERY, { fetchPolicy: "network-only" })

  const [selectedAIAnalysis, setSelectedAIAnalysis] = useState("")

  const [searchFilter, setSearchFilter] = useState({
    section: section, searchTerm: "", searchType: option,
    currentPage: parseInt(pageNo), totalCount: 0
  })


  useEffect(()=>{
    if(location && location.state && location.state.searchTerm){
      setSearchFilter({...searchFilter,searchTerm:location.state.searchTerm})
    }
  },[location.state])
  
  useEffect(() => {

    loadSearchResults({
      variables: {
        searchInput: {
          searchTerm: searchFilter.searchTerm,
          type: searchFilter.searchType,
          section: searchFilter.section,
          currentPage: searchFilter.currentPage
        }
      },
      fetchPolicy: "network-only"
    })

  }, [
    searchFilter.searchTerm,
    searchFilter.currentPage,
    searchFilter.searchType,
    searchFilter.section,
    loadSearchResults
  ])


  useEffect(() => {

    if (data && data.getSearchResults) {

      const totalCount = data.getSearchResults.totalCount || 1;
      if (totalCount !== searchFilter.totalCount) {
        setSearchFilter((prev) => ({
          ...prev, totalCount,
        }));
      }

    }

  }, [data,])

  useEffect(() => {
    navigate(`/explore/${searchFilter.section}/${searchFilter.searchType}/${searchFilter.currentPage}`,{ state: location.state });
  }, [searchFilter.searchType, searchFilter.currentPage, navigate]);

  useEffect(() => {
    if (searchFilter.section == "feeds") {
      navigate(`/explore/${searchFilter.section}/content/1`,{ state: location.state });
    } else {
      navigate(`/explore/${searchFilter.section}/${searchFilter.searchType}/${searchFilter.currentPage}`,{ state: location.state });
    }
  }, [searchFilter.section, navigate]);



  if (error) { console.log("error", error) }


  const wrapMenuItem = (item) => {
    const { minWidth, label, value, menuItemList } = item
    return <FormControl sx={{ m: 1, minWidth: minWidth, }} size="small">
      <Select defaultValue={''}
        onChange={(e) => {
          setSearchFilter({
            ...searchFilter,
            searchType: e.target.value,
            currentPage: 1
          })
        }}
        value={value}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
        variant='standard'
        size="small"
      >
        {
          menuItemList.map((it, i) => {
            return <MenuItem
              key={i} value={it}
              onClick={() => {
                navigate("/explore/search/" + it + "/1")
              }}>
              {it[0].toUpperCase() + it.slice(1).toLowerCase()}
            </MenuItem>
          })
        }
      </Select>
    </FormControl>
  }


  const getDesktopView = () => {
    return <div>
      <div style={{ display: "flex", justifyContent: "center", height: "85vh", paddingTop: 0, width: "95%", border: "1px solid #fff" }}>
        <div style={{ width: "90%", height: "80vh", border: "1px solid #fff", borderRadius: 5, padding: 5 }}>
          <div style={{ width: "90%", border: "1px solid #fff", paddingLeft: 15 }}>
            <Box sx={{ width: '50%', borderBottom: 1, borderColor: "#efefef" }}>
              <Tabs
                style={{ border: "1px solid #fff", height: 60, paddingBottom: 0, }}
                value={searchFilter.section}
                onChange={(ev, newV) => { setSearchFilter({ ...searchFilter, section: newV }) }}
                textColor={"secondary"}
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab
                  iconPosition="end"
                  icon={<RssFeedIcon sx={{ fontSize: 18 }} />}
                  style={{
                    textTransform: "none", fontSize: 14,
                  }}
                  value="feeds" label="Feeds"
                />
                <Tab
                  iconPosition="end"
                  icon={<SearchIcon sx={{ fontSize: 18 }} />}
                  style={{
                    textTransform: "none", fontSize: 14,
                  }}
                  value="search" label="Search"
                />
              </Tabs>
            </Box>
          </div>
            {
              searchFilter.section == "search" ?
                <div>
                  <div style={{ paddingTop: 10, }}>
                    <div style={{ border: "1px solid #fff", display: "flex" }}>
                      <div style={{ width: 125, paddingLeft: 20 }}>
                        {
                          wrapMenuItem({
                            value: searchFilter.searchType,
                            minWidth: 95,
                            menuItemList: [
                              "content", "people",
                            ]
                          })
                        }
                      </div>
                      <div style={{ paddingTop: 8, }}>
                        <div style={{ display: "flex" }}>
                          <TextField
                            autoFocus
                            onChange={(e) => {

                              setSearchFilter({
                                ...searchFilter,
                                searchTerm: e.target.value
                              })

                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton size="small">
                                    {
                                      searchFilter.searchTerm.length > 0 ?
                                        <CloseIcon /> : <SearchIcon />
                                    }
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            value={searchFilter.searchTerm}
                            name="n1" style={{ width: 300 }} id="outlined-basic-1"
                            size="small" placeholder='Search ... ' variant="standard"
                          />

                        </div>
                      </div>
                      <div>
                        <div>
                          <TablePagination
                            component="div"
                            onPageChange={(e, page) => {
                              setSearchFilter({
                                ...searchFilter,
                                currentPage: page + 1
                              })
                            }}
                            count={searchFilter.totalCount}
                            page={searchFilter.currentPage - 1}
                            rowsPerPage={2}
                            rowsPerPageOptions={2}
                            onRowsPerPageChange={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{  display: "flex", justifyContent: "center", width: "100%", height: "58vh", border: "1px solid #fff", overflowY: "auto", borderRadius: 5 }} >
                      <div style={{ border: "1px solid #fff", width: "98%", paddingLeft: 30 }} >
                        {
                          data && data.getSearchResults && data.getSearchResults.people
                          && data.getSearchResults.people.map((person, i) => {
                            return <div style={{ border: "1px solid #efefef", borderRadius: 5, height: 80, width: "60%", marginBottom: 10 }}>
                              <div>
                                <div style={{ display: "flex", padding: 10, border: "1px solid #fff" }}>
                                  <div>
                                    <Avatar sx={{ height: 60, width: 60 }} src={person.profilePicIcon} />
                                  </div>
                                  <div style={{ display: "flex", flexDirection: "column", paddingLeft: 10, paddingRight: 10 }} >
                                    <div style={{ fontSize: "1rem", paddingTop: 5, }} >
                                      {person.firstname + " " + person.lastname}
                                    </div>
                                    <div style={{ fontSize: "0.8rem" }}>
                                      <Link
                                      state={searchFilter}
                                      style={{ textDecoration: "none", color: "blue" }} to={"/profile/view/" + person.publicUsername+"/overview"}>
                                        @{person.publicUsername}
                                      </Link>
                                    </div>
                                    <div style={{ fontSize: "0.8rem" }}>
                                      {person.timestamp}
                                    </div>
                                  </div>
                                  <div style={{ flexGrow: 1 }}></div>
                                  <div style={{ padding: 5 }}>
                                    <Button
                                      onClick={
                                        () => {

                                        }
                                      }
                                      size="small" variant="outlined"
                                      sx={{
                                        textTransform: "none",
                                        border: "1px solid #efefef"
                                      }}
                                    >
                                      Follow
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          })
                        }

                        {
                          data && data.getSearchResults && data.getSearchResults.posts 
                          && data.getSearchResults.posts.map((post, num) => {

                            let ai_analysis = null

                            if (post) { ai_analysis = JSON.parse(post.textAIAnalysis).content_analysis; }

                            return <div style={{ border: "1px solid #efefef", borderRadius: 5, width: "60%", marginBottom: 10 }}>
                              <div>
                                <Link
                                state={searchFilter}

                                style={{ textDecoration:"none", color:"black" }} to={"/profile/view/" + post.publicUsername+"/overview"}>
                                <div style={{ display: "flex", padding: 10, border: "1px solid #fff" }}>
                                  <div>
                                    <Avatar sx={{ height: 40, width: 40 }} src={post.profilePicIcon} />
                                  </div>
                                  <div style={{ display: "flex", flexDirection: "column", paddingLeft: 10, paddingRight: 10 }} >
                                    <div style={{ fontSize: "0.9rem", paddingTop: 5, fontFamily:"sans-serif" }} >
                                        {post.publicUsername} 
                                    </div>
                                    <div style={{ fontSize: "0.8rem" }}>
                                      {post.timestamp} 
                                    </div>
                                  </div>

                                  <div style={{ flexGrow: 1 }}></div>


                                  <div style={{ padding: 5 }}>
                                    {"onBlockchain" ? <CurrencyBitcoinIcon sx={{ fontSize: "1.6rem", color: "#595959" }} /> : <></>}
                                  </div>
                                </div>
                                </Link>
                              </div>
                              <div style={{ display: "flex", }}>
                                {post.image ?
                                  <div style={{ paddingLeft: 12, paddingRight: 0, paddingTop: 10 }}>
                                    <Avatar sx={{ height: 200, width: 200 }} variant="rounded" src={post.image.thumb_url} />
                                  </div>
                                  : ""}

                                <div style={{ whiteSpace: 'pre-line', padding: 15, fontSize: 16, width: 300 }}>
                                  {post.text}
                                </div>
                              </div>
                              <div style={{ fontSize: "0.95rem", padding: 10, }}>
                                {
                                  ai_analysis && ai_analysis.map(
                                    (it, i) => <div key={i}>
                                      <div>
                                        <Chip onClick={() => { setSelectedAIAnalysis(it.issue_type + "-" + num) }}
                                          size="small" style={{ color: "#fff", border: "1px solid #fff", background: "#ff0000" }} label={it.issue_type} variant="outlined" />
                                      </div>
                                      <div style={{ fontSize: 12, paddingTop: 5, color: "red" }}>
                                        {selectedAIAnalysis == it.issue_type + "-" + num ? it.description : ""}
                                      </div>
                                      <div style={{ fontSize: 12, paddingTop: 5, color: "blue" }}>
                                      </div>
                                    </div>
                                  )
                                }
                              </div>
                              <div>
                                <Vote
                                  searchFilter={searchFilter}
                                  upVoteCount={post.upvoteCount}
                                  downVoteCount={post.downvoteCount}
                                  commentsCount={post.commentsCount}
                                  readerUpvoted={post.readerUpvoted}
                                  hasReaderUpvoted={post.readerUpvoted == null ? false : true}
                                  postID={post._id}
                                />
                              </div>
                            </div>
                          })
                        }
                                    
                        
                        {
                          loading?
                            <div style={{width:400}}>
                              {getLoadingView()}
                            </div>
                          :<></>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                :<></>
            }

            {
              searchFilter.section == "feeds" ?
                <div>
                  <div style={{ paddingTop: 10, }}>
                    <div style={{ border: "1px solid #fff", display: "flex" }}>
                      <div style={{ display: "flex", width: 600, border: "1px solid #fff" }}>
                        <div style={{
                          padding: 5, paddingTop: 14, paddingLeft: 25,
                          fontSize: 18, color: "#595959"
                        }}
                        >
                          Content from people you follow
                        </div>
                        <div style={{ flexGrow: 1 }}></div>
                        <div>
                          <TablePagination
                            component="div"
                            onPageChange={(e, page) => {
                              setSearchFilter({
                                ...searchFilter,
                                currentPage: page + 1
                              })
                            }}
                            count={searchFilter.totalCount}
                            page={searchFilter.currentPage - 1}
                            rowsPerPage={2}
                            rowsPerPageOptions={2}
                            onRowsPerPageChange={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>

                  <div style={{ paddingLeft:10, display: "flex", justifyContent: "center", width: "100%", height: "60vh", border: "1px solid #fff", overflowY: "auto", borderRadius: 5 }} >
                    <div style={{ border: "1px solid #fff", width: "98%", paddingLeft: 15 }} >

                    {
                      data && data.getSearchResults && data.getSearchResults.posts 
                      && data.getSearchResults.posts.map((post, num) => {

                        let ai_analysis = null

                        if (post) { ai_analysis = JSON.parse(post.textAIAnalysis).content_analysis; }

                        return <div style={{ border: "1px solid #efefef", borderRadius: 5, width: "60%", marginBottom: 10 }}>
                          <div>
                            <Link 
                            state={searchFilter}
                            style={{ textDecoration:"none", color:"black" }} to={"/profile/view/" + post.publicUsername+"/overview"}>
                            <div style={{ display: "flex", padding: 10, border: "1px solid #fff" }}>
                              <div>
                                <Avatar sx={{ height: 40, width: 40 }} src={post.profilePicIcon} />
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", paddingLeft: 10, paddingRight: 10 }} >
                                <div style={{ fontSize: "0.9rem", paddingTop: 5, fontFamily:"sans-serif" }} >
                                    {post.publicUsername} 
                                </div>
                                <div style={{ fontSize: "0.8rem" }}>
                                  {post.timestamp} 
                                </div>
                              </div>

                              <div style={{ flexGrow: 1 }}></div>


                              <div style={{ padding: 5 }}>
                                {"onBlockchain" ? <CurrencyBitcoinIcon sx={{ fontSize: "1.6rem", color: "#595959" }} /> : <></>}
                              </div>
                            </div>
                            </Link>
                          </div>
                          <div style={{ display: "flex", }}>
                            {post.image ?
                              <div style={{ paddingLeft: 12, paddingRight: 0, paddingTop: 10 }}>
                                <Avatar sx={{ height: 200, width: 200 }} variant="rounded" src={post.image.thumb_url} />
                              </div>
                              : ""}

                            <div style={{ whiteSpace: 'pre-line', padding: 15, fontSize: 16, width: 300 }}>
                              {post.text}
                            </div>
                          </div>
                          <div style={{ fontSize: "0.95rem", padding: 10, }}>
                            {
                              ai_analysis && ai_analysis.map(
                                (it, i) => <div key={i}>
                                  <div>
                                    <Chip onClick={() => { setSelectedAIAnalysis(it.issue_type + "-" + num) }}
                                      size="small" style={{ color: "#fff", border: "1px solid #fff", background: "#ff0000" }} label={it.issue_type} variant="outlined" />
                                  </div>
                                  <div style={{ fontSize: 12, paddingTop: 5, color: "red" }}>
                                    {selectedAIAnalysis == it.issue_type + "-" + num ? it.description : ""}
                                  </div>
                                  <div style={{ fontSize: 12, paddingTop: 5, color: "blue" }}>
                                  </div>
                                </div>
                              )
                            }
                          </div>
                          <div>
                            <Vote
                              upVoteCount={post.upvoteCount}
                              downVoteCount={post.downvoteCount}
                              commentsCount={post.commentsCount}
                              readerUpvoted={post.readerUpvoted}
                              hasReaderUpvoted={post.readerUpvoted == null ? false : true}
                              postID={post._id}
                            />
                          </div>
                        </div>
                      })
                    }
                        
                    {
                      loading?
                        <div style={{width:400}}>
                          {getLoadingView()}
                        </div>
                      :<></>
                    }

                    </div>
                  </div>

                  </div>
                </div>
                : <></>
            }





        </div>
      </div>
    </div>
  }


  const getMobileView = () => {
    return <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ height: "80vh", justifyContent: "center", display: "flex", flexDirection: "column", width: "90%", border: "1px solid #fff" }}>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 0, paddingBottom: 0, border: "1px solid #fff" }}>
          <div style={{ paddingLeft: 0, paddingRight: 5, width: "100%", display: "flex", flexDirection: "column" }}>
            <div>
              <div style={{ flexGrow: 1, padding: 5, }}>
                {
                  wrapMenuItem({
                    value: searchFilter.searchType,
                    minWidth: 90,
                    menuItemList: [
                      "people", "content",
                    ]
                  })
                }
              </div>
            </div>

          </div>
        </div>


        <div style={{ height: "74vh", marginTop: 2 }} >


        </div>
      </div>
    </div>
  }

  const getLoadingView = () => {

    return <div style={{ display: "flex", justifyContent: "center", height: 300, border: "1px solid #fff", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    </div>
  }

  return (
    <div>
      {(width > 800 ? getDesktopView() : <></>)}
      {(width < 800 ? getMobileView() : <></>)}
    </div>
  )
}

export default Explore