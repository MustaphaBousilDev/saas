export class UserWithoutPassword {
  // id: number;
  // username: string;
  // createDate: Date;
  // updatedDate: Date;
  // lastLogin: Date;
  // hashRefreshToken: string;
  email: string;
  username: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
  username: string;
  id: number;
  createDate: Date;
  updatedDate: Date;
  lastLogin: any;
  hashRefreshToken: string;
}
