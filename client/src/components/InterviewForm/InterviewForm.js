import React, { Component } from 'react';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle} from 'material-ui/Card'
import TextField from 'material-ui/TextField';

class InterviewForm extends Component {

  constructor(props){
    super(props);

    this.state = {title: '', desc: ''}

    // I hate writing these bindings
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleTitle(event) {
    // still not too familiar with this event object
    this.setState({title: event.target.value});
  }

  handleDesc(event) {
    this.setState({desc: event.target.value});
  }

  handleSubmit(event) {

    var newThread = {title: this.state.title, thread: this.state.desc};
    // create a new thread on db
    axios.post('/posts/create', newThread)
    .then((res) => {
      // no way to update the UI here, need to rework the app architecture
      console.log('success', res);

    })
    .catch((err) => {
      console.log(err);
    });

    // don't know what this does either
    event.preventDefault();
  }

  handleClick() {
    axios.get('/interview')
  }

  render(){
    const styleCard = {
      marginLeft: '250px',
      marginRight: '250px'
    }

    const styleTextField = {
      width: '50%'
    }

    const styleButton = {
      marginTop: '50px',
      marginBottom: '50px',
      width: '40%',
    }

    const styleForm = {
      marginLeft: '150px',
      marginRight: '150px'
    }


    return (
      <Card style={styleCard}>
        {/*<CardTitle titleStyle={{fontSize:'35px'}} title="Submit a New Interview Question"/>*/}
       
          <div style={styleForm}>
            <h2 className="card-heading">Submit a New Interview Question</h2>
            <TextField fullWidth={true} hintText="Title" multiLine={true} rows={1}/>
            <br />
            <TextField fullWidth={true} hintText="Description" multiLine={true} rows={3}/>
            <br />
            <TextField fullWidth={true} hintText="Answer" multiLine={true} rows={3}/>
            <br />
            <RaisedButton style={styleButton} primary='primary' label="Submit"/>
          </div>  
        </Card>
    );

  }
}

export default InterviewForm;