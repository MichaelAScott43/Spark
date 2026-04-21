import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const tones = ['Direct', 'TJ', 'Arlane'];

const sectionStyles = {
  critical: 'border-rose-500/40 bg-rose-950/20',
  important: 'border-amber-400/40 bg-amber-950/20',
  noise: 'border-slate-700 bg-slate-900/40',
  risks: 'border-red-400/50 bg-red-950/20'
};

const AppPage = () => {
  const { logout, user } = useAuth();
  const [rawInput, setRawInput] = useState('');
  const [tone, setTone] = useState('Direct');
  const [triage, setTriage] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [debrief, setDebrief] = useState('');
  const [loadingTriage, setLoadingTriage] = useState(false);

  const todayTasks = useMemo(() => tasks.filter((task) => task.category === 'today'), [tasks]);

  const fetchTasks = async () => {
    const { data } = await api.get('/tasks');
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const runTriage = async () => {
    setLoadingTriage(true);
    try {
      const { data } = await api.post('/triage', { rawInput, tone });
      setTriage(data);
    } finally {
      setLoadingTriage(false);
    }
  };

  const addToToday = async (text, category) => {
    await api.post('/tasks', { text, category: 'today', sourceCategory: category });
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await api.patch(`/tasks/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };

  const runDebrief = async () => {
    const { data } = await api.post('/debrief', { tone });
    setDebrief(data.debrief);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Anchor Command Center</h1>
            <p className="text-slate-400">{user.email}</p>
          </div>
          <button className="rounded-lg border border-slate-700 px-4 py-2" onClick={logout}>Logout</button>
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-semibold">Dump Everything</h2>
          <textarea value={rawInput} onChange={(e) => setRawInput(e.target.value)} rows={7} className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-4" placeholder="Deadlines, obligations, fires, ideas... drop it all here." />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <select className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2" value={tone} onChange={(e) => setTone(e.target.value)}>
              {tones.map((t) => <option key={t}>{t}</option>)}
            </select>
            <button onClick={runTriage} disabled={!rawInput.trim() || loadingTriage} className="rounded-lg bg-cyan-400 px-5 py-2 font-semibold text-slate-900 disabled:opacity-70">
              {loadingTriage ? 'Running...' : 'Run Triage'}
            </button>
          </div>
        </section>

        {triage && (
          <section className="mt-6 grid gap-4 md:grid-cols-2">
            {Object.entries(triage).map(([key, items]) => (
              <article key={key} className={`rounded-2xl border p-5 ${sectionStyles[key]}`}>
                <h3 className="text-xl font-semibold capitalize">{key}</h3>
                <ul className="mt-3 space-y-2">
                  {items.map((item, i) => (
                    <li key={`${key}-${i}`} className="group rounded-lg border border-slate-700/60 p-3 hover:border-cyan-500">
                      <button className="text-left" onClick={() => addToToday(item, key)}>
                        {item}
                        <span className="ml-2 text-xs text-cyan-300 opacity-0 transition group-hover:opacity-100">+ Add to Today</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        )}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-semibold">Today</h2>
          <ul className="mt-3 space-y-2">
            {todayTasks.map((task) => (
              <li key={task._id} className="flex items-center gap-3 rounded-lg border border-slate-700 p-3">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task)} />
                <span className={task.completed ? 'text-slate-500 line-through' : ''}>{task.text}</span>
              </li>
            ))}
            {todayTasks.length === 0 && <li className="text-slate-400">No tasks yet. Add from triage.</li>}
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Daily Debrief</h2>
            <button onClick={runDebrief} className="rounded-lg bg-indigo-400 px-5 py-2 font-semibold text-slate-900">Run Debrief</button>
          </div>
          {debrief && <pre className="mt-4 whitespace-pre-wrap text-sm text-slate-200">{debrief}</pre>}
        </section>
      </div>
    </Layout>
  );
};

export default AppPage;
