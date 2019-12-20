import React, { Component } from 'react'
import { Button } from 'react-native';
import { Text, View } from 'react-native';
import { getExit } from '../store/actions/sesionActions.js';
import { connect } from "react-redux";
import ButtonLogin from '../nav/buttonLogin.js';
 
class Logout extends Component {
  state = {
    user: "",
    password: "",
    checkRemember: false,
    redirect: false
  };
 
  componentDidMount() {
    this.props.sessionOff();
  }
  render() {
    return (
      <View>
        <ButtonLogin navigation={this.props.navigation} />
        <View style={{width: '100%'}}>
          <Text style={{ textAlign: 'center', fontSize: 30, paddingBottom: '25%', paddingTop: '25%' }}>You have successfully logged out</Text>
          <Button color='#9bb7d4' style={{width: '50%'}}
            title="Back Home"
            onPress={() => this.props.navigation.navigate("Home")} />
        </View>
      </View>
    )
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    sessionOff: () => dispatch(getExit())
  };
};
 
export default connect(null, mapDispatchToProps)(Logout);