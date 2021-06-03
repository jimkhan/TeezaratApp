import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, ScrollView,  SafeAreaView,FlatList } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../config/colors'

import Header from '../components/Header'
import AppButton from '../components/AppButton'
import Search from '../components/Search'
import Categories from '../components/Categories'
import CardPromosion from '../components/CardPromosion'
import AppTitleText from '../components/AppTitleText'
import Loader from '../components/Loader'

import axios from 'axios';
import baseUrl from '../API/BaseUrl'
import Context from '../Context/shop-context';

import { useRoute } from '@react-navigation/native';
// const {name} = useRoute();

const Home = ({ navigation }) => {

    const { name } = useRoute();
    // console.log(name)

    const context = useContext(Context);

    const [apiData, setApiData] = useState("")
    const [couponData, setCouponData] = useState("")
    const [uToken, setUToken] = useState("")

    const storeData = async () => {
        const token = await AsyncStorage.getItem("userToken");
        context.setToken(token);
        setUToken(token)
        return token;
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

    const getDataUsingSimpleGetCall = () => {

        axios
            .get(baseUrl + "allCategories", {
                headers: {
                    'Authorization': `Bearer ${context.token}`
                }
            }
            )
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
    const getCoupone = () => {
        axios
            .get(baseUrl + "allCoupon",
                {
                    headers: {
                        Authorization: `Bearer ${context.token}`,
                    }
                })
            .then(function (response) {
                // handle success
                const data = JSON.stringify(response.data)
                setCouponData(response.data)
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
        getFavoriteList();
        storeData();
        getCoupone();

    }, [])


    const renderItem = ({ item }) => {
        return (
            <>

                { item && <Categories

                    name={item.name}
                    image={"https://reactnative.dev/img/tiny_logo.png"}
                    onPress={() => navigation.navigate("Explore", { screen: "ExploreParentScreen", params: { apiData: item.subCategory } })}

                />}

            </>
        )
    }

    return (
        <>
            {
                apiData === "" ? <Loader />
                    :
                    <View style={styles.container}>
                        <Header />
                        <Search rootNavName={name} />
                        <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: wp(100), }}>
                            <AppTitleText style={styles.headerText} >Browse Products by Categories</AppTitleText>
                            <View style={styles.categotyBottom} />

                            <View style={styles.categoryArea} >
                                <ScrollView horizontal contentContainerStyle={{ height: hp(32.5), width: wp(90), }}>


                                    <FlatList
                                        data={apiData}
                                        showsVerticalScrollIndicator={false}
                                        legacyImplementation={false}
                                        keyExtractor={(item) => item._id}
                                        renderItem={renderItem}

                                    />
                                </ScrollView>
                            </View>

                            <AppButton name={"Explore All Products"} style={styles.button} onPress={() => navigation.navigate("Explore", { screen: "Explore" })} />
                            
                                <SafeAreaView style={{ flex: 1 }}>
                                    <FlatList
                                        data={couponData}
                                        // ListFooterComponent={}
                                        scrollEnabled={false}
                                        keyExtractor={(item) => item._id}
                                        renderItem={({ item }) => {
                                            return (

                                                <CardPromosion
                                                    couponCode={item.couponCode}
                                                    description={item.couponDescription}
                                                    percent={item.couponDiscountPercentage}
                                                    minimumAmount={item.couponDiscountMinimumAmount}
                                                    limit={item.couponDiscountAmount}
                                                    expireTime={item.couponEndTime}
                                                />
                                            )
                                        }}
                                    />
                                </SafeAreaView>
                            

                        </ScrollView>
                    </View>

            }

        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    categoryArea: {
        height: hp(27),
        width: wp(90),
    },
    couponArea: {
        height: hp(30),
        width: wp(90),
    },
    categotyBottom: {
        width: wp(88.3),
        borderColor: colors.secondaryBorder,
        borderBottomWidth: 1,
        borderRadius: wp(5),

    },
    headerText: {
        alignSelf: 'stretch',
        marginLeft: wp(5),
        marginBottom: hp(1),
    },
    button: {
        width: wp(90),
        height: hp(7),
        marginBottom: hp(1),
        borderRadius: hp(4),
        borderColor: colors.secondaryBorder,
        borderWidth: 1,
    }

})

export default Home
