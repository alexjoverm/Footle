const sources = ['common', 'server', 'test']
const fs = require('fs')
const path = require('path')

for (const source of sources) {
  const destPath = path.join('node_modules', source)

  fs.access(destPath, fs.F_OK, err => {
    if (!err) { // If exists, remove it
      fs.unlinkSync(destPath)
    }
    fs.symlinkSync(
      path.join('..', source),
      destPath,
      'dir'
    )
  })
}
