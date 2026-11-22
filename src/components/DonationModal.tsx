import React, { useEffect, useState } from 'react';
import { CheckCircle2, Heart, Loader2, ShieldCheck, X } from 'lucide-react';
import { api } from '../services/api';
import { DonationRecord } from '../types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCause?: string;
  defaultAmount?: number;
  onSuccess?: () => void;
}

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  defaultCause = 'Support Rural Education',
  defaultAmount = 1000,
  onSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [cause, setCause] = useState(defaultCause);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState(defaultAmount);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState<DonationRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCause(defaultCause);
      setAmount(defaultAmount);
      setCustomAmount('');
      setStep('details');
      setErrorMsg(null);
    }
  }, [isOpen, defaultCause, defaultAmount]);

  if (!isOpen) return null;

  const finalAmount = customAmount ? Number(customAmount) : amount;

  const handleDetailsNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !email.trim()) {
      setErrorMsg('Please enter your name and email.');
      return;
    }
    if (!finalAmount || finalAmount <= 0) {
      setErrorMsg('Please select or enter a valid donation amount.');
      return;
    }
    setErrorMsg(null);
    setStep('payment');
  };

  const handleConfirmPayment = async () => {
    setProcessing(true);
    setErrorMsg(null);
    try {
      const record = await api.submitDonation({
        donorName,
        email,
        phone,
        cause,
        amount: finalAmount,
        frequency,
        panNumber,
        paymentMethod,
      });
      setReceipt(record);
      setStep('success');
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Payment processing failed.');
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    setStep('details');
    setReceipt(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#F7F1E5] text-[#231F1C] rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-[#70452B]/30 shadow-2xl relative">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
          aria-label="Close donation portal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-[#70452B] text-white p-6 rounded-t-2xl border-b border-[#D9A441]/40">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D9A441]">
            <Heart className="w-3.5 h-3.5 fill-[#D9A441]" />
            <span>ARDASH Foundation Contribution Portal</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display mt-1">
            Empower A Rural Future
          </h3>
          <p className="text-xs text-stone-200 mt-0.5">
            100% of voluntary gifts support education materials, medical camps & tribal artisans.
          </p>
        </div>

        {step === 'details' && (
          <form onSubmit={handleDetailsNext} className="p-6 space-y-5">
            {errorMsg && (
              <div className="p-3 bg-red-100 text-red-800 text-xs rounded-lg border border-red-300">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Select Cause to Support
              </label>
              <select
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
              >
                <option value="Support Rural Education">
                  Support Rural Education (Books, study circles & slates)
                </option>
                <option value="Support Tribal Development">
                  Support Tribal Development (Sohrai art & cultural preservation)
                </option>
                <option value="Support Healthcare Awareness">
                  Support Healthcare Awareness (Mobile camps & diagnostics)
                </option>
                <option value="Support Women Empowerment">
                  Support Women Empowerment (SHGs & lac cultivation)
                </option>
                <option value="Support Child Welfare">
                  Support Child Welfare (Millet nutrition & early care)
                </option>
                <option value="General Rural Development">
                  General Rural Development (Deploy where most needed)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Donation Frequency
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFrequency('one-time')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    frequency === 'one-time'
                      ? 'bg-[#70452B] text-white border-[#70452B] shadow-xs'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  One-Time Contribution
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    frequency === 'monthly'
                      ? 'bg-[#70452B] text-white border-[#70452B] shadow-xs'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  Monthly Sustainer
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Select Amount (INR)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2 text-xs font-bold rounded-lg border tabular-nums transition-all ${
                      !customAmount && amount === amt
                        ? 'bg-[#A63D32] text-white border-[#A63D32] shadow-xs'
                        : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={100}
                placeholder="Or enter custom amount (₹)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#70452B] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Donor Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="receipt@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  PAN (Optional)
                </label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-white bg-[#A63D32] hover:bg-[#8d2c22] rounded-lg shadow-md transition-colors"
            >
              Continue to Contribution Summary (₹{finalAmount.toLocaleString()})
            </button>
          </form>
        )}

        {step === 'payment' && (
          <div className="p-6 space-y-5">
            {errorMsg && (
              <div className="p-3 bg-red-100 text-red-800 text-xs rounded-lg border border-red-300">
                {errorMsg}
              </div>
            )}

            <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Donor:</span>
                <span className="font-bold text-stone-800">{donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Cause:</span>
                <span className="font-bold text-[#70452B]">{cause}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Frequency:</span>
                <span className="font-semibold capitalize">{frequency}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-100 text-sm">
                <span className="font-bold text-stone-800">Total Amount:</span>
                <span className="font-extrabold text-[#A63D32] tabular-nums">
                  ₹{finalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['UPI', 'Credit / Debit Card', 'Net Banking'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMethod(mode)}
                    className={`py-2.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                      paymentMethod === mode
                        ? 'bg-[#244B35] text-white border-[#244B35]'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-stone-600 bg-white p-3 rounded-lg border border-stone-200">
              <ShieldCheck className="w-4 h-4 text-[#244B35] shrink-0" />
              <span>
                Your contribution voucher is immediately recorded in the ARDASH Foundation ledger.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg"
              >
                Back
              </button>
              <button
                type="button"
                disabled={processing}
                onClick={handleConfirmPayment}
                className="flex-1 py-3 text-xs font-bold text-white bg-[#A63D32] hover:bg-[#8d2c22] rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating Receipt...</span>
                  </>
                ) : (
                  <span>Confirm ₹{finalAmount.toLocaleString()} Contribution</span>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 'success' && receipt && (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h4 className="text-2xl font-bold text-[#70452B] font-display">
              Thank You for Your Solidarity!
            </h4>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Your contribution voucher has been generated and logged for{' '}
              <strong>{receipt.cause}</strong>.
            </p>

            <div className="bg-white p-4 rounded-xl border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Voucher Number:</span>
                <span className="font-mono font-bold text-[#A63D32]">{receipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Donor Name:</span>
                <span className="font-semibold">{receipt.donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Amount:</span>
                <span className="font-bold tabular-nums">₹{receipt.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Mode:</span>
                <span>{receipt.paymentMethod}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#70452B] hover:bg-[#5a3621] rounded-lg"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
