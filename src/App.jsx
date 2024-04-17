
import Header from "./components/Header/Header";
import CoreConcept from "./components/CoreConcepts";
import { CORE_CONCEPTS } from "./data";
import TabButton from "./components/TabButton"

function App() {

  function handleClick(id) {
  switch (id) {
    case 0:
      console.log("Components");
      break;
    case 1:
      console.log("Props");
      break;
    case 2:
      console.log("State");
      break;
    case 3:
      console.log("Hooks");
      break;
    default:
      console.log("default");
  }
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
            <TabButton onSelect={() => handleClick(0)}>Components</TabButton>
            <TabButton onSelect={() => handleClick(1)}>Props</TabButton>
            <TabButton onSelect={() => handleClick(2)}>State</TabButton>
            <TabButton onSelect={() => handleClick(3)}>Hooks</TabButton>
          </menu>
          <div>
            <p>Content goes here</p>
          </div>

        </section>
      </main>
    </div>
  );
}

export default App;
