import React, { useState } from 'react';
import { Building2, CheckCircle2, Loader2, Mail, MapPin, Send } from 'lucide-react';
import { api } from '../services/api';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    try {
      await api.submitContact(form);
      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: 'General Enquiry',
        message: '',
      });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unable to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-white text-[#231F1C] border-t border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#A63D32]">
            Connect With Our Directorate
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#70452B] font-display mt-2">
            Contact Us
          </h2>
          <div className="w-16 h-1 bg-[#A63D32] mx-auto mt-4 mb-4" />
          <p className="text-base sm:text-lg text-stone-700">
            Reach out for field collaborations, institutional CSR partnerships, rural health camp
            requests, or tribal artisan enquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F7F1E5] p-6 rounded-2xl border border-[#70452B]/20 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A63D32] text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#70452B] font-display">
                    Head Office (Bhubaneswar)
                  </h3>
                  <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                    KIIT Campus, Patia, Bhubaneswar, Khordha, Odisha – 751024
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-[#70452B]/15">
                <div className="w-10 h-10 rounded-xl bg-[#244B35] text-[#D9A441] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#70452B] font-display">
                    Jharkhand Field Center
                  </h3>
                  <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                    Mampita, Telco Colony Road, Jamshedpur, East Singhbhum, Jharkhand – 831004
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-[#70452B]/15">
                <div className="w-10 h-10 rounded-xl bg-[#D9A441] text-[#231F1C] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#70452B] font-display">Official Email</h3>
                  <p className="text-xs text-stone-700 mt-1">headoffice@ardashfoundation.org</p>
                  <p className="text-xs text-stone-600">info@ardashfoundation.org</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F7F1E5] p-6 sm:p-8 rounded-2xl border border-[#70452B]/20 shadow-xs">
            <h3 className="text-xl font-bold text-[#70452B] font-display mb-4">
              Send Us An Enquiry
            </h3>

            {submitted ? (
              <div className="bg-white p-8 rounded-xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-[#70452B] font-display">
                  Enquiry Sent Successfully
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Thank you for writing to ARDASH FOUNDATION. Our coordination team will reply to{' '}
                  your email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#70452B] rounded-lg"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Subject *
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Field Partnership / CSR">Field Partnership / CSR</option>
                      <option value="Rural Health Camp Request">Rural Health Camp Request</option>
                      <option value="Tribal Art & Sohrai Inquiries">
                        Tribal Art & Sohrai Inquiries
                      </option>
                      <option value="Volunteer Programs">Volunteer Programs</option>
                      <option value="Media & Press">Media & Press</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please specify how we can collaborate or provide assistance..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 text-xs font-bold text-white bg-[#70452B] hover:bg-[#5a3621] active:scale-98 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
