import React from 'react';
import {useRouteMatch, Link} from 'react-router-dom';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'

import {Header,RepositoryInfo, Issues} from './styles';

import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
    repo: string;
}


const Repository: React.FC = () => {
    const {params} = useRouteMatch<RepositoryParams>()

return (
    <>
        <Header>
            <img src={logoImg} alt="GitHub Explorer"/>
            <Link to="/">
                <FiChevronLeft size={16}/>
                Voltar
            </Link>
        </Header>

        <RepositoryInfo>
            <header>
                <img src="https://avatars1.githubusercontent.com/u/15476059?s=460&u=03269b24a681e8d63ef8ae1b56a2143032ba3625&v=4" alt="gustavoplensack"/>
                <div>
                    <strong>gustavoplensack/github-explorer</strong>
                    <p>Descrição do Repo</p>
                </div>
            </header>
            <ul>
                <li>
                    <strong>200</strong>
                    <p>Stars</p>
                </li>
                <li>
                    <strong>100</strong>
                    <p>Forks</p>
                </li>
                <li>
                    <strong>50</strong>
                    <p>Issues</p>
                </li>
            </ul>
        </RepositoryInfo>

        <Issues>
           <Link to={'hsakhskhs'}>
                <div>
                    <strong>Issue Name</strong>
                    <p>issue description</p>
                </div>
                <FiChevronRight size={20} />
            </Link>
        </Issues>
    </>
);
};

export default Repository;
