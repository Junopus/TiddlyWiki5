/*\
title: $:/plugins/Junopus/memoria/modules/library.js
type: application/javascript
module-type: library

Library for the spaced repetition.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const config = $tw.wiki.getTiddler("$:/plugins/Junopus/memoria/config").fields;

/*
Export the library
*/
exports.getMemoriaUserName = function() {
    const regexp = new RegExp(config.prefix_query + '(.+?)(&|\/|$)');
    const query = $tw.wiki.getTiddlerText("$:/info/url/search");
    let username = config.default_user;
    if(query) {
        const match = query.match(regexp);
        if(match) {
            username = decodeURIComponent(match[1]);
        }
    }
    return username;
};

exports.getMemoriaFieldName = function() {
    const username = exports.getMemoriaUserName();
    return config.prefix_field + username;
};

exports.getMemoriaAttrs = function(fieldString, timebase) {
    const attrs = fieldString.split(" ");
    const isnew = (attrs[0] === config.initial_interval) ? true : false;
    const interval = parseInt(attrs[0], 10);
    const difficulty = parseFloat(attrs[1]);
    const lastreview = parseInt(attrs[2], 10);
    const nextreview = lastreview + interval;

    const result = {
        interval: interval,
        difficulty: difficulty,
        lastreview: lastreview,
        nextreview: nextreview,
        isnew: isnew,
        isdue: timebase > nextreview,
        overduerate: (timebase - lastreview) / interval
    };
    return result;
};

exports.difficultyFromRating = function(rating) {
    return 1.0 - rating;
}

})();
