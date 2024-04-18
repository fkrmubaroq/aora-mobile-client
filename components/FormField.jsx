import cn from "classnames";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

export default function FormField({
  title,
  value,
  placeholder,
  onChangeText,
  type,
  style
}) {

  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={cn("space-y-2", style)}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-14 px-4 relative rounded-2xl border-2 border-black-200 focus:border-secondary bg-black-100">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={onChangeText}
          secureTextEntry={type === "password" && !showPassword}
        />

        {type === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword((o) => !o)}
            className="absolute right-4 top-4"
          >
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
