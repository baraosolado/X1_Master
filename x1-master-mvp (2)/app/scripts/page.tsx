'use client';
import { useState } from 'react';

export default function ScriptsPage() {
  const [nicho, setNicho] = useState('');
  const [tipoLead, setTipoLead] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [resultado, setResultado] = useState('');

  const gerarScript = async () => {
    const prompt = `Gere uma abordagem de vendas no WhatsApp para o nicho ${nicho}, lead ${tipoLead}, com objetivo de ${objetivo}`;
    const res = await fetch('/api/gerar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setResultado(data.resultado);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gerador de Script</h2>
      <input type="text" placeholder="Nicho" className="input mb-2" value={nicho} onChange={e => setNicho(e.target.value)} />
      <input type="text" placeholder="Tipo de Lead" className="input mb-2" value={tipoLead} onChange={e => setTipoLead(e.target.value)} />
      <input type="text" placeholder="Objetivo" className="input mb-4" value={objetivo} onChange={e => setObjetivo(e.target.value)} />
      <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={gerarScript}>Gerar</button>
      {resultado && <div className="mt-4 p-4 bg-white border rounded shadow"><p>{resultado}</p></div>}
    </div>
  );
}