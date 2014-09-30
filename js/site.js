$(document).ready(function(){
	function Dot(settings) {
		var defaults = {
			dots: 10,
			dotSize: 10,
			dotColor: 'black',
			radius: 200,
			spacing: 0
		};

		this.config = $.extend({}, defaults, settings);
		this.init();
	}

	Dot.prototype.init = function() {
		this.createDot();
	};

	Dot.prototype.createDot = function() {
		var wh = $(window).height();
		var ww = $(window).width();
		var hwh = wh * 0.5;
		var hww = ww * 0.5;
		var counter = 0;
		var dots = this.config.dots;
		var dotSize = this.config.dotSize;
		var radius = this.config.radius;
		var PI = Math.PI;
		var dotCount = 1;
		var rowCount = 1;

		// um... there has to be a less complicated way to do this
		var increase = PI * 2 / (dots - Math.ceil( ( (dots * dotSize) - (2 * PI * radius) ) / dotSize) );
		// var increase = Math.PI * 2 / this.config.dots;

		for (var i = 0; i < dots; i++) {
			var dot = document.createElement('span');

			if ( dotCount * dotSize > 2 * PI * radius) {
				radius += dotSize * 2;
				dotCount = 1;
				increase = PI * 2 / (dots - Math.ceil( ( (dots * dotSize) - (2 * PI * radius) ) / dotSize) );
				rowCount++;
			}

			x = Math.cos(counter) * radius;
			y = Math.sin(counter) * radius;

			//style stuff
			dot.style.left = x + hww - (dotSize * 0.5) +  'px';
			dot.style.top = y + hwh - (dotSize * 0.5) + 'px';
			dot.style.height = dotSize + 'px';
			dot.style.width = dotSize + 'px';
			dot.style.borderRadius = '50%';
			dot.style.position = 'absolute';
			dot.style.display = 'none';
			dot.style.backgroundColor = this.config.dotColor;
			dot.className = 'row-' + rowCount;

			document.body.appendChild(dot);
			counter += increase;
			dotCount++;
		}
	};

	Dot.replay = function(){
		var self = this;
		var timer = 0;

		self.redo = setInterval(replay, 2500);
		function replay(){
			timer += 1;

			$("span").remove();

			var dot = new Dot({
				dots: 1750, // span elements
				dotSize: 25, // in pixels
				dotColor: 'turquoise',
				radius: 20, // in pixels
				spacing: 5 // in pixels
			});
			remake();

			if(timer%2.5 === 0) {
				window.clearInterval(self.redo);
				self.redo = setInterval(replay, 2500);
			}
		}
	};

	Dot.replay();

	function remake(){
		var count = 0;
		for (count; count < 10; count++) {

			$('.row-' + count).velocity(
				'transition.expandIn',
				{delay: 50 * count, duration: 100}
			);
			console.log(count);
		}
	}
});
