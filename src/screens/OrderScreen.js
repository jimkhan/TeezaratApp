import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';


import Loader from '../components/Loader'
import OrderHistroy from '../components/OrderHistroy'
import CommonHeadWithButton from '../components/CommonHeadWithButton'
import AppText from '../components/AppText'
import CurrentOrder from '../components/CurrentOrder'

import colors from '../config/colors'

import axios from 'axios';
import baseUrl from '../API/BaseUrl'

///https://teezarat-backend.herokuapp.com/api/orders/me

import Context from '../Context/shop-context';

const OrderScreen = ({ navigation }) => {

    const context = useContext(Context);

    const [apiData, setApiData] = useState("")


    const getDataUsingSimpleGetCall = () => {

        setTimeout(function () {

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

        }, 1000);


    };


    useEffect(() => {
        getDataUsingSimpleGetCall();

    }, [])

    return (

        <>
            {
                apiData === "" ?

                    <Loader />
                    :
                    <View style={styles.main} >
                        <CommonHeadWithButton
                            textLeft={"Your Order"}
                            iconRight={"window-close"}
                            iconColor={colors.danger}
                        />
                        <AppText style={styles.subTitle} >Currently Active Orders</AppText>
                        <View style={styles.currentOrder} >
                            <FlatList
                                data={apiData}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => {
                                    return (

                                        <>
                                            {item.orderStatus === "delivered" || item.orderStatus === "failed" ? null :

                                                <CurrentOrder disabled={false} stageNumber={item.orderStatus} orderid={item._id} time={item.createdAt} amount={item.totalPrice} onPress={() => navigation.navigate('OrderDetailsScreen',
                                                    { Data: item })} />
                                            }

                                        </>
                                    )
                                }}
                            />
                        </View>
                        <AppText style={styles.subTitle} >Your Past Orders</AppText>
                        <View>
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
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    currentOrder: {
        height: hp(40),
        paddingLeft: 0,
    },
    subTitle: {
        alignSelf: "stretch",
        paddingLeft: wp(5),
        marginTop: hp(1),
    }
})

export default OrderScreen
