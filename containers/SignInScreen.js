import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

//Colors:
import colors from "../assets/colors";
const { pinkAir, grey } = colors;

//Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

//Axios pour envoyer des requetes
const axios = require("axios");

//Import asyncStorage pour stocker le token
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ setToken, getUserId }) {
  const navigation = useNavigation();

  //States of input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState("");

  //Fonction handleSubmit pour le onPress du bouton Sign in
  const handleSubmit = async (event) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      // console.log(response.data);

      if (response.data.token && response.data.id) {
        const userToken = response.data.token;
        const userId = response.data.id;
        setToken(userToken);
        getUserId(userId);

        //Je stock le token et le userId sur le asyncStorage
        await AsyncStorage.setItem("userToken", userToken);
        await AsyncStorage.setItem("userId", userId);

        setIsLoading(false);
      } else {
        setAlert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      // console.log(error.response.data.error);
      if (error.response.data.error === "Unauthorized") {
        setIsLoading(false);
        setAlert("Mauvais email et/ou mot de passe");
      } else {
        setErrorMessage("An error occurred");
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoZone}>
          <Image
            source={require("../assets/img/logo.png")}
            style={styles.logoSign}
          />
          <Text style={styles.signTitle}>Sign in</Text>
        </View>
        <View style={styles.formContent}>
          <View style={styles.inputContent}>
            <TextInput
              style={styles.input}
              placeholder="email"
              autoCompleteType="off"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCompleteType="off"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
          <View style={styles.buttonsContent}>
            <Text style={styles.msgAlert}>{alert}</Text>
            <TouchableOpacity
              style={styles.button}
              disabled={isLoading ? true : false}
              onPress={handleSubmit}
            >
              <Text style={styles.txtButton}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.txtLink}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text>No account ? Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  // *---- GLOBAL ----*

  container: {
    alignItems: "center",
  },

  // *---- LOGO ZONE ----*
  logoZone: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },

  logoSign: {
    height: 100,
    width: 100,
  },

  signTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: grey,
  },

  // *---- FORM ----*

  formContent: {
    // backgroundColor: "purple",
    width: "80%",
    height: 300,
    alignItems: "center",
    justifyContent: "space-between",
  },

  inputContent: {
    alignItems: "center",
    width: "100%",
  },

  input: {
    width: "100%",
    height: 50,
    // backgroundColor: "blue",
    borderBottomColor: pinkAir,
    borderBottomWidth: 1,
  },

  buttonsContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    borderColor: pinkAir,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 200,
    marginVertical: 30,
  },

  txtButton: {
    color: grey,
    fontSize: 20,
    fontWeight: "bold",
  },

  msgAlert: {
    color: pinkAir,
  },
});
