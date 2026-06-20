import { useEffect, useState } from "react";
import axios from "axios";

function App() {

const [clientes, setClientes] = useState([]);
const [nome, setNome] = useState("");
const [telefone, setTelefone] = useState("");
const [busca, setBusca] = useState("");

const API = "https://mvp-clientes-1.onrender.com/clientes";

const carregarClientes = async () => {
const response = await axios.get(API);
setClientes(response.data);
};

const salvarCliente = async () => {

```
if (!nome || !telefone) {
  alert("Preencha todos os campos!");
  return;
}

await axios.post(API, {
  nome,
  telefone
});

alert("Cliente cadastrado com sucesso!");

setNome("");
setTelefone("");

carregarClientes();
```

};

const excluirCliente = async (id) => {


if (!window.confirm("Deseja realmente excluir este cliente?")) {
  return;
}

await axios.delete(`${API}/${id}`);

alert("Cliente excluído com sucesso!");

carregarClientes();

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
maxWidth: "600px",
margin: "40px auto",
padding: "20px",
border: "1px solid #ddd",
borderRadius: "10px",
fontFamily: "Arial"
}}
>


  <h1>Cadastro de Clientes</h1>

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
    Salvar Cliente
  </button>

  <hr />

  <h2>Clientes</h2>

  {clientesFiltrados.map(cliente => (
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
