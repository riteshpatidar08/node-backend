const express = require('express');
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const app = express();
const userRoutes = require('./routes/userRoutes')
const userController = require('./controllers/userController')
//set the data on the req.body property when you create a new entry
app.use(express.json());
console.log(userController)
dbConnect()

//create a schema how your document will look like

// const insertData = async(data) => {
// await User.deleteMany() ;
// const newData = await User.create(data)
// console.log(newData)
// }
//CRUD
app.post('/users',  userController.createUser);

//Read operation total entries , single entry
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 }).select('-password');
    //case to handle if this query donot find any user
    if (!users) {
      return res.status(400).json({
        message: 'No user found',
      });
    }

    res.status(200).json({
      message: 'success',
      length: users.length,
      data: users,
    });
  } catch (error) {}
});

//read single entry
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const singleuser = await User.findById(id);
    if (!singleuser) {
      return res.status(400).json({
        message: 'no user found with this id',
      });
    }

    res.status(200).json({
      message: 'success',
      data: singleuser,
    });
  } catch (error) {}
});
// insertData({name:'ritesh',email:"ritesh@gmail.com"})
//update
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    );

    res.status(200).json({
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      message: 'success',
      data: deletedUser,
    });
  } catch (error) {}
});

app.use('/api' , userRoutes)

app.listen(3000, () => {
  console.log('Server is running');
});
