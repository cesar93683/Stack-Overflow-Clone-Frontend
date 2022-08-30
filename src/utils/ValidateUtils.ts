class ValidateUtils {
  validateUsername(username: string): string | null {
    if (!username) {
      return 'Please enter a username';
    } else if (username.length < 3) {
      return 'Username must be at least 3 characters';
    } else if (username.length > 20) {
      return 'Username must be no longer than 20 characters';
    }
    return null;
  }
  validateEmail(email: string): string | null {
    if (!email) {
      return 'Please enter an email';
    } else if (email.length < 3) {
      return 'Email must be at least 3 characters';
    } else if (email.length > 320) {
      return 'Email must be no longer than 320 characters';
    }
    return null;
  }
  validatePassword(password: string): string | null {
    if (!password) {
      return 'Please enter a password';
    } else if (password.length < 6) {
      return 'Password must be at least 6 characters';
    } else if (password.length > 40) {
      return 'Password must be no longer than 40 characters';
    }
    return null;
  }
}
export default new ValidateUtils();
