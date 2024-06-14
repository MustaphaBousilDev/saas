export interface UserDto {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles?: string[];
}
