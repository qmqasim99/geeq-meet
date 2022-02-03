// import {
//   useFonts,
//   Roboto_400Regular,
//   Bangers_400Regular,
//   OpenSans_400Regular,
// } from "@expo-google-fonts/dev";

const palette = {
  darkBlue: "#323B57",
  midBlue: "#2B4A9A",
  lightBlue: "#009FE3",
  green: "#A6D1A1",
  red: "#E6332A",
  black: "#0B0B0B",
  grey: "#b9b9b0",
  yellow: "#F2BE2D",
  transparent: "rgba(0,0,0,0)",
};

export const defaultTheme = {
  dark: false,
  colors: {
    primary: palette.yellow,
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    textPrimary: palette.yellow,
    textSecondary: palette.lightBlue,
    border: palette.gray,
    notification: "rgb(255, 69, 58)",
  },
  header: {
    fontSize: 30,
    color: palette.yellow,
    textAlign: "center",
    padding: 10,
  },
  header2: {
    fontSize: 28,
    color: palette.lightBlue,
    textAlign: "left",
    padding: 15,
  },
  header3: {
    fontSize: 20,
    color: palette.grey,
    textAlign: "left",
    fontWeight: "bold",
  },
  header4: { fontSize: 22, color: palette.green, textAlign: "left" },
  header5: { fontSize: 18, color: palette.grey, textAlign: "left" },

  fListText: {
    fontSize: 20,
    color: palette.green,
    textAlign: "left",
    paddingLeft: 20,
    padding: 5,
  },
  fListText2: { fontSize: 18, color: palette.grey, textAlign: "right" },
  fListCard: {
    fontSize: 15,
    color: palette.grey,
    textAlign: "left",
    margin: 2,
  },
  fListArea: {
    backgroundColor: palette.midBlue,
    margin: 1,
    borderRadius: 5,
    margin: 5,
  },
  fListCard: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icon: {
    color: palette.midBlue,
    acceptColor: palette.lightBlue,
    declineColor: palette.red,
  },
  logo: {
    marginTop: 100,
    flex: 2,
    width: 250,
    height: 250,
    resizeMode: "contain",
  },

  container: {
    backgroundColor: palette.darkBlue,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logContainer: {
    backgroundColor: palette.transparent,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  listItemContainer: {
    backgroundColor: palette.midBlue,
    padding: 5,
    height: 60,
    margin: 2,
    width: "100%",
  },
  scrollContainer: {
    backgroundColor: palette.darkBlue,
    flexDirection: "column",
    justifyContent: "space_between",
    padding: 5,
  },
  picker: {
    backgroundColor: palette.yellow,
    color: palette.darkBlue,
    fontSize: 22,
    width: "100%",
    borderRadius: 20,

    // transform: "translateX(-50%)",
  },
  homeContainer: {
    backgroundColor: palette.darkBlue,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space_between",

    // padding: 5,
  },
  homeContainer2: {
    backgroundColor: palette.transparent,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space_between",

    // padding: 5,
  },
  letsMeetButton: {
    border: "red",
    position: "absolute",
    bottom: 50,
    flex: "grow",
  },
  inputContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginInput: {
    backgroundColor: palette.yellow,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: 200,
  },
  buttonContainer: {
    color: palette.midBlue,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 4,
  },
  inviteCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  horizontalButtonContainer: {
    flexDirection: "row",
    color: palette.midBlue,
    justifyContent: "space-around",
    alignItems: "center",

    padding: 10,
  },
  buttonContainerReset: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },

  button: {
    backgroundColor: palette.transparent,
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: palette.transparent,
    marginTop: 5,
    borderColor: palette.lightBlue,
    borderWidth: 2,
  },
  buttonText: {
    color: palette.yellow,
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: palette.midBlue,
    fontWeight: "700",
    fontSize: 16,
  },

  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  activeMeetAlert: { alignItems: "center", backgroundColor: palette.red },
  alertText: { fontWeight: "bold", fontSize: 22, color: palette.darkBlue },
  ratingText: { fontWeight: "bold", fontSize: 20, color: palette.yellow },
  ratingText2: { fontWeight: "bold", fontSize: 12, color: palette.green },
  navbarStyle: {
    // position: "absolute",
    // bottom: 30,
    width: "90%",
    // right: 5,
    marginTop: 0,
  },
  navContainer: {
    backgroundColor: palette.midBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    width: "100%",
    height: 60,
    // left: 5,
  },
  navButton: {
    // backgroundColor: palette.transparent,
    // width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
};
