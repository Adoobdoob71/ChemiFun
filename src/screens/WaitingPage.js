import * as React from "react";
import { SafeAreaView, Text, FlatList, StyleSheet, View } from "react-native";
import { IconButton, withTheme } from "react-native-paper";
import * as firebase from "firebase";

class WaitingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.key = props.route.params.key;
    this.username = props.route.params.username;
    this.owner = props.route.params.owner;
    this.userKey = props.route.params.userKey;
    this.db = firebase.default.database().ref("games").child(this.key);
  }

  componentDidMount() {
    this.db.on("value", (snapshot) => {
      if (snapshot.val().gameStarted && !this.props.route.params.finished) {
        this.props.navigation.navigate("QuestionPage", {
          owner: false,
          username: this.username,
          key: this.key,
          userKey: this.userKey,
        });
      }
    });
    this.reloadPlayers();
  }

  reloadPlayers = async () => {
    this.db.child("participants").once("value", (snapshot) => {
      this.setState({ data: [] }, () => {
        let arr = [];
        snapshot.forEach((item) => {
          arr = arr.concat([{ ...item.val(), key: item.key }]);
        });
        this.setState({
          data: arr,
        });
      });
    });
  };

  startGame = async () => {
    await this.db.update({
      gameStarted: true,
    });
    this.props.navigation.navigate("QuestionPage", {
      owner: true,
      username: this.username,
      key: this.key,
      userKey: this.userKey,
    });
  };

  render() {
    const colors = this.props.theme.colors;
    const styles = StyleSheet.create({
      text: {
        color: colors.text,
        fontSize: 20,
      },
    });
    this.props.navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          color={colors.text}
          onPress={() => this.props.navigation.pop()}
        />
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton
            icon="reload"
            color={colors.text}
            onPress={this.reloadPlayers}
          />
          <IconButton
            icon="chevron-right"
            color={colors.surface}
            onPress={this.startGame}
            disabled={!this.owner}
            style={{ backgroundColor: colors.primary }}
          />
        </View>
      ),
    });
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 36,
          paddingVertical: 48,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={{ color: colors.text, fontSize: 21, marginVertical: 36 }}>
          {this.key}
        </Text>
        <FlatList
          data={this.state.data}
          style={{ width: "100%", flex: 1, paddingHorizontal: "10%" }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: colors.card,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 4,
              }}>
              <Text style={styles.text}>{item.username}</Text>
              <Text style={styles.text}>
                {"  "}
                {item.points}
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

export default withTheme(WaitingPage);
