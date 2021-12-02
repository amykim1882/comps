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
                        3-minute time limit of the game.
                        The three AI bots you will be playing against will use a unique point system to 
                        develop their strategy: 
                    </p>
                        -50 points for every color changing card: wild +4, color change
                    <br/>
                        -20 points for every action card: skip, +2, reverse
                    <br/>
                        -face value for every corresponding number value card
                    <br/>
                    <p>
                        Ultimately, their strategy is to discard the cards worth the highest points first.
                    </p>
                    <p>
                        You will have 15 seconds per each turn to choose which card you want to discard.
                        If the 15 second time limit runs out and you haven't made your choice, a card will
                        be added to your hand.
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