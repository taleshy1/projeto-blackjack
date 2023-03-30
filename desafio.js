/**
 * EXEMPLO DE UTILIZAÇÃO DA 'comprarCarta'
 * 
 * 
    const carta = comprarCarta(); // Sorteia uma carta. Por exemplo, o rei de ouros
    
    console.log(carta.texto) // imprime o texto da carta. Exemplo: "K♦️" (indica "K" de ouros)
    console.log(carta.valor) // imprime o valor da carta (um número). Exemplo: 10 (dado que "K" vale 10)
 * 
 * 
 * 
 */

    let player = [],
    npc = []
 
 //Lipar arrays
 const clearArray = () => {
    player = []
    npc = []
 }
 //função para comprar carta pela primeira vez
 const firstBuy = () => {
    let cardsOk = false
    do {
       player.push(comprarCarta())
       player.push(comprarCarta())
       npc.push(comprarCarta())
       npc.push(comprarCarta())
       if (
          (player[0].valor === 11 && player[1].valor === 11) ||
          (npc[0].valor === 11 && npc[1].valor === 11)
       ) {
          clearArray()
       } else {
          cardsOk = true
       }
    } while (!cardsOk)
 }
 
 //função para comprar +1 carta
 const buyMore = (whoBuy) => {
    whoBuy.push(comprarCarta())
 }
 
 //função para perguntar se deseja comprar mais uma carta 
 const wannaBuyMore = () => {
    let text = "As suas cartas são:",
       buyCards = false,
       i = 0,
       valor = 0,
       npcInfo = npcBuy(valor)
    while (!buyCards) {
       while (i < player.length) {
          text = text + "  " + player[i].texto
          valor += Number(player[i].valor)
          i++
       }
       // logica para n comprar acima de 21
       if (valor > 21) {
          alert(
             text +
             " - Pontuação: " +
             valor +
             "\n" +
             npcInfo[1] +
             "\nA soma das suas cartas ultrapassam 21, portanto vitoria do computador"
          )
          return
       } else if (valor === 21) {
          npcInfo = npcBuy(valor)
          if (npcInfo[0] === 21) {
             alert(
                text +
                " - Pontuação: " +
                valor +
                "\n" +
                npcInfo[1] +
                "\nAmbos os players fizeram 21, portanto empate."
             )
             return
          } else {
             alert(
                text +
                " - Pontuação: " +
                valor +
                "\n" +
                npcInfo[1] +
                "\nParabéns, você venceu"
             )
             return
          }
       } else if (
          confirm(
             text +
             "\n" +
             "Primeira carta do computador:  " +
             npc[0].texto +
             "\nDeseja comprar outra carta?"
          )
       ) {
          buyMore(player)
       } else {
          npcInfo = npcBuy(valor)
          if (npcInfo[0] === valor) {
             alert(
                text +
                " - Pontuação: " +
                valor +
                "\n" +
                npcInfo[1] +
                "\nAmbos os players fizeram " +
                valor +
                " portanto empate."
             )
          } else if (npcInfo[0] > valor && npcInfo[0] < 21) {
             alert(
                text +
                " - Pontuação: " +
                valor +
                "\n" +
                npcInfo[1] +
                "\nportanto vitoria do computador"
             )
          } else if (valor < 21) {
             alert(
                text +
                " - Pontuação: " +
                valor +
                "\n" +
                npcInfo[1] +
                "\nParabéns, você venceu"
             )
          }
          return
       }
    }
 }
 
 const npcBuy = (userScore) => {
    let npcText = "As cartas do computador são:",
       buyCards = false,
       i = 0,
       valor = 0
    while (!buyCards) {
       while (i < npc.length) {
          npcText = npcText + "  " + npc[i].texto
          valor += Number(npc[i].valor)
          i++
       }
       if (valor < userScore && valor < 21) {
          buyMore(npc)
       } else {
          buyCards = true
       }
    }
    npcText = npcText + " - Pontuação: " + valor
    return [valor, npcText]
 }
 
 // Função que fará o jogo acontecer
 
 if (confirm("Boas vindas!\nVocê deseja jogar uma rodada de BlackJack?")) {
    clearArray()
    firstBuy()
    wannaBuyMore()
    alert("Obrigado por jogar, caso queira jogar denovo atualize a página")
 } else {
    alert("O jogo se encerra aqui, obrigado pela participação")
 }
 