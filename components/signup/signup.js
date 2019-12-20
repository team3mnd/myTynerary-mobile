import React, { Component } from 'react';
import { ScrollView, Image, StyleSheet, TextInput, Text, View, Button, Picker } from 'react-native';
import { CheckBox } from 'react-native-elements';
import ButtonLogin from '../nav/buttonLogin.js';

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
  } co

  render() {
    return (

      <ScrollView >

        <ButtonLogin navigation={this.props.navigation} />
        <View style={styles.mainContainer}>
          <Text style={{ textAlign: 'center', fontSize: 30, paddingBottom: '5%' }}>Create Acount</Text>
          <View style={{ width: '50%', paddingBottom: '2%' }}>
            <Image
              source={{ uri: this.state.imageProfile }}
              style={styles.profileImage} />

            {this.state.textAddImage === 0 && (
              <Button color='#003499' style={styles.buttons} title='+'
                onPress={() =>
                  this.setState({
                    expandChangeImage: !this.state.expandChangeImage
                  })}>
              </Button>)}
            {this.state.expandChangeImage && (
              <>
                <Text style={styles.texts}>Insert URL:</Text>
                <TextInput
                  style={styles.inputs}
                  onChangeText={(img) => this.setState({ img })}
                  value={this.state.img} />
                <Button onPress={() => this.changeImage()} title='Add Photo'></Button>
              </>)
            }
          </View>
          <View style={{ width: '70%' }}>
            <Text style={styles.texts}>Username:</Text>
            <TextInput
              style={styles.inputs}
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username} />
            <Text style={styles.texts}>Password:</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.inputs}
              onChangeText={(Password) => this.setState({ Password })}
              value={this.state.Password} />
            <Text style={styles.texts}>Email:</Text>
            <TextInput
              style={styles.inputs}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email} />
            <Text style={styles.texts}>First Name:</Text>
            <TextInput
              style={styles.inputs}
              onChangeText={(firstName) => this.setState({ firstName })}
              value={this.state.firstName} />
            <Text style={styles.texts}>Last Name:</Text>
            <TextInput
              style={styles.inputs}
              onChangeText={(lastName) => this.setState({ lastName })}
              value={this.state.lastName} />
            <Text>Select your country</Text>
            <Picker
              mode='dropdown'
              selectedValue={this.state.country}
              style={styles.pickerStyle}
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

            <View style={styles.buttonOKContainer} >
              <Button color='#003499' title='Submit' onPress={() => { this.obtenerDatos() }} />
            </View>
          </View>
          <View style={styles.buttonRETContainer}>
            <Button color='#9bb7d4' title='return' onPress={e => this.props.navigation.navigate('init')} />
          </View>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  containerGeneral: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  },
  mainContainer: {
    alignItems: 'center',
    height: '100%'
  },
  buttonOKContainer: {
    width: '100%',
    flex: 1,
    height: 40,
    marginVertical: 5,
  },
  profileImage: {
    height: 200,
    borderRadius: 100,
    marginBottom: '5%'
  },
  inputs: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1
  },
  texts: {
    color: 'grey'
  },
   buttonRETContainer: {
    width: '100%',
    bottom: 0
  } 
});