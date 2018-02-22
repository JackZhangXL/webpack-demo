import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.pcss';
import bigImg from './imgs/big.png';

class Page extends Component {
    render() {
        return (
            <div>
                <h1>Learn webpack plugin</h1>
                <img src={bigImg} />
                <div className="img"></div>
            </div>
        );
    }
}

render(<Page/>, window.document.getElementById('app'));