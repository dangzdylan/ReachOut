import React from "react";
import { View, Image, Text, SafeAreaView } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './ImportContactsScreen.styles';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ImportContactsScreen({navigation}) {

  useEffect(() => {
      setIsModalVisible(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
          <Text style={styles.title}>Import Contacts</Text>
          <TouchableOpacity
            style={styles.Icon}
            onPress={navigation.navigate("ConfigContacts")}
            
            >
            <Icon name={"circle-right-arrow"}  size={30} color="#000000" />
          </TouchableOpacity>
        </View>
      <Modal visible={isModalVisible} animationType="slide">
        <View>
          <Text>Confirm import contacts?</Text>
          <Button title="Close" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};