orderList = 
  {
    "responses": {
      "ActiveYN": "Y",
      "CancleCode": null,
      "CancleDate": null,
      "CancleUser": null,
      "Details": [
        [Object
        ]
      ],
      "InsertDate": [
        -1,
        [ArrayBuffer
        ]
      ],
      "InsertUser": "msystem",
      "OrderKey": 37,
      "ProcessCode": "pending",
      "SDDate": "2024-02-23",
      "SDTime": "21:00:06",
      "STCode": "0093",
      "STName": "맘스터치(DP)",
      "STSeq": 36,
      "TotalPrice": 3000,
      "TotalQuantity": 1,
      "UserHp": "010-7923-1077",
      "UserKey": 2,
      "UserName": "조준호"
    },
    "type": "create-order"
  }

  const safeOrderList = orderList || [];
  // storeSlice.dispatch(handlePending(orderList)); // 이런식으로 정의해야 주문목록 들어올때마다 리렌더링
  console.log(safeOrderList);
