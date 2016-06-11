module.exports = function () {


    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = (mongoose.models.User)? mongoose.model("User")  :mongoose.model("User", UserSchema);

    var api = {
        createUser : createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByCredentials:findUserByCredentials
    }
    return api;

    function findUserByCredentials(username, password){
        //console.log(username, password);
        return User.findOne({"username": username, "password": password});
       // return User.find();
    }

    function  createUser(user) {
       // console.log("at model " + user);
        //user.createUser
       return User.create(user);
    }
    function findUserById(userId){
        return User.findById({_id: userId});
    }

    function findUserByUsername(username){
       return User.findOne({username: username});
    }

    function updateUser(userId, user){
        return User
            .update({_id:userId},{
               // $set: user
                $set:{
                    firstName : user.firstName,
                    lastName: user.lastName
                }
            })
    }

    function deleteUser(userId){
        return User.remove({_id:userId});
    }
}