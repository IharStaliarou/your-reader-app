import emailjs from '@emailjs/browser';

import { VERIFY_TOKEN_URL } from '@/shared/constants/api.constants';
import { EMAILJS_CONFIG } from '../utils/emailjs.utils';

const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } =
  EMAILJS_CONFIG;

export const sendVerificationEmail = async (
  toEmail: string,
  verificationToken: string,
  username: string
) => {
  const templateParams = {
    to_email: toEmail,
    to_name: username,
    verification_token: verificationToken,
    verification_url: VERIFY_TOKEN_URL(verificationToken),
    app_name: 'YOUR READER',
  };

  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  );
};
