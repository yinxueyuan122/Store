/**
 * Copyright (c) 2018-present, heawoon yoon
 * All rights reserved.
 *
 * https://github.com/yinxueyuan122/Store
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {Heading5, Heading3, Paragraph} from '../../widget/Text'
import {screen} from '../../common'
import {color} from '../../widget'

let iconWidth= (screen.width/3)-10

type Props = {
    info: Object,
    onPress: Function,
    navigation: any,
}


class NearbyItemScene extends PureComponent<Props> {



    constructor(props: Props) {
        super(props)


    }
    render() {
        let {info} = this.props
        let imageUrl = info.imageUrl
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={imageUrl} style={styles.icon} />
                <View style={styles.bottomContainer}>
                    <Heading3>{info.title}</Heading3>
                    <Heading5>{info.subtitle}</Heading5>

                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
        borderBottomWidth: screen.onePixel,
        borderColor: color.border,
        backgroundColor: 'white',
    },
    icon: {
        width: iconWidth,
        height: 80,
        borderRadius: 5,
    },
    bottomContainer: {
        flex: 1,
        paddingLeft: 5,
    },
    price: {
        color: color.primary
    }
})


export default NearbyItemScene
