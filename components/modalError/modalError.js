import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ModalError extends Component {
  mostrar() {
    this.props.mostrar()
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Error</Text>
          <Text style={styles.modalText}>{this.props.errors}</Text>
          <Button color='#9bb7d4'
            title="Close" onPress={() => this.mostrar()} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '80%',
    height: 120,
    color: 'black',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginTop: 0,
  },
  modalTitle: {
    width: '100%',
    backgroundColor: 'red',
    color: 'white',
    // color: 'red',
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalText: {
    fontSize: 15,
    marginVertical: 10,
    textAlign: 'center',
  }
})
