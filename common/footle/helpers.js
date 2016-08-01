exports.createModel = function createModel(app, ds, model, data) {
  const prom = new Promise((resolve, reject) => {
    ds.automigrate(model, (err) => {
      if (err) {
        console.error(err)
        reject(err)
      }

      const Model = app.models[model]

      Promise.all(
        data.map(item => Model.create(item))
      ).then(createdModel => {
        console.log(`------- ${model} CREATED --------`)
        console.log(createdModel)
        resolve(createdModel)
      }).catch(createErr => {
        console.error(createErr)
        reject(createErr)
      })
    })
  })
  return prom
}
