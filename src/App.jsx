import "./App.css";
import EducationList from "./components/EducationList";
import ExperienceList from "./components/ExperienceList";
import General from "./components/General";

function App() {
  return (
    <>
      <General />
      <EducationList />
      <ExperienceList />
      <footer>
        <small>
          <a
            href="https://github.com/nzubeifechukwu/cv-application"
            target="_blank"
          >
            Built by Nzube Ifechukwu
          </a>
        </small>
      </footer>
    </>
  );
}

export default App;
