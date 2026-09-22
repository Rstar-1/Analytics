import { useState } from 'react';
import Icon from '../../common/Icon';
import FormBuilder from '../FormBuilder';
import { sendEmail } from '../../../utils/emailsend';

const NewsletterForm = ({
  variant = 'card',
  placeholder,
  buttonText = 'Subscribe',
  title = 'Subscribe to Our Newsletter',
  subtitle = 'Get the latest marketing insights and strategies straight to your inbox.',
  onSubscribe
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const fields = [
    {
      name: 'email',
      type: 'email',
      placeholder: placeholder || (variant === 'footer' ? 'Corporate email...' : 'Enter your email'),
      validation: { required: true, email: true },
      className: variant === 'footer' ? 'newsletter-input' : ''
    }
  ];

  const handleFormSubmit = async (formData) => {
    const trimmedEmail = formData.email?.trim() || '';
    if (!trimmedEmail) return;

    const message = `Newsletter Subscription Request:\nEmail: ${trimmedEmail}`;
    const smsBody = encodeURIComponent(message);

    try {
      await sendEmail({ email: trimmedEmail }, "New Newsletter Subscription", message);
    } catch (err) {
      console.error("Formspree error:", err);
    }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    window.location.href = `sms:${import.meta.env.VITE_PHONE || '8779030638'}${isIOS ? '&' : '?'}body=${smsBody}`;

    if (onSubscribe) onSubscribe(trimmedEmail);
    else if (variant === 'footer') alert('Subscribed!');

    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  if (variant === 'footer') {
    return (
      <div className="w-full mt-10">
        {isSubscribed ? (
          <div className="p-10 bg-light-success text-success rounded-5 font-600 small-text text-center mt-15">
            ✓ Subscribed successfully!
          </div>
        ) : (
          <FormBuilder
            fields={fields}
            onSubmit={handleFormSubmit}
            submitType="json"
            submitText={buttonText}
            buttonVersion="v3"
            buttonBg="primary"
            buttonClassName="mt-10"
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-dark text-white rounded-10 p-20 relative overflow-hidden">
      <Icon
        name="Send"
        width="42"
        height="42"
        className="absolute text-white"
        strokeWidth="1.5"
        style={{
          color: 'rgba(255, 255, 255, 0.05)',
          right: '15px',
          top: '15px',
          pointerEvents: 'none',
        }}
      />

      <h3 className="mid-text font-600 text-white">{title}</h3>
      <p className="mini-text text-white mt-5 mb-15">{subtitle}</p>

      {isSubscribed ? (
        <div className="p-10 bg-light-success text-success rounded-5 font-600 small-text text-center">
          ✓ Subscribed successfully!
        </div>
      ) : (
        <div className="">
          <FormBuilder
            fields={fields}
            onSubmit={handleFormSubmit}
            submitType="json"
            submitText={buttonText}
            buttonVersion="v3"
            buttonBg="primary"
            buttonClassName="mt-10"
          />
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;
