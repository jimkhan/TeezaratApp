import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';


import CommonHeadWithButton from '../components/CommonHeadWithButton'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import EmptyCart from '../components/EmptyCart'
import AppTitleText from '../components/AppTitleText'
import ProductCard from '../components/ProductCard'

import colors from '../config/colors'
import ShopContext from '../Context/shop-context'

import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopingCartScreen = ({ navigation }) => {

    const [userName, setUserName] = useState(null)
    const context = useContext(ShopContext);

    console.log(context.cart)

    const userInfo = async () => {
        try {
            const userData = await AsyncStorage.getItem('userName')
            setUserName(userData)

        } catch (e) {
            console.log(e)

        }
    }

    useEffect(() => {
        userInfo();

    }, [])

    return (
        <View style={styles.container} >
            <CommonHeadWithButton
                textLeft={"Your Shopping Cart"}
                iconRight={"window-close"}
                iconColor={colors.danger}
            />
            {
                context.cart.length === 0 ?
                    <EmptyCart />
                    :
                    <>

                        <AppText style={styles.textTop} > {context.cart.length} {context.cart.length == 1 ? "item" : "items"} in the cart</AppText>
                        <View style={styles.subcontainer} >
                            <View style={[styles.common, styles.activeBack]} ><AppTitleText style={[styles.numberColor, styles.activeText]} >1</AppTitleText></View>
                            <View style={styles.barColor} ></View>
                            <View style={styles.common} ><AppTitleText style={styles.numberColor} >2</AppTitleText></View>
                            <View style={styles.barColor} ></View>
                            <View style={styles.common} ><AppTitleText style={styles.numberColor} >3</AppTitleText></View>
                            <View style={styles.barColor} ></View>
                            <View style={styles.common} ><AppTitleText style={styles.numberColor}>4</AppTitleText></View>
                        </View>

                        <View style={styles.list} >
                            <FlatList
                                data={context.cart}
                                keyExtractor={(products) => products._id}
                                renderItem={({ index, item }) => {
                                    return (
                                        <ProductCard
                                            title={item.name}
                                            price={item.price}
                                            unit={item.unit}
                                            image={item.photo}
                                            itemQuantity={item.quantity}
                                            iconClose
                                            add={true}
                                            minus={true}
                                            onPressClose={context.removeSpecificAllItem.bind(this, item)}
                                            increaseQuantity={context.addProductToCart.bind(this, item)}
                                            decreaseQuantity={context.removeProductFromCart.bind(this, item)}
                                        />
                                    )
                                }
                                }

                            />

                        </View>

                        <View style={styles.bottom} >
                            <View style={styles.bottomTextArea} >
                                <View style={styles.bottomBillArea} >
                                    <AppTitleText style={styles.bill} >Bill: {context.totalPrice}</AppTitleText>
                                    <AppTitleText style={styles.taka} > ৳</AppTitleText>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate("Coupon", { total: context.totalPrice } )} >
                                    <AppText style={styles.coupon} >Apply Coupon?</AppText>
                                </TouchableOpacity>
                            </View>
                            <AppButton
                                name={"Proceeed To Checkout"}
                                onPress={() => { userName == 'null' ? navigation.navigate("CheckoutSignIn") : navigation.navigate("ShippingInfoScreen") }}
                                style={styles.button}

                            />
                        </View>
                    </>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    list: {
        flex: 1,
        width: wp(100),
        alignItems: 'center',
    },
    bottomTextArea: {
        width: wp(85),
        paddingHorizontal: wp(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    bottomBillArea: {
        flexDirection: 'row',
    },
    bill: {
        alignSelf: 'stretch',
        color: colors.black,

    },
    taka: {
        alignSelf: 'stretch',
        color: colors.green,
    },
    coupon: {
        alignSelf: 'stretch',
        fontSize: RFValue(11)
    },
    button: {
        width: wp(85),
        borderRadius: hp(.5),
    },
    bottom: {
        width: wp(100),
        height: hp(14),
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
        justifyContent: 'center',
        position: "absolute",
        bottom: 0,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    textTop: {
        color: colors.danger,
        alignSelf: 'stretch',
        paddingLeft: wp(3),
        fontSize: RFValue(14),
    },
    subcontainer: {
        width: wp(80),
        height: hp(10),
        // backgroundColor: colors.yellow,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    activeBack: {
        backgroundColor: colors.secondaryBorder,
    },
    activeText: {
        color: colors.primary,
    },
    common: {
        alignItems: 'center',
        justifyContent: 'center',
        width: hp(5),
        height: hp(5),
        borderRadius: hp(3),
        backgroundColor: colors.lightGrayMOre,
    },
    barColor: {
        width: wp(7),
        height: hp(.5),
        backgroundColor: colors.lightGrayMOre,
    },
    numberColor: {
        color: colors.secondaryBorder,
    }
})

export default ShopingCartScreen
