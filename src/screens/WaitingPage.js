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

  findItem = (key, snapshot) => {
    return key === snapshot.key;
  };

  componentDidMount() {
    this.db.on("value", (snapshot) => {
      if (snapshot.val().gameStarted) {
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

  reloadPlayers = () => {
    // this.db.child("participants").on("child_added", (snapshot) => {
    //   this.setState({
    //     data: [...this.state.data, { ...snapshot.val(), key: snapshot.key }],
    //   });
    // });
    // this.db.child("participants").on("child_changed", (snapshot) => {
    //   let result = this.state.data.indexOf((item) =>
    //     this.findItem(item, snapshot)
    //   );
    //   this.state.data.splice(result, 6);
    //   this.setState({
    //     data: [...this.state.data, { ...snapshot.val(), key: snapshot.key }],
    //   });
    // });
    this.db
      .child("participants")
      .once("value", (snapshot) => {
        this.setState({ data: [] });
        snapshot.forEach((item) => {
          this.setState({
            data: [...this.state.data, { ...item.val(), key: item.key }],
          });
        });
      })
      .then(() => this.db.off());
  };

  componentWillUnmount() {
    this.db.off();
    this.db.child("participants").off();
  }

  startGame = async () => {
    await firebase.default.database().ref("games").child(this.key).update({
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
            color={colors.primary}
            onPress={this.startGame}
            disabled={!this.owner}
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
        <Text style={{ color: colors.text, fontSize: 21, marginVertical: 24 }}>
          {this.key}
        </Text>
        <FlatList
          data={this.state.data}
          style={{ width: "100%", flex: 1 }}
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
