const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
require('dotenv').config()
const username = process.env.USER
const password = process.env.PASS


router.get('/new', (req, res) => {
    res.redirect('/articles/login')
})

router.get('/login', (req, res) => {
    res.render('articles/login')
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch(e) {
        res.render('articles/new', { article: article})
    }
})


router.post('/log', (req, res) => {
    if(req.body.username === username && req.body.password === password){
        res.render('articles/new', { article: new Article()})
    }
    else {
        res.redirect('/')
    }
})


router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports = router