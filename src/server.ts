import db from './config/mongo'
import app from './app'

// change this to the port you want to use
const PORT = process.env.PORT || 3000

// run the server
db().then(() => {
  console.log('>>> Connected to MongoDB database')
  app.listen(PORT, () => console.log(`>>> Running on port ${PORT}`))
})
