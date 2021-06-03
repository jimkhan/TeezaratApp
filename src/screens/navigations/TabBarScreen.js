import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Tab = createMaterialBottomTabNavigator();
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ExploreIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import colors from '../../config/colors'
import Home from '../Home'
import ExploreStack from '../navigations/ExploreStack'
import FavoriteItems from '../FavoriteItems'
import ChatSupport from '../ChatSupport'

export function TabBarScreen(props) {

    return (

        <Tab.Navigator
            initialRouteName="Home"
            activeColor={colors.primaryLight}
            inactiveColor={colors.black}
            barStyle={{ backgroundColor: colors.white }}

        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-home-outline" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Explore"
                initialRouteName="Explore"
                component={ExploreStack}
                options={{
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ color }) => (
                        <ExploreIcon name={"compass-outline"} size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="FavoriteItems"
                component={FavoriteItems}
                options={{
                    tabBarLabel: 'Favorite',
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-heart-outline" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="ChatSupport"
                component={ChatSupport}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-send-outline" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )

}
