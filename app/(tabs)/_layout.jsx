import cn from "classnames";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return <View className="justify-center items-center gap-2">
    <Image
      source={icon}
      resizeMode="contain"  
      tintColor={color}
      className="w-6 h-6"
    />
    <Text className={cn("text-xs pl-1 ", {
      "font-semibold ": focused,
      "font-pregular": !focused,
    })}
    style={{ color }}
    >
      {name}
    </Text>
  </View>
}

export default function TabsLayout() {
  return <Tabs screenOptions={{
    tabBarShowLabel: false,
    tabBarActiveTintColor: "#FFA001",
    tabBarInactiveTintColor: "#CDCDE0",
    tabBarStyle: {
      backgroundColor: "#161622",
      borderTopWidth: 1,
      borderTopColor: "#232533",
      height:84
    }
  }}>
    <Tabs.Screen name="home" options={{
      headerShown: false,
      tabBarIcon: ({ color, focused }) => <TabIcon
        icon={icons.home}
        color={color}
        name="Home"
        focused={focused}
      />
    }} />
    <Tabs.Screen name="bookmark" options={{
      headerShown: false,
      tabBarIcon: ({ color, focused }) => <TabIcon
        icon={icons.bookmark}
        color={color}
        name="Bookmark"
        focused={focused}
      />
    }} />
    <Tabs.Screen name="create" options={{
      headerShown: false,
      tabBarIcon: ({ color, focused }) => <TabIcon
        icon={icons.plus}
        color={color}
        name="Create"
        focused={focused}
      />
    }} />
    <Tabs.Screen name="profile" options={{
      headerShown: false,
      tabBarIcon: ({ color, focused }) => <TabIcon
        icon={icons.profile}
        color={color}
        name="Profile"
        focused={focused}
      />
    }} />
  </Tabs>
}