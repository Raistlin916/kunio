!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="/out/",t(0)}([function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}var n=i(1),r=a(n),s=i(3),o=a(s),l=i(4),c=a(l),u=i(2),h=a(u),d=window.innerWidth,f=window.innerHeight;d>f?(d=600,f=300):(d=300,f=600);var p=h["default"].calculateScreenMetrics(d,f,d>f?u.Orientation.LANDSCAPE:u.Orientation.PORTRAIT),y=new Phaser.Game(p.gameWidth,p.gameHeight,Phaser.AUTO,"game-wrap");y.state.add("Boot",r["default"]),y.state.add("Preloader",o["default"]),y.state.add("Game",c["default"]),y.state.start("Boot")},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var r=i(2),s=function(){function e(){a(this,e)}return n(e,[{key:"init",value:function(e){this.input.maxPointers=1,this.stage.disableVisibilityChange=!1,this.game.device.desktop?(this.scale.scaleMode=Phaser.ScaleManager.USER_SCALE,this.scale.setUserScale(r.screenDims.scaleX,r.screenDims.scaleY),this.scale.pageAlignHorizontally=!0,this.scale.pageAlignVertically=!0):(this.scale.scaleMode=Phaser.ScaleManager.USER_SCALE,this.scale.setUserScale(r.screenDims.scaleX,r.screenDims.scaleY),this.scale.pageAlignHorizontally=!0,this.scale.pageAlignVertically=!0,this.scale.forceOrientation(!0,!1))}},{key:"create",value:function(){this.game.stage.backgroundColor="#fff",this.state.start("Preloader")}}]),e}();t["default"]=s},function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){i(this,e)}return a(e,[{key:"construtor",value:function(){this.windowWidth=null,this.windowHeight=null,this.defaultGameWidth=null,this.defaultGameHeight=null,this.maxGameWidth=null,this.maxGameHeight=null,this.gameWidth=null,this.gameHeight=null,this.scaleX=null,this.scaleY=null,this.offsetX=null,this.offsetY=null}}]),e}(),r=t.screenDims=new n,s=t.Orientation={PORTRAIT:Symbol("PORTRAIT"),LANDSCAPE:Symbol("LANDSCAPE")};t["default"]={calculateScreenMetrics:function(e,i){var a=arguments.length<=2||void 0===arguments[2]?s.LANDSCAPE:arguments[2],o=arguments[3],l=arguments[4],c=window.innerWidth,u=window.innerHeight;if(u>c&&a===s.LANDSCAPE||c>u&&a===s.PORTRAIT){var h=c;c=u,u=h}("undefined"==typeof o||"undefined"==typeof l)&&(a===s.LANDSCAPE?(o=Math.round(1420*e/1280),l=Math.round(960*i/800)):(o=Math.round(960*e/800),l=Math.round(1420*i/1280)));var d=a===s.LANDSCAPE?1.6:.625,f=c/u,p=0,y=0,m=0,g=0;f>d?(g=i,m=2*Math.ceil(g*f/2),m=Math.min(m,o),p=(m-e)/2,y=0):(m=e,g=2*Math.ceil(m/f/2),g=Math.min(g,l),p=0,y=(g-i)/2);var v=c/m,w=u/g;return t.screenDims=r=new n,r.windowWidth=c,r.windowHeight=u,r.defaultGameWidth=e,r.defaultGameHeight=i,r.maxGameWidth=o,r.maxGameHeight=l,r.gameWidth=m,r.gameHeight=g,r.scaleX=v,r.scaleY=w,r.offsetX=p,r.offsetY=y,r}}},function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){i(this,e)}return a(e,[{key:"preload",value:function(){this.load.atlasJSONHash("mingren","assets/mingren.png","assets/mingren.json"),this.load.spritesheet("coin","assets/coin.png",24,24),this.load.spritesheet("platform_ice_sheet","assets/platform_ice.png",32,32),this.load.spritesheet("platform_sheet","assets/platform.png",35,32),this.load.image("bg","assets/bg.jpg"),this.load.image("platform","assets/platform.png"),this.load.image("platform_ice","assets/platform_ice.png"),this.load.bitmapFont("carrier_command","assets/carrier_command.png","assets/carrier_command.xml"),this.load.onFileComplete.add(this.onFileLoaded,this),this.loadingProgress=document.querySelector(".loading-progress")}},{key:"create",value:function(){var e=this,t=document.querySelector(".loading-wrap"),i=document.getElementById("game-wrap");setTimeout(function(){t.remove()},1e3),setTimeout(function(){i.classList.add("fade-in")},400),setTimeout(function(){t.classList.add("fade-out"),e.state.start("Game")},300)}},{key:"onFileLoaded",value:function(e,t,i,a,n){this.loadingProgress.innerText=e+"%"}}]),e}();t["default"]=n},function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var s=(i(2),i(5)),o=a(s),l=i(6),c=a(l),u=function(){function e(t){n(this,e),this.group=t,this.record=t.length,this.lastOne=null}return r(e,[{key:"update",value:function(e){var t=0;this.group.children.forEach(function(i){var a=i.getBounds();a.left>e.width&&t++,a.right<0&&i.destroy()}),2>t&&(this.lastOne=this.createOne(),this.group.add(this.lastOne))}},{key:"bindCreateMethod",value:function(e){var t=this;this.createOne=function(){var i=t.group.length,a=e(t.record,t.lastOne);return t.record+=t.group.length-i,a}}}]),e}(),h=function(){function e(){n(this,e)}return r(e,[{key:"init",value:function(){this.physics.startSystem(Phaser.Physics.ARCADE),this.physics.arcade.gravity.y=750,this.physics.arcade.skipQuadTree=!1,this.game.renderer.renderSession.roundPixels=!0,this.originWidth=this.camera.width,this.world.resize(3*this.originWidth,this.camera.height),this.score=0}},{key:"create",value:function(){var e=this;this.bgtile=this.add.tileSprite(0,0,this.world.width,this.world.height,"bg"),this.bgtile.tilePosition.set(0,this.world.height),this.bgtile.position.set(0,this.world.height),this.bgtile.anchor.set(0,1),this.bgtile.fixedToCamera=!0,this.player=this.add.sprite(50,this.world.height-200,"mingren"),this.player.anchor.set(1,1),this.player.animations.add("standing",[0,1,2,3],10,!0),this.player.animations.add("walk",[4,5,6,7,8,9,10],10,!0),this.player.animations.add("jump_up",[14,15],4,!1),this.player.animations.add("jump_down",[16,17],4,!1),this.player.animations.add("fail",[19,20,21,22],5,!1),this.player.animations.add("fail_after",[23,24],4,!0),this.player.smoothed=!1,this.physics.arcade.enable(this.player),this.player.body.collideWorldBounds=!0;var t=this.add.physicsGroup(),i=new o["default"](this.game);this.platformsFac=new u(t),this.platformsFac.bindCreateMethod(function(t,a){var n=e.add.physicsGroup(),r=a?a.x+a.width+150:0;n.position.set(r,e.world.height-100);var s=i.create();return s.forEach(function(t,i){var a=e.add.sprite(t.x,t.y,t.type,t.index);n.add(a)}),n.setAll("body.allowGravity",!1),n.setAll("body.immovable",!0),n});var a=this.add.physicsGroup(),n=new c["default"](this.game);this.coinsFac=new u(a),this.coinsFac.bindCreateMethod(function(t,i){var a=e.add.physicsGroup(),r=i?i.x+i.width+500:500;a.position.set(r,e.world.height-150);var s=n.create();return s.forEach(function(e){a.create(e.x,e.y,e.type)}),a.callAll("animations.add","animations","flash"),a.callAll("play",null,"flash",10,!0),a.setAll("body.allowGravity",!1),a.setAll("body.immovable",!0),a}),this.keys=this.input.keyboard.addKeys({spacebar:Phaser.Keyboard.SPACEBAR}),this.scoreText=this.add.bitmapText(10,10,"carrier_command","score:"+this.score,18),this.scoreText.tint=2241348,this.scoreText.fixedToCamera=!0,this.playFail=!1,this.cameraFollow()}},{key:"update",value:function(){var e=this;this.cameraFollow(),this.bgtile.tilePosition.x=-(.03*this.camera.x),this.player.alive?(this.player.body.velocity.x=300,this.player.animations.play("walk")):(this.player.body.velocity.x=0,this.playFail||(this.player.animations.play("fail"),this.player.animations.currentAnim.onComplete.addOnce(function(){e.player.animations.play("fail_after"),e.input.onDown.add(function(){e.state.start("Game")})}),this.playFail=!0));var t=!1;this.platformsFac.group.forEach(function(i){var a=e.physics.arcade.collide(e.player,i,e.onCollidePlatform,null,e);a&&(t=a)}),this.coinsFac.group.forEach(function(t){e.physics.arcade.overlap(e.player,t,e.eatCoin,null,e)});var i=this.player.body.blocked.down||this.player.body.touching.down&&t;i||this.player.animations.play("jump_"+(this.player.body.velocity.y>0?"down":"up")),this.inputJump()&&i&&this.player.alive&&(this.player.body.velocity.y=-300),this.player.body.blocked.down&&this.dead(),this.platformsFac.update(this.camera),this.coinsFac.update(this.camera),this.world.width-this.player.x<this.originWidth&&this.world.resize(this.world.width+this.originWidth,this.world.height)}},{key:"dead",value:function(){this.player.alive=!1}},{key:"inputJump",value:function(){return this.input.pointer1.isDown||this.keys.spacebar.isDown||this.input.mousePointer.isDown}},{key:"onCollidePlatform",value:function(e,t){"platform_ice_sheet"===t.key&&(this.player.body.velocity.x*=1.5)}},{key:"eatCoin",value:function(e,t){t.kill(),this.score+=10,this.scoreText.setText("score:"+this.score)}},{key:"cameraFollow",value:function(){this.camera.focusOnXY(this.player.x+this.camera.width/2-50,this.player.y)}}]),e}();t["default"]=h},function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var n={xs:2,s:3,m:5,l:10,xl:15,xxl:20};for(var r in n){var s=new Array(n[r]);s.fill(1),s.unshift(0),s.push(3),n[r]=s}var o=["s,xs,s,xs","m,l","m,xs,xs,xs,l","s,s,m,s,s,l"];o.forEach(function(e,t,i){i[t]=e.split(",")});var l=function(){function e(t){i(this,e),this.game=t,this.rnd=t.rnd,this.queue="xxl,m,m,xs,xs,xs,m".split(",")}return a(e,[{key:"create",value:function(){var e=void 0;if(!this.queue.length){var t=this.rnd.integerInRange(0,o.length-1);this.queue=Array.from(o[t])}e=this.queue.shift();var i=this.rnd.integerInRange(-30,30),a=1==this.rnd.integerInRange(0,1)?"platform_sheet":"platform_ice_sheet";return n[e].map(function(e,t){return{x:32*t,y:i,type:a,index:e}})}}]),e}();t["default"]=l},function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var n={line:"ccccc",twoLine:"\nccccc\nccccc",square:"\nccc\nccc\nccc"},r={c:"coin"},s=Object.keys(n).map(function(e){return n[e].split("\n")});s.forEach(function(e,t,i){i[t]=e.filter(function(e,t){return 0==t&&0==e.length?!1:!0})});var o=function(){function e(t){i(this,e),this.game=t,this.rnd=t.rnd}return a(e,[{key:"create",value:function(){for(var e=this.rnd.integerInRange(0,s.length-1),t=s[e],i=[],a=0;a<t.length;a++)for(var n=t[a],o=0;o<n.length;o++){var l=30*o,c=30*a,u=r[n[o]];i.push({x:l,y:c,type:u})}return i}}]),e}();t["default"]=o}]);