var GameTranquiloFavoravel = GameTranquiloFavoravel || {};

GameTranquiloFavoravel.MainMenu = function(){};

GameTranquiloFavoravel.MainMenu.prototype = {
  create: function() {
  	/* Mostra o fundo repetido */
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
    
    /* Da movimento horizontal à imagem */
    this.background.autoScroll(-20, 0);

    /* Textos do menu */
    var style = { font: "45px Arial", fill: "#fff", align: "center" };
    var text = "Jogar";
    var t = this.game.add.text(this.game.width/2, this.game.height/2 -60, text, style);
    t.anchor.set(0.5);
    var text2 = "Ajuda"
    var t2 = this.game.add.text(this.game.width/2, this.game.height/2 +60, text2, style);
    t2.anchor.set(0.5);
  },
  update: function() {
    /* Se clicou na tela, mudar pro estado Game */
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};