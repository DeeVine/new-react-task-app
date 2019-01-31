const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3001
const fs = require('fs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.post('/updatefile', (req, res, next) => {
  fs.writeFile('myjsonfile.json', JSON.stringify(req.body), 'utf8', function (err) {
    if (err)
    console.log('Saved!');
  })
  res.end()
  next()
})

app.get('/getfile', (req, res, next) => {
  fs.readFile('myjsonfile.json', 'utf8', function read(err, data) {
      if (err) {
          throw err;
      }
      // Invoke the next step here however you like
      // console.log('data', data)
      const jsonData = JSON.parse(data)
      console.log('jsonData', jsonData)
      res.send(jsonData)
      next()
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
