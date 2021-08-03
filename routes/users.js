var express = require('express');
var router = express.Router();
var Joi = require("joi");

const users = [{name: "Test1", age: "34"}, {name: "Test", age: "20"}];

const userSchema = Joi.object({
    name: Joi.string().required().min(2).max(10),
    age: Joi.number().required()
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send(users);
});

router.post('/', function (req, res, next) {
    let data = req.body;
    let validationResult = userSchema.validate(data);
    if (validationResult.error) {
        res.status(500).send(validationResult.error.details);
    } else {
        users.push(data);
        res.status(200).send(data);
    }
})

module.exports = router;
