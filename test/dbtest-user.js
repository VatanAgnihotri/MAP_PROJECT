/* Unit test code for courses model */

const { 
    createPoint, getAllPoints,
     getPointsById, updatePoint
    } = require('../models/user');

function testCreatePoint() {
    // Create a course document
    createPoint({
        location:"My Location",
        latitude: 12.9184977,
        longitude:77.6111548,
    }).then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

function testGetAllPoints() {
    getAllPoints()
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

function testGetPointsById() {
    var id = '5b8fa0374d1adb1b9d08b6f7';

    getPointsById(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

function testUpdatePoint() {
    const course = {
        _id: '5b8fa0374d1adb1b9d08b6f7',
        location:'Your Location',
        latitude:53.2734,
        longitude:-7.77832031,
    };

    updatePoint(course)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));

}
testCreatePoint();
// testGetAllPoints();
// testGetPointsById();
// testUpdatePoint();

