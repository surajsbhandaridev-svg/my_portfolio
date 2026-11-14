import React, { useState } from 'react';
import { api } from '../services/api';
import { Mail, Download, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill out all fields before sending.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Message must be at least 10 characters long.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await api.sendMessage(formData);
      if (res.success) {
        setStatus('success');
        setSuccessMessage(res.message || 'Your message has been received! Suraj will reply shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(res.message || 'Failed to dispatch message.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Network error occurred. Please try again.');
    }
  };

  return (
    <div className="py-6 space-y-12 max-w-4xl">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-handwriting text-lg text-[#F2A6AC] border border-[#F2A6AC]/60 px-4 py-1 rounded-full hand-drawn-circle shadow-sm">
          Chapter 07 — Let's Connect
        </span>
        <h1 className="font-handwriting text-5xl sm:text-6xl md:text-7xl font-bold text-[#F0E9EF]">
          Have an idea? Let's build <br />
          <span className="text-[#F2A6AC] scribble-underline">something meaningful.</span>
        </h1>
        <p className="font-serif text-lg text-[#BDB5B9] max-w-2xl leading-relaxed">
          Whether you're interested in discussing full-stack software development, software engineering internships, open-source projects, or tech ideas—drop a message in the journal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form styled like a torn stationery note */}
        <div className="lg:col-span-7 relative bg-[#161616] border border-white/15 rounded-sm p-6 sm:p-8 shadow-paper">
          {/* Top Paper Tape */}
          <div className="absolute -top-3 left-10 w-24 h-6 tape-strip pointer-events-none" />

          <h2 className="font-handwriting text-3xl font-bold text-[#F0E9EF] mb-6 flex items-center gap-2">
            <span>Send a Dispatch</span>
            <span className="text-xs font-mono text-[#8FCF9B]">● ACTIVE</span>
          </h2>

          {/* Feedback Notifications */}
          {status === 'success' && (
            <div className="mb-6 p-4 rounded bg-emerald-950/70 border border-[#8FCF9B]/40 text-[#8FCF9B] flex items-start gap-3">
              <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
              <div className="text-sm font-sans">{successMessage}</div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 rounded bg-rose-950/70 border border-rose-500/40 text-rose-300 flex items-start gap-3">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div className="text-sm font-sans">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-handwriting text-xl text-[#F0E9EF] mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Chen"
                required
                className="w-full px-4 py-2.5 bg-[#101010] border border-white/15 rounded font-mono text-sm text-[#F0E9EF] placeholder:text-white/25 focus:outline-none focus:border-[#F2A6AC]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-handwriting text-xl text-[#F0E9EF] mb-1">
                Your Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. alex@company.com"
                required
                className="w-full px-4 py-2.5 bg-[#101010] border border-white/15 rounded font-mono text-sm text-[#F0E9EF] placeholder:text-white/25 focus:outline-none focus:border-[#F2A6AC]"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block font-handwriting text-xl text-[#F0E9EF] mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Internship Opportunity / DostLeague Project"
                required
                className="w-full px-4 py-2.5 bg-[#101010] border border-white/15 rounded font-mono text-sm text-[#F0E9EF] placeholder:text-white/25 focus:outline-none focus:border-[#F2A6AC]"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-handwriting text-xl text-[#F0E9EF] mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your note or project inquiry here..."
                required
                className="w-full px-4 py-2.5 bg-[#101010] border border-white/15 rounded font-serif text-sm text-[#F0E9EF] placeholder:text-white/25 focus:outline-none focus:border-[#F2A6AC]"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#F2A6AC] text-[#101010] font-handwriting text-2xl font-bold py-3 rounded shadow-sketch-pink hover:opacity-95 active:translate-y-0.5 transition-all disabled:opacity-50"
            >
              {status === 'submitting' ? (
                <span>Writing to journal...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Contact Card */}
          <div className="p-6 rounded-sm bg-[#181818] border border-white/10 space-y-5">
            <h3 className="font-handwriting text-2xl font-bold text-[#F0E9EF]">
              Direct Coordinates
            </h3>

            <div className="space-y-4 text-sm font-serif">
              <div className="flex items-start gap-3">
                <span className="p-2 rounded bg-white/5 border border-white/10 text-[#F2A6AC]">
                  <Mail size={16} />
                </span>
                <div>
                  <span className="block font-mono text-xs text-[#BDB5B9]">Primary Email</span>
                  <a
                    href="mailto:bhandarisuraj382@gmail.com"
                    className="text-[#F0E9EF] hover:text-[#F2A6AC] transition-colors"
                  >
                    bhandarisuraj382@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-2 rounded bg-white/5 border border-white/10 text-[#76A9FF]">
                  <GithubIcon size={16} />
                </span>
                <div>
                  <span className="block font-mono text-xs text-[#BDB5B9]">GitHub Repositories</span>
                  <a
                    href="https://github.com/surajsbhandaridev-svg"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F0E9EF] hover:text-[#76A9FF] transition-colors"
                  >
                    github.com/surajsbhandaridev-svg
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-2 rounded bg-white/5 border border-white/10 text-[#8FCF9B]">
                  <LinkedinIcon size={16} />
                </span>
                <div>
                  <span className="block font-mono text-xs text-[#BDB5B9]">Professional Network</span>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F0E9EF] hover:text-[#8FCF9B] transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Resume Button */}
            <div className="pt-4 border-t border-white/10">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 border border-white/20 text-[#F0E9EF] font-handwriting text-xl py-2 rounded hover:border-[#F2A6AC] hover:text-[#F2A6AC] transition-colors"
              >
                <Download size={16} />
                <span>Download Curriculum Vitae</span>
              </a>
            </div>
          </div>

          {/* Torn Paper Quick Note */}
          <div className="p-5 bg-[#EAE0D5] text-[#1c1917] rounded shadow-md transform rotate-1 font-handwriting text-base">
            <div className="font-bold border-b border-black/15 pb-1 mb-2">Location & Availability:</div>
            <p>
              Based in Dehradun, Uttarakhand, India. Open to remote and on-site software engineering internships, open-source collaborations, and developer opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
