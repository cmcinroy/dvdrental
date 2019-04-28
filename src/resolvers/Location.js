/* eslint-disable no-param-reassign */
// import getFieldNames from 'graphql-list-fields';
import { parseArgs, changeQToColumn } from '../helperFunctions'

const resolvers = {
  Query: {
    Actor (_parent, args, { models }) {
      return models.Actor.findOne({ where: args })
    },
    allActors (_parent, args, { models }) {
      return models.Actor.findAll(parseArgs(args, models.Sequelize))
    },
    _allActorsMeta (_parent, args, { models }) {
      return models.Actor.count(parseArgs(args, models.Sequelize))
    },
  },
  ListMetadata: {
    count(parent) {
      return parent;
    },
  },
}

export default resolvers
