const express = require('express') 
const { createYoga }  = require('graphql-yoga')

const cookieParser = require("cookie-parser")

const cors = require("cors")
const { useGraphQLSSE } = require('@graphql-yoga/plugin-graphql-sse')

require('./connectmongo')
const { schema } = require('./appschema')
const { auth } = require('./graphql/middleware/auth')

require('dotenv').config();

const app = express()
const port = 4000

app.use(
  cors({
    origin: 
      [
        'https://rawopinion.in',
        'https://www.rawopinion.in',
        'http://localhost:5173',
        'http://localhost:4000',
        'http://192.168.100.6:5173'
      ],
    credentials: true, 
  })
)

app.use(cookieParser());

  
app.use("/graphql", (req,res)=>{
  createYoga({
    schema,
    context: {
      req, res, auth  
    },
    graphiql: {
      subscriptionsProtocol: 'GRAPHQL_SSE'
    },
    plugins: [
      useGraphQLSSE()
    ]
  })(req,res)
})

app.use(express.static('public'));
app.get('*', (req, res) => { res.sendFile('index.html', {root: 'public'}); });
app.listen(port, () => { console.log(`app listening on port ${port}`) })

