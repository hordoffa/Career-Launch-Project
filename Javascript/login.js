const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const {IPinfoWrapper} = require('node-ipinfo');
const ipinfo = new IPinfoWrapper("afc4e1f5388fdb")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname +  + '/views'));
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/assets'));

app.set('view engine', 'ejs');

dotenv.config();


const axios = require('axios');

// This route would handle the login form submission
app.post('/auth', (req, res) => {
    // Handle the authentication logic with UMD SSO
    // This might involve making API requests to the UMD SSO service, validating credentials, etc.
    // Once authenticated, rredirect the user to the home page or set up a session.
  
    // Example: Redirecting to a home page after successful authentication
    res.redirect('/home');
  });
  
  // This route would render the login page
  app.get('/login', (req, res) => {
    // Render the login HTML page
    res.sendFile(__dirname + '/login.html');
  });
  
  // Set up other routes and server configurations as needed
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
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