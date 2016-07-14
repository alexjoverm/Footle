// const async = require('async')
//
// module.exports = function seed(app) {
//   // mongo db resource
//   const mongo = app.dataSources.mongo
//
//   // Created vars
//   let entities
//
//   /**
//    * Entities
//    */
//   function initEntities(cb) {
//     mongo.automigrate('Entity', (err) => {
//       if (err) throw err
//
//       const dataEntities = [
//         { name: 'Physio kit' },
//         { name: 'Domofera' },
//       ]
//       const Entity = app.models.Entity
//
//       Promise.all(
//         dataEntities.map((entity) => Entity.create(entity))
//       ).then(createdEntities => {
//         entities = createdEntities
//         console.log('------- ENTITIES CREATED --------')
//         console.log(createdEntities)
//         cb()
//       })
//     })
//   }
//
//   /**
//    * Admins
//    */
//   function initAdmins(cb) {
//     mongo.automigrate('Admin', (err) => {
//       if (err) throw err
//
//       const dataAdmins = [
//         { email: 'admin@pepe.com', password: 'pepako', entityId: entities[0] },
//         { email: 'tonio@tonio.com', password: 'toniako', entityId: entities[1] },
//       ]
//       const Admin = app.models.Admin
//
//       Promise.all(
//         dataAdmins.map((admin) => Admin.create(admin))
//       ).then(createdAdmins => {
//         console.log('------- ADMINS CREATED --------')
//         console.log(createdAdmins)
//         cb()
//       })
//     })
//   }
//
//   /**
//    * Execute functions in an ordered way
//    */
//   async.waterfall([
//     initEntities,
//     initAdmins
//   ])
// }
