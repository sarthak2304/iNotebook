const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000
// var app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Sarthak!')
})

//Available Routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))


app.listen(port, () => {
  console.log(`iNotebook Backend listening at http://localhost:${port}`)
})
