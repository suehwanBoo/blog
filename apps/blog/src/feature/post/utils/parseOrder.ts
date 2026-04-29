import { ORDERS, type Order } from "../constants";

export function parseOrder(query: string | null): Order {
  return ORDERS.find(({ value }) => value === query) ?? ORDERS[0];
}

export function parseOrderValue(query: string | null): Order["value"] {
  return ORDERS.find(({ value }) => value === query)?.value ?? ORDERS[0].value;
}

export function isValidOrderValue(query: string) {
  return !!ORDERS.find(({ value }) => value === query);
}
