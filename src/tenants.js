import React, {Component} from 'react';
import {Card, Button, Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Tenants extends Component{
  render(){
    return(
        <Card text = "dark" className="text-left" 
            style={{ minHeight: '50rem' ,  marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header><h2><FontAwesomeIcon icon="university" />  Tenant Detail</h2></Card.Header> 
            <hr/>   
            <Card.Text>
            <hr/> 
            </Card.Text>  
        </Card>

        );
    }
}
export default Tenants;
