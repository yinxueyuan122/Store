import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View ,StyleSheet,Image} from 'react-native';
import {screen} from '../../common'

export default class ShareScene extends Component {
    static navigationOptions = ({navigation}) => ({
                header: null,
        });


render() {
    return (
      <View >
          <View>
              <Image style={styles.backView} source={require('../../img/test/1.jpg')} />
          </View>
        <Text style={styles.testView}>
          ShareScene
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    backView: {
        width: screen.width,
        height: screen.height,
    },
    testView: {
        height: 150,
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',


    }

})
