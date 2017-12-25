/*\
title: $:/plugins/Junopus/utils/quiz.js
type: application/javascript
module-type: macro

Macro to simple quizzes

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/

exports.name = "quiz";

exports.params = [
    {name: "string"}
];

/*
Run the macro
*/
exports.run = function(string) {
    var strs = string.split("|");
    var splitted = [strs.shift()];
    while(strs.length) {
        var top = splitted.pop();
        if(/\[.*\[/.test(top)) {
            splitted.push(top + "|" + strs.shift());
            if(strs.length) {
                splitted.push(strs.shift());
            }
        } else {
            splitted.push(top);
            splitted.push(strs.shift());
        }
    }
    var quiz = "";
    var empty = '? ? ?';
    var pre = '<details class="disclosure_quiz"><summary>';
    var mid = '</summary>';
    var post = '</details>';
    if(splitted.length == 1) {
        quiz = pre + empty + mid + '&ensp;' + splitted[0] + '&ensp;' + post;
    } else {
        var left = '';
        var right = '';
        while(splitted.length > 1) {
            left += pre + (splitted.shift() || empty) + mid;
            right += post;
        }
        quiz = left + '&ensp;' + splitted.shift() + '&ensp;' + right;
    }
    return quiz;
};

})();
