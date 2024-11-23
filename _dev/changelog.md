# Changelog

## 2024-11-01

- Updated `authController.js` to store generated JWT tokens in the database and revoke them upon logout.
- Updated `authService.js` to handle token storage and revocation.
- Added new functions in `jwtTokenService.js` to create and revoke tokens.
- Updated `JWTUtil.js` to check if a token is revoked.

## 2024-11-02

- Refactored `jwtTokenController.js` to ensure strong SOC and DRY principles.
- Refactored `userController.js` to ensure strong SOC and DRY principles.
- Refactored `JwtToken.js` to ensure strong SOC and DRY principles.
- Refactored `User.js` to ensure strong SOC and DRY principles.
- Refactored `databaseService.js` to ensure strong SOC and DRY principles.
- Refactored `apiRoutes.js` to ensure strong SOC and DRY principles.
- Refactored `authRoutes.js` to ensure strong SOC and DRY principles.
- Refactored `devRoutes.js` to ensure strong SOC and DRY principles.

## 2024-11-03

- Updated `authController.js` to store the generated JWT token in the database using `jwtTokenService.create`.
- Updated `authController.js` to revoke the JWT token in the database using `jwtTokenService.revoke`.
- Updated `authController.js` to verify the JWT token using the `verifyToken` function from `JWTUtil.js`.
- Updated `authService.js` to store the generated JWT token in the database using `jwtTokenService.create`.
- Updated `authService.js` to revoke the JWT token in the database using `jwtTokenService.revoke`.
- Added a new function `create` in `jwtTokenService.js` to store a JWT token in the database.
- Added a new function `revoke` in `jwtTokenService.js` to mark a JWT token as revoked in the database.
- Updated `JWTUtil.js` to check if the token is revoked using `jwtTokenService.isTokenRevoked`.
