import CoreConcept from "./CoreConcept";

function CoreConcepts() {
    return ( 
        <section id="core-concepts">

      
        <h2></h2>
        <ul>
          {CORE_CONCEPTS.map((concept, index) => (
            <CoreConcept
              key={index}
              image={concept.image}
              {...concept}
            />
          ))}

        </ul>
        </section>
     );
}

export default CoreConcepts;