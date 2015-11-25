/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _boot = __webpack_require__(1);

	var _boot2 = _interopRequireDefault(_boot);

	var _preloader = __webpack_require__(3);

	var _preloader2 = _interopRequireDefault(_preloader);

	var _game = __webpack_require__(4);

	var _game2 = _interopRequireDefault(_game);

	var _screen_utils = __webpack_require__(2);

	var _screen_utils2 = _interopRequireDefault(_screen_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* global Phaser */

	var screenDims = _screen_utils2.default.calculateScreenMetrics(800, 500, _screen_utils.Orientation.LANDSCAPE);

	var game = new Phaser.Game(screenDims.gameWidth, screenDims.gameHeight, Phaser.AUTO, 'kunio');

	game.state.add('Boot', _boot2.default);
	game.state.add('Preloader', _preloader2.default);
	game.state.add('Game', _game2.default);

	game.state.start('Boot');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _screen_utils = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Boot = (function () {
	    function Boot() {
	        _classCallCheck(this, Boot);
	    }

	    _createClass(Boot, [{
	        key: 'init',
	        value: function init(game) {
	            this.input.maxPointers = 1;
	            this.stage.disableVisibilityChange = false;

	            if (this.game.device.desktop) {
	                this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
	                this.scale.setUserScale(_screen_utils.screenDims.scaleX, _screen_utils.screenDims.scaleY);
	                this.scale.pageAlignHorizontally = true;
	                this.scale.pageAlignVertically = true;
	            } else {
	                this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
	                this.scale.setUserScale(_screen_utils.screenDims.scaleX, _screen_utils.screenDims.scaleY);
	                this.scale.pageAlignHorizontally = true;
	                this.scale.pageAlignVertically = true;
	                this.scale.forceOrientation(true, false);
	            }
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            this.state.start('Preloader');
	        }
	    }]);

	    return Boot;
	})();

	exports.default = Boot;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ScreenMetrics = (function () {
	    function ScreenMetrics() {
	        _classCallCheck(this, ScreenMetrics);
	    }

	    _createClass(ScreenMetrics, [{
	        key: 'construtor',
	        value: function construtor() {
	            this.windowWidth = null;
	            this.windowHeight = null;

	            this.defaultGameWidth = null;
	            this.defaultGameHeight = null;
	            this.maxGameWidth = null;
	            this.maxGameHeight = null;

	            this.gameWidth = null;
	            this.gameHeight = null;
	            this.scaleX = null;
	            this.scaleY = null;
	            this.offsetX = null;
	            this.offsetY = null;
	        }
	    }]);

	    return ScreenMetrics;
	})();

	var screenDims = exports.screenDims = new ScreenMetrics();

	var Orientation = exports.Orientation = { PORTRAIT: Symbol('PORTRAIT'), LANDSCAPE: Symbol('LANDSCAPE') };

	exports.default = {
	    calculateScreenMetrics: function calculateScreenMetrics(aDefaultWidth, aDefaultHeight) {
	        var aOrientation = arguments.length <= 2 || arguments[2] === undefined ? Orientation.LANDSCAPE : arguments[2];
	        var aMaxGameWidth = arguments[3];
	        var aMaxGameHeight = arguments[4];

	        // get dimension of window
	        var windowWidth = window.innerWidth;
	        var windowHeight = window.innerHeight;

	        // swap if window dimensions do not match orientation
	        if (windowWidth < windowHeight && aOrientation === Orientation.LANDSCAPE || windowHeight < windowWidth && aOrientation === Orientation.PORTRAIT) {
	            var tmp = windowWidth;
	            windowWidth = windowHeight;
	            windowHeight = tmp;
	        }

	        // calculate max game dimension. The bounds are iPad and iPhone
	        if (typeof aMaxGameWidth === "undefined" || typeof aMaxGameHeight === "undefined") {
	            if (aOrientation === Orientation.LANDSCAPE) {
	                aMaxGameWidth = Math.round(aDefaultWidth * 1420 / 1280);
	                aMaxGameHeight = Math.round(aDefaultHeight * 960 / 800);
	            } else {
	                aMaxGameWidth = Math.round(aDefaultWidth * 960 / 800);
	                aMaxGameHeight = Math.round(aDefaultHeight * 1420 / 1280);
	            }
	        }

	        // default aspect and current window aspect
	        var defaultAspect = aOrientation === Orientation.LANDSCAPE ? 1280 / 800 : 800 / 1280;
	        var windowAspect = windowWidth / windowHeight;

	        var offsetX = 0;
	        var offsetY = 0;
	        var gameWidth = 0;
	        var gameHeight = 0;

	        // if (aOrientation === Orientation.LANDSCAPE) {
	        // "iPhone" landscape ... and "iPad" portrait
	        if (windowAspect > defaultAspect) {
	            gameHeight = aDefaultHeight;
	            gameWidth = Math.ceil(gameHeight * windowAspect / 2.0) * 2;
	            gameWidth = Math.min(gameWidth, aMaxGameWidth);
	            offsetX = (gameWidth - aDefaultWidth) / 2;
	            offsetY = 0;
	        } else {
	            // "iPad" landscpae ... and "iPhone" portrait
	            gameWidth = aDefaultWidth;
	            gameHeight = Math.ceil(gameWidth / windowAspect / 2.0) * 2;
	            gameHeight = Math.min(gameHeight, aMaxGameHeight);
	            offsetX = 0;
	            offsetY = (gameHeight - aDefaultHeight) / 2;
	        }
	        /* } else {    // "iPhone" portrait
	            if (windowAspect < defaultAspect) {
	                gameWidth = aDefaultWidth;
	                gameHeight = gameWidth / windowAspect;
	                gameHeight = Math.min(gameHeight, aMaxGameHeight);
	                offsetX = 0;
	                offsetY = (gameHeight - aDefaultHeight) / 2;
	            } else {    // "iPad" portrait
	                gameHeight = aDefaultHeight;
	                gameWidth = gameHeight = windowAspect;
	                gameWidth = Math.min(gameWidth, aMaxGameWidth);
	                offsetX = (gameWidth - aDefaultWidth) / 2;
	                offsetY = 0;
	            }
	        }
	        */

	        // calculate scale
	        var scaleX = windowWidth / gameWidth;
	        var scaleY = windowHeight / gameHeight;

	        // store values
	        exports.screenDims = screenDims = new ScreenMetrics();
	        screenDims.windowWidth = windowWidth;
	        screenDims.windowHeight = windowHeight;

	        screenDims.defaultGameWidth = aDefaultWidth;
	        screenDims.defaultGameHeight = aDefaultHeight;
	        screenDims.maxGameWidth = aMaxGameWidth;
	        screenDims.maxGameHeight = aMaxGameHeight;

	        screenDims.gameWidth = gameWidth;
	        screenDims.gameHeight = gameHeight;
	        screenDims.scaleX = scaleX;
	        screenDims.scaleY = scaleY;
	        screenDims.offsetX = offsetX;
	        screenDims.offsetY = offsetY;

	        return screenDims;
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Preloader = (function () {
	    function Preloader() {
	        _classCallCheck(this, Preloader);
	    }

	    _createClass(Preloader, [{
	        key: 'preload',
	        value: function preload() {
	            this.load.atlasJSONHash('kunio', 'assets/kunio.png', 'assets/kunio.json');
	            this.load.image('tile', 'assets/tile.png');
	            this.load.image('bg', 'assets/bg.jpg');
	            this.load.image('platform', 'assets/platform.png');
	            this.load.image('platform_ice', 'assets/platform_ice.png');
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            this.state.start('Game');
	        }
	    }]);

	    return Preloader;
	})();

	exports.default = Preloader;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _screen_utils = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = (function () {
	    function Game() {
	        _classCallCheck(this, Game);
	    }

	    _createClass(Game, [{
	        key: 'init',
	        value: function init() {
	            this.physics.startSystem(Phaser.Physics.ARCADE);
	            this.physics.arcade.gravity.y = 750;
	            this.physics.arcade.skipQuadTree = false;
	            this.game.renderer.renderSession.roundPixels = true;
	            this.world.resize(2000, 600);
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            this.bgtile = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bg');
	            this.bgtile.tilePosition.set(0, this.world.height);
	            this.bgtile.position.set(0, this.world.height);
	            this.bgtile.anchor.set(0, 1);
	            this.bgtile.fixedToCamera = true;

	            this.player = this.add.sprite(200, 200, 'kunio');
	            this.player.animations.add('left', [0, 1, 2], 10, true);
	            this.player.animations.add('right', [3, 4, 5], 10, true);

	            this.camera.follow(this.player);

	            this.physics.arcade.enable(this.player);
	            this.player.body.collideWorldBounds = true;
	            this.player.body.bounce.set(0.2);
	            this.player.position.set(0, this.world.height - 200);

	            this.platforms = this.add.physicsGroup();

	            for (var i = 0; i < 10; i++) {
	                var x = i * 250;
	                var y = this.world.height - 50 - this.rnd.between(0, 50);
	                this.platforms.create(x, y, ~ ~this.rnd.between(0, 2) == 1 ? 'platform' : 'platform_ice');
	            }

	            this.platforms.setAll('body.allowGravity', false);
	            this.platforms.setAll('body.immovable', true);

	            this.cursors = this.input.keyboard.createCursorKeys();
	            this.keys = this.input.keyboard.addKeys({
	                spacebar: Phaser.Keyboard.SPACEBAR
	            });
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            this.physics.arcade.collide(this.player, this.platforms);
	            this.bgtile.tilePosition.x = -(this.camera.x * 0.1);

	            this.physics.arcade.collide(this.player, this.platforms, this.setFriction, null, this);

	            this.player.body.velocity.x = 0;

	            var standing = this.player.body.blocked.down || this.player.body.touching.down;

	            if (this.cursors.left.isDown) {
	                this.player.body.velocity.x = -200;
	                this.player.animations.play('left');
	            } else if (this.cursors.right.isDown) {
	                this.player.body.velocity.x = 200;
	                this.player.animations.play('right');
	            } else {
	                this.player.animations.stop();
	            }

	            if (this.keys.spacebar.isDown && standing) {
	                this.player.body.velocity.y = -300;
	            }
	        }
	    }, {
	        key: 'setFriction',
	        value: function setFriction(player, platform) {
	            if (platform.key === 'platform_ice') {}
	        }
	    }]);

	    return Game;
	})();

	exports.default = Game;

/***/ }
/******/ ]);