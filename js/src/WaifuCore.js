class WaifuCore {
	initialize () {
		this.CANVAS_WIDTH = 1280;
		this.CANVAS_HEIGHT = 640;
		
		this.canvas = document.getElementById ("canvas");
		this.context = this.canvas.getContext ("2d");
		
		this.fpsMax = 50;
		
		this.x = 0;
		this.y = 0;
		
		this.fpsDelta = 0;
		this.lastIteration = Date.now ();
		this.testImg = new Image ();
		this.testImg.src = "img/test-bg.jpg";
		this.textboxImage = new Image ();
		this.textboxImage.src = "img/textbox.png";
		
		// Text pre-processing
		this.renderText = [];
		this.context.font = "16px Arial";
		
		var test_text = "\"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"";
		var split_text = test_text.split (' ');
		var testLine = "";
		
		for (var i = 0; i < split_text.length; i++) {
			var currentLine = testLine + " " + split_text[i];
			var lineLength = this.context.measureText (currentLine).width;
			console.log ("Linelength: " + lineLength + " text: " + currentLine);
			
			if (lineLength >= 1150 || i === (split_text.length - 1)) {
				this.renderText.push (testLine);
				testLine = split_text[i];
			} else {
				testLine = currentLine;
			}
		}
		
		setInterval (this.update.bind(this), 1000 / this.fpsMax);
	}
	
	update () {
		var currentIteration = Date.now ();
		var localDelta = currentIteration - this.lastIteration;
		this.fpsDelta += (localDelta - this.fpsDelta) / 20;
		this.lastIteration = currentIteration;
		this.x++;
		this.y++;
		this.draw ();
	}
	
	draw () {
		this.context.drawImage (this.testImg, 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
		this.context.drawImage (this.textboxImage, 50, 300, 1180, 300);
		// this.context.fillStyle = "#000";
		// this.context.fillRect (0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
		this.context.fillStyle = "#fff";
		this.context.font = "16px Arial";
		for (var i = 0; i < this.renderText.length; i++) {
			this.context.fillText (this.renderText[i], 60, 320 + (20 * i));
		}
		
		this.context.font = "30px Arial";
		this.context.fillText ("FPS: " + (1000 / this.fpsDelta).toFixed(0), 1100, 50);
		// this.context.font = "70px Arial";
		// this.context.fillText("How's it goin'?\nasdsad", this.x, this.y);
	}
}