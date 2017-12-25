/*\
title: $:/plugins/Junopus/resize-image/resize-image.js
type: application/javascript
module-type: bitmapeditoroperation

Bitmap editor operation to resize the image

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports["resize-image"] = function(event) {
    // Get the new size
    var maxSize = parseInt(event.paramObject.resizeTo,10);
    // Update if necessary
    if(maxSize < this.currCanvas.width || maxSize < this.currCanvas.height) {
        // Calc new size
        var newWidth = maxSize, newHeight = maxSize;
        if(this.currCanvas.width > this.currCanvas.height) {
            newHeight = Math.floor(this.currCanvas.height * newWidth / this.currCanvas.width);
        } else {
            newWidth = Math.floor(this.currCanvas.width * newHeight / this.currCanvas.height);
        }

        // Create and size a new canvas
        var newCanvas = this.document.createElement("canvas");
        this.initCanvas(newCanvas,newWidth,newHeight);
        // Copy the old image
        var ctx = newCanvas.getContext("2d");
        ctx.drawImage(this.currCanvas,0,0,newWidth,newHeight);
        // Set the new canvas as the current one
        this.currCanvas = newCanvas;
        // Set the size of the onscreen canvas
        this.canvasDomNode.width = newWidth;
        this.canvasDomNode.height = newHeight;
        // Paint the onscreen canvas with the offscreen canvas
        ctx = this.canvasDomNode.getContext("2d");
        ctx.drawImage(this.currCanvas,0,0);

    }
    // Update the input controls
    this.refreshToolbar();
    // Save the image into the tiddler
    this.saveChanges();
};

})();
