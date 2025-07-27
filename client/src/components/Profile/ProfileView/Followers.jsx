import React, { useEffect, useState } from 'react'
import useWindowSize from '../../../hooks/useWindowSize'
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
import Vote from './Post/Vote';

import RssFeedIcon from '@mui/icons-material/RssFeed';

import TablePagination from '@mui/material/TablePagination';
import { Modal, Menu, MenuItem, } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const Followers = () => {

  const [width,] = useWindowSize()

  const { option, section, pageNo, username } = useParams();

  const navigate = useNavigate()
  const location = useLocation()

  console.log("searchTerm 1",location.state)


  const GET_SEARCH_RESULT_QUERY = gql`
    query GetProfileResults($searchInput:SearchInput){
      getProfileResults(searchInput:$searchInput){
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
    currentPage: 1, totalCount: 0
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
          type: "followers",
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

    if (data && data.getProfileResults) {

      const totalCount = data.getProfileResults.totalCount || 1;
      
      if (totalCount !== searchFilter.totalCount) {
        setSearchFilter((prev) => ({
          ...prev, totalCount,
        }));
      }
      

    }

  }, [data,])

  useEffect(() => {
    if(username){
      navigate(`/profile/view/${username}/followers/${searchFilter.currentPage}`,{ state: location.state });
    }else{
      navigate(`/profile/show/followers/${searchFilter.currentPage}`,{ state: location.state });
    }
  }, [searchFilter.currentPage, navigate]);
  

  if (error) { console.log("error", error) }

  const getDesktopView = () => {
    return <div>
      <div style={{ display: "flex", justifyContent: "center", height: "50vh", paddingTop: 0, width: "98%", border: "1px solid #fff" }}>
        <div style={{ width: "95%",  border: "1px solid #fff", borderRadius: 5, padding: 5 }}>
            
                <div>
                <div style={{ paddingTop: 0, }}>
                  <div style={{ border: "1px solid #fff", display: "flex" }}>
                    <div style={{ display: "flex", width: "100%", border: "1px solid #fff" }}>
                      <div style={{
                        padding: 5, paddingTop: 10, paddingLeft: 15,
                        fontSize: 18, color: "#595959"
                      }}
                      >
                        My Followers
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

                <div style={{ paddingLeft:0, display: "flex", justifyContent: "center", width: "100%", height: "45vh", border: "1px solid #fff", overflowY: "auto", borderRadius: 5 }} >
                  <div style={{ border: "1px solid #fff", width: "95%", paddingLeft: 5 }} >

                 

                  {
                    data && data.getProfileResults && data.getProfileResults.people
                    && data.getProfileResults.people.map((person, i) => {
                      return <div style={{ border: "1px solid #efefef", borderRadius: 5, height: 70, width: "90%", marginBottom: 5 }}>
                        <div>
                          <div style={{ display: "flex", padding: 10, border: "1px solid #fff" }}>
                            <div>
                              <Avatar sx={{ height: 50, width: 50 }} src={person.profilePicIcon} />
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

export default Followers