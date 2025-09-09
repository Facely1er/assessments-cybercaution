# Cybersecurity Platform

A comprehensive application security platform built with Node.js, Express, and MongoDB that implements NIST Cybersecurity Framework 2.0, CISA Cross-Sector Cybersecurity Performance Goals, and other industry standards.

## 🚀 Features

### ✅ Implemented Features

#### Identity and Access Management
- Multi-Factor Authentication (MFA) with TOTP
- Role-Based Access Control (RBAC)
- User management and provisioning
- Session management
- Password policies and reset functionality
- Account lockout protection

#### Data Protection
- Data encryption at rest and in transit
- Backup and recovery systems
- Data Loss Prevention (DLP) rules
- Data classification and handling
- Access logging and audit trails
- Data sharing and permissions

#### Application Security
- Input validation and sanitization
- Security headers implementation
- Rate limiting and throttling
- API security controls
- XSS and injection protection
- CORS configuration

#### Compliance Management
- NIST Cybersecurity Framework assessments
- CISA Cross-Sector Cybersecurity Performance Goals
- Policy management and tracking
- Compliance reporting
- Risk assessment workflows
- Control implementation tracking

#### Incident Response
- Incident creation and management
- Response workflow automation
- Communication templates
- Evidence collection
- Timeline tracking
- Resolution management

#### Security Training
- Interactive training modules
- Progress tracking
- Assessment and scoring
- Compliance training
- Awareness campaigns

### 🚫 Platform Limitations

The following features are **NOT** implemented as they fall outside the application security platform scope:

- Network-Level Controls: Segmentation, firewalls, network monitoring
- Infrastructure-Level Controls: Server hardening, OS security, physical security
- Hardware-Level Controls: EDR, HSM, TPM, hardware encryption
- Enterprise-Level Controls: AD integration, SIEM integration, enterprise email
- Third-Party System Controls: Email security, DNS security, enterprise WAF

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs, speakeasy (MFA)
- **Security**: Helmet, express-rate-limit, express-validator
- **Logging**: Winston
- **Validation**: Joi

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- MongoDB 4.4 or higher
- npm or yarn

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cybersecurity-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/cybersecurity_platform
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   SESSION_SECRET=your-session-secret-key-here
   ENCRYPTION_KEY=your-32-character-encryption-key-here
   ```

4. **Start MongoDB**
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/setup-mfa` - Setup MFA
- `POST /api/auth/verify-mfa` - Verify MFA setup
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user

### User Management Endpoints

