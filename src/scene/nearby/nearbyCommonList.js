/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {screen} from '../../common'
import {color,SpacingView} from '../../widget'

let count = 0

type Props = {
    info: Object,
    onPress: Function,
}


class NearbyCommonList extends PureComponent<Props> {

    render() {
       
        return (

			<View style={styles.cellsStyle}>
				<TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
					<Image source={require('../../img/mine/webwxgetmsgimg.jpg')} style={styles.icon} />

					<View style={styles.rightContainer}>
						<View style={{flex: 1, justifyContent: 'space-between',flexDirection : 'row',}}>
							<Heading3>hagui</Heading3>
							<Heading3>0.04km 5분전</Heading3>
						</View>
						<View style={{flex: 1, justifyContent: 'flex-end'}}>
							<Heading3 style={styles.price}>20살</Heading3>
						</View>

					</View>
				</TouchableOpacity>
				<SpacingView />
				<TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
					<Image source={require('../../img/test/1.jpg')} style={styles.icon} />

					<View style={styles.rightContainer}>
						<View style={{flex: 1, justifyContent: 'space-between',flexDirection : 'row',}}>
							<Heading3>hagui</Heading3>
							<Heading3>0.25km 15분전</Heading3>
						</View>
						<View style={{flex: 1, justifyContent: 'flex-end'}}>
							<Heading3 style={styles.price}>31살</Heading3>
						</View>

					</View>
				</TouchableOpacity>
					<SpacingView />
				<TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
					<Image source={require('../../img/test/2.jpg')} style={styles.icon} />

					<View style={styles.rightContainer}>
						<View style={{flex: 1, justifyContent: 'space-between',flexDirection : 'row',}}>
							<Heading3>hagui</Heading3>
							<Heading3>2.04km 1시간전</Heading3>
						</View>
						<View style={{flex: 1, justifyContent: 'flex-end'}}>
							<Heading3 style={styles.price}>18살</Heading3>
						</View>

					</View>
				</TouchableOpacity>
			</View>


		

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: screen.onePixel,
        borderColor: color.border,
        backgroundColor: 'white',
    },
	contentStyle:{
        flexDirection:'row',
        flexWrap:'wrap',
        width:screen.width
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },
    price: {
        color: color.primary
    }
})


export default NearbyCommonList
