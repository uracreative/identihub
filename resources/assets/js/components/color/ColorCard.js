import React, {Component} from 'react';
import {dropTargetFlow, isPublic} from '../../helpers';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import colorConvert from 'color-convert';

import {deleteColor} from "../../reducers/Bridge/BridgeApiCalls";
import {bindActionCreators} from "redux";

class ColorCard extends Component {

    state = {
        infoColor: "#000",
    };

    componentDidMount() {
        const infoColor = this.props.card ? this.props.card.hex : null;
        const colorHsl = colorConvert.hex.hsl(infoColor);

        if (infoColor && colorHsl.pop() < 60) {
            this.setState({
                infoColor: "#FFF",
            });
        }
    }

    deleteColor = () => {
        const {deleteColor, bridge, card} = this.props;
        deleteColor(bridge.id, card.id);
    };

    render() {
        const {card, isDragging, connectDragSource, connectDropTarget, bridge} = this.props;
        const opacity = isDragging ? 0.1 : 1;

        if (!isPublic()) {
            return connectDragSource(connectDropTarget(
                <div
                    className="item card color-card"
                    ref={(cardDiv) => {
                        this.card = cardDiv;
                    }}
                    style={{backgroundColor: "#" + card.hex, opacity: opacity}}>

                <span
                    onClick={this.deleteColor}>
                    <i className="fas fa-trash-alt delete-handler"/>
                </span>

                    <Link to={'/view/color/element/' + card.id}>
                        {/*<img src="/images/move-handler.svg" className="" width="22" />*/}
                        {/*<i className="fas fa-expand-arrows-alt move-handler" style={{color: this.state.infoColor}}/>*/}
                    </Link>
                    <span id="card-color-info" style={{color: this.state.infoColor}}>
                        <div className="rgb">
                            {card.rgb.split(" ").map((a, i) => (
                                <span key={`color-card${i}`}>
                                    {i === 0
                                        ? <span className="rgb-span">
                                            <span id="rgb-text">R</span>
                                            <span id="rgb-number">{a}</span>
                                          </span>
                                        : null}
                                    {i === 1
                                        ? <span className="rgb-span">
                                            <span id="rgb-text">G</span>
                                            <span id="rgb-number">{a}</span>
                                        </span>
                                        : null}
                                    {i === 2
                                        ? <span className="rgb-span">
                                            <span id="rgb-text">B</span>
                                            <span id="rgb-number">{a}</span>
                                          </span>
                                        : null}
                                </span>
                            ))}
                         </div>
                        <div className="hex">
                            #{card.hex}
                        </div>
                    </span>
                </div>
            ));
        } else {
            return (
                <div className="item card color-card" style={{backgroundColor: "#" + card.hex, opacity: opacity}}>
                    <Link to={'/view/color/element/' + card.id}/>
                    <span id="card-color-info" style={{color: this.state.infoColor}}>
                    <div className="rgb">
                        {card.rgb.split(" ").map((a, i) => (
                            <span key={`color-card${i}`}>
                                {i === 0
                                    ? <span className="rgb-span">
                                        <span id="rgb-text">R</span>
                                        <span id="rgb-number">{a}</span>
                                      </span>
                                    : null}
                                {i === 1
                                    ? <span className="rgb-span">
                                        <span id="rgb-text">G</span>
                                        <span id="rgb-number">{a}</span>
                                    </span>
                                    : null}
                                {i === 2
                                    ? <span className="rgb-span">
                                        <span id="rgb-text">B</span>
                                        <span id="rgb-number">{a}</span>
                                      </span>
                                    : null}
                            </span>
                        ))}
                     </div>
                    <div className="hex">
                        #{card.hex}
                    </div>
              </span>
                </div>
            );
        }

    }
}

const dispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteColor
    }, dispatch)
};

export default dropTargetFlow("COLOR")(connect(state => state, dispatchToProps)(ColorCard));