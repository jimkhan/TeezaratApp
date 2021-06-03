import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

import colors from '../config/colors'

import Header from '../components/Header'
import Search from '../components/Search'
import Categories from '../components/Categories'
import AppTitleText from '../components/AppTitleText'

import {useRoute} from '@react-navigation/native';
// const {name} = useRoute();

const ExploreParentScreen = ({ navigation, route }) => {

    const {name} = useRoute();
    console.log(name)
    const { apiData } = route.params;

    const renderItem = ({ item }) => {
        return (
            <>

                { item && <Categories

                    name={item.name}
                    image={"https://reactnative.dev/img/tiny_logo.png"}
                    onPress={() => navigation.navigate("ExploreChildScreen", { apiData: item })}
                />
                }

            </>
        )
    }

    return (
        <View style={styles.container} >
            <Header />
            <Search rootNavName={name} />
            <AppTitleText style={styles.title} >Explore Parent</AppTitleText>
            <View style={styles.categotyBottom} />

            <FlatList
                data={apiData}
                showsVerticalScrollIndicator={false}
                legacyImplementation={false}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
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
export default ExploreParentScreen
