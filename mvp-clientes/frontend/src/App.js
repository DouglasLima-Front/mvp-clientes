import { useEffect, useState } from "react";
import axios from "axios";

function App() {

const [clientes, setClientes] = useState([]);
const [nome, setNome] = useState("");
const [telefone, setTelefone] = useState("");
const [busca, setBusca] = useState("");
const [idEdicao, setIdEdicao] = useState(null);


const [locatario, setLocatario] = useState(false);
const [placaMoto, setPlacaMoto] = useState("");
const [observacoes, setObservacoes] = useState("");

const API = "https://mvp-clientes-1.onrender.com/clientes";

const carregarClientes = async () => {
try {
const response = await axios.get(API);
setClientes(response.data);
} catch (error) {
console.error(error);
}
};

const salvarCliente = async () => {
try {


  if (!nome || !telefone) {
    alert("Preencha todos os campos!");
    return;
  }

  if (idEdicao) {

await axios.put(`${API}/${idEdicao}`, {
  nome,
  telefone,
  locatario,
  placaMoto,
  observacoes
});

    alert("Cliente atualizado com sucesso!");

    setIdEdicao(null);

  } else {

await axios.post(API, {
  nome,
  telefone,
  locatario,
  placaMoto,
  observacoes
});

    alert("Cliente cadastrado com sucesso!");
  }

  setNome("");
  setTelefone("");
  setLocatario(false);
  setPlacaMoto("");
  setObservacoes("");

  carregarClientes();

} catch (error) {
  console.error(error);
  alert("Erro ao salvar cliente.");
}


};

const editarCliente = (cliente) => {
setIdEdicao(cliente.id);
setNome(cliente.nome);
setTelefone(cliente.telefone);
setLocatario(cliente.locatario || false);
setPlacaMoto(cliente.placaMoto || "");
setObservacoes(cliente.observacoes || "");
};

const excluirCliente = async (id) => {


const confirmar = window.confirm(
  "Deseja realmente excluir este cliente?"
);

if (!confirmar) {
  return;
}

try {

  await axios.delete(`${API}/${id}`);

  alert("Cliente excluído com sucesso!");

  carregarClientes();

} catch (error) {
  console.error(error);
  alert("Erro ao excluir cliente.");
}


};

useEffect(() => {
carregarClientes();
}, []);

const clientesFiltrados = clientes.filter(cliente =>
cliente.nome.toLowerCase().includes(busca.toLowerCase())
);

const formatarTelefone = (telefone) => {
  if (!telefone) return "";

  telefone = telefone.replace(/\D/g, "");

  if (telefone.length === 11) {
    return telefone.replace(
      /(\d{2})(\d{5})(\d{4})/,
      "($1) $2-$3"
    );
  }

  return telefone;
};

return (
<div
style={{
maxWidth: "1000px",
  margin: "40px auto",
  padding: "25px",
  borderRadius: "15px",
  fontFamily: "Arial",
  background: "#F8FAFC",
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
}}
>


  <div
  style={{
    background: "linear-gradient(135deg, #111827, #1E3A8A)",
    color: "white",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "20px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
  }}
>
  <img
    src="/logo-locavibe.png.png"
    alt="Locavibe"
    style={{
      width: "220px",
      marginBottom: "10px"
    }}
  />

  <h1> 🏍️ Sistema de Gestão de Clientes</h1>

  <p>
    Controle de Clientes e Locatários de Motocicletas
  </p>
</div>

  <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap"
  }}
>

  <div
    style={{
      background: "#2563EB",
      color: "white",
      padding: "15px",
      borderRadius: "10px",
      width: "180px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      transition: "0.3s",
      cursor: "pointer"
    }}
  >
    <strong>Total</strong>
    <br />
    {clientes.length}
  </div>

  <div
    style={{
      background: "#16A34A",
      color: "white",
      padding: "15px",
      borderRadius: "10px",
      width: "180px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      transition: "0.3s",
      cursor: "pointer"
    }}
  >
    <strong>Locatários</strong>
    <br />
    {clientes.filter(c => c.locatario).length}
  </div>

  <div
    style={{
      background: "#DC2626",
      color: "white",
      padding: "15px",
      borderRadius: "10px",
      width: "180px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      transition: "0.3s",
      cursor: "pointer"
    }}
  >
    <strong>Não Locatários</strong>
    <br />
    {clientes.filter(c => !c.locatario).length}
  </div>

