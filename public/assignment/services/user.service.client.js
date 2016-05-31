(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley" , email: "marley@wailers.com" },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "garcia@cool.com"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "professor@neu.edu" }
    ];

    function UserService() {
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername:findUserByUsername
        };
        return api;

        function findUserByUsername(username){
            for(var i in users) {
                if(users[i].username === username) {
                    return true;
                }
            }
            return false;
        }

        function createUser(newUser){
            var newPerson = {
                _id: (new Date()).getTime() + "",
                username: newUser.username,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            };
            users.push(newPerson);
            return newPerson;
        }

        function deleteUser(userId) {
            var index = users.findIndexBy(userId)
            users.splice(index);
        }

        function updateUser(id, newUser) {
            for(var i in users) {
                if(users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    users[i].password = newUser.password;
                    users[i].email = newUser.email;
                    return true;
                }
            }
            return false;
        }


        function findIndexBy(id){
            for(var i in users) {
                if(users[i]._id === id) {
                    return i;
                }
            }
            return -1;
        }

        function findUserById(id) {
            for(var i in users) {
                if(users[i]._id === id) {
                    return users[i];
                }
            }
            return null;
        }


        function findUserByCredentials(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }
    }
})();