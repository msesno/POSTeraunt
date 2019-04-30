// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // constructor function for creating player objects
// function Person(name, phone, email, tableid) {
//   this.name = name;
//   this.phone = phone;
//   this.email = email;
//   this.tableid = tableid;
  
//   this.printStats = function() {
//     console.log("Name: " + this.name + "\nPhone: " + this.phone +
//     "\nEmail: " + this.email + "\nTableid: " + this.tableid + "\n----------");
//   };
// }


// Tables tables (DATA)
// =============================================================
var tables = [
  {
    tableid: "1",
    name: "Steve",
    phone: "555-555-5555",
    email: "steve@steve.com"
  },
  {
    tableid: "2",
    name: "Helen",
    phone: "666-666-6666",
    email: "helen@helen.com"
  },
  {
    tableid: "3",
    name: "Kobayashi",
    phone: "777-777-7777",
    email: "kobayashi@hotdogs.com"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays a single table, or returns false
app.get("/api/tables/:table", function(req, res) {
  var chosen = req.params.table;

  console.log(chosen);

  for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].tableid) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

// Create New tables - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newtable = req.body;

  // Using a RegEx Pattern to remove spaces from newtable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newtable.tableid = newtable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

  tables.push(newtable);

  res.json(newtable);
});

// // arrays used to contain all of our player objects
// var tables = [];
// var waitlist = [];
// var alltables = [];

// // recursive function which will allow the user to create 5 players and then will print each player's stats afterwards
// var createTable = function() {
//   // if the length of the team array is 5 or higher, no more questions will be asked
//   if (tables.length + waitlist.length < 5) {
//     console.log("\nNEW TABLE!\n");
//     app.get([
//       {
//         name: "name",
//         message: "Name: "
//       }, {
//         name: "phone",
//         message: "Phone: "
//       },{
//         name: "email",
//         message: "Email: "
//       }, {
//         name: "tableid",
//         message: "Table Id: ",
//         validate: function(value) {
//           if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ]).then(function(res) {
//       // runs the constructor and places the new player object into the variable player.
//       // turns the offense and defense variables into integers as well with parseInt
//       var person = new Person(res.name, res.phone, res.email, res.tableid);
//       // adds a player to the starters array if there are less than five player objects in it.
//       // otherwise adds the newest player object to the subs array
//       if (tables.length < 3) {
//         tables.push(person);
//         alltables.push(person);
//         console.log(person.name + " added to tables");
//       }
//       else {
//         waitlist.push(person);
//         alltables.push(person);
//         console.log(person.name + " added to the reservations");
//       }
//       // runs the createPlayer function once more
//       createTable();
//     });
//   }
//   else {
//     // loops through the team array and calls printStats() for each object it contains
//     for (var i = 0; i < alltables.length; i++) {
//       alltables[i].printStats();
//     }
//   }
// };

// // calls the function createPlayer() to start the code
// createTable();



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
