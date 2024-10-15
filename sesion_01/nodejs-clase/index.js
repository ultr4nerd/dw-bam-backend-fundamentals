const _ = require("lodash");

const numbers = [2, 5, 1, 7, 3, 9, 8, 4, 6];

const orderedNumber = _.sortBy(numbers);
console.log("Números ordenados:", orderedNumber);
