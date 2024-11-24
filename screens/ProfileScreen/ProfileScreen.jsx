import React from 'react';
import styles from './ProfileScreen.styles';
import { Text, View, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://via.placeholder.com/150', // Replace this with the URL of the dog image
        }}
        style={styles.image}
      />
      <Text style={styles.name}>Valerie Eng</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reach Out!</Text>
      </TouchableOpacity>
      <View style={styles.entriesContainer}>
        <Text style={styles.entryDate}>Oct 24, 1978</Text>
        <Text style={styles.entryText}>• She slays</Text>
        <Text style={styles.entryText}>• purrrr</Text>
        <Text style={styles.entryDate}>Oct 24, 1976</Text>
        <Text style={styles.entryText}>• She slays</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Entry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ProfileScreen;