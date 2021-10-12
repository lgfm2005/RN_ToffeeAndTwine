import { Share, Linking } from "react-native";

// Share Url
export const ShareAppLink = async () => {
  try {
    const result = await Share.share({
      title: "Toffee + Twine",
      message:
        "Download Toffee + Twine App!! Create your own perfect gift profile and share it with your special people!",
      url: "https://apps.apple.com/us/app/toffee-twine/id1530001198",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
var DataPolicyUrl = "https://www.toffeeandtwine.com/copy-of-terms-conditions";
var TermsOfServiceUrl = "https://www.toffeeandtwine.com/terms-conditions";
export const DataPolicy = () => {
  Linking.openURL(DataPolicyUrl);
};

export const TermsOfService = () => {
  Linking.openURL(TermsOfServiceUrl);
};

// const OpenBrowserLink = () => {
//   const DataString = scannerData.substring(0, 8)
//   if (DataString === "https://") {
//       const url1 = scannerData.replace("https://", "")
//       Linking.openURL(`https://${url1}`)
//       // console.log("https url 1 ==> ", url1)
//   } else if (DataString === "http://w") {
//       const url2 = scannerData.replace("http://", "")
//       Linking.openURL(`http://${url2}`)
//       // console.log("https url 2 ==> ", url2)
//   } else {
//       // console.log("https url 3 ==> ", scannerData)
//       Linking.openURL(`https://${scannerData}`)
//   }
const OpenBrowserLink = (UrlLink) => {
  Linking.openURL(UrlLink);
  // console.log("https url 1 ==> ", url1)
};
