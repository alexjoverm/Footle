const Regex = require('common/footle/constants').Regex

module.exports = function doctor(Doctor) {
  Doctor.validatePresenceOf('userId')
  Doctor.validateFormatOf('contactMail', { with: Regex.email })
}
