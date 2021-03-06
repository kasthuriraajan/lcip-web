import React, {Component} from 'react';
import {Card, Button, Table, Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppForm from './createApp';

class Apps extends Component{
    constructor(props){
        super(props);
        this.state = {
          isCreateApp : false,
          isDelete : false,
          selectedApp : "",
          apps : []
        }
    }

    launchCreateApp = ()=>{
        this.setState({
            isCreateApp : true
        });
    }
    setAppCreated = (resp) => {
        this.setState({
            isCreateApp : !resp
        }); 
    }
    handleClose = () => {this.setState({
        isDelete : false,
        selectedApp : ""
        });
    }
    handleShow = (event) => {
        this.setState({
            isDelete : true ,
            selectedApp : event.target.value
        });
    }
    handleDelete = () => {
        fetch('https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/application/'+this.state.selectedApp
        +'?tenantId='+localStorage.getItem("org"),{
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem("token")
        }
        })
        .then(res => res.json())
        .then(data =>this.afterDelete(data));
    }
    afterDelete = (data)=>{
        if('message' in data){
            alert(data.message);
            fetch("https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/application/list?tenantId="
            +localStorage.getItem("org"),{
                    headers: {
                        'Authorization': 'Bearer '+localStorage.getItem("token")
                    }})
            .then(res => res.json())
            .then(data=>this.setState({apps:data}));
        }
        else{
            console.log(data);
        }
        this.setState({
            isDelete : false,
            selectedApp : ""
        });
    }
    afterAdd = (data)=>{
        if('appName' in data){
            alert("App " +data.appName+ " is Created.");
            fetch("https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/application/list?tenantId="
            +localStorage.getItem("org"),{
                    headers: {
                        'Authorization': 'Bearer '+localStorage.getItem("token")
                    }})
            .then(res => res.json())
            .then(data=>this.setState({apps:data}));
        }
        else{
            console.log(data);
        }
    }
    componentDidMount(){
        fetch("https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/application/list?tenantId="
        +localStorage.getItem("org"),{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem("token")
                }})
        .then(res => res.json())
        .then(data=>this.setState({apps:data}));
    }
    
    render(){        
        var isCreateApp = this.state.isCreateApp;
        const appInfo = this.state.apps.map(app => (
            <tr key={app.clientID}>
            <td>{app.clientID}</td>
            <td>{app.applicationName}</td>
            <td>{app.callbackURL}</td>
            <td>{app.tenantName}</td>
            <td><button className='btn btn-danger' name="deleteApp" value={app.applicationName} onClick={this.handleShow}>Delete</button></td>
            <Modal show={this.state.isDelete} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete application:-  {this.state.selectedApp} ?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" type="button" onClick={this.handleDelete}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
        </tr>
        ));
        var table = (        
            <div>     
                    <Card.Text>
                        <Button variant="success" type='button' size="lg" style={{ margin:'5px'}} 
                        onClick={this.launchCreateApp}>Create App</Button>
                        <hr/> 
                    </Card.Text>   
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>App ID</th>
                                <th>Application Name</th>
                                <th>Callback URL</th>
                                <th>Tenant ID</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appInfo}
                        </tbody>
                    </Table>
            </div> );
    return(
        <Card text = "dark" className="text-left" 
            style={{ minHeight: '50rem' ,  marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header><h2><FontAwesomeIcon icon="layer-group" />  Apps</h2></Card.Header> 
            <hr/>  
            {isCreateApp?<AppForm setAddedAppData={this.afterAdd} setCreatedApp = {this.setAppCreated}/>:table} 
        </Card>

        );
    }
}
export default Apps;
