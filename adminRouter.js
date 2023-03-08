const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require("@adminjs/mongoose");
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
require('dotenv').config()

const User = require('./models/user');
const Student = require('./models/student');
const Teacher = require('./models/teacher');
const Gradetest = require('./models/gradetest');
const Mrshafiee = require('./models/mrshafiee');
const danialTajik = require('./models/danialTajik');
const yeganeAlz = require('./models/yeganeAlz')
const alireza = require('./models/alireza')
const AidaKholosi = require('./models/AidaKholosi')
const AidaShams = require('./models/AidaShams');
const FatemeAzadbakhsh = require('./models/FatemeAzadbakhsh');
const MarzieShojaei = require('./models/Marzieshojaei');
const Misaghmadani = require('./models/Misaghmadani');
const Mobinazolghadri = require('./models/Mobinazolghadri');
const MrsGhorbanzade = require('./models/MrsGhorbanzade');
const MrsShafiee = require('./models/MrsShafiee');
const RezaShafiee = require('./models/RezaShafiee');
const YeganeKhodakhah = require('./models/YeganeKhodakhah');

mongoose.set('strictQuery', true);
const mongooseDB = mongoose.connect(process.env.dburl)
    .then(() => {
        console.log('mongo connection open');
    })
    .catch(err => {
        console.log('error');
        console.log(err);
    })

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
});

const UserResourceOptions = {
    databases: [mongooseDB],
};

const adminOptions = {
    rootPath: "/admin",
    resources: [User, Student, Teacher, Gradetest, Mrshafiee, danialTajik, yeganeAlz, alireza,
        AidaKholosi, AidaShams, FatemeAzadbakhsh, MarzieShojaei, Misaghmadani, Mobinazolghadri, MrsGhorbanzade, MrsShafiee, RezaShafiee, YeganeKhodakhah]
};

const admin = new AdminJS(adminOptions);
const authenticate = async (email, password) => {
    if (email === process.env.admin1E && password === process.env.admin1P) {
        return Promise.resolve(process.env.admin1E);
    } else if (email === process.env.admin2E && password === process.env.admin2P) {
        return Promise.resolve(process.env.admin2E);
    } else if (email === process.env.admin3E && password === process.env.admin3P) {
        return Promise.resolve(process.env.admin3E);
    } else if (email === process.env.admin4E && password === process.env.admin4P) {
        return Promise.resolve(process.env.admin4E);
    } else if (email === process.env.admin5E && password === process.env.admin5P) {
        return Promise.resolve(process.env.admin5E);
    } else if (email === process.env.admin6E && password === process.env.admin6P) {
        return Promise.resolve(process.env.admin6E);
    } else if (email === process.env.admin7E && password === process.env.admin7P) {
        return Promise.resolve(process.env.admin7E);
    } else if (email === process.env.admin8E && password === process.env.admin8P) {
        return Promise.resolve(process.env.admin8E);
    } else if (email === process.env.admin9E && password === process.env.admin9P) {
        return Promise.resolve(process.env.admin9E);
    } else if (email === process.env.admin10E && password === process.env.admin10P) {
        return Promise.resolve(process.env.admin10E);
    } else if (email === process.env.admin11E && password === process.env.admin11P) {
        return Promise.resolve(process.env.admin11E);
    } else if (email === process.env.admin12E && password === process.env.admin12P) {
        return Promise.resolve(process.env.admin12E);
    } else if (email === process.env.admin13E && password === process.env.admin13P) {
        return Promise.resolve(process.env.admin13E);
    } else if (email === process.env.admin14E && password === process.env.admin14P) {
        return Promise.resolve(process.env.admin14E);
    } else if (email === process.env.admin15E && password === process.env.admin15P) {
        return Promise.resolve(process.env.admin15E);
    } else if (email === process.env.admin16E && password === process.env.admin16P) {
        return Promise.resolve(process.env.admin16E);
    } else {
        return null;
    }
}

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: process.env.sessionSecret,
    },
    null,
    {
        name: 'adminjs',
        secret: process.env.sessionSecret,
        resave: true,
        saveUninitialized: false,
    }
);

module.exports = adminRouter;