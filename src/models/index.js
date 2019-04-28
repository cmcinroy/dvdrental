import { Sequelize } from 'sequelize'
import sequelize from '../../helpers/db'

const models = {
  Actor: sequelize.import('./actor'),
  Address: sequelize.import('./address'),
  Category: sequelize.import('./category'),
  City: sequelize.import('./city'),
  Country: sequelize.import('./country'),
  Customer: sequelize.import('./customer'),
  Film: sequelize.import('./film'),
  FilmActor: sequelize.import('./film_actor'),
  FilmCategory: sequelize.import('./film_category'),
  Inventory: sequelize.import('./inventory'),
  Language: sequelize.import('./language'),
  Payment: sequelize.import('./payment'),
  Rental: sequelize.import('./rental'),
  Staff: sequelize.import('./staff'),
  Store: sequelize.import('./store')
}

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    // console.log(models[modelName]);
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

// models.sequelize.authenticate().then(() => {
// console.log("Successfully connected to Rise DB!");
// }).catch((err) => {
// .log(err);
// });

export default models
