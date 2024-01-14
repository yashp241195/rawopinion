import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import Saved from '../../components/Saved/Saved'

const SavedMain = () => {

  const [width,] = useWindowSize()

  const getDesktopView = () => {
    return <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", overflowY: "auto" }}>
            <Saved />
          </div>

  }

  const getMobileView = () => {
    return <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", overflowY: "auto" }}>
            <Saved />
          </div>
  }

  return (
    <div style={{}}>
      {width > 600 ? getDesktopView() : <></>}
      {width < 600 ? getMobileView() : <></>}
    </div>
  )
}

export default SavedMain