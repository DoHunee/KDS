// Refresh.js
import React from "react";
import { FlatList, RefreshControl } from "react-native";

const RefreshComponent = ({ onRefresh, children }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const refreshingOffset = 0;

    if (currentOffset <= refreshingOffset) {
      if (!refreshing) {
        setRefreshing(true);
        onRefresh && onRefresh();
      }
    } else {
      setRefreshing(false);
    }
  };

  return (
    <FlatList
      style={{ flex: 1 }}
      onScroll={onScroll}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={() => <>{children}</>}
      data={[]}
      keyExtractor={() => "dummyKey"}
      renderItem={() => null}
    />
  );
};

export default RefreshComponent;