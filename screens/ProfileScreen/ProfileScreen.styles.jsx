import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F3FF',
      paddingHorizontal: 20,
      paddingVertical: 60,
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
      backgroundColor: '#AEBAEB',
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
      minHeight: '40%'
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
      alignItems: 'center',
      marginTop: 10
    },
    addButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },    
    entryText: {
      fontSize: 16, // Adjust font size for the box text
      color: '#333', // Neutral text color
    },
    
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    
    modalContent: {
      backgroundColor: '#FFF', // White modal background
      padding: 20,
      borderRadius: 10,
      width: '90%', // Modal width relative to screen
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    
    modalInput: {
      height: 100, // Allow room for multiline input
      borderColor: '#DDD',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      textAlignVertical: 'top', // Align text to the top
      fontSize: 16, // Input font size
      marginBottom: 20,
    },

    backButtonWrapper: {
      borderWidth: 1,
      borderColor: '#CCC', // Light grey border for back button
      borderRadius: 50, // Fully rounded button
      width: 50, // Circular button width
      height: 50, // Circular button height
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10, // Space between buttons
    },
    
    backButtonIcon: {
      fontSize: 20, // Adjust arrow size
      color: '#666', // Grey arrow color
    },
    
    addButtonWrapper: {
      backgroundColor: '#000', // Black background for "Add Entry" button
      borderRadius: 25, // Rounded edges
      paddingHorizontal: 20, // Add horizontal padding for button text
      paddingVertical: 10, // Add vertical padding for button text
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    addButtonText: {
      color: '#FFF', // White text color for contrast
      fontWeight: 'bold',
      fontSize: 16, // Font size for "Add Entry" text
    },

    dateText:{
      fontWeight:'bold',
      
    }
    
    
  });

  export default styles;