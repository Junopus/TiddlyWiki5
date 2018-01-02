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
    let strs = string.split("|");
    let splitted = [strs.shift()];
    while(strs.length) {
        const top = splitted.pop();
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
    let quiz = "";
    const empty = '? ? ?';
    const pre = '<details class="disclosure_quiz"><summary>';
    const mid = '</summary>';
    const post = '</details>';
    if(splitted.length == 1) {
        quiz = pre + empty + mid + '&ensp;' + splitted[0] + '&ensp;' + post;
    } else {
        let left = '';
        let right = '';
        while(splitted.length > 1) {
            left += pre + (splitted.shift() || empty) + mid;
            right += post;
        }
        quiz = left + '&ensp;' + splitted.shift() + '&ensp;' + right;
    }
    return quiz;
};

})();
