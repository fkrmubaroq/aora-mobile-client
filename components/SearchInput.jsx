import cn from "classnames";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

export default function SearchInput({ value, placeholder, onChangeText, style, onSearch }) {
  return (
    <View className={cn("space-y-2", style)}>
      <View className="w-full h-12 px-4 pb-1 relative rounded-lg border-2 border-black-200 focus:border-secondary bg-black-100">
        <TextInput
          className="flex-1 text-white font-medium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#CDCDE0"
          onChangeText={onChangeText}
        />

        <TouchableOpacity
          onPress={() => onSearch(value)}
          className="absolute right-4 top-3.5"
        >
          <Image source={icons.search} className="w-4 h-4" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
