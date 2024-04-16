
import Header from "./header";
import CoreConcept from "./coreConcepts";




function App() {
  return (
    <div>
      
        <Header />
    
      <main>
        <section id="core-concepts">

        </section>
        <h2></h2>
        <ul>
          <CoreConcept 
             title="Components"
              description="Components are the building blocks of any React app. A component is a self-contained module that renders some output."
              image=""
          />
           <CoreConcept 
             title="Components"
              description="Components are the building blocks of any React app. A component is a self-contained module that renders some output."
              image=""
          />
            <CoreConcept 
             title="Components"
              description="Components are the building blocks of any React app. A component is a self-contained module that renders some output."
              image=""
          />
            <CoreConcept 
             title="Components"
              description="Components are the building blocks of any React app. A component is a self-contained module that renders some output."
              image=""
          />

        </ul>
      </main>
    </div>
  );
}

export default App;
