const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
require('dotenv').config()
const mongoPassword = process.env.MONGOPASSWORD

mongoose.connect(`mongodb+srv://gitleaf:${mongoPassword}@cluster0.uxjun.mongodb.net/test?retryWrites=true&w=majority`)

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles : articles})
})

// start at 27:36
app.use('/articles', articleRouter)

app.listen(3000, () => {
    console.log("Listening")
})