export interface AppUser {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface UserFavorite {
  id: string;
  userId: string;
  cardId: string;
  createdAt: string;
}
