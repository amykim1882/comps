import React from "react";
import "./Home.css";
import {withRouter} from "react-router";


class Home extends React.Component{
    constructor(){
        super();
    }
    _clicked(){
     
        window.location.href=`/game`;
 
     }
    render(){
        return(
            <div className = "home">
                <h1>Three! Two! Uno!</h1>
                
                <div className = "title">
                        This is a text-based web application version of the classic card game Uno!
                    <p>
                        The rules are simple! Try your best to discard all the cards that you are dealt within the
                        3-minute time limit of the game. The rules of the text-based version of Uno will implement the rules from the
                        official rule book of Uno. The rules of this game is to match the current card either by number, color, or action.
                        For example, if the current card is a green 7, you must play a green card or any color 7. Or, you may play 
                        any color switch or a wild +4 card. If you don't have anything that matches, a card
                        will be added to your cards from the game deck card and the play moves to the next
                        player.

                        The three AI bots you will be playing against will use a consistent strategy of discarding
                        any of their action cards, then any card with the same color as the current card, and then
                        any card with the same number value as the current card.
                    </p>

                    <p>
                        IMPORTANT: You can't stack draw +2 or wild +4 cards! This rule is also from 
                        the official rules of Uno 
                    </p>
    
                    <p>
                        You will have 15 seconds per each turn to choose which card you want to discard.
                        If the 15 second time limit runs out and you haven't made your choice, a card will
                        be added to your hand.
                    </p>

                    <p>
                        If you wish to discard a color switch or wild +4 card, simply just click
                        on the word
                    </p>
                    <p>
                        At any point, if you wish to restart the game, please press the "Restart Game" button located at 
                        the bottom of the game page.
                    </p>
                   
                </div>
                <button className = "start" onClick={() => this._clicked()}>
                Start Game!    
                </button>

                <div className = "go">
                </div>
               
            </div>
        )
    }
}

export default withRouter(Home);