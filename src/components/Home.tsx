import { FunctionComponent, useContext } from "react";
import BooksTable from "./BooksTable";
import AddNewBook from "./AddNewBook";
import { ThemeContext } from "../sevices/darkLightTheme";

interface HomeProps {
    
}

const Home: FunctionComponent<HomeProps> = () => {
        const theme = useContext(ThemeContext);
    
    return ( <main
        style={{
            backgroundColor: theme.background,
            color: theme.color,
            minHeight: "100vh",
        }}>
    <div className="d-flex justify-content-around mt-5 container-fluid">
    <div className=""><AddNewBook/></div>
    <div className="">  <BooksTable/></div>
    </div>
    </main> );
}

export default Home;