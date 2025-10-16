import React from 'react';

// ===============================
// Componente: ConsultAi
// ===============================
const ConsultAi = () => {
    return (
            <div className="flex items-center justify-center p-4 m-auto">
        {/* ===============================
          Card principal da conta
          =============================== */}
        <div className="bg-white p-6 rounded shadow-md mx-auto">
          {/* ===============================
            Seção: Quem Somos
            =============================== */}
          <section id="sobre" className="mb-6">
            <h2 className="text-xl font-semibold">Quem Somos</h2>
            <p>
              A ConsultAi é uma startup de tecnologia criada na Faculdade de
              Tecnologia (FATEC). Nosso objetivo é desenvolver soluções de
              software inovadoras voltadas para beneficiar a comunidade,
              utilizando tecnologia como ferramenta para transformar vidas.
            </p>
          </section>

          {/* ===============================
            Seção: Missão, Visão e Valores
            =============================== */}
          <section id="missao" className="mb-6">
            <h2 className="text-xl font-semibold">Missão, Visão e Valores</h2>
            <p>
              <strong>Missão:</strong> Facilitar o acesso a soluções
              tecnológicas que promovam impacto social positivo.
            </p>
            <p>
              <strong>Visão:</strong> Ser reconhecida como uma referência em
              tecnologia para a comunidade.
            </p>
            <p>
              <strong>Valores:</strong> Inovação, Ética, Colaboração e
              Compromisso com o Social.
            </p>
          </section>
        </div>
      </div>
    );
}

export default ConsultAi;
