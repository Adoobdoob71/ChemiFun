import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../screens/HomePage";
import WaitingPage from "../screens/WaitingPage";
import QuestionPage from "../screens/QuestionPage";
import { withTheme } from "react-native-paper";
import JoiningPage from "../screens/JoiningPage";

const Stack = createStackNavigator();

class StackNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          component={HomePage}
          name="HomePage"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={JoiningPage}
          name="JoiningPage"
          options={{ headerTitle: "צטרף למשחק", headerTransparent: true }}
        />
        <Stack.Screen
          component={WaitingPage}
          name="WaitingPage"
          options={{ headerTransparent: true, headerTitle: "" }}
        />
        <Stack.Screen
          component={QuestionPage}
          name="QuestionPage"
          options={{ headerTransparent: true, headerTitle: "שאלות" }}
        />
      </Stack.Navigator>
    );
  }
}

export default withTheme(StackNavigator);
