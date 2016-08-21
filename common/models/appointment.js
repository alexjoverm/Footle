module.exports = function appointment(Appointment) {
  Appointment.validatesPresenceOf('establishmentId')
  Appointment.validatesPresenceOf('doctorId')
  Appointment.validatesPresenceOf('patientId')
}
