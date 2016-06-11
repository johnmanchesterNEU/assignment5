model.exports = function(){
    var mongoose = require("mongoose");

    var UserSchema = mongoose.schema({
        username: {type:String, required: true, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        gender: String,
        dob: Date,
        dateCreated: {type: Date, default:Date.now()}
    }, {collection: "assignment.user"});

    return UserSchema;
};