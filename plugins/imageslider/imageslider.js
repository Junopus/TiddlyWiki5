/*\
title: $:/plugins/Junopus/imageslider/imageslider.js
modifier: Junopus
type: application/javascript
module-type: macro

Macro to return HTML of slide animation.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/

exports.name = "imageslider";

exports.params = [
    {name: "title"},
    {name: "dim"},
    {name: "pages"}
];

/*
Run the macro
*/
exports.run = function(title, dim, pages) {
    var html = "";
    if($tw.wiki.tiddlerExists(title)) {
        var tiddler = $tw.wiki.getTiddler(title);
        var datauri = $tw.utils.makeDataUri(tiddler.fields.text, tiddler.fields.type);
        var originaldim = tiddler.fields.slider_dimension.split("x");
        var width = parseInt(originaldim[0], 10);
        var height = parseInt(originaldim[1], 10);
        var ratio = height / width;
        var fullpagenum = parseInt(originaldim[2], 10);
        var pagenum = fullpagenum;
        var pagestart = 1;
        var pageend = fullpagenum;
        if(dim) {
            width = parseInt(dim.split("x")[0], 10);
            if(dim.split("x")[1]) {
                height = parseInt(dim.split("x")[1], 10);
            } else {
                height = width * ratio;
            }
        }
        if(pages) {
            pagestart = parseInt(pages.split("-")[0], 10);
            pageend = parseInt(pages.split("-")[1], 10);
            pagenum = pageend - pagestart + 1;
        }
        var id = Date.now();
        html += "<style>";
        html += ".ctl" + id + " {";
        html += "width: 100%; height: 100%; padding: 0; margin: 0; ";
        html += "z-index: 2;";
        html += "}";
        html += ".sprite" + id + " {";
        html += "position: absolute; top: 0; left: 0; ";
        html += "width: 100%; height: 100%; padding: 0; margin: 0; ";
        html += "background-image: url(" + datauri + "); ";
        html += "background-position: calc(-" + (pagestart - 1) + "*100%) 0; ";
        html += "background-size: " + fullpagenum*100 + "% 100%; ";
        html += "z-index: 1;";
        html += "}";
        for(var i = 0, p = pagestart; p <= pageend; i++, p++) {
            html += ".ctl"+id + ":nth-of-type(" + (i + 1) + "):hover ~ .sprite"+id + " {";
            html += "background-position: calc(-" + (p-1) + "*100%) 0;}";
        }
        html += "</style>";
        html += '<div style="position: relative; ';
        html += 'width: ' + width + 'px; height: ' + height + 'px;';
        html += 'display: grid; grid-column-gap: 0; ';
        html += 'grid-template-columns: repeat(' + pagenum + ', ' + 100/pagenum + '%);">';
        for(var p = pagestart; p <= pageend; p++) {
            html += '<div class="ctl'+id + '"></div>';
        }
        html += '<div class="sprite'+id + '"></div>';
        html += '</div>';
    }
    return html;
};

})();
