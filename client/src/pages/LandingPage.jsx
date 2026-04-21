import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const LandingPage = () => {
  return (
    <Layout>
      <main className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-16">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300">Anchor</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            Your AI Chief of Staff. Less chaos. More execution.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Anchor captures everything on your plate, tells you what matters, and helps you act before things fall apart.
          </p>
          <div className="mt-8 flex gap-4">
            <Link className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-900" to="/register">Start Free Trial</Link>
            <Link className="rounded-xl border border-slate-700 px-6 py-3" to="/login">Log In</Link>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {[
            ['Problem', 'Overwhelm causes missed details, reactive days, and silent risk buildup.'],
            ['Solution', 'AI triage turns your brain dump into clear priorities and execution.'],
            ['Tone Modes', 'Direct = concise, TJ = blunt and funny, Arlane = calm and supportive.'],
            ['Features', 'Triage, Today execution list, and Daily Debrief coaching.']
          ].map(([title, copy]) => (
            <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-slate-300">{copy}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-cyan-900/40 bg-slate-900 p-8">
          <h3 className="text-2xl font-semibold">Billing (Placeholder)</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-700 p-4">
              <p className="text-lg font-medium">Free Trial</p>
              <p className="text-slate-400">Explore all core features for evaluation.</p>
            </div>
            <div className="rounded-xl border border-cyan-700/50 p-4">
              <p className="text-lg font-medium">Pro — $19/month</p>
              <p className="text-slate-400">Stripe checkout integration placeholder.</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default LandingPage;
