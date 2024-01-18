// Refresh.js
import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl, Text } from "react-native";

const RefreshComponent = ({ onRefresh, data, renderItem }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    onRefresh && onRefresh(() => setRefreshing(false)); // Change refreshing state after executing onRefresh callback
  };

  useEffect(() => {
    // 1분마다 handleRefresh 함수 호출
    const intervalId = setInterval(() => {
      handleRefresh();
    }, 60000); // 1분은 60000 밀리초

    // 컴포넌트가 언마운트되면 interval 해제
    return () => clearInterval(intervalId);
  }, []);

  return (
    <FlatList
      style={{ flex: 1 }}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      onEndReached={handleRefresh} // Perform refresh when user scrolls down
      onEndReachedThreshold={0.1} // call onEndReached when 10% of scrolling remains
      ListFooterComponent={() => (
        <Text style={{ textAlign: "center", padding: 10 }}>
          Loading more...
        </Text>
      )}
    />
  );
};

export default RefreshComponent;