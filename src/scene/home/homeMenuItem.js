/**
 * Copyright (c) 2018-present, heawoon yoon
 * All rights reserved.
 *
 * https://github.com/yinxueyuan122/Store
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

import {Heading3} from '../../widget/Text'
import {screen, system} from '../../common'

type Props = {
    onPress: Function,
    icon: any,
    title: string,
}

class HomeMenuItem extends PureComponent<Props> {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                onPress={this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon} />
                <Heading3>
                    {this.props.title}
                </Heading3>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 4,
        height: screen.width / 4,
    },
    icon: {
        width: screen.width / 7,
        height: screen.width / 7,
        margin: 5,
    }
});


export default HomeMenuItem;
