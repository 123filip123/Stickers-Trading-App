export interface ICard {
  _id: string;
  card_number: number;
  collection_id: string;
  duplicates: number;
  user_id: string;
  owned: boolean;
}
