"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Topo from "@/app/components/Topo";
import Footer from "@/app/components/Footer";
import Carrousel from "@/app/components/Carrousel";

interface Trilha {
  _id: string;
  titulo: string;
  descricao: string;
  materia: string;
  dificuldade: string;
  image?: string;
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const [continueTrilhas, setContinueTrilhas] = useState<Trilha[]>([]);
  const [novidades, setNovidades] = useState<Trilha[]>([]);
  const [populares, setPopulares] = useState<Trilha[]>([]);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Ler token do localStorage no client
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  // Carregar trilhas do backend
  useEffect(() => {
    // Novidades
    fetch("http://localhost:5000/api/trilhas/novidades")
      .then((res) => res.json())
      .then((data) => setNovidades(data || []))
      .catch(console.error);

    // Populares
    fetch("http://localhost:5000/api/trilhas/populares")
      .then((res) => res.json())
      .then((data) => setPopulares(data || []))
      .catch(console.error);

    // Continue (trilhas do usuário)
    if (token) {
      fetch("http://localhost:5000/api/trilhas/continue", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setContinueTrilhas(data || []))
        .catch(console.error);
    }
  }, [token]);

  const handleTrilhaClick = (id: string) => {
    if (!token) return;
    fetch(`http://localhost:5000/api/trilhas/visualizar/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).catch(console.error);
  };

  return (
    <>
      {/* Microsoft Clarity Script */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "tvolq13xii");
        `}
      </Script>

      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/img/backgroundteste1.png')", backgroundColor: '#f3f4f6' }}
      >
        <div className="relative z-10 flex flex-col min-h-screen">
          <Topo />

          <Section title="Continue" isMobile={isMobile}>
            <Carrousel items={continueTrilhas} onClick={handleTrilhaClick} />
          </Section>

          <Section title="Novidades" isMobile={isMobile}>
            <Carrousel items={novidades} onClick={handleTrilhaClick} />
          </Section>

          <Section title="Melhores para você" isMobile={isMobile}>
            <Carrousel items={populares} onClick={handleTrilhaClick} />
          </Section>

          <Footer />
        </div>
      </div>
    </>
  );
}

function Section({ title, children, isMobile }: { title: string; children: React.ReactNode; isMobile: boolean }) {
  return (
    <div className={`pt-6 w-full ${isMobile ? 'px-4' : 'max-w-6xl mx-auto px-24'}`}>
      <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} p-4 rounded-xl font-bold text-gray-800 bg-white bg-opacity-80 backdrop-blur-sm`}>
        {title}
      </div>
      {children}
    </div>
  );
}
