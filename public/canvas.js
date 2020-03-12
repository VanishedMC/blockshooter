/*
 * Create a high defition canvas adjusted to screen size 
 */
class Canvas {
	constructor() {
		this.setup();
	}

	pixelRatio() {
		var ctx = document.createElement("canvas").getContext("2d"),
		dpr = window.devicePixelRatio || 1,
		bsr = ctx.webkitBackingStorePixelRatio ||
		ctx.mozBackingStorePixelRatio ||
		ctx.msBackingStorePixelRatio ||
		ctx.oBackingStorePixelRatio ||
		ctx.backingStorePixelRatio || 1;

		return dpr / bsr;
	}

	createHiDPICanvas(w, h, ratio) {
		if (!ratio) { 
			ratio = this.pixelRatio(); 
		}

		var canvas = document.createElement("canvas");

		canvas.width = w * ratio;
		canvas.height = h * ratio;
		canvas.style.width = w + "px";
		canvas.style.height = h + "px";
		
		return canvas;
	}

	setup() {
		const canvas = this.createHiDPICanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
		this.ctx = canvas.getContext("2d");
		this.width = canvas.style.width.substr(0, canvas.style.width.length-2);
		this.height = canvas.style.height.substr(0, canvas.style.height.length-2);
		document.querySelector("#game").appendChild(canvas);
	}
}

export default Canvas;
