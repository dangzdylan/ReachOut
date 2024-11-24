import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 16,
      paddingTop: 40,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 16,
      textDecorationLine: 'underline',
    },
    list: {
      paddingBottom: 40,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    circle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      marginRight: 16,
    },
    contactName: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    backButton: {
     position: 'absolute',
     bottom: 16,
     left: 16,
     backgroundColor: 'white', 
     width: 40,
     height: 40,
     borderRadius: 20,
     alignItems: 'center',
     justifyContent: 'center',
     borderWidth: 2, 
     borderColor: 'gray', 
     elevation: 3, 
   },
   });

   export default styles;
