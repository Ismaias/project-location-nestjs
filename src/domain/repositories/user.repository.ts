import { User } from "@app/domain";

export interface UserRepository {
  create(userData: Partial<User>): Promise<User>;

  login(email: string, password: string): Promise<User | null>;
}
