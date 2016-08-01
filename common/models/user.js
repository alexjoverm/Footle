const app = require('server/server')
const Roles = require('common/footle/constants').Roles


module.exports = function UserModel(User) {
  User.prototype.role = function role(cb) {
    // Roles models
    const RoleMapping = app.models.RoleMapping
    const userId = this.id
    console.log(this)

    RoleMapping.findOne({ where: { principalId: userId } })
    .then(roleMapping => {
      roleMapping.role((err, res) => {
        if (err) cb(err)
        cb(null, res)
      })
    })
  }

  User.prototype.profile = function profile(cb) {
    this.role((err, role) => {
      if (err) return cb(err)

      if (!role.name || role.name !== Roles.patient && role.name !== Roles.doctor) {
        const error = new Error(`The user with the role ${role.name} doesn't have any profile`)
        error.statusCode = 400
        return cb(error)
      }

      // Call dynamically the model patient or doctor
      this[role.name]((profileErr, profile) => {
        if (profileErr) return cb(profileErr)
        return cb(null, profile)
      })
      return null
    })
  }

  User.remoteMethod(
    'role',
    {
      http: { path: '/role', verb: 'get' },
      description: 'Returns the role of the user',
      isStatic: false,
      returns: { type: 'array', root: true }
    }
  )
  User.remoteMethod(
    'profile',
    {
      http: { path: '/profile', verb: 'get' },
      description: 'Returns the profile of a doctor or a patient',
      isStatic: false,
      returns: { type: 'array', root: true }
    }
  )
}
