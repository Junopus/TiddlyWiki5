/*\
title: $:/plugins/Junopus/memoria/modules/buttons.js
modifier: Junopus
type: application/javascript
module-type: macro

Macro to create Memoria controller.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const config = $tw.wiki.getTiddler("$:/plugins/Junopus/memoria/config").fields;

/*
Information about this macro
*/

exports.name = "memoria-buttons";

exports.params = [
];

/*
Run the macro
*/
exports.run = function() {
    let text = "";
    const rating_scores = config.rating_score.split(" ");
    const rating_icons = config.rating_icon.split(" ");
    for(let i = 0; i < rating_icons.length; i++) {
        text += '<$button class="tc-btn-memoria">';
        text += rating_icons[i];
        text += '<$action-setfield $field=<<memoriafieldname>> $value=<<memorianextattrs ' + rating_scores[i] + '>> $timestamp="no" />';
        text += '<$action-sendmessage $message="tm-auto-save-wiki" />';
        text += '<$action-sendmessage $message="tm-notify" $param="$:/plugins/Junopus/memoria/notifications/memoria" />';
        text += '<$action-sendmessage $message="tm-close-tiddler" />';
        text += '</$button>';
    }
    return text;
};

})();
