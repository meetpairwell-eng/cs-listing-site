/**
 * Environment Variable Validation Utility
 *
 * Validates that all required environment variables are set
 * and provides helpful error messages during development
 */

const ENV_CONFIG = {
  // Required variables that must be set
  required: [
    'VITE_GOOGLE_MAPS_API_KEY'
  ],
  // Optional variables (will show warnings if missing)
  optional: [
    'VITE_SIMPLYRETS_API_KEY',
    'VITE_SIMPLYRETS_API_SECRET',
    'VITE_AGENT_MLS_ID'
  ]
};

/**
 * Validate environment variables
 * @throws {Error} If required variables are missing
 */
export function validateEnv() {
  const missing = [];
  const warnings = [];

  // Check required variables
  ENV_CONFIG.required.forEach(key => {
    const value = import.meta.env[key];
    if (!value || value === '' || value === 'undefined') {
      missing.push(key);
    }
  });

  // Check optional variables (just warnings)
  ENV_CONFIG.optional.forEach(key => {
    const value = import.meta.env[key];
    if (!value || value === '' || value === 'undefined') {
      warnings.push(key);
    }
  });

  // Handle missing required variables
  if (missing.length > 0) {
    const errorMessage = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  MISSING REQUIRED ENVIRONMENT VARIABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The following required environment variables are not set:
${missing.map(key => `  ❌ ${key}`).join('\n')}

TO FIX THIS:
1. Copy .env.example to .env.local:
   cp .env.example .env.local

2. Edit .env.local and add your API keys

3. Restart the dev server:
   npm run dev

For more information, see .env.example for setup instructions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    console.error(errorMessage);
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Handle optional variable warnings (development only)
  if (warnings.length > 0 && import.meta.env.MODE === 'development') {
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.warn('⚠️  Optional environment variables not set:');
    warnings.forEach(key => {
      console.warn(`  ⚠️  ${key}`);
    });
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  // Success message in development
  if (import.meta.env.MODE === 'development') {
    console.log('✅ Environment variables validated successfully');
  }
}

/**
 * Safely get an environment variable with a descriptive error
 * @param {string} key - Environment variable name
 * @param {string} defaultValue - Optional default value
 * @returns {string} Environment variable value
 */
export function getEnv(key, defaultValue = undefined) {
  const value = import.meta.env[key];

  if (!value && defaultValue === undefined) {
    console.error(`Environment variable ${key} is not set and has no default value`);
    return '';
  }

  return value || defaultValue;
}

/**
 * Check if we're in production mode
 */
export function isProduction() {
  return import.meta.env.MODE === 'production';
}

/**
 * Check if we're in development mode
 */
export function isDevelopment() {
  return import.meta.env.MODE === 'development';
}

export default {
  validateEnv,
  getEnv,
  isProduction,
  isDevelopment
};
