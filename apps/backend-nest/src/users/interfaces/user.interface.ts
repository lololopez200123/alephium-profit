export interface IUser {
  name: string;
  email: string;
  address: string;
  nonce: string;
  publicKey: string;
  roleUser: string;
  isAnsSeted?: boolean;
}

export interface RequestWithUser extends Request {
  user: {
    _id: string;
    address: string;
    userId: string;
    roleUser: string;
  };
}
