import React from 'react'
import Grid from '@mui/material/Grid';
import { default as LoginComponent } from '../../components/Login/Login';
import useWindowSize from '../../hooks/useWindowSize'
import { FRONT_IMAGE } from '../../config/config';


const Login = () => {

    const [width,] = useWindowSize()
    
    const style = {
        centerHorizontal: { 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center" 
        }
    }

    const frontImage = FRONT_IMAGE

    const getDesktopView = () => {
        return  <Grid container style={style.centerHorizontal} spacing={2}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}>
                        <img alt="frontimage" width={"80%"} src={frontImage} />
                    </Grid>
                    <Grid item xs={5}>
                        <LoginComponent />
                    </Grid>
                </Grid>
    }

    const getMobileView = () => {
        return  <Grid>
                    <LoginComponent />
                </Grid>

    }

    return <div>
        {(width>800)?getDesktopView():<></>}
        {(width<800)?getMobileView():<></>}
    </div>
    
}

export default Login
