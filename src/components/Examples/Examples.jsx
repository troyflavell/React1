import React, { useState} from "react";
import Section from "../Section";
import TabButton from "../TabButton"
function Examples(
    {
        examples
    }
) {
    const [selectedTopic, setSelectedTopic] = useState("components");


    const EXAMPLES = examples || EXAMPLES;
    console.log("examples", EXAMPLES)

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

        
        <Section title="Examples" id="examples">
        
        <menu>
        {
          Object.keys(EXAMPLES).map((key) => {
            return (
              <TabButton
              key={key}
              onSelect={() => handleClick(key)}
              isSelected={selectedTopic  === key}
              >
                {EXAMPLES[key].title}xs
              </TabButton>
            )
            
          })
        } 
        </menu>
            
        {tabContent}

        </Section>  
    )
}

export default Examples;