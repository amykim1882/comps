import React from "react";
import "./Home.css";
import {withRouter} from "react-router";
import Facebook from "./facebook/Facebook";

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
                    The rules are simple: try your best to discard all the cards that you are dealt.
                    Any cards left that are not accounted for will be used to rank your status using a unique point system: 
                    </p>
                    -20 points for every action card: skip, +2, reverse
                    <br/>
                    -50 points for every color changing card: wild +4, color change
                    <br/>
                    -face value for every corresponding number value card: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
                    <br/>
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