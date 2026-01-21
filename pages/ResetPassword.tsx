import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../config/authService';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('oobCode');
    setOobCode(code);

    if (code) {
      authService.verifyResetCode(code)
        .then((email) => setEmail(email))
        .catch((err) => setError((err as Error).message));
    } else {
      setError('Missing reset code');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!oobCode) return setError('Missing reset code');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirm) return setError('Passwords do not match');

    setLoading(true);
    try {
      await authService.confirmPasswordReset(oobCode, password);
      if (email) {
        await authService.signin(email, password);
      }
      navigate('/lobby');
    } catch (err: unknown) {
      setError((err as Error).message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md glass rounded-[24px] p-8">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {email && <p className="text-sm text-slate-400 mb-4">Resetting password for <span className="font-mono text-indigo-300">{email}</span></p>}
        {error && <div className="mb-4 p-3 rounded bg-red-600/20 text-red-200">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="New password"
            className="w-full px-4 py-3 rounded bg-slate-900/80 border border-white/10 text-white"
          />

          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            placeholder="Confirm new password"
            className="w-full px-4 py-3 rounded bg-slate-900/80 border border-white/10 text-white"
          />

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 py-2 rounded bg-indigo-600 text-white font-bold">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            <button type="button" onClick={() => navigate('/login')} className="py-2 px-4 rounded border border-white/10 text-slate-200">
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
