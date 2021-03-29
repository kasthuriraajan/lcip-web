import React, {Component} from 'react';
import {Card, Button, Row, InputGroup, Col, Form,} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AppForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            appName:"",
            callbackURL : ""
        }
    }
    handleChange = (event)=> {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit = (event)=> {
        const appInfo ={
            tenantId : localStorage.getItem("org"),
            appName : this.state.appName,
            callBackUrl : this.state.callbackURL
        }
        fetch('https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/application',{
        method: 'POST',
            headers: {
                'content-type':'application/json'
            },
                body: JSON.stringify(appInfo)
        })
        .then(res => res.json())
        .then(data =>'Status' in data?(alert(data.Status)):console.log(data));
        this.props.setCreatedApp(true);
        event.preventDefault();
    }

  render(){
    return(
        <Row className="justify-content-md-center">
            <Col lg="6" md="6" sm="6">
            <Card text = "dark" className="text-left" 
            style={{ marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header><h2><FontAwesomeIcon icon="layer-group" />  Create App</h2></Card.Header> 
            <hr/>   
                <Form style={{ margin:'15px'}} onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text>App Name &nbsp; &nbsp;</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="appName" value={this.state.appName} placeholder="App Name" 
                        onChange ={this.handleChange}/>
                    </InputGroup>  
                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                        <InputGroup.Text>Callback URL</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="callbackURL" value={this.state.callbackURL} placeholder="Callback URL"
                        onChange ={this.handleChange} />
                    </InputGroup>
                    <Row className="justify-content-md-center">
                        <Button variant="secondary" type='button' size="lg" style={{ margin:'5px'}}>Cancel</Button>
                        <Button variant="success" type='submit' value="Submit" size="lg" style={{ margin:'5px'}}>Create App</Button>
                    </Row>                   
                </Form>
                
            </Card>
            </Col>
        </Row>
        

        );
    }
}
export default AppForm;
