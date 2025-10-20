import emailjs from '@emailjs/browser';

import { CLIENT_URL } from '@constants/url.constants';

// TODO: add env config
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendVerificationEmail = async (
  toEmail: string,
  verificationToken: string,
  username: string
) => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.error(
      'EmailJS credentials are not configured in VITE environment variables.'
    );
    throw new Error('Email service is unavailable.');
  }

  const templateParams = {
    to_email: toEmail,
    to_name: username,
    verification_token: verificationToken,
    verification_url: `${CLIENT_URL}/verify?token=${verificationToken}`,
    app_name: 'YOUR READER',
  };

  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  );
};
