import { Image, Text, View } from "react-native";
import { images } from "../constants";
import CustomButton from "./CustomButton";

export default function EmptyState({ title, subtitle }) {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-gray-100 text-sm text-center font-pmedium">
        {subtitle}
      </Text>
      <Text className="text-white font-psemibold text-xl mb-3 mt-2">{title}</Text>
      <CustomButton
        text="Create Video"
        style="w-full "
        onPress={() => router.push("/create")}
      />
    </View>
  );
}