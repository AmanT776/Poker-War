let deckId = ""
const newDeckBtn = document.getElementById('getdeck-btn')
const drawCardsBtn = document.getElementById('draw-cards')
const remainingCardsDisplay = document.getElementById('cards-remaining')
const computerScoreBoard = document.getElementById('computer-score-board')
const playerScoreBoard = document.getElementById('player-score-board')
let remainingCard = ""
let computerScore = 0
let playerScore = 0

function getDeck(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res=>res.json())
            .then(data=>{
                deckId = data.deck_id
                remainingCardsDisplay.textContent = `Remaining Cards: ${data.remaining}`
            })
            drawCardsBtn.disabled = false

}
newDeckBtn.addEventListener('click',getDeck)
function drawCards(){
    deckId == "" ? alert("please click new deck") : fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res=>res.json())
            .then(data=>{
                document.getElementById('computer-card').innerHTML = `
                    <img src=${data.cards[0].image}>`
                document.getElementById('player-card').innerHTML = `
                     <img src=${data.cards[1].image}>
                `
                document.getElementById('winner-board').textContent = determineCardWinner(data.cards[0],data.cards[1])
                remainingCardsDisplay.textContent = `Remaining Cards: ${data.remaining}`
                computerScoreBoard.textContent = `Computer Score: ${computerScore}`
                playerScoreBoard.textContent = `Your Score: ${playerScore}`
                if(data.remaining === 0){
                    drawCardsBtn.disabled = true
                    if(computerScore>playerScore){
                        document.getElementById('winner-board').textContent = "Computer won the game!"
                    }else if(playerScore>computerScore){
                        document.getElementById('winner-board').textContent = "Player won the game"
                    }else{
                        document.getElementById('winner-board').textContent = "It's a Tie"
                    }
                }
            })
    
}

drawCardsBtn.addEventListener('click',drawCards)

function determineCardWinner(card1,card2){
    const valueOptions = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    if(card1ValueIndex>card2ValueIndex){
        computerScore++
        return "Computer Wins"

    }else if(card2ValueIndex>card1ValueIndex){
        playerScore++
        return "Player Wins"
    }else{
        return "Tie"
    }

}
