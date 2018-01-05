/*\
title: $:/plugins/Junopus/memoria/widgets.js
type: application/javascript
module-type: widget

Action widget to set/reset/delete a spaced repetition field on a tiddler.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const lib = require("$:/plugins/Junopus/memoria/library.js");
const config = $tw.wiki.getTiddler("$:/plugins/Junopus/memoria/config").fields;

/*
Set the spaced repetition data. Based on "SM2+" algorithm.
http://www.blueraja.com/blog/477/a-better-spaced-repetition-learning-algorithm-sm2
*/
const SetFieldWidget = require("$:/core/modules/widgets/action-setfield.js")["action-setfield"];

let SetMemoriaFieldWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

SetMemoriaFieldWidget.prototype = new SetFieldWidget();

SetMemoriaFieldWidget.prototype.execute = function() {
    this.actionTiddler = this.getAttribute("$tiddler",this.getVariable("currentTiddler"));
    this.actionIndex = this.getAttribute("$index");
    this.actionTimestamp = this.getAttribute("$timestamp","yes") === "yes";

    const reset = this.getAttribute("$reset") === "yes" ? true : false;
    const srs = lib.getMemoriaAttrs(this.actionTiddler);
    /*console.log(srs);*/
    const field = lib.getMemoriaFieldName();
    const rating = parseFloat(this.getAttribute("$rating"));
    const rating_index = config.rating_score.split(" ").indexOf(this.getAttribute("$rating"))
    const good_limit = parseFloat(config.rating_good_limit);
    const interval_min = parseInt(config.min.split(" ")[rating_index], 10);
    const interval_max = parseInt(config.max.split(" ")[rating_index], 10);
    const now = Date.now();
    /*console.log("limit: "+good_limit+"index: "+rating_index+" min: "+interval_min+" max: "+interval_max+" now: "+now);*/
    let value = "";
    if(!reset && srs) {
        const overdue = (now - srs.lastreview) / srs.interval;
        /* If correct, overdue will add a bonus up to 2 */
        const weight_overdue = rating < good_limit ? 1.0 : Math.min(2.0, overdue);
        /*console.log("overdue rate: "+overdue+" overdue weight [1-2]: " + weight_overdue);*/
        const difficulty = Math.min(Math.max(srs.difficulty + weight_overdue * (8.0 - 9.0 * rating) / 17.0, 0.0), 1.0);
        const weight_difficulty = 3.0 - 1.7 * difficulty;
        /*console.log("difficulty: "+difficulty+" difficulty weight [1.3-3]: " + weight_difficulty);*/
        const weight_interval = rating < good_limit ?
            (1.0 / (4.3 - weight_difficulty) / (4.3 - weight_difficulty)) :
            (1.0 + (weight_difficulty - 1.0) * weight_overdue);
        const interval = Math.min(Math.max(Math.floor(srs.interval * weight_interval), interval_min), interval_max);
        /*console.log("interval weight: " + weight_interval+" interval: "+interval);*/
        value = "" + interval + " " + difficulty + " " + now;
    } else {
        value = "" + interval_min + " 0.3 " + now;
    }

	this.actionField = field;
	this.actionValue = value;
};

/*
Delete Memoria field.
*/
const DeleteFieldWidget = require("$:/core/modules/widgets/action-deletefield.js")["action-deletefield"];

let DeleteMemoriaFieldWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

DeleteMemoriaFieldWidget.prototype = new DeleteFieldWidget();

DeleteMemoriaFieldWidget.prototype.execute = function() {
	this.actionTiddler = this.getAttribute("$tiddler",this.getVariable("currentTiddler"));
	this.actionField = lib.getMemoriaFieldName();
};




let SetMemoriaNotificationWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

SetMemoriaNotificationWidget.prototype = new SetFieldWidget();

SetMemoriaNotificationWidget.prototype.execute = function() {
    this.actionTiddler = "$:/state/MemoriaNotify";
    this.actionTimestamp = this.getAttribute("$timestamp","yes") === "yes";
	const titles = $tw.wiki.getTiddlersWithTag("$:/tags/MemoriaNotifyRating");
	const i = parseInt(Math.random() * titles.length, 10);
	this.actionValue = titles[i];
	console.log("titles: "+titles.join(" ")+" i: "+i+" selected: "+this.actionValue);
};
/*
Export widgets.
*/
exports["action-memoria"] = SetMemoriaFieldWidget;
exports["action-memoria-delete"] = DeleteMemoriaFieldWidget;
exports["action-setmemorianotify"] = SetMemoriaNotificationWidget;

})();
