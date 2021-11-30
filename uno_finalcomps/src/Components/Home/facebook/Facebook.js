import React from "react";
import {withRouter} from "react-router";
import FacebookLogin from "react-facebook-login";
import "./../Home.css";

class Facebook extends React.Component {

    constructor() {
        super();
        this.state = {
            loggedIn: false,
            name: '',
            email: '',
            currScore: null,
            currID: null,
        }
    }

    _clicked(){
     
        window.location.href=`/quiz/${this.state.currID}`;
 
     }

    componentClicked = () => {}

    responseFacebook = response => {
        if (response) {
            this.setState({
                loggedIn: true,
                name: response.name,
                email: response.email,
                currID: response.userID,
            });
            fetch(`http://localhost:5000/score/${response.userID}`)
            .then(response => response.json())
            .then(result => {
                if (result.length > 0) {
                    this.setState({
                        currScore: result[0].score,
                    })
                } else {
                    this.setState({
                        currScore: null,
                    })
                }
            })
        }
    }

    render() {



        const currentScore = this.state.loggedIn ?
        <div>
            {this.state.currScore ? 'Your current score is ' + this.state.currScore :
            'You did not take the test yet.  Press on Start Quiz to begin'}
        </div> :
        <></>;
        const startQuizButton = this.state.loggedIn ?
        <div>
            <button className = "start" onClick={() => this._clicked()}>
                Start Game!    
            </button>
        </div> :
        <></>;

        let view;
        if (this.state.loggedIn) {
            view = null;
        } else {
            view = <FacebookLogin
            appId="802426503934319"
            autoLoad={false}
            fields="name,email"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />;
        }
        return (
            <div>
                {currentScore}
                <div>
                    {view}
                </div>
                {startQuizButton}
            </div>
        );
    }

}

export default withRouter(Facebook);