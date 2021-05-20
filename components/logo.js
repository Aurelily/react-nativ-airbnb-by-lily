import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";

const Logo = () => {
  return (
    <Image source={require("../assets/img/logo.png")} style={styles.logoMini} />
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoMini: {
    height: 30,
    width: 30,
  },
});
