import React, { useEffect, useState } from 'react';
import { Lock, ShieldCheck, AlertCircle, Mail, KeyRound, Loader2 } from 'lucide-react';
import { SOCIAL_API_BASE_URL, SOCIAL_AUTH_STORAGE_KEY } from '../constants';

interface SocialAccessGateProps {
  onSuccess: (token: string) => void;
  onCancel: () => void;
}

export const SocialAccessGate: React.FC<SocialAccessGateProps> = ({ onSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const apiBase = SOCIAL_API_BASE_URL.replace(/\/$/, '');

  useEffect(() => {
    const existingToken = localStorage.getItem(SOCIAL_AUTH_STORAGE_KEY);
    if (!existingToken) {
      setCheckingSession(false);
      return;
    }

    const validate = async () => {
      try {
        const response = await fetch(`${apiBase}/auth/me`, {
          headers: {
            Authorization: `Bearer ${existingToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Sessão expirada');
        }

        onSuccess(existingToken);
      } catch (err) {
        console.warn('Sessão inválida', err);
        localStorage.removeItem(SOCIAL_AUTH_STORAGE_KEY);
        setCheckingSession(false);
      }
    };

    validate();
  }, [apiBase, onSuccess]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || 'Não foi possível autenticar');
      }

      const payload = await response.json();
      localStorage.setItem(SOCIAL_AUTH_STORAGE_KEY, payload.token);
      onSuccess(payload.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <Loader2 className="w-5 h-5 animate-spin" />
          Verificando sessão segura...
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-white/10 rounded-3xl p-10 shadow-[0_0_80px_rgba(15,23,42,0.7)]">
        <div className="flex items-center gap-3 text-mediaGreen uppercase tracking-[0.3em] text-xs font-bold mb-6">
          <ShieldCheck className="w-5 h-5" />
          Área Restrita
        </div>
        <h1 className="text-3xl font-extrabold mb-4">Central de Publicações</h1>
        <p className="text-slate-300 text-base mb-10">
          Faça login com seu email e senha de administrador. Apenas você e o secretário têm credenciais para operar a central social.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2" htmlFor="email">
              <Mail className="w-4 h-4" /> Email corporativo
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-base focus:outline-none focus:border-mediaGreen"
              placeholder="voce@media.com.br"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2" htmlFor="password">
              <Lock className="w-4 h-4" /> Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-base focus:outline-none focus:border-mediaGreen"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3 text-sm text-red-200">
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-mediaPink hover:opacity-90 font-bold disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Validando
                </>
              ) : (
                <>
                  <KeyRound className="w-5 h-5" />
                  Entrar
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-white/10 text-slate-300 hover:text-white"
            >
              Cancelar
            </button>
          </div>

          <p className="text-xs text-slate-500 text-center mt-4">
            As credenciais são validadas pelo backend local (Express + SQLite). Configure <code>MEDIA_SOCIAL_SETUP_KEY</code> para registrar novos admins via API.
          </p>
        </form>
      </div>
    </section>
  );
};
