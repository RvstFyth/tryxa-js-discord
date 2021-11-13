const { Random } = require("random-js");

const randomInstance = new Random();

module.exports = {

    number: function(min, max) {
        return randomInstance.integer(min, max);
    },
    float: function(min, max) {
        return randomInstance.real(min, max);
    },
    arrayValue: function(arr) {
        return randomInstance.pick(arr);
    },
    shuffleArray(arr) {
        return randomInstance.shuffle(arr);
    },
    boolean(chance) {
        return randomInstance.bool(chance);
    }
};