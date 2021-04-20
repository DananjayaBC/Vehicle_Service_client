import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state , action) => {
    switch(action.type){
        case 'SEARCH_TRAINS':
        return{
            ...state,
            trainsList: action.payload,
            heading: 'Search Results'
        };
        case 'SEARCH_PRICES':
        return{
            priceList: action.payload,
            heading: 'Search Results'
        };
        default:
            return state;
    }
    
    
}


export class Provider extends Component {
    state = {
    
        heading : 'Train Schedule',
        dispatch: action => this.setState(state => reducer(state, action))
     
    };
     
    render() {
        return (   
                <Context.Provider value={this.state}>
                     {this.props.children}
                </Context.Provider>
        )
    }

    
}
export const Consumer = Context.Consumer;