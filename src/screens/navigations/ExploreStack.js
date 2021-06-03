import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
const Stacks = createStackNavigator();

import Explore from '../Explore'
import ExploreParentScreen from '../ExploreParentScreen'
import ExploreChildScreen from '../ExploreChildScreen'
import ExploreSearch from '../ExploreSearch'
import ViewSingleProduct from '../ViewSingleProduct'

const ExploreStack = () => {
    return (
        <Stacks.Navigator
            initialRouteName={"Explore"}
            screenOptions={
                {
                    headerShown: false
                }
            } >
            <Stacks.Screen name={"Explore"} component={Explore} />
            <Stacks.Screen name={"ExploreParentScreen"} component={ExploreParentScreen} />
            <Stacks.Screen name={"ExploreChildScreen"} component={ExploreChildScreen} />
            <Stacks.Screen name={"ExploreSearch"} component={ExploreSearch} />
            <Stacks.Screen name={"ViewSingleProduct"} component={ViewSingleProduct} />
        </Stacks.Navigator>
    )
}

export default ExploreStack
