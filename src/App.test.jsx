import App from "./App";
import { render } from "@testing-library/react";
import App from "./App";

    render(<App />);

    import { EXAMPLES, CORE_CONCEPTS } from "./data-with-examples";

    // ...

    // Test if data is passed to the components
    test("data is passed to the components", () => {
        // Render the component
        const { getByText } = render(<App />);

        // Assert that the examples are rendered
        EXAMPLES.forEach((example) => {
            expect(getByText(example)).toBeInTheDocument();
        });

        // Assert that the core concepts are rendered
        CORE_CONCEPTS.forEach((concept) => {
            expect(getByText(concept)).toBeInTheDocument();
        });
    });



