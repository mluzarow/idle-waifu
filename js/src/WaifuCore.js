/**
 * Core process for the game. Initializes game control variables and maintains
 * core game loops.
 */
class WaifuCore {
	constructor () {
		/**
		 * @var {int} CANVAS_WIDTH  constant width of the canvas window
		 * @var {int} CANVAS_HEIGHT constant height of the canvas window
		 */
		this.CANVAS_WIDTH = 1280;
		this.CANVAS_HEIGHT = 640;
		
		/**
		 * @var {Node}    canvas  canvas element
		 * @var {Context} context 2D context for selected canvas
		 */
		this.canvas = document.getElementById ("canvas");
		this.context = this.canvas.getContext ("2d");
		
		/**
		 * @type {int} FPS cap for rendering. This also controls frequency at
		 *             which the rendering method is called.
		 */
		this.fpsMax = 50;
		
		/**
		 * @var {int}  fpsDelta      number of frames since last update () was
		 *                           called
		 * @var {Date} lastIteration date stamp of last call to update ()
		 */
		this.fpsDelta = 0;
		this.lastIteration = Date.now ();
		
		this.dialogManager = new DialogManager (1170, 300, "24px Arial");
		
		console.info (
			"~~~~~ Initializing Waifu Core ~~~~~\n" +
			"====================================\n" +
			"Render Width:  " + this.CANVAS_WIDTH + "\n" +
			"Render Height: " + this.CANVAS_HEIGHT + "\n" +
			"Framerate Cap: " + this.fpsMax + "\n" +
			"Dialogue Manager: " + ((this.dialogManager instanceof DialogManager) ? "Initialized" : "Failure") + "\n"
		);
	}
	
	/**
	 * Initialization process for all core game variables and intervals.
	 */
	initialize () {
		this.testImg = new Image ();
		this.testImg.src = "img/test-bg.jpg";
		this.textboxImage = new Image ();
		this.textboxImage.src = "img/textbox.png";
		
		// Text pre-processing
		this.renderText = [""];
		this.context.font = "16px Arial";
		this.loadNextText = true;
		
		this.dialogManager.loadDialogue ("test");
		
		// var testChunk = new DialogChunk (test_text, 1150, this.context);
		// this.processedText = testChunk.processedText;
		// this.printInterval = setInterval (this.printText.bind(this), 3000 / this.fpsMax);
		
		setInterval (this.update.bind(this), 1000 / this.fpsMax);
	}
	
	/**
	 * Slowly feeds characters into the text render buffer in order to simulate
	 * typing.
	 */
	// printText () {
	// 	var nextChar = this.dialogManager.dialog[0].substring (0, 1);
	// 
	// 	if (typeof nextChar === "integer") {
	// 		if (nextChar === -1) {
	// 			// Next line
	// 		} else if (nextChar === -2) {
	// 			// Next section
	// 		} else if (nextChar === -3) {
	// 			// Done printing
	// 		}
	// 	} 
	// 
	// 	this.renderText[0][this.renderText[0].length - 1] += this.dialogManager.dialog[0].feedNextCharacter ();
	// 	this.processedText[0] = this.processedText[0].substring (1, this.processedText[0].length);
	// 
	// 	if (this.processedText[0].length < 1) {
	// 		this.processedText.shift ();
	// 
	// 		if (this.processedText.length < 1) {
	// 			clearInterval (this.printInterval);
	// 		} else {
	// 			this.renderText.push ("");
	// 		}
	// 	}
	// }
	
	/**
	 * Update called every frame.
	 */
	update () {
		if (this.loadNextText === true) {
			this.loadNextText = false;
			
			console.debug ("Loading next dialog section.");
			let sectionText = this.dialogManager.dialog[0].getNextSection ();
			
			if (sectionText === null) {
				// probably do more stuff here
				console.debug ("sectionText is null.");
			} else {
				console.debug ("renderText set to:");
				console.debug (sectionText);
				this.renderText = sectionText;
			}
		}
		
		var currentIteration = Date.now ();
		var localDelta = currentIteration - this.lastIteration;
		this.fpsDelta += (localDelta - this.fpsDelta) / 20;
		this.lastIteration = currentIteration;
		this.draw ();
	}
	
	/**
	 * Draws the current frame to the canvas.
	 */
	draw () {
		this.context.drawImage (this.testImg, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
		this.context.drawImage (this.textboxImage, 50, 300, 1180, 300);
		
		this.context.fillStyle = "#fff";
		this.context.font = this.dialogManager.getDialogFont ();
		for (var i = 0; i < this.renderText.length; i++) {
			this.context.fillText (this.renderText[i], 60, 320 + (20 * i));
		}
		
		this.context.font = "30px Arial";
		this.context.fillText ("FPS: " + (1000 / this.fpsDelta).toFixed(0), 1100, 50);
	}
}