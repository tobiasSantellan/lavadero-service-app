import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";

const HomeScreen = () => {
  const [direccionActual, setDireccionActual] = useState(
    "Cargando tu ubicacion"
  );
  const [localizacionHabilitada, setLocalizacionHabilitada] = useState(false);
  useEffect(() => {
    comprobarSiLaUbicacionEstaHabilitada();
    obtenerUbicaciónActual();
  }, []);

  const comprobarSiLaUbicacionEstaHabilitada = async () => {
    let habilitacion = await Location.hasServicesEnabledAsync();
    if (!habilitacion) {
      Alert.alert(
        "Servicios de ubicación no habilitados",
        "Por favor habilite los servicios de ubicación",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      setLocalizacionHabilitada(habilitacion);
    }
  };

  const obtenerUbicaciónActual = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permiso Denegado",
        "Permitir que la aplicación utilice los servicios de ubicación",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();

    console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let direccion = `${item.name} ${item.city} ${item.postalCode}`;
        setDireccionActual(direccion);
      }
    }
  };
  return (
    <SafeAreaView>
      {/* {Ubicacion y Perfil} */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
        <MaterialIcons name="location-on" size={24} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
          <Text>{direccionActual}</Text>
        </View>
        <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: "https://scontent.faep9-1.fna.fbcdn.net/v/t1.6435-9/53362510_953097241555468_2868619321402195968_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeGMONnw3dPNm1PxgbejDXHEvLZ-sSnow6S8tn6xKejDpBOV2Gt1z6nSfKl3uoQNR8onaTNocD4-rV4pvD2QHegV&_nc_ohc=EwnVIeZt2ZkAX-ngUD7&_nc_ht=scontent.faep9-1.fna&oh=00_AfASRbpiLH167REYJo5a2bbij0ADtEwfYjb6X_otDJZWtA&oe=65B26D53",
            }}
          />
        </Pressable>
      </View>

      {/* {Barra de Busqueda} */}
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.8,
          borderColor: "#C0C0C0",
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="Buscar artículos o más" />
        <Feather name="search" size={24} color="#fd5c63" />
      </View>
      {/* {Carousel Imagen} */}
      <Carousel />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
