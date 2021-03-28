import React, {Component} from 'react';
import {Card, Button, Table, Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserForm from './createUser';

class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
          isUserAdd : false,
          isDelete : false,
          selectedUser : "",
          users : []
        }
      }
    launchAddUser = ()=>{
        this.setState({
            isUserAdd : true
        });
    }
    setUserAdded = (resp) => {
        this.setState({
            isUserAdd : !resp
        }); 
    }
    handleClose = () => {this.setState({
        isDelete : false,
        selectedUser : ""
        });
    }
    handleShow = (event) => {
        this.setState({
            isDelete : true ,
            selectedUser : event.target.value
        });
    }
    handleDelete = () => {     
        alert('User  '+ this.state.selectedUser + '  is Deleted');
        this.setState({
            isDelete : false,
            selectedUser : ""
        });
    }
    componentDidMount(){
        fetch("https://5n3eaptgj4.execute-api.us-east-1.amazonaws.com/dev/user/list")
        .then(res => res.json())
        .then(data=>this.setState({users:data}));
        console.log(this.state.users);
    }

  render(){
      var isUserAdd = this.state.isUserAdd;
      const userInfo = this.state.users.map(user => (
            <tr key={user.UserName}>
            <td>{user.UserName}</td>
            <td>{user.Email}</td>
            <td>{user.TenantName}</td>
            <td><button className='btn btn-danger' name="deleteUser" value={user.UserName} onClick={this.handleShow}>Delete</button></td>
            <Modal show={this.state.isDelete} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete user:-  {this.state.selectedUser} ?</Modal.Body>
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
            <Button variant="success" type='button' size="lg" style={{ margin:'5px'}} onClick={this.launchAddUser}>Add User</Button>
            <hr/> 
            </Card.Text>     
            <Table responsive>
            <thead>
                <tr>                    
                    <th>Username</th>
                    <th>Email</th>
                    <th>Tenent ID</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {userInfo}
            </tbody>
            </Table> 
          </div>
      );
    return(
        <Card text = "dark" className="text-left" 
            style={{ minHeight: '50rem' ,  marginTop:'5px', marginRight:'5px', borderColor:'black'}}>
            <Card.Header><h2><FontAwesomeIcon icon="users" />  Users</h2></Card.Header> 
            <hr/>
            {isUserAdd?<UserForm setAddedUser={this.setUserAdded}/>:table}
        </Card>
        
        );
    }
}
export default Users;
