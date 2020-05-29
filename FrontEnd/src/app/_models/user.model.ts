export class User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePicture: any;

  constructor({
    _id,
    username,
    password,
    firstName,
    lastName,
    profilePicture
  }: {
    _id?: string,
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePicture?: any;
  }) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePicture = profilePicture;
  }
}
