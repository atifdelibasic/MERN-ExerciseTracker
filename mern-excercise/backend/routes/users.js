const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');

router.get('/', (req, res, next) => {
    User.find()
    .then( result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch(err => res.status(500).json(err));
});

router.route('/add').post((req, res, next) => {
    const newUser = new User({ 
        _id: mongoose.Types.ObjectId(),
        username: req.body.username 
    });
    newUser.save()
    .then((result) => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/update/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then(user => {
        user.username = req.body.username

        user.save()
        .then(response => {
            res.status(200).json(response);
        })
        .catch( err => {
            res.status(500).json({
                error: err
            });
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete('/:userId', (req, res, next) => {
    User.remove({_id:req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json('User deleted!');
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
