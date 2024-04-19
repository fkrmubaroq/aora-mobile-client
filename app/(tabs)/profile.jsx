import cn from "classnames";
import { router } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useAppWrite } from "../../lib/useAppWrite";

export default function Profile() {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppWrite(() => getUserPosts(user.$id));
  const onSignOut = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false)
    router.push("/sign-in");
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard data={item} />;
        }}
        ListHeaderComponent={() => (
          <ProfileInfo user={user} onSignOut={onSignOut} />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
}

function ProfileInfo({ user, onSignOut }) {
  return (
    <View className="mb-10">
      <View className="w-full items-end px-4 pt-3">
        <TouchableOpacity onPress={onSignOut}>
          <Image source={icons.logout} className="w-6 h-6" />
        </TouchableOpacity>
      </View>

      <View className="mx-auto mt-6 w-16 h-16 justify-center items-center border rounded-lg border-secondary">
        <Image
          className="w-[95%] h-[95%]  rounded-lg"
          source={{ uri: user?.avatar || "" }}
          resizeMode="contain"
        />
      </View>

      <View className="flex-row justify-center items-center mt-8">
        <InfoBox title="3" subtitle="Posts" style="mr-10" />
        <InfoBox title="1.2k" subtitle="Followers" />
      </View>
    </View>
  );
}

function InfoBox({ title, subtitle, style }) {
  return (
    <View className={cn("gap-y-1. items-center justify-center", style)}>
      <Text className="text-xl text-white font-psemibold">{title}</Text>
      <Text className="text-gray-100 font-pregular">{subtitle}</Text>
    </View>
  );
}
