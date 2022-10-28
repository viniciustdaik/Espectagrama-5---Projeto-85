import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Platform, SafeAreaView } from 'react-native';

import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';

import PostCard from "./PostCard";

let posts = require("./temp_posts.json");

export default class Feed extends Component {
    constructor(props) {
        super(props);
    }
    renderItem = ({ item: posts }) => {
        return <PostCard post={posts} navigation={this.props.navigation} />;
    };

    keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={styles.iconImage}
                        ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={styles.appTitleText}>Espectagrama</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={posts}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "darkblue", //black
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.7,
        flexDirection: "row",
    },
    appIcon: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
        height: "25%" //eu
    },
    iconImage: {
        width: "170%", //"100%"
        height: "170%", //"100%"
        resizeMode: "contain",
    },
    appTitleTextContainer: {
        flex: 0.8,
        justifyContent: "center",
        height: "25%" //eu
    },
    appTitleText: {
        color: "#ABE493", //"white" //ABE //ABE493
        fontSize: RFValue(28),
    },
    cardContainer: {
        flex: 2.2, //0.85
    }
});