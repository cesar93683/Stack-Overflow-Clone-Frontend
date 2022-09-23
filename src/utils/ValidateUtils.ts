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
  validateComment(comment: string): string | null {
    if (!comment) {
      return 'Please enter a comment';
    } else if (comment.length < 3) {
      return 'Comment must be at least 3 characters';
    } else if (comment.length > 100) {
      return 'Comment must be no longer than 100 characters';
    }
    return null;
  }
  validateTitle(title: string): string | null {
    if (!title) {
      return 'Please enter a title';
    } else if (title.length < 3) {
      return 'Title must be at least 3 characters';
    } else if (title.length > 200) {
      return 'Title must be no longer than 200 characters';
    }
    return null;
  }
  validateContent(content: string): string | null {
    if (!content) {
      return 'Please enter some content';
    } else if (content.length < 3) {
      return 'Content must be at least 3 characters';
    } else if (content.length > 5000) {
      return 'Content must be no longer than 5000 characters';
    }
    return null;
  }
}
export default new ValidateUtils();
