import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import Explore from '../../components/Explore/Explore'

const ExploreMain = () => {

  const [width,] = useWindowSize()

  const getDesktopView = () => {
    return <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", overflowY: "auto" }}>
            <Explore />
          </div>

  }

  const getMobileView = () => {
    return <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", overflowY: "auto" }}>
            <Explore />
          </div>
  }

  return (
    <div style={{}}>
      {width > 600 ? getDesktopView() : <></>}
      {width < 600 ? getMobileView() : <></>}
    </div>
  )
}

export default ExploreMain