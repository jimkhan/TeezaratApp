import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

import colors from '../config/colors';

import CommonHeadWithButton from '../components/CommonHeadWithButton'
import AppText from '../components/AppText'
import CouponList from '../components/CouponList'

import axios from 'axios';


const PromoScreen = () => {

    const [apiData, setApiData] = useState("")


    const getDataUsingSimpleGetCall = () => {
        axios
            .get("https://teezarat-backend.herokuapp.com/api/allCoupon")
            .then(function (response) {
                // handle success
                const data = JSON.stringify(response.data)
                setApiData(response.data)
            })
            .catch(function (error) {
                // handle error
                alert(error.message);
            })
            .finally(function () {
                // always executed
                // alert('Finally called');
            });
    };
    useEffect(() => {
        getDataUsingSimpleGetCall();

    }, [])

    return (
        <View style={styles.main} >
            <CommonHeadWithButton
                iconLeft={"chevron-left"}
                textLeft={"Promos"}
            />
            <AppText style={styles.textOrder} >Available Coupons</AppText>
            <View style={styles.separetor} />

            <View style={{ maxHeight: hp(60), width: wp(100), alignItems: "center", marginBottom: hp(2) }} >
                <FlatList
                    data={apiData}

                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <CouponList />
                        )
                    }}

                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',

    },
    separetor: {
        borderTopWidth: 1,
        width: wp(90),
        borderColor: colors.lightGray,
        marginTop: hp(1),
    },
    textOrder: {
        alignSelf: 'stretch',
        paddingLeft: wp(6),
    },
})

export default PromoScreen
