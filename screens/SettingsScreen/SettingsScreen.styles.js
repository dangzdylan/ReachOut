import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEBAEB',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#AEBAEB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2.5,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  input: {
    width: '100%', // Full width of the container
    height: 50, // Increase the height for a rounded look
    borderColor: '#ccc', // Light gray border
    borderWidth: 2.5,
    borderRadius: 25, // Rounded corners
    paddingHorizontal: 15, // Space inside the input
    marginBottom: 15, // Space between inputs
    backgroundColor: '#FFFFFF', // Light gray background
    fontSize: 16, // Adjust text size
    color: '#000000',
  }
  ,
});

export default styles;