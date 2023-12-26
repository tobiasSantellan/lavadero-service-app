import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay={true} //  Un booleano que determina si el slider debe reproducirse automáticamente o no.
        circleLoop // Un booleano que determina si el slider debe hacer un bucle continuo, es decir, si después de llegar a la última imagen debería volver a la primera y viceversa.
        dotColor={"#13274F"} //  El color de los puntos indicadores (dots) cuando están activos.
        inactiveDotColor="#90A4AE" // El color de los puntos indicadores cuando están inactivos.
        ImageComponentStyle={{
          //  Estilo para aplicar al componente de imagen dentro del slider.
          borderRadius: 6,
          width: "94%",
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
