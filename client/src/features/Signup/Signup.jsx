import React from 'react'
import Grid from '@mui/material/Grid';

import { default as SignupComponent } from '../../components/Signup/Signup';
import useWindowSize from '../../hooks/useWindowSize'


const Signup = () => {

    const [width,] = useWindowSize()
    
    const style = {
        centerHorizontal: { 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
        }
    }


    const getDesktopView = () => {
        return  <Grid container style={style.centerHorizontal} spacing={2}>
                    <Grid item xs={5}>
                        <SignupComponent />
                    </Grid>
                </Grid>
    }

    const getMobileView = () => {
        return  <Grid container spacing={2}>
                    <SignupComponent />
                </Grid>

    }

    const getView = () =>{
        return <div>
            {(width>850)?getDesktopView():getMobileView()}
        </div>
    }

    return <div>{getView()}</div>
    
}

export default Signup


