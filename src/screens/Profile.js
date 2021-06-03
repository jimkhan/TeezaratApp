import React, { useState, useEffect, useContext } from 'react'
import { View, ScrollView, StyleSheet, Image, FlatList } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';

import CommonHeadWithButton from '../components/CommonHeadWithButton'
import AppText from '../components/AppText'
import Loader from '../components/Loader'
import OrderHistroy from '../components/OrderHistroy'

import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from '../Context/shop-context';
import axios from 'axios';
import baseUrl from '../API/BaseUrl'



const Profile = ({ navigation }) => {

    const context = useContext(Context);

    const { signOut } = React.useContext(AuthContext);
    const [userInformation, setUserInformation] = useState("jim")
    const [userI, setUserI] = useState("")


    const userInfo = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInformation')
            const val = JSON.parse(jsonValue)
            setUserInformation(val)
            setUserI(val.user);
            //   console.log(val.user)
        } catch (e) {
            console.log(e)
        }
    }

    const address = ""

    const [apiData, setApiData] = useState("")


    const getDataUsingSimpleGetCall = () => {

        

            axios
                .get(baseUrl + "orders/me", {
                    headers: {
                        'Authorization': `Bearer ${context.token}`
                    }
                }
                )
                .then(function (response) {
                    // handle success
                    const data = JSON.stringify(response.data)
                    setApiData(response.data.orders)
                })
                .catch(function (error) {
                    // handle error


                    alert(error.message);

                    setApiData(null)
                })
                .finally(function () {
                    // always executed
                    // alert('Finally called');
                });


    };

    useEffect(() => {
        userInfo()
        getDataUsingSimpleGetCall()
    }, [])



    return (
        <>
            {
                userInformation === ""
                    ?
                    <Loader />
                    :

                    <View style={styles.main} >
                        <CommonHeadWithButton
                            iconLeft={"chevron-left"}
                            textLeft={"Profile"}
                            iconRight={"logout-variant"}
                            iconColor={colors.secondaryLight}
                            onPressRight={() => signOut()}

                        />
                        <View style={styles.userInfo} >
                            <View style={styles.profile} >
                                <View style={styles.imageArea} >
                                    <Image source={require('../img/Flat.png')} style={styles.img} />

                                </View>
                                <View style={styles.titleArea} >
                                    <AppText style={[styles.text, styles.titleText]} >{userI.fullname}</AppText>
                                    <View style={styles.editArea} >

                                        <AppText style={[styles.text, styles.editText]} >Edit Profile</AppText>
                                        <Icon name={"account-edit-outline"} size={RFValue(20)} color={colors.lightGray} />
                                    </View>

                                </View>
                            </View>
                            <View style={styles.textArea} >
                                <AppText style={[styles.text, styles.email]} >Email:       {userI.email}</AppText>
                                <AppText style={[styles.text, styles.phone]} >Phone:       {userI.number}</AppText>
                                <AppText style={[styles.text, styles.address]} >Address:   {address}</AppText>


                            </View>
                        </View>
                        <AppText style={styles.textOrder} >Your Past Orders</AppText>
                        <View style={styles.currentOrder} >
                            <FlatList
                                data={apiData}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => {
                                    return (

                                        <>
                                            {item.orderStatus === "delivered" || item.orderStatus === "failed" ? <OrderHistroy orderid={item._id} time={item.createdAt} amount={item.totalPrice} onPress={() => navigation.navigate('OrderDetailsScreen',
                                                { Data: item })} /> :

                                                null
                                            }

                                        </>


                                    )
                                }}
                            />
                        </View>

                    </View>


            }

        </>

    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,

    },
    img: {
        width: wp(20),
        height: wp(20),
    },
    currentOrder: {
        height: hp(40),
        paddingLeft: 0,
    },
    text: {
        alignSelf: 'stretch'
    },
    textOrder: {
        alignSelf: 'stretch',
        marginTop: hp(3),
        color: colors.gray,
        marginHorizontal: wp(5),
        fontFamily: 'Exo-Bold'
    },
    userInfo: {
        width: wp(95),
        minHeight: hp(30),
        backgroundColor: colors.lightBack,
        borderColor: colors.secondaryBorder,
        borderWidth: 1,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: hp(2),

    },
    imageArea: {
        width: wp(20),
        height: wp(20),
        borderColor: colors.secondaryBorder,
        borderWidth: 1,
        borderRadius: hp(.5),

    },
    titleArea: {
        paddingHorizontal: wp(5),
    },
    textArea: {
        paddingHorizontal: wp(3),

    },
    editArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(1),
    },
    titleText: {
        fontSize: RFValue(16)
    },
    editText: {
        fontSize: RFValue(12),
        marginRight: wp(2),
        color: colors.lightGray,
    },
    email: {
        marginBottom: hp(1),
    },
    phone: {
        marginBottom: hp(1),
    },
    address: {
        marginBottom: hp(1),
    }

})
export default Profile
