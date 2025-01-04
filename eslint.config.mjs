module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    // Disable 'no-console' rule globally (allowing console logs for debugging)
    'no-console': 'off',

    // Disable 'no-unused-vars' rule globally (ignoring unused variable warnings)
    '@typescript-eslint/no-unused-vars': 'off', // Disable unused variable warnings

    // Disable 'react-hooks/exhaustive-deps' rule for hooks
    'react-hooks/exhaustive-deps': 'off',

    // Disable any other rules based on your needs
    'react/jsx-no-undef': 'off', // Disable JSX undefined elements warning
  },
};
