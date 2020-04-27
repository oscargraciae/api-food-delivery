import bcrypt from 'bcryptjs';
import sgMail from '@sendgrid/mail';

async function mailResetPassword(user) {
  sgMail.setApiKey('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');

  const hashedEmail = await bcrypt.hash(user.email, 12);
  const msg = {
    to: user.email,
    from: 'Eathouse <hello@eathouse.mx>',
    subject: 'Nueva contraseña',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    templateId: '1826a31f-90ae-4263-bba5-3e67c4d3bc4c',
    substitutions: {
      name: 'Some One',
      url: `https://eathouse.mx/password-reset?t=${hashedEmail}&id=${user.id}`,
    },
  };

  sgMail.setSubstitutionWrappers('=', '=');

  sgMail.send(msg);

  return "Mensaje de prueba" + hashedEmail;
}

export { mailResetPassword };
