
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { name, email, message, postTitle, postUrl } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Default to sending to self if EMAIL_TO not set
            subject: `New Comment on "${postTitle}"`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Comment Received</h2>
                    <p><strong>Post:</strong> <a href="${postUrl}">${postTitle}</a></p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
                        <p style="margin: 0; color: #555;"><strong>Message:</strong></p>
                        <p style="margin-top: 5px; white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="border: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #888;">This email was sent from your TrendWatch360 website.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Comment sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send comment' }, { status: 500 });
    }
}
