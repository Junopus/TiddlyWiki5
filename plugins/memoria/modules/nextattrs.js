/*\
title: $:/plugins/Junopus/memoria/modules/nextattrs.js
modifier: Junopus
type: application/javascript
module-type: macro

Macro to calculate the next Memoria attrs. .

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const lib = require("$:/plugins/Junopus/memoria/modules/library.js");
const config = $tw.wiki.getTiddler("$:/plugins/Junopus/memoria/config").fields;

/*
Information about this macro
*/

exports.name = "memorianextattrs";

exports.params = [
    {name: "rating"},
    {name: "title"}
];

/*
Run the macro
*/
exports.run = function(rating, title) {
    title = title || this.getVariable("currentTiddler");
    const tiddler = !!title && this.wiki.getTiddler(title);
    const now = Date.now();
    let result = "";
    if(tiddler) {
        if(!$tw.utils.hop(tiddler.fields,lib.getMemoriaFieldName())) {
            result = "" + now;
        } else {
            const attrs = lib.getMemoriaAttrs(title, now);
            /*console.log(attrs);*/
            const rating_score = parseFloat(rating);
            const rating_index = config.rating_score.split(" ").indexOf(rating);
            const good_limit = parseFloat(config.rating_good_limit);
            const interval_min = parseInt(config.min.split(" ")[rating_index], 10);
            const interval_max = parseInt(config.max.split(" ")[rating_index], 10);
            /*console.log("limit: "+good_limit+"index: "+rating_index+" min: "+interval_min+" max: "+interval_max+" now: "+now);*/
            if(attrs.isnew) {
                result = "" + interval_min + " 0.3 " + now;
            } else {
                /* If correct, overdue will add a bonus up to 2 */
                const weight_overdue = rating_score < good_limit ? 1.0 : Math.min(2.0, attrs.overduerate);
                /*console.log("overdue rate: "+overdue+" overdue weight [1-2]: " + weight_overdue);*/
                const difficulty = Math.min(Math.max(attrs.difficulty + weight_overdue * (8.0 - 9.0 * rating_score) / 17.0, 0.0), 1.0);
                const weight_difficulty = 3.0 - 1.7 * difficulty;
                /*console.log("difficulty: "+difficulty+" difficulty weight [1.3-3]: " + weight_difficulty);*/
                const weight_interval = rating_score < good_limit ?
                    (1.0 / (4.3 - weight_difficulty) / (4.3 - weight_difficulty)) :
                    (1.0 + (weight_difficulty - 1.0) * weight_overdue);
                const interval = Math.min(Math.max(Math.floor(attrs.interval * weight_interval), interval_min), interval_max);
                /*console.log("interval weight: " + weight_interval+" interval: "+interval);*/
                result = "" + interval + " " + difficulty + " " + now;
            }
        }
    }
    return result;
};

})();
