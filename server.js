const http = require('http');
const express = require("express"); 
const path = require("path");
const ejs = require('ejs');
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') })  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/assets'));

app.set("views", path.resolve(__dirname, "HTML"));
app.set("view engine", "ejs");

app.use(bodyParser.json());

// dotenv.config();
const port = 3001;

app.get('/', (req, res) => {
    res.redirect('/login');
  });

  // This route would render the login page
  app.get('/login', (req, res) => {
    // Render the login HTML page
    res.sendFile(__dirname + '/HTML/login.html');
  });
  
  // This route would handle the login form submission
app.post('/auth', (req, res) => {
  // Too complicated to try and implement and may take a while but the thought process is to..
  // Handle the authentication logic with UMD SSO
  // Making API requests to the UMD SSO service then redirect the user to the home page or set up a session.
  let user = {
    username: req.body.username
  };
  let data = JSON.stringify(user, null, 2);
  fs.writeFile('userProfile.json', data, (err) => {
    if (err) throw err;
  });
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/HTML/home.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/HTML/about.html');
});

app.get('/alumni', (req, res) => {
  // res.sendFile(__dirname + '/HTML/alumni.html');
  res.render('alumni',  { alumni: [] }); 
});

app.get('/alumni/search', (req, res) => {
  const query = req.query.query;
  let filteredAlumni = Users;

  if (query) {
    filteredAlumni = Users.filter(alum =>
      alum.company && alum.company.toLowerCase().includes(query.toLowerCase()) ||
      alum.Industry && alum.Industry.toLowerCase().includes(query.toLowerCase())
    );
  }
  res.json(filteredAlumni);
});

const StreamChat = require('stream-chat').StreamChat;
const Users = require("./HTML/alum.js");

const serverClient = StreamChat.getInstance('3dmdbk8f24eu', 'wnmnkkqarrpua7qvr5z5b9kkcfyfwtjcywe3j42jtcmgmp79tuhfpw8btebw5mbh');
const client = StreamChat.getInstance('3dmdbk8f24eu');

app.get('/token', (req, res) => {
  const userId = req.query.userId;
  const user = Users.find(user => user.id === parseInt(userId));
  if (user) {
      const token = serverClient.createToken(userId);
      res.json({ token });
  } else {
      res.status(404).json({ error: 'User not found' });
  }
});


/** This is where the streaming API is located */
app.get('/inbox', (req, res) => {
  res.sendFile(__dirname + '/HTML/inbox.html');
});

app.get('/profile', (req, res) => {
  res.sendFile(__dirname + '/HTML/profile.html');
});

//this makes my image visible, and seems to address the problem of the
//file not being visible, del when we find better solution
app.get('/images/photo_red.png', (req, res) => {
  res.sendFile(__dirname + '/HTML/images/photo_red.png');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Stop to shutdown the server:`);
});

process.stdin.on(`readable`, () => {
    let dataInput = process.stdin.read();
    if (dataInput !== null) {
        let command = dataInput.toString().trim();
        if (command === "stop") {
            console.log("Shutting down the server");
            process.exit(0);
        } else {
            console.log(`Invalid command: ${command}`);
        } 
        process.stdout.write(`Stop to shutdown the server:`);
        process.stdin.resume();
    }  
});