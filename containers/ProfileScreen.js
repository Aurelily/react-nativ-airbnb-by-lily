import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import axios from "axios";

export default function ProfileScreen({ props, setToken, userId }) {
  const { params } = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>My profile</Text>
      <Text>user id : {params.userId}</Text>
    </View>
  );
}
