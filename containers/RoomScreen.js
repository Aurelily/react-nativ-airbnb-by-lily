import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useState, useEffect } from "react";

// Package react-native-maps pour afficher une Map
import MapView from "react-native-maps";

//Import d'Axios pour pouvoir faire des requetes vers l'API après installation via terminal : yarn add axios
import axios from "axios";

//Colors:
import colors from "../assets/colors";
const { pinkAir, grey } = colors;

//import components
import RoomCard from "../components/RoomCard";

function RoomScreen({ route }) {
  // console.log(route);

  //recup de l'id de l'annonce
  const id = route.params.id;

  //declaration des datas
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //Pour gérer l'apparition du texte
  const [displayAllText, setDisplayAllText] = useState(false);

  //Chargement des données de l'API via la fonction fetchData
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${id}`
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="pinkAir" animating={true} />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <RoomCard data={data} />
      <Text
        style={styles.roomDesc}
        numberOfLines={!displayAllText ? 3 : null}
        onPress={() => {
          setDisplayAllText(!displayAllText);
        }}
      >
        {data.description}
      </Text>
      <MapView
        style={styles.map}
        // Pour centrer la carte sur la loc de l'annonce :
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </ScrollView>
  );
}

export default RoomScreen;

const styles = StyleSheet.create({
  // *---- GLOBAL ----*

  container: {
    backgroundColor: "white",
    padding: 10,
  },

  roomDesc: {},
  map: {
    height: 500,
    width: "100%",
    marginTop: 50,
  },
});
