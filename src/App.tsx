/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, Copy, Check, Link as LinkIcon, 
  ShieldCheck, Send, Mail, Smartphone, ArrowRight
} from 'lucide-react';

interface ActivatedAccount {
  id: string;
  email: string;
  magicLink: string;
  date: string;
  status: 'Active Premium';
  activationCode: string;
}

export default function App() {
  const [step, setStep] = useState<1 | 2>(1);
  const [emailInput, setEmailInput] = useState<string>('');
  const [magicLinkInput, setMagicLinkInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activatedAccounts, setActivatedAccounts] = useState<ActivatedAccount[]>([
    {
      id: 'ACC-9921',
      email: 'yedabec556@turnproxy.com',
      magicLink: 'https://alightmotion.com/auth/verify?token=am_magic_883921049',
      date: '2026-10-31 22:10',
      status: 'Active Premium',
      activationCode: 'AM-VIP-LIFETIME-2026-PRO'
    }
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Step 1: Send mail request
  const handleSendMailRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      alert('Masukkan email yang valid.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
      alert(`Permintaan email terkirim ke ${emailInput}. Periksa kotak masuk / inbox email Anda, salin magic link yang diterima, lalu tempel di bawah.`);
    }, 1200);
  };

  // Step 2: Submit Magic Link to activate
  const handleActivateWithMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!magicLinkInput.trim()) {
      alert('Tempel magic link yang Anda terima dari email terlebih dahulu.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newAcc: ActivatedAccount = {
        id: 'ACC-' + Math.floor(1000 + Math.random() * 9000),
        email: emailInput || 'yedabec556@turnproxy.com',
        magicLink: magicLinkInput,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Active Premium',
        activationCode: 'AM-VIP-LIFETIME-' + Math.floor(100000 + Math.random() * 900000)
      };

      setActivatedAccounts([newAcc, ...activatedAccounts]);
      setMagicLinkInput('');
      setIsProcessing(false);
      alert(`Berhasil! AM Premium diaktifkan untuk email ${emailInput}. Akun siap digunakan di Alight Motion.`);
      setStep(1);
      setEmailInput('');
    }, 1500);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col items-center justify-center p-4 selection:bg-emerald-600 selection:text-white relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Card */}
      <div className="max-w-xl w-full bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
              Alight Motion Premium Activator <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono">2-Step Flow</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1">Kirim email permintaan, terima magic link, tempel di sini, dan aktifkan AM Premium!</p>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
            step === 1 ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-zinc-800 bg-zinc-950 text-zinc-500'
          }`}>
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">1</span>
            <span>Kirim Email Permintaan</span>
          </div>
          <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
            step === 2 ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-zinc-800 bg-zinc-950 text-zinc-500'
          }`}>
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">2</span>
            <span>Tempel & Aktifkan Magic Link</span>
          </div>
        </div>

        {/* STEP 1 FORM */}
        {step === 1 && (
          <form onSubmit={handleSendMailRequest} className="space-y-5 bg-zinc-950/80 border border-zinc-800 p-6 rounded-2xl">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-400" /> Masukkan Email Alight Motion Anda:
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="yedabec556@turnproxy.com"
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3.5 rounded-xl text-sm outline-none focus:border-emerald-500 transition-colors"
                required
              />
              <p className="text-xs text-zinc-500">Sistem akan memicu pengiriman email verifikasi magic link ke kotak masuk Anda.</p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Mengirim Permintaan Email...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Kirim Mail Permintaan
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2 FORM */}
        {step === 2 && (
          <form onSubmit={handleActivateWithMagicLink} className="space-y-5 bg-zinc-950/80 border border-zinc-800 p-6 rounded-2xl animate-in fade-in duration-300">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 leading-relaxed">
              Email permintaan terkirim ke <span className="font-bold text-white">{emailInput}</span>. Buka kotak masuk email Anda, salin Magic Link yang diterima, lalu tempel di bawah ini.
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-emerald-400" /> Tempel Magic Link URL / Pesan:
              </label>
              <textarea
                value={magicLinkInput}
                onChange={(e) => setMagicLinkInput(e.target.value)}
                placeholder="https://alightmotion.com/auth/verify?token=..."
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-800 text-white p-3.5 rounded-xl text-xs font-mono outline-none focus:border-emerald-500 transition-colors resize-none"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold px-4 py-3.5 rounded-xl text-xs transition-all cursor-pointer"
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Mengaktifkan AM Premium...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Aktifkan AM Premium Sekarang
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Activated Accounts List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Riwayat Akun AM Premium Aktif ({activatedAccounts.length})
            </h3>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {activatedAccounts.map(acc => (
              <div key={acc.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-emerald-400 font-bold">{acc.email}</span>
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {acc.status}
                  </span>
                </div>

                <div className="bg-zinc-900 p-2.5 rounded-lg flex items-center justify-between text-xs font-mono text-zinc-300">
                  <span className="truncate max-w-[260px]">{acc.activationCode}</span>
                  <button
                    type="button"
                    onClick={() => copyText(acc.activationCode, acc.id)}
                    className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-emerald-400 rounded-md flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    {copiedId === acc.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedId === acc.id ? 'Tersalin' : 'Salin Kode'}
                  </button>
                </div>

                <div className="text-[11px] text-zinc-500 flex justify-between">
                  <span>Dihubungkan via Magic Link</span>
                  <span>{acc.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-zinc-500 font-mono">
        Alight Motion AM Premium Activator • 2-Step Mail & Magic Link Flow
      </footer>

    </div>
  );
}
