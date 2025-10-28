"use client";

import Carrousel from "@/app/components/Carrousel";
import Footer from "@/app/components/Footer";
import Topo from "@/app/components/Topo";
import Script from "next/script";
import { useState, useEffect } from "react";

export default function MenuTrilhas() {
  const [isMobile, setIsMobile] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [continueTrilhas, setContinueTrilhas] = useState<any[]>([]);
  const [novidades, setNovidades] = useState<any[]>([]);
  const [populares, setPopulares] = useState<any[]>([]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 992);
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    // Buscar trilhas do usuário
    fetch("http://localhost:5000/api/trilhas/continue", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setContinueTrilhas)
      .catch(console.error);

    // Novidades
    fetch("http://localhost:5000/api/trilhas/novidades")
      .then(res => res.json())
      .then(setNovidades)
      .catch(console.error);

    // Populares
    fetch("http://localhost:5000/api/trilhas/populares")
      .then(res => res.json())
      .then(setPopulares)
      .catch(console.error);
  }, [token]);

  return (
    <>
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "tvolq13xii");`}
      </Script>

      <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/img/backgroundteste1.png')", backgroundColor: '#f3f4f6' }}>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Topo />

          {token && continueTrilhas.length > 0 && (
            <Section title="Continue" isMobile={isMobile}>
              <Carrousel items={continueTrilhas} />
            </Section>
          )}

          <Section title="Novidades" isMobile={isMobile}>
            <Carrousel items={novidades} />
          </Section>

          <Section title="Melhores para você" isMobile={isMobile}>
            <Carrousel items={populares} />
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
