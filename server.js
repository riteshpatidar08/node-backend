//

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/home') {
    const homepage = fs.readFileSync('./index.html', 'utf-8');
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(homepage);
  } else if (req.url === '/login' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log(body);
    });
  }
  // res.writeHead(201);
  // res.end('request is made on the server');
});

// /home => home render

server.listen(3000, () => {
  console.log('server is running ');
});

server.on('request', (req) => {
  fs.appendFile(
    './log.txt',
    `NEW REQUEST IS MADE✅✅ ON ${req.url} , ${req.method} at ${Date.now()}\n`,
    () => {
      console.log('success');
    }
  );
});

//create file using write file and read the file in the createServer function using path module and send the data in the response of the request made on the localhost:3000

// (the file should contains the count from 1 to 1000000)
