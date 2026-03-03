import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('sending');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: '' }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        const msg = data?.error || `Failed to send (${res.status})`;
        setStatus('error');
        setStatusMessage(msg);
        return;
      }

      setStatus('success');
      setStatusMessage('Your message was sent successfully. I will get back to you soon.');
      setSubmitted(true);

      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitted(false);
        setStatus('idle');
        setStatusMessage('');
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setStatusMessage('Network error. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    { icon: Mail, label: t('contact.info.email'), value: 'hello@codenest.ro' },
    { icon: MapPin, label: t('contact.info.location'), value: t('contact.info.locationValue') },
    { icon: Clock, label: t('contact.info.response'), value: t('contact.info.responseValue') },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 px-6 relative">
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#10B981]/10 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16 text-center">
            <div className="inline-block px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full mb-6">
              <p className="text-[#10B981] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t('contact.badge')}
              </p>
            </div>
            <h2
              className="text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {t('contact.title')}
            </h2>
            <p
              className="text-xl text-gray-400"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t('contact.description')}
            </p>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    required
                    className="w-full px-5 py-4 bg-[#0F1419] border border-[#1F2937] rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    required
                    className="w-full px-5 py-4 bg-[#0F1419] border border-[#1F2937] rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-400 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  required
                  rows={6}
                  className="w-full px-5 py-4 bg-[#0F1419] border border-[#1F2937] rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all resize-none text-white placeholder-gray-500"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>
              <input
                type="text"
                name="website"
                value=""
                onChange={() => { }}
                disabled={status === 'sending'}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              {status !== 'idle' && statusMessage && (
                <div
                  className={`rounded-xl border p-4 text-sm ${status === 'success'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                    : status === 'error'
                      ? 'border-red-500/30 bg-red-500/10 text-red-200'
                      : 'border-[#1F2937] bg-[#0F1419] text-gray-300'
                    }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {statusMessage}
                </div>
              )}
              <motion.button
                type="submit"
                disabled={submitted}
                whileHover={{ scale: submitted ? 1 : 1.02 }}
                whileTap={{ scale: submitted ? 1 : 0.98 }}

                className="w-full px-8 py-4 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-colors flex items-center justify-center gap-3 disabled:bg-[#10B981] disabled:cursor-not-allowed shadow-lg shadow-[#10B981]/20"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{t('contact.sent')}</span>
                  </>
                ) : (
                  <>
                    <span className="font-medium">{t('contact.send')}</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="p-4 bg-[#0F1419] border border-[#1F2937] rounded-xl text-center hover:border-[#10B981]/50 transition-all"
                >
                  <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <p
                    className="text-xs text-gray-500 mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {info.label}
                  </p>
                  <p
                    className="text-sm text-white font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {info.value}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <div
            className="mt-16 pt-8 border-t border-[#1F2937] text-center text-gray-500"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <p>{t('contact.footer')}</p>
            <p className="mt-2 text-xs tracking-widest uppercase opacity-60">
              Built with React · Express
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}