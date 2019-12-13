import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import ModalError from '../modalError/modalError'
import { Button } from 'react-native-elements';
import { getAccess, clearErrors } from '../store/actions/sesionActions.js';
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';

class Login extends Component {
  state = {
    user: "",
    password: "",
    checkRemember: false,
    redirect: false,
    mostrarErrores: false,
    errors: ""
  };

  valueUser = user => this.setState({user})

  componentDidUpdate(prevProps) {
    if (this.props.success !== prevProps.success) {
      this.setState({
        redirect: this.props.success
      });
    }
    if (this.props.errors !== prevProps.errors) {
      this.setState({
        mostrarErrores: true,
        errors: this.props.errors
      });
    }
  }

  valuePassword = password => this.setState({password});

  obtieneLogin(e) {
    let user = {
      email: this.state.user,
      password: this.state.password,
      useGoogle: false
    };
    this.props.login(user)
    if (this.props.errors) {
      this.setState({
        mostrarErrores: true
      })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect === true) {
      console.log(this.state.redirect)
      return this.props.navigation.navigate("Home");
    }
  } 

  mostrarErrores() {
    this.props.clearCurrentErrors();
    this.setState({
      mostrarErrores: false
    })
  }

  render() {
    const responseGoogle = (response) => {
      let user = {
        email: response.profileObj.email,
        password: 'google_pass_y_ya_fue',
        useGoogle: true,
        response: response
      };
      this.props.login(user)
    }
    return (
      <>
        {(this.state.mostrarErrores && this.state.errors) ?
          <ModalError errors={this.props.errors} mostrar={() => this.mostrarErrores()} />
          : <View></View>
        }
        <View style={styles.containerGeneral}>
          <Text style={{ textAlign: 'center' }}>login</Text>
          <TextInput
            placeholder="Enter email"
            onChangeText={this.valueUser}
            value={this.state.user} />
          <TextInput
            placeholder="Enter password"
            onChangeText={this.valuePassword}
            value={this.state.password} />
          {this.renderRedirect()}
          <Button
            title='OK'
            onPress={e => this.obtieneLogin(e)} />
        </View>
      </>
    )
  }
}
const styles = StyleSheet.create({
  containerGeneral: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      width: '90%',
      borderStyle: 'solid',
      borderColor: 'grey',
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
  }
})

const mapStateToProps = (state) => {
  return {
    success: state.sesionReducer.success,
    token: state.sesionReducer.token,
    errors: state.sesionReducer.errors
  }
};

const mapDispatchToProps = (dispatch) => ({
  login: (user) => {
    dispatch(getAccess(user))
  },
  clearCurrentErrors: () => {
    dispatch(clearErrors())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
