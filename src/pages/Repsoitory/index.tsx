import React, { useEffect, useState } from 'react';
import {useRouteMatch, Link} from 'react-router-dom';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'

import {Header,RepositoryInfo, Issues} from './styles';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
    repo: string;
}

interface Repo {
    /*
     * It is not mandatory to use on the interface all
     * that is returned from the API. Use only the infos
     * that are necessary.
    */
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner:{
        login: string;
        avatar_url: string;
   };
}

interface Issue {
    title: string;
    id: string;
    html_url: string;
    user: {
        login: string;
    }
}

const Repository: React.FC = () => {
    const {params} = useRouteMatch<RepositoryParams>()

    const [repo, setRepo] = useState<Repo | null >(null);
    const [issues,setIssues] = useState<Issue[]>([]);

    /*
     *
     * Fetch repo infos and issues from the GitHub APIs
     *
    */
    useEffect(() => {

        async function loadData():Promise<void> {
            /*
             * With this function implementation both
             * requests to the API happen at the same
             * time and allow provide a faster
             * implementation.
            */
            const [repo, issues] = await Promise.all(
                [
                    api.get(`repos/${params.repo}`),
                    api.get(`repos/${params.repo}/issues`)
                ]
            );

            setRepo(repo.data);
            setIssues(issues.data)
        }

        loadData();

    },[params.repo]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="GitHub Explorer"/>
                <Link to="/">
                    <FiChevronLeft size={16}/>
                    Voltar
                </Link>
            </Header>

            {repo && (
                <RepositoryInfo>
                    <header>
                        <img src={repo.owner.avatar_url} alt={repo.owner.login}/>
                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repo.stargazers_count}</strong>
                            <p>Stars</p>
                        </li>
                        <li>
                            <strong>{repo.forks_count}</strong>
                            <p>Forks</p>
                        </li>
                        <li>
                            <strong>{repo.open_issues_count}</strong>
                            <p>Issues</p>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}
                <Issues>

                    {issues.map(issue=>
                        <a href={issue.html_url} key={issue.id}>
                            <div>
                                <strong>{issue.title}</strong>
                                <p>{issue.user.login}</p>
                            </div>
                            <FiChevronRight size={20} />
                        </a>
                    )}
                </Issues>
            </>

    );
};

export default Repository;
