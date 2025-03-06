const express = require('express');
const app = express();
const fs = require('fs');
//middleware to parse the request data
app.use(express.json());

//middleware
app.use((req, res, next) => {
  req.user = {
    name: 'ritesh',
  };
  console.log('logger middleware running');
  next();
});

const verifytoken = (req, res, next) => {
  const token = '544523fdsfadf';
  if (!token) {
    return res.status(401).json({
      message: 'Not authorized to access the resource',
    });
  }
  next();
};

const data = 'we are learning express';

app.get('/posts', (req, res) => {
  console.log(req.user);
  const posts = fs.readFileSync('./post.json', 'utf-8');
  const parsedPost = JSON.parse(posts);
  res.status(200).json({
    message: 'Fetched Successfully',
    length: parsedPost.length,
    post: parsedPost,
  });
});

//single id get
app.get('/posts/:id', (req, res) => {
  const posts = fs.readFileSync('./post.json', 'utf-8');
  const parsedPost = JSON.parse(posts);
  const { id } = req.params;
  const singlePost = parsedPost.find((post) => post.id === parseInt(id));
  res.status(200).json({
    message: 'single post fetched successfully',
    data: singlePost,
  });
});

app.post('/posts', (req, res) => {
  const posts = fs.readFileSync('./post.json', 'utf-8');
  const parsedPost = JSON.parse(posts);
  const newpost = req.body;

  const newId = parsedPost[parsedPost.length - 1].id + 1;
  console.log(newId);
  console.log(newpost);
  newpost.id = newId;
  parsedPost.push(newpost);
  fs.writeFileSync('./post.json', JSON.stringify(parsedPost));
  res.status(201).json({
    data: parsedPost,
  });
});

app.get('/data', (req, res) => {
  console.log(req.body);
  res.status(201).send(data);
});

app.post('/login', (req, res) => {
  console.log(req.body);
});

app.get('/api/v1/movies', verifytoken, (req, res) => {
  console.log(req.user);
  const moviesData = [
    {
      name: 'Ironman',
      releaseyear: 2013,
    },
  ];

  res.status(200).json({
    data: moviesData,
  });
});

//No route found middleware
app.use((req, res) => {
  res.status(404).json({
    message: 'No route Found on ${req.url}',
  });
});
app.listen(5000, () => {
  console.log('server is running');
});

//middlewares =>


//SQL AND NOSQL 
//MYSQL and nosql mongodb

//table => 
//collections => 

//row => 
// //document =>  {
//   "name "  : "phone" ,
//   "price"  : 450000 ,
//   "specification" : {
//     "ram" : "8gb"
//   }
//   , {
//     "name" : 'shirt' , 
//     color : 'blue'
//   }
// }


//show dbs for fetching the databases available on the mongdb server
//use databasename => if database is available it will switch to that particular database if not it will create a new then switch

//db.createCollection(collectionName) 
// to create collection(table) in the database

//CRUD 

//READ =>  db.post.find() to find all the document in the current collection 

// db.collectionName.findOne({filterObject}) =>  returns a single document on the basis of a particular condition



//insert a new user
//find all users
//find a user by name
//find users older than 25
//find user in a speficic cities
//find users and only show name email ,
//update a user for a specific name and salary

