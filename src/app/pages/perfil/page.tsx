import Footer from "@/app/components/Footer";       // Componente do rodapé
        // Estilos específicos da página de perfil
import Topo from "@/app/components/Topo";         // Componente do topo/navegação
import Link from "next/link";                     // Componente para navegação entre páginas
import Image from "next/image";
import ExperienceBar from "@/app/components/ExperienceBar";

export default function PerfilPage() {
  return (
    <>
      {/* ===========================
          Container principal da página
          =========================== */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/img/backgroundteste1.png')", // Imagem de fundo
          backgroundColor: "#f3f4f6", // Cor de fundo alternativa
        }}
      >
        {/* ===========================
            Container relativo para z-index
            =========================== */}
        <div className="relative z-0">
          {/* ===========================
              Estrutura principal da página
              =========================== */}
          <div className="flex flex-col min-h-screen ">
            {/* Topo / Barra de navegação */}
            <Topo />
            {/* Área de conteúdo principal */}
            <div className="pt-3 max-w-screen max-w-6xl ml-25 mr-10 px-25 bg-white mt-4">
              {/* Imagem do personagem */}
              <div className="text-3xl p-3 rounded-xl">
                <Image
                  className="mx-auto"
                  src="/img/personagem.png"
                  alt="Imagem do personagem Guerreiro"
                  width={90}
                  height={90}
                />
              </div>

              {/* Nome do personagem */}
              <div className="character">
                <p>Guerreiro</p>
              </div>
              {/* Barra de Experiência */}
              <div className="mx-20">
                <ExperienceBar 
                  currentLevel={10}   //userData.level
                  currentXp={1200}      //userData.xp
                  xpToNextLevel={1500}  //userData.xpRequired
                />
              </div>

              {/* Botões de navegação do perfil */}
              <div className="buttons-container">
                <Link className="blue-btn" href={"/pages/dadosPessoais"}>
                  DADOS PESSOAIS
                </Link>
                <Link className="blue-btn" href={"/pages/progresso"}>
                  PROGRESSO
                </Link>
                <Link className="blue-btn" href={"/pages/meusCursos"}>
                  CURSOS FAVORITOS
                </Link>
                <Link className="blue-btn" href={"/pages/conquistas"}>
                  CONQUISTAS
                </Link>
                <Link className="blue-btn" href={"/pages/conta"}>
                  CONTA
                </Link>
              </div>
            </div>
            
            
          </div>
          {/* Rodapé */}
          <Footer />
        </div>
      </div>
    </>
  );
}


