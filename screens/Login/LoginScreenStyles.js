import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Define colors for easy access
const colors = {
  primary: '#7452a0', // Purple color for buttons
  textLink: '#6A0DAD', // Purple for links
  dark: '#2B2D42',
  light: '#F8F9FA',
  border: '#E9ECEF',
  placeholder: '#8D99AE',
  white: '#FFFFFF',
  background: '#e8e7ea'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'contain',
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 8,
    textAlign: 'center',
  },
  createAccount: {
    marginBottom: 30,
  },
  createAccountText: {
    color: colors.textLink,
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline', // Add underline to the text
  },
  inputsContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.dark,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: colors.textLink,
    fontSize: 14,
    textDecorationLine: 'underline', // Add underline to forgot password text
  },
  button: {
    backgroundColor: colors.primary, // Purple button color
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
