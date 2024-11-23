# November Tasks -- 0

## Task List

### Refactoring

1. [ ] Make adjustments to the Index.html file to add in SEO and, if needed, [Google Tag Manager](https://tagmanager.google.com/#/home) support.

### Styling

1. [x] Add in the CSS for the new website.
    - **Note:** Currently, the website only includes the `cssImporter` script.

### New Features

1. [ ] Eventually, notes and tasks like this should be created on the server and only visible to the developers. This will allow for a more streamlined process and better organization.

### JWT Implementation

1. [x] Implement token revocation in the `application/server/_controllers/jwtTokenController.js` file.
    - Add a new function `revokeToken` to handle token revocation requests and update the `deleteToken` function to mark tokens as revoked instead of deleting them.
