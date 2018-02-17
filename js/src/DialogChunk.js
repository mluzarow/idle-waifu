class DialogChunk {
	constructor (rawDialog, dialogBoxWidth, context) {
		this.dialogBoxWidth = dialogBoxWidth;
		this.context = context;
		this.processedText = this.processRawDialog (rawDialog);
	}
	
	processRawDialog (rawDialog) {
		var split_text = rawDialog.split (' ');
		var testLine = "";
		var renderText = [];
		
		for (var i = 0; i < split_text.length; i++) {
			var currentLine = testLine + " " + split_text[i];
			var lineLength = this.context.measureText (currentLine).width;
			
			if (lineLength >= this.dialogBoxWidth) {
				renderText.push (testLine);
				testLine = split_text[i];
			} else if (i === (split_text.length - 1)) {
				renderText.push (currentLine);
			} else {
				testLine = currentLine;
			}
		}
		
		return renderText;
	}
}