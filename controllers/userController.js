const User = require('../models/user')

exports.createUser = async (req, res) => {
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
}