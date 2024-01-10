return (
  <SafeAreaView style={styles.container}>
    <RefreshComponent onRefresh={handleRefresh}>
      {orders.length === 0 && <EmptyOrders name="Pending" />}
      {showCalendar && <CalendarComp onPress={handleCalendarDay} />}
      <OrdersNumbers length={orders.length} onAcceptAll={handleAcceptAllOrders} />
      <OrderList
        buttons={["Accept", "Decline", "즉시수령", "Schedule"]}
        itemsData={orders}
        buttonPress={handleButtonPress}
      />
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <FlatList
            data={REASONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.reasonButton,
                  {
                    backgroundColor: selectedReasons.includes(item) ? BUTTON_COLORS.secondary : BUTTON_COLORS.primary,
                  },
                ]}
                onPress={() => toggleSelectedReason(item)}
              >
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={handleDecline} style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </RefreshComponent>

    {/* Completed Orders Section */}
    <RefreshComponent onRefresh={handleRefresh}>
      {completedOrders.length === 0 && <EmptyOrders name="Completed" />}
      {/* ... (Completed Orders에 대한 기존 코드) */}
    </RefreshComponent>

    {/* Processing Orders Section */}
    <RefreshComponent onRefresh={handleRefresh}>
      {processingOrders.length === 0 && <EmptyOrders name="Processing" />}
      {/* ... (Processing Orders에 대한 기존 코드) */}
    </RefreshComponent>

    {/* Reservation Orders Section */}
    <RefreshComponent onRefresh={handleRefresh}>
      {reservationOrders.length === 0 && <EmptyOrders name="Reservation" />}
      {/* ... (Reservation Orders에 대한 기존 코드) */}
    </RefreshComponent>

    {/* Admin Orders Section */}
    <RefreshComponent onRefresh={handleRefresh}>
      {adminOrders.length === 0 && <EmptyOrders name="Administrator" />}
      {/* ... (Admin Orders에 대한 기존 코드) */}
    </RefreshComponent>
  </SafeAreaView>
);
};
