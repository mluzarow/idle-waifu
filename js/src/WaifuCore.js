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
		this.context.fillStyle = "#fff";
		this.context.font = "30px Arial";
		this.context.fillText ("FPS: " + (1000 / this.fpsDelta).toFixed(0), 1100, 50);
	}
}