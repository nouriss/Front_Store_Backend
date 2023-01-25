export interface OrderType {
  user_id: number;
  status: string;
}
export interface OrderReturnType {
  id: number;
  user_id: number;
  status: string;
}

export interface OrderProductType {
  id: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
}

// export interface OrderProductListReqType {
//     id: number;
//     user_id: number;
//     status: string;
// }

export type OrderProductListType = {
  id: number;
  product_id: number[];
  quantity: number[];
  user_id: number;
  status: string;
};
