// Read a JSON file of users and issue HTTP calls to create tournaments
// https://github.com/axios/axios
// Use Typescript next:https://www.digitalocean.com/community/tutorials/typescript-running-typescript-ts-node
const fs = require("fs");
const axios = require('axios');
const entities = require("./tournaments.json");
const generated = "./tournament.generated.json";

for (i=0; i < entities.length; i++) {
    axios.post('http://localhost:3000/tournament', {
        name: entities[i].name,
        city: entities[i].city,
        year: entities[i].year,
        rounds: entities[i].rounds,
        maxPlayers: entities[i].maxPlayers,
        type: entities[i].type
    })
    .then(function (response) {
        // console.log(response);
        console.log("Created tournament: " + response.id);
    })
    .catch(function (error) {
        console.log(error);
    });
}
axios.get('http://localhost:3000/tournament')
    .then(function (response) {
        console.log(response.data);
        var jsonContent = JSON.stringify(response.data);
        fs.writeFile(generated, jsonContent, 'utf8', (err) => {
          if (err) {
            console.error(err)
            return
          }
          console.log("Created tournament_generated")
        })
    })
    .catch(function (error) {
        console.log(error);
    });
