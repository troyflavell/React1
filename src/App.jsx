
import { useState} from "react"
import Header from "./components/Header/Header";
import CoreConcept from "./components/CoreConcepts";
import { CORE_CONCEPTS } from "./data";
import TabButton from "./components/TabButton"
import { EXAMPLES } from "./data-with-examples";

function App() {
  const [selectedTopic, setSelectedTopic] = useState("components");

  

  function handleClick(id) {
    setSelectedTopic(id);
}
let tabContent = <p> 
  Please select a topic
</p>

if (selectedTopic) {
  tabContent = (
    <div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
      <p>{EXAMPLES[selectedTopic].description}</p>
      <pre>
        <code>{EXAMPLES[selectedTopic].code}</code>
      </pre>
    </div>
  );
}

  return (
    <div>
        <Header />
      <main>
        <section id="core-concepts">

      
        <h2></h2>
        <ul>
          {CORE_CONCEPTS.map((concept, index) => (
            <CoreConcept
              key={index}
              image={concept.image}
              title={concept.title}
              description={concept.description}
            />
          ))}

        </ul>
        </section>
        <section id="excamples">
          <h2> Examples</h2>
          <menu>
            <TabButton onSelect={() => handleClick("Components")}>Components</TabButton>
            <TabButton onSelect={() => handleClick("JSX")}>JSX</TabButton>
            <TabButton onSelect={() => handleClick("Props")}>Props</TabButton>
            <TabButton onSelect={() => handleClick("State")}>State</TabButton>
          </menu>
              
          {tabContent}

        </section>
      </main>
    </div>
  );
}

export default App;
