const router = require('express').Router();
const { utimesSync } = require('fs');
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    const blogData = await Blog.findAll({
      include: [
        { association: 'blog_user' }
      ]
    });

    for(var i=0; i < blogData.length; i++){
      blogData[i].dataValues.dateString = new Date(blogData[i].dataValues.createdAt).toLocaleDateString();
    }

    res.render('home', {
      logged_in: req.session.logged_in,
      blogData: blogData
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {

  const user = await User.findByPk(req.session.user_id, {
    include: [
      { association: 'blogs' }
    ]
  });

  let blogs = user.dataValues.blogs;

  for(var i=0; i<blogs.length; i++){
    blogs[i].dataValues.dateString = new Date(blogs[i].dataValues.createdAt).toLocaleDateString();

  }

  try {
    res.render('dashboard', {
      logged_in: req.session.logged_in,
      blogData: user.dataValues.blogs
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/blogs/:id', withAuth, async (req, res) => {

  const blog = await Blog.findByPk(req.params.id, {
    include: [
      { association: 'comments' },
      { association: 'blog_user' }
    ]
  });

  blog.dataValues.dateString = new Date(blog.dataValues.createdAt).toLocaleDateString();


  let comments = blog.dataValues.comments;

  for(var i=0; i< comments.length; i++){
    comments[i].dataValues.dateString = new Date(comments[i].dataValues.createdAt).toLocaleDateString();
    let user = await User.findOne({
      where: {
        id: comments[i].dataValues.user_id
      }
    });
    comments[i].dataValues.username = user.username;
  }

  try {
    res.render('blog', {
      logged_in: req.session.logged_in,
      blogData: blog,
      commentData: comments
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('new', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/edit/:id', withAuth, async (req, res) => {

  const blog = await Blog.findByPk(req.params.id, {
    include: [
      { association: 'blog_user' }
    ]
  });

  blog.dataValues.dateString = new Date(blog.dataValues.createdAt).toLocaleDateString();

  try {
    res.render('edit', {
      logged_in: req.session.logged_in,
      blogData: blog
    });
  } catch (err) {
    res.status(500).json(err);
  }

});


module.exports = router;
