export const Endpoints = {
  // Auth
  login: "/auth/login",
  authUser: "/auth/current",
  signup: "/auth/register",
  changePassword: "/auth/change_password",
  forgotPassword: "/auth/forgot_password",
  checkResetCode: "/auth/check_reset_code",
  resetPassword: "/auth/reset_password",

  // My Cards
  getMyCollections: "/card_collections",
  getMyCollectionCards: (id: string) => `/card_collections/${id}`,
  deleteMyCollection: (id: string) => `/card_collections/${id}`,
  getMyCollectionMissingCards: (id: string) =>
    `/my_card_collections/${id}/missing_cards`,
  downloadMyCollectionCardsTxt: (id: string) =>
    `/card_collections/${id}/download`,

  // Collections
  getCollection: (id: string) => `/card_collections/${id}`,
  postCollection: `/card_collections`,

  // User Cards
  addCard: "/user_cards",
  updateCard: (id: string) => `/cards/${id}`,
  deleteCard: (id: string) => `/user_cards/${id}`,
};
