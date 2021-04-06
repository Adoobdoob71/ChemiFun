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
        marginTop: 4,
      },
      iconView: {
        backgroundColor: colors.primary,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
      },
      titleView: {
        flex: 1,
        padding: 12,
      },
      mainView: {
        flexDirection: "row",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.primary,
      },
    });
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{ marginVertical: 16 }}>
        <View style={styles.mainView}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons
              name={this.props.iconName}
              color={colors.text}
              size={24}
            />
          </View>
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
