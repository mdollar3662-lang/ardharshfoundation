import React, { useState } from 'react';
import { CheckCircle2, Loader2, Users } from 'lucide-react';
import { api } from '../services/api';

interface VolunteerSectionProps {
  onSuccessSubmit: () => void;
}

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({ onSuccessSubmit }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    state: 'Jharkhand',
    district: '',
    areaOfInterest: 'Rural Education & Children Study Circles',
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
      await api.submitVolunteer(form);
      setSubmitted(true);
      setForm({
        fullName: '',
        email: '',
        mobileNumber: '',
        state: 'Jharkhand',
        district: '',
        areaOfInterest: 'Rural Education & Children Study Circles',
        message: '',
      });
      onSuccessSubmit();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unable to submit registration.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="get-involved"
      className="py-20 bg-white text-[#231F1C] border-y border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#A63D32]">
            Become A Catalyst
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#70452B] font-display mt-2">
            Get Involved & Volunteer
          </h2>
          <div className="w-20 h-1 bg-[#A63D32] mt-4 mb-4" />
          <p className="text-base sm:text-lg text-stone-700">
            Join our brigade of field educators, rural healthcare assistants, youth trainers, and
            cultural preservationists across eastern India.
          </p>
        </div>

        <div className="bg-[#F7F1E5] rounded-2xl p-6 sm:p-10 border border-[#70452B]/20 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#70452B] mb-4">
                <Users className="w-4 h-4 text-[#A63D32]" />
                <span>Volunteer Registration Form</span>
              </div>

              {submitted ? (
                <div className="bg-white p-8 rounded-xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-bold text-[#70452B] font-display">
                    Registration Received!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Thank you for stepping forward to stand with Adivasi and rural communities. Our
                    regional coordinator will connect with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#70452B] rounded-lg"
                  >
                    Register Another Volunteer
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
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Birsa Hansda"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
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
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.mobileNumber}
                        onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        State *
                      </label>
                      <select
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
                      >
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Telangana">Telangana</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Other">Other State</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        District / City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. East Singhbhum"
                        value={form.district}
                        onChange={(e) => setForm({ ...form, district: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Area of Interest *
                    </label>
                    <select
                      value={form.areaOfInterest}
                      onChange={(e) => setForm({ ...form, areaOfInterest: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
                    >
                      <option value="Rural Education & Children Study Circles">
                        Rural Education & Children Study Circles
                      </option>
                      <option value="Tribal Development & Cultural Preservation">
                        Tribal Development & Cultural Preservation
                      </option>
                      <option value="Rural Health Camps & Awareness">
                        Rural Health Camps & Awareness
                      </option>
                      <option value="Women Self-Help Group Empowerment">
                        Women Self-Help Group Empowerment
                      </option>
                      <option value="Child Nutrition & Early Childhood Care">
                        Child Nutrition & Early Childhood Care
                      </option>
                      <option value="Sustainable Livelihoods & Organic Produce">
                        Sustainable Livelihoods & Organic Produce
                      </option>
                      <option value="Tree Plantation & Sacred Grove Protection">
                        Tree Plantation & Sacred Grove Protection
                      </option>
                      <option value="Youth Digital Literacy & Career Guidance">
                        Youth Digital Literacy & Career Guidance
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Message / Skills / Availability
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your background, dialect proficiency (e.g. Santhali, Ho, Mundari, Odia, Telugu), or how you would like to help..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 text-xs font-bold text-white bg-[#A63D32] hover:bg-[#8b2b22] active:scale-98 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Registration...</span>
                      </>
                    ) : (
                      <span>Submit Volunteer Registration</span>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#244B35]">
                  Our Grassroots Code
                </span>
                <h4 className="text-lg font-bold text-[#70452B] font-display mt-1 mb-4">
                  What It Means to Serve With ARDASH
                </h4>
                <ul className="space-y-3.5 text-xs text-stone-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#244B35] shrink-0 mt-0.5" />
                    <span>
                      <strong>Cultural Reverence:</strong> We respect indigenous customs, village
                      headmen (Manjhi Haram / Munda), and sacred village spaces.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#244B35] shrink-0 mt-0.5" />
                    <span>
                      <strong>Mother-Tongue Sensitivity:</strong> We encourage teaching and health
                      communication in local tribal dialects.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#244B35] shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Imposition:</strong> Solutions are created with the village Gram
                      Sabha, not dictated from outside.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#244B35] shrink-0 mt-0.5" />
                    <span>
                      <strong>Transparent Commitment:</strong> Verified certificates of social
                      service awarded for active field assignments.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
