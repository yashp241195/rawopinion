import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache, from, ApolloLink, HttpLink, } from '@apollo/client';
import {APP_BACKEND} from './config/config.jsx'
import authVar from './vars/authVar.jsx';
import internetVar from './vars/internetVar.jsx';

const httpLink = new HttpLink({ uri: APP_BACKEND, credentials:"include" });

const saveToLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const getFromLocal = (key) => JSON.parse(localStorage.getItem(key))

const saveToLocalDirect = (key, value) => localStorage.setItem(key, value)

const logoutLink = onError(({ graphQLErrors, networkError, operation, forward }) => {

  if(networkError){
    console.log("offline")
    saveToLocalDirect("hasInternet",false)
    internetVar(false)
  }else{
    console.log("online",graphQLErrors)
    saveToLocalDirect("hasInternet",true)
    internetVar(true)
  }


  let hasAuthError = false

  for (let i = 0;i < graphQLErrors.length; i++){
    if(graphQLErrors[i].extensions.code === "VERIFY_ACCESS_TOKEN_FAILED"){
      hasAuthError = true
    }
  }

  if(hasAuthError){

    const REFRESH_TOKEN_QUERY = `
      query {
        getAccessTokenFromRefreshToken 
      }
    `
    
    console.log("hasAuthError")

    fetch(APP_BACKEND, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: REFRESH_TOKEN_QUERY,
        variables: {},
      }),
      credentials: 'include',
    })
    .then((res) => res.json())
    .then((result) => {
      const accessToken = result.data.getAccessTokenFromRefreshToken
      console.log("accessToken123 ",result)
      if(accessToken){
        const auth = getFromLocal("auth")
        const newState = {...auth, token:accessToken}
        saveToLocal("auth",newState)
        authVar(newState)
        return accessToken
      }
      else{
        authVar(null)
        localStorage.clear()
      }
    })
    .then((result)=>{
      operation.setContext(({ headers }) => ({ headers: {
        authorization: result,
        ...headers
      }}));
    })
    
  }

  return forward(operation);
})

const authMiddleware = new ApolloLink((operation, forward) => {

  const accessToken = getFromLocal('auth')

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: accessToken && accessToken.token || "",
    }
  }));

  return forward(operation);
})


const client = new ApolloClient({
  link: logoutLink
  .concat(
    from([
      authMiddleware,
      httpLink
  ])),
  cache: new InMemoryCache(),
});

export default client