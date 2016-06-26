var GameTranquiloFavoravel = GameTranquiloFavoravel || {};

GameTranquiloFavoravel.Boot = function(){};

/* Carregando configurações do jogo e assets da loading screen */
GameTranquiloFavoravel.Boot.prototype = {
  preload: function() {
  	/* Assets da loading screen */
    this.load.image('logo', 'assets/logo.png');
    this.load.image('preloadbar', 'assets/preloader-bar.png');
  },
  create: function() {
  	/* Loading screen com fundo branco */
    this.game.stage.backgroundColor = '#fff';

    /* Escalas */
	this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	this.scale.minWidth = 240;
	this.scale.minHeight = 170;
	this.scale.maxWidth = 2880;
	this.scale.maxHeight = 1920;
	
	/* Centraliza o jogo horizontalmente */
	this.scale.pageAlignHorizontally = true;
    
    /* Vai para o estado "preload" */
    this.state.start('Preload');
  }
};
