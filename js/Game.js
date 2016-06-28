var GameTranquiloFavoravel = GameTranquiloFavoravel || {};

var ball;
var health;
var loopTimer;
var timerInicio;
var push;
var count;
var stateText;
var space;
var play;
var back0;
var back1;
var back2;
var back3;
var back4;
var table;
var impulse;
var sens;
var state;
var fleche;
var massage;
var eye;
var eyedead;
var tempoTimer;
var game;
var activeBackground;

GameTranquiloFavoravel.Game = function(){};

/* Retorna a distancia entre a bola e o centro da barra : 0 < dist < 100*/
function getDistanceFromMiddle(){
    return Math.abs(ball.x-back0.width/2)/1.5;
}

/* Ajusta a posição da bolinha */
function placeBall(x){
    var sens = count%2;
    ball.x = getOrdBall(x,sens);
}

/* Ajusta a posição da bolinha */
function getOrdBall(val, sens){
    var base = 800/2 +150;
    if(sens == 0)
        return (3/10)*val+base;
    else
        return (-3/10)*val+base+300;

}

/* É chamado quando o cronômetro do início acaba para tirar o texto da tela */
function endTimer() {
        /* Pára o timer */
        timerInicio.stop();
        /* Esconde o texto do cronômetro */
        stateText.visible = false;
        /* Marca que o jogo iniciou */
        play = 1;
}

/* Atualiza contador e reduz a vida */
function updateCounter(){
    if(play == 1){
        count+=1;
        health -= 3;
    }
}

function setImage(imaA,imaN){
    imaA.visible = false;
    imaN.visible = true;
}

function moveArms() {
    if(impulse){
        if(state<4){
            if(sens==0){
                if(massage){
                     setImage(table[state][0],table[state][1]);
                }else{
                    fleche.y +=20;
                }
                state+=1;
            }else{
                if(massage){
                    setImage(table[state][1],table[state][0]);
                }else{
                    fleche.y -=20;
                }
                if(state == 1){
                    impulse = false;
                    sens = 0;
                    fleche.y = 200;
                }
                state -=1;
            }
        }
        else{
            state-=1;
            if(massage){
                setImage(table[state][1],table[state][0]);
            }
            else{
                fleche.y -=20;
            }
            state -=1;
            sens = 1;
        }
    }
}

