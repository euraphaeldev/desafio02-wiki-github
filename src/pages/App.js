import { useState } from 'react';
import background from '../assets/img/background.png';
import Button from '../components/Button';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { Container } from './styles';
import { api } from '../services/api';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);


  const handleSearchRepos = async () => {
    const { data } = await api.get(`repos/${currentRepo}`)

    if (data.id) {

      const isExist = repos.find(repo => repo.id === data.id);

      if (!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return;
      }
    }
    alert('Repositório não encontrado.');
  }

  const handleRemoveRepo = ((id) => {
    const newRepos = repos.filter(repo => repo.id !== id);
    setRepos(newRepos);
    setCurrentRepo('');
  })

  return (
    <Container>
      <img src={background} width={72} height={72} alt='github logo' />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepos} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}

    </Container>
  );
}

export default App;
