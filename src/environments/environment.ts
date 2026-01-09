export const environment = {
  production: true,
  apiUrl: "", // Will be dynamically set based on tenant subdomain
  apiPort: "", // No port in production (uses default 80/443)
  defaultTenant: null // No default tenant in production
};
