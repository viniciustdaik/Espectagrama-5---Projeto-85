import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class PostCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Tela de Posts", {
                        navigation: this.props.navigation,
                        post: this.props.post,
                    })}>

                        <View style={styles.authorContainer}>
                            <View style={styles.authorImageContainer}>
                                <Image
                                    source={require('../assets/profile_img.png')}
                                    style={styles.profileImage}
                                ></Image>
                            </View>
                            <View style={styles.authorNameContainer}>
                                <Text style={styles.authorNameText}>{this.props.post.author}</Text>
                            </View>
                        </View>
                        <Image source={require('../assets/post.jpeg')} style={styles.postImage} />
                        <View style={styles.captionContainer}>
                            <Text style={styles.captionText}>
                                {this.props.post.caption}
                            </Text>
                        </View>



                    </TouchableOpacity>

                    <View style={styles.actionContainer}>
                        <View style={styles.likeButton}>
                            <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                            <Text style={styles.likeText}>12k</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardContainer: {
        margin: RFValue(13),
        backgroundColor: "#3CB371", //#3CB371
        borderRadius: RFValue(30),
        width: "95%", //eu 
    },
    /**/authorContainer: {
        margin: RFValue(13),
        backgroundColor: "#3CB371", //#3CB371
        borderRadius: RFValue(30),
    },
    postImage: {
        width: "95%", //eu 
        alignSelf: 'center', //eu
        //borderRadius: RFValue(5), //eu
    },
    profileImage: {
        width: "100%", //eu 
        //height: "55%", //eu
        //marginTop: 350, //eu
    },
    /**/authorImageContainer: {
        margin: RFValue(13),
        backgroundColor: "#3CB371", //#3CB371
        borderRadius: RFValue(30),
        width: "100%", //eu 
        marginLeft: 0, //eu
    },
    /**/authorNameContainer: {
        margin: RFValue(13),
        backgroundColor: "#3CB371", //#3CB371
        borderRadius: RFValue(30),
    },
    /**/captionContainer: {
        margin: RFValue(13),
        backgroundColor: "#3CB371", //#3CB371
        borderRadius: RFValue(30),
    },
    authorNameText: {
        fontSize: RFValue(25), //18
        color: "white", //white
    },
    captionText: {
        fontSize: RFValue(25), //13
        color: "#EBC205", //white //EBC205 //EBC
        paddingTop: RFValue(10),
    },
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: RFValue(50),
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(50),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: "#EB3948", //#EB3948
        borderRadius: RFValue(40),
    },
    likeText: {
        color: "white", //white
        fontSize: RFValue(25),
        marginLeft: RFValue(4),
    }
});
