// Refresh.js
import React, { useState } from "react";
import { FlatList, RefreshControl, Text } from "react-native";

const RefreshComponent = ({ onRefresh, data, renderItem }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    onRefresh && onRefresh(() => setRefreshing(false)); // onRefresh 콜백 실행 후 refreshing 상태 변경
  };

  return (
    <FlatList
      style={{ flex: 1 }}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      onEndReached={handleRefresh} // 사용자가 스크롤을 아래로 내릴 때 새로 고침 수행
      onEndReachedThreshold={0.1} // 스크롤의 10%가 남았을 때 onEndReached 호출
      ListFooterComponent={() => (
        <Text style={{ textAlign: "center", padding: 10 }}>
          Loading more...
        </Text>
      )}
    />
  );
};

export default RefreshComponent;