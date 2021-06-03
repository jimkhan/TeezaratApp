import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Alert } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors'

import Header from '../components/Header'
import Search from '../components/Search'
import AppButton from '../components/AppButton'
import AppTitleText from '../components/AppTitleText'
import ProductCard from '../components/ProductCard'

import Context from '../Context/shop-context'
import axios from 'axios';
import baseUrl from '../API/BaseUrl'

const FavoriteItems = () => {
    const navigation = useNavigation();

    const context = useContext(Context);

    const [remove, setRemove] = useState(false)

    const romoveFromFavorite = (item) => {
        if (context.token === null) {
            Alert.alert("For adding favorite item you have to sign in first!");
        }
        else {
            axios.post(baseUrl + "wish/remove",
                {
                    "productID": item._id,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${context.token}`
                    }
                })
                .then(function (response) {
                    // handle success
                    console.log(response.data)
                    context.removeProductFavorite(item);
                    setRemove(!remove)
                    alert("removed")

                })
                .catch(function (error) {
                    // handle error
                    alert(error.message);
                })
                .finally(function () {
                    // always executed
                    // alert('Finally called');
                });

        }
    }

    const getFavoriteList = () => {
        axios
            .get(baseUrl + "wish/getAll",
                {
                    headers: {
                        'Authorization': `Bearer ${context.token}`
                    }
                })
            .then(function (response) {
                // handle success
                const data = JSON.stringify(response.data)
                context.addFavoriteList(response.data);

            })
            .catch(function (error) {
                // handle error
                // alert("error")
            })
            .finally(function () {
                // always executed
                // alert('Finally called');
            });
    };

    useEffect(() => {
        getFavoriteList();

    }, [remove])

    return (
        <>
            <View style={styles.container} >
                <Header />
                <Search />
                <AppTitleText style={styles.title} >Your Saved Items</AppTitleText>

                <View style={styles.list} >
                    <FlatList

                        data={context.favorite}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => {
                            return (
                                <ProductCard
                                    title={item.name}
                                    price={item.price}
                                    iconClose
                                    onPressClose={() => { romoveFromFavorite(item); }}
                                    product={item}
                                    image={"https://reactnative.dev/img/tiny_logo.png"}
                                    onPressAddToCart={context.addProductToCart.bind(this, item)}
                                    styleCartButton={{ width: wp(83) }}
                                    onPress={() => navigation.navigate("Explore", { screen: "ViewSingleProduct", params: { Data: item, image: `https://reactnative.dev/img/tiny_logo.png` } })}


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
    button: {
        alignSelf: "center",
        borderRadius: hp(.8)
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(70),
        width: wp(100),
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

export default FavoriteItems
