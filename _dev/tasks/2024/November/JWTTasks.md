# JSON Web Token (JWT) Tasks

## Tasks

- [x] **Task 1:** Set up environment variables for JWT secret key.
  - Ensure the JWT secret key is stored securely in an environment variable. This is done in `application/server/utils/JWTUtil.js`.

- [x] **Task 2:** Create a function to generate JWT tokens.
  - Implement a function to generate JWT tokens with a specified payload and expiration time. This is done in `application/server/utils/JWTUtil.js` with the `generateToken` function.

- [x] **Task 3:** Create a function to verify JWT tokens.
  - Implement a function to verify the validity of JWT tokens. This is done in `application/server/utils/JWTUtil.js` with the `verifyToken` function.

- [x] **Task 4:** Create a function to extract user role from JWT tokens.
  - Implement a function to extract the user role from a JWT token. This is done in `application/server/utils/JWTUtil.js` with the `extractRoleFromToken` function.

- [x] **Task 5:** Create a function to extract user ID from JWT tokens.
  - Implement a function to extract the user ID from a JWT token. This is done in `application/server/utils/JWTUtil.js` with the `extractUserIdFromToken` function.

- [x] **Task 6:** Implement user authentication with JWT.
  - Implement user login to generate and return a JWT token upon successful authentication. This is done in `application/server/_controllers/userController.js` with the `login` function.

- [x] **Task 7:** Store JWT tokens in the database.
  - Implement functionality to store generated JWT tokens in the database. This is done in `application/server/models/JwtToken.js` and `application/server/services/jwtTokenService.js`.

- [x] **Task 8:** Implement middleware to verify JWT tokens for protected routes.
  - Implement middleware to verify JWT tokens and restrict access to protected routes. This is done in `application/server/app.js`.

- [x] **Task 9:** Implement role-based access control (RBAC).
  - Implement RBAC to restrict access to specific resources based on user roles. This is done in `application/server/routes/devRoutes.js` with the `authenticateAdmin` function.

- [x] **Task 10:** Implement token revocation.
  - Implement functionality to revoke JWT tokens by maintaining a list of active tokens in the database and invalidating old tokens.
  - **Update:** Added a new function `revokeToken` to handle token revocation requests and updated the `deleteToken` function to mark tokens as revoked instead of deleting them in `application/server/controllers/jwtTokenController.js`.

- [ ] **Task 11:** Set up HTTPS for secure data transmission.
  - Ensure that data transmitted between the client and server is encrypted using HTTPS to prevent token exposure to potential attackers.

- [ ] **Task 12:** Regularly rotate secret keys and invalidate old tokens.
  - Implement a mechanism to regularly rotate JWT secret keys and invalidate old tokens to enhance security.

- [ ] **Task 13:** Store tokens securely on the client side.
  - Store JWT tokens securely on the client side, preferably in HTTP-only cookies to prevent access by JavaScript and reduce the risk of XSS attacks.

- [ ] **Task 14:** Implement token revocation in the `application/server/controllers/jwtTokenController.js` file.
  - Add a new function `revokeToken` to handle token revocation requests and update the `deleteToken` function to mark tokens as revoked instead of deleting them.

## Security Considerations

To implement secure JWT token handling in Node.js, follow these best practices:

- Use a strong secret key for signing tokens. Ensure the key is stored securely and not hard-coded in the source code. Use environment variables to manage the secret key, as seen in `application/server/config/db.js`.
- Set an appropriate expiration time for tokens to limit their validity period. This can be done using the `expiresIn` option when generating tokens, as shown in `application/server/utils/JWTUtil.js`.
- Validate tokens on every request to ensure they are still valid and have not been tampered with. This can be done using the `verifyToken` function in `application/server/utils/JWTUtil.js`.
- Store tokens securely on the client side, preferably in HTTP-only cookies to prevent access by JavaScript and reduce the risk of XSS attacks.
- Implement token revocation by maintaining a list of active tokens in the database, as demonstrated in `application/server/models/JwtToken.js` and `application/server/services/jwtTokenService.js`.
- Use HTTPS to encrypt data transmitted between the client and server, ensuring that tokens are not exposed to potential attackers during transmission.
- Regularly rotate secret keys and invalidate old tokens to enhance security.
- Implement role-based access control (RBAC) to restrict access to specific resources based on user roles, as seen in the `extractRoleFromToken` function in `application/server/utils/JWTUtil.js` and its usage in `application/server/routes/devRoutes.js`.

## Changelog

- **2024-11-01:** Updated `authController.js` to store generated JWT tokens in the database and revoke them upon logout. Updated `authService.js` to handle token storage and revocation. Added new functions in `jwtTokenService.js` to create and revoke tokens. Updated `JWTUtil.js` to check if a token is revoked.
- **2024-11-02:** Refactored `jwtTokenController.js` to ensure strong SOC and DRY principles. Refactored `userController.js` to ensure strong SOC and DRY principles. Refactored `JwtToken.js` to ensure strong SOC and DRY principles. Refactored `User.js` to ensure strong SOC and DRY principles. Refactored `databaseService.js` to ensure strong SOC and DRY principles. Refactored `apiRoutes.js` to ensure strong SOC and DRY principles. Refactored `authRoutes.js` to ensure strong SOC and DRY principles. Refactored `devRoutes.js` to ensure strong SOC and DRY principles.
