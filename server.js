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

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

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
  res.redirect('/home');
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