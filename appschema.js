const { makeExecutableSchema } = require('@graphql-tools/schema') 

const { UserTypes, UserResolver } = require('./graphql/schema/user')
const { MessageTypes, MessageResolver } = require('./graphql/schema/message')
const { ContentTypes, ContentResolver } = require('./graphql/schema/content')

let mergedTypeDefs = [
    UserTypes, MessageTypes, ContentTypes
]

let mergedResolvers = [
    UserResolver, MessageResolver, ContentResolver
]

const schema = makeExecutableSchema({
    resolvers: mergedResolvers,
    typeDefs: mergedTypeDefs
})

module.exports = {schema}