import React from "react";
//import useState et useEffect
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

//import de mon icone star
import { FontAwesome } from "@expo/vector-icons";

//Import d'Axios pour pouvoir faire des requetes vers l'API après installation via terminal : yarn add axios
import axios from "axios";

//Colors:
import colors from "../assets/colors";
const { pinkAir, grey } = colors;

//import composant
// import RoomCard from "../components/RoomCard";

export default function HomeScreen(props) {
  // console.log(props);
  const navigation = useNavigation();

  //declaration des datas
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [isTouchable, setIsTouchable] = useState(true);

  //Chargement des données de l'API via la fonction fetchData
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  //fonction pour afficher les étoiles du rating
  const displayStar = (value) => {
    const tab = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= value) {
        tab.push(<FontAwesome name="star" size={24} color="orange" key={i} />);
      } else {
        tab.push(<FontAwesome name="star" size={24} color="grey" key={i} />);
      }
    }
    return tab;
  };

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="pinkAir" animating={true} />
    </View>
  ) : (
    <FlatList
      data={data}
      // ListHeaderComponentStyle={(backgroundColor = "blue")}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          // <RoomCard
          //   item={item}
          //   isTouchable={isTouchable}
          //   setIsTouchable={setIsTouchable}
          //   {...props}
          //   id={item._id}
          // />
          <TouchableOpacity
            style={[styles.roomsContent, styles.container]}
            onPress={() => {
              props.navigation.navigate("RoomScreen", { id: item._id });
            }}
          >
            <ImageBackground
              style={styles.roomPic}
              source={{ uri: `${item.photos[0].url}` }}
            >
              <View style={styles.roomPrice}>
                <Text style={styles.price}>{`${item.price} €`}</Text>
              </View>
            </ImageBackground>
            <View style={styles.roomInfos}>
              <View style={styles.col1}>
                <Text style={styles.roomTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.rating}>
                  {displayStar(item.ratingValue)}
                  <Text style={styles.roomReviews}>{item.reviews}</Text>
                </View>
              </View>
              <View style={styles.col2}>
                <Image
                  style={styles.userAvatar}
                  source={{ uri: `${item.user.account.photo.url}` }}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  // *---- GLOBAL ----*

  container: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  // *---- HOME ROOMS ----*
  roomsContent: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginBottom: 10,
    backgroundColor: "blue",
  },

  roomInfos: {
    alignItems: "center",
  },

  roomTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  roomPic: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  roomPrice: {
    width: 100,
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
  },
  price: {
    color: "white",
    fontSize: 20,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  // *---- Room infos ----*
  roomInfos: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  col1: {
    flex: 3,
    justifyContent: "space-evenly",
  },
  col2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  userAvatar: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
});
