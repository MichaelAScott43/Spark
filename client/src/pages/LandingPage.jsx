import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const LandingPage = () => {
  return (
    <Layout>
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-300">CHIEF OF STAFF AI</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">Meet Your AI Chief of Staff</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">TJ helps you make faster, smarter business decisions</p>
        <p className="mt-3 max-w-2xl text-slate-400">
          One platform for opportunity analysis, bid/no-bid calls, risk visibility, and execution guidance.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-900" to="/register">
            Register
          </Link>
          <Link className="rounded-xl border border-slate-700 px-6 py-3" to="/login">
            Login
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default LandingPage;
