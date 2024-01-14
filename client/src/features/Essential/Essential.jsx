import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import EssentialVerticalStepper from './EssentialVerticalStepper'


const Essential = () => {

  const [width,] = useWindowSize()

  const getDesktopView = () => {
    return <div>
              <div style={{fontSize:18}}>Essential Info</div>
              <EssentialVerticalStepper />
            </div>
  }

  const getMobileView = () => {
    return <div>
            <EssentialVerticalStepper />
          </div>
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
      {(width > 800) ? getDesktopView() : <></>}
      {(width < 800) ? getMobileView() : <></>}
    </div>
  )
}

export default Essential