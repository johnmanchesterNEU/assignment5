module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    // app.get("/api/user?username=username&password=password", findUserByCredentials);

    function findUserById(req, res) {
        var userId = req.params.userId;
        for(var i in users) {
            if(userId === users[i]._id) {
                res.send(users[i]);
                return true;
            }
        }
        res.send({});
        return false;
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }
    function findUserByCredentials(username, password, res) {

        for(var u in users) {
            if(users[u].username === username && users[u].password === password) {
                res.send(users[u]);


            }
        }
        res.send({});
    }

    function findUserByUsername(username, res) {
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return true;
            }
        }
        res.send({});
        return false;
    }

    function updateUser(req){
        var id = reg.param.userId;
        var newUser = req.body;
        for(var i in users) {
            if(users[i]._id === id) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                users[i].password = newUser.password;
                users[i].email = newUser.email;
                res.send(200);
                return true;
            }
        }
        res.send(400);

        return false;
    }
};