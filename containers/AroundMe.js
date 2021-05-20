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

// Package expo-location pour accéder et récupérer les coordonnées GPS de l'appareil
import * as Location from "expo-location";

// Package react-native-maps pour afficher une Map
import MapView from "react-native-maps";

//Colors:
import colors from "../assets/colors";
const { pinkAir, grey } = colors;

const AroundMe = () => {
  //declaration des datas
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //Pour affichier les coordonnées de l'appareil quand celà sera récupéré
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [coords, setCoords] = useState([]);

  //Chargement des données de l'API via la fonction fetchData
  useEffect(() => {
    const getPermission = async () => {
      try {
        // Demander la permission d'accéder aux coordonnées GPS de l'appareil
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          // Récupérer la localisation (coordonnées GPS) de l'appareil
          const location = await Location.getCurrentPositionAsync();

          //Je récupère mes datas de l'API
          try {
            const response = await axios.get(
              "https://express-airbnb-api.herokuapp.com/rooms/around"
            );
            console.log(response.data);
            setData(response.data);
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
          //Je récupère les coordonnées des rooms dans un tableau de données
          let coordsTab = [...coords];
          for (let i = 0; i < data.length; i++) {
            coordsTab.push({
              latitude: data[i].location[1],
              longitude: data[i].location[0],
            });
          }
          setCoords(coordTab);

          //Je set la latitude et la longitude des rooms
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        } else {
          alert("Accès refusé");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermission();
  }, [coords]);

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="pinkAir" animating={true} />
    </View>
  ) : (
    <>
      <MapView
        style={styles.map}
        // // Pour centrer la carte sur Paris pour voir les locs :
        // initialRegion={{
        //   latitude: 48.856614,
        //   longitude: 2.3522219,
        //   latitudeDelta: 0.1,
        //   longitudeDelta: 0.1,
        // }}
        // Pour afficher la position de l'utilisateur :
        showsUserLocation={true}
      >
        {coords.map((item, index) => {
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          );
        })}
      </MapView>
      <Text>Latitude : {latitude}</Text>
      <Text>Longitude : {longitude}</Text>
    </>
  );
};

export default AroundMe;

const styles = StyleSheet.create({
  // *---- GLOBAL ----*

  container: {
    backgroundColor: "white",
    padding: 10,
  },

  map: {
    height: 400,
    width: "100%",
    marginTop: 50,
  },
});
