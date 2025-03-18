import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  content: {
      flex: 1,
      padding: 20,
  },
  header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#333',
  },
  // Header container for sub-screens with back button
  headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
      paddingTop: 10,
  },
  headerWithBack: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginLeft: 15,  // Space after back button
  },
  backButtonSafe: {
      padding: 8,  // Larger touch target
  },
  optionsContainer: {
      marginVertical: 10,
  },
  optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: '#f7f7f7',
      borderRadius: 12,
      marginBottom: 10,
  },
  optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  optionText: {
      fontSize: 16,
      marginLeft: 15,
      color: '#333',
  },
  backButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 1,
  },
    // Styles for sub-screens like ChangeContactNumberScreen
    textContainer: {
        marginVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
    },
    input: {
      width: '100%', // Full width of the container
      height: 50, // Increase height for a rounded look
      borderColor: '#ccc', // Light gray border
      borderWidth: 1.5,
      borderRadius: 25, // Rounded corners
      paddingHorizontal: 15, // Space inside the input
      marginBottom: 15, // Space between inputs
      backgroundColor: '#FFFFFF', // Light gray background
      fontSize: 16,
      color: '#000000',
    },
    button: {
        backgroundColor: '#4a90e2', // You can adjust this color to match your app's theme
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    // Add any additional styles needed for sub-screens
    subScreenHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        color: '#333',
    },
});
// import { StyleSheet } from 'react-native';

// export const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     content: {
//         flex: 1,
//         padding: 20,
//     },
//     header: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginBottom: 30,
//         color: '#333',
//     },
//     optionsContainer: {
//         marginVertical: 10,
//     },
//     optionButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingVertical: 16,
//         paddingHorizontal: 20,
//         backgroundColor: '#f7f7f7',
//         borderRadius: 12,
//         marginBottom: 10,
//     },
//     optionContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     optionText: {
//         fontSize: 16,
//         marginLeft: 15,
//         color: '#333',
//     },
//     backButton: {
//         position: 'absolute',
//         top: 20,
//         left: 20,
//         zIndex: 1,
//     },
//     input: {
//       width: '100%', // Full width of the container
//       height: 50, // Increase the height for a rounded look
//       borderColor: '#ccc', // Light gray border
//       borderWidth: 2.5,
//       borderRadius: 25, // Rounded corners
//       paddingHorizontal: 15, // Space inside the input
//       marginBottom: 15, // Space between inputs
//       backgroundColor: '#FFFFFF', // Light gray background
//       fontSize: 16, // Adjust text size
//       color: '#000000',
//     }
// });
