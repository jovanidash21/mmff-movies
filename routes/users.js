var express = require('express');
var router = express.Router();
var moment = require('moment');

router.get('/', function(req, res, next) {
    if(req.user){
        usersData.find()
            .then(function (usersData) {
                res.render('users', {
                    user: req.user,
                    title: 'Users | MMFF Movies',
                    navBarTitle: 'Users',
                    usersData: usersData,
                    moment: moment
                });
            });
    }
    else{
        res.redirect('/login');
    }
});

router.get('/add', function(req, res, next) {
    if(req.user){
        res.render('users-add', {
            user: req.user,
            title: 'Add New User | MMFF Movies',
            navBarTitle: 'Add New User'
        });
    }
    else{
        res.redirect('/login');
    }
});

router.post('/add', function(req, res, next) {
    var user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        website: req.body.website,
        profileImage: req.body.profileImage
    };
    usersData.register(new usersData(user), req.body.confirmPassword, function(err) {
        if(!err){
            res.redirect('/users');
        }
        else
        {
            res.render('users-add', {
                user: req.user,
                title: 'Add New User | MMFF Movies',
                navBarTitle: 'Add New User',
                alertMessage: 'Sorry! User not registered because the username already exists. Please try again',
                postError: true
            });
        }
    });
});

router.get('/:userID', function(req, res, next) {
    if(req.user){
        var userID = req.params.userID;
        usersData.findOne({_id: userID}, function (err, userData) {
            if (!err) {
                res.render('users-profile', {
                    user: req.user,
                    title: 'User Profile | MMFF Movies',
                    navBarTitle: 'User Profile',
                    userData: userData,
                    moment: moment
                });
            }
            else {
                res.end(err);
            }
        });
    }
    else{
        res.redirect('/login');
    }
});

router.get('/:userID/edit', function(req, res, next) {
    if(req.user){
        var userID = req.params.userID;
        usersData.findOne({_id: userID}, function (err, userData) {
            if (!err) {
                res.render('users-edit', {
                    user: req.user,
                    title: 'Update User | MMFF Movies',
                    navBarTitle: 'Update User',
                    userData: userData,
                    moment: moment
                });
            }
            else {
                res.end(err);
            }
        });
    }
    else{
        res.redirect('/login');
    }
});

router.post('/:userID/edit', function(req, res, next) {
    var userID = req.params.userID;
    usersData.findOne({_id: userID}, function(err, userData) {
        if(!err){
            userData.username = req.body.username;
            userData.firstName = req.body.firstName;
            userData.lastName = req.body.lastName;
            userData.email= req.body.email;
            userData.website = req.body.website;
            userData.profileImage = req.body.profileImage;
            userData.save(function(err, userData){
                if(!err){
                    res.render('users-edit', {
                        user: req.user,
                        title: 'Edit User | MMFF Movies',
                        navBarTitle: 'Update User',
                        alertMessage: 'User Updated',
                        postError: false,
                        userData: userData,
                        moment: moment
                    });
                }
                else{
                    res.render('users-edit', {
                        user: req.user,
                        title: 'Edit User | MMFF Movies',
                        navBarTitle: 'Update User',
                        alertMessage: 'User Not Updated! Please Try Again',
                        postError: true,
                        userData: userData,
                        moment: moment
                    });
                }
            });
        }
        else {
            res.end(err);
        }
    });
});

router.post('/:userID/delete', function(req, res, next) {
    var userID = req.params.userID;
    usersData.remove({_id: userID}, function(err){
        if(!err){
            res.redirect('/users');
        }
        else {
            res.end(err);
        }
    });
});

module.exports = router;