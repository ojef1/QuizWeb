//reload da página pela logo
const logo = document.querySelector("#header");
logo.addEventListener("click", ()=>{
  window.location.reload();
})

// Selecionar todos os botões de pergunta
const botoesPergunta = document.querySelectorAll(".btPergunta");
const pergunta1 = document.querySelector(".pergunta1")
const pergunta2 = document.querySelector(".pergunta2")
const pergunta3 = document.querySelector(".pergunta3")
const pergunta4 = document.querySelector(".pergunta4")
const pergunta5 = document.querySelector(".pergunta5")
let respostas = [];

/// Adicionar ouvinte de evento de clique a cada botão de pergunta
botoesPergunta.forEach((botao, indice) => {
  botao.addEventListener("click", () => {
    // Remover a classe "active" de todos os botões de pergunta
    botoesPergunta.forEach(botao => {
      botao.classList.remove("active");
    });
    // Adicionar a classe "active" ao botão de pergunta clicado
    botao.classList.add("active");

    // Verificar se o botão clicado é o primeiro botão
    if (indice === 0) {
      // Exibir a pergunta correspondente
      pergunta1.style.display = "block";
    } else {
      // Esconder a pergunta correspondente
      pergunta1.style.display = "none";
    }
    if (indice ===1){
      pergunta2.style.display = "block";
    } else{
      pergunta2.style.display = "none";
    }
    if (indice ===2){
      pergunta3.style.display = "block";
    } else{
      pergunta3.style.display = "none";
    }
    if (indice ===3){
      pergunta4.style.display = "block";
    } else{
      pergunta4.style.display = "none";
    }
    if (indice ===4){
      pergunta5.style.display = "block";
    } else{
      pergunta5.style.display = "none";
    }
  });
});


//Questions - armazenar e limpar as repostas selecionadas
function armazenarRespostas() {
  // Pergunta 1
  let respostaPergunta1 = document.querySelector("#pg1-op:checked").value;
  respostas.push(respostaPergunta1);

  // Pergunta 2
  let respostaPergunta2 = document.querySelector("#pg2-op:checked").value;
  respostas.push(respostaPergunta2);

  // Pergunta 3
  let respostaPergunta3 = document.querySelector("#pg3-op:checked").value;
  respostas.push(respostaPergunta3);

  // Pergunta 4
  let respostaPergunta4 = document.querySelector("#pg4-op:checked").value;
  respostas.push(respostaPergunta4);

  // Pergunta 5
  let respostaPergunta5 = document.querySelector("#pg5-op:checked").value;
  respostas.push(respostaPergunta5);
  // Retornar as respostas
  return respostas;
}
function limparRespostas() {
  respostas = []; 
  let radiobuttons = document.querySelectorAll('input[type="radio"]'); 
  radiobuttons.forEach(radio => radio.checked = false);
}


//botão confirmar - manda para a próxima pergunta
const botoesConfirmar = document.querySelectorAll(".btConfirmar");

botoesConfirmar.forEach((botao, indice) => {
  botao.addEventListener("click", () => {
    const perguntaAtual = document.querySelector(`.pergunta${indice+1}`);
    const proximaPergunta = document.querySelector(`.pergunta${indice+2}`);

    perguntaAtual.style.display = "none";
    proximaPergunta.style.display = "block";

    let botaoAtivo = document.querySelector('.btPergunta.active');
    if (botaoAtivo) {
      botaoAtivo.classList.remove('active');
      if (indice < botoesPergunta.length - 1) {
        botoesPergunta[indice + 1].classList.add('active');
      }
    }
  });
});


//finalizar o quiz - abrir o dialog e mostrar as ultimas informações
const modal = document.querySelector("#modal");
const modalResultados = document.querySelector("#modalResultado");
const btFinalizar = document.querySelector(".btFinalizar");
const mostrarRespostas = document.querySelector("#respostas");

btFinalizar.addEventListener('click', () => {

  if(respostas.length == 5){

    modal.showModal();
    
    let listaRespostas = "<ul>";
    let questao = 1;
    for (let i = 0; i < respostas.length; i++) {
      listaRespostas += `<li>Questão ${questao} = ${respostas[i]}</li>`;
      questao ++
    }
    listaRespostas += "</ul>";
    mostrarRespostas.innerHTML = listaRespostas;
  }else{
    alert("Por favor, responda todas as perguntas antes de finalizar!")
    respostas = [];
  }
});


//botões do primerio modal (que mostra as opções selecionadas)
const fecharModal = document.querySelector("#fecharModal");
const mostrarResultados = document.querySelector("#mostrarResultados");

fecharModal.addEventListener("click", ()=>{
  modal.close();
  limparRespostas();
});
mostrarResultados.addEventListener("click", ()=>{
  modal.close();
  modalResultados.showModal();
  
//laço que analisa se as respostas corretas são correspondentes as selecionadas
let respCertas = ["B", "C", "C", "A", "B"];

let acertos = 0;
for (let i = 0; i < respCertas.length; i++) {
  if (respostas[i] === respCertas[i]) {
    acertos++;
  }
}

//Analisa as respostas e mostra se ele atingiu a meta ou não

titleResultado = document.querySelector("#titleResultado");
qtdCertas = document.querySelector("#qtdCertas");
qtdErradas = document.querySelector("#qtdErradas");

if(acertos >= 3 ){
  titleResultado.innerHTML = "<h2>Parabéns! Você passou!! <i class='fas fa-check certo'></i></h2>";
  qtdCertas.innerHTML = acertos;
  qtdErradas.innerHTML = 5 - acertos;
}else{
  titleResultado.innerHTML = "<h2>Não foi dessa vez! Tente novamente!! <i class='fas fa-xmark errado'></i></h2>"
  qtdCertas.innerHTML = acertos;
  qtdErradas.innerHTML = 5 - acertos;
}
});


//reinicia a página quando clicado no botão
const reiniciar = document.querySelector(".btReiniciar");

reiniciar.addEventListener("click", ()=>{
  window.location.reload();
})











