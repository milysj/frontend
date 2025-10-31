"use client";

import { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import Topo from "@/app/components/Topo";
import Link from "next/link";
import Image from "next/image";
import ExperienceBar from "@/app/components/ExperienceBar";

// interface UserData {
//   username: string;
//   nivel: number;
//   xp: number;
//   xpProximoNivel: number;
//   avatarUrl: string;
// }

export default function PerfilPage() {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:5000/api/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error("Erro ao buscar dados do usuário");
//         const data = await res.json();
//         setUserData(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) return <p>Carregando...</p>;
//   if (!userData) return <p>Erro ao carregar dados do usuário.</p>;

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/img/backgroundteste1.png')",
          backgroundColor: "#f3f4f6",
        }}
      >
        <div className="relative z-0">
          <div className="flex flex-col min-h-screen">
            <Topo />

            <div className="pt-3 max-w-screen max-w-6xl ml-25 mr-10 px-25 bg-white mt-4">
              {/* Imagem do personagem */}
              <div className="text-3xl p-3 rounded-xl">
                <Image
                  className="mx-auto"
                  src="/img/guerreiro.png"
                  alt="Imagem do personagem Guerreiro"
                  // src={userData.avatarUrl}
                  // alt={`Imagem do personagem ${userData.username}`}
                  width={90}
                  height={90}
                />
              </div>

              {/* Nome do personagem */}
              <div className="character">
                 <p>Guerreiro</p>
                {/* <p>{userData.username}</p> */}
              </div>

              {/* Barra de Experiência */}
              <div className="mx-20">
                <ExperienceBar
                   currentLevel={10}   //userData.level
                  currentXp={1200}      //userData.xp
                  xpToNextLevel={1500}  //userData.xpRequired
                  // currentLevel={userData.nivel}
                  // currentXp={userData.xp}
                  // xpToNextLevel={userData.xpProximoNivel}
                />
              </div>

              {/* Botões de navegação do perfil */}
              <div className="buttons-container">
                <Link className="blue-btn" href={"/pages/dadosPessoais"}>
                  DADOS PESSOAIS
                </Link>
                <Link className="blue-btn" href={"/pages/conta"}>
                  CONTA
                </Link>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}