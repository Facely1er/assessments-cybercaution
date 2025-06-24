export const SUBDOMAIN_URLS = {
  APP: 'https://app.cybercaution.com',
  ASSESS: 'https://assess.cybercaution.com',
  RESOURCES: 'https://resources.cybercaution.com',
  AUTH: 'https://auth.cybercaution.com',
  SECURITY: 'https://security.cybercaution.com'  // NEW: Security Operations Center
};

const SECURITY_CONFIG = {
  MFA_REQUIRED: true,
  SESSION_TIMEOUT: 30, // minutes
  SECURITY_HEADERS: true,
  AUDIT_LOGGING: true
};

const SubdomainLink = ({ to, path = '/', className, children, requireAuth = false }) => (
  <a href={`${SUBDOMAIN_URLS[to]}${path}`} className={className} data-requires-auth={requireAuth}>
    {children}
  </a>
);