import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList} from 'react-native'
import api from '../../api'
import NearbySceneItemView from './nearbyItemScene'
import {color, Button, NavigationItem, SpacingView} from '../../widget'
import {screen, system} from '../../common'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import {Heading2, Heading3, Paragraph} from '../../widget/Text'
type Props = {
    navigation: any,
}

type State = {
    dataList: Array<Object>,
    refreshing: boolean,
}
export default class NearbyScene extends Component {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (
            <View style={styles.title}>
                <Heading2>쇼 룸</Heading2>
            </View>
        ),

        headerRight: (
            <NavigationItem
                icon={require('../../img/mine/icon_navigation_item_message_white.png')}
                onPress={() => {

                }}
            />
        ),



        headerStyle: {backgroundColor: color.primary},

    })

    constructor(props: Props) {
        super(props)
        let dataList = api.nearbyItemInfo
        this.state = {

            dataList: dataList,
            refreshing: false,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewHeader} >
                    <TouchableOpacity><Heading3>인기순</Heading3></TouchableOpacity>
                    <TouchableOpacity><Heading3>근처</Heading3></TouchableOpacity>
                    <TouchableOpacity><Heading3>미남</Heading3></TouchableOpacity>
                    <TouchableOpacity><Heading3>미녀</Heading3></TouchableOpacity>
                </View>

                <FlatList
                    data={this.state.dataList}
                    renderItem={this.renderCell}
                    numColumns = '3'
                    keyExtractor={this.keyExtractor}
                    refreshing={this.state.refreshing}
                />
            </View>
        )
    }

    renderCell = (info: Object) => {
        return (
            <NearbySceneItemView
                info={info.item}
                onPress={this.onCellSelected}
            />
        )
    }

    keyExtractor = (item: Object) => {
        return item.id
    }

    onCellSelected = (info: Object) => {
        StatusBar.setBarStyle('default', false)
        //this.props.navigation.navigate('GroupPurchase', {info: info})
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper,

    },

    title: {
        width: screen.width,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    viewHeader: {
        justifyContent: 'space-around',
        backgroundColor: 'white',
        flexDirection:'row',
        marginTop: 5,
        marginBottom: 5,
    },
})

