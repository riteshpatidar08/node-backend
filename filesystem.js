// //fs module
const fs = require('fs');
// const fsPromise = require('fs').promises;
// // console.log(fs)

// //NOTE the fs module contains both type of the function
// //NOTE synchronous function
// //NOTE asynchronous function

// //TODO to read the data of a particular file using both sync fn and async fn

// //NOTE SYNCHRONOUS VERSION
// console.log('....started');
// const data = fs.readFileSync('./notes.txt', 'utf-8');

// console.log(data);

// console.log('....ended');

// //ASYNCHRONOUS FN
// console.log('....async fn started');
// fs.readFile('./notes.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });
// console.log('...async fn ended');

// //promise version for reading file
// fsPromise.readFile('./notes.txt', 'utf-8').then((dta) => console.log(dta));

// //TODO WRITE FILE

// const writeFileData = fs.writeFileSync('example.txt', data);

// fs.writeFile('async.txt', data, () => {
//   console.log('file written successfully');
// });

// fetch('https://fakestoreapi.com/products/')
//   .then((res) => res.json())
//   .then((json) =>
//     fs.writeFile('products.json', JSON.stringify(json), () => {
//       console.log('file created');
//     })
//   );

//MANAULLY CREATING A PACKAGE.JSON FILE

// console.log('hello');

//globally -g

//append
// fs.appendFileSync('./notes.txt' , 'this is using append method.\n')
//unlink
fs.unlinkSync('./example.txt');
//mkdir
//rename
