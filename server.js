const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb+srv://gitleaf:gitleaf112@cluster0.uxjun.mongodb.net/test?retryWrites=true&w=majority')

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    const articles = [
        {
            head: "Test",
            createdAt: new Date(),
            description: "this is a test"
        }
    ]
    res.render('articles/index', { articles : articles})
})

// start at 27:36
app.listen(3000)