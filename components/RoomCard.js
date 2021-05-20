import React from "react";
import { useState } from "react";
import {
  Button,
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

//Colors:
import colors from "../assets/colors";
const { pinkAir, grey } = colors;

//Constant pour récupérer las dimensions des devices
import Constants from "expo-constants";

//Package pour faire défiler les photos
import { SwiperFlatList } from "react-native-swiper-flatlist";

//import de mon icone star
import { FontAwesome } from "@expo/vector-icons";

// import { TouchableOpacity } from "react-native-gesture-handler";

const RoomCard = ({ data }) => {
  const navigation = useNavigation();

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

  return (
    <View style={[styles.roomsContent, styles.container]}>
      <View style={styles.imgPriceContent}>
        <View>
          <Image
            style={styles.roomPic}
            source={{ uri: `${data.photos[0].url}` }}
          />
        </View>
        <View style={styles.roomPrice}>
          <Text style={styles.price}>{`${data.price} €`}</Text>
        </View>
      </View>

      <View style={styles.roomInfos}>
        <View style={styles.col1}>
          <Text style={styles.roomTitle} numberOfLines={1}>
            {data.title}
          </Text>
          <View style={styles.rating}>
            {displayStar(data.ratingValue)}
            <Text style={styles.roomReviews}>{data.reviews}</Text>
          </View>
        </View>
        <View style={styles.col2}>
          <Image
            style={styles.userAvatar}
            source={{ uri: `${data.user.account.photo.url}` }}
          />
        </View>
      </View>
    </View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  // *---- GLOBAL ----*

  container: {
    backgroundColor: "white",
    alignItems: "center",
  },
  // *---- HOME ROOMS ----*
  // roomsContent: {
  //   borderBottomColor: "lightgrey",
  //   borderBottomWidth: 1,
  //   width: 350,
  // },

  roomTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  roomPic: {
    width: 400,
    height: 250,
  },
  imgPriceContent: {
    position: "relative",
  },
  roomPrice: {
    width: 100,
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 30,
  },
  price: {
    color: "white",
    fontSize: 20,
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
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
});
