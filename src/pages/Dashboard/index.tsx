import React, { useState,FormEvent,useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories, Error } from './styles';
import logo from '../../assets/logo.svg';
import api from '../../services/api';


interface Repos {
    /*
     * It is not mandatory to use on the interface all
     * that is returned from the API. Use only the infos
     * that are mandatory.
    */
    full_name:string;
    description:string;
    owner:{
        login:string;
        avatar_url:string;
   };
}

const Dashboard: React.FC = () => {
    const [repos, setRepos] = useState<Repos[]>(() => {
        const storedRepos = localStorage.getItem('@github-explorer:repos');

        if(storedRepos){
            return JSON.parse(storedRepos);
        }
    });
    const [newRepo, setNewRepo] = useState('');
    const [inputError,setInputError] = useState('');

    useEffect(()=>{
        localStorage.setItem('@github-explorer:repos',
        JSON.stringify(repos)
        )});

    async function handleAddRepo(event:FormEvent<HTMLFormElement>):Promise<void> {
        event.preventDefault();

        if(!newRepo) {
            setInputError('Insira autor/nome do repositório.');
            return;
        }

        try {
            const response = await api.get<Repos>(`repos/${newRepo}`);
            const repository = response.data;

            setRepos([...repos,repository]);
            setNewRepo('');
            setInputError('');

        } catch(err) {
            setInputError('Insira um repositório válido!')
        }
    }

    return (
    <>
        <img src={logo} alt="GitHub Explorer Logo" />
        <Title>Explore repositórios no GitHub</Title>
            <Form hasError={!!inputError} onSubmit={handleAddRepo}>
                <input
                    value={newRepo}
                    onChange={ (e) => setNewRepo(e.target.value) }
                    placeholder="Digite o repostório"
                    type="text"
                />
                <button type="submit">Pequisar</button>
            </Form>
            {inputError && <Error>{inputError}</Error>}
        <Repositories>

            {repos.map(repo => (
                <a key={repo.full_name} href="teste">
                    <img
                        src={repo.owner.avatar_url}
                        alt={repo.owner.login}
                    />
                    <div>
                        <strong>{repo.full_name}</strong>
                        <p>{repo.description}</p>
                    </div>
                        <FiChevronRight size={20} />
                </a>
            ))}

        </Repositories>
    </>
    );
};

export default Dashboard;
