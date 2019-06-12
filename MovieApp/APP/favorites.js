import React from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';

export default class Favorites extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
        };
    }
    _renderItem = (item,index) => {
        return (
            <View key={index}>
                <Text>{item.Title}</Text>
            </View>
        )
    }

    favList = () => {
        <Text>exampl</Text>
    }

    render() {
        console.log(this.props.favoriteItems);
        let data = this.props.favoriteItems;
        return(
            <View>
                <Text>From main</Text>

                {
                    data.map(item => {
                        <Text>map</Text>
                    })
                }
            </View>
        );
    }
}