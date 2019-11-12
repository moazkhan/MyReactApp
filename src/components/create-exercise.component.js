import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import AlertKaro from './alerts/success-alert';

export default class CreateExercise extends Component {

   constructor(props){
      super(props);

      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeDuration = this.onChangeDuration.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onClose = this.onClose.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
         username : '',
         description: '',
         duration: 0,
         date: new Date(),
         users: [],
         success: false,
         msg: '',
      };
   }

   componentDidMount() {
      axios.get('http://localhost:5000/users/')
      .then(response => {
         if(response.data.length > 0) {
            this.setState({
               users: response.data.map(user => user.username),
              username: response.data[0].username 
            });
         }
      });
   }

   onChangeUsername(e) {
      this.setState({
         username: e.target.value
      });
   }

   onChangeDescription(e) {
      this.setState({
         description: e.target.value
      });
   }

   onChangeDuration(e) {
      this.setState({
         duration: e.target.value
      });
   }

   onChangeDate(date) {
      this.setState({
         date: date
      });
   }

   onClose(){
      this.setState({
         success: false
      });
   }

   onSubmit(e) {
      e.preventDefault();

      const exercise = {
         username: this.state.username,
         description: this.state.description,
         duration: this.state.duration,
         date: this.state.date
      }

      axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => this.setState({ msg: res.data}));

      console.log(this.sate);

      this.setState({
         username : '',
         description: '',
         duration: 0,
         date: new Date(),
         success: true,
      });

    //  window.location = '/';
   }

   render() {
      
      let success_alert = '';
      if(this.state.success){
         success_alert = <AlertKaro success_msg={this.state.msg} onClose={this.onClose}></AlertKaro>
      }

      return (
         <div>
            {success_alert}
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit} >
               <div className="form-group">
                  <label>Username: </label>
                  <select ref="userInput" className="form-control"
                     required
                     value={this.state.username}
                     onChange={this.onChangeUsername}>
                     {
                        this.state.users.map(user => {
                           return <option
                              key={user}
                              value={user}>{user}
                              </option>;
                        })
                     }
                  </select>
               </div>
               <div>
                  <label>Description: </label>
                  <input 
                     required
                     type="text" 
                     className="form-control"
                     value={this.state.description}
                     onChange={this.onChangeDescription}
                  />
               </div>
               <div>
                  <label >Duration (in minutes): </label>
                  <input 
                     required
                     type="text" 
                     className="form-control"
                     value={this.state.duration}
                     onChange={this.onChangeDuration}
                  />
               </div>
               <div >
                  <label >Date: </label>
                  <div>
                     <DatePicker
                        value={this.state.date}
                        onChange={this.onChangeDate}
                     />
                  </div>
               </div>

               <div className="form-group" style={{marginTop: '20px'}}>
                  <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
               </div>
            </form>
         </div>
      )
   }
}
