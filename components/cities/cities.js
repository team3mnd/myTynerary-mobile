import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { getAllCities } from "../store/actions/citiesActions";

class Cities extends Component {
    state = {
        filter: '',
        filteredCities: []
    }

    componentDidMount() {
        this.props.getCities();
    }

    componentDidUpdate(prevProps) {
        if (this.props.cities !== prevProps.cities)
            this.setState({
                filteredCities: this.props.cities
            });
    }

    render() {
        let { filteredCities } = this.state
        return (
            <ScrollView>
                <Text>Filter by City name:</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Example : Roma"
                    onChangeText={(filter) => this.setState({ filter })}
                    value={this.state.filter}
                />

                {this.props.loading
                    ? (<View><Text>nothing</Text></View>)
                    : filteredCities.length === 0
                        ? (<View><Text>City not found</Text></View>)
                        : filteredCities.sort((a, b) => {
                            if (a.name > b.name) {
                                return 1;
                            }
                            if (a.name < b.name) {
                                return -1;
                            }
                            return 0;
                        }).map(city => {
                            return (
                                <View key={city._id}>
                                    <Image source={{ uri: city.url }} style={{ width: '80%', height: 200 }} />
                                    <Text>{city.name}</Text>
                                    <Text>{city.country}</Text>
                                </View>);
                        })}
            </ScrollView>
        )
    }
}


const mapStateToProps = state => {
    return {
        cities: state.cityReducer.cities,
        loading: state.cityReducer.isFetching
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCities: () => dispatch(getAllCities())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);