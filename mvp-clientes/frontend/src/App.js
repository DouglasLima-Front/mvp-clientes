import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [clientes, setClientes] = useState([]);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const API = "https://special-palm-tree-r447rp4jrg7q25gwj-8080.app.github.dev/clientes";

  const carregarClientes = async () => {
    const response = await axios.get(API);
    setClientes(response.data);
  };

  const salvarCliente = async () => {

    await axios.post(API, {
      nome,
      telefone
    });

    setNome("");
    setTelefone("");

    carregarClientes();
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div style={{ padding: "30px" }}>

      <h1>Cadastro de Clientes</h1>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      <br /><br />

      <button onClick={salvarCliente}>
        Salvar
      </button>

      <hr />

      <h2>Clientes</h2>

      {clientes.map(cliente => (
        <div key={cliente.id}>
          <strong>{cliente.nome}</strong>
          <br />
          {cliente.telefone}
          <hr />
        </div>
      ))}

    </div>
  );
}

export default App;