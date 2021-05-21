import React from "react";
import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

//Colors:
import colors from "../assets/colors";
const { pinkAir, grey } = colors;

//Constant pour récupérer las dimensions des devices
import Constants from "expo-constants";

//Pour que le clavier du mobile ne supperpose pas le contenu
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

//UseNavigation pour pouvoir mettre des liens
import { useNavigation } from "@react-navigation/core";

//Axios pour pouvoir faire une requete au serveur
const axios = require("axios");

export default function SignUpScreen() {
  const navigation = useNavigation();

  //States of input
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (email && username && password && confirmPassword && description) {
      // Si tous les champs sont remplis
      if (password === confirmPassword) {
        // si les 2 MDP sont identiques
        try {
          // on passe à la requête
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              password,
              description,
            }
          );

          // console.log(response.data);

          if (response.data.token) {
            setAlert("Requête réussie");
            // navigation.navigate("SignIn");
          }
        } catch (e) {
          // console.log(Object.keys(e));
          // console.log(e.response.data.error);
          if (
            e.response.data.error === "This email already has an account." ||
            e.response.data.error === "This username already has an account."
          ) {
            setAlert(e.response.data.error);
          } else {
            setAlert("An error occurred");
          }
        }
      } else {
        // si les 2 MDP ne sont pas identiques
        setAlert("MDP doivent être identiques");
      }
    } else {
      // Si tous les champs ne sont pas remplis
      setAlert("Remplir tous les champs");
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
          <Text style={styles.signTitle}>Sign up</Text>
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
              placeholder="username"
              autoCompleteType="off"
              autoCapitalize="none"
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <TextInput
              style={styles.inputArea}
              autoCompleteType="off"
              autoCapitalize="none"
              multiline={true}
              placeholder="Describe yourself in a few words..."
              onChangeText={(text) => {
                setDescription(text);
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
            <TextInput
              style={styles.input}
              autoCompleteType="off"
              autoCapitalize="none"
              placeholder="Confirm password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
            />
          </View>
          <View style={styles.buttonsContent}>
            <Text style={styles.msgAlert}>{alert}</Text>
            <TouchableOpacity
              style={styles.button}
              disabled={false}
              onPress={handleSubmit}
            >
              <Text style={styles.txtButton}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.txtLink}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text>Already have an account? Sign in</Text>
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
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },

  // *---- LOGO ZONE ----*
  logoZone: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
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
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
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

  inputArea: {
    height: 100,
    width: "100%",
    borderColor: pinkAir,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    textAlignVertical: "top",
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
    marginVertical: 20,
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
