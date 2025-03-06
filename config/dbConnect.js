const mongoose = require('mongoose')


const dbConnect = async() => {
const connection = await mongoose
  .connect('mongodb://localhost:27017/mongoosedb')
  console.log('database is connected')
}

module.exports = dbConnect

 