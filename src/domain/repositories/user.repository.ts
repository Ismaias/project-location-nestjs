import { User } from "@app/domain";

export interface UserRepository {
  create(userData: Partial<User>): Promise<User>;

  getByEmail(email: string): Promise<User | null>;
}
