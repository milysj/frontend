"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";





interface Fase {
  _id?: string;
  titulo: string;
  descricao: string;
}

export default function GerenciarFases() {
  

  const searchParams = useSearchParams();
  const titulo = searchParams.get('titulo');
  const trilhaId = searchParams.get("trilhaId");

  const [fases, setFases] = useState<Fase[]>([]);
  const [novaFase, setNovaFase] = useState({ titulo: "", descricao: "" });

  useEffect(() => {
    if (!trilhaId) return;

    const fetchFases = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/fases/trilha/${trilhaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFases(data);
    };
    fetchFases();
  }, [trilhaId]);

  const criarFase = async () => {
    if (!trilhaId) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/fases/${trilhaId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(novaFase),
    });
    const data = await res.json();
    setFases([...fases, data]);
    setNovaFase({ titulo: "", descricao: "" });
  };

  const deletarFase = async (id: string) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/fases/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setFases(fases.filter((f) => f._id !== id));
  };

  if (!trilhaId) return <p>Erro: Nenhuma trilha selecionada!</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Fases da Trilha</h1>

      {/* Criar nova fase */}
      <div className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          placeholder="Título da fase"
          value={novaFase.titulo}
          onChange={(e) => setNovaFase({ ...novaFase, titulo: e.target.value })}
          className="border rounded p-2"
        />
        <textarea
          placeholder="Descrição"
          value={novaFase.descricao}
          onChange={(e) => setNovaFase({ ...novaFase, descricao: e.target.value })}
          className="border rounded p-2"
        />
        <Button onClick={criarFase}>Criar Fase</Button>
      </div>

      {/* Lista de fases */}
      <div className="grid gap-4">
        {fases.map((fase) => (
          <div key={fase._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h2 className="font-bold">{fase.titulo}</h2>
              <p>{fase.descricao}</p>
            </div>
            <Button variant="destructive" onClick={() => deletarFase(fase._id!)}>
              Deletar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
