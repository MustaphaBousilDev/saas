export class UserWithoutPassword {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string;
  lastLogin: Date;
  hashRefreshToken: string;
  createDate: Date;
  updatedDate: Date;
}

export class Role {
  name: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}

export class UserDOMAIN {
  email: string;
  username: string;
  password: string;
  status: boolean;
}
