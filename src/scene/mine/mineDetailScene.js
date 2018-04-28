/**
 * Copyright (c) 2018-present, heawoon yoon
 * All rights reserved.
 *
 * https://github.com/yinxueyuan122/Store
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl} from 'react-native'

import {Heading3, Paragraph,Heading2} from '../../widget/Text'
import {screen} from '../../common'
import {color, DetailCell, NavigationItem, SpacingView,Separator} from '../../widget'
import Picker from 'react-native-picker';
import area from '../../widget/area.json';
import ChooseDialog from '../../widget/chooseDialog';
import ImagePicker from 'react-native-image-picker'

type Props = {
    navigation: any,
}

type State = {
    isRefreshing: boolean,
    name:any,
    empTp:any,
    birthday:any,
    note:any,
    nowArea:any,
    sex:any,
}

class MineDetailScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (
            <View style={styles.title}>
                <Heading2>개인 정보</Heading2>
            </View>
        ),

        headerStyle: {backgroundColor: color.primary},

    })


    constructor(props: Object) {
        super(props)
        this.state = {
            isRefreshing: false,
            name:'',
            empTp:'',
            birthday:'',
            note:'',
            sex:'',
            nowArea:'',
            avatarSource:'',
        }
    }

    componentDidMount() {

        this.requestUserInfo()
    }

    requestUserInfo(){
        var body = {"sUserId": "1"};
        fetch('http://10.34.255.241:5001/user/selectUserInfoByKey.do', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(JSON.stringify(responseJson))
                this.setState({ 
                    name:responseJson.userName,
                    empTp:responseJson.empTp,
                    birthday:responseJson.birthday,
                    note:responseJson.note,
                    sex:responseJson.sex,
                    nowArea:responseJson.nowArea,
                    avatarSource:responseJson.headImg,
                })
            })
            .catch((error) => {
                alert(error)
                console.error(error);
            });


    }

    onHeaderRefresh() {
        this.setState({isRefreshing: true})

        setTimeout(() => {
            this.setState({isRefreshing: false})
        }, 2000)
    }

    _createDateData() {
        let date = [];
        for(let i=1970;i<2020;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'일');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'일');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'일');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'일');
                    }
                }
                let _month = {};
                _month[j+'월'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'년'] = month;
            date.push(_date);
        }
        return date;
    }

    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }


    showDatePicker() {
        Picker.init({
            pickerData: this._createDateData(),
            pickerConfirmBtnText : '선택',
            pickerCancelBtnText : '취소',
            pickerTitleText : null,
            selectedValue: ['1990년', '11월', '11일'],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                let str = "";
                pickedValue.map(function(value,index){
                    if(index==0){
                        str=str+value.substr(0,value.length-1);
                    }else{
                        str=str+'-'+value.substr(0,value.length-1);
                    }
                })
                this.setState ({birthday :str})

                var body = {"userId": 1,"birthday":str};
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

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
            }
        });
        Picker.show();
    }

    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    showAreaPicker() {
        Picker.init({
            pickerData: this._createAreaData(),
            pickerConfirmBtnText : '선택',
            pickerCancelBtnText : '취소',
            pickerTitleText : null,
            selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {

                let str = "";
                pickedValue.map(function(value,index){
                        str=str+value;
                })

                this.setState ({nowArea :str})

                var body = {"userId": 1,"nowArea":str};
                fetch('http://10.34.255.241:5001/user/updateUserInfo.do', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(body)
                })
                    .then((response) => response.json())
                    .then((responseJson) => {

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            onPickerCancel: pickedValue => {
            },
            onPickerSelect: pickedValue => {
            }
        });
        Picker.show();
    }

    goToMineNameView() {
        const {navigate} = this.props.navigation
        navigate('MineName',{name:this.state.name,callBack:(backData)=>{this.callBackName(backData)}})
    }

    callBackName(backData) {
        this.setState ({name :backData.name})
    }


    goToMineNoteView() {
        const {navigate} = this.props.navigation
        navigate('MineNote',{note:this.state.note,callBack:(backData)=>{this.callBackNote(backData)}})
    }

    callBackNote(backData) {
        this.setState ({note :backData.note})
        var body = {"userId": 1,"note":backData.note};
        fetch('http://10.34.255.241:5001/user/updateUserInfo.do', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((responseJson) => {

            })
            .catch((error) => {
                console.error(error);
            });
    }

    openDialog() {
        this.refs.chooseDialogUtil.show('성별선택','남자','여자','취소',this.state.sex);
    }


    onChoose(msg) {
        this.setState ({sex :msg})

        var body = {"userId": 1,"sex":msg};
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

            })
            .catch((error) => {
                console.error(error);
            });
    }


    choosePhoto() {

        const options = {
            title: '사진 선택',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            takePhotoButtonTitle: '사진 찍기',
            chooseFromLibraryButtonTitle:'사진첩',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };


                this.setState({
                    avatarSource: source
                });
            }
        });
    }


    render() {
        let navigation = this.props.navigation

        return (
            <View style={{flex: 1, backgroundColor: color.paper}}>
                <SpacingView />
                <TouchableOpacity onPress={this.choosePhoto.bind(this)}>
                    <View style={styles.container}>
                        <View style={[styles.imgContent]}>
                            <Heading3>사진</Heading3>
                            <View style={{flex: 1, backgroundColor: 'blue'}} />
                            <Image style={styles.img} source={this.state.avatarSource} />
                            <Image style={styles.arrow} source={require('../../img/public/cell_arrow.png')} />
                        </View>

                        <Separator />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.goToMineNameView.bind(this)}>
                    <DetailCell title='명칭' subtitle={this.state.name} style={{height: 60}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.openDialog.bind(this)}>
                    <DetailCell title='성별' subtitle={this.state.sex} style={{height: 44}} />
                </TouchableOpacity>
                <SpacingView />

                <TouchableOpacity onPress={this.showDatePicker.bind(this)}>
                    <DetailCell title='생일' subtitle={this.state.birthday} style={{height: 44}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.showAreaPicker.bind(this)}>
                    <DetailCell title='지역' subtitle={this.state.nowArea} style={{height: 44}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.goToMineNoteView.bind(this)}>
                    <DetailCell title='자기소개' subtitle={this.state.note} style={{height: 44}}/>
                </TouchableOpacity>
                <ChooseDialog ref="chooseDialogUtil" onChoose={this.onChoose.bind(this)}></ChooseDialog>
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
    imgContent: {
        height: 80,
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
    img: {
        width: 60,
        height: 60,
        marginLeft: 5,
    },
    title: {
        width: screen.width-100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
})


export default MineDetailScene
