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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
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
});

export default styles;