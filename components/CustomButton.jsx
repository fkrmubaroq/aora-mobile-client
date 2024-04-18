import cn from "classnames";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function CustomButton({ isLoading, onPress, text, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        "bg-secondary p-3 rounded-xl justify-center items-center",
        {
          "opacity-50": isLoading,
        },
        style
      )}
      disabled={isLoading}
    >
      {isLoading ? <ActivityIndicator /> :
        <Text className="text-white font-psemibold text-base">{text}</Text>
      }
    </TouchableOpacity>
  );
}