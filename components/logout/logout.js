import React, { Component } from 'react'
import { Button } from 'react-native-elements';
import { Text, View} from 'react-native';
import { getExit } from '../store/actions/sesionActions.js';
import { connect } from "react-redux";

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
        <Text>you have successfully logged out</Text>
        <Button
        title="Back Home"
        onPress={()=> this.props.navigation.navigate("Home")}/>
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
