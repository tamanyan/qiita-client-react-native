'use strict';

const encodeParams = (params) => {
    let queryString = ""
    let arr = []

    for (let key in params) {
        arr.push(`${key}=${params[key]}`);
    }

    return arr.join('&');
};

module.exports = {
    encodeParams : encodeParams
};