GameTranquiloFavoravel.Game.prototype = {
    preload: function() {
        game = this;
        back0 = this.add.image(0,0,"cardio0");
        back1 = this.add.image(0,0,"cardio1");
        back2 = this.add.image(0,0,"cardio2");
        back3 = this.add.image(0,0,"cardio3");
        back4 = this.add.image(0,0,"cardio4");
    },

  create: function() {
    /* Inicializações */
    health=25;
    count = 0;
    play = 0;
    impulse = false;
    sens = 0;
    state = 0;
    massage = 1;
    tempoTimer = 2; //DEBUG - depois mudar para 5

    /* Listener da barra de espaço do teclado */
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    /* Background 0 */
    back0.scale.set(800/back0.height);
    back0.width = 1400;

    /* Background 1 */
    back1.scale.set(800/back1.height);
    back1.width = 1400;
    back1.visible = false;

    /* Background 1 */
    back2.scale.set(800/back2.height);
    back2.width = 1400;
    back2.visible = false;

      /* Background 3 */
    back3.scale.set(800/back3.height);
    back3.width = 1400;
    back3.visible = false;

      /* Background 4 */
    back4.scale.set(800/back4.height);
    back4.width = 1400;
    back4.visible = false;

    table = [[back0,back1],[back1,back2],[back2,back3],[back3,back4]];

    /* Barra  1 */
    var bar = this.add.sprite(1400/2+150, 800 * 3/4, "bar");
    bar.width =150;
    bar.height =40;
    bar.scale.x *= -1;

    /* Barra 2 */
    var bar2 = this.add.sprite(1400/2-150, 800 * 3/4, "bar");
    bar2.width = 150;
    bar2.height = 40;

    /* Olhos */
    eye = this.add.sprite(60, 590, "eye");
    eye.width = 50;
    eye.height = 50;
    eye.visible = false;

    /* Dead eyes */
    eyedead = this.add.sprite(60, 590, "eyedead");
    eyedead.width = 50;
    eyedead.height = 50;
    eyedead.visible = false;

    /* Barrinha de vida */
    this.myHealthBar = new HealthBar(this.game, {x: 1200, y: 75, bg: {color: '#FF0000'},bar: {color: '#00FF00'}});

    /* Coração 1 */
    var heart = this.add.sprite(1400/2,800*3/4-15,"heart");
    heart.anchor.set(0.5,0);
    heart.width = heart.width/64;
    heart.height = heart.height/64;

    /* Coração 2 */
    var heart2 = this.add.sprite(1400/2,800*3/4+25,"heart");
    heart2.anchor.set(0.5,1);
    heart2.width = heart2.width/64;
    heart2.height = heart2.height/64;
    heart2.scale.y *= -1;

    /* Flecha */
    fleche = this.add.sprite(150,200,"fleche");

    /* Bolinha */
    ball = this.add.sprite(700,400, "ball");
    ball.width = 20;
    ball.height = 20;
    ball.anchor.set(0.5);
    ball.y = 800*3/4 + 20;

    /* Texto principal que fica no meio da tela */
    stateText = this.add.text(this.world.centerX,this.world.centerY,' ', { font: '50px Arial', fill: '#000' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = true;

    // Timer tempo até início
    timerInicio = this.time.create();
    timerEvent = timerInicio.add(Phaser.Timer.SECOND * tempoTimer, endTimer, this);
    // Start the timer
    timerInicio.start();

    /* Timer que fica no loop */
    loopTimer = this.time.create(false);
    loopTimer.loop(1000, updateCounter, this);
    loopTimer.start();
  },
  update: function() {

        /* O cronômetro ainda está rodando, mostrar o tempo na tela */
        if(timerInicio.running) {
            stateText.text = parseInt(tempoTimer - timerInicio.ms/1000);
        }
        /* Aqui o jogo já começou e está rodando */
        else if(play ==1){
            /* A barra de vida encheu. Ganhou o jogo. */
            if (health>100){
                eye.visible = true;
                stateText.text="Parabéns! Você salvou a vida do paciente! \n Aperte esc para voltar ao menu.";
                stateText.visible = true;
                /* Apertou esc, voltar para o menu */
                if(this.escKey.isDown) {
                  this.state.start('MainMenu');
                }
            }
            /* A barra de vida esvaziou. Perdeu o jogo. */
            else if(health<0){
                eyedead.visible = true;
                stateText.text="Você não conseguiu salvar a vida do paciente... \n Aperte esc para voltar ao menu.";
                stateText.visible = true;
                /*  Apertou esc, voltar para o menu */
                if(this.escKey.isDown) {
                  this.state.start('MainMenu');
                }
            }
            /* Aqui a barra de vida ainda não está completa e nem vazia. O jogo está rolando. */
            else if(health >= 0 && health <=100) {

                /* Faz a bolinha se mexer */
                placeBall(loopTimer.duration.toFixed(0));

                /* Verifica se clicou na hora certa. */
                if (this.spaceKey.isDown){
                  impulse = true;
                  /* Acertou! Clicou no verdinho */
                  dist  = getDistanceFromMiddle();
                  if(dist<5){
                      health += 20;
                  }
                  /* Clicou fora do verde... Errou! */
                  else if(dist<10){
                      health += 10;
                  }
                  else if(dist<25){
                      health += 5;
                  }
                  else if(dist>75){
                      health -= 40;
                  }
                  else{
                      health -= 20;
                  }

                }
                moveArms();
                /* Ajusta a barra de vida */
                this.myHealthBar.setPercent(health);
            }
        }
  },
};
