import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ChecklistComponent = () => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => console.log("Going to profile screen")}>
            <View style={styles.pictureContainer}>
                <Text style={styles.pictureText}>Picture</Text>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>Name</Text>
            </View>
            <TouchableOpacity style={styles.checkmarkContainer}>
                <Text style={styles.checkmarkText}>✔</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default ChecklistComponent;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
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
      backgroundColor: '#FFFCC9',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20,
    },
    pictureText: {
      fontSize: 14,
      color: '#000',
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
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: '#000',
      marginLeft: 15,
    },
    checkmarkText: {
      color: '#000',
      fontSize: 18,
    }
});

