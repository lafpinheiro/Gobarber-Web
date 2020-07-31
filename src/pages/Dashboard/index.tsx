import React, { useState } from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBArber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 6</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/54490113?s=460&u=ab493645cd665c320178f89b1e62cdc2ca593062&v=4"
                alt="Luís Pinheiro"
              />
              <strong>Luís Pinheiro</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/54490113?s=460&u=ab493645cd665c320178f89b1e62cdc2ca593062&v=4"
                  alt="Luís Pinheiro"
                />
                <strong>Luís Pinheiro</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>
              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/54490113?s=460&u=ab493645cd665c320178f89b1e62cdc2ca593062&v=4"
                  alt="Luís Pinheiro"
                />
                <strong>Luís Pinheiro</strong>
              </div>
            </Appointment>{' '}
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                15:00
              </span>
              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/54490113?s=460&u=ab493645cd665c320178f89b1e62cdc2ca593062&v=4"
                  alt="Luís Pinheiro"
                />
                <strong>Luís Pinheiro</strong>
              </div>
            </Appointment>{' '}
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
