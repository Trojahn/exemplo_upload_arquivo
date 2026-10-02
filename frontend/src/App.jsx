import { useEffect, useState } from 'react'

function App() {

  const url = "http://localhost:3000/arquivo";

  const [data, setData] = useState([]);

  // Usado para guardar o arquivo a ser enviado.
  const [arquivo, setArquivo] = useState(null);
  const [inp, setInput] = useState("");

  async function carregarDados() {
    const res = await fetch(`${url}`);
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function resetForm(e) {
    if (e) {
      e.preventDefault();
    }
    setInput("");
    setArquivo(null);
  }

  function atualizarForm(e) {
    setInput(e.target.value);
  }

  async function cadastrar(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("arquivo", arquivo);

    let res = await fetch(`${url}`, { method: "POST", body: formData });
    if (!res.ok) {
      alert("Não foi possível realizar o cadastro");
      return;
    }
    alert("Cadastrado com sucesso!");
    resetForm();
    carregarDados();
  }

  function changeFile(e) {
    if (e.target.files.length > 0) {
      // Guarda os dados do arquivo.
      setArquivo(e.target.files[0]);
      // Guarda o nome do arquivo.
      setInput(e.target.files[0].name);
    }
  }

  let fotos = [];
  if (data.length > 0) {
    for (let arquivo of data) {
      let item = (
        <div className="box my-5" data-id={arquivo.id} key={arquivo.id}>
          <article className="media">
            <div className="media-left">
              <figure className="image is-300x200">
                <img src={`${url}/${arquivo.id}`} alt="Image" />
              </figure>
            </div>
          </article>
        </div>
      );
      fotos.push(item);
    }
  }


  return (
    <>


      <header>
        <section className="hero is-success">
          <div className="hero-body">
            <p className="title">EXEMPLO</p>
            <p className="subtitle">Exemplo de upload de arquivo</p>
          </div>
        </section>
      </header>
      <main>
        <section className='columns'>
          <div className='column is-1'>

          </div>
          <div className='column my-5'>
            <form onSubmit={cadastrar}>

              <div className="field">
                <label className="label">Envie sua imagem</label>
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input className="file-input" type="file" name="foto" accept="image/*" onChange={changeFile} />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Escolha uma foto</span>
                    </span>
                    <span className="file-name">{inp.foto}</span>
                  </label>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Enviar</button>
                </div>
                <div className="control">
                  <button className="button is-link is-light" onClick={resetForm}>Limpar</button>
                </div>
              </div>
            </form>
            <h2 className='subtitle has-text-centered'>Imagens cadastradas</h2>
            {fotos}
          </div>
          <div className='column is-1'>

          </div>
        </section>

      </main>










    </>
  )
}

export default App
