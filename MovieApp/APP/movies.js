import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Overlay } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Favorites from './favorites';

export default class Movies extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            fav: [],
            searchText: '',
            displayFavourite: false,
            favMarked: []
        };
    }

    componentDidMount() {
        fetch('http://www.omdbapi.com/?apikey=4bbb749a&s=avengers')
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    dataSource: responseJson.Search,
                    dataSourceOld: responseJson.Search
                })
            })
            .catch(error => alert('Unable to fetch data'))
    }

    movieDetails = () => {
        return (
            <View>
                <Text>from dets</Text>
            </View>
        )
    }

    _renderItem = ({item,index}) => {
        const { fav } = this.state;
        return (
        <View style={Styles.movieList} key={index}>
            <TouchableOpacity onPress={() => this.movieDetails(item)}>
                    <Text style={Styles.title}>{item.Title}</Text>
            </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setFavourite(index)}>
                    <Icon style={Styles.navItem} name={fav[index]? "favorite": "favorite-border"} size={25} />
                </TouchableOpacity>
        </View>
        )}

    favorites = () => {
        let { fav, dataSource, favMarked } = this.state;
        var favMarkedLocal = [];

        console.log('all items', fav);
        for (let [key, value] of Object.entries(fav)) {
            if(value) {
                favMarkedLocal.push(dataSource[key]);
            }
        }
        console.log('fav marked local', favMarkedLocal);
        this.setState({
            displayFavourite : true,
            favMarked: favMarkedLocal
        });
        console.log('fav marked state', this.state.favMarked);
        //this.props.navigation.navigate('Favorites');
    }

    setFavourite = index => {
        let favChanged = Object.assign({}, this.state.fav);
        favChanged[index] = !favChanged[index];
        
        this.setState({
            fav: favChanged
        })
    }

    searchFilter = (value) => {
        let { searchText, dataSourceOld } = this.state;
        if(searchText === '' && value === '') {
            this.setState({ dataSource: dataSourceOld });
            return; 
        }
        this.setState({searchText: value})
        const newData = this.state.dataSourceOld.filter(item => {      
            const itemData = `${item.Title.toUpperCase()}`;
            
             const textData = this.state.searchText.toUpperCase();
              
             return itemData.indexOf(textData) > -1;    
          });
          
          this.setState({ dataSource: newData });  
    }

    render() {
        let { displayFavourite, favMarked } = this.state;
        if(displayFavourite) {
            return (
                <Favorites favoriteItems={favMarked} />
            );
        }
        return (
            <View style={Styles.container}>
                <View style={Styles.navbar}>
                    <TextInput
                        style={Styles.textInput}
                        placeholder='Search'
                        value={this.state.searchText}
                        onChangeText={value => this.searchFilter(value)}
                    />
                    <View style={Styles.rightNav}>
                        <TouchableOpacity>
                            <Icon style={Styles.navItem} name="search" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.favorites()}>
                            <Icon style={Styles.navItem} name="favorite" size={25} />
                        </TouchableOpacity>
                    </View>
                   
                </View>
                
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state.fav}
                />
                {this.movieDetails}
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navbar: {
        height: 55,
        backgroundColor: 'white',
        elevation: 3,
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInput: {
        flex: 1,
        color: '#fff',
        padding: 20,
        backgroundColor: '#999999',
    },
    rightNav: {
        flexDirection: 'row'
    },
    navItem: {
        marginLeft: 25
    },
    title: {
        fontWeight: "900"
    },
    movieList: {
        margin: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});