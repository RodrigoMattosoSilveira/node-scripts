// Read, Modify, and Write a file
// https://www.geeksforgeeks.org/how-to-read-and-write-json-file-using-node-js/
const fs = require("fs");
const users = require("./players-seed.json");
const newUsers = [];

// console.log(users);
for (i=0; i < users.length; i++) {
    newUser = {};
    newUser['firstName'] = users[i].first;
    newUser['lastName'] = users[i].last;
    newUser['email'] = users[i].first+"."+users[i].last+"@yahoo.com";
    newUser['password'] = "oPT14J30I#y4";
    newUser['permissionLevel'] = 0;
    newUser['rating'] = users[i].rating;
    newUsers.push(newUser);
}

fs.writeFile("./new-players-seed.json", JSON.stringify(newUsers), err => {

    // Checking for errors
    if (err) throw err;

    console.log("Done writing"); // Success
});
