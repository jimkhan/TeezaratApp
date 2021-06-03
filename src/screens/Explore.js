import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

import Header from '../components/Header'
import Search from '../components/Search'
import Categories from '../components/Categories'
import AppTitleText from '../components/AppTitleText'
import Loader from '../components/Loader'

import colors from '../config/colors'
import axios from 'axios';
import baseUrl from '../API/BaseUrl'

import {useRoute} from '@react-navigation/native';
// const {name} = useRoute();

const Explore = ({ navigation }) => {
    const {name} = useRoute();

    const [apiData, setApiData] = useState('')

    const getDataUsingSimpleGetCall = () => {
        axios
            .get(baseUrl + "allCategories")
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
        getDataUsingSimpleGetCall()

    }, [])


    const renderItem = ({ item }) => {
        return (
            <>

                { item && <Categories

                    name={item.name}
                    image={"https://reactnative.dev/img/tiny_logo.png"}
                    onPress={() => navigation.navigate("ExploreParentScreen", { apiData: item.subCategory })}


                />}

            </>
        )
    }


    return (

        <>
            {
                apiData === ''
                    ?
                    <Loader />
                    :
                    <View style={styles.container} >
                        <Header />
                        <Search rootNavName={name} />
                        <AppTitleText style={styles.title} >Explore Category</AppTitleText>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: wp(100), }}>

                            <View style={styles.categotyBottom} />
                            <ScrollView horizontal >
                                <FlatList
                                    data={apiData}
                                    showsVerticalScrollIndicator={false}
                                    legacyImplementation={false}
                                    keyExtractor={(item) => item._id}
                                    renderItem={renderItem}
                                />
                            </ScrollView>

                        </ScrollView>
                    </View>

            }
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    categotyBottom: {
        width: wp(88.3),
        borderColor: colors.secondaryBorder,
        borderBottomWidth: 1,
        borderRadius: wp(5),
    },
    title: {
        alignSelf: 'stretch',
        marginTop: 0,
        paddingLeft: wp(5),
        marginBottom: hp(2),
    }
})

export default Explore
