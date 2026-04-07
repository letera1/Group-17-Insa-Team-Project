export const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Password validation utilities
export const validatePassword = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const isValid = Object.values(checks).every(Boolean);
  const strength = Object.values(checks).filter(Boolean).length;

  return {
    isValid,
    strength,
    checks,
    score: Math.round((strength / 5) * 100),
  };
};

export const getPasswordStrengthColor = (score) => {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  if (score >= 40) return "text-error";
  return "text-error";
};

export const getPasswordStrengthText = (score) => {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Good";
  if (score >= 40) return "Weak";
  return "Very Weak";
};
