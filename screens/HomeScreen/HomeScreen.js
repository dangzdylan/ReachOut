import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ChecklistComponent from './ChecklistComponent';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => {navigation.navigate('ContactList')}}>
                  <Text style={styles.logo}>Contacts</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Hi Bob,</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Today's Talks</Text>
            </View>
            <View style={styles.checklistContainer}>
                <ChecklistComponent />
                <ChecklistComponent />
                <ChecklistComponent />
                <ChecklistComponent />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
    padding: 10
  },
  logoContainer: {
    display: "flex"
  },
  logo: {
    fontSize: 15,
    textAlign: "right",
  },
  greetingText: {
    fontSize: 30,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
  },
  underlinedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginVertical: 15,
  },
  checklistContainer: {
    width: '100%',
    gap: 12,
  }
});
