import { router, usePathname } from "expo-router";
import { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { useAppWrite } from "../../lib/useAppWrite";

export default function Home() {
  const { data: posts, refetch: refetchAllPosts } = useAppWrite(getAllPosts);
  const { data: trending, refetch: refetchLatest } = useAppWrite(getLatestPosts);
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    await refetchAllPosts();

    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard data={item} />;
        }}
        ListHeaderComponent={() => <Header data={trending} />}
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

function Header({ data }) {

  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const onSearch = (value) => {
    if (!query) return;
    if (pathname.startsWith("/search")) {
      setQuery(value);
      return;
    }
    router.push(`/search/${value}`);
    
  }
  return (
    <View className="my-6 px-4 space-y-6">
      <Title />
      <View>
        <SearchInput
          placeholder="Search for a video topic"
          value={query}
          onChangeText={setQuery}
          onSearch={onSearch}
        />
      </View>

      <LatestVideos data={data} />
    </View>
  );
}

function Title() {
  const { user } = useGlobalContext();

  return (
    <View className="flex-row justify-between items-center mb-6">
      <View>
        <Text className="text-gray-100 font-pmedium text-sm">Welcome Back</Text>
        <Text className="text-white text-2xl font-psemibold">{user?.username || ""}</Text>
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

function LatestVideos({ data }) {
  return (
    <View className="pt-5 pb-8">
      <Text className="text-gray-100  font-pregular mb-3">Latest Videos</Text>
      <Trending data={data} />
    </View>
  );
}
