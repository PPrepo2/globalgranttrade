const express = require('express');
const mongoose  = require('mongoose');
// const connectMongo = require('connect-mongo');
const session = require('express-session');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const { requireAuth, checkUser } = require('./server/authMiddleware/authMiddleware');
const connectDB = require('./server/config/db');

const app = express();
const PORT = 7500 || process.env.PORT;

// Connect to Database  
connectDB();

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// use file-upload // to import pictures to our website but we required it first above
app.use(fileUpload());
app.use(methodOverride('_method'));

// flash message
app.use(session({
    secret: 'CookingBlogSecretSession',
    saveUninitialized: true,
    resave: true
  }));
  app.use(flash());

// globalf3@globalflextyipests.com
// set view engine
app.set('view engine', 'ejs');


// DB config
// const db ='mongodb+srv://pius1:pius123@webdevelopment.xav1dsx.mongodb.net/globalgranttrade';
// connect to mongodb
// mongoose.connect(db)
// .then(()=>{
//     console.log('MongoDB Connected')
// })
// .catch(err =>{console.log(err)})


app.get('*', checkUser);
app.use('/', require('./server/Route/indexRoute'));
app.use('/', requireAuth, require('./server/Route/userRoute'));
app.use('/', requireAuth, require('./server/Route/adminRoute'));

app.listen(PORT, console.log(`Server running on  ${PORT}`));



