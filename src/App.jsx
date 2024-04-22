
import Header from "./components/Header/Header";
import CoreConcepts from "./components/CoreConcepts/CoreConcepts"
import TabButton from "./components/TabButton"
import { EXAMPLES, CORE_CONCEPTS } from "./data-with-examples";
import Examples from "./components/Examples/Examples";

function App() {



  return (
    <>
      <Header />
      <main>
        <CoreConcepts
          coreConcepts={CORE_CONCEPTS}
        />

        <Examples
          examples={EXAMPLES}
        />
      </main>

    </>
  );
}

export default App;
