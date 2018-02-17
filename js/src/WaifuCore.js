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
		
		var test_text = "\"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"";
		
		var testChunk = new DialogChunk (test_text, 1150, this.context);
		this.processedText = testChunk.processedText;
		this.printInterval = setInterval (this.printText.bind(this), 3000 / this.fpsMax);
		
		setInterval (this.update.bind(this), 1000 / this.fpsMax);
	}
	
	printText () {
		this.renderText[this.renderText.length - 1] += this.processedText[0].substring (0, 1);
		this.processedText[0] = this.processedText[0].substring (1, this.processedText[0].length);
		
		if (this.processedText[0].length < 1) {
			this.processedText.shift ();
			
			if (this.processedText.length < 1) {
				clearInterval (this.printInterval);
			} else {
				this.renderText.push ("");
			}
		}
	}
	
	update () {
		var currentIteration = Date.now ();
		var localDelta = currentIteration - this.lastIteration;
		this.fpsDelta += (localDelta - this.fpsDelta) / 20;
		this.lastIteration = currentIteration;
		this.draw ();
	}
	
	draw () {
		this.context.drawImage (this.testImg, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
		this.context.drawImage (this.textboxImage, 50, 300, 1180, 300);
		this.context.fillStyle = "#fff";
		this.context.font = "16px Arial";
		for (var i = 0; i < this.renderText.length; i++) {
			this.context.fillText (this.renderText[i], 60, 320 + (20 * i));
		}
		
		this.context.font = "30px Arial";
		this.context.fillText ("FPS: " + (1000 / this.fpsDelta).toFixed(0), 1100, 50);
	}
}