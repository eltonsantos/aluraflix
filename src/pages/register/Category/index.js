import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import Preloader from "../../../components/Preloader"
import categoriasRepository from '../../../repositories/categorias'

const CadastroCategoria = () => {
  const initialValues = {
    titulo: '',
    descricao: '',
    cor: '#AAAAAA',
  };

  const { handleChange, values, clearForm } = useForm(initialValues);

  const [categories, setCategories] = useState([]);

  const handleSubmit = (data) => {
    data.preventDefault();

    if (!values.titulo || !values.descricao) {
      alert("Informe todos os campos!")
    }
    else {
      setCategories([...categories, values]);

      clearForm(initialValues);

      categoriasRepository.create({
        titulo: values.titulo,
        cor: values.cor,
        link_extra: {
          text: values.descricao,
          url: "https://www.alura.com.br/cursos-online-programacao"
        }
      })
        .then(() => {
          alert('Cadastrou com sucesso')
        })
    }
  };

  useEffect(() => {
    const URL_CATEGORIES = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://aluraflix-eight.herokuapp.com/categorias';

    fetch(URL_CATEGORIES)
      .then(async (response) => {
        const resp = await response.json()
        setCategories([
          ...resp,
        ])
      })
  }, [])

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.titulo}</h1>

      <form onSubmit={handleSubmit}>

        <FormField
          label="Título da Categoria"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categories.length === 0 && (
        <div className="preloader">
          <Preloader size="200" alt="preloader image" title="Carregando..." />
        </div>
      )
      }

      <ul>
        {categories.map((category) => {
          return <li key={`${category.titulo}`}>{category.titulo}</li>;
        })}
      </ul>

    </PageDefault>
  );
};

export default CadastroCategoria;
