const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const users = require('./routes/api/users')
const content = require('./routes/api/content')

const app = express()

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cross origin resource sharing
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// DB Config
const db = require('./config/keys').mongoURI
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb Conencted'))
  .catch(err => console.log(err))

// routes
app.use('/api/users', users)
app.use('/api/content', content)

const port = process.env.PORT || 4001
app.listen(port, () => console.log(`Server running on port ${port}`))
