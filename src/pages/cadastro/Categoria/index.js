/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '#AAAAAA',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const URL_TOP = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://aluraflix-eight.herokuapp.com/categorias';

    fetch(URL_TOP)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();

        setCategorias([
          ...resposta,
        ]);
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:&nbsp;
        { values.titulo }
      </h1>

      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        setCategorias([
          ...categorias,
          values,
        ]);

        clearForm();
      }}
      >

        <FormField label="Título da Categoria" name="titulo" value={values.titulo} onChange={handleChange} />
        <FormField label="Descrição" type="textarea" name="descricao" value={values.descricao} onChange={handleChange} />
        <FormField label="Cor" type="color" name="cor" value={values.cor} onChange={handleChange} />

        <Button>
          Cadastrar
        </Button>

        {categorias.length === 0 && (
        <div>
          Loading...
        </div>
        )}
      </form>

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            { categoria.titulo }
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
