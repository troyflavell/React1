
import { useState, Fragment} from "react"
import Header from "./components/Header/Header";
import CoreConcepts from "./components/CoreConcepts"
import TabButton from "./components/TabButton"
import { EXAMPLES, CORE_CONCEPTS } from "./data-with-examples";

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
    <>
        <Header />
      <main>

        <CoreConcepts />
   
        <section id="examples">
          <h2> Examples</h2>
          <menu>
          {
            Object.keys(EXAMPLES).map((key) => {
              return (
                <TabButton
                key={key}
                onSelect={() => handleClick(key)}
                isSelected={selectedTopic === key}
                >
                  {EXAMPLES[key].title}xs
                </TabButton>
              )
              
            })
          } 
          </menu>
              
          {tabContent}

        </section>
      </main>
    </>
  );
}

export default App;
