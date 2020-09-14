import React, { Component } from 'react';
import Login from './components/LoginComponent';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store= ConfigureStore();

class App extends Component {

  render(){
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div>
      <Login />  
    </div>
    </BrowserRouter>
    </Provider>
  );
  //Above the info in dishes state is passed via creating a property dishes to the MenuComponent class(i.e Menu) 
}; 
}

export default App;
