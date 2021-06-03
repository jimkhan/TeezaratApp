import React, { useContext } from 'react'
import { View, ScrollView, StyleSheet, Image } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

import colors from '../config/colors';

import SinglePageHeader from '../components/SinglePageHeader'
import AppText from '../components/AppText'
import AppTitleText from '../components/AppTitleText'
import CardButton from '../components/CardButton'

import ShopContext from '../Context/shop-context'
const ViewSingleProduct = ({ route }) => {

    const context = useContext(ShopContext);

    const { Data, image } = route.params;
    const { name, price, description, unit, } = Data;
    console.log("data " + Data.name)
    return (
        <View style={styles.main} >
            <SinglePageHeader iconRight />

            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: wp(100), }}>
                <View style={styles.container}  >

                    <View style={styles.imageArea} >
                        <Image source={{ uri: image }} style={styles.img} />
                    </View>

                    <CardButton styleCartButton={{ width: wp(90), }} onPressAddToCart={context.addProductToCart.bind(this, Data)} />

                    <AppTitleText style={styles.titleText} >{name}</AppTitleText>

                    <View style={styles.textArea}>
                        <AppTitleText style={[styles.priceText, styles.commontext]}>{price} BDT <AppText style={[styles.weightText, styles.commontext]} >/ {unit}</AppText></AppTitleText>
                    </View>

                    <AppText>{description}</AppText>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: colors.white,
    },
    add: {
        width: wp(60),
    },
    bArea: {
        width: wp(80),
    },
    container: {
        width: wp(100),
        minHeight: hp(18),
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        marginBottom: hp(1),
    },
    subContainer: {
        flexDirection: 'row',
    },
    commontext: {
        alignSelf: 'flex-start',
        textAlign: 'left',
    },
    textArea: {
        alignSelf: 'stretch',
        marginVertical: hp(2),
    },
    imageArea: {
        width: wp(90),
        height: wp(60),
        borderColor: colors.secondaryBorder,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: hp(30),
        height: hp(30),
    },
    titleText: {
        alignSelf: 'stretch',
        textAlign: 'left',
        color: colors.black,
        fontSize: RFValue(27),
    },
    priceText: {
        alignSelf: 'stretch',
        fontSize: RFValue(20),
        color: colors.green,

    },
    buttonArea: {
        width: wp(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(3),
    },

    buttonDecrease: {
        width: hp(4),
        height: hp(4),
        borderRadius: hp(.6),
        backgroundColor: colors.yellow,
        borderColor: 'transparent'
    },
    buttonAddItem: {
        width: wp(70),
        height: hp(4),
        borderRadius: hp(.6),
    },

    text: {
        color: colors.black,
        fontSize: RFValue(18),
        fontWeight: '700',
        textAlign: 'center'
    }

})

export default ViewSingleProduct
