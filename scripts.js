console.log("AUUU");

const sprites = new Image();
sprites.src = './sprites.png'; // Origem das imagens

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

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


const planoFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

desenhar(){ // Função para mostrar o plano de fundo
    contexto.fillStyle = '#70c5ce';
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
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
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


const legendaryBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,

    atualizar(){ // Função para controlar a gravidade/velocidade
        legendaryBird.velocidade = legendaryBird.velocidade + legendaryBird.gravidade
        legendaryBird.y = legendaryBird.y + legendaryBird.velocidade
    },

desenhar(){ // Função para mostrar o passarinho na tela
        contexto.drawImage(
        sprites,
        legendaryBird.spriteX, legendaryBird.spriteY, // Sprite X, Sprite Y
        legendaryBird.largura, legendaryBird.altura, // Tamanho do recorte da Sprite
        legendaryBird.x, legendaryBird.y,
        legendaryBird.largura, legendaryBird.altura,
);

    }
};

let telaAtiva = {};
function mudaTela(novaTela){
    telaAtiva = novaTela;
}
const Telas = {
    INICIO: {
        desenhar(){
            planoFundo.desenhar();
            chao.desenhar();
            legendaryBird.desenhar();
            telaInicio.desenhar(); 
        },
        click(){
            mudaTela(Telas.JOGO); // Troca para a tela de jogo
        },

        atualizar(){

        }
        
    }
};

Telas.JOGO = {
    desenhar(){
        planoFundo.desenhar();
        chao.desenhar();
        legendaryBird.desenhar();
},
    atualizar(){
        legendaryBird.atualizar();
    }     
};

function loop(){ // Importante ressaltar que essa parte funciona como camadas // Loop de atualizações que carregam as imagens do jogo
        telaAtiva.desenhar();
        telaAtiva.atualizar();
        requestAnimationFrame(loop); // Carregar as imagens
    }

window.addEventListener('click', function(){ // Verifica se houve click dentro do navegador
    if(telaAtiva.click){
        telaAtiva.click();
    }
})

mudaTela(Telas.INICIO); // Começa com a tela de inicio 
loop();
