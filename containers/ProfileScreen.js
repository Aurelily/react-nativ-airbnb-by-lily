import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

//Pour mes requetes
import axios from "axios";

//Colors:
import colors from "../assets/colors";
const { pinkAir, grey } = colors;

// Icons
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

//Pour l'acces à l'appareil photo et la galerie
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ userId, userToken, setToken }) {
  //declaration des datas
  const [data, setData] = useState();

  //Pour les input du formulaire de recup des datas
  const [email, setEmail] = useState(null);
  const [userName, setUsername] = useState(null);
  const [description, setDescription] = useState(null);

  //Pour l'acces aux photos
  const [selectedImage, setSelectedImage] = useState(null);
  const [takenPicture, setTakenPicture] = useState(null);

  //Pour le chargement des datas et l'upload des photos
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(true);

  //Fonction de demande de permission d'accès à la galerie
  const getPermissionAndPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      // console.log(result);

      if (!result.cancelled) {
        setSelectedPicture(result.uri);
      }
    } else {
      alert("Permission d'accès à la galerie refusée");
      return;
    }
  };

  //Fonction de demande de permission d'accès à la camera du tél
  const getPermissionAndCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        setTakenPicture(result.uri);
      }
    } else {
      alert("Permission d'accès à la caméra refusée");
      return;
    }
  };

  //Fonction pour envoyer la photo
  const sendPicture = async () => {
    try {
      console.log(selectedPicture);
      const tab = selectedPicture.split(".");
      console.log(tab);

      // const formData = new FormData();
      // formData.append("photo", {
      //   uri: selectedPicture,
      //   name: `my-picture.${tab[tab.length - 1]}`,
      //   type: `image/${tab[tab.length - 1]}`,
      // });

      // const response = await axios.put(
      //   "https://express-airbnb-api.herokuapp.com/user/upload_picture",
      //   formData,
      //   {
      //     headers: {
      //       Authorization:
      //         "Bearer XLclPRPNXMlwYbnclfZouOwhbHD3SyjPEHRqnnt0pWBewx63Fts9IXFFuQ2wywIp",
      //     },
      //   }
      // );
      // console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //Fonction de chargement des data du user connecté
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <SafeAreaView>
      <ActivityIndicator size="large" color="pink" animating={true} />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <Text>My profile id: {userId}</Text>
      <View style={styles.avatarZone}>
        <View style={styles.avatar}>
          <Text>
            <MaterialCommunityIcons
              name="account"
              size={100}
              color="lightgrey"
            />
          </Text>
        </View>
        <View style={styles.btPicZone}>
          <TouchableOpacity onPress={getPermissionAndPhoto}>
            <MaterialIcons name="add-photo-alternate" size={40} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity onPress={getPermissionAndCamera}>
            <MaterialIcons name="add-a-photo" size={35} color="grey" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formContent}>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={data.email}
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
          value={data.username}
          autoCompleteType="off"
          autoCapitalize="none"
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          style={styles.inputArea}
          value={data.description}
          autoCompleteType="off"
          autoCapitalize="none"
          multiline={true}
          placeholder="Description"
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <View style={styles.buttonsContent}>
          <TouchableOpacity style={styles.button} disabled={false}>
            <Text style={styles.txtButton}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} disabled={false}>
            <Text style={styles.txtButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // *---- GLOBAL ----*

  container: {
    alignItems: "center",
  },

  // *---- AVATAR ----*

  avatarZone: {
    flexDirection: "row",
    backgroundColor: "blue",
  },

  btPicZone: {
    justifyContent: "space-evenly",
  },

  // *---- FORM ----*

  formContent: {
    // backgroundColor: "purple",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
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
});
