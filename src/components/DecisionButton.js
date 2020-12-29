import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { withTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class DecisionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const colors = this.props.theme.colors;
    const styles = StyleSheet.create({
      title: {
        fontSize: 18,
        color: colors.text,
        fontWeight: "bold",
      },
      subTitle: {
        fontSize: 14,
        color: colors.text,
        fontWeight: "normal",
        marginTop: 8,
      },
      titleView: {
        flex: 1,
        marginHorizontal: 12,
      },
      mainView: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: "center",
      },
    });
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{ marginVertical: 16 }}>
        <View style={styles.mainView}>
          <MaterialCommunityIcons
            name={this.props.iconName}
            color={colors.text}
            size={24}
          />
          <View style={styles.titleView}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subTitle}>{this.props.subTitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withTheme(DecisionButton);
