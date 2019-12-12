import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ModalError extends Component {
  mostrar() {
    this.props.mostrar()
  }

  render() {
    return (
      <View>
        <Text>Error</Text>
        <Text>{this.props.errors}</Text>
        <Button 
          title="Close" onPress={() => this.mostrar()}/>
      </View>
    )
  }
}
