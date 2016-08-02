/**
 * ***** RESOLVERS *****
 * They make a check for permission in order to be
 * used from the ACL
 */

module.exports = function resolvers(app) {

  // Roles constans
  const Roles = require('common/footle/constants').Roles

  // Models
  const User = app.models.user
  const Role = app.models.Role



  /** ************
   *    HELPERS
   ** ************/

  /**
   * Deny access to the role resolver
   *
   * @param {any} cb - Node callback (err, res)
   */
  function deny(cb) {
    process.nextTick(() => {
      cb(null, false)
    })
  }

  /**
   * Basic checks to the context: auth, modelName
   *
   * @param {object} context
   * @param {boolean} auth      If you wanna check if it is authenticated
   * @param {any} [model=null]  Model name to check
   * @returns {boolean} true    if passes conditions, false otherwise
   */
  function checkContext(context, auth, model = null) {
    // Check if user authenticated
    if (auth && !context.isAuthenticated()) {
      return false
    }

    // Check if we are in scope
    if (model && context.modelName !== model) {
      return false
    }

    return true
  }

  /**
   * Check if the user has any of the roles mentioned
   *
   * @param {array} roles
   * @returns {User | Error}
   */
  function checkRoleAsync(userId, roles) {
    return new Promise((resolve, reject) => {
      // Fetch user and get its role
      User.findById(userId).then(user => {
        user.role((err, resRole) => {
          if (err) reject(err)

          // Look for the matching role
          for (const role of roles) {
            if (role === resRole.name) {
              return resolve(resRole.name)
            }
          }
          return reject('No roles matching')
        })
      }).catch(err => reject(err))
    })
  }


  /** ******************
   *  RESOLVERS HANDLERS
   ** *****************/

  /**
   * entityMember resolver handler
   */
  function entityMember(role, context, cb) {
    const modelId = context.modelId
    const userId = context.accessToken.userId

    if (!checkContext(context, true)) {
      return deny(cb)
    }

    User.findById(userId).then(user => {
      // Check entities. NOTE: user.entityId and modelId are bson, but to compare is ok
      //  - If the raw json value is needed, do it like modelId.toString()
      if (context.modelName === 'entity') {
        cb(null, user.entityId.id === modelId.id)
      } else {
        // Check the entity on the parent model (valid for user and establishment)
        context.model.findById(modelId.toString()).then(res => {
          cb(null, user.entityId.id === res.entityId.id)
        }).catch(() => deny(cb))
      }
    }).catch(() => deny(cb))

    return null
  }

  /**
   * Resolver: entityMember
   *
   * Checks if the user's entity is the same than the model's entity
   */
  Role.registerResolver('entityMember', entityMember)

  Role.registerResolver('entityAdmin', (role, context, cb) => {
    entityMember(role, context, (err, allowed) => {
      if (allowed) {
        checkRoleAsync(context.accessToken.userId, ['admin'])
          .then(() => cb(null, true))
          .catch(() => deny(cb))
      } else {
        deny(cb)
      }
    })
  })
}
