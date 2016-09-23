const chai = require('chai')

// Load Chai assertions
global.expect = chai.expect

// Load Sinon
global.sinon = require('sinon')

// Initialize Chai plugins
chai.use(require('sinon-chai'))
chai.use(require('chai-as-promised'))

global.usersData = [
  { email: 'patient@patient.com', password: 'test123' },
  { email: 'doctor@doctor.com', password: 'test123' },
  { email: 'admin@admin.com', password: 'test123' },
  { email: 'superadmin@superadmin.com', password: 'test123' },
]
