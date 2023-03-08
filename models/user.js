const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const UserScheam = new Schema({});

UserScheam.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserScheam);