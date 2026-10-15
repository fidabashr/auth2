export const validateUsername = (username) => {
  if (!username.trim()) return "Username is required";

  if (username.trim().length < 3 || username.trim().length > 20) {
    return "Username must be 3–20 characters";
  }

  return "";
};

export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Enter a valid email address";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";

  if (password.length < 6) {
    return "Password must contain at least 6 characters";
  }

  return "";
};

export const validateFullName = (fullName) => {
  if (!fullName.trim()) return "Full name is required";

  if (fullName.trim().length < 2) {
    return "Full name must contain at least 2 characters";
  }

  return "";
};