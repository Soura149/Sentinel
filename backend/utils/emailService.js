import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
    // Use environment variables for email configuration
    // For Gmail: Use App Password (not regular password)
    // For other services: Adjust host, port, and auth accordingly
    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // Your email address
            pass: process.env.SMTP_PASS, // Your email password or app password
        },
    });

    return transporter;
};

/**
 * Send OTP email to patient
 * @param {string} to - Recipient email address
 * @param {string} otp - 6-digit OTP code
 * @param {string} patientName - Patient's name
 * @returns {Promise<Object>} Email sending result
 */
export const sendOTPEmail = async (to, otp, patientName) => {
    try {
        // Debug: Check if environment variables are loaded
        const hasUser = !!process.env.SMTP_USER;
        const hasPass = !!process.env.SMTP_PASS;
        
        // If email is not configured, fall back to console log
        if (!hasUser || !hasPass) {
            console.log(`\n📧 [EMAIL NOT CONFIGURED] OTP Email would be sent to: ${to}`);
            console.log(`   Subject: Sentinel Login OTP`);
            console.log(`   Body: Your OTP code is ${otp}`);
            console.log(`   Debug - SMTP_USER: ${hasUser ? '✓ Set (' + process.env.SMTP_USER.substring(0, 10) + '...)' : '✗ Missing'}`);
            console.log(`   Debug - SMTP_PASS: ${hasPass ? '✓ Set (' + process.env.SMTP_PASS.substring(0, 4) + '...)' : '✗ Missing'}`);
            console.log(`   Note: Configure SMTP_USER and SMTP_PASS in .env to enable email sending`);
            console.log(`   Tip: Make sure .env file is in the 'backend' directory and restart the server\n`);
            return { success: true, message: 'Email logged (SMTP not configured)' };
        }

        const transporter = createTransporter();

        // Email content
        const mailOptions = {
            from: `"Sentinel Healthcare" <${process.env.SMTP_USER}>`,
            to: to,
            subject: 'Your Sentinel Login OTP Code',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Sentinel Login OTP</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #005B96 0%, #00A1E4 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Sentinel</h1>
                        <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">AI-Powered Patient Monitoring</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #005B96; margin-top: 0;">Hello ${patientName},</h2>
                        
                        <p style="font-size: 16px; color: #555;">Your One-Time Password (OTP) for logging into your Sentinel patient portal is:</p>
                        
                        <div style="background: #f8f9fa; border: 2px dashed #005B96; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                            <div style="font-size: 36px; font-weight: bold; color: #005B96; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                ${otp}
                            </div>
                        </div>
                        
                        <p style="font-size: 14px; color: #777; margin-top: 30px;">
                            <strong>Important:</strong>
                        </p>
                        <ul style="font-size: 14px; color: #777; padding-left: 20px;">
                            <li>This OTP is valid for <strong>5 minutes</strong> only</li>
                            <li>Do not share this code with anyone</li>
                            <li>If you did not request this code, please ignore this email</li>
                        </ul>
                        
                        <p style="font-size: 14px; color: #999; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                            This is an automated message from Sentinel Healthcare System. Please do not reply to this email.
                        </p>
                    </div>
                </body>
                </html>
            `,
            text: `
                Sentinel Healthcare - Login OTP
            
                Hello ${patientName},
                
                Your One-Time Password (OTP) for logging into your Sentinel patient portal is:
                
                ${otp}
                
                This OTP is valid for 5 minutes only.
                
                If you did not request this code, please ignore this email.
                
                This is an automated message from Sentinel Healthcare System.
            `
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log(`✅ [EMAIL SENT] OTP sent to ${to} - Message ID: ${info.messageId}`);
        
        return {
            success: true,
            messageId: info.messageId,
            message: 'OTP email sent successfully'
        };

    } catch (error) {
        console.error('❌ [EMAIL ERROR] Failed to send OTP email:', error);
        
        // Fallback: Log to console if email fails
        console.log(`\n📧 [FALLBACK] OTP Email to: ${to}`);
        console.log(`   Subject: Sentinel Login OTP`);
        console.log(`   OTP Code: ${otp}\n`);
        
        return {
            success: false,
            error: error.message,
            message: 'Email sending failed, but OTP is still valid'
        };
    }
};

/**
 * Verify email transporter configuration
 * @returns {Promise<boolean>} True if email is configured and working
 */
export const verifyEmailConfig = async () => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            return false;
        }

        const transporter = createTransporter();
        await transporter.verify();
        return true;
    } catch (error) {
        console.error('Email configuration verification failed:', error);
        return false;
    }
};

