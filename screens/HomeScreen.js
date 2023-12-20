import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

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

      console.log(response);

      for (let item of response) {
        let direccion = `${item.name} ${item.city} ${item.postalCode}`;
        setDireccionActual(direccion);
      }
    }
  };
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
