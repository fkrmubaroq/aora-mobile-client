import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { images } from "../../constants";
import { searchPosts } from "../../lib/appwrite";
import { useAppWrite } from "../../lib/useAppWrite";

export default function Home() {
  const { query } = useLocalSearchParams();
  const { data: posts } = useAppWrite(() =>
    searchPosts(query)
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard data={item} />;
        }}
        ListHeaderComponent={() => <Header currentQuery={query} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
}

function Header({ currentQuery }) {
  const [query, setQuery] = useState(currentQuery || "");
  const pathname = usePathname();
  const onSearch = (value) => {
    if (!query) return;
    if (pathname.startsWith("/search")) {
      setQuery(value);
      return;
    }
    router.push(`/search/${value}`);
  };
  return (
    <View className="my-6 px-4 space-y-6">
      <Title currentQuery={currentQuery} />
      <View>
        <SearchInput
          placeholder="Search for a video topic"
          value={query}
          onChangeText={setQuery}
          onSearch={onSearch}
        />
      </View>
    </View>
  );
}

function Title({ currentQuery }) {
  return (
    <View className="flex-row justify-between items-center mb-2">
      <View>
        <Text className="text-gray-100 font-pmedium text-sm">
          Search Results
        </Text>
        <Text className="text-white text-2xl font-psemibold">
          {currentQuery}
        </Text>
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
