var ObjectId = require("mongodb").ObjectId;

function generate() {
    return ObjectId();
};

var generator = {
    generate: generate
}

module.exports = generator;
