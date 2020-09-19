const router = require('express').Router();
const mongoose = require('mongoose');
const Exercise = require('../models/exercise.model');

router.get('/', (req, res, next) => {
    Exercise.find()
    .then( result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
});

router.get('/:exerciseId', (req, res, next) => {
    Exercise.findById({_id: req.params.exerciseId})
    .then( response => {
        res.status(200).json(response);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/add', (req, res, next) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({ 
        username,
        description,
        duration,
        date
    });

    newExercise.save()
    .then((result) => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/update/:exerciseId', (req, res, next) => {
    Exercise.findById(req.params.exerciseId)
    .then( response => {
       response.username = req.body.username;
       response.description = req.body.description;
       response.duration = Number(req.body.duration);
       response.date = Date.parse(req.body.date);

       response.save()
       .then(() => res.status(200).json('Exercise updated!'))
       .catch(err => res.status(500).json('Error: ' + err));
    })
    .catch(err => res.status(500).json({
        error: err
    }));
});

//edit
router.patch('/patch/:exerciseId', (req, res, next) => {
    
});

router.delete('/:exerciseId', (req, res, next) => {
    Exercise.remove({ _id: req.params.exerciseId })
    .exec()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
