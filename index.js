const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash')
const mongoSanitize = require('express-mongo-sanitize');
const basejoi = require('joi');
const sanitizeHtml = require('sanitize-html');
const passport = require('passport');
const localStrategy = require('passport-local');
const Swal = require('sweetalert2');
const MongoStore = require('connect-mongo');
require('dotenv').config()


const User = require('./models/user');
const Student = require('./models/student');
const Teacher = require('./models/teacher');
const Gradetest = require('./models/gradetest');
const { studentSchema } = require('./schemas');
const { isLoggedin } = require('./middleware');
const catchAsync = require('./errorHandelers/catchAsync');
const expressError = require('./errorHandelers/expressError');
const adminRouter = require('./adminRouter');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.dburl)
    .then(() => {
        console.log('mongo connection open');
    })
    .catch(err => {
        console.log('error');
        console.log(err);
    })

const sessionConfig = {
    name: 'session',
    secret: process.env.sessionSecret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    store: MongoStore.create({ mongoUrl: process.env.dburl })
}

app.use(session(sessionConfig));

app.use('/admin', adminRouter);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const validateStudent = (req, res, next) => {
    const { error } = studentSchema.validate(req.body);
    if (error) {
        throw new expressError(error, 400);
    } else {
        next();
    }
};

var icon;
var title;
var text;

app.use(async (req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.teacherAll = await Teacher.find({});
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.Icon = icon;
    res.locals.Title = title;
    res.locals.Text = text;
    next();
});

app.get('/', async (req, res) => {
    const student = await Student.findById(req.session.studentId);
    res.render('home', { student, teacher: null });
}); 

app.get('/signin', (req, res) => {
    res.render('authentication');
})

app.post('/signin', catchAsync(async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username });
        const signedinUser = await User.register(user, password);
        req.login(signedinUser, err => {
            if (err) {
                return next(err);
            } else {
                title = 'با موفقیت ثبت نام کردی';
                req.flash('success', title);
                res.redirect('/');
            }
        })
    } catch (e) {
        icon = 'error';
        title = 'خطا';
        text = 'نام کاربری شما قبلا ثبت شده است';
        req.flash('error', icon);
        res.redirect('/signin');
    }
}));

app.get('/login', (req, res) => {
    res.render('authentication');
})


icon = 'error';
title = 'هشدار';
text = 'نام کاربری یا رمز عبور اشتباه است';
const loginUser = passport.authenticate('local', { failureFlash: { type: 'error', message: text }, failureRedirect: '/login' });


app.post('/login', loginUser, catchAsync(async (req, res) => {
    const { username } = req.body;
    const student = await Student.findOne({ username });
    if (student) {
        req.session.studentId = student._id;
        title = 'با موفقیت به اکانتت وارد شدی';
        req.flash('success', 'با موفقیت به اکانتت وارد شدی');
        res.redirect('/');
    } else {
        title = 'با موفقیت به اکانتت وارد شدی';
        req.flash('success', 'با موفقیت به اکانتت وارد شدی');
        res.redirect('/')
    }
}));

app.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        title = 'با موفقیت خارج شدی'
        req.flash('success', 'با موفقیت خارج شدی');
        res.redirect('/');
    });
});


app.get('/isStudiedInInstitute', (req, res) => {
    res.render('isStudiedInInstitute');
})

app.get('/personalinfo', isLoggedin, async (req, res) => {
    res.render('personalinfo');
});

app.post('/personalinfo', isLoggedin, async (req, res, next) => {
    try {
        const student = new Student(req.body);
        await student.save();
        title = 'با موفقیت اطلاعات شما ذخیره شد';
        req.flash('success', title);
        req.session.studentId = student._id;
        res.redirect(`/exprofile`);
    } catch (e) {
        req.flash('error', data);
        res.redirect('/personalinfo');
    };
});

app.get('/exstudentinfo', async (req, res) => {
    res.render('exstudentinfo');
})

app.post('/exstudentinfo', async (req, res) => {
    try {
        const student = new Student(req.body);
        const teacher = await Teacher.findById(student.teacher._id);
        teacher.students.push(student);
        student.teacher = teacher;
        await teacher.save();
        await student.save();
        req.session.studentId = student._id;
        title = 'با موفقیت اطلاعات شما ذخیره شد';
        req.flash('success', title);
        res.redirect(`/exprofile`);
    } catch (e) {
        res.send(e);
    }
})

app.get('/exprofile', async (req, res) => {
    const student = await Student.findById(req.session.studentId).populate('teacher');
    res.render('exprofile', { student });
});

app.get('/falshcard', async (req, res) => {
    const student = await Student.findById(req.session.studentId);
    res.render('flashcard', { student });
})

app.get('/gradetest', async (req, res) => {
    const student = await Student.findById(req.session.studentId);
    let Studentcode = Math.floor(Math.random() * (10000 - 999 + 1)) + 999;
    let days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه']
    var Day = days[Math.floor(Math.random() * days.length)];
    const times = ['13', '14', '15', '16', '17', '18', '19', '20'];
    var Time = times[Math.floor(Math.random() * times.length)];
    const gradetest = new Gradetest({ studentcode: Studentcode, day: Day, time: Time, student })
    await gradetest.save();
    res.render('gradetest', { student, Studentcode, Day, Time });
})

app.all('*', (req, res, next) => {
    next(new expressError('صفحه مورد نظرت پیدا نشد', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = '!مشکلی پیش اومده.'
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log(`Listening to port ${port}`);
});