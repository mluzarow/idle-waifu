class DialogManager {
	constructor (width, height, font) {
		/**
		 * @var {int} dialogBoxWidth  width of the dialog box for which this text
		 *                            is preprocessed for fitting into.
		 * @var {int} dialogBoxHeight height of the dialog box for which this text
		 *                            is preprocessed for fitting into.
		 */
		this.dialogBoxWidth = width;
		this.dialogBoxHeight = height;
		
		/**
		 * @var {Context} context       2D context of measurement canvas
		 * @var {string}  fontReference font information for measurement of text
		 */
		this.context = document.createElement ("canvas").getContext ("2d");
		this.fontReference = font;
		
		this.context.font = this.fontReference;
		
		/**
		 * @var {int} dialogBoxHorizontalPadding   pixel distance from left and
		 *                                         right side of dialog box
		 * @var {int} dialogBoxVerticalPadding     pixel distance from top and
		 *                                         bottom of dialog box
		 * @var {int} dialogBoxVerticalTextPadding pixel distance between lines
		 * @var {int} dialogBoxLineHeight          pixel height of 1 character
		 */
		this.dialogBoxHorizontalPadding = 30;
		this.dialogBoxVerticalPadding = 30;
		this.dialogBoxVerticalTextPadding = 10;
		this.dialogBoxLineHeight = this.context.measureText ("H").height;
		
		/**
		 * @type {Array} ordered list of dialog chunks
		 */
		this.dialog = [];
	}
	
	/**
	 * Gets the font currently used for text orientation and measurement of
	 * dialogue.
	 */
	getDialogFont () {
		return (this.fontReference);
	}
	
	/**
	 * Sets new font to be used for text orientation and measurement of dialogue.
	 * 
	 * @param {string} newFont canvas context font property
	 */
	setDialogFont (newFont) {
		this.fontReference = newFont;
		this.context.font = this.fontReference;
	}
	
	processDialogData (rawDialog) {
		console.debug ("Entering processDialogData.");
		
		for (var i = 0; i < rawDialog.sectionText.length; i++) {
			console.debug ("Character ID: " + rawDialog.sectionText[i].characterID);
			console.debug ("Character Text: " + rawDialog.sectionText[i].characterText);
			
			var newChunk = new DialogChunk (
				rawDialog.sectionText[i].characterID,
				this.processRawDialog(rawDialog.sectionText[i].characterText)
			);
			this.dialog.push (newChunk);
		}
	}
	
	/**
	 * Splits up text according to the dimensions of the dialog container. Text
	 * is split into lines wherein every line contains the maximum number of
	 * whole words at the given font style that will fit horizontally in the
	 * container. If there is not more vertical space, the lines that fit into
	 * a single container vertically are placed into a seperate array.
	 * 
	 * @param {string} rawDialog single string containing the entire section of
	 *                           dialogue spoken by character speaking
	 *
	 * @return {Array} processed dialog lines split into groups based on vertical
	 *                 space allowance and then further again into groups defined
	 *                 by allowable horizontal space
	 */
	processRawDialog (rawDialog) {
		console.debug ("Chunking dialogue.");
		
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
		var fakeContainer = [];
		fakeContainer.push (renderText);
		
		console.debug ("Chunked dialog:");
		console.debug (fakeContainer);
		
		return fakeContainer;
	}
	
	/**
	 * Temporary method to load dialogue from file.
	 */
	loadDialogue (fileName) {
		console.info ("Requesting dialog file: " + fileName + ".json.");
		
		// Create new request
		var resp = new XMLHttpRequest ();
		
		// Event trigger on response answer received or timeout
		resp.onreadystatechange = function() {
			// Answer received 
			if (resp.readyState == 4) {
				// Success
				if (resp.status == 200) {
					// Set text
					console.info ("Successfully obtained dialogue file: " + fileName + ".json.");
					this.processDialogData(resp.response);
				// Fail
				} else {
					console.warning ("Could not obtain requested dialogue file: " + fileName + " using path Content/Dialog/" + fileName + ".json.");
				}
			}
		}.bind (this);

		// Send request
		resp.open ("GET", "Content/Dialogue/" + fileName + ".json");
		resp.responseType = 'json';
		resp.send ();
	}
}