/**
 * Copyright (c) 2018-present, heawoon yoon
 * All rights reserved.
 *
 * https://github.com/yinxueyuan122/Store
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl,Text,TextInput} from 'react-native'

import {Heading3, Paragraph,Heading2} from '../../widget/Text'
import {screen} from '../../common'
import {color, DetailCell, NavigationItem, SpacingView,Separator} from '../../widget'

type Props = {
    navigation: any,
}

type State = {
    name:any,
}

class MineNameScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerRight: (
            <View style={{flexDirection: 'row',paddingRight: 10,}}>
                <TouchableOpacity onPress={()=>navigation.state.params.navigatePress()}>
                    <Text>저장</Text>
                </TouchableOpacity>
            </View>
        ),

        headerTitle: (
            <View style={styles.title}>
                <Heading2>명칭 변경</Heading2>
            </View>
        ),
        headerStyle: {backgroundColor: color.primary},

    })

    componentDidMount(){
        this.props.navigation.setParams({navigatePress:this.onSave.bind(this)})
    }


    constructor(props: Object) {
        super(props)
        this.onSave = this.onSave.bind(this)
        this.changeName= this.changeName.bind(this)

        this.state = {
            name: this.props.navigation.state.params.name,
        }
    }


    onSave() {
        var body = {"userId": 1,"age":20,"userName":this.state.name};
        fetch('http://10.34.255.241:5001/user/updateUserInfo.do', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const  {navigate,state,goBack,} = this.props.navigation;
                state.params.callBack({name:this.state.name}) //回调传值
                goBack() //点击POP上一个页面得方法

            })
            .catch((error) => {

                console.error(error);
            });
    }

    changeName(text) {
        this.setState({
            name: text
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: color.paper}}>
                <SpacingView />
                <TextInput style={{backgroundColor: 'white'}} underlineColorAndroid='transparent' onChangeText={(text)=>this.changeName(text)} value={this.state.name}></TextInput>
                <SpacingView />
            </View>
        )
    }



}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    arrow: {
        width: 14,
        height: 14,
        marginLeft: 5,
    },
    title: {
        width: screen.width-100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
})


export default MineNameScene
