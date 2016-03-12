var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var user = userModel.user;
// GET - show main aritcles page
router.get('/', function (req, res, next) {
    // use the user model to query the users collection
    user.find(function (error, users) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // no error, we found a list of users
            res.render('users/index', {
                title: 'users',
                users: users
            });
        }
    });
});
// GET add page - show the blank form
router.get('/add', function (req, res, next) {
    res.render('users/add', {
        title: 'Add a New user'
    });
});
// POST add page - save the new user
router.post('/add', function (req, res, next) {
    user.create({
        title: req.body.title,
        content: req.body.content
    }, function (error, user) {
        // did we get back an error or valid user object?
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/users');
        }
    });
});
// GET edit page - show the current user in the form
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    user.findById(id, function (error, user) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            //show the edit view
            res.render('users/edit', {
                title: 'user Details',
                user: user
            });
        }
    });
});
// POST edit page - update the selected user
router.post('/:id', function (req, res, next) {
    // grab the id from the url parameter
    var id = req.params.id;
    // create and populate an user object
    var user = new user({
        _id: id,
        title: req.body.title,
        content: req.body.content
    });
    // run the update using mongoose and our model
    user.update({ _id: id }, user, function (error) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/users');
        }
    });
});
// GET delete user
router.get('/delete/:id', function (req, res, next) {
    // get the id from the url
    var id = req.params.id;
    // use the model and delete this record
    user.remove({ _id: id }, function (error) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/users');
        }
    });
});
// make this public
module.exports = router;

//# sourceMappingURL=users.js.map
