import reactImage from './assets/react-core-concepts.png';


function Header() {

//randomly changes funcdamental to core and essential



const reactDescriptions = ['Fundamental', 'Core', 'Essential'];
const randomIndex = Math.floor(Math.random() * reactDescriptions.length);
const description = reactDescriptions[randomIndex];



    return ( 
        <header>
            <img src={reactImage} alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
                {description} React concepts you will need for almost any app you are
                going to build! Troias
            </p>
        </header>
     );
}

export default Header;