import { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import { images } from "../../constants";
import { getAllPosts } from "../../lib/appwrite";
import { useAppWrite } from "../../lib/useAppWrite";

export default function Home() {
  const { data, refetch } = useAppWrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          console.log("item ", item);
          return <VideoCard data={item} />;
        }}
        ListHeaderComponent={Header}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View className="my-6 px-4 space-y-6">
      <Title />
      <View>
        <SearchInput placeholder="Search for a video topic" />
      </View>

      <LatestVideos />
    </View>
  );
}

function Title() {
  return (
    <View className="flex-row justify-between items-center mb-6">
      <View>
        <Text className="text-gray-100 font-pmedium text-sm">Welcome Back</Text>
        <Text className="text-white text-2xl font-psemibold">JsMastery</Text>
      </View>
      <View>
        <Image
          source={images.logoSmall}
          className="w-9 h-10"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

function LatestVideos() {
  return (
    <View className="pt-5 pb-8">
      <Text className="text-gray-100  font-pregular mb-3">Latest Videos</Text>
      <Trending data={[]} />
    </View>
  );
}
