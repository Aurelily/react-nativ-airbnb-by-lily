import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const AroundMe = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        let response;
        if (status === "granted") {
          // 1 - récupérer les coordonnées GPS de l'appareil
          const location = await Location.getCurrentPositionAsync();
          // console.log(location.coords.latitude);
          // console.log(location.coords.longitude);
          setLat(location.coords.latitude);
          setLong(location.coords.longitude);

          // 2 - faire une requête en utilisant ces coordonnées (pour récupérer des annonces)
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
        } else {
          // faire une requête sans les coordonnées de l'utilisateur (pour récupérer toutes les annonces)
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );
        }

        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    getPermissionAndLocation();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <MapView
      initialRegion={{
        latitude: lat ? lat : 48.866667,
        longitude: long ? long : 2.333333,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
      style={styles.map}
    >
      {data.map((item) => {
        return (
          <MapView.Marker
            key={item._id}
            coordinate={{
              latitude: item.location[1],
              longitude: item.location[0],
            }}
          />
        );
      })}
    </MapView>
  );
};

export default AroundMe;

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
});
