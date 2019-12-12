import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default class SignUp extends Component {
    state ={
        imageProfile : '',
        expandChangeImage: false
    }
    render() {
        return (
            <View>
                <Text>Create Acount</Text>
                <Image 
                    source={this.state.imageProfile}
                    style={{ width: 220, height: 220, borderRadius: "50%" }}
                    onPress={() =>
                        this.setState({
                          expandChangeImage: !this.state.expandChangeImage
                        })}/>
                <TextInput
                    style={{ height: 40 }}
                    onChangeText={(filter) => this.setState({ filter })}
                    value={this.state.filter}
                />
            </View>
        )
    }
}