</div>

  <input
    placeholder=" 🔍 Buscar cliente"
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
    style={{
        width: "100%",
        padding: "12px",
        marginBottom: "10px",
        boxSizing: "border-box",
        borderRadius: "8px",
        border: "1px solid #d1d5db"
    }}
  />

  <input
    placeholder="Nome"
    value={nome}
    onChange={(e) => setNome(e.target.value)}
    style={{
        width: "100%",
        padding: "12px",
        marginBottom: "10px",
        boxSizing: "border-box",
        borderRadius: "8px",
        border: "1px solid #d1d5db"
    }}
  />

  <input
    placeholder="Telefone"
    value={telefone}
    onChange={(e) => setTelefone(e.target.value)}
    style={{
       width: "100%",
       padding: "12px",
       marginBottom: "10px",
       boxSizing: "border-box",
       borderRadius: "8px",
       border: "1px solid #d1d5db"
    }}
  />

  <div style={{ marginBottom: "15px" }}>

    <strong>É locatário de moto?</strong>

    <br /><br />

    <label>
      <input
        type="radio"
        checked={locatario === true}
        onChange={() => setLocatario(true)}
      />
      Sim
    </label>

    <label style={{ marginLeft: "20px" }}>
      <input
        type="radio"
        checked={locatario === false}
        onChange={() => setLocatario(false)}
      />
      Não
    </label>

  </div>

  {locatario && (
    <input
      placeholder="Placa da Moto"
      value={placaMoto}
      onChange={(e) =>
        setPlacaMoto(e.target.value.toUpperCase())
      }
      style={{
           width: "100%",
          padding: "12px",
          marginBottom: "10px",
          boxSizing: "border-box",
          borderRadius: "8px",
          border: "1px solid #d1d5db"
      }}
    />
  )}

  <textarea
  placeholder="Observações"
  value={observacoes}
  onChange={(e) => setObservacoes(e.target.value)}
  rows="4"
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    boxSizing: "border-box",
    borderRadius: "8px",
    border: "1px solid #d1d5db"
  }}
/>

  <button
  onClick={salvarCliente}
  style={{
    padding: "14px 25px",
    cursor: "pointer",
    background:
      "linear-gradient(135deg,#2563EB,#1D4ED8)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    boxShadow:
      "0 4px 12px rgba(37,99,235,0.3)"
  }}
>
  {idEdicao
    ? "Atualizar Cliente"
    : "Salvar Cliente"}
</button>

  <hr />

  <h3>Total de clientes: {clientesFiltrados.length}</h3>

  {clientesFiltrados.map((cliente) => (
    <div
      key={cliente.id}
      style={{
        background: "#FFFFFF",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  border: "none",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "12px",
  borderLeft: cliente.locatario
    ? "5px solid #16A34A"
    : "5px solid #DC2626"
      }}
    >
      <strong>{cliente.nome}</strong>

      <br />

      {formatarTelefone(cliente.telefone)}

      <br />

<strong>Status:</strong>{" "}
{cliente.locatario
  ? "🟢 Locatário"
  : "🔴 Não Locatário"}

      {cliente.locatario && (
        <>
          <br />
          <strong>🏍️ Placa:</strong> {cliente.placaMoto}
        </>
      )}

{cliente.observacoes && (
  <>
    <br />
    <strong>Observações:</strong>
    <br />
    {cliente.observacoes}
  </>
)}

{cliente.dataCadastro && (
  <>
    <br />
    <strong>Cadastro:</strong> {cliente.dataCadastro}
  </>
)}

      <br /><br />

      <button></button>
  onClick={() => editarCliente(cliente)}
  style={{
    background: "#16A34A",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer"
  }}


      {" "}

      <button></button>
  onClick={() => excluirCliente(cliente.id)}
  style={{
    background: "#DC2626",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer"
  }}


    </div>
  ))}
<hr />

<div
 style={{
    textAlign: "center",
    marginTop: "30px",
    color: "#64748B",
    fontSize: "14px"
  }}
>
Sistema desenvolvido por Douglas Lima

<br />

React + Spring Boot + PostgreSQL

<br />

Locavibe 2026
</div>

</div>

);
}

export default App;
