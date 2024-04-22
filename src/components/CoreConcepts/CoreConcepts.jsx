import CoreConcept from "./CoreConcept";

function CoreConcepts(
    { coreConcepts}
) {
    return ( 
        <section id="core-concepts">

      
        <h2>Core Concepts</h2>
        <ul>
          {coreConcepts.map((concept, index) => (
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