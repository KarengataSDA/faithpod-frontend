export const environment = {
  production: true,
  apiUrl: "", // Dynamically set based on tenant subdomain
  apiPort: "", // No port in production (uses default 80/443)
  defaultTenant: null // No default tenant in production
};
