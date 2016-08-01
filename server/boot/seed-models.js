const async = require('async')
const createModel = require('common/footle/helpers').createModel

module.exports = function seed(app) {
  // mongo db resource
  const mongo = app.dataSources.mongo
  const RoleMapping = app.models.RoleMapping

  /**
   * Roles
   * @type {Array}
   */
  const roles = ['patient', 'doctor', 'admin', 'superadmin']

  // Created vars
  // let cEntities
  let cRoles
  let cUsers
  let cEntities
  let cEstablishments
  let cPatients
  let cDoctors
  let cAppointments

  /**
   * Roles
   */
  function initRoles(cb) {
    const data = roles.map(role => ({
      name: role,
    }))
    createModel(app, mongo, 'Role', data).then(res => {
      cRoles = res
      cb()
    })
  }

  /**
   * Users
   */
  function initUsers(cb) {
    const data = [{
      email: 'patient@test.com',
      password: 'test123'
    }, {
      email: 'doctor@test.com',
      password: 'test123'
    }, {
      email: 'admin@test.com',
      password: 'test123'
    }, {
      email: 'superadmin@test.com',
      password: 'test123'
    }]

    createModel(app, mongo, 'user', data).then(res => {
      cUsers = res
      const mapping = cUsers.map(user => ({
        principalType: RoleMapping.USER,
        principalId: user.id,
      }))

      Promise.all(
        cRoles.map((role, index) =>
          role.principals.create(mapping[index])
        )
      ).then(roleMappings => {
        console.log('------- role mappings CREATED --------')
        console.log(roleMappings)
        cb()
      }).catch(err => console.error(err))
    })
  }

  /**
   * Patients
   */
  function initPatients(cb) {
    const data = [{
      name: 'Alex',
      surname: 'Jover Morales',
      phone: '83942394293',
      address: 'Calle Almenabar, 2, 3ºA, 03001',
      city: 'Alicante',
      country: 'ES',
      birthday: new Date(2000, 0, 9),
      userId: cUsers[0].id,
    }]

    createModel(app, mongo, 'patient', data).then(res => {
      cPatients = res
      cb()
    })
  }

  /**
   * Doctors
   */
  function initDoctors(cb) {
    const data = [{
      name: 'Victor',
      surname: 'Navarro',
      phone: '83942394293',
      address: 'Calle Almendro, 24',
      city: 'Muchamiel, Alicante',
      country: 'ES',
      contactMail: 'victor@physiokit.com',
      birthday: new Date(1990, 2, 22),
      userId: cUsers[1].id,
    }]

    createModel(app, mongo, 'doctor', data).then(res => {
      cDoctors = res
      cb()
    })
  }

  /**
   * Appointments
   */
  function initAppointments(cb) {
    const data = [{
      doctorId: cDoctors[0].id,
      patientId: cPatients[0].id,
      establishmentId: cEstablishments[0].id,
    }, {
      doctorId: cDoctors[0].id,
      patientId: cPatients[0].id,
      establishmentId: cEstablishments[1].id,
      date: new Date(2016, 5, 19),
      notes: 'Some notes...',
    }]

    createModel(app, mongo, 'appointment', data).then(res => {
      cAppointments = res
      cb()
    })
  }

  /**
   * Entities
   */
  function initEntities(cb) {
    const data = [{
      name: 'Physio kit 3.0'
    }, {
      name: 'ClinicaAlicante'
    }]

    createModel(app, mongo, 'entity', data).then(res => {
      cEntities = res
      cb()
    })
  }

  /**
   * Establishments
   */
  function initEstablishments(cb) {
    const data = [{
      name: 'Clinica Alicante Poeta',
      address: 'Poeta samaritano',
      location: [9.4, 140.22],
      entityId: cEntities[1].id,
    }]

    createModel(app, mongo, 'establishment', data).then(res => {
      cEstablishments = res
      cb()
    })
  }

  /**
   * ************ RELATIONS **************
   */
  // function relationSeparator(cb) {
  //   console.log('\n\n ********* RELATIONS ********* \n')
  //   cb()
  // }
  //
  // function relEntities(cb) {
  //   cUsers[0].entity(cEntities[0])
  //   cUsers[1].entity(cEntities[1])
  //
  //   cEstablishments[0].entity(cEntities[1])
  //   cEstablishments[1].entity(cEntities[1])
  //
  //   Promise.all([
  //     cUsers[0].save(),
  //     cUsers[1].save(),
  //   ]).then(() => {
  //     const entityFilter = { where: {
  //       entityId: { neq:  null },
  //     } }
  //
  //     return Promise.all([
  //       app.models.user.find(entityFilter).then(users => {
  //         console.log('------- entity-user RELATED -------')
  //         console.log(users)
  //       }),
  //
  //     ])
  //   }).then(() => {
  //     cb()
  //   })
  // }

  /**
   * Execute functions in an ordered way
   */
  async.waterfall([
    initEntities,
    initRoles,
    initUsers,
    initPatients,
    initDoctors,
    initEstablishments,
    initAppointments,
    // relationSeparator,
    // relEntities,
  ])
}
