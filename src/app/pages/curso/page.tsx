"use client";

import Footer from "@/app/components/Footer"; // Componente do rodapé
import Topo from "@/app/components/Topo";     // Componente do topo/navegação
import Questao from "@/app/components/Questao"; // Componente de questão do curso

export default function Curso() {
    return (
        <>
            {/* ===========================
          Container principal da página
          =========================== */}
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: "url('/img/backgroundteste1.png')", // Imagem de fundo
                    backgroundColor: "#f3f4f6",                           // Cor de fundo alternativa
                }}
            >
                {/* ===========================
            Container relativo para z-index
            =========================== */}
                <div className="relative z-10">

                    {/* Topo / Barra de navegação */}
                    <Topo/>

                    {/* Área principal do curso */}
                    <main className="min-h-screen bg-transparent">
                        <Questao/>
                    </main>

                    {/* Rodapé */}
                    <Footer/>
                </div>
            </div>
        </>
    );
}
