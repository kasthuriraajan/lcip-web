import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {Row, Col, Card, Button,Form,InputGroup } from 'react-bootstrap';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            appId : "A001",
            tenantName:"",
            email:"",
            username : "",
            password : ""
        }
    }
    handleChange = (event)=> {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit = (event)=> {
        alert('Tenant : '+ this.state.tenantName+'UserName: ' + this.state.username);
        const tenantInfo ={
            tenantName : this.state.tenantName
        }        
        this.createTenant(tenantInfo);
        event.preventDefault();
    }

    createTenant = (tenantInfo)=>{
        fetch('http://localhost:9090/echo',{
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
            body: JSON.stringify(tenantInfo)
        })
        .then(res => res.json())
        .then(data =>console.log(data));
        const userInfo = {
            tenantId : "T001",
            userEmail: this.state.email,
            userName : this.state.username,
            password : this.state.password
        }
        this.register(userInfo);
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
    this.props.getRegister(true);
    }

    render(){
        return(
        <Row className="justify-content-md-center">
            <Col lg="4" md="4" sm="4">
            <Card text = "dark" className="text-center" 
            style={{ marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header>
                <h1> LCIP </h1>
                <p>A Light-weight Cloud Identity provider</p>
            </Card.Header> 
            <Card.Title  style={{ marginTop:'15px'}}><h2>Register Here</h2></Card.Title>
            <hr/>   
                <Form style={{ margin:'15px'}} onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon='university'/> </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="tenantName" value={this.state.tenantName} placeholder="Tenant Name" 
                        onChange ={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon='envelope'/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="email" name="email" value={this.state.email} placeholder="Email" 
                        onChange ={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon='user'/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="username" value={this.state.username} placeholder="Username" 
                        onChange ={this.handleChange}/>
                    </InputGroup> 
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon='key'/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" 
                        onChange ={this.handleChange}/>
                    </InputGroup>
                    <Button variant="secondary" type='submit' size="lg" style={{ margin:'5px'}}>Clear</Button>
                    <Button variant="success" type='submit' value="Submit" size="lg" >Register</Button>                      
                </Form>
            </Card>
            </Col>
        </Row>
        );
    }
}
export default Register;
