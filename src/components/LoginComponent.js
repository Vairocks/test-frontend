import React, {Component} from 'react';
import {Button, FormLabel, Col,Row,Card} from 'react-bootstrap';
import { Control, LocalForm,Errors } from 'react-redux-form';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {login,logout,register, fetchUsers} from '../redux/ActionCreator';
const required = (val) => (val && val.length);
const maxLength =(len) => (val) => !(val) || (val.length <= len );
const minLength =(len) => (val) => !(val) || (val.length >= len );

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            regComp:false
        }
    }

    setRegComp(){
        this.setState({regComp: !this.state.regComp});
        var x = document.getElementById("details");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
        var y = document.getElementById("bttns");
        if (y.style.display === "none") {
          y.style.display = "block";
        } else {
          y.style.display = "none";
        }
    }

    componentDidMount() {
        alert(JSON.stringify(this.props.login_status));
        this.props.fetchUsers();
    }

    handleSubmit(values){
        if(!this.state.regComp){
        this.props.login(values.username,values.password); 
        console.log("Current State is: "+JSON.stringify(values));
        }
        else{ 
            this.props.register(values);
    if(this.props.registered){ this.setRegComp();}
        }

    }

    render()
    {
        if(!this.props.login_status.loggedIn){    
    return(
         <Card className="text-center offset-md-3 offset-sm-2  mt-3 mb-3" style={{ width: '32rem' }}><Card.Body>
         <Card.Header className="nav-color">Login/Register</Card.Header>
         <Card.Text>
         <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <FormLabel htmlFor="username" >UserName:</FormLabel>
                    <Col>
                        <Control.text  model=".username" className="form-control" id="username" 
                         name="username" placeholder="UserName"    
                         validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(25)
                                    }}
                        />
                        <Errors
                            className="errors"
                            model= ".username"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 25 characters or less'
                                }} 
                        />
                    </Col>
                </Row>
                <Row className="form-group">
                    <FormLabel htmlFor="password" >Password:</FormLabel>
                    <Col>
                        <Control.text type="password" model=".password" className="form-control" id="password" 
                         name="password" placeholder="your password"    
                         validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(25)
                                    }}
                        />
                        <Errors
                            className="errors"
                            model= ".password"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 25 characters or less'
                                }} 
                        />
                    </Col>
                </Row>
                <fieldset id="details" style={{"display":"none"}}>
                <legend>Details:</legend>
                <Row className="form-group">
                    <FormLabel htmlFor="firstname" >FirstName:</FormLabel>
                    <Col>
                        <Control.text  model=".firstname" className="form-control" id="firstname" 
                         name="name" placeholder="First Name"    
                         validators={{
                                        
                                    }}
                        />
                        <Errors
                            className="errors"
                            model= ".first"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 25 characters or less'
                                }} 
                        />
                    </Col>
                </Row>
                <Row className="form-group" id="reg">
                    <FormLabel htmlFor="lastname" >LastName:</FormLabel>
                    <Col>
                        <Control.text  model=".lastname" className="form-control" id="lastname" 
                         name="name" placeholder="Last Name"    
                         validators={{
                                        
                                    }}
                        />
                        <Errors
                            className="errors"
                            model= ".lastname"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 25 characters or less'
                                }} 
                        />
                    </Col>
                </Row>
                <Row>
                    <Button type="submit" className="primary" >
                            Register
                        </Button>
                    <span className="col"></span>
                        <Button className="primary" onClick={() => this.setRegComp()} >
                            Login
                        </Button>
                    </Row>
                </fieldset>
                <fieldset id="bttns">
                <Row className="form-group">
                    <Col >
                  
                        <Button type="submit" className="primary">
                            Login
                        </Button>
                        <span className="col"></span>
                        <Button className="primary" onClick={() => this.setRegComp()} >
                            Register
                        </Button>
                    </Col>
                </Row>
                </fieldset>
            </LocalForm>
            </Card.Text>
             </Card.Body></Card>   
        
   );
   }
   else{
       const usrs = this.props.users.users.map((usr) => {
        return (
            <p>{usr.username}</p>
        );
    });
       
       return(<> 
    <Button variant="primary" onClick={() => this.props.logout()}>
    <span className="fa fa-sign-in sm" >Logout</span>
    </Button> 
    <div className="container">
        {usrs}
    </div>
    
    </>
   );  }
}
}
const mapStateToProps = state => {
    const { registering, registered, errMess } = state.registration;
    return { registering, registered,
      login_status: state.authentication,
      users: state.users
    }
  }
  const mapDispatchToProps = (dispatch) => ({
    login: (username,password) => dispatch(login(username,password)),
    logout: () => dispatch(logout()), 
    register: (user) => dispatch(register(user)),
    fetchUsers: () => dispatch(fetchUsers())   
  });
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

//export default Login;