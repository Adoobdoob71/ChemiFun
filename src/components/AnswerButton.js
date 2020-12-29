import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { withTheme } from "react-native-paper";

class AnswerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const colors = this.props.theme.colors;
    const styles = StyleSheet.create({
      mainView: {
        flexDirection: "column",
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: "center",
        flex: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.primary,
      },
      image: {
        width: "50%",
        height: "30%",
        borderRadius: 6,
      },
      answerText: {
        fontSize: 16,
        color: colors.text,
      },
    });
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.mainView}>
          <Text style={styles.answerText}>{this.props.answerText}</Text>
          <Image
            source={this.props.image && { uri: this.props.image }}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default withTheme(AnswerButton);
