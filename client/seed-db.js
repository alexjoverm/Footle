const jsf = require('json-schema-faker')

const users = require('./faker/user.json')
const appointments = require('./faker/appointment.json')

module.exports = () => {
  const data = {
    admins: [],
    employees: [],
    customers: [],
    appointments: []
  }

  // Create 20 users
  for (let i = 0; i < 10; i++) {
    data.admins.push(Object.assign(jsf(users), { id: i, role: 'admin' }))
    data.employees.push(Object.assign(jsf(users), { id: i, role: 'employee' }))
    data.customers.push(Object.assign(jsf(users), { id: i, role: 'customer' }))
  }

  for (let i = 0; i < 30; i++) {
    data.appointments.push(Object.assign(jsf(appointments), { id: i }))
  }

  return data
}
