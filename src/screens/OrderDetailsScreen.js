import React from 'react'
import { View, ScrollView, StyleSheet, FlatList } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';

import CommonHeadWithButton from '../components/CommonHeadWithButton'
import OrderHistroy from '../components/OrderHistroy'
import ItemDetails from '../components/ItemDetails'
import AppText from '../components/AppText'

const OrderDetailsScreen = ({ route }) => {

    const { Data } = route.params;
    const orderItem = Data.orderItems;

    return (
        <View style={styles.container} >
            <CommonHeadWithButton
                iconLeft={"chevron-left"}
                textLeft={"Order Details"}
            />
            <OrderHistroy
                disabled={true}
                style={styles.order}
                orderid={Data._id}
                time={Data.createdAt}
                amount={Data.totalPrice}
            />

            <AppText style={styles.itemtext} >Items</AppText>
            <View>
                <FlatList
                    data={orderItem}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return (
                            <ItemDetails
                                name={item.name}
                                price={item.price}
                                weight={item.unit}
                                units={item.quantity}
                                totalPrice={item.quantity * item.price}
                            />
                        )
                    }}


                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    order: {
        backgroundColor: colors.white,
        borderWidth: 0,
    },
    itemtext: {
        alignSelf: 'stretch',
        paddingLeft: wp(5),
    }
})

export default OrderDetailsScreen
