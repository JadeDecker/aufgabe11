"use strict";
/**
 * Simple database insertion and query for MongoDB
 * @author: Jirka Dell'Oro-Friedl
 */
const Mongo = require("mongodb");
console.log("Database starting");
let databaseURL = "mongodb://localhost:27017/Test";
let db;
let students;
if (process.env.NODE_ENV == "production")
    databaseURL = "mongodb://JadeDecker:ehmx678@ds143542.mlab.com:43542/eia2-datenbank";
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db;
        students = _db.collection("students");
    }
}
function insert(_doc) {
    students.insertOne(_doc, handleInsert);
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
function findAll(_callback) {
    var cursor = students.find();
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, studentArray) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
    }
}
exports.findAll = findAll;
function search(_doc, _callback) {
    // Von Hand kein Problem (Zeile 51) aber mit übergabe als _doc wird jedes Feld verlangt (Zeile 50)
    var cursor = students.find(({ $or: [_doc] }));
    //var cursor: Mongo.Cursor = students.find(({ $or: [{ "name": "Decker5" }, { "firstname": "Hustin" }, { "matrikel": 1234 } ]}));
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, studentArray) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
    }
}
exports.search = search;
//# sourceMappingURL=Database.js.map