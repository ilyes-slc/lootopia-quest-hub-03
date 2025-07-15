export type UserRole = "JOUEUR" | "ORGANISATEUR" | "ADMINISTRATEUR";

export interface StaticUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export const staticUsers: StaticUser[] = [
  {
    id: 1,
    email: "joueur@example.com",
    password: "joueur123",
    firstName: "Jean",
    lastName: "Joueur",
    role: "JOUEUR"
  },
  {
    id: 2,
    email: "orga@example.com",
    password: "orga123",
    firstName: "Olga",
    lastName: "Organisateur",
    role: "ORGANISATEUR"
  },
  {
    id: 3,
    email: "admin@example.com",
    password: "admin123",
    firstName: "Alice",
    lastName: "Admin",
    role: "ADMINISTRATEUR"
  }
]; 