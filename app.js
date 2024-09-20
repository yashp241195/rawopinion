const express = require('express') 

const { createYoga }  = require('graphql-yoga')
const cookieParser = require("cookie-parser")

const cors = require("cors")

const { useGraphQLSSE } = require('@graphql-yoga/plugin-graphql-sse')
const { auth } = require('./graphql/middleware/auth')

const { makeExecutableSchema } = require('@graphql-tools/schema') 

const { UserTypes, UserResolver } = require('./graphql/schema/user')
const { ContentTypes, ContentResolver } = require('./graphql/schema/content')

const mongoose = require('mongoose');

const { PubSub } = require('graphql-subscriptions');

const pubSub = new PubSub()


require('dotenv').config();

const mergedTypeDefs = [
    UserTypes,  ContentTypes
]

const mergedResolvers = [
    UserResolver,  ContentResolver
]

const schema = makeExecutableSchema({
    resolvers: mergedResolvers,
    typeDefs: mergedTypeDefs
})


const LOCALMONGOURI = 'mongodb://127.0.0.1/opinion-db'
const MONGODB_PASS = process.env.MONGODB_PASS

const MONGOURI = 'mongodb+srv://alpha2244:'+MONGODB_PASS+'@cluster0.trsdg.mongodb.net/opinion-db'


const uri = LOCALMONGOURI
// const uri = MONGOURI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(connect => console.log('connected to mongodb..'))
.catch(e => console.log('could not connect to mongodb', e));


const app = express()
const port = 4000

app.use(
  cors({
    origin: 
      [
        'https://dateze.csoc.in',
        'http://localhost:5173',
        'http://localhost:4000',
      ],
    credentials: true, 
  })
)

app.use(cookieParser());

  
app.use("/graphql", (req,res)=>{
  createYoga({
    schema,
    context: {
      req, res, auth, pubSub  
    },
    graphiql: {
      subscriptionsProtocol: 'GRAPHQL_SSE'
    },
    plugins: [
      useGraphQLSSE({
        path: '/graphql/stream',
      })
    ]
  })(req,res)
})


app.use(express.static('public'));
app.get('*', (req, res) => { res.sendFile('index.html', {root: 'public'}); });
app.listen(port, () => { console.log(`app listening on port ${port}`) })

