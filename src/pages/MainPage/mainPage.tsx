import { Team, Stack } from 'components/Welcome';
import { Pros } from 'components/Welcome/pros';

import './mainPage.scss';

const MainPage = () => {
  return (
    <section className="welcome-page">
      <h1 className="main-question">
        Dont know what to do next and what your teammates responsible for?
      </h1>
      <p className="main-answer">
        With the Project Tracker you can effectively manage your projects, share with teammates,
        make a plan of your work and control all stages of your project.
      </p>
      <p>With our app you can:</p>
      <Pros />

      <p>
        Our app created as a final project of course RS School React 2022 Q3 with a stack of
        technologies
      </p>
      <Stack />
      <h3>Our team</h3>
      <Team />
      <h4 className="main-answer" style={{ paddingBottom: '10px' }}>
        Use Project Tracker & leave feedback!
      </h4>
    </section>
  );
};

export default MainPage;
