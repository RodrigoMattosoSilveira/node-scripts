// Read a JSON file of users and issue HTTP calls to create users
// https://github.com/axios/axios
// Use Typescript next:https://www.digitalocean.com/community/tutorials/typescript-running-typescript-ts-node
const fs = require("fs");
const axios = require('axios');
const users = require("./users.json");
const users_generated = "./users.generated.json";

// console.log(users);
for (i=0; i < users.length; i++) {
    axios.post('http://localhost:3000/user', {
        email: users[i].email,
        firstName: users[i].firstName,
        lastName: users[i].lastName,
        password: users[i].password
    })
    .then(function (response) {
        // console.log(response);
        console.log("Created user: " + JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}
axios.get('http://localhost:3000/user')
    .then(function (response) {
        console.log(response.data);
        var jsonContent = JSON.stringify(response.data);
        fs.writeFile(users_generated, jsonContent, 'utf8', (err) => {
          if (err) {
            console.error(err)
            return
          }
          console.log("Created users_generated")
        })
    })
    .catch(function (error) {
        console.log(error);
    });
