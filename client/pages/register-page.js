import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card } from 'react-toolbox';

import RegisterForm from '../components/register-form';
import * as actions from './../actions/auth';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(userData) {
    console.log(JSON.stringify(userData));
    this.props.signupUser(userData);
  }

  render() {
    const { user, from } = this.props;

    if (user.authenticated) {
      return <Redirect to={from} />;
    }
    return (
      <Card style={{width: '350px', margin: '1rem' }}>
        <RegisterForm onSubmit={this.handleFormSubmit} />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const location = state.location && state.location.state;
  return {
    from: location || { pathname: '/home' },
    user: state.user || {}
  };
}

export default connect(mapStateToProps, actions)(RegisterPage);
