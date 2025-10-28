"use client";

import React, { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

interface Usuario {
  position: number;
  name: string;
  xp: number;
  initial: string;
  color?: string;
}

export default function Ranking() {
  const [rankingData, setRankingData] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/ranking") // substitua pela sua rota
      .then((res) => res.json())
      .then((data) => {
        const coloredData = data.map((user: Usuario) => {
          if (user.position === 1) user.color = "bg-yellow-400";
          else if (user.position === 2) user.color = "bg-slate-400";
          else if (user.position === 3) user.color = "bg-orange-400";
          else user.color = "bg-gray-400";
          return user;
        });
        setRankingData(coloredData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar ranking:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando ranking...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white text-black p-6 flex flex-col items-center rounded-xl shadow-md w-full max-w-lg">

        {/* Podium dos 3 primeiros */}
        <div className="flex items-end justify-center gap-4 mb-6 w-full">
          {rankingData.slice(1, 2).map((user) => (
            <div key={user.position} className="flex flex-col items-center">
              <Trophy className="text-slate-300 w-10 h-10" />
              <div className="h-20 w-10 bg-slate-300 rounded-t-lg" />
            </div>
          ))}

          {rankingData.slice(0, 1).map((user) => (
            <div key={user.position} className="flex flex-col items-center">
              <Trophy className="text-yellow-400 w-12 h-12" />
              <div className="h-28 w-10 bg-yellow-400 rounded-t-lg" />
            </div>
          ))}

          {rankingData.slice(2, 3).map((user) => (
            <div key={user.position} className="flex flex-col items-center">
              <Trophy className="text-orange-400 w-10 h-10" />
              <div className="h-16 w-10 bg-orange-400 rounded-t-lg" />
            </div>
          ))}
        </div>

        {/* Informação da posição do usuário */}
        <h1 className="text-xl font-bold mb-4 text-center">
          Você ficou em {rankingData.length >= 17 ? "17º" : "posição"} semana passada
        </h1>

        {/* Lista do ranking completo */}
        <div className="w-full space-y-4">
          {rankingData.map((user) => (
            <div
              key={user.position}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* Avatar e nome */}
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${user.color}`}
                >
                  {user.initial}
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.xp} XP</p>
                </div>
              </div>

              {/* Posição no ranking */}
              <span className="text-lg font-bold">#{user.position}</span>
            </div>
          ))}
        </div>

        {/* Botão para continuar */}
        <button className="mt-6 bg-blue-500 px-6 py-2 rounded font-bold text-white hover:bg-blue-600 transition">
          CONTINUAR
        </button>
      </div>
    </div>
  );
}
