import React, { useState } from "react";
import axios from "axios";

export default function AddAddressComponent() {
  const [cep, setCep] = useState(Number);
  const [rua, setRua] = useState(String);
  const [complemento, setComplemento] = useState(String);
  const [bairro, setBairro] = useState(String);
  const [cidade, setCidade] = useState(String);
  const [uf, setUf] = useState(String);

  const handleSearchCEP = async (CEP) => {
    const address = await axios.get(`https://viacep.com.br/ws/${CEP}/json/`);
    setRua(address.data.logradouro);
    setBairro(address.data.bairro);
    setCidade(address.data.localidade);
    setUf(address.data.uf);
    setCep(address.data.cep);
  };
  return (
    <div>
      <form>
        <input
          onBlur={(e) => handleSearchCEP(e.target.value)}
          type="number"
          placeholder="CEP"
          required
        />
      </form>
    </div>
  );
}
