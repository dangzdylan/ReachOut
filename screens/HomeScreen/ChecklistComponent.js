import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const ChecklistComponent = (props) => {
  const [checkmarkColor, setCheckMarkColor] = useState("#FFFFFF");

  const setAColor = () => {
    setCheckMarkColor(checkmarkColor === "#FFFFFF" ? "#AEBAEB" : "#FFFFFF");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={props.goToProfile}>
      <View style={styles.pictureContainer}>
        <Ionicons name="person-circle-outline" size={50} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{props.name}</Text>
      </View>
      <TouchableOpacity
        style={[styles.checkmarkContainer, { backgroundColor: checkmarkColor }]}
        onPress={setAColor}
      >
        <Text style={styles.checkmarkText}>✓</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={props.onDelete}>
        <Ionicons name="trash-outline" size={24} color="#FF0000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ChecklistComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFDFFF',
    padding: 16,
    borderRadius: 20,
    marginTop: 10,
    height: 80,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },
  pictureContainer: {
    width: 60,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    color: '#000',
  },
  checkmarkContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    marginLeft: 15,
  },
  checkmarkText: {
    color: '#000',
    fontSize: 18,
  },
  deleteButton: {
    marginLeft: 15,
    padding: 8,
  },
});
