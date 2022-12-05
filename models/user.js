var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userShema = new Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User',userShema);