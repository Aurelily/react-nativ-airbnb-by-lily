import React from "react";
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useState, useEffect } from "react";

//Import d'Axios pour pouvoir faire des requetes vers l'API après installation via terminal : yarn add axios
import axios from "axios";

// Package react-native-maps pour afficher une Map
import MapView from "react-native-maps";

// Package expo-location pour accéder et récupérer les coordonnées GPS de l'appareil
import * as Location from "expo-location";

//Colors:
import colors from "../assets/colors";
const { pinkAir, grey } = colors;

const AroundMe = () => {
  //declaration des datas
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //Chargement des données de l'API via la fonction fetchData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //Pour affichier les coordonnées de l'appareil quand celà sera récupéré
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  //fonction pour récupérer les coordonnées des rooms
  const getCoords = async (data) => {
    let coordsTab = [];
    try {
      data.map((item, index) => {
        coordsTab.push({
          latitude: item.location[1],
          longitude: item.location[0],
        });
      });
      console.log(coordsTab);
      return coordsTab;
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="pinkAir" animating={true} />
    </View>
  ) : (
    <View>
      <Text>AroundMe</Text>
      {getCoords(data)}
    </View>
  );
};

export default AroundMe;

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
