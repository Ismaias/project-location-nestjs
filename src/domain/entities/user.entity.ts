export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity implements User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}
