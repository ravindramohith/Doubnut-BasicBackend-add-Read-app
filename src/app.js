const express = require('express');
const app = express();
const Port = process.env.Port || 5000;

require("./db/conn");
const candidate = require('./models/registration');

const path = require('path');
const hbs = require('hbs');
const time = require('moment');


const staticpath = path.join(__dirname, "../Public");
const template = path.join(__dirname, "../templates/views")
const partials = path.join(__dirname, "../templates/partials")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(staticpath));
app.set('view engine', 'hbs');
app.set('views', template);
hbs.registerPartials(partials);


app.get('/', (req, res) => {
    res.render('index');
});


app.get('/registration', (req, res) => {
    candidate.find((err, docs) => {
        res.render('reg', { data: docs });
    })
})

app.post('/registration', async (req, res) => {
    try {
        res.render('posted')
        const F = new candidate({
            firstname: req.body.firstname,
            email: req.body.email,
            subject: req.body.subject,
            doubt: req.body.doubt,
            time: time().format()
        })
        F.save();
    } catch (error) {
        res.status(400).send('error')
    }
})


app.listen(Port, () => {
    console.log(`Server started on port ${Port}`);
});