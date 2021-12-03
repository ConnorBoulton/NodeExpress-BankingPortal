const { render } = require('ejs')
const express = require('express')

const fs = require('fs')
const path = require('path')

const app = express()

const accountRoutes = require('./routes/accounts')
const servicesRoutes = require('./routes/services')
const { accounts, users, writeJSON } = require('./data.js')
 
app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('index', {title: 'Account Summary', accounts: accounts}) 
})

app.get('/profile', (req, res) => {
    res.render('profile', {user: users[0]})
})

app.use('/account', accountRoutes)
app.use('/services', servicesRoutes)

app.listen(3000, () => {
    console.log('listening on port 3000')
})