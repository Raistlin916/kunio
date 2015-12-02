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
/******/ 	__webpack_require__.p = "/out/";

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

	var screenDims = _screen_utils2.default.calculateScreenMetrics(document.documentElement.clientWidth, document.documentElement.clientHeight, _screen_utils.Orientation.PORTRAIT);

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

	        if (aOrientation === Orientation.LANDSCAPE) {
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
	        } else {
	            // "iPhone" portrait
	            if (windowAspect < defaultAspect) {
	                gameWidth = aDefaultWidth;
	                gameHeight = gameWidth / windowAspect;
	                gameHeight = Math.min(gameHeight, aMaxGameHeight);
	                offsetX = 0;
	                offsetY = (gameHeight - aDefaultHeight) / 2;
	            } else {
	                // "iPad" portrait
	                gameHeight = aDefaultHeight;
	                gameWidth = gameHeight = windowAspect;
	                gameWidth = Math.min(gameWidth, aMaxGameWidth);
	                offsetX = (gameWidth - aDefaultWidth) / 2;
	                offsetY = 0;
	            }
	        }

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
	            this.load.atlasJSONHash('mingren', 'assets/mingren.png', 'assets/mingren.json');
	            this.load.spritesheet('coin', 'assets/coin.png', 24, 24);
	            this.load.spritesheet('platform_ice_sheet', 'assets/platform_ice.png', 32, 32);
	            this.load.spritesheet('platform_sheet', 'assets/platform.png', 35, 32);
	            this.load.image('bg', 'assets/bg.jpg');
	            this.load.image('platform', 'assets/platform.png');
	            this.load.image('platform_ice', 'assets/platform_ice.png');
	            this.load.bitmapFont('carrier_command', 'assets/carrier_command.png', 'assets/carrier_command.xml');
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

	var _platform_generator = __webpack_require__(5);

	var _platform_generator2 = _interopRequireDefault(_platform_generator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupFactory = (function () {
	    function GroupFactory(group) {
	        _classCallCheck(this, GroupFactory);

	        this.group = group;
	        this.record = group.length;
	        this.lastOne = null;
	    }

	    _createClass(GroupFactory, [{
	        key: 'update',
	        value: function update(camera) {
	            var cacheItemCount = 0;
	            this.group.children.forEach(function (item) {
	                var groundBounds = item.getBounds();

	                if (groundBounds.left > camera.width) {
	                    cacheItemCount++;
	                }

	                if (groundBounds.right < 0) {
	                    item.destroy();
	                }
	            });

	            if (cacheItemCount < 2) {
	                this.lastOne = this.createOne();
	            }
	        }
	    }, {
	        key: 'bindCreateMethod',
	        value: function bindCreateMethod(cb) {
	            var _this = this;

	            this.createOne = function () {
	                var oldLength = _this.group.length;
	                var result = cb(_this.record, _this.lastOne);
	                _this.record += _this.group.length - oldLength;

	                return result;
	            };
	        }
	    }]);

	    return GroupFactory;
	})();

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
	            this.originWidth = this.camera.width;
	            this.world.resize(this.originWidth * 3, 600);
	            this.score = 0;
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            var _this2 = this;

	            this.bgtile = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bg');
	            this.bgtile.tilePosition.set(0, this.world.height);
	            this.bgtile.position.set(0, this.world.height);
	            this.bgtile.anchor.set(0, 1);
	            this.bgtile.fixedToCamera = true;

	            this.player = this.add.sprite(200, 200, 'mingren');
	            this.player.anchor.set(1, 1);

	            this.player.animations.add('standing', [0, 1, 2, 3], 10, true);
	            this.player.animations.add('walk', [4, 5, 6, 7, 8, 9, 10], 10, true);
	            this.player.animations.add('jump_up', [14, 15], 4, false);
	            this.player.animations.add('jump_down', [16, 17], 4, false);
	            this.player.smoothed = false;

	            this.camera.follow(this.player);

	            this.physics.arcade.enable(this.player);
	            this.player.body.collideWorldBounds = true;
	            this.player.position.set(0, this.world.height - 200);

	            var platforms = this.add.physicsGroup();
	            var platformGenerator = new _platform_generator2.default(this.game);
	            this.platformsFac = new GroupFactory(platforms);
	            this.platformsFac.bindCreateMethod(function (recordLength, lastOne) {
	                var group = _this2.add.physicsGroup();
	                var platformData = platformGenerator.create();
	                platformData.array.forEach(function (index, i) {
	                    var sprite = _this2.add.sprite(i * 32, platformData.y, platformData.type, index);
	                    group.add(sprite);
	                });
	                group.setAll('body.allowGravity', false);
	                group.setAll('body.immovable', true);

	                var x = lastOne ? lastOne.x + lastOne.width + 100 : 0;
	                group.position.set(x, _this2.world.height - 100);
	                _this2.platformsFac.group.add(group);
	                return group;
	            });

	            var coinsGroup = this.add.physicsGroup();
	            this.coinsFac = new GroupFactory(coinsGroup);
	            this.coinsFac.bindCreateMethod(function (recordLength, lastOne) {
	                var group = _this2.add.physicsGroup();
	                var x = lastOne ? lastOne.x + lastOne.width + 500 : 500;
	                group.position.set(x, _this2.world.height - 150);
	                for (var i = 0; i < 10; i++) {
	                    var _x = i * 30;
	                    var y = 0;
	                    group.create(_x, y, 'coin');
	                }
	                group.callAll('animations.add', 'animations', 'flash');
	                group.callAll('play', null, 'flash', 10, true);
	                group.setAll('body.allowGravity', false);
	                group.setAll('body.immovable', true);
	                _this2.coinsFac.group.add(group);

	                return group;
	            });

	            this.cursors = this.input.keyboard.createCursorKeys();
	            this.keys = this.input.keyboard.addKeys({
	                spacebar: Phaser.Keyboard.SPACEBAR
	            });

	            this.scoreText = this.add.bitmapText(10, 10, 'carrier_command', 'score:' + this.score, 18);
	            this.scoreText.tint = 0x223344;
	            this.scoreText.fixedToCamera = true;
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var _this3 = this;

	            this.bgtile.tilePosition.x = -(this.camera.x * 0.03);

	            if (this.player.alive) {
	                this.player.body.velocity.x = 200;
	                this.player.animations.play('walk');
	            } else {
	                this.player.body.velocity.x = 0;
	                this.player.animations.play('standing');
	            }

	            var touchPlatform = false;

	            this.platformsFac.group.forEach(function (platform) {
	                var result = _this3.physics.arcade.collide(_this3.player, platform, _this3.onCollidePlatform, null, _this3);
	                if (result) {
	                    touchPlatform = result;
	                }
	            });

	            this.coinsFac.group.forEach(function (coinsGroup) {
	                _this3.physics.arcade.overlap(_this3.player, coinsGroup, _this3.eatCoin, null, _this3);
	            });

	            var standing = this.player.body.blocked.down || this.player.body.touching.down && touchPlatform;
	            if (!standing) {
	                this.player.animations.play('jump_' + (this.player.body.velocity.y > 0 ? 'down' : 'up'));
	            }

	            if (this.keys.spacebar.isDown && standing && this.player.alive) {
	                this.player.body.velocity.y = -300;
	            }

	            if (this.player.body.blocked.down) {
	                this.dead();
	            }

	            this.platformsFac.update(this.camera);
	            this.coinsFac.update(this.camera);

	            if (this.world.width - this.player.x < this.originWidth) {
	                this.world.resize(this.world.width + this.originWidth, this.world.height);
	            }
	        }
	    }, {
	        key: 'dead',
	        value: function dead() {
	            this.player.alive = false;
	        }
	    }, {
	        key: 'onCollidePlatform',
	        value: function onCollidePlatform(player, platform) {
	            if (platform.key === 'platform_ice_sheet') {
	                this.player.body.velocity.x *= 1.5;
	            }
	        }
	    }, {
	        key: 'eatCoin',
	        value: function eatCoin(player, coin) {
	            coin.kill();
	            this.score += 10;
	            this.scoreText.setText('score:' + this.score);
	        }
	    }]);

	    return Game;
	})();

	exports.default = Game;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var platformLibrary = [2, 5, 10, 20];

	platformLibrary.forEach(function (item, index) {
	    var a = new Array(item);
	    a.fill(1);
	    a.unshift(0);
	    a.push(3);
	    platformLibrary[index] = a;
	});

	var PlatformGenerator = (function () {
	    function PlatformGenerator(game) {
	        _classCallCheck(this, PlatformGenerator);

	        this.game = game;
	        this.rnd = game.rnd;
	    }

	    _createClass(PlatformGenerator, [{
	        key: 'create',
	        value: function create() {
	            var dataIndex = this.rnd.integerInRange(0, platformLibrary.length - 1);
	            return {
	                array: platformLibrary[dataIndex],
	                type: this.rnd.integerInRange(0, 1) == 1 ? 'platform_sheet' : 'platform_ice_sheet',
	                y: this.rnd.integerInRange(-30, 30)
	            };
	        }
	    }]);

	    return PlatformGenerator;
	})();

	exports.default = PlatformGenerator;

/***/ }
/******/ ]);