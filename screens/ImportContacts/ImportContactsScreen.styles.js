import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // white background color
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: '40%',
    gap: 10,
  },
  icon: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:50,
  },
  iconText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
});

export default styles;