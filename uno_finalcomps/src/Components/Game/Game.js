//this is the most up to date final version
import React from "react";
import { act } from "react-dom/test-utils";
import { withRouter } from "react-router-dom";
import Card from "./Card";
import './Game.css';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const colorIndex = ['orange', 'pink', 'yellow', 'green'];

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

let timerCheck = false;
let sreverse = false;
let sactionPlayed = false;
let winnerWon = false;
let timerId = null;
let smessageLog = [];

class Game extends React.Component {

    constructor() {
        super();
        this.player1Input = this.player1Input.bind(this);
        this.state = {
            time: 15,
            isOn: false,
            start: 0,
            turn: 0,
            gameCard: [],
            p1Card: [],
            p2Card: [],
            p3Card: [],
            p4Card: [],
            garbageCard: [],
            score: 0,
            currentValue: null,
            currentColor: null,
            currentCard: null,
            actionPlayed: false,
            extraCards: 0,
            skip: false,
            reverse: false,
            messageLog: [],
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }

    startTimer() {
        this.setState({
          isOn: true,
          time: this.state.time,
          start: this.state.time
        });
        timerId = setInterval(() => this.setState({
          time: this.state.time - 1
        }), 1000);
    }
    stopTimer() {
        this.setState({isOn: false});
        clearInterval(timerId);
    }
    resetTimer() {
        clearInterval(timerId);
        this.setState({time: 15, isOn: false});
    }

    componentDidMount() {
        this.gameSetup();
        this.distributeCards();
        this.setState({
            turn: 1,
        })
    }
    _clicked(){
     
        window.location.reload();
 
     }

    getFirstCard(gameCards) {
        let firstCardFound = false;
        while (!firstCardFound) {
            let randomIndex = Math.floor(Math.random() * (gameCards.length - 0 + 1) + 0);
            console.log(randomIndex);
            console.log(gameCards[randomIndex])
            if (!gameCards[randomIndex].hasOwnProperty('action')) {
                firstCardFound = true;
                return randomIndex;
            }
        }
    }

    distributeCards() {
        let gameCards = this.state.gameCard;
        let p1Cards = [];
        let p2Cards = [];
        let p3Cards = [];
        let p4Cards = [];
        for (let i = 0; i < 7; i++) {
            p1Cards.push(gameCards.pop());
            p2Cards.push(gameCards.pop());
            p3Cards.push(gameCards.pop());
            p4Cards.push(gameCards.pop());
        }
        let firstCardIndex = this.getFirstCard(gameCards);
        this.setState({
            currentCard: gameCards[firstCardIndex],
        })
        gameCards.splice(firstCardIndex, 1);
        this.setState({
            p1Card: p1Cards,
            p2Card: p2Cards,
            p3Card: p3Cards,
            p4Card: p4Cards,
            gameCard: gameCards,
        });
    }

    gameSetup() {
        this.setState({
            gameCard: []
        });
        this.setState({
            gameCard: this.state.gameCard.push(
                {
                    id: uuidv4(),
                    action: "colorSwitch",
                    color: null,
                },
                {
                    id: uuidv4(),
                    action: "colorSwitch",
                    color: null,
                },
                {
                    id: uuidv4(),
                    action: "colorSwitch",
                    color: null,
                },
                {
                    id: uuidv4(),
                    action: "colorSwitch",
                    color: null,
                },
                {
                    id: uuidv4(),
                    action: "+4",
                    color: null,
                },
                {
                    id: uuidv4(),
                    action: "+4",
                    color: null,
                },
                {
                    id: uuidv4(),
                    action: "+4",
                    color: null,
                },
                {
                    id: uuidv4(),
                    action: "+4",
                    color: null,
                },
            )
        })
        for (let j = 0; j < 4; j++) {
            this.setState({
                gameCard: this.state.gameCard.push(
                    {
                        id: uuidv4(),
                        action: "+2",
                        color: colorIndex[j],
                    },
                    {
                        id: uuidv4(),
                        action: "+2",
                        color: colorIndex[j],
                    },
                    {
                        id: uuidv4(),
                        action: "reverse",
                        color: colorIndex[j],
                    },
                    {
                        id: uuidv4(),
                        action: "reverse",
                        color: colorIndex[j],
                    },
                    {
                        id: uuidv4(),
                        action: "skip",
                        color: colorIndex[j],
                    },
                    {
                        id: uuidv4(),
                        action: "skip",
                        color: colorIndex[j],
                    },
                )
            })
            for (let i = 0; i < 10; i++) {
                if (i === 0) {
                    this.setState({
                        gameCard: this.state.gameCard.push(
                            {
                                id: uuidv4(),
                                value: i,
                                color: colorIndex[j],
                            }
                        )
                    })
                } else {
                    this.setState({
                        gameCard: this.state.gameCard.push(
                            {
                                id: uuidv4(),
                                value: i,
                                color: colorIndex[j],
                            },
                            {
                                id: uuidv4(),
                                value: i,
                                color: colorIndex[j],
                            }
                        )
                    })
                }
            }
        }
        this.setState({
            gameCard: this.shuffle(this.state.gameCard)
        })
    }

    shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    myCards() {
        return this.state.p1Card.map(card => {
            return <Card onClick={this.player1Input} hand={true} card={card}/>
        })
    }

    isColorlessActionCard(card) {
        return card && card.color ? false : true;
    }

    validCard(cards) {
        if (sactionPlayed) {
            console.log("Action card played. skipping");
            return null;
        }
        // if existing card is wildcard cannto submit
        if (this.isWildCard(this.state.currentCard) && sactionPlayed) {
            console.log("Wildcard played and action card, skipping")
            return null;
        }
        //Include logic here todo: if they have wildcard it returns true
        if (cards.some(function(element, index) {
            if (element.action === "+4" || element.action === "colorSwitch") {
                return true;
            }
            return false;
        })) {
            console.log("I have color switch or +4");
            return cards.filter((card) => {
                return card.action === "+4" || card.action === "colorSwitch";
            })[0];
        }
        // If current card is colorless action card
        if (this.state.currentCard.action) {
            switch (this.state.currentCard.action) {
                case "reverse":
                    console.log("Reverse played, can play any card same color")
                    return cards.filter((card) => {
                        return card.color === this.state.currentCard.color;
                    })[0]
                case "skip":
                    console.log("Skip played, can play any card same color")
                    return cards.filter((card) => {
                        return card.color === this.state.currentCard.color;
                    })[0];
                case "+4":
                    if (sactionPlayed) {
                        return null;
                    } else {
                        console.log("+4 played but not action, can play any card same color")
                        return cards.filter((card) => {
                            return card.color === this.state.currentCard.color;
                        })[0]
                    }
                case "+2":
                    if (sactionPlayed) {
                        console.log("+2 played, but action. skipping")
                        return null;
                    } else {
                        console.log("+2 played but not action, can play any card same color")
                        return cards.filter((card) => {
                            return card.color === this.state.currentCard.color;
                        })[0]
                    }
                case "colorSwitch":
                    console.log("ColorSwitch played but not action, can play any card same color")
                    return cards.filter((card) => {
                        return card.color === this.state.currentCard.color;
                    })[0]
            }
        } else if (this.state.currentCard.action === "+2" && sactionPlayed) {
            console.log("+2 action card, skipping")
            // Colored +2
            return null;
        } else if (this.state.currentCard.action === "+2") {
            console.log("+2 but not action card, can submit any with same color")
            return cards.filter((card) => {
                return card.color === this.state.currentCard.color;
            })[0]
        } else if (cards.filter((card) => {
            return card.color === this.state.currentCard.color;
        }).length > 0) {
            console.log("Matching any color")
            return cards.filter((card) => {
                return card.color === this.state.currentCard.color;
            })[0];
        } else if (cards.filter((card) => {
            return card.value === this.state.currentCard.value;
        }).length > 0) {
            console.log("Matching any number")
            return cards.filter((card) => {
                return card.value === this.state.currentCard.value;
            })[0];
        }
        console.log("None found")
        return null;
    }
    

    advanceTurn(multiplier) {
        if (sreverse) {
            if (multiplier) {
                if (this.state.turn === 1) {
                    this.setState({
                        turn: 3,
                    })
                } else if (this.state.turn === 2){
                    this.setState({
                        turn: 4,
                    })
                } else if (this.state.turn === 3){
                    this.setState({
                        turn: 1,
                    })
                } else if (this.state.turn === 4){
                    this.setState({
                        turn: 2,
                    })
                }
            } else {
                if (this.state.turn === 1) {
                    this.setState({
                        turn: 4,
                    })
                } else if (this.state.turn === 2){
                    this.setState({
                        turn: 1,
                    })
                } else if (this.state.turn === 3){
                    this.setState({
                        turn: 2,
                    })
                } else if (this.state.turn === 4){
                    this.setState({
                        turn: 3,
                    })
                }
            }
        } else {
            if (multiplier) {
                if (this.state.turn === 1) {
                    this.setState({
                        turn: 3,
                    })
                } else if (this.state.turn === 2){
                    this.setState({
                        turn: 4,
                    })
                } else if (this.state.turn === 3){
                    this.setState({
                        turn: 1,
                    })
                } else if (this.state.turn === 4){
                    this.setState({
                        turn: 2,
                    })
                }
            } else {
                if (this.state.turn === 1) {
                    this.setState({
                        turn: 2,
                    })
                } else if (this.state.turn === 2){
                    this.setState({
                        turn: 3,
                    })
                } else if (this.state.turn === 3){
                    this.setState({
                        turn: 4,
                    })
                } else if (this.state.turn === 4){
                    this.setState({
                        turn: 1,
                    })
                }
            }
        }
    }



    player1ValidCheck() {
        // Checks if player 1 has valid cards.
        if (!this.validCard(this.state.p1Card) || sactionPlayed) {
            // if they dont have valid card, add one card to deck
            let gameCards = this.state.gameCard;
            let p1Cards = this.state.p1Card;
            p1Cards.push(gameCards.pop());
            if (this.state.extraCards > 0) {
                for (let i = 0; i < this.state.extraCards - 1; i++) {
                    // Draw more cards if there is plus card
                    p1Cards.push(gameCards.pop());
                }
            }
            this.setState({
                gameCard: gameCards,
                p1Card: p1Cards,
                extraCards: 0,
                actionPlayed: false,
            });
            sactionPlayed = false;
            console.log("player 1 Drew card, extra:{}", this.state.extraCards);
            smessageLog.push("player 1 Drew card, extra:" + this.state.extraCards);
            this.advanceTurn();
        } else {
            timerCheck = false;
            this.startTimer();
        }
    }

    noop() {}

    player2ValidCheck() {
        if (!this.validCard(this.state.p2Card)) {
            // if they dont have valid card, add one card to deck
            let gameCards = this.state.gameCard;
            let p2Cards = this.state.p2Card;
            p2Cards.push(gameCards.pop());
            if (this.state.extraCards > 0) {
                for (let i = 0; i < this.state.extraCards - 1; i++) {
                    // Draw more cards if there is plus card
                    p2Cards.push(gameCards.pop());
                }
            }
            this.setState({
                gameCard: gameCards,
                p2Card: p2Cards,
                extraCards: 0,
            });
            smessageLog.push("player 2 Drew card, extra:" + this.state.extraCards);
            console.log("player 2 Drew card, extra:{}", this.state.extraCards);
            if (sactionPlayed) {
                sactionPlayed = false;
                this.setState({
                    actionPlayed: false,
                })
            }
            this.advanceTurn();
        } else {
            let playingCard = this.validCard(this.state.p2Card)
            let p2Cards = this.state.p2Card;
            let garbageCards = this.state.garbageCard;
            let tempCard = playingCard;
            smessageLog.push("player 2 played:" + JSON.stringify(playingCard));
            console.log("player 2 played: {}", playingCard);
            if (this.validCard([playingCard])) {
                if (this.isWildCard(playingCard)) {
                    tempCard.color = "orange";
                }
                if (playingCard.action === "+2") {
                    sactionPlayed = true;
                    this.setState({
                        extraCards: 2,
                        actionPlayed: true,
                    })
                }
                if (playingCard.action === "+4") {
                    sactionPlayed = true;
                    this.setState({
                        extraCards: 4,
                        actionPlayed: true,
                    })
                }
                setTimeout(this.noop, 3000);
                p2Cards = p2Cards.filter(item => !(item.id === playingCard.id));
                garbageCards.push(playingCard);
                this.setState({
                    currentCard: tempCard,
                    p2Card: p2Cards,
                    garbageCard: garbageCards,
                })
                if (playingCard.action === "reverse") {
                    this.setState({
                        reverse: !this.state.reverse,
                    })
                    sreverse = !sreverse;
                }
                if (playingCard.action === "skip") {
                        this.advanceTurn(2);
                } else {
                        this.advanceTurn();
                }
                
            }
        }
    }


    player3ValidCheck() {
        if (!this.validCard(this.state.p3Card)) {
            // if they dont have valid card, add one card to deck
            let gameCards = this.state.gameCard;
            let p3Cards = this.state.p3Card;
            p3Cards.push(gameCards.pop());
            if (this.state.extraCards > 0) {
                for (let i = 0; i < this.state.extraCards - 1; i++) {
                    // Draw more cards if there is plus card
                    p3Cards.push(gameCards.pop());
                }
            }
            this.setState({
                gameCard: gameCards,
                p3Card: p3Cards,
                extraCards: 0,
            });
            smessageLog.push("player 3 Drew card, extra:" + this.state.extraCards);
            console.log("player 3 Drew card, extra:{}", this.state.extraCards);
            if (sactionPlayed) {
                sactionPlayed = false;
                this.setState({
                    actionPlayed: false,
                })
            }
            this.advanceTurn();
        } else {
            let playingCard = this.validCard(this.state.p3Card)
            let p3Cards = this.state.p3Card;
            let garbageCards = this.state.garbageCard;
            let tempCard = playingCard;
            smessageLog.push("player 3 played: " + JSON.stringify(playingCard));

            console.log("player 3 played: {}", playingCard);
            if (this.validCard([playingCard])) {
                if (this.isWildCard(playingCard)) {
                    tempCard.color = "orange";
                }
                if (playingCard.action === "+2") {
                    sactionPlayed = true;
                    this.setState({
                        extraCards: 2,
                        actionPlayed: true,
                    })
                }
                if (playingCard.action === "+4") {
                    sactionPlayed = true;
                    this.setState({
                        extraCards: 4,
                        actionPlayed: true,
                    })
                }
                setTimeout(this.noop, 3000);
                p3Cards = p3Cards.filter(item => !(item.id === playingCard.id));
                garbageCards.push(playingCard);
                this.setState({
                    currentCard: tempCard,
                    p3Card: p3Cards,
                    garbageCard: garbageCards,
                })
                if (playingCard.action === "reverse") {
                    this.setState({
                        reverse: !this.state.reverse,
                    })
                    sreverse = !sreverse;
                }
                if (playingCard.action === "skip") {
                        this.advanceTurn(2);
                } else {
                        this.advanceTurn();
                }
                
            }
        }
    }


    player4ValidCheck() {
        if (!this.validCard(this.state.p4Card)) {
            // if they dont have valid card, add one card to deck
            let gameCards = this.state.gameCard;
            let p4Cards = this.state.p4Card;
            p4Cards.push(gameCards.pop());
            if (this.state.extraCards > 0) {
                for (let i = 0; i < this.state.extraCards - 1; i++) {
                    // Draw more cards if there is plus card
                    p4Cards.push(gameCards.pop());
                }
            }
            this.setState({
                gameCard: gameCards,
                p4Card: p4Cards,
                extraCards: 0,
            });
            smessageLog.push("player 4 Drew card, extra:" + this.state.extraCards);
            if (this.state.actionPlayed) {
                sactionPlayed = false;
                this.setState({
                    actionPlayed: false,
                })
            }
            console.log("player 4 Drew card, extra:{}", this.state.extraCards);
            this.advanceTurn();
        } else {
            let playingCard = this.validCard(this.state.p4Card)
            let p4Cards = this.state.p4Card;
            let garbageCards = this.state.garbageCard;
            let tempCard = playingCard;
            smessageLog.push("player 4 played:" + JSON.stringify(playingCard));
            console.log("player 4 played: {}", playingCard);
            if (this.validCard([playingCard])) {
                if (this.isWildCard(playingCard)) {
                    tempCard.color = "orange";
                }
                if (playingCard.action === "+2") {
                    sactionPlayed = true;
                    this.setState({
                        extraCards: 2,
                        actionPlayed: true,
                    })
                }
                if (playingCard.action === "+4") {
                    sactionPlayed = true;
                    this.setState({
                        extraCards: 4,
                        actionPlayed: true,
                    })
                }
                setTimeout(this.noop, 3000);
                p4Cards = p4Cards.filter(item => !(item.id === playingCard.id));
                garbageCards.push(playingCard);
                this.setState({
                    currentCard: tempCard,
                    p4Card: p4Cards,
                    garbageCard: garbageCards,
                })
                if (playingCard.action === "reverse") {
                    this.setState({
                        reverse: !this.state.reverse,
                    })
                    sreverse = !sreverse;
                }
                if (playingCard.action === "skip") {
                        this.advanceTurn(2);
                } else {
                        this.advanceTurn();
                }
                
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.turn !== this.state.turn && this.state.currentCard) {
            this.engine();
        }
    }

    engine() {
        if (this.state.gameCard.length < 5) {
            console.log("Gamecard running out, shuffling garbage deck in");
            let gameCards = this.state.gameCard;
            let garbageCards = this.state.garbageCard;
            gameCards.concat(garbageCards);
            this.setState({
                gameCard: gameCards,
                garbageCard: [],
            });
        }
        if (this.state.turn === 1) {
            // player 1 turn
            console.log("my turn");
            this.player1ValidCheck();
        } else if (this.state.turn === 2) {
            this.player2ValidCheck();
        } else if (this.state.turn === 3) {
            this.player3ValidCheck();
        } else if (this.state.turn === 4) {
            this.player4ValidCheck();
        }
    }

    player1Input(card, wildCardColor) {
        if (this.state.turn === 1) {
            this.stopTimer();
            this.resetTimer();
            console.log("player 1 played: {}", card);
            smessageLog.push("player 1 played:" + JSON.stringify(card));
            let p1Cards = this.state.p1Card;
            let garbageCards = this.state.garbageCard;
            let tempCard = card;
            if (this.validCard([card])) {
                if (this.isWildCard(card)) {
                    tempCard.color = wildCardColor;
                }
                if (card.action === "+2") {
                    sactionPlayed = true;
                    this.setState({
                        extraCards: 2
                    })
                }
                if (card.action === "+4") {
                    sactionPlayed = true;
                    this.setState({
                        extraCards: 4
                    })
                }
                setTimeout(this.noop, 3000);
                p1Cards = p1Cards.filter(item => !(item.id === card.id));
                garbageCards.push(card);
                this.setState({
                    currentCard: tempCard,
                    p1Card: p1Cards,
                    garbageCard: garbageCards,
                })
                if (card.action === "reverse") {
                    this.setState({
                        reverse: !this.state.reverse,
                    })
                    sreverse = !sreverse;
                }
                if (card.action === "skip") {
                        this.advanceTurn(2);
                } else {
                        this.advanceTurn();
                }
                
            }
        }
    }

    isWildCard(card) {
        if (card.action === "+4" || card.action === "colorSwitch") {
            return true;
        }
        return false;
    }

    logComponent() {
        return smessageLog.map(log => {
            return <div>{log}</div>
        })
    }

    render() {

        if (this.state.time === 0 && !timerCheck) {
            timerCheck = true;
            this.resetTimer();
            let gameCards = this.state.gameCard;
            let p1Cards = this.state.p1Card;
            p1Cards.push(gameCards.pop());
            if (this.state.extraCards > 0) {
                for (let i = 0; i < this.state.extraCards - 1; i++) {
                    // Draw more cards if there is plus card
                    p1Cards.push(gameCards.pop());
                }
            }
            this.setState({
                gameCard: gameCards,
                p1Card: p1Cards,
                extraCards: 0,
                actionPlayed: false,
            });
            sactionPlayed = false;
            console.log("player 1 Time expired, Drew card, extra:{}", this.state.extraCards);
            smessageLog.push("player 1 Time expired, Drew card, extra:" + this.state.extraCards);
            this.advanceTurn();
        }
      
        if (this.state.p1Card.length === 0 && this.state.currentCard) {
            !winnerWon && alert("You win! Stay for another round!");
            winnerWon = true;
            window.location.reload();
        }
        if (this.state.p2Card.length === 0 && this.state.currentCard) {
            !winnerWon && alert("Player 2 wins! Play another round if you dare!");
            winnerWon = true;
            window.location.reload();
        }
        if (this.state.p3Card.length === 0 && this.state.currentCard) {
            !winnerWon && alert("Player 3 wins! Play another round if you dare!");
            winnerWon = true;
            window.location.reload();
        }
        if (this.state.p4Card.length === 0 && this.state.currentCard) {
            !winnerWon && alert("Player 4 wins! Play another round if you dare!");
            winnerWon = true;
            window.location.reload();
        }
        return (
            <div className = "Game">
                <h1>Three! Two! Uno!</h1>
                <div>
                <div className="Timer">
                <CountdownCircleTimer isPlaying={true}
                size={180}
                duration={180}
                onComplete={() => {
                    !winnerWon && alert("Time expired.  Resetting!");
                    winnerWon = true;
                    window.location.reload();
                }}
                colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                ]}>
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer></div></div>
                <div>
                Personal Timer(s): {this.state.time}<div className="Timer"></div></div>
                <div>Player 1 Cards: {this.state.p1Card.length}</div>
                <div>Player 2 Cards: {this.state.p2Card.length}</div>
                <div>Player 3 Cards: {this.state.p3Card.length}</div>
                <div>Player 4 Cards: {this.state.p4Card.length}</div>
                <p></p>
                <div className = "currentCard"><Card card={this.state.currentCard}/></div>
                <div className="columnC">
                    {this.myCards()}
                </div>
                <div>Number of Cards in deck: {this.state.gameCard.length}</div>
                <div>Number of Cards in garbage: {this.state.garbageCard.length}</div>
                <div>Play Transcript: </div>
                <div className="boxWidth">{this.logComponent()}</div>
                <button className = "start" onClick={() => this._clicked()}>
                    Restart Game    
                </button>
            </div>
        );
    }
}

export default withRouter(Game);