export interface ICard {
  id: string;
  card_number: number;
  collection_id: string;
  duplicates: number;
  user_id?: string;
  owned_id?: string;
}

export interface INotOwnedCard {
  cardNumber: number;
  notOwned: boolean;
}
