/**
 * Copyright (c) 2018-present, heawoon yoon
 * All rights reserved.
 *
 * https://github.com/yinxueyuan122/Store
 * @flow
 */


import React, {PureComponent} from 'react'
import {StatusBar} from 'react-native'
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'

import color from './widget/color'
import detail from './widget/DetailCell'
import {screen, system} from './common'
import TabBarItem from './widget/TabBarItem'

import HomeScene from './scene/home/homeScene'
import ShareScene from './scene/share/shareScene'
import NearbyScene from './scene/nearby/nearbyScene'
import MineScene from './scene/mine/mineScene'
import MineDetailScene from './scene/mine/mineDetailScene'
import MineNameScene from './scene/mine/mineNameScene'
import MineNoteScene from './scene/mine/mineNoteScene'


const lightContentScenes = ['Home', 'Mine']

function getCurrentRouteName(navigationState: any) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route)
    }
    return route.routeName
}


class RootScene extends PureComponent<{}> {
    constructor() {
        super()

        StatusBar.setBarStyle('light-content')
    }

    render() {
        return (
            <Navigator
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState)
                        const previousScene = getCurrentRouteName(prevState)
                        if (previousScene !== currentScene) {
                            if (lightContentScenes.indexOf(currentScene) >= 0) {
                                StatusBar.setBarStyle('light-content')
                            } else {
                                StatusBar.setBarStyle('dark-content')
                            }
                        }
                    }
                }
            />
        )
    }
}
//
const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '홈',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/tabbar_homepage.png')}
                        selectedImage={require('./img/tabbar/tabbar_homepage_selected.png')}
                    />
                )
            }),
        },
        Nearby: {
            screen: NearbyScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '찾기',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/tabbar_merchant.png')}
                        selectedImage={require('./img/tabbar/tabbar_merchant_selected.png')}
                    />
                )
            }),
        },

        Share: {
            screen: ShareScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '모멘트',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/tabbar_order.png')}
                        selectedImage={require('./img/tabbar/tabbar_order_selected.png')}
                    />
                )
            }),
        },

        Mine: {
            screen: MineScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '설정',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/tabbar_mine.png')}
                        selectedImage={require('./img/tabbar/tabbar_mine_selected.png')}
                    />
                )
            }),
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazy: true,
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: color.primary,
            inactiveTintColor: color.gray,
            style: {backgroundColor: '#ffffff'},
        },
    }

)

const Navigator = StackNavigator(
    {
        Tab: {screen: Tab},
        MineDetail: {screen: MineDetailScene},
        MineName: {screen: MineNameScene},
        MineNote: {screen: MineNoteScene},
    },
    {
        navigationOptions: {
            // headerStyle: { backgroundColor: color.primary }
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        },
    }
)

export default RootScene
