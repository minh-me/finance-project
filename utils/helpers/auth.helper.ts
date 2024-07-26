export const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/; // Simplified phone number regex
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

export const calculatePasswordStrength = (password: string) => {
  let progress = 0;

  // 1. Use a minimum of 8 characters
  if (password.length >= 8) {
    progress += 25;
  }

  // 2. Use a mix of letters and numbers
  if (/[A-Za-z]/.test(password) && /\d/.test(password)) {
    progress += 25;
  }

  // 3. Use at least one special character
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    progress += 25;
  }

  // 4. Use at least one uppercase and one lowercase character
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
    progress += 25;
  }

  return Math.min(progress, 100);
};

export const verifyAuthKey = (authKey: string) => {
  if (phoneRegex.test(authKey)) {
    return { phone: authKey };
  }

  if (emailRegex.test(authKey)) {
    return { email: authKey };
  }

  return {};
};
