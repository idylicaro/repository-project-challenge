import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data); 
    })
  },[])
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:'any',
      url:'www.any.com',
      techs:['node']
    })
    setRepositories([ ...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repo => {
        return (
          <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          </li>
        )
      })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
