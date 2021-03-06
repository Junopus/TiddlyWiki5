/*\
title: $:/plugins/Junopus/shrink/shrink.js
type: application/javascript
module-type: bitmapeditoroperation

Bitmap editor operation to resize the image

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports["shrink"] = function(event) {
    // Get the new size
    let newWidth = 0;
    if(event.paramObject.width) {
      // Remove units "px" and eval calculation if included.
      newWidth = parseInt(eval(event.paramObject.width.replace("px", "")), 10)
    } else {
      newWidth = parseInt(this.canvasDomNode.width, 10);
    }
    // Update if necessary
    if((newWidth > 0) && (newWidth < this.currCanvas.width)) {
        // Calc new size
        const newHeight = Math.floor(this.currCanvas.height * newWidth / this.currCanvas.width);
        // Create and size a new canvas
        const newCanvas = this.document.createElement("canvas");
        this.initCanvas(newCanvas, newWidth, newHeight);
        // Copy the old image
        let ctx = newCanvas.getContext("2d");
        ctx.drawImage(this.currCanvas, 0, 0, newWidth, newHeight);
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
