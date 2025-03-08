// Configurações da grade
const LARGURA = 30;
const ALTURA = 15;
let grade = criarGrade();
let intervalo;
let epocas = 0;

// Elementos da interface
const gradeElemento = document.getElementById('grade');
const iniciarBotao = document.getElementById('iniciar');
const pararBotao = document.getElementById('parar');
const resetarBotao = document.getElementById('resetar');
const score = document.getElementById('score')
// Função para criar uma grade vazia
function criarGrade() {
    return Array.from({ length: ALTURA }, () => Array(LARGURA).fill(0));
}

// Função para inicializar a grade no HTML
function inicializarGradeHTML() {
    for (let y = 0; y < ALTURA; y++) {
        for (let x = 0; x < LARGURA; x++) {
            const celulaElemento = document.createElement('div');
            celulaElemento.classList.add('celula');
            celulaElemento.dataset.x = x;
            celulaElemento.dataset.y = y;
            celulaElemento.addEventListener('click', () => toggleCelula(x, y));
            gradeElemento.appendChild(celulaElemento);
        }
    }
}

// Função para exibir o estado atual da grade
function exibirGrade() {
    const celulas = document.querySelectorAll('.celula');
    celulas.forEach(celula => {
        const x = parseInt(celula.dataset.x);
        const y = parseInt(celula.dataset.y);
        if (grade[y][x] === 1) {
            celula.classList.add('viva');
        } else {
            celula.classList.remove('viva');
        }
    });
    score.innerHTML = epocas;
}

// Função para alternar o estado de uma célula
function toggleCelula(x, y) {
    grade[y][x] = grade[y][x] === 1 ? 0 : 1;
    exibirGrade();
}

// Função para comparar duas grades
function compararGrades(gradeAtual, novaGrade) {
    for (let y = 0; y < ALTURA; y++) {
        for (let x = 0; x < LARGURA; x++) {
            if (gradeAtual[y][x] !== novaGrade[y][x]) {
                return false; // As grades são diferentes
            }
        }
    }
    return true; // As grades são iguais
}

// Função para calcular a próxima geração
function proximaGeracao() {
    const novaGrade = criarGrade();
    for (let y = 0; y < ALTURA; y++) {
        for (let x = 0; x < LARGURA; x++) {
            const vizinhos = contarVizinhos(x, y);
            if (grade[y][x] === 1 && (vizinhos === 2 || vizinhos === 3)) {
                novaGrade[y][x] = 1;
            } else if (grade[y][x] === 0 && vizinhos === 3) {
                novaGrade[y][x] = 1;
            }
        }
    }
    if(compararGrades(grade,novaGrade)) {
        jogar();
        return;
    }
    epocas++;
    grade = novaGrade;
    exibirGrade();
}

// Função para contar vizinhos vivos
function contarVizinhos(x, y) {
    let contagem = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < LARGURA && ny >= 0 && ny < ALTURA && grade[ny][nx] === 1) {
                contagem++;
            }
        }
    }
    return contagem;
}
// Eventos dos botões
iniciarBotao.addEventListener('click', () => jogar());

function jogar() {
    if (!intervalo) {
        iniciarBotao.textContent = 'Stop';
        iniciarBotao.className = 'parar'
        intervalo = setInterval(proximaGeracao, 800);
        return;
    }
    iniciarBotao.className = 'iniciar'
    iniciarBotao.textContent = 'Start';
    clearInterval(intervalo);
    intervalo = null;
}

// Configuração inicial para formar a palavra "HI !" centralizada e maior
function configuracaoInicial(grade) {
    // Letra "H" (5x5)
    const H = [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
    ];

    // Letra "I" (5x5)
    const I = [
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0]
    ];

    // Símbolo "!" (5x5)
    const exclamação = [
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0]
    ];

    // Função para desenhar um caractere na grade
    function desenharCaractere(caractere, xInicial, yInicial) {
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                if (caractere[y][x] === 1) {
                    grade[yInicial + y][xInicial + x] = 1;
                }
            }
        }
    }

    // Centralizar o texto na grade
    const yInicial = Math.floor((ALTURA - 5) / 2); // Centralizado verticalmente
    const xInicialH = Math.floor((LARGURA - 15) / 2); // Posição inicial do "H"
    const xInicialI = xInicialH + 6; // Posição inicial do "I" (5 colunas do "H" + 1 espaço)
    const xInicialExclamação = xInicialI + 6; // Posição inicial do "!" (5 colunas do "I" + 1 espaço)

    // Desenhar os caracteres
    desenharCaractere(H, xInicialH, yInicial);
    desenharCaractere(I, xInicialI, yInicial);
    desenharCaractere(exclamação, xInicialExclamação, yInicial);
}


resetarBotao.addEventListener('click', () => resetar());

function resetar() {
    grade = criarGrade();
    configuracaoInicial(grade);
    epocas = 0;
    exibirGrade(grade);
}
resetar();
inicializarGradeHTML();

// Configuração inicial (exemplo: "glider")

// Exibir a grade inicial
exibirGrade(grade);