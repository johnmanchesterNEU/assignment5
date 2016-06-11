module.exports = function(app, models) {
  /*   var users = [
        {
            _id: "123",
            username: "alice",
            password: "alice",
            firstName: "Alice",
            lastName: "Wonder",
            email: "alice@wonderland.com"
        },
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@jahman.com"},
        {
            _id: "345",
            username: "charly",
            password: "charly",
            firstName: "Charly",
            lastName: "Garcia",
            email: "charly@over.gov"
        },
        {
            _id: "456",
            username: "jannunzi",
            password: "jannunzi",
            firstName: "Jose",
            lastName: "Annunzi",
            email: "jose@neu.edu"
        }
    ];*/

   // console.log(models);
    var userModel = models.userModel;

    //
    app.get("/api/user", findUserByCredentials);
    //app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user?username=username", findUserByUsername);
    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    // sends a request to create a user at the database
    function createUser(req, res) {
        var user = req.body;
        console.log("here: " + user);
        userModel
            .createUser(user)
            .then(
                function(user) {
                    console.log("hit server");
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );


        /*
         var newUser = req.body;
         for(var i in users) {
         if(users[i].username === newUser.username) {
         res.status(400).send("Username " + newUser.username + " is already in use");
         return;
         }
         }

         newUser._id = (new Date()).getTime() + "";
         users.push(newUser);
         res.json(newUser);*/
    }

    // sends a request to delete a user in the database given an ID
    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(error.statusCode).send("Could not delete the user on the server");
                })


        /* var id = req.params.userId;
         for (var i in users) {
             if (users[i]._id === id) {
                 users.splice(i, 1);
                 res.sendStatus(200);
                 return;
             }
         }
         res.status(404).send("Unable to remove user with ID: " + id);*/
    }

    //Sends a request to update the user at the database
    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        userModel
            .updateUser(userId, user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(error.statusCode).send("Could update the user on the server.");
                })


       /* var id = req.params.userId;
        var newUser = req.body;
        for (var i in users) {
            if (users[i]._id === id) {
                users[i].password = newUser.password;
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                users[i].email = newUser.email;
                res.send(200);
                return;
            }
        }
        res.status(400).send("User with ID: " + id + " not found");*/
    }

    //Asks the database for some user given id and returns the user
    function findUserById(req, res) {
        var userId = req.params.userId;

        //console.log(newUser);
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("Could not find user on server");
                })

       /* var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    res.send(user);
                },
                function (error) {
                    res.status(404).send("User with ID: " + id + " not found");
                }
            )*/
       /* var userId = req.params.userId;
        for (var i in users) {
            if (userId === users[i]._id) {
                res.send(users[i]);
            }
        }
        res.send({});*/
    }

    //Returns all users in the database
    function getUsers(req, res) {
        res.send(models.userModel);
        /*var username = req.query["username"];
        var password = req.query["password"];
        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }*/
        //res.send({title:"Muahhhahahhaah"});
    }

    //finds a user by a username and password
    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )
        // for(var i in users) {
        //     if(users[i].username === username && users[i].password === password) {
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function findUserByUsername(username, res) {
      /*  for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send({});*/
    }
};