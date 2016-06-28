var GameTranquiloFavoravel = GameTranquiloFavoravel || {};

/* Carregando assets do jogo */
GameTranquiloFavoravel.Preload = function(){};

GameTranquiloFavoravel.Preload.prototype = {
  preload: function() {
  	/* Mostra a loding screen */
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

  	/* Carrega os assets do jogo */
    this.load.script('player.js', 'js/HealthBar.js');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('cardio0', 'assets/cardio0.png');
    this.load.image('cardio1', 'assets/cardio1.png');
    this.load.image('cardio2', 'assets/cardio2.png');
    this.load.image('cardio3', 'assets/cardio3.png');
    this.load.image('cardio4', 'assets/cardio4.png');
    this.load.image('eye', 'assets/eye.png');
    this.load.image('eyedead', 'assets/eyedead.png');
    this.load.image('bar', 'assets/vu.png');
    this.load.image('fleche', 'assets/fleche.png');
    this.load.image('heart', 'assets/heart.png');
      this.load.image('space', 'assets/space.png');
  },
  create: function() {
    /* Muda pro MainMenu */
  	this.state.start('MainMenu');
  }
};