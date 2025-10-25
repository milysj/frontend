"use client";

import Link from "next/link";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

// Dados do carrossel
const items = [
  {
    id: 1,
    title: "Português",
    image: "../img/port.png",
    description: "Substantivo",
  },
  {
    id: 2,
    title: "História",
    image: "../img/hist.png",
    description: "Nosso país",
  },
  {
    id: 3,
    title: "Banco de dados",
    image: "../img/bd.png",
    description: "Banco de dados relacional",
  },
  {
    id: 4,
    title: "Matemática",
    image: "../img/mate.png",
    description: "Logaritmo",
  },
  {
    id: 5,
    title: "Geografia",
    image: "../img/geo.png",
    description: "Paises americanos",
  },
  {
    id: 6,
    title: "Ciências",
    image: "../img/cienc.png",
    description: "Biologia",
  },
];

// Componente do item individual
function CarouselItem({ item, cardWidth }: { item: (typeof items)[0], cardWidth: string }) {
  return (
    <Link href={`/pages/trilha?id=${item.id}`}>
      <Card style={{ width: cardWidth, minWidth: cardWidth }}>
        <Card.Img
          variant="top"
          src={item.image}
          alt={item.title}
          className="mx-auto max-w-30 max-h-24 min-w-28 min-h-24 object-contain my-2 rounded-xl"
        />
        <Card.Body>
          <Card.Title className="text-base">{item.title}</Card.Title>
          <Card.Text className="text-sm">{item.description}</Card.Text>
          <Button variant="primary" size="sm">Clique para entrar</Button>
        </Card.Body>
      </Card>
    </Link>
  );
}

// Componente do Carrossel
function Carrousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState<'small' | 'medium' | 'large'>('large');
  const [cardWidth, setCardWidth] = useState('15rem');
  const [scrollAmount, setScrollAmount] = useState(300);

  // Detectar tamanho da tela e ajustar cards
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      
      if (width < 400) {
        setScreenSize('small');
        setCardWidth('11rem'); // 176px
        setScrollAmount(190); // card width + gap
      } else if (width < 768) {
        setScreenSize('medium');
        setCardWidth('13rem'); // 208px
        setScrollAmount(225); // card width + gap
      } else {
        setScreenSize('large');
        setCardWidth('15rem'); // 240px
        setScrollAmount(300); // card width + gap
      }
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Função para mover o carrossel para a esquerda com loop
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft === 0) {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // Função para mover o carrossel para a direita com loop
  const handleScrollRight = () => {
    if (scrollRef.current) {
      if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth - 1
      ) {
        scrollRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const isMobile = screenSize !== 'large';
  const isSmall = screenSize === 'small';

  return (
    <div className={`flex flex-col items-center gap-4 rounded-xl w-full mx-auto ${isMobile ? 'p-2' : 'p-4'}`}>
      {/* Barra de navegação do carrossel */}
      <div className="flex items-center gap-2 w-full">
        {/* Botão de scroll para a esquerda */}
        <button
          onClick={handleScrollLeft}
          title="Scroll para a esquerda"
          className={`flex-shrink-0 hover:bg-sky-50 rounded ${isSmall ? 'p-0.5' : isMobile ? 'p-1' : 'p-3'}`}
        >
          <ChevronLeftIcon className={isSmall ? 'w-5 h-5' : isMobile ? 'w-6 h-6' : 'w-10 h-10'} />
        </button>

        {/* Container com scroll horizontal */}
        <div
          ref={scrollRef}
          className={`flex overflow-x-auto no-scrollbar scroll-smooth w-full py-2 ${isSmall ? 'gap-2' : 'gap-4'}`}
        >
          {items.map((item) => (
            <CarouselItem key={item.id} item={item} cardWidth={cardWidth} />
          ))}
        </div>

        {/* Botão de scroll para a direita */}
        <button
          title="Scroll para a direita"
          onClick={handleScrollRight}
          className={`flex-shrink-0 hover:bg-sky-50 rounded ${isSmall ? 'p-0.5' : isMobile ? 'p-1' : 'p-3'}`}
        >
          <ChevronRightIcon className={isSmall ? 'w-5 h-5' : isMobile ? 'w-6 h-6' : 'w-10 h-10'} />
        </button>
      </div>
    </div>
  );
}

export default Carrousel;