import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import ModalError from '../modalError/modalError'
import { Button } from 'react-native-elements';
import { getAccess, clearErrors } from '../store/actions/sesionActions.js';
import { connect } from "react-redux";

class Login extends Component {
  state = {
    user: "",
    password: "",
    checkRemember: false,
    redirect: false,
    mostrarErrores: false,
    errors: ""
  };

  valueUser = user => this.setState({ user })

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

  valuePassword = password => this.setState({ password });

  obtieneLogin(e) {
    let user = {
      email: this.state.user,
      password: this.state.password,
      useGoogle: false
    };
     this.props.login(user)
    if(! this.props.errors){
      this.redirect()
    }
    if (this.props.errors) {
      this.setState({
        mostrarErrores: true
      })
    }
  }

  redirect = () => {
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
    return (
      <View style={styles.mainContainer}>
        <>
          {(this.state.mostrarErrores && this.state.errors) ?
            <ModalError style={styles.errorContainer} errors={this.props.errors} mostrar={() => this.mostrarErrores()} />
            : <View style={styles.errorContainer}></View>
          }
          <View style={styles.formContainer}>
            <Text style={{ textAlign: 'center', fontSize: 30 }}>Login</Text>
            <TextInput
              keyboardType='email-address'
              placeholder="Enter email"
              onChangeText={this.valueUser}
              value={this.state.user}
              style={styles.textInputContainer} />
            <TextInput
              secureTextEntry={true}
              placeholder="Enter password"
              onChangeText={this.valuePassword}
              value={this.state.password}
              style={styles.textInputContainer} />
            <View style={styles.buttonOKContainer}>
              <Button
                title='OK'
                onPress={e => this.obtieneLogin(e)} />
            </View>
            
          </View>
          <View style={styles.buttonRETContainer}>
            <Button title='return'
              onPress={e => this.props.navigation.navigate('init')} />
          </View>
        </>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  formContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '50%'
  },
  textInputContainer: {
    width: 200,
    height: 40,
    color: 'black',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 5,
  },
  buttonOKContainer: {
    flex: 1,
    width: 200,
    height: 40,
    marginVertical: 5,
  },
  buttonRETContainer: {
    flex: 1,
    width: '100%',
    height: 40,
    marginVertical: 0,
    position: 'absolute',
    bottom: 0
  },
});

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
