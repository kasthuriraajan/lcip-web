import React, {Component} from 'react';
import {Card, Button, Row, InputGroup, Col, Form,} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class UserForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            appId : "A001",
            email:"",
            username : "",
            password : ""
        }
    }
    handleChange = (event)=> {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit = (event)=> {
        alert('Email : '+ this.state.email+'Username: ' + this.state.username + 'Password: '+this.state.password);
        const userInfo ={
            tenantId : this.state.appId,
            userEmail: this.state.email,
            userName :this.state.username,
            password : this.state.password
        }
        this.register(userInfo);
        event.preventDefault();
    }

    register = (userInfo)=>{
        fetch('http://localhost:9090/echo',{
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data =>console.log(data));
    this.props.setAddedUser(true);
    }

  render(){
    return(
        <Row className="justify-content-md-center">
            <Col lg="6" md="6" sm="6">
            <Card text = "dark" className="text-left" 
            style={{ marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header><h2><FontAwesomeIcon icon="user" />  Add User</h2></Card.Header> 
            <hr/>   
                <Form style={{ margin:'15px'}} onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text>Email &nbsp; &nbsp; &nbsp; &nbsp;</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="email" name="email" value={this.state.email} placeholder="Email"
                        onChange ={this.handleChange} />
                    </InputGroup>  
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text>Username</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="username" value={this.state.username} placeholder="Username" 
                        onChange ={this.handleChange}/>
                    </InputGroup> 
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text>Password</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" 
                        onChange ={this.handleChange}/>
                    </InputGroup>
                    <Row className="justify-content-md-center">
                        <Button variant="secondary" type='button' size="lg" style={{ margin:'5px'}}>Cancel</Button>
                        <Button variant="success" type='submit' value="Submit" size="lg" style={{ margin:'5px'}}>Add User</Button>
                    </Row>                    
                </Form>            
            </Card>
            </Col>
        </Row>
        

        );
    }
}
export default UserForm;
