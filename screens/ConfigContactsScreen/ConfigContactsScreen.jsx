import React from "react";
import { View, Image, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './ConfigContactsScreen.styles';

export default function ConfigContactsScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
          <Text style={styles.title}>blank</Text>
        </View>
    </SafeAreaView>
  );
};