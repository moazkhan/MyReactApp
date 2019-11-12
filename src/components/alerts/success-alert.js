import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

class SuccessAlert extends Component {
   render(){

      return (
         <Alert variant="success" onClose={() => this.props.onClose} dismissible>
               <Alert.Heading>{this.props.success_msg}</Alert.Heading>
         </Alert>
      );

   }
}

export default SuccessAlert;