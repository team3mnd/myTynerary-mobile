import React, { Component } from 'react';
import { ScrollView, Image, StyleSheet, TextInput, Text, View, Button, Picker } from 'react-native';
import { CheckBox } from 'react-native-elements';


export default class SignUp extends Component {
  state = {
    imageProfile: 'https://www.selectforsakring.se/wp-content/uploads/sites/5/2018/09/anonymous.png',
    expandChangeImage: false,
    textAddImage: 0,
    img: '',
    errors: "",
    mostrarErrores: false,
    username: '',
    Password: '',
    lastName: '',
    firstName: '',
    email: '',
    checkTC: false,
    country: '',
    redirect: false
  }

  changeImage() {
    if (this.state.img !== "") {
      this.setState({
        imageProfile: this.state.img,
        expandChangeImage: false,
        textAddImage: 1
      });
    }
  }

  obtenerDatos() {
    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.Password,
      userName: this.state.username,
      mail: this.state.email,
      country: this.state.country,
      picture: this.state.imageProfile
    };

    console.log(user);
    if ((this.state.checkTC)) {
      this.setState({
        errors: "You have to accept Terms and Conditions agreement",
        mostrarErrores: true
      })
    }
    else {
      fetch('https://mytinerary-back.herokuapp.com/users/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(res => {
          if (res.expressErrors || res.databaseErrors) {
            if (res.expressErrors) {
              if (res.expressErrors.errors.length === 2) {
                this.setState({
                  errors: "Invalid Email & password (5 characters minimum)",
                  mostrarErrores: true
                })
              }
              else if (res.expressErrors.errors[0].param === "mail") {
                this.setState({
                  errors: "Invalid Email",
                  mostrarErrores: true
                })
              }
              else if (res.expressErrors.errors[0].param === "password") {
                this.setState({
                  errors: "Invalid password (5 characters minimum)",
                  mostrarErrores: true
                })
              }
            }
            if (res.databaseErrors) {
              if (res.databaseErrors.errors.mail && res.databaseErrors.errors.userName) {
                this.setState({
                  errors: "Email & username already registered",
                  mostrarErrores: true
                })
              }
              else {
                if (res.databaseErrors.errors.mail) {
                  this.setState({
                    errors: "Email already registered",
                    mostrarErrores: true
                  })
                } else if (res.databaseErrors.errors.userName) {
                  this.setState({
                    errors: "Username already used",
                    mostrarErrores: true
                  })
                }
              }
            }
          }
          else {
            this.props.navigation.navigate('init');
          }
        })
        .catch(error => console.log("catch", error))
    }
  }

  render() {
    return (
      <ScrollView>
        <Text>Create Acount</Text>
        <Image
          source={{ uri: this.state.imageProfile }}
          style={{ width: '80%', height: 220, borderRadius: 50 }} />
        {this.state.textAddImage === 0 && (
          <Button title='+'
            onPress={() =>
              this.setState({
                expandChangeImage: !this.state.expandChangeImage
              })}>
          </Button>)}
        {this.state.expandChangeImage && (
          <>
            <Text>Insert URL:</Text>
            <TextInput
              style={{
                width: '100%',
                borderBottomColor: '#000000',
                borderBottomWidth: 1
              }}
              onChangeText={(img) => this.setState({ img })}
              value={this.state.img} />
            <Button onPress={() => this.changeImage()} title='Add Photo'></Button>
          </>)
        }
        <Text>Username:</Text>
        <TextInput
          style={{
            width: '100%',
            borderBottomColor: '#000000',
            borderBottomWidth: 1
          }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username} />
        <Text>Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={{
            width: '100%',
            borderBottomColor: '#000000',
            borderBottomWidth: 1
          }}
          onChangeText={(Password) => this.setState({ Password })}
          value={this.state.Password} />
        <Text>email:</Text>
        <TextInput
          style={{
            width: '100%',
            borderBottomColor: '#000000',
            borderBottomWidth: 1
          }}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email} />
        <Text>First Name:</Text>
        <TextInput
          style={{
            width: '100%',
            borderBottomColor: '#000000',
            borderBottomWidth: 1
          }}
          onChangeText={(firstName) => this.setState({ firstName })}
          value={this.state.firstName} />
        <Text>Last Name:</Text>
        <TextInput
          style={{
            width: '100%',
            borderBottomColor: '#000000',
            borderBottomWidth: 1
          }}
          onChangeText={(lastName) => this.setState({ lastName })}
          value={this.state.lastName} />
          <Text>Select your country</Text>
        <Picker
          mode = 'dropdown'
          selectedValue={this.state.country}
          style={{ height: 50, width: '60%' }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ country: itemValue })
          }>
          <Picker.Item label="Colombia" value="Colombia" />
          <Picker.Item label="England" value="England" />
          <Picker.Item label="France" value="France" />
          <Picker.Item label="Germany" value="Germany" />
          <Picker.Item label="Holland" value="Holland" />
          <Picker.Item label="Spain" value="Spain" />
          <Picker.Item label="United States" value="United States" />
        </Picker>
        <CheckBox
          title='Click Here'
          checked={this.state.checkTC}
          onPress={() => { this.setState({ checkTC: !this.state.checkTC }) }}
        />

        <Button title='Submit' onPress={() => { this.obtenerDatos() }} />
        <Button title='return' onPress={e => this.props.navigation.navigate('init')} />
      </ScrollView>
    )
  }
}
