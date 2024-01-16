// Refresh.js
import React from "react";
import { FlatList, RefreshControl, TouchableOpacity, Text } from "react-native";

const RefreshComponent = ({ onRefresh, children }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleEmojiPress = () => {
    setRefreshing(true);
    onRefresh && onRefresh();
  };

  return (
    <FlatList
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleEmojiPress} />
      }
      ListHeaderComponent={() => (
        <TouchableOpacity onPress={handleEmojiPress}>
          <Text>🔄</Text>
        </TouchableOpacity>
      )}
      data={[]}
      keyExtractor={() => "dummyKey"}
      renderItem={() => null}
    />
  );
};

export default RefreshComponent;