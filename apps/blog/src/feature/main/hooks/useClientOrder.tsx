"use client";

import setClientSearchParams from "@/utils/searchParam/setClientSearchParams";
import { useCallback, useState } from "react";
import { parseOrder } from "../../post/utils/parseOrder";
import {
  ORDER_QUERY_KEY,
  type Order,
  type OrderValue,
} from "@/feature/post/constants";

export default function useClientOrder(initialOrderValue: OrderValue) {
  const [orderState, setOrderState] = useState(parseOrder(initialOrderValue));
  const setSelectedOrder = useCallback((order: Order) => {
    setOrderState(order);
    return setClientSearchParams(ORDER_QUERY_KEY, order.value);
  }, []);

  return {
    orderState,
    setSelectedOrder,
  };
}
