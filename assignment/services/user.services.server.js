module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@jahman.com"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@over.gov"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@neu.edu" }
    ];


    //
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user?username=username", findUserByUsername);
    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;
        for(var i in users) {
            if(users[i].username === newUser.username) {
                res.status(400).send("Username " + newUser.username + " is already in use");
                return;
            }
        }

        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        for(var i in users) {
            if(users[i]._id === id) {
                users.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Unable to remove user with ID: " + id);
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        for(var i in users) {
            if(users[i]._id === id) {
                users[i].password = newUser.password;
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                users[i].email = newUser.email;
                res.send(200);
                return;
            }
        }
        res.status(400).send("User with ID: "+ id +" not found");
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        for(var i in users) {
            if(userId === users[i]._id) {
                res.send(users[i]);
            }
        }
        res.send({});
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, res) {
        for(var u in users) {
            if(users[u].username === username && users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send(200);
    }
    function findUserByUsername(username, res) {
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send({});
    }
};