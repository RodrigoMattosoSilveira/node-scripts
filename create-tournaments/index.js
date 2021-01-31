// Read a JSON file of users and issue HTTP calls to create tournaments
// https://github.com/axios/axios
// Use Typescript next:https://www.digitalocean.com/community/tutorials/typescript-running-typescript-ts-node
const fs = require("fs");
const axios = require('axios');
const entities = require("./tournaments.json");

// console.log(users);
for (i=0; i < entities.length; i++) {
    axios.post('http://localhost:3000/tournament', {
        name: entities[i].name,
        city: entities[i].city,
        year: entities[i].year,
        rounds: entities[i].rounds
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
}
