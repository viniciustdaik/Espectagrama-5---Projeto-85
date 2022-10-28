import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class LoginScreen extends Component {
    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                behaviour: 'web',
                androidClientId:
                    '1085103925529-76ekc5h4jo47ackamjiqla4e9qebphk9.apps.googleusercontent.com',
                iosClientId:
                    '1085103925529-pklafb7ajmhji41tln6sobpkqtgbpqeb.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
            if (result.type === 'success') {
                this.onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log(e.message);
            return { error: true };
        }
    };

    onSignIn = (googleUser) => {
        // Precisamos registrar um Observer (observador) no Firebase Auth para garantir que a autenticação seja inicializada.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Verifique se já estamos conectados ao Firebase com o usuário correto.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Crie uma credencial do Firebase com o token de ID do Google.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );

                // Login com a credencial do usuário do Google.
                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then(function (result) {
                        if (result.additionalUserInfo.isNewUser) {
                            firebase
                                .database()
                                .ref('/users/' + result.user.uid)
                                .set({
                                    gmail: result.user.email,
                                    profile_picture: result.additionalUserInfo.profile.picture,
                                    locale: result.additionalUserInfo.profile.locale,
                                    first_name: result.additionalUserInfo.profile.given_name,
                                    last_name: result.additionalUserInfo.profile.family_name,
                                    current_theme: 'dark',
                                })
                                .then(function (snapshot) { });
                        }
                    })
                    .catch((error) => {
                        // Trate os erros aqui.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // O e-mail da conta do usuário que foi usada.
                        var email = error.email;
                        // O tipo do firebase.auth.AuthCredential que foi usado.
                        var credential = error.credential;
                        // ...
                    });
            } else {
                console.log('Usuário já conectado ao Firebase.');
            }
        });
    };

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (
                    providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()
                ) {
                    // Não precisamos reautenticar a conexão do Firebase.
                    return true;
                }
            }
        }
        return false;
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                {/*<Text>LoginScreen</Text>*/}
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => this.signInWithGoogleAsync()}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton: {
        width: '50%',
        height: '10%',
        borderRadius: RFValue(35),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    loginButtonText: {
        fontSize: RFValue(35),
        color: 'purple',
    },
});
