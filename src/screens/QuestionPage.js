import * as React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { withTheme } from "react-native-paper";
import AnswerButton from "../components/AnswerButton";
import * as firebase from "firebase";

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "https://wallpaperaccess.com/full/2622609.jpg",
      question: "",
      image: "",
      currentQuestionIndex: 0,
      questionsList: [
        {
          question: "מהו פולימר",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Polyacetylene-3D-balls.png/1200px-Polyacetylene-3D-balls.png",
          answers: [
            {
              text: "חומר שבנוי ממולקולות ענק שבנויות מיחידות חוזרות",
              correct: true,
            },
            {
              text:
                "חומר שבנוי מאטומי פחמן שקשורים אחד לשני בעזרת קשרים קוולנטים",
              correct: false,
            },
            {
              text: "חומר שבנוי מיונים חיוביים ושליליים",
              correct: false,
            },
          ],
        },
        {
          question: "מהי טבעת בנזן",
          image: "https://img.mako.co.il/2016/03/14/tabaot_basal_newpan_i.jpg",
          answers: [
            {
              text: "טבעת שעשוייה מבנזין",
              correct: false,
            },
            {
              text:
                "שישה אטומי פחמן שקשורים אחד לשני וביניהם מחולקים אלקטרונים",
              correct: true,
            },
            {
              text:
                "ארבעה אטומי פחמן שקשורים אחד לשני וביניהם מחולקים אלקטרונים",
              correct: false,
            },
          ],
        },
        {
          question:
            "האם פולימר עם טמפרטורה זגוגית גבוהה מטמפרטורת החדר יהיה דבק טוב",
          image:
            "https://www.meijer.com/content/dam/meijer/product/0002/92/7698/07/0002927698070_0_A1C1_1200.png",
          answers: [
            {
              text: "כן",
              correct: false,
            },
            {
              text: "לא",
              correct: true,
            },
          ],
        },
        {
          question: "בחר את המאפיין ההכרחי לסיבים",
          image:
            "https://imgaz.staticbg.com/thumb/large/oaupload/banggood/images/8C/7E/e83fc525-e879-4a4b-9f6a-1bb4e33a189c.JPG",
          answers: [
            {
              text: "טמפרטורה זגוגית נמוכה",
              correct: false,
            },
            {
              text: "טבעת בנזן בשלד",
              correct: false,
            },
            {
              text: "טמפרטורה זגוגית גבוהה",
              correct: true,
            },
          ],
        },
        {
          question: "איזה מהאפשרויות עשוי מפולימרים",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Polyacetylene-3D-balls.png/1200px-Polyacetylene-3D-balls.png",
          answers: [
            {
              text: "פלסטיק",
              correct: true,
            },
            {
              text: "יהלום",
              correct: false,
            },
            {
              text: "מלח",
              correct: false,
            },
          ],
        },
        {
          question: "האם נהנתם מהחידון",
          image: "https://mhconsult.com/sites/default/files/blog/happiness.jpg",
          answers: [
            {
              text: "לא",
              correct: false,
            },
            {
              text: "כן",
              correct: true,
            },
          ],
        },
      ],
      answers: [],
      width: Dimensions.get("window").width,
    };
    this.key = props.route.params.key;
    this.username = props.route.params.username;
    this.owner = props.route.params.owner;
    this.userKey = props.route.params.userKey;
    setTimeout(() => {
      firebase.default.database().ref("games").child(this.key).update({
        gameStarted: false,
      });
      this.props.navigation.navigate("WaitingPage", {
        key: this.key,
        username: this.username,
        owner: this.owner,
        finished: true,
      });
    }, 60000);
  }

  componentDidMount() {
    this.handleQuestions(null);
  }

  handleQuestions = (item) => {
    if (this.state.currentQuestionIndex == 6) {
      this.props.navigation.navigate("WaitingPage", {
        key: this.key,
        username: this.username,
        owner: this.owner,
        userKey: this.userKey,
        finished: true,
      });
      return;
    }
    if (item) {
      if (item.correct) {
        firebase.default
          .database()
          .ref("games")
          .child(this.key)
          .child("participants")
          .child(this.userKey)
          .transaction((user) => {
            if (user) user.points++;
            return user;
          });
      }
    }
    this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
    });
    let qtn = this.state.questionsList[this.state.currentQuestionIndex];
    this.setState({
      question: qtn.question,
      answers: qtn.answers,
      image: qtn.image,
    });
  };

  render() {
    const colors = this.props.theme.colors;
    const styles = StyleSheet.create({
      question: {
        fontSize: this.state.width < 1050 ? 16 : 21,
        color: colors.text,
        fontWeight: "bold",
        marginVertical: 12,
      },
      image: {
        width: "60%",
        height: "50%",
      },
    });
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.question}>{this.state.question}</Text>
          <Image
            source={this.state.image && { uri: this.state.image }}
            style={styles.image}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: this.state.width < 1050 ? "column" : "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: this.state.width < 1050 ? 8 : 0,
          }}>
          {this.state.answers.map((item) => (
            <AnswerButton
              answerText={item.text}
              onPress={() => this.handleQuestions(item)}
            />
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(QuestionPage);
