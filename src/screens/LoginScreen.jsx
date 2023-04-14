import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ImageBackground,
  PixelRatio,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

const LoginScreen = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isFocus, setIsFocus] = useState(false);
  const [isShown, setIsShown] = useState(true);

  const indicateBgImage = () => {
    const bgPath = {
      general: require("../../assets/images/bg.jpg"),
      big: require("../../assets/images/bg-2x.jpg"),
      extrabig: require("../../assets/images/bg-3x.jpg"),
    };

    const currentPixelRatio = PixelRatio.get();
    const overagePixelRatio = Math.round(currentPixelRatio);

    switch (overagePixelRatio) {
      case 3:
        return bgPath.extrabig;
      case 2:
        return bgPath.big;
      default:
        return bgPath.general;
    }
  };

  const useOrientation = () => {
    const [orientation, setOrientation] = useState("portrait");

    const onChange = ({ window: { width, height } }) => {
      if (width < height) {
        setOrientation("portrait");
      } else {
        setOrientation("landscape");
      }
    };

    useEffect(() => {
      Dimensions.addEventListener("change", onChange);
    }, []);

    return () => Dimensions.removeEventListener("change", onChange);
  };

  const bgImage = indicateBgImage();
  let orientation = useOrientation();

  const handlePress = () => {
    setIsShown((prevState) => !prevState);
  };

  const handleBtnPress = () => {
    console.log(userData);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground
        style={{
          ...styles.bgImage,
          marginBottom: isKeyboardShown ? -250 : 0,
        }}
        source={bgImage}
        resizeMode="cover"
      >
        <View
          style={{
            ...styles.contentThumb,
            marginBottom: isKeyboardShown ? 80 : 0,
            height: orientation === "landscape" ? "90%" : "60%",
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keybordContainer}
          >
            <View style={styles.form}>
              <Text
                style={{
                  ...styles.pageHeader,
                  marginBottom: orientation === "landscape" ? 20 : 32,
                }}
              >
                Войти
              </Text>

              <View>
                <TextInput
                  value={userData.email}
                  style={{
                    ...styles.input,
                    borderColor: isFocus ? "#FF6C00" : "#E8E8E8",
                    padding: orientation === "landscape" ? 8 : 16,
                  }}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  // secureTextEntry={false}
                  onFocus={() => {
                    setIsFocus(true);
                    setIsKeyboardShown(true);
                  }}
                  onBlur={() => {
                    setIsFocus(false);
                    setIsKeyboardShown(false);
                  }}
                  onChangeText={(value) => {
                    setUserData((prev) => ({
                      ...prev,
                      email: value,
                    }));
                  }}
                />
              </View>

              <View
                style={{
                  ...styles.containerPassword,
                  marginTop: 16,
                  marginBottom: orientation === "landscape" ? 30 : 43,
                }}
              >
                <TextInput
                  value={userData.password}
                  style={{
                    ...styles.inputPassword,
                    borderColor: isFocus ? "#FF6C00" : "#E8E8E8",
                    padding: orientation === "landscape" ? 8 : 16,
                  }}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={true}
                  onFocus={() => {
                    setIsFocus(true);
                    setIsKeyboardShown(true);
                  }}
                  onBlur={() => {
                    setIsFocus(false);
                    setIsKeyboardShown(false);
                  }}
                  onChangeText={(value) => {
                    setUserData((prev) => ({
                      ...prev,
                      password: value,
                    }));
                  }}
                />
                <Pressable style={styles.showBtn} onPress={handlePress}>
                  <Text style={styles.btnText}>
                    {isShown ? "Показать" : "Скрыть"}
                  </Text>
                </Pressable>
              </View>

              <TouchableOpacity
                style={styles.btnStyle}
                activeOpacity={0.7}
                onPress={handleBtnPress}
              >
                <Text style={styles.textStyle}>"Войти"</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <Text style={styles.linkText}>Нет аккаунта? Зарегистрироваться</Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  contentThumb: {
    position: "relative",
    flex: 0,

    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },
  keybordContainer: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  form: {
    flex: 0,
    width: "100%",
  },
  pageHeader: {
    alignSelf: "center",
    marginTop: 92,

    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
  },
  linkText: {
    marginTop: 16,
    marginBottom: 111,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
    marginHorizontal: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
  },
  containerPassword: {
    position: "relative",
    marginHorizontal: 16,
  },
  inputPassword: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
  },
  showBtn: {
    position: "absolute",
    top: 0,
    right: 16,
    paddingVertical: 16,
  },
  btnText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },

  btnStyle: {
    marginHorizontal: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  textStyle: {
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default LoginScreen;
