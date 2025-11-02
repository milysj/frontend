"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function EditarPersonagem() {
  const [usuario, setUsuario] = useState<any>(null);
  const [classeSelecionada, setClasseSelecionada] = useState("");
  const [skinSelecionada, setSkinSelecionada] = useState("");

  // opções de classe
  const classes = [
    { nome: "Guerreiro", imagem: "/img/guerreiro.png" },
    { nome: "Mago", imagem: "/img/mago.png" },
    { nome: "Samurai", imagem: "/img/samurai.png" },
  ];

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/usuarios/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsuario(data);
        setClasseSelecionada(data.classe || "");
        setSkinSelecionada(data.skin || "");
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };
    fetchUsuario();
  }, []);

  const salvarPersonalizacao = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/usuarios/personalizar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            personagem: classeSelecionada,
            fotoPerfil: skinSelecionada, // opcional
        }),
        });

      if (!res.ok) throw new Error("Erro ao salvar personalização");
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar alterações.");
    }
  };

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">🎨 Personalizar Perfil</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Escolha sua Classe</h2>
        <div className="grid grid-cols-3 gap-6 mb-8">
          {classes.map((classe) => (
            <div
              key={classe.nome}
              onClick={() => {
                setClasseSelecionada(classe.nome);
                setSkinSelecionada(classe.imagem);
              }}
              className={`cursor-pointer border-4 rounded-xl p-4 flex flex-col items-center transition ${
                classeSelecionada === classe.nome
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image src={classe.imagem} alt={classe.nome} width={100} height={100} />
              <p className="mt-2 font-semibold">{classe.nome}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Prévia da Skin</h2>
        {skinSelecionada ? (
          <div className="flex flex-col items-center mb-8">
            <Image src={skinSelecionada} alt="Skin selecionada" width={150} height={150} />
            <p className="mt-2 text-gray-700">Classe: {classeSelecionada}</p>
          </div>
        ) : (
          <p className="text-gray-500">Selecione uma classe para visualizar sua skin.</p>
        )}

        <Button onClick={salvarPersonalizacao} className="bg-indigo-600 hover:bg-indigo-700">
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
