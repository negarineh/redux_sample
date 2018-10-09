import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { history } from './_helpers';
import { alertActions } from './_actions';

import { ContactsList }  from './Components/ContactsList';

class App extends Component {

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {

      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="App">
      {alert.message &&
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      }
        <ContactsList/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
