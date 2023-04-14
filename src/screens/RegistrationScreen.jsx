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
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const initialUserData = {
  image: "",
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [image, setImage] = useState(null);
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

  const pickImage = async () => {
    if (image) {
      setImage(null);
      setUserData((prev) => ({ ...prev, image: null }));
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = result.assets[0].uri;
      setImage(newImage);
      setUserData((prev) => ({ ...prev, image: newImage }));
    }
  };

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
        <ScrollView
          contentContainerStyle={{
            ...styles.contentContainer,
            flex: orientation === "landscape" ? 0 : 1,
          }}
        >
          <View
            style={{
              ...styles.contentThumb,
              marginBottom: isKeyboardShown ? 100 : 0,
              height: orientation === "landscape" ? "90%" : "70%",
            }}
          >
            <View style={styles.photoContainer}>
              <View style={styles.imageThumb}>
                {image && (
                  <Image source={{ uri: image }} style={styles.imagePhoto} />
                )}
                <TouchableOpacity
                  style={styles.imageBtn}
                  onPress={pickImage}
                  activeOpacity={0.7}
                >
                  {image ? (
                    <AntDesign
                      name="pluscircleo"
                      size={30}
                      color="#E8E8E8"
                      style={{ transform: [{ rotate: "45deg" }] }}
                    />
                  ) : (
                    <AntDesign name="pluscircleo" size={30} color="#FF6C00" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keybordContainer}
            >
              <View style={styles.form}>
                <Text
                  style={{
                    ...styles.pageHeader,
                    marginTop: orientation === "landscape" ? 112 : 92,
                  }}
                >
                  Регистрация
                </Text>

                <View style={{ marginTop: 16 }}>
                  <TextInput
                    value={userData.login}
                    style={{
                      ...styles.input,
                      borderColor: isFocus ? "#FF6C00" : "#E8E8E8",
                      padding: orientation === "landscape" ? 8 : 16,
                    }}
                    placeholder="Логин"
                    placeholderTextColor="#BDBDBD"
                    // secureTextEntry={true}
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
                        login: value,
                      }));
                    }}
                  />
                </View>

                <View style={{ marginTop: 16 }}>
                  <TextInput
                    value={userData.email}
                    style={{
                      ...styles.input,
                      borderColor: isFocus ? "#FF6C00" : "#E8E8E8",
                      padding: orientation === "landscape" ? 8 : 16,
                    }}
                    placeholder="Адрес электронной почты"
                    placeholderTextColor="#BDBDBD"
                    // secureTextEntry={true}
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
                    secureTextEntry={isShown}
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
                  <Text style={styles.textStyle}>"Зарегистрироваться"</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: "flex-end",
  },
  keybordContainer: {
    position: "relative",
    zIndex: 1,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
  form: {
    flex: 0,
    width: "100%",
  },
  pageHeader: {
    alignSelf: "center",
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
  },
  linkText: {
    marginTop: 16,
    marginBottom: 45,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
  photoContainer: {
    position: "absolute",
    zIndex: 10,
    top: "-10%",
    width: 132,
    height: 120,
  },
  imageThumb: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  imagePhoto: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  imageBtn: {
    position: "absolute",
    right: "-15%",
    bottom: "10%",
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: "#ffffff",
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

export default RegistrationScreen;
