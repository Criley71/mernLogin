const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const EmployeeModel = require('./models/Employee')


const app = express()
app.use(cors(
    {
        origin: ["https://mern-login-front-7vp1d09xy-criley71.vercel.app/"],
        methods: ["POST", "GET"],
        credentials: true
    }

))
app.use(express.json())

mongoose.connect("mongodb+srv://criley16:141028Cr@merntodo.cpttvig.mongodb.net/employee")
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("The password is incorrect")
                }
            } else {
                res.json("no record exists")
            }
        })
})
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already have an account")
            } else {
                EmployeeModel.create(req.body)
                    //data coming from frontend is posted
                    .then(employees => res.json(employees))
                    .catch(err => res.json(err))
            }
        }).catch(err => res.json(err))

})

app.listen(3001, () => {
    console.log("server is running")
})
