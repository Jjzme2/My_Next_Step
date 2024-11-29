# My Next Step

My Next Step is a web application designed to help users manage their tasks and goals efficiently. The application follows the MVC (Model-View-Controller) architecture and adheres to the principles of SOC (Separation of Concerns) and DRY (Don't Repeat Yourself).

## Installation

To install and run the application locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Jjzme2/My_Next_Step.git
   cd My_Next_Step
   ```

2. Install server dependencies:
   ```sh
   cd application/server
   npm install
   ```

3. Install client dependencies:
   ```sh
   cd ../client
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `application/server` directory and add the following variables:
     ```
     JWT_SECRET_KEY=your_secret_key
     NODE_ENV=development
     ```

5. Start the server:
   ```sh
   cd ../server
   npm run dev
   ```

6. Start the client:
   ```sh
   cd ../client
   npm run dev
   ```

## Usage

Once the application is running, you can access it in your web browser at `http://localhost:3000`. The following features are available:

- User registration and login
- Task management (create, read, update, delete tasks)
- Role-based access control
- JWT-based authentication
- Note management (create, read, update, delete notes)
- Resource management

## SendGrid Integration Guide

### Overview

SendGrid is a cloud-based email delivery service that allows you to send emails without managing your own email servers. It’s ideal for sending transactional emails like account confirmations, password resets, and notifications.

### Steps to Integrate SendGrid with Node.js

1. Sign Up for a SendGrid Account

   - Visit SendGrid’s Website and sign up for a free account.
   - Verify your email address and complete the setup process.

2. Create an API Key

   - Log in to your SendGrid dashboard.
   - Navigate to Settings > API Keys.
   - Click Create API Key.
   - Name your API key (e.g., “MyApp API Key”).
   - Select Full Access or customize permissions as needed.
   - Click Create & View and copy your API key.

3. Install SendGrid’s Node.js Library

   In your project directory, run:

   ```sh
   npm install @sendgrid/mail
   ```

4. Set Up Environment Variables

   - Security Best Practice: Never hard-code your API key.
   - Create a .env file in your project’s root directory and add:

   ```sh
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   ```

   - Ensure .env is added to your .gitignore file.

5. Load Environment Variables

   Install the dotenv package:

   ```sh
   npm install dotenv
   ```

   At the top of your main application file (e.g., app.js), add:

   ```js
   require('dotenv').config();
   ```

6. Configure SendGrid in Your Application

   ```js
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   ```

7. Verify Sender Identity

   Before you can send emails, you need to verify your sender identity.
   - In the SendGrid dashboard, navigate to Settings > Sender Authentication.
   - Choose Single Sender Verification.
   - Fill out the required information and verify your sender email address.

8. Create Email Templates

   You can create dynamic templates in SendGrid for consistent and professional emails.
   - Go to Email API > Dynamic Templates in the SendGrid dashboard.
   - Click Create a Dynamic Template.
   - Design your template using the editor.
   - Use placeholders for dynamic content (e.g., {{username}}).

9. Send an Email

   Create a function to send emails:

   ```js
   function sendEmail(to, templateId, dynamicData) {
     const msg = {
       to,
       from: 'your_verified_sender_email@example.com', // Your verified sender
       templateId: templateId,
       dynamicTemplateData: dynamicData,
     };

     sgMail
       .send(msg)
       .then(() => {
         console.log('Email sent successfully.');
       })
       .catch((error) => {
         console.error('Error sending email:', error);
       });
   }
   ```

   Example Usage:

   ```js
   sendEmail(
     'recipient@example.com',
     'your_template_id',
     {
       username: 'John Doe',
       resetLink: 'https://yourapp.com/reset-password?token=abc123',
     }
   );
   ```

10. Integrate Email Functionality

   - Account Confirmation:
     - Send a confirmation email upon user registration.
   - Password Reset:
     - Send a password reset link when requested.
   - Notifications:
     - Optionally, send emails for comments, likes, or other activities.

11. Handle Errors and Bounces

   - Implement error handling in your email sending function.
   - Monitor your SendGrid dashboard for delivery statistics.
   - Set up webhook endpoints if you need to handle events like bounces or spam reports.

12. Compliance with Email Regulations

   - Unsubscribe Links:
     - For marketing emails, include an unsubscribe link.
   - Physical Address:
     - Include your physical mailing address in email footers to comply with the CAN-SPAM Act.
   - Privacy Policy:
     - Ensure your privacy policy covers email communications.

13. Testing Emails

   - Sandbox Mode:
     - Use SendGrid’s sandbox mode for testing.
   - Testing Tools:
     - Use tools like Mailtrap to test emails without sending them to real users.

### Additional Tips

- Email Scheduling:
  - Use SendGrid’s scheduling features to send emails at specific times.
- Template Versioning:
  - Keep track of changes by using versioning in dynamic templates.
- Personalization:
  - Use dynamic data to personalize emails for better engagement.
- Rate Limits:
  - Be aware of SendGrid’s rate limits, especially on the free tier.

### Resources

- SendGrid Node.js Documentation
- Dynamic Templates Guide
- Email Deliverability Guide

### Sample Email Sending Function with Template

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(to, templateId, dynamicData) {
  const msg = {
    to,
    from: {
      email: 'your_verified_sender_email@example.com',
      name: 'Your App Name',
    },
    templateId: templateId,
    dynamicTemplateData: dynamicData,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log(`Email sent to ${to}`);
    })
    .catch((error) => {
      console.error(`Error sending email to ${to}:`, error.response.body);
    });
}

// Usage Example:

// For account confirmation email
sendEmail(
  'newuser@example.com',
  'd-1234567890abcdef1234567890abcdef', // Template ID from SendGrid
  {
    firstName: 'John',
    confirmationLink: 'https://yourapp.com/confirm?token=abc123',
  }
);
```

By following this guide, you’ll be able to integrate SendGrid into your application effectively, ensuring reliable email delivery for your users. If you encounter any issues or have further questions, consult SendGrid’s documentation or reach out to their support team.

Remember: Always test your email functionality thoroughly before deploying to production to ensure that users receive emails as expected.

## Contribution Guidelines

We welcome contributions to improve My Next Step. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```sh
   git checkout -b feature-name
   ```
3. Make your changes and commit them with a descriptive message:
   ```sh
   git commit -m "Add feature-name"
   ```
4. Push your changes to your forked repository:
   ```sh
   git push origin feature-name
   ```
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
