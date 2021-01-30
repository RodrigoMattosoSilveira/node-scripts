// Read a JSON file of users and issue HTTP calls to create users
// https://github.com/axios/axios
// Use Typescript next:https://www.digitalocean.com/community/tutorials/typescript-running-typescript-ts-node
const fs = require("fs");
const axios = require('axios');
const users = require("./users.json");

// console.log(users);
for (i=0; i < users.length; i++) {
    axios.post('http://localhost:3000/user', {
        firstName: users[i].firstName,
        lastName: users[i].lastName,
        email: users[i].email,
        password: users[i].password,
        permissionLevel: users[i].permissionLevel,
        rating: users[i].rating,
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
}
