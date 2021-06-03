import React, { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import { DrawerContent } from './src/screens/navigations/DrawerContent'
import { TabBarScreen } from './src/screens/navigations/TabBarScreen'
import RootStackScreen from './src/screens/navigations/RootStackScreen'

import PromoScreen from './src/screens/PromoScreen'
import OrderScreen from './src/screens/OrderScreen'
import FAQ from './src/screens/FAQ'
import AboutUs from './src/screens/AboutUs'
import Profile from './src/screens/Profile'
import OrderDetailsScreen from './src/screens/OrderDetailsScreen'
import ShopingCartScreen from './src/screens/ShopingCartScreen'
import Coupon from './src/screens/Coupon'
import CheckoutSignIn from './src/screens/CheckoutSignIn'
import ShippingInfoScreen from './src/screens/ShippingInfoScreen'
import PaymentMathod from './src/screens/PaymentMathod'
import OrderSuccessful from './src/screens/OrderSuccessful'
import SettingsScreen from './src/screens/SettingsScreen'
import PaymentWeb from './src/screens/PaymentWeb'
import Splash from './src/components/Splash'

import GlobalState from './src/Context/GlobalState'
import shopContext from './src/Context/shop-context';
import { AuthContext } from './src/Context/AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';


const App = (props) => {


  const [apiData, setApiData]= useState("")
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };


  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(userName, userToken) => {

      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userName', userName);
        shopContext.setToken(userToken);
      } catch(e) {
        console.log(e);
      }

      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {

      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userInformation');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {

    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);


  useEffect(() => {
    setTimeout(async() => {
      
      await AsyncStorage.setItem('categoryApi', apiData );

      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 2000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <Splash/>
    );
  }

    return (

        <GlobalState >

        <AuthContext.Provider value={authContext} >
            <NavigationContainer>
                { loginState.userToken !== null  ? 
                    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
                    >
                        <Drawer.Screen name={"TabBarScreen"} component={TabBarScreen} />
                        <Drawer.Screen name={"OrderScreen"} component={OrderScreen} />
                        <Drawer.Screen name={"PromoScreen"} component={PromoScreen} />
                        <Drawer.Screen name={"FAQ"} component={FAQ} />
                        <Drawer.Screen name={"AboutUs"} component={AboutUs} />
                        <Drawer.Screen name={"Profile"} component={Profile} />
                        <Drawer.Screen name={"OrderDetailsScreen"} component={OrderDetailsScreen} />
                        <Drawer.Screen name={"ShopingCartScreen"} component={ShopingCartScreen} />
                        <Drawer.Screen name={"CheckoutSignIn"} component={CheckoutSignIn} />
                        <Drawer.Screen name={"ShippingInfoScreen"} component={ShippingInfoScreen} />
                        <Drawer.Screen name={"Coupon"} component={Coupon} />
                        <Drawer.Screen name={"PaymentMathod"} component={PaymentMathod} />
                        <Drawer.Screen name={"SettingsScreen"} component={SettingsScreen} />
                        <Drawer.Screen name={"OrderSuccessful"} component={OrderSuccessful} />
                        <Drawer.Screen name={"PaymentWeb"} component={PaymentWeb} />
                    </Drawer.Navigator>
                :
                    <RootStackScreen/>
                }

            </NavigationContainer>
          </AuthContext.Provider>

        </GlobalState>
     
    )
}

export default App
