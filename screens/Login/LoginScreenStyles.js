import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F3FF', // White background
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 40,
    marginBottom: 15
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20, // Space between the last input and the button
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Full width of the container
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  input: {
    width: '100%', // Full width of the container
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9', // Sli
  },
  image : {
    width: '80',
    height: '80',
    marginBottom: 20,
  },
  forgotPassword: {
    marginTop: 10, // Add margin if needed
    alignSelf: 'flex-start', // Aligns the button to the start (left)
  },
  forgotPasswordText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  createAccount: {
    marginTop: 10, // Space above the text
    marginBottom: 20,
    alignSelf: 'center', // Center the text horizontally
  },
  createAccountText: {
    color: '#6a5acd', // A darker version of lavender that fits well with the #f9f9f9 background
    textDecorationLine: 'underline',
    fontSize: 16, // Adjust font size as needed
  },
})
