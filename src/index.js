/* eslint-disable import/no-extraneous-dependencies */

import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import path from 'path'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
// TO-DO: revisit dataloader and check out the proper config
import { createContext } from 'dataloader-sequelize'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import models from './models'

const config = require('../helpers/config')
const { logger } = require('../helpers/logger')

// These are to help with the organization of the project as it grows, logical
// separation of schema objects and resolvers
const typeDefs = importSchema(mergeTypes(fileLoader(path.join(__dirname, './schema'))))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// const context = ({ req, res }) => {
//

// Get database connections here...??
//   make async, if so...
//     or use "lazy loading"
//     per: https://medium.com/@tomlagier/scaffolding-a-rock-solid-graphql-api-b651c2a36438

// Get client identifier from request subdomain
// const tenant = req.subdomains.reverse().join(".");

// Get imetadb connection

// Get client-specific database connection:
// Lookup client id in imetadb connection table and
// establish

// Example of determining user and scope from request
// const user = myAuthenticationLookupCode(req);
// if (!user) {
//   return { user: null, scope: null }
// }
//
// const scope = lookupScopeForUser(user);
// return { user, scope }
// const token = (req.headers
//  && req.headers.authorization
//  && req.headers.authorization.split(' ')[0] === 'Bearer'
// ) ? req.headers.authorization.split(' ')[1] : null;
// return { token, tenant };
// };

// eslint-disable-next-line no-unused-vars
const context = createContext(models.sequelize)

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const PORT = config.app.port
const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    models,
    request: req
  }),
  playground: (!(process.env.NODE_ENV.match('production')))
})

const app = express()

if (!(process.env.NODE_ENV.match('production'))) {
  app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }))
}
server.applyMiddleware({ app })

// playground: ((config.env.match('production')) ? false : true);
// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.

app.listen(PORT, () => {
  logger.info(`🚀 Server started at http://localhost:${PORT}${server.graphqlPath}`)
})
