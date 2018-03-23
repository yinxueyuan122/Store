/**
 * Copyright (c) 2018-present, heawoon yoon
 * All rights reserved.
 *
 * https://github.com/yinxueyuan122/Store
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl} from 'react-native'

import {Heading3, Paragraph} from '../../widget/Text'
import {screen} from '../../common'
import {color, DetailCell, NavigationItem, SpacingView} from '../../widget'

type Props = {

}

type State = {
    isRefreshing: boolean,
}

class MineScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerRight: (
            <View style={{flexDirection: 'row'}}>
                <NavigationItem
                    icon={require('../../img/mine/icon_navigation_item_set_white.png')}
                    onPress={() => {

                    }}
                />
                <NavigationItem
                    icon={require('../../img/mine/icon_navigation_item_message_white.png')}
                    onPress={() => {

                    }}
                />
            </View>
        ),
        headerStyle: {
            backgroundColor: color.primary,
            elevation: 0,
            borderBottomWidth: 0,
        },
    })

    state: {
        isRefreshing: boolean
    }

    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false
        }
    }

    onHeaderRefresh() {
        this.setState({isRefreshing: true})

        setTimeout(() => {
            this.setState({isRefreshing: false})
        }, 2000)
    }

    renderCells() {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                let cell = <DetailCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title} />
                cells.push(cell)
            }
            cells.push(<SpacingView key={i} />)
        }

        return (
            <View style={{flex: 1}}>
                {cells}
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <Image style={styles.avatar} source={require('../../img/mine/avatar.png')} />
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Image style={{marginLeft: 4}} source={require('../../img/mine/beauty_technician_v15.png')} />
                    </View>
                    <Paragraph style={{color: 'white', marginTop: 4}}>개인정보 ></Paragraph>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: color.paper}}>
                <View style={{position: 'absolute', width: screen.width, height: screen.height / 2, backgroundColor: color.primary}} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    {this.renderHeader()}
                    <SpacingView />
                    {this.renderCells()}
                </ScrollView>
            </View>
        )
    }

    getDataList() {
        return (
            [
                [
                    {title: '지갑', subtitle: '카드', image: require('../../img/mine/icon_mine_wallet.png')},
                    {title: '잔액', subtitle: '￥95872385', image: require('../../img/mine/icon_mine_balance.png')},
                    {title: '구폰', subtitle: '63', image: require('../../img/mine/icon_mine_voucher.png')},
                    {title: '회원카드', subtitle: '2', image: require('../../img/mine/icon_mine_membercard.png')}
                ],
                [
                    {title: '나의 문안', image: require('../../img/mine/icon_mine_friends.png')},
                    {title: '나의 평가', image: require('../../img/mine/icon_mine_comment.png')},
                    {title: '즐겨 찾기', image: require('../../img/mine/icon_mine_collection.png')},
                    {title: '회원 센터', subtitle: 'v15', image: require('../../img/mine/icon_mine_membercenter.png')},
                    {title: '나의 그룹', subtitle: '', image: require('../../img/mine/icon_mine_member.png')}
                ],
                [
                    {title: '콜 센터', image: require('../../img/mine/icon_mine_customerService.png')},
                    {title: '어플 정보', subtitle: '', image: require('../../img/mine/icon_mine_aboutmeituan.png')}
                ]
            ]
        )
    }

}


const styles = StyleSheet.create({
    icon: {
        width: 27,
        height: 27,
    },
    header: {
        backgroundColor: color.primary,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    }
})


export default MineScene
