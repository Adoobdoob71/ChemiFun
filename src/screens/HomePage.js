import * as React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button, withTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      error: null,
      loading: false,
    };
  }

  signIn = () => {
    this.setState({ loading: true });
    if (this.state.username.trim().length === 0) {
      Alert.alert("לא הזנת שם משתמש");
      this.setState({ loading: false });
      return;
    }
    this.setState({ loading: false });
    this.props.navigation.navigate("JoiningPage", {
      username: this.state.username,
    });
  };
  render() {
    const colors = this.props.theme.colors;
    const styles = StyleSheet.create({
      title: {
        fontSize: 24,
        color: colors.text,
      },
      chemiFunTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.primary,
        marginTop: 16,
      },
      textInput: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderColor: colors.primary,
        borderWidth: 1,
        width: "60%",
        flexDirection: "row",
        marginVertical: 36,
      },
      chemiFunImage: {
        width: "60%",
        height: "25%",
        marginVertical: 24,
      },
    });
    return (
      <>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 36,
            paddingVertical: 48,
          }}>
          <Text style={styles.title}>ברוכים הבאים</Text>
          <Text style={styles.chemiFunTitle}>לכימיכיף</Text>
          <Image
            source={{
              uri:
                "https://www.weizmann.ac.il/pages/sites/default/files/uploads/faculties/chemistry.jpg",
            }}
            style={styles.chemiFunImage}
          />
          <View style={styles.textInput}>
            <TextInput
              value={this.state.username}
              onChangeText={(value) => this.setState({ username: value })}
              multiline={false}
              placeholder="שם משתמש"
              style={{ color: colors.text, width: "100%" }}
            />
          </View>
          <Button
            mode="contained"
            onPress={this.signIn}
            color={colors.primary}
            loading={this.state.loading}
            icon="chevron-right">
            הבא
          </Button>
        </SafeAreaView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            padding: 4,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text
            style={{ color: colors.text, fontSize: 12, marginHorizontal: 8 }}>
            Developed by Elad Mekonen
          </Text>
          <MaterialCommunityIcons
            name="information"
            size={12}
            color={colors.primary}
          />
        </View>
      </>
    );
  }
}

export default withTheme(HomePage);
