import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 20,
      marginBottom: 15,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#D6E4FF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    buttonText: {
      color: '#333',
      fontWeight: 'bold',
    },
    entriesContainer: {
      backgroundColor: '#FFF',
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#DDD',
      marginBottom: 20,
      width: '90%',
    },
    entryDate: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
    },
    entryText: {
      fontSize: 14,
      marginBottom: 5,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
    },
    backButton: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    addButton: {
      backgroundColor: '#000',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    addButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  export default styles;