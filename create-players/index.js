// Read the generated tournment and user
// pick the first tournment and create players for all users for the tournament
// https://github.com/axios/axios
// Use Typescript next:https://www.digitalocean.com/community/tutorials/typescript-running-typescript-ts-node
const fs = require("fs");
const axios = require('axios');
const usersFile = "../create-users/users.generated.json";
let users = [];
const tournamentFile = "../create-tournaments/tournament.generated.json";
let tournaments = [];
const generated = "./player.generated.json";

try {
    const data = fs.readFileSync(usersFile, 'utf8')
    users = JSON.parse(data)
} catch (err) {
    console.error(err)
}

try {
    const data = fs.readFileSync(tournamentFile, 'utf8')
    tournaments = JSON.parse(data)
} catch (err) {
    console.error(err)
}

tournament = tournaments[0];


for (i=0; i < users.length; i++) {
    axios.post('http://localhost:3000/player', {
        user: users[i].id,
        tournament: tournament.id
    })
    .then(function (response) {
        // console.log(response);
        console.log("Created player: " + response.id);
    })
    .catch(function (error) {
        console.log(error);
    });
}
axios.get('http://localhost:3000/player')
    .then(function (response) {
        console.log(response.data);
        var jsonContent = JSON.stringify(response.data);
        fs.writeFile(generated, jsonContent, 'utf8', (err) => {
          if (err) {
            console.error(err)
            return
          }
          console.log("Created player.generated.json")
        })
    })
    .catch(function (error) {
        console.log(error);
    });
