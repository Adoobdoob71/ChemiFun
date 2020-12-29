import * as React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { withTheme } from "react-native-paper";
import DecisionButton from "../components/DecisionButton";
import * as firebase from "firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class JoiningPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enterKey: "",
      enterKeyVisible: false,
      loading: false,
      nonExistant: false,
    };
    this.username = props.route.params.username;
  }

  handleJoinGame = (value) => {
    this.setState({ enterKey: value, nonExistant: false });
    if (value.length == 20) {
      this.setState({ loading: true });
      firebase.default
        .database()
        .ref("games")
        .child(value)
        .once("value", async (snapshot) => {
          if (snapshot.exists()) {
            let userKey = await firebase.default
              .database()
              .ref("games")
              .child(value)
              .child("participants")
              .push().key;
            firebase.default
              .database()
              .ref("games")
              .child(value)
              .child("participants")
              .child(userKey)
              .set({
                username: this.username,
                points: 0,
              });
            let enterKeyTemp = this.state.enterKey;
            this.setState({ enterKey: "" });
            this.props.navigation.navigate("WaitingPage", {
              key: enterKeyTemp,
              username: this.username,
              owner: false,
              userKey: userKey,
            });
          }
          this.setState({ nonExistant: true });
        });
      this.setState({ loading: false });
    }
  };

  createGame = () => {
    let key = firebase.default.database().ref("games").push().key;
    let userKey = firebase.default
      .database()
      .ref("games")
      .child(key)
      .child("participants")
      .push().key;
    firebase.default
      .database()
      .ref("games")
      .child(key)
      .child("participants")
      .child(userKey)
      .set({
        username: this.username,
        points: 0,
      });
    firebase.default.database().ref("games").child(key).update({
      gameStarted: false,
    });
    this.props.navigation.navigate("WaitingPage", {
      key: key,
      username: this.username,
      owner: true,
      userKey: userKey,
    });
  };

  render() {
    const colors = this.props.theme.colors;
    const styles = StyleSheet.create({
      username: {
        fontSize: 16,
        fontWeight: "bold",
        marginEnd: 8,
        color: colors.text,
      },
      shalom: {
        color: colors.text,
        fontSize: 16,
      },
      textInput: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderColor: colors.primary,
        borderWidth: 1,
        width: "100%",
        flexDirection: "row",
        marginVertical: 36,
        display: this.state.enterKeyVisible ? "flex" : "none",
      },
      errorText: {
        color: colors.error,
        fontSize: 12,
        marginTop: 12,
        display: this.state.nonExistant ? "flex" : "none",
      },
    });
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 36,
          paddingVertical: 48,
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}>
          <Text style={styles.username}>{this.username}</Text>
          <Text style={styles.shalom}>שלום</Text>
        </View>
        <DecisionButton
          iconName="plus"
          title="צור משחק"
          subTitle="צור משחק משלך וצרף חברים"
          onPress={this.createGame}
        />
        <DecisionButton
          iconName="chevron-right"
          title="הצטרף למשחק"
          subTitle="הזן קוד שקיבלת מחברים וצטרף למשחק"
          onPress={() =>
            this.setState({ enterKeyVisible: !this.state.enterKeyVisible })
          }
        />
        <View style={styles.textInput}>
          <TextInput
            value={this.state.enterKey}
            onChangeText={this.handleJoinGame}
            style={{ flex: 1, marginEnd: 8 }}
          />
          <MaterialCommunityIcons
            name={this.state.loading ? "reload" : "alert-circle-outline"}
            color={this.state.loading ? colors.text : colors.error}
            size={21}
          />
        </View>
        <Text style={styles.errorText}>לא מצליח למצוא את המשחק</Text>
      </SafeAreaView>
    );
  }
}

export default withTheme(JoiningPage);
