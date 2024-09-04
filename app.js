


const express = require('express')
const hbs = require('hbs');
const session = require('express-session');
const cache = require('nocache');
const nocache = require('nocache');

const username = 'admin';
const password = 'admin123';

const app = express();


/// VIEW ENGINE /////////////////////
app.use(express.static('public'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session({secret:'key',cookie:{maxAge:600000}}));
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true
}));
app.use(nocache());


app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('home')
    } else {
        if (req.session.err) {
            res.render('login', { msg: 'Invalid Username or Password' });
            req.session.err = false;
        }
        res.render('login')
    }
})

app.post('/verify', (req, res) => {
    if (req.body.username == username && req.body.password == password) {
        req.session.user = req.body.username;
        res.redirect('/home');
    } else {
        req.session.err = true;
        res.redirect('/');
    }
})

app.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home');
    } else {
        res.render('login', { msg: 'Invalid Username or Password' });
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
    
})

 

app.listen(3000, () => console.log('Server listening on port 3000'));