- `GET /api/users` - Get all users (admin/security officer)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `PATCH /api/users/:id/role` - Update user role (admin)
- `PATCH /api/users/:id/status` - Activate/deactivate user (admin)
- `POST /api/users/:id/reset-password` - Reset user password (admin)
- `POST /api/users/:id/unlock` - Unlock user account (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Data Protection Endpoints

- `POST /api/data-protection/encrypt` - Encrypt and store data
- `GET /api/data-protection/:dataId` - Decrypt and retrieve data
- `GET /api/data-protection` - List user's data
- `POST /api/data-protection/:dataId/backup` - Create data backup
- `POST /api/data-protection/:dataId/share` - Share data with user
- `DELETE /api/data-protection/:dataId/share/:targetUserId` - Revoke data sharing
- `DELETE /api/data-protection/:dataId` - Delete data (soft delete)

### DLP Rules Management

- `GET /api/data-protection/dlp/rules` - Get DLP rules
- `POST /api/data-protection/dlp/rules` - Create DLP rule
- `POST /api/data-protection/dlp/rules/:ruleId/test` - Test DLP rule

### Compliance Management Endpoints

- `GET /api/compliance/assessments` - Get compliance assessments
- `POST /api/compliance/assessments` - Create assessment
- `GET /api/compliance/assessments/:id` - Get specific assessment
- `PUT /api/compliance/assessments/:id` - Update assessment
- `POST /api/compliance/assessments/:id/controls` - Add control
- `PATCH /api/compliance/assessments/:id/controls/:controlId` - Update control status
- `POST /api/compliance/assessments/:id/findings` - Add finding
- `PATCH /api/compliance/assessments/:id/findings/:findingId` - Update finding status
- `POST /api/compliance/assessments/:id/report` - Generate assessment report

### Incident Response Endpoints

- `GET /api/incidents` - Get all incidents
- `POST /api/incidents` - Create incident
- `GET /api/incidents/:id` - Get specific incident
- `PUT /api/incidents/:id` - Update incident
- `POST /api/incidents/:id/assign` - Assign incident
- `POST /api/incidents/:id/timeline` - Add timeline entry
- `POST /api/incidents/:id/evidence` - Add evidence
- `POST /api/incidents/:id/containment` - Implement containment
- `POST /api/incidents/:id/resolve` - Resolve incident

### Security Controls Endpoints

- `GET /api/security/headers` - Get security headers
- `PUT /api/security/headers` - Update security headers
- `GET /api/security/rate-limits` - Get rate limiting config
- `PUT /api/security/rate-limits` - Update rate limiting
- `POST /api/security/scan` - Execute security scan
- `GET /api/security/events` - Get security events
- `GET /api/security/dashboard` - Get security dashboard
- `GET /api/security/recommendations` - Get security recommendations
- `GET /api/security/policies` - Get security policies
- `GET /api/security/metrics` - Get security metrics

### Training Endpoints

- `GET /api/training/modules` - Get training modules
- `GET /api/training/modules/:id` - Get specific module
- `POST /api/training/modules/:id/start` - Start training module
- `PUT /api/training/modules/:id/progress` - Update progress
- `POST /api/training/modules/:id/complete` - Complete module
- `GET /api/training/progress` - Get user progress
- `GET /api/training/dashboard` - Get training dashboard

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Multi-factor authentication (TOTP)
- Role-based access control
- Session management
- Password policies

### Data Protection
- AES-256-GCM encryption
- Data classification
- Access logging
- Backup and recovery
- DLP rules engine

### Application Security
- Input validation and sanitization
- Security headers (CSP, HSTS, etc.)
- Rate limiting
- CORS protection
- XSS and injection prevention

### Compliance
- NIST Cybersecurity Framework 2.0
- CISA Cross-Sector Cybersecurity Performance Goals
- Audit logging
- Policy management
- Risk assessment

## 🧪 Testing

```bash
# Run tests
npm test

# Run security audit
npm run security-audit

# Run linting
npm run lint
```

## 📊 Monitoring & Logging

The platform includes comprehensive logging and monitoring:

- **Security Events**: Authentication failures, unauthorized access attempts
- **Audit Logs**: User actions, data access, configuration changes
- **Compliance Events**: Assessment activities, policy changes
- **Incident Logs**: Incident creation, updates, resolution

## 🚀 Deployment

### Environment Variables

Ensure all required environment variables are set:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/cybersecurity_platform

# JWT
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Security
ENCRYPTION_KEY=your-32-character-encryption-key-here
SESSION_SECRET=your-session-secret-key-here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Production Considerations

1. **Database Security**: Use MongoDB authentication and encryption
2. **Network Security**: Deploy behind a reverse proxy (nginx)
3. **SSL/TLS**: Use HTTPS in production
4. **Monitoring**: Implement application monitoring
5. **Backup**: Regular database backups
6. **Updates**: Keep dependencies updated

## 📈 Roadmap

- [ ] Frontend dashboard implementation
- [ ] Advanced reporting and analytics
- [ ] Integration with external security tools
- [ ] Mobile application
- [ ] Advanced threat detection
- [ ] Automated compliance reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔗 Related Standards

- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [CISA Cross-Sector Cybersecurity Performance Goals](https://www.cisa.gov/cross-sector-cybersecurity-performance-goals)
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- [CISA #StopRansomware Guide](https://www.cisa.gov/stopransomware)