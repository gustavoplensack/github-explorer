import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories } from './styles';
import logo from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
    return (
      <>
          <img src={logo} alt="GitHub Explorer Logo" />
          <Title>Explore repositórios no GitHub</Title>
          <Form action="">
          <input placeholder="Digite o repostório" type="text" />
          <button type="submit">Pequisar</button>
        </Form>

            <Repositories>
                <a href="teste">
                <img
                        src="https://avatars1.githubusercontent.com/u/15476059?s=400&u=03269b24a681e8d63ef8ae1b56a2143032ba3625&v=4"
                    alt="Gustavo Plensack"
                  />
                <div>
                      <strong>gustavoplensack/repo</strong>
                        <p>Descrição repo</p>
                    </div>

                    <FiChevronRight size={20} />
              </a>
        </Repositories>
        </>
    );
};

export default Dashboard;
