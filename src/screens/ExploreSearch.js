import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Alert } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

import colors from '../config/colors'

import Header from '../components/Header'
import Search from '../components/Search'
import Loader from '../components/Loader'
import AppTitleText from '../components/AppTitleText'
import ProductCard from '../components/ProductCard'

import Context from '../Context/shop-context'
import axios from 'axios';
import baseUrl from '../API/BaseUrl'

const ExploreSearch = ({ navigation, route }) => {

    const context = useContext(Context);

    console.log(context.favorite);

    const [allProduct, setAllProduct] = useState("")

    const { apiData } = route.params;



    return (
        <>

            <View style={styles.container} >
                <Header />
                {/* <Search /> */}
                <AppTitleText style={styles.title} >Category Items</AppTitleText>

                <View style={styles.list} >
                    <FlatList

                        data={apiData}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => {
                            return (
                                <ProductCard
                                    title={item.name}
                                    price={item.price}
                                    favorite={true}
                                    product={item}
                                    image={"https://reactnative.dev/img/tiny_logo.png"}
                                    onPressAddToCart={context.addProductToCart.bind(this, item)}
                                    styleCartButton={{ width: wp(83) }}
                                    onPress={() => navigation.navigate('ViewSingleProduct',
                                        { Data: item, image: `https://reactnative.dev/img/tiny_logo.png` })}


                                />
                            )
                        }}
                    />

                </View>

            </View>



        </>

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
    categotyBottom: {
        width: wp(90),
        borderColor: colors.secondaryBorder,
        borderBottomWidth: 1,
        marginBottom: hp(1),
    },
    title: {
        alignSelf: 'stretch',
        marginTop: 0,
        paddingLeft: wp(5),
        marginBottom: hp(2),
    }
})

export default ExploreSearch;
