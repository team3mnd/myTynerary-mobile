import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import ModalError from '../modalError/modalError'
import { Button } from 'react-native-elements';
import { getAccess, clearErrors } from '../store/actions/sesionActions.js';
import { connect } from "react-redux";
import * as Google from 'expo-google-app-auth';
import ButtonLogin from '../nav/buttonLogin.js';

class Login extends Component {
  constructor() {
    super();
    this.obtieneLogin = this.obtieneLogin.bind(this)
  }
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

  obtieneLogin() {
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

  async SignIn() {
    const result = await Google.logInAsync({
      androidClientId: '748277599795-j3v5pk26p9soo2v87otpme8gphq385hb.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });

    let response = {
      profileObj :result.Object
    }
    let user = {
      email: result.Object.email,
      password: 'google_pass_y_ya_fue',
      useGoogle: true,
      response
    };
    this.props.login(user)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ButtonLogin navigation={this.props.navigation} />
        <View style={{ width: '100%', height: '90%', alignItems: 'center' }}>
          {this.redirect()}
          {(this.state.mostrarErrores && this.state.errors) ?
            <ModalError style={styles.errorContainer} errors={this.props.errors} mostrar={() => this.mostrarErrores()} />
            : <View style={styles.errorContainer}></View>
          }
          <View style={styles.formContainer}>
            <Text style={{ textAlign: 'center', fontSize: 30, paddingBottom: '25%' }}>Login</Text>
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
                <Button color='#003499' title='Ok' onPress={e => this.obtieneLogin(e)} />
                <Button
                title='google'
                onPress={this.SignIn} />
              </View>
              <View style={styles.buttonRETContainer}>
                <Button color='#9bb7d4' title='return' onPress={e => this.props.navigation.navigate('init')} />
              </View>
            </View>
 
          </View>
        </View>

        )
      }
    }
    
    const styles = StyleSheet.create({
      mainContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%'
      },
      errorContainer: {
        width: '60%',
        marginTop: 10,
        backgroundColor: 'blue'
      },
      formContainer: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '5%'
      },
      textInputContainer: {
        width: '70%',
        height: 40,
        color: 'black',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 5,
      },
      buttonOKContainer: {
        width: '70%',
        flex: 1,
        height: 40,
        marginVertical: 5,
        zIndex: 1
      },
      buttonRETContainer: {
        width: '100%',
        bottom: 0,
        zIndex: 1
      }
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
