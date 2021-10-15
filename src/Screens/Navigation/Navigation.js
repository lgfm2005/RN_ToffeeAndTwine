import * as React from "react";
import { Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { useActions } from "../../redux/actions";

// Assets
import CommonStyle from "../../Assets/Style/CommonStyle";
import { COLORS } from "../../Assets/utils/COLORS";
import {
  imgLeftBack,
  imgNavHome,
  imgNavOHome,
  imgNavMyprofile,
  imgNavOMyprofile,
  imgNavCalendar,
  imgNavOCalendar,
  imgNavFriend,
  imgNavOFriend,
  imgNavNotification,
  imgNavONotification,
} from "../../Assets/utils/Image";

// Asset
import { ToolbarMain } from "../../Components/ToolbarMain/ToolbarMain";

// Main Screen
import HomeScreen from "../MainScreen/HomeScreen";
import MyProfile from "../MainScreen/ProfileScreen/MyProfile";
import EditProfile from "../MainScreen/ProfileScreen/EditProfile";
import Search from "../MainScreen/Search/Search";
import FriendFollowersList from "../MainScreen/FriendScreen/FriendFollowersList";
import CalendarScreen from "../MainScreen/CalendarScreen";
import SettingScreen from "../MainScreen/SettingScreen";
import UserProfile from "../MainScreen/UserProfile/UserProfile";
import NavNotificationScreen from "../MainScreen/NotificationScreen/NavNotificationScreen";
import NavFriendScreen from "../MainScreen/FriendScreen/NavFriendScreen";

// UserFriendScreen
import NavUserFriendScreen from "../MainScreen/UserFriendScreen/NavUserFriendScreen";
import UserFriendProfile from "../MainScreen/UserFriendScreen/UserFriendProfile";
import OneSignal from "react-native-onesignal";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      headerBackVisible={false}
      // screenOptions={{
      //     headerShown: false
      // }}
      screenOptions={{
        headerTitle: false,
        headerRight: false,
        headerLeft: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerStyle: {
            shadowOpacity: 0,
            backgroundColor: COLORS.Primary,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            height: 100,
          },
          headerBackgroundContainerStyle: {
            backgroundColor: COLORS.Secondary,
          },
          headerTitle: (props) => (
            <ToolbarMain
              onPress={() => {
                navigation.navigate("SettingScreen");
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        // options={{
        //     title: 'Settings',
        //     headerStyle: {
        //         // backgroundColor: COLORS.Secondary,
        //     },
        //     // headerTintColor: COLORS.Primary,
        //     headerTitleStyle: {
        //         fontFamily: FONT.Gilroy,
        //         fontSize: 24,
        //     },
        //     headerLeft: props => <BackIcon
        //         onPress={() => {
        //             navigation.navigate('HomeScreen')
        //         }} />
        // }}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
function Profile() {
  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{
        headerTitle: false,
        headerRight: false,
        headerLeft: false,
      }}
    >
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="NavFriendScreen"
        component={NavFriendScreen}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
        screenOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NavUserFriendScreen"
        component={NavUserFriendScreen}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
        screenOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FriendFollowersList"
        component={FriendFollowersList}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserFriendProfile"
        component={UserFriendProfile}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
function Calendar({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="CalendarScreen"
      screenOptions={{
        headerTitle: false,
        headerRight: false,
        headerLeft: false,
      }}
    >
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          headerStyle: {
            shadowOpacity: 0,
            backgroundColor: COLORS.TopBarBG,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            height: 100,
          },
          headerBackgroundContainerStyle: {
            backgroundColor: COLORS.Secondary,
          },
          headerTitle: (props) => (
            <ToolbarMain
              onPress={() => {
                navigation.navigate("SettingScreen");
              }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FriendFollowersList"
        component={FriendFollowersList}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
function Friend() {
  return (
    <Stack.Navigator
      initialRouteName="NavFriendScreen"
      options={{
        animationEnabled: false,
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="NavFriendScreen"
        component={NavFriendScreen}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
        screenOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FriendFollowersList"
        component={FriendFollowersList}
        options={{
          animationEnabled: false,
          header: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
function Notification() {
  return (
    <Stack.Navigator
      initialRouteName="NavNotificationScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="NavNotificationScreen"
        component={NavNotificationScreen}
      />
    </Stack.Navigator>
  );
}

const Navigation = ({ navigation }) => {
  const sessions = useSelector((state) => state.session);
  var token = sessions.isAutoLogin ? true : false;
  const { notificationTabEvent } = useActions();

  React.useEffect(() => {
    OneSignal.setNotificationOpenedHandler((handler) => onOpened(handler));
  }, []);

  const onOpened = async (openResult) => {
    if (token && sessions.userFname != null) {
      var notification = openResult.notification.additionalData;
      if (notification.activity == "Followers") {
        navigation.navigate("Friend");
      } else if (notification.activity == "Gifting") {
        notificationTabEvent(true);
        setTimeout(() => {
          navigation.navigate("Notification", { isGiftTab: true });
        }, 1000);
      } else if (notification.activity == "Upcoming Moments") {
        notificationTabEvent(false);
        setTimeout(() => {
          navigation.navigate("Notification", { isGiftTab: false });
        }, 1000);
      }
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowOpacity: 0,
          borderColor: COLORS.BottomBarBG,
          backgroundColor: COLORS.BottomBarBG,
          position: "absolute",
          overflow: "hidden",
          left: 0,
          bottom: 0,
          right: 0,
          // padding: 8,
        },
        headerShown: false,
        tabBarLabel: () => {
          return null;
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? imgNavOHome : imgNavHome}
              style={[CommonStyle.bottomBarImg]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? imgNavOMyprofile : imgNavMyprofile}
              style={CommonStyle.bottomBarImg}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? imgNavOCalendar : imgNavCalendar}
              style={CommonStyle.bottomBarImg}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Friend"
        component={Friend}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? imgNavOFriend : imgNavFriend}
              style={CommonStyle.bottomBarImg}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? imgNavONotification : imgNavNotification}
              style={CommonStyle.bottomBarImg}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
