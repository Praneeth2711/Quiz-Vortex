import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../config/authService';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (input.includes('@')) {
        await authService.sendPasswordResetByEmail(input);
      } else {
        await authService.sendPasswordResetByUsername(input);
      }
      setMessage('If that account exists, a password reset email has been sent. Check your inbox.');
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md glass rounded-[24px] p-8">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="text-sm text-slate-400 mb-6">Enter your email or username and we'll send a password reset link.</p>

        {message && <div className="mb-4 p-3 rounded bg-green-600/20 text-green-200">{message}</div>}
        {error && <div className="mb-4 p-3 rounded bg-red-600/20 text-red-200">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            placeholder="Email or username"
            className="w-full px-4 py-3 rounded bg-slate-900/80 border border-white/10 text-white"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 rounded bg-indigo-600 text-white font-bold"
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="py-2 px-4 rounded border border-white/10 text-slate-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
