export interface IUser {
  name: string;
  email: string;
  player: string;
  address: string;
  nonce: string;
  publicKey: string;
  roleUser: string;
}

export interface RequestWithUser extends Request {
  user: {
    address: string;
    userId: string;
    roleUser: string;
  };
}
