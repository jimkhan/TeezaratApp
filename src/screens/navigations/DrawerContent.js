import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer, TouchableRipple } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../Context/AuthContext';

export function DrawerContent(props) {

    const { signOut } = React.useContext(AuthContext);

    const [userI, setUserI] = useState("")

    const userInfo = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInformation')
            const val = JSON.parse(jsonValue)
            setUserI(val.user);
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        userInfo()
    }, [])




    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <TouchableRipple style={styles.userInfoSection} onPress={() => props.navigation.navigate("Profile")} >
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://via.placeholder.com/150'


                                }}
                                size={60}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{userI.fullname}</Title>
                                <Caption style={styles.caption}>{userI.email}</Caption>
                            </View>
                        </View>

                    </TouchableRipple>

                    <Drawer.Section style={styles.drawerSection}  >
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={"#FFAA5C"}
                                    size={size}
                                />
                            )}
                            label="Home"
                            labelStyle={styles.drawerItemLable}
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="shopping-outline"
                                    color={"#FFAA5C"}
                                    size={size}
                                />
                            )}
                            label="My Orders"
                            labelStyle={styles.drawerItemLable}
                            onPress={() => { props.navigation.navigate('OrderScreen') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="focus-field"
                                    color={"#FFAA5C"}
                                    size={size}
                                />
                            )}
                            label="Product Categories"
                            labelStyle={styles.drawerItemLable}
                            onPress={() => props.navigation.navigate("Explore", { screen: "Explore" })}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="cog-outline"
                                    color={"#FFAA5C"}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            labelStyle={styles.drawerItemLable}
                            onPress={() => { props.navigation.navigate('SettingsScreen') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="help-circle-outline"
                                    color={"#FFAA5C"}
                                    size={size}
                                />
                            )}
                            label="Help/FAQ"
                            labelStyle={styles.drawerItemLable}
                            onPress={() => { props.navigation.navigate('FAQ') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="information-outline"
                                    color={"#FFAA5C"}
                                    size={size}
                                />
                            )}
                            label="About us"
                            labelStyle={styles.drawerItemLable}
                            onPress={() => { props.navigation.navigate('AboutUs') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="logout"
                                    color={"#FFAA5C"}
                                    size={size}
                                />
                            )}
                            label="Logout"
                            labelStyle={styles.drawerItemLable}
                            onPress={async () => signOut()}
                        />
                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        backgroundColor: '#FFFEF0',
    },
    drawerItemLable: {
        fontFamily: 'Exo-Regular',
        fontWeight: '400',
        fontSize: 16
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
