var mongoose = require("mongoose");
module.exports = function(){

    var PageSchema = mongoose.schema({
        _website:{type: mongoose.Schema.objectId, ref:"Website"},
        name: String,
        title: String,
        description: String,
        widgets: [Widget],
        dateCreated: {type: Date, default:Date.now()}
    },{collection: "assignment.page"});

    return PageSchema;
};
// {"_id": "321", "name": "Post 1", "websiteId": "456", "title": "hello"},