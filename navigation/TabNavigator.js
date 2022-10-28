import React from 'react';
import { createMaterialBottomTabNavigator  } from "@react-navigation/material-bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from "../screens/Feed";
import CreatePost from "../screens/CreatePost";
import { RFValue } from "react-native-responsive-fontsize";

const Tab = createMaterialBottomTabNavigator ();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Feed') {
                        iconName = focused
                            ? 'book'
                            : 'book-outline';
                    } else if (route.name === 'Criar Postagem') {
                        iconName = focused ? 'create' : 'create-outline';
                    }
                    return <Ionicons name={iconName} size={RFValue(20)} color={color} />;
                },
            })}
            activeColor={"tomato"}
            inactiveColor={"gray"}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="Criar Postagem" component={CreatePost} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;