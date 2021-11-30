import React from "react";
import { withRouter } from "react-router-dom";
import './Card.css';

class Card extends React.Component {
    constructor() {
        super();
    }

    getCSS() {
        if (!this.props.card.color) {
            return "cardBoxwhite";
        }
        return "cardBox".concat(this.props.card.color);
    }

    onTrigger = () => {
        this.props.onClick(this.props.card);
    }

    onTriggerPink = () => {
        this.props.onClick(this.props.card, "pink");
    }

    onTriggerYellow = () => {
        this.props.onClick(this.props.card, "yellow");
    }

    onTriggerGreen = () => {
        this.props.onClick(this.props.card, "green");
    }

    onTriggerOrange = () => {
        this.props.onClick(this.props.card, "orange");
    }

    render() {

        if (!this.props.card) {
            return null;
        }
        const numberCard =
        <div className={this.getCSS()} onClick={this.onTrigger}>
            {this.props.card.color}&nbsp;
            {this.props.card.value}
        </div>;

        const actionCard =
        <div className={this.getCSS()} onClick={this.onTrigger}>
            {this.props.card.color ? this.props.card.color : ""} &nbsp;
            {this.props.card.action}
        </div>

        const wildCard =
        <div className={this.getCSS()}>
        {this.props.card.color ? this.props.card.color : ""} &nbsp;
        {this.props.card.action}
            <div onClick={this.onTriggerYellow}>
                Yellow
            </div>
            <div onClick={this.onTriggerGreen}>
                Green
            </div>
            <div onClick={this.onTriggerPink}>
                Pink
            </div>
            <div onClick={this.onTriggerOrange}>
                Orange
            </div>
        </div>

        return this.props.card.action ? (this.props.hand &&
            (this.props.card.action === "colorSwitch" || this.props.card.action === "+4") ?
            wildCard : actionCard): numberCard;
    }
}

export default withRouter(Card);