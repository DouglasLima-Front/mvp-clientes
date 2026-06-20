import { useEffect, useState } from "react";
import axios from "axios";

function App() {

const [clientes, setClientes] = useState([]);
const [nome, setNome] = useState("");
const [telefone, setTelefone] = useState("");
const [busca, setBusca] = useState("");
const [idEdicao, setIdEdicao] = useState(null);

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
      telefone
    });

    alert("Cliente atualizado com sucesso!");

    setIdEdicao(null);

  } else {

    await axios.post(API, {
      nome,
      telefone
    });

    alert("Cliente cadastrado com sucesso!");
  }

  setNome("");
  setTelefone("");

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

return (
<div
style={{
maxWidth: "700px",
margin: "40px auto",
padding: "20px",
border: "1px solid #ddd",
borderRadius: "10px",
fontFamily: "Arial"
}}
> <h1>Cadastro de Clientes</h1>


  <input
    placeholder="Buscar cliente"
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "20px"
    }}
  />

  <input
    placeholder="Nome"
    value={nome}
    onChange={(e) => setNome(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px"
    }}
  />

  <input
    placeholder="Telefone"
    value={telefone}
    onChange={(e) => setTelefone(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px"
    }}
  />

  <button
    onClick={salvarCliente}
    style={{
      padding: "10px 20px",
      cursor: "pointer"
    }}
  >
    {idEdicao ? "Atualizar Cliente" : "Salvar Cliente"}
  </button>

  <hr />

  <h3>Total de clientes: {clientesFiltrados.length}</h3>

  {clientesFiltrados.map((cliente) => (
    <div
      key={cliente.id}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px"
      }}
    >
      <strong>{cliente.nome}</strong>

      <br />

      {cliente.telefone}

      <br /><br />

      <button
        onClick={() => editarCliente(cliente)}
      >
        Editar
      </button>

      {" "}

      <button
        onClick={() => excluirCliente(cliente.id)}
      >
        Excluir
      </button>
    </div>
  ))}
</div>


);
}

export default App;
