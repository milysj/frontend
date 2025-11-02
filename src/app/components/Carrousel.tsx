"use client";

import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";


interface Trilha {
  _id: string;
  titulo: string;
  descricao: string;
  materia: string;
  dificuldade: string;
  image?: string;
  faseSelecionada?: number;
  fase?: string;
  dataCriacao?: string;
  dataTermino?: string;
}

interface Props {
  items?: Trilha[]; // Pode ser undefined ou array vazio
  onClick?: (id: string) => void;
}

export default function Carrousel({ items = [], onClick }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState<'small' | 'medium' | 'large'>('large');
  const [cardWidth, setCardWidth] = useState('15rem');
  const [scrollAmount, setScrollAmount] = useState(300);


  // 🔹 Mapeamento entre número da fase e imagem
const fases: Record<number, { nome: string; img: string }> = {
  1: { nome: "Castelo", img: "/img/fases/castelo.jpg" },
  2: { nome: "Vila", img: "/img/fases/vila.jpg" },
  3: { nome: "Montanha", img: "/img/fases/montanha.jpg" },
  4: { nome: "Deserto", img: "/img/fases/deserto.jpg" },
};

  // Detecta tamanho da tela e ajusta cards
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 400) { setScreenSize('small'); setCardWidth('11rem'); setScrollAmount(190); }
      else if (width < 768) { setScreenSize('medium'); setCardWidth('13rem'); setScrollAmount(225); }
      else { setScreenSize('large'); setCardWidth('15rem'); setScrollAmount(300); }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft === 0) {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth - 1) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const isMobile = screenSize !== 'large';
  const isSmall = screenSize === 'small';

  if (items.length === 0) {
    return <p className="text-center text-gray-500 py-6">Nenhuma trilha encontrada.</p>;
  }

  return (
    <div className={`flex flex-col items-center gap-4 rounded-xl w-full mx-auto ${isMobile ? 'p-2' : 'p-4'}`}>
      <div className="flex items-center gap-2 w-full">
        <button onClick={handleScrollLeft} className={`shrink-0 hover:bg-sky-50 rounded ${isSmall ? 'p-0.5' : isMobile ? 'p-1' : 'p-3'}`}>
          <ChevronLeftIcon className={isSmall ? 'w-5 h-5' : isMobile ? 'w-6 h-6' : 'w-10 h-10'} />
        </button>

        <div ref={scrollRef} className={`flex overflow-x-auto no-scrollbar scroll-smooth w-full py-2 ${isSmall ? 'gap-2' : 'gap-4'}`}>
          {items.map((item) => (
            <div
              key={item._id}
              className="shrink-0 w-full rounded-lg border bg-white shadow hover:shadow-lg cursor-pointer transition"
              style={{ minWidth: cardWidth, maxWidth: cardWidth }}
              onClick={() => onClick?.(item._id)}
            >
            {/* Imagem da fase */}
            <img
              src={fases[item.faseSelecionada || 1]?.img || "/img/fases/default.jpg"}
              alt={fases[item.faseSelecionada || 1]?.nome || "Fase"}
              className="w-full h-32 object-cover rounded-t-lg"
            />

              <div className="p-3">
                <h3 className="text-base font-bold">{item.titulo}</h3>
                <p className="text-sm text-gray-600">{item.descricao}</p>

                <p className="text-xs mt-1 text-gray-500">
                  Matéria: <b>{item.materia}</b> | Dificuldade: <b>{item.dificuldade}</b>
                </p>

                {/* Datas */}
                <div className="mt-2 text-xs text-gray-400">
                  {item.dataCriacao && <p>Criada: {new Date(item.dataCriacao).toLocaleDateString("pt-BR")}</p>}
                  {item.dataTermino && <p>Finaliza: {new Date(item.dataTermino).toLocaleDateString("pt-BR")}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleScrollRight} className={`shrink-0 hover:bg-sky-50 rounded ${isSmall ? 'p-0.5' : isMobile ? 'p-1' : 'p-3'}`}>
          <ChevronRightIcon className={isSmall ? 'w-5 h-5' : isMobile ? 'w-6 h-6' : 'w-10 h-10'} />
        </button>
      </div>
    </div>
  );
}
