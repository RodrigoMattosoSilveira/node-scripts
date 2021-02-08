// Read a JSON file of users and issue HTTP calls to create tournaments
// https://github.com/axios/axios
// Use Typescript next:https://www.digitalocean.com/community/tutorials/typescript-running-typescript-ts-node
const fs = require("fs");
const axios = require('axios');

get_tournament_users();

async function get_tournament_users () {
    var myArgs = process.argv.slice(3);
    console.log(myArgs);

    const tournaments = Number(myArgs[0]) //1234
    const users = Number(myArgs[1]) //1234

    await getTournament(tournaments);
    await getUser(users);


}

async function getTournament(howMany) {
    const response = await axios.get('http://localhost:3000/tournament')
    .then(function (response) {
        let partial = response.data.slice(0, howMany);
        let output=[]
        for (i=0; i<partial.length; i++) {
            output.push(partial[i].id)
        }
        console.log("\nTournament: " + JSON.stringify(output));
    })
    .catch(function (error) {
        console.log(error);
    });
}

async function getUser(howMany) {
    const response = await axios.get('http://localhost:3000/user')
    .then(function (response) {
        let partial = response.data.slice(0, howMany);
        // console.log("\nUser");
        let output=[]
        for (i=0; i<partial.length; i++) {
            output.push(partial[i].id)
        }
        console.log("\nUser: " + JSON.stringify(output));
    })
    .catch(function (error) {
        console.log(error);
    });
}
