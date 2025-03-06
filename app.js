const express = require('express');
const mongoose = require('mongoose');
const app = express();

//set the data on the req.body property when you create a new entry
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/mongoosedb')
  .then(() => {
    console.log('database connected');
  })
  .catch((err) => conosle.log(err));

//create a schema how your document will look like
const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
const User = mongoose.model('user', UsersSchema);

// const insertData = async(data) => {
// await User.deleteMany() ;
// const newData = await User.create(data)
// console.log(newData)
// }
//CRUD
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    //NOTE create method create a new user and save it in the database automatically
    // const newUser = await User.create({
    //   name,
    //   email,
    //   password,
    // });

    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();

    res.status(201).json({
      message: 'User created',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

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

app.listen(3000, () => {
  console.log('Server is running');
});
