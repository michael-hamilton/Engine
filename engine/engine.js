class Engine {
	constructor(canvas) {
		this.c = canvas;
		this.ctx = this.c.getContext("2d");
		this.controls = {};
		this.player = {
			x: 40,
			y: 40,
			velocity: {
				x: 0,
				y: 0,
			},
		};
		this.level = [
			[1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3],
			[7, 0, 0, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
			[8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2],
			[7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 6, 2],
			[8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2],
			[6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2],
			[6, 0, 0, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 6, 2],
			[6, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2],
			[6, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2],
			[6, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
			[6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2],
			[6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 6, 2],
			[6, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 6, 2],
			[6, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 6, 2],
			[6, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2],
			[6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1, 6, 2],
			[6, 6, 2, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1, 2, 2, 2, 2, 6, 6, 2],
			[5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7],
		];
		this.tiles = [];
		this.img = new Image();
	}

	init() {
		this.ctx.canvas.width = window.innerWidth;
		this.ctx.canvas.height = window.innerHeight;
		this.ctx.scale(2, 2);

		this.img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAAAQCAYAAABnTPHAAAAFP0lEQVRogdVav4tUSRDuUWETE1G41EDQA5MDg81MLjAwMzhDD/wTLjnYRFi4ZP+EgzPcxGwDA5PLNhAOQXCDCzYV1uyiZY+Rmt1v/Kbmq+ruN++t+kEzb7r69a+qr6u6+83Ojvbn5RLw9rfni0a2D/5b/J4d7a80WpN/i0CfGQ/2/lzJx3gwJj/Ow8fXV8pamWv3noblIcd7vj1GrW2eZ5Z9jbm39tG2Hw/GCPmdZz+Xf1++WavD18fvR7h695dZIEoxm52/diUrNBZ4MFA8jMQPVsm5nMpvlY+BVsXweJgkfpw+T5GH64HcjKnWvmpD5ft2NplD1AVdINUAUjOROY9J39oHwAgX4fT0dC29eHdjzkmVASYnkFodWYE1uS8XKbgmH9JPhcxoe5S8Kfw42eCGwI/L6rY5QaoRgeePdcELYlaHLRgo+/TkeJmPZ5O1eEalx/1bt1MSAX98+GFuifMe7ZyVf57cnCP5dyYnUGZwNpk1eRGT4o2nJh/ST6WIsWH9zMavoBYXqwPG2kMieDkVBnpj9R5QIfIU3OdW3dzePlmkHvAYjHiW0J+MREycncN7y3wjj4cn0WQEylab3noyTBWysWFfBpkYah+Q4bL75+dcheAeyPcEYy8HmLEfH95a/FqK2o36EEGRyHucckEiRR7DT68+reyZJiNQNJFFTGImj9w2VrKavAW1yZ/SOw2pK5vbGhDqRfMWbeR72/Y6tv/8rg8/o2dOLTqF5wHMi7EnUvj9x49rBwkPHt9f/lp6vXttmceYhEDR5AM1JWxiIL19KYIgPeWhmExBQC1kbWnXUo0ECtY23olOQBWicUXhNaB0GC2MPsTjZ04sHyvyYPKY13l78H6tTKFw7upfD+eWkD/5HigbKB/ZKmQGEilWyXtOhCKDiGB97Nl3DCUR9imWlHG29DObzxZkBxVRPuD7PIQAvJ+JYKGfJcD/j8BEAonY4+D5/1//njHJRiWQMtBI2X5FieSZQWehRiECwv23bIQz447aYuPM6q6hh4gt4UzLnVo2XgWvL7wf6VGNKSo7BLan4X2Nujbwef4dwPY3FqpZ2t0+WqQaRiPQ0JVxCJRSGF4+tF/qQi8DG2oU13+PyPrv56hl7rP6GH4/E6HFwzBQnhcgO0ywEzY+POATOfM6ljh8K2MRqOUUxqOXBGNCrd7KuwwJtTiky0Ie34badKtnn7fpvmpsKP2reci8IoBQDUSyAwGrp4VUOMlrBRPHnv0pnHklhdH3QH6iMuW23AMpOW8kh8gVeo1QEQ5ASNe75/DvKOL48ptCjSNbEKM+RfmlIVyPAKLgODvb+yiocE5BHWUzOJSzPRDLNK1GAK+Q2SCGynFpWJOPCVw6lg7CeSNXnk8dHUf3Jq0Y85tCtadA/TjcUDqIvKrvEx9x8zMTJpuH86PqtewQ6oLWPIz3Okwck/k7oDIlgQA1sT1yvzn35WtyBX9Cp8ig8lW5XviPQTNkRqPgj9SHkEf1i/sBOdeNecECYJ7DjN8MFWFU9tVFdIyN8n6+jCxov9crrYzr4suCRxcE8mGaJ5R5Kn9ntPHX2CoEKMGke1lkTCxXm1ReAdW7LOejcr+qf60vvv2Y1ac0gJpHRaxNxqLa9hefqk3Vro1NrfDRfqR2lVGEjo2gVp+yjx74MUb7HACEMk+0tbV1Pt61UhOBDV6FVzV5EcYU1ZHJ1QoKKK9Tkvyh8EZztnf+y0SyZ3xpgbLLPhx8+WJ7U2TGq3Sw7LNoG3W1bN57jv3X+7F+ijYURgZ83xaFafz924q8lPIZjDUatUQRpG0AAAAASUVORK5CYII=";

		window.addEventListener('keydown', e => {
			e.preventDefault();
			if (this.controls[e.key])
				this.controls[e.key].onKeyPress();
		});

		window.addEventListener('keyup', e => {
			e.preventDefault();
			if (this.controls[e.key])
				this.controls[e.key].onKeyRelease();
		});

		window.addEventListener('resize', (e) => {
			this.ctx.canvas.width = window.innerWidth;
			this.ctx.canvas.height = window.innerHeight;
			this.ctx.scale(2, 2);
		});

		this.draw();
	}

	draw() {
		this.ctx.clearRect(0, 0, 800, 600);
		const spriteSize = 16;

		this.ctx.globalCompositeOperation = 'destination-over';


		this.ctx.drawImage(this.img, 192, 0, spriteSize, spriteSize, this.player.x, this.player.y, spriteSize, spriteSize);

		this.level.forEach((row, row_index) => {
			row.forEach((sprite_index, col_index) => {
				this.ctx.drawImage(this.img, sprite_index * spriteSize, 0, spriteSize, spriteSize, col_index * spriteSize, row_index * spriteSize, spriteSize, spriteSize);
			});
		});

		if (this.player.velocity.x !== 0 || this.player.velocity.y !== 0) {
			this.setPlayerPos(this.player.x + this.player.velocity.x, this.player.y + this.player.velocity.y);
		}

		window.requestAnimationFrame(() => this.draw());
	}

	setPlayerPos(x, y) {
		this.player.x = x;
		this.player.y = y;
	}

	setPlayerVelocity(x, y) {
		this.player.velocity = {
			x,
			y
		};
	}

	setPlayerVelocityX(x) {
		this.player.velocity = {
			...this.player.velocity,
			x
		};
	}

	setPlayerVelocityY(y) {
		this.player.velocity = {
			...this.player.velocity,
			y
		};
	}

	setPressedKeys(e) {

	}

	bindControl(keycode, onKeyPress, onKeyRelease) {
		this.controls[keycode] = {
			onKeyPress,
			onKeyRelease
		};
	}
}

const e = new Engine(document.getElementById("display"));

e.bindControl("ArrowUp",
	() => e.setPlayerVelocityY(-2),
	() => e.setPlayerVelocityY(0)
);

e.bindControl("ArrowDown",
	() => e.setPlayerVelocityY(2),
	() => e.setPlayerVelocityY(0)
);

e.bindControl("ArrowLeft",
	() => e.setPlayerVelocityX(-2),
	() => e.setPlayerVelocityX(0)
);

e.bindControl("ArrowRight",
	() => e.setPlayerVelocityX(2),
	() => e.setPlayerVelocityX(0)
);

e.init();
