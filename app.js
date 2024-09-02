


const express = require('express')
const hbs = require('hbs');

const username = 'admin';
const password = 'admin123';

const app = express();


/// VIEW ENGINE /////////////////////
app.use(express.static('public'));
app.set('view engine','hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render('login')
})

app.post('/verify',(req,res)=>{
    console.log(req.body);
    
    res.send('success')
})



app.listen(3000,() =>console.log('Server listening on port 3000'));
