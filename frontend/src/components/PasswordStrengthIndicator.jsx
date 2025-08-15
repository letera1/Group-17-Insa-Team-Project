import { validatePassword, getPasswordStrengthColor, getPasswordStrengthText } from "../lib/utils";

const PasswordStrengthIndicator = ({ password }) => {
  const validation = validatePassword(password);
  const { checks, score } = validation;

  const requirements = [
    { key: "length", label: "At least 8 characters", icon: "📏" },
    { key: "uppercase", label: "One uppercase letter (A-Z)", icon: "🔠" },
    { key: "lowercase", label: "One lowercase letter (a-z)", icon: "🔡" },
    { key: "number", label: "One number (0-9)", icon: "🔢" },
    { key: "special", label: "One special character (!@#$%^&*)", icon: "🔣" },
  ];

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Password Strength:</span>
          <span className={`text-sm font-semibold ${getPasswordStrengthColor(score)}`}>
            {getPasswordStrengthText(score)}
          </span>
        </div>
        <div className="w-full bg-base-300 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              score >= 80 ? "bg-success" : score >= 60 ? "bg-warning" : "bg-error"
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <div className="text-xs opacity-70">Score: {score}%</div>
      </div>

      <div className="space-y-2">
        <span className="text-sm font-medium">Requirements:</span>
        <div className="grid grid-cols-1 gap-2">
          {requirements.map((req) => (
            <div
              key={req.key}
              className={`flex items-center gap-2 text-xs transition-colors duration-200 ${
                checks[req.key] ? "text-success" : "text-base-content/60"
              }`}
            >
              <span className="text-sm">{checks[req.key] ? "✅" : "⭕"}</span>
              <span>{req.icon}</span>
              <span>{req.label}</span>
            </div>
          ))}
        </div>
      </div>

      {score >= 80 && (
        <div className="alert alert-success">
          <span className="text-xs">🎉 Great! Your password meets all security requirements.</span>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
