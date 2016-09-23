module.exports = () => {
  const data = {
    users: []
  }

  // Create 1000 users
  for (let i = 0; i < 100; i++) {
    data.users.push({
      id: i,
      name: `User${i}`
    })
  }

  return data
}
