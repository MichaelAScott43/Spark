import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const isLogin = mode === 'login';

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) await login(email, password);
      else await register(email, password);
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <form onSubmit={submit} className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <h1 className="text-3xl font-semibold">{isLogin ? 'Welcome back' : 'Create account'}</h1>
          <p className="mt-2 text-slate-400">{isLogin ? 'Log in to Anchor.' : 'Start your free trial.'}</p>
          <div className="mt-6 space-y-4">
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Password" type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}
          <button disabled={loading} className="mt-6 w-full rounded-lg bg-cyan-400 py-3 font-semibold text-slate-900 disabled:opacity-70">
            {loading ? 'Please wait...' : isLogin ? 'Log In' : 'Register'}
          </button>
          <p className="mt-4 text-sm text-slate-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <Link className="text-cyan-300" to={isLogin ? '/register' : '/login'}>{isLogin ? 'Register' : 'Log in'}</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default AuthPage;
