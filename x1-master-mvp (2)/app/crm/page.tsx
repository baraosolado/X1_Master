'use client';
import { useState, useEffect } from 'react';

const initialData = {
  'Novo': [],
  'Contato Feito': [],
  'Negociação': [],
  'Fechado': []
};

export default function CRM() {
  const [leads, setLeads] = useState<{ [key: string]: any[] }>(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nome: '', telefone: '', interesse: '' });

  useEffect(() => {
    const stored = localStorage.getItem('leads');
    if (stored) setLeads(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(leads));
  }, [leads]);

  const addLead = () => {
    const novoLead = { ...form, id: Date.now() };
    setLeads(prev => ({ ...prev, 'Novo': [...prev['Novo'], novoLead] }));
    setForm({ nome: '', telefone: '', interesse: '' });
    setModalOpen(false);
  };

  const moveLead = (id: number, from: string, to: string) => {
    const lead = leads[from].find(l => l.id === id);
    if (!lead) return;
    setLeads(prev => ({
      ...prev,
      [from]: prev[from].filter(l => l.id !== id),
      [to]: [...prev[to], lead]
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">CRM de Leads</h2>
      <button onClick={() => setModalOpen(true)} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">+ Novo Lead</button>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(leads).map(([coluna, items]) => (
          <div key={coluna} className="bg-gray-100 rounded p-2 shadow">
            <h3 className="font-semibold text-lg mb-2">{coluna}</h3>
            {items.map(lead => (
              <div key={lead.id} className="bg-white p-2 rounded mb-2 shadow text-sm">
                <p><strong>{lead.nome}</strong></p>
                <p>📞 {lead.telefone}</p>
                <p>🎯 {lead.interesse}</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {Object.keys(leads).filter(c => c !== coluna).map(c => (
                    <button key={c} onClick={() => moveLead(lead.id, coluna, c)} className="text-xs bg-purple-500 text-white px-2 py-1 rounded">
                      Mover para {c}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h4 className="text-lg font-bold mb-4">Novo Lead</h4>
            <input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Nome" className="input" />
            <input value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} placeholder="Telefone" className="input" />
            <input value={form.interesse} onChange={e => setForm({ ...form, interesse: e.target.value })} placeholder="Interesse" className="input" />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
              <button onClick={addLead} className="px-4 py-2 bg-green-600 text-white rounded">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}