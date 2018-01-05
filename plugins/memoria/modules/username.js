/*\
title: $:/plugins/Junopus/memoria/modules/username.js
modifier: Junopus
type: application/javascript
module-type: macro

Macro to return Memoria user name.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const lib = require("$:/plugins/Junopus/memoria/modules/library.js");

/*
Information about this macro
*/

exports.name = "memoriausername";

exports.params = [
];

/*
Run the macro
*/
exports.run = function() {
    return lib.getMemoriaUserName();
};

})();
