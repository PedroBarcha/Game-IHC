var GameTranquiloFavoravel = GameTranquiloFavoravel || {};

GameTranquiloFavoravel.game = new Phaser.Game(1400, 800, Phaser.AUTO, '');

GameTranquiloFavoravel.game.state.add('Boot', GameTranquiloFavoravel.Boot);
GameTranquiloFavoravel.game.state.add('Preload', GameTranquiloFavoravel.Preload);
GameTranquiloFavoravel.game.state.add('MainMenu', GameTranquiloFavoravel.MainMenu);
GameTranquiloFavoravel.game.state.add('Game', GameTranquiloFavoravel.Game);

GameTranquiloFavoravel.game.state.start('Boot');