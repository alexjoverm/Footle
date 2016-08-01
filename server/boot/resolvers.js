/**
 * ***** RESOLVERS *****
 * They make a check for permission in order to be
 * used from the ACL
 */
const Roles = require('common/footle/constants').Roles

function reject(cb) {
  process.nextTick(() => {
    cb(null, false)
  })
}

function checkLogin(context, auth) {
  // Check if user authenticated
  if (auth && !context.accessToken.userId) {
    return false
  }

  // Check if we are in scope
  if (context.modelName !== model) {
    return false
  }

  return true
}

function checkRoleAsync(role) {
  return new Promise((resolve, reject) => {

  })
}


module.exports = function resolvers(app) {

  const User = app.models.user
  const Role = app.models.Role

  Role.registerResolver('entityMember', (role, context, cb) => {
    const model = context.model
    const userId = context.accessToken.userId

    if (!checkContext(context, 'appointment', true)) {
      return reject(cb)
    }

    // check if userId is in team table for the given project id
    model.findById({ id: context.modelId, filter: { include: 'entity' } })
    .then((appointment) => {
      // Check for patientId or DoctorId
      const User = app.models.user
      return User.findById({
        ownerId: appointment.ownerId,
        memberId: userId,
      })
    })
    .then(count => cb(null, count > 0)) // true = is a team member
    .catch(() => reject(cb))

    return null
  })
}
