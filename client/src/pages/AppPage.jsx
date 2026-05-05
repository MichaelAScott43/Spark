import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const personas = [
  { value: 'tj', label: 'TJ' },
  { value: 'arlane', label: 'Arlane' }
];

const AppPage = () => {
  const { logout, user } = useAuth();
  const [persona, setPersona] = useState('tj');
  const [message, setMessage] = useState('');
  const [analysisText, setAnalysisText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [latestInsight, setLatestInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    const [chatRes, analysisRes] = await Promise.all([
      api.get('/chat/history'),
      api.get('/analyses')
    ]);
    setChatHistory(chatRes.data);
    setAnalysisHistory(analysisRes.data);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const { data } = await api.post('/chat', { persona, message });
      setLatestInsight(data.insights);
      setMessage('');
      loadHistory();
    } finally {
      setLoading(false);
    }
  };

  const runTextAnalysis = async () => {
    if (!analysisText.trim()) return;
    const { data } = await api.post('/analyze-text', { text: analysisText });
    setLatestInsight(data.result);
    loadHistory();
  };

  const uploadFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/upload', formData);
    setLatestInsight(data.result);
    loadHistory();
    event.target.value = '';
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">CHIEF OF STAFF AI Dashboard</h1>
            <p className="text-slate-400">Signed in as {user.email}</p>
          </div>
          <button className="rounded-lg border border-slate-700 px-4 py-2" onClick={logout}>Logout</button>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Conversation Interface</h2>
              <div className="flex gap-2">
                {personas.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setPersona(item.value)}
                    className={`rounded-lg px-4 py-2 text-sm ${persona === item.value ? 'bg-cyan-400 text-slate-900' : 'border border-slate-700'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              {chatHistory.length === 0 && <p className="text-slate-400">No conversations yet.</p>}
              {chatHistory.map((entry) => (
                <article key={entry.id} className="rounded-lg border border-slate-700 p-3">
                  <p className="text-xs uppercase tracking-wide text-cyan-300">{entry.persona}</p>
                  <p className="mt-1 text-sm text-slate-300"><strong>You:</strong> {entry.message}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm"><strong>{entry.persona === 'arlane' ? 'Arlane' : 'TJ'}:</strong> {entry.response}</p>
                </article>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
                placeholder="Ask TJ or Arlane for a decision, next step, or risk readout..."
              />
              <button onClick={sendMessage} disabled={loading} className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-900 disabled:opacity-70">
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold">Analysis Results</h2>
            {latestInsight ? (
              <div className="mt-3 space-y-2 text-sm">
                <p><strong>Bid Decision:</strong> {latestInsight.bidDecision}</p>
                <p><strong>Opportunity Score:</strong> {latestInsight.opportunityScore}/100</p>
                <p><strong>Readiness:</strong> {latestInsight.readiness}</p>
                <p><strong>Priority Moves:</strong></p>
                <ul className="list-disc pl-5 text-slate-300">
                  {latestInsight.priorities?.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ) : (
              <p className="mt-3 text-slate-400">Run an analysis or send chat input to populate this panel.</p>
            )}
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold">Opportunity Input</h2>
            <textarea
              value={analysisText}
              onChange={(e) => setAnalysisText(e.target.value)}
              rows={5}
              className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
              placeholder="Paste an RFP summary, opportunity notes, or client email."
            />
            <div className="mt-3 flex items-center gap-3">
              <button onClick={runTextAnalysis} className="rounded-lg bg-indigo-400 px-4 py-2 font-semibold text-slate-900">Analyze Text</button>
              <label className="cursor-pointer rounded-lg border border-slate-700 px-4 py-2 text-sm">
                Upload File
                <input type="file" className="hidden" onChange={uploadFile} />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold">Decision & Conversation Log</h2>
            <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto">
              {analysisHistory.length === 0 && <li className="text-slate-400">No analyses yet.</li>}
              {analysisHistory.map((item) => (
                <li key={item.id} className="rounded-lg border border-slate-700 p-3 text-sm">
                  <p className="text-cyan-300">{new Date(item.createdAt).toLocaleString()}</p>
                  <p>Decision: {item.result.bidDecision} · Score: {item.result.opportunityScore}</p>
                  <p className="text-slate-400">{item.sourcePreview || item.filename}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AppPage;
