/*
 * Title: The course model implementation
 * Description: Implements APIs for performing CRUD operations
 * on MongoDB.
 * APIs can be invoked by route handlers. 
 */

// Import mongoose module
const mongoose = require('mongoose');

// Connect to MongoDB database 'courses=db'
mongoose.connect('mongodb://localhost:27017/map-db', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error: Unable to connect to MongoDB", err));

// Create Course Schema
const courseSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 60
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
});

// Create a model from the Schema (Map is a model (Class))
const Map = mongoose.model('Map', courseSchema);

/* Get All Map Points
 * IN: None. TODO: Add filter params
 * OUT: Courses collection in JSON format
 */
async function getAllPoints() {
    try {
        const maps = await Map.find();
        return maps;
    }
    catch (err) {
        console.log("Error: Unable to query database");
        throw err;
    }
}

/* Get Map points by ID
 * IN: id (course object ID)
 * OUT: Single course object
 */
async function getPointsById(id) {
    try {
        const maps = await Map.findById(id);
        return maps;
    }
    catch (err) {
        console.log("Error: Unable to query database");
        throw err;
    }
}

/* Create a point
 * IN: Map object
 * Output: Map Object, including object id
 */
async function createPoint(MapInfo) {
    // Instantiate the Course. Here course represents a document object
    const maps = new Map(MapInfo);

    // Validate and save the document
    try {
        // Use validate method to validate a document
        var result = await maps.validate();
        result = await maps.save();
        return result;
    }
    catch (err) {
        console.log("Error: Could not save document");
        throw err;
    }
}



/* Update a points by ID
 * IN: Course object, including object id
 * OUT: Updated course object
 */
async function updatePoint(mapsinfo) {
    const id = mapsinfo._id;
    // find the document - findById()
    try {
        let maps = await Map.findById(id);
        if (!maps) {
            console.log("Error: Cannot find point with ID: ", id);
            throw new Error("point not found");
        }

        // Modify its properties
        maps.set(mapsinfo);
        // save the document - save()
        const result = await maps.save();
        return result;
    }
    catch(err) {
        console.log("Error: Cannot save point with ID: ", id);
        throw err;
    }
}


/* Delete a course by ID
 * IN: id (course object ID)
 */

module.exports.createPoint = createPoint;
module.exports.getAllPoints = getAllPoints;
module.exports.getPointsById = getPointsById;
module.exports.updatePoint = updatePoint;

