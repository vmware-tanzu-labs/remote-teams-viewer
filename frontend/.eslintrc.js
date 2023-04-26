module.exports = {
  extends: ["prettier", "react-app", "react-app/jest", "plugin:prettier/recommended"],
  plugins: ["prettier", "testing-library", "jest-dom"],
  rules: {
    "prettier/prettier": "error",
    "testing-library/no-unnecessary-act": "off",
  },
};