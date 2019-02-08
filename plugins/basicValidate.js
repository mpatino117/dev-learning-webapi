let log = require('torch')

const people = { // our "users database"
    1: {
        id: 1,
        name: 'Jen Jones'
    }
};


const validate = async function (decoded, request) {
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
        return {
            isValid: false
        };
    } else {
        return {
            isValid: true
        };
    }
};

exports.module = validate;