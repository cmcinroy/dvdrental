/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-nested-ternary */
import _ from 'lodash'

export function isEmpty (obj) {
  return !obj || Object.keys(obj).length === 0
}

export function changeQToColumn (filter, map) {
  return _.mapKeys(filter, (value, key) => map[key])
}

export function check (v) {
  return (Array.isArray(v)) ? v : false
}

// TO-DO: Revisit this as sequelize becomes more familar, some of this
// functionality will be able to be stripped out
export function parseArgs (args, models) {
  // if args is empty then we are probably not coming from react
  // admin at this point so don't bother doing anything
  if (isEmpty(args)) { return args }

  const { Op } = models.Sequelize

  // This object will hold our limit, offset, sort, include or
  // search criteria that we will pass off to sequelise
  const returnObject = {}

  const limit = args.perPage ? args.perPage : null
  const offset = args.page && args.perPage ? args.page * args.perPage : null
  // eslint-disable-next-line max-len
  const order = args.sortField ? (args.sortOrder ? [args.sortField, args.sortOrder] : [args.sortField]) : null
  const { filter } = args

  if (limit) { returnObject.limit = limit }

  if (offset) { returnObject.offset = offset }

  if (order) { returnObject.order = [order] }

  const searchCriteria = []
  let isInclude = false

  // This may be able to be done differently by checking the type of filter we
  // are working with howeverin the interest of speed for now, i added blocks to
  // check for includes like filter.tag_ids

  // TO-DO: Eslint hated this for-in, revisit and change to satisfy
  for (const key in filter) {
    // dynamically add sequelize ops to our filter data
    const obj = {}
    // If this property exists in the filter then this is filtering on an include
    // (child table) rather than just a filter on fields of the parent table where
    // we would just tack on all the properties with an AND or an OR etc
    if (key === 'issuer_id') {
      obj.issuer_id = args.filter.issuer_id.id
      delete args.filter.issuer_id
    } else if (key === 'issuer_country_id') {
      obj.country = args.filter.issuer_country_id.id
    } else if (key === 'tag_id') {
      isInclude = true
      returnObject.include = [
        {
          model: models.Tag,
          as: 'tags',
          through: 'ProductRealBenefitsJoin',
          where: {
            name: args.filter.tag_id.map(a => a.id)
          }
        }
      ]
    } else if (key === 'product_real_benefit_tags') {
      isInclude = true

      returnObject.include = [
        {
          model: models.Tag,
          as: 'tags',
          through: 'ProductRealBenefitsJoin',
          where: {
            name: args.filter.product_real_benefit_tags.id
          }
        }
      ]
    } else if (key === 'ids') {
      // We have to reduce calls to ids which can be an array of objects, to simply an array of id's
      const reducedIdArray = []

      if (filter[key][0] && filter[key][0].id) {
        // Just iterate through the objects and assemble an array of the id values
        for (const key2 in filter[key]) {
          reducedIdArray.push(filter[key][key2].id)
        }
        obj.id = { [Op.in]: reducedIdArray }
      } else {
        // Sometimes it will just come to us as an array of values
        // and we can just go ahead and add it
        obj.id = { [Op.in]: filter[key] }
      }
    } else if (typeof (filter[key]) === 'number') {
      obj[key] = { [Op.eq]: filter[key] }
    } else if (key.endsWith('_id')) {
      obj[key] = { [Op.eq]: filter[key] }
    } else if (filter[key] !== '') {
      // React-Admin sends an empty query string back from autocomplete when you delete what you
      // were typing, so simply ignore it as if there was no filter sent for any empty value
      obj[key] = { [Op.iLike]: `%${filter[key]}%` }
    }
    // push them into an array in case of multiple criteria
    searchCriteria.push(obj)
  }

  // If it's an include then we don't need the where clause or individual Ops, so we will skip this
  if (!isInclude) { returnObject.where = { [Op.and]: searchCriteria } }

  return returnObject
}
