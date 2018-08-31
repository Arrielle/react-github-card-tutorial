import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
  	  <img width="75" src={props.avatar_url}/>
      <div style={{display:'inline-block', marginLeft: 10}}>
        <div style={{fontSize:"1.25em", fontWeight:'bold'}}>
					{ props.name == null ?  'None' : props.name }
        </div>
        <div>
					{ props.company == null ?  'None' : props.company }
        </div>
      </div>
  	</div>
  );
};

const CardList = (props) => {
	return (
  	<div>
      	{props.cards.map(card => <Card key={card.id} {...card} />)}
  	</div>
  );
};

class Form extends React.Component {
	state = {userName: ''};
  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`).then(resp => {
    	//console.log("Form Submitted", resp);
      this.props.onSubmit(resp);
      this.setState({userName: ''});
    })
  };
  render(){
  	return(
    	<form onSubmit={this.handleSubmit}>
    	  <input value={this.state.userName} onChange={(event) => this.setState({userName: event.target.value}) } type="text" placeholder="Github Username" required/>
        <button type="submit">Add Card</button>
    	</form>
    )
  }
}

class App extends React.Component {
	state ={
  	cards: []
  };

	addNewCard = (cardInfo) => {
  	//console.log(cardInfo.data);
    this.setState(prevState => ({
    	cards: prevState.cards.concat(cardInfo.data)
    }));
  };

	render(){
  	return(
			<div>
    		<Form onSubmit={this.addNewCard}/>
     	 	<CardList cards={this.state.cards}/>
      </div>
    )
  }
}

//ReactDOM.render(<App />, mountNode);

export default App;
