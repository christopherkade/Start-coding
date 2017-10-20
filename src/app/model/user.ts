/**
 * User model
 * Represents a logged-in user
 * Gets its values when a user logs-in, loses them when he logs-out
 */
export class User {
  uid;
  displayName = 'None';
  email;
  photoURL = 'None';
}
