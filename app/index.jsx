import { Redirect, router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLogged } = useGlobalContext();
  if (!isLoading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center items-center px-3 min-h-[85vh]">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[300px] h-[300px]"
            resizeMode="contain"
          />
          <View className="relative">
            <Text className="text-white text-3xl font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] absolute h-[15px] -bottom-2.5 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-6 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            onPress={() => router.push("/sign-in")}
            style="mt-5 w-full"
            text="Continue With Email"
          />
        </View>
      </ScrollView>
     
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
