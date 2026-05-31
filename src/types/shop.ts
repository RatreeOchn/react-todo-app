export interface Store {
  id: string;
  name: string;
  icon: string;
}

export interface ShopItem {
  id: string;
  name: string;
  qty?: string;
  store: string | null;
  done: boolean;
}

export type NewShopInput = Omit<ShopItem, 'id' | 'done'>;
export type UpdateShopInput = Partial<Omit<ShopItem, 'id'>>;
