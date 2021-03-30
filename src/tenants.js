import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Tenants extends Component{
  render(){
    return(
        <Card text = "dark" className="text-left" 
            style={{ minHeight: '50rem' ,  marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header><h2><FontAwesomeIcon icon="university" />  Home</h2></Card.Header> 
            <hr/>   
            <Card.Text className="text-center" >
                <h2>Welcome to LCIP</h2>
                You can manage your tenant here.
            {/* <h3>Your Tenant is : {localStorage.getItem("org")}</h3>  */}
            </Card.Text>  
        </Card>

        );
    }
}
export default Tenants;
