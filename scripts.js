console.log("AUUU");

const sprites = new Image();
sprites.src = './rlksprites.png'; // Origem das imagens

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


const somHit = new Audio();
somHit.src = './efeitos/efeitos_hit.wav'
const somPulo = new Audio('./efeitos/efeitos_pulo.wav');
const somPonto = new Audio('./efeitos/efeitos_ponto.wav');



function criaChao(){
const chao = {
    spriteX: 635,
    spriteY: 200,
    largura: 350,
    altura: 292,
    x: 0,
    y: canvas.height - 132,
    atualizar(){
        const movimentoChao = 1;
        const repeteChao = chao.largura / 2;
        const movimentacao = chao.x - movimentoChao;
        chao.x = movimentacao % repeteChao;
    },

desenhar(){ // Função para mostrar o chão
    contexto.drawImage(
    sprites,
    chao.spriteX, chao.spriteY, // Sprite X, Sprite Y
    chao.largura, chao.altura, // Tamanho do recorte da Sprite
    chao.x, chao.y,
    chao.largura, chao.altura,
);
    contexto.drawImage(
    sprites,
    chao.spriteX, chao.spriteY, // Sprite X, Sprite Y
    chao.largura, chao.altura, // Tamanho do recorte da Sprite
    (chao.x + chao.largura), chao.y,
    chao.largura, chao.altura,
);
    }
}
    return chao;
}

function colisao(legendaryBird, chao){ // Função para calcular a colisão
    const birdY = legendaryBird.y + legendaryBird.altura;
    const chaoY = chao.y;

    if(birdY >= chaoY){
        return true;
    }
    return false;
    }


const planoFundo = {
    spriteX: 280,
    spriteY: 275,
    largura: 277,
    altura: 104,
    x: 0,
    y: canvas.height - 224,

desenhar(){ // Função para mostrar o plano de fundo
    contexto.fillStyle = '#665445';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
    sprites,
    planoFundo.spriteX, planoFundo.spriteY, // Sprite X, Sprite Y
    planoFundo.largura, planoFundo.altura, // Tamanho do recorte da Sprite
    planoFundo.x, planoFundo.y,
    planoFundo.largura, planoFundo.altura,
);
    contexto.drawImage(
    sprites,
    planoFundo.spriteX, planoFundo.spriteY, // Sprite X, Sprite Y
    planoFundo.largura, planoFundo.altura, // Tamanho do recorte da Sprite
    (planoFundo.x + planoFundo.largura), planoFundo.y,
    planoFundo.largura, planoFundo.altura,
);
    }
}


const telaInicio = {
    spriteX: 30,
    spriteY: 250,
    largura: 190,
    altura: 232,
    x: (canvas.width / 2) - 174 /2,
    y: 50,

desenhar(){ // Função para mostrar o chão
    contexto.drawImage(
    sprites,
    telaInicio.spriteX, telaInicio.spriteY, // Sprite X, Sprite Y
    telaInicio.largura, telaInicio.altura, // Tamanho do recorte da Sprite
    telaInicio.x, telaInicio.y,
    telaInicio.largura, telaInicio.altura,
);
    }
}


function criaCanos() {
    const canos = {
        largura : 52,
        altura : 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenhar(){ 
            canos.pares.forEach(function(par){
                const yRandom = par.y;
                const espacoCanos = 90;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                   // [Cano do ceu]
                contexto.drawImage(
                sprites,
                canos.ceu.spriteX, canos.ceu.spriteY,
                canos.largura, canos.altura,
                canoCeuX, canoCeuY,
                canos.largura, canos.altura
            )

            const canoChaoX = par.x;
            const canoChaoY = canos.altura + espacoCanos + yRandom;
            // [Cano do chao]
            contexto.drawImage(
                sprites,
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canoChaoY,
                canos.largura, canos.altura,
            )
            par.canoCeu = {
                x: canoCeuX,
                y: canos.altura + canoCeuY
            }
            par.canoChao = {
                x : canoChaoX,
                y: canoChaoY
            }

             })
      },
        temColisaoBird(par){
            const cabecaBird = globais.legendaryBird.y;
            const peBird = globais.legendaryBird.y + globais.legendaryBird.altura;
            if(globais.legendaryBird.x >= par.x){
                console.log("invadiu");

                if(cabecaBird <= par.canoCeu.y){
                    return true;
                }

                if(peBird >= par.canoChao.y){
                    return true;
                }
            }
            return false;
        },

        pares : [],
        atualizar(){
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames){
                console.log("passou 100 frames");
                canos.pares.push({
                x: canvas.width,
                y: -150 * (Math.random() + 1),
                });
            }

              canos.pares.forEach(function(par){
                par.x = par.x - 2;

                if(canos.temColisaoBird(par)){
                    console.log("perdeu");
                    mudaTela(Telas.INICIO);
                }

                if(par.x + canos.largura <= 0){
                    canos.pares.shift();
                }
              })
        }
    }
    return canos;
}


function criaPlacar(){
    const placar = {
         pontos: 0,
        desenhar(){
           contexto.font = '35px "VT323"';
           contexto.textAlign = "right";
           contexto.fillStyle = "white";
           contexto.fillText(`${placar.pontos}`, canvas.width - 20 , 35); 
           placar.pontos 
        },
        atualizar(){
        const intervaloDeFrames = 100;
        const passouOIntervalo = frames % intervaloDeFrames === 0;

        if(passouOIntervalo){
            placar.pontos = placar.pontos + 1;

        }

        }
    }
    return placar;
}

function criaBird(){
    const legendaryBird = {
    spriteX: 90,
    spriteY: 390,
    largura: 50,
    altura: 50,
    x: 10,
    y: 50,
    pulo: 5.0,
    pula(){ // Função pulo do bird
        console.log("[antes]", legendaryBird.velocidade)
        legendaryBird.velocidade = - legendaryBird.pulo
        somPulo.play(); // Toca o som de pulo
        console.log("[depois]", legendaryBird.velocidade)
    },
    gravidade: 0.25,
    velocidade: 0,

    atualizar(){ 
        if(colisao(legendaryBird, globais.chao)){
            console.log("Fez colisao");
            somHit.play();

            setTimeout(() => {
                mudaTela(Telas.INICIO);
            }, 500);
            
            return; 
        }
        
        
        legendaryBird.velocidade = legendaryBird.velocidade + legendaryBird.gravidade // Calculo para controlar a gravidade/velocidade
        legendaryBird.y = legendaryBird.y + legendaryBird.velocidade  
    },

      movimentos: [
      { spriteX: 0, spriteY: 0, }, // asa pra cima
      { spriteX: 0, spriteY: 26, }, // asa no meio 
      { spriteX: 0, spriteY: 52, }, // asa pra baixo
      { spriteX: 0, spriteY: 26, }, // asa no meio 
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {     
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;
      // console.log('passouOIntervalo', passouOIntervalo)

      if(passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + legendaryBird.frameAtual;
        const baseRepeticao = legendaryBird.movimentos.length;
        legendaryBird.frameAtual = incremento % baseRepeticao
      }
        // console.log('[incremento]', incremento);
        // console.log('[baseRepeticao]',baseRepeticao);
        // console.log('[frame]', incremento % baseRepeticao);
    },

desenhar(){ // Função para mostrar o passarinho na tela

      legendaryBird.atualizaOFrameAtual();
      const { spriteX, spriteY } = legendaryBird.movimentos[legendaryBird.frameAtual];


        contexto.drawImage(
        sprites,
        spriteX, spriteY, // Sprite X, Sprite Y
        legendaryBird.largura, legendaryBird.altura, // Tamanho do recorte da Sprite
        legendaryBird.x, legendaryBird.y,
        legendaryBird.largura, legendaryBird.altura,
);

    }
};
    return legendaryBird;
}

const globais = {};
let telaAtiva = {};
function mudaTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializar){
        telaAtiva.inicializar();
    }
}
const Telas = {     
    INICIO: {
        inicializar(){
        globais.legendaryBird = criaBird();
        globais.chao = criaChao();
        globais.canos = criaCanos();
      
    },
        desenhar(){
            planoFundo.desenhar();
            globais.legendaryBird.desenhar();
            globais.canos.desenhar();
            globais.chao.desenhar();
            telaInicio.desenhar(); 
        },
        click(){
            mudaTela(Telas.JOGO); // Troca para a tela de jogo
        },

        atualizar(){
            globais.chao.atualizar(); 
   
          
        }
        
    }
};

Telas.JOGO = { 
    inicializar(){
        globais.placar = criaPlacar();   
    },
    desenhar(){
        planoFundo.desenhar();
        globais.canos.desenhar();
        globais.chao.desenhar();
        globais.legendaryBird.desenhar();
        globais.placar.desenhar();
},
    click(){
        globais.legendaryBird.pula();
    },
    atualizar(){
        globais.canos.atualizar();
        globais.chao.atualizar(); 
        globais.legendaryBird.atualizar();
        globais.placar.atualizar();
        
    }     
};

let frames = 0;
function loop(){ // Importante ressaltar que essa parte funciona como camadas // Loop de atualizações que carregam as imagens do jogo
        telaAtiva.desenhar();
        telaAtiva.atualizar();
        requestAnimationFrame(loop); // Carregar as imagens
        frames++;
    }

window.addEventListener('click', function(){ // Verifica se houve click dentro do navegador
    if(telaAtiva.click){
        telaAtiva.click();
    }
})

mudaTela(Telas.INICIO); // Começa com a tela de inicio 
loop();