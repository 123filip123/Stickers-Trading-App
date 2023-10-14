export const Endpoints = {
  // Auth
  login: "/auth/login",

  // My Cards
  getMyCollections: "/my_card_collections",
  getMyCollectionCards: (id: string) => `/my_card_collections/${id}/cards`,
  getMyCollectionMissingCards: (id: string) =>
    `/my_card_collections/${id}/missing_cards`,

  // User Cards
  addCard: "/user_cards",
  updateDuplicates: (id: string) => `/user_cards/${id}`,
  deleteCard: (id: string) => `/user_cards/${id}`,
};
