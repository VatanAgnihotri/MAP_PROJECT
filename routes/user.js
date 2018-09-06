// Include the required modules
const { createPoint, getAllPoints, getPointsById, updatePoint } = require('../models/user');
const express = require('express');
const Joi = require('joi'); // JSON validation
const route = express.Router();

" /api/course - URL"
// Route handler for get all courses
route.get('/', (req, res) => {
    // Get all courses
    getAllPoints()
        .then((result) => {
            res.send(result);
            console.log("Got all the points");
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to get points\n" + err.message);
            console.log("Error: Unable to get points\n", err);
        })
});

//API with param id
route.get('/:id', (req, res) => {
    const id = req.params.id;
    // Get the course object using id
    getPointsById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(404);
            res.send("Error: Unable to get points\n" + err.message);
            console.log("Error: Unable to get points\n", err);
        })
});

/****************** END: get requests *************/

/****************** BEGIN: post requests *************/

// http://localhost/api/course - POST - {JSON course}
// POST API to create a new course
route.post('/',  (req, res) => {
    // Add course to db
    createPoint(req.body) // JSON course object
        .then((result) => {
            console.log(result);
            res.send(result); //  Send the result (new course object) back to user
            console.log("Created a new point: ", result.location);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to create point\n" + err.message);
            console.log("Error: Unable to create point\n", err);
        });
});

/****************** END: post requests *************/

/****************** BEGIN: PUT requests *************/
// Handler to update a course using put method
route.put('/:id', (req, res) => {
    // Look up the course. If not found return 404
    const id = req.params.id;
    // Get the course object using id
    getPointsById(id)
        .then((result) => {
            // id is valid. Update the course
            // Add id field to course object
            var point = req.body;
            point._id = id;
            // Update course to db
            updatePoint(point) // JSON course object
                .then((result) => {
                    res.send(result); //  Send the result (updated course object) back to user
                    console.log("Updated point: ", result.location);
                })
                .catch((err) => {
                    res.status(500);
                    res.send("Error: Unable to update point\n" + err.message);
                    console.log("Error: Unable to create point\n", err);
                });

        })
        .catch((err) => {
            res.status(404);
            res.send("Error: Unable to get point\n" + err.message);
            console.log("Error: Unable to get point\n", err);
        })

});

// Handler to delete a course using delete method
route.delete('/:id', (req, res) => {
    // Look up the course. If not found return 404

});

module.exports = route;