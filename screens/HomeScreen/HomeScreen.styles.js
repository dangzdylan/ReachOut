import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEBAEB',
    // backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 60,
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
  pageTitle: {
    fontSize: 40,
    color: '#666666',
    textAlign: 'left',
  },
  title: {
    fontSize: 40,
    textDecorationLine: 'underline',
    marginBottom: 10,
    color: '#000000',
    marginTop: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 40,
    color: '#000000',
    textAlign: 'left',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  icon: {
    fontSize: 40,
    // marginRight: 20,
    image: "./assets/ROlogo.png",
    textAlign: 'right'
  },
  checklistContainer: {
    
  }
});

export default styles;