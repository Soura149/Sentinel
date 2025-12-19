# Email Configuration for Patient OTP

This guide explains how to configure email sending for patient OTP codes.

## Quick Setup

### For Gmail (Recommended for Development)

1. **Enable 2-Step Verification**
   - Go to your Google Account: https://myaccount.google.com/
   - Navigate to Security → 2-Step Verification
   - Enable it if not already enabled

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "Sentinel OTP" as the name
   - Copy the 16-character password generated

3. **Add to .env file**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_16_character_app_password
   ```

### For Other Email Providers

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
```

#### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@yahoo.com
SMTP_PASS=your_app_password
```

#### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

#### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_mailgun_username
SMTP_PASS=your_mailgun_password
```

## Testing

1. Start your backend server
2. Request an OTP for a patient
3. Check the console logs:
   - ✅ `[EMAIL SENT]` - Email sent successfully
   - ⚠️ `[EMAIL NOT CONFIGURED]` - Email not configured, OTP logged to console
   - ❌ `[EMAIL ERROR]` - Email sending failed (check credentials)

## Fallback Behavior

If email is not configured or fails to send:
- OTP is still generated and stored
- OTP is logged to console for development
- Patient can still use the OTP (if they see it in logs)
- Response includes `emailSent: false` to indicate email wasn't sent

## Production Recommendations

1. Use a dedicated email service (SendGrid, Mailgun, AWS SES)
2. Set up proper error monitoring
3. Consider using a queue system for email delivery
4. Implement rate limiting for OTP requests
5. Use Redis for OTP storage instead of in-memory Map

