import React, { Component } from 'react';
import {  Navbar, Nav, Row, Col, Button } from 'react-bootstrap';
import Apps from './appslist';
import Sidebar from './sidebar';
import Tenants from './tenants';
import Users from './users';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
          dashboardContent : "USERS"
        }
      }
    loadDashboard = (resp)=>{
        console.log("Display Loaded");
        console.log(this.resp);
        this.setState({
            dashboardContent:resp
        });
    }
    logout=()=>{
        console.log("LoggedOut")
        this.props.loginState(false);
    }
    componentDidMount(){
        console.log("Hello NMonted");
        fetch("http://localhost:9090/users")
      .then(res => res.json())
      .then(data=>console.log(data));
    }
    render(){
        var dashboardContent = <Users/>;
        if("USERS"===this.state.dashboardContent){
            dashboardContent = <Users/>
        }
        else if("APPS"===this.state.dashboardContent){
            dashboardContent = <Apps/>
        }
        else{
            dashboardContent = <Tenants/>
        }
        return(
            <div>
{/*------------------------------- Navbar ------------------------------------- */}
                <Navbar bg="dark" variant="dark" sticky="top" >
                    <Navbar.Brand href="#home"><h1>LCIP </h1></Navbar.Brand>
                    <Nav className="ml-auto">
                    <Navbar.Brand>A Light-weight Cloud Identity provider</Navbar.Brand> 
                        <Button variant="danger" type='button' onClick={this.logout}>Logout</Button>
                    </Nav>                   
                </Navbar>
{/*------------------------------- Body ------------------------------------- */}
                <Row>
                    <Col lg="2" md="2" sm="2"><Sidebar loadContent={this.loadDashboard}/></Col>
                    <Col lg="10" md="10" sm="10"> {dashboardContent} </Col>
                </Row>
{/*------------------------------- Footer ------------------------------------- */}
                <Navbar bg="dark" variant="dark" fixed="bottom" className="justify-content-center">
                <Navbar.Brand >Copyright&#169; 2021</Navbar.Brand>
                </Navbar>
                
            </div>
        );
    }
}
export default Dashboard;
