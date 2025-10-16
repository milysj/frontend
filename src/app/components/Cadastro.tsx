"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";

type UsuarioTipo = "ALUNO" | "PROFESSOR";

const Cadastrar = () => {
  const [tipoUsuario, setTipoUsuario] = useState<UsuarioTipo | "">("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [registro, setRegistro] = useState("");
  const [titulacao, setTitulacao] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenhas, setMostrarSenhas] = useState(false);
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    if (!tipoUsuario) {
      setErro("Selecione o tipo de usuário.");
      return;
    }
    if (!username) {
      setErro("O username é obrigatório.");
      return;
    }
    if (!dataNascimento) {
      setErro("A data de nascimento é obrigatória.");
      return;
    }

    try {
      const dados: any = {
        usuarioNome: nome,
        usuarioEmail: email,
        usuarioUserName: username,
        usuarioDataNascimento: dataNascimento,
        usuarioSenha: senha,
        usuarioTipo: tipoUsuario,
        usuarioAutobiografia: "",
        usuarioPontuacao: 0,
      };

      if (tipoUsuario === "PROFESSOR") {
        dados.registro = registro;
        dados.titulacao = titulacao;
      }

      const res = await fetch(
        "http://backend-node-estudemy.vercel.app/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErro(data.mensagem || "Erro no cadastro");
        return;
      }

      setSucesso("Usuário cadastrado com sucesso!");
      console.log("Usuário cadastrado:", data);
      window.location.href = "/pages/login";
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  const handleTipoUsuarioChange = (tipo: UsuarioTipo) => {
    setTipoUsuario(tipo);
    // Limpar os campos ao trocar o tipo de usuário
    setNome("");
    setEmail("");
    setUsername("");
    setDataNascimento("");
    setSenha("");
    setConfirmarSenha("");
    setRegistro("");
    setTitulacao("");
    setErro("");
    setSucesso("");
  };

  const camposComuns = (
    <>
      <div className="flex flex-col">
        <label className="text-sm text-left">Nome Completo:</label>
        <input
          type="text"
          placeholder="Seu nome completo"
          className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-left">Email:</label>
        <input
          type="email"
          placeholder="Seu email"
          className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-left">Username:</label>
        <input
          type="text"
          placeholder="Escolha um username"
          className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-left">Data de Nascimento:</label>
        <input
          type="date"
          className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
          required
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
      </div>
    </>
  );

  const camposSenha = (
    <>
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-left">Senha:</label>
        <input
          type={mostrarSenhas ? "text" : "password"}
          placeholder="Digite sua senha"
          className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-left">Confirme a senha:</label>
        <input
          type={mostrarSenhas ? "text" : "password"}
          placeholder="Repita sua senha"
          className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
          required
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
      </div>
    </>
  );

  const camposProfessor = (
    <>
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-left">Registro Profissional:</label>
        <input
          type="text"
          placeholder="Número do registro"
          className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
          required
          value={registro}
          onChange={(e) => setRegistro(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-left">Titulação:</label>
        <select
          className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
          required
          value={titulacao}
          onChange={(e) => setTitulacao(e.target.value)}
        >
          <option value="">Selecione a titulação</option>
          <option value="Graduacao">Graduação</option>
          <option value="Especializacao">Especialização</option>
          <option value="Mestrado">Mestrado</option>
          <option value="Doutorado">Doutorado</option>
          <option value="PosDoutorado">Pós-Doutorado</option>
        </select>
      </div>
    </>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 relative bg-cover bg-center"
      style={{
        backgroundImage: `url('/img/background-image-login-register.png')`,
      }}
    >
      {/* ✅ ALTERAÇÃO PRINCIPAL: Largura dinâmica e transição suave */}
      <div
        className={`w-full p-6 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out ${
          tipoUsuario === "PROFESSOR" ? "max-w-4xl" : "max-w-md"
        }`}
      >
        <div className="mb-6 flex justify-center">
          <Image
            width={400}
            height={128}
            src="/svg/EstudeMyLogo.svg"
            alt="Logo"
          />
        </div>

        <div className="mb-6">
          <h5 className="text-lg font-semibold mb-3 text-center text-gray-800">
            Selecione o tipo de cadastro:
          </h5>
          <div className="flex gap-4 justify-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="tipoUsuario"
                value="ALUNO"
                checked={tipoUsuario === "ALUNO"}
                onChange={() => handleTipoUsuarioChange("ALUNO")}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Aluno</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="tipoUsuario"
                value="PROFESSOR"
                checked={tipoUsuario === "PROFESSOR"}
                onChange={() => handleTipoUsuarioChange("PROFESSOR")}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Professor</span>
            </label>
          </div>
        </div>

        {tipoUsuario && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {tipoUsuario === "PROFESSOR" ? (
              // Layout de 2 colunas para professor
              (<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                <div className="flex flex-col gap-3">{camposComuns}</div>
                <div className="flex flex-col gap-3">
                  {camposProfessor}
                  {camposSenha}
                </div>
              </div>)
            ) : (
              // Layout de 1 coluna para aluno
              (<div className="flex flex-col gap-3">
                {camposComuns}
                {camposSenha}
              </div>)
            )}

            <Button type="submit" variant="primary" className="mt-2">
              Cadastrar {tipoUsuario === "ALUNO" ? "Aluno" : "Professor"}
            </Button>

            {erro && <p className="text-red-600 text-sm text-center">{erro}</p>}
            {sucesso && (
              <p className="text-green-600 text-sm text-center">{sucesso}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Cadastrar;
