export const Endpoints = {
  // Auth
  login: "/auth/login",
  authUser: "/auth/current",
  signup: "/auth/register",

  // My Cards
  getMyCollections: "/my_card_collections",
  getMyCollectionCards: (id: string) => `/my_card_collections/${id}/cards`,
  getMyCollectionMissingCards: (id: string) =>
    `/my_card_collections/${id}/missing_cards`,
  downloadMyCollectionCardsTxt: (id: string) =>
    `/my_card_collections/${id}/download`,

  // Collections
  getCollection: (id: string) => `/card_collections/${id}`,

  // User Cards
  addCard: "/user_cards",
  updateDuplicates: (id: string) => `/user_cards/${id}`,
  deleteCard: (id: string) => `/user_cards/${id}`,
};
