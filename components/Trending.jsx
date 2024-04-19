import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};
export default function Trending({ data }) {
  const [activeItem, setActiveItem] = useState(data[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    console.log("viewableItems ", viewableItems);
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <Item activeItem={activeItem} data={item} />}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 150 }}
    />
  );
}

function Item({ data, activeItem }) {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-3"
      animation={activeItem === data.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: data.video }}
          className="w-52 h-72 rounded-xl bg-white/10 mt-5 "
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: data.thumbnail }}
            className="w-52 h-72 rounded-xl my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
}
