import { FlatList, Text } from "react-native";

export default function Trending({ data }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Item data={item} />}
      horizontal
    />
  );
}

function Item({ data }) {
  return <Text className="text-gray-100">{data.id}</Text>;
}
