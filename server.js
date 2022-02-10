const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    const articles = [
        {
            head: "Test",
            createdAt: Date.now(),
            description: "this is a test"
        }
    ]
    res.render('index', { articles : articles})
})

// start at 14:28 
app.listen(3000)