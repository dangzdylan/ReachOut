import React, { useEffect, useState } from "react"; // Add useState to the import
import { Modal, Button, View, Text, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './ImportContactsScreen.styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ImportContactsScreen({ navigation, route }) {


  const {uid} = route.params //THIS IS WHAT YOU GET FROM PREVIOUS SCREEEN

  // Define the modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Set the modal to be visible on initial render
    setIsModalVisible(true);
  }, []);

  const contactConfirmed = () => {
    console.log('=====contact modal closed');
    setIsModalVisible(false)
    navigation.navigate("HomeScreen")
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Import Contacts</Text>
        <TouchableOpacity
          style={styles.Icon}
          onPress={() => navigation.navigate("ConfigContacts")}
        >
          {/* this doesn't work idk why */}
          <Icon name={"circle-right-arrow"} size={30} color="#000000" />
        </TouchableOpacity>
      </View>
      
      <Modal visible={isModalVisible} animationType="slide">
        <View>
          <Text>Confirm import contacts?</Text>
          <Button title="Close" onPress={contactConfirmed} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
