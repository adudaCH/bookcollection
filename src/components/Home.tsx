import { FunctionComponent } from "react";
import BooksTable from "./BooksTable";
import AddNewBook from "./AddNewBook";

interface HomeProps {
    
}

const Home: FunctionComponent<HomeProps> = () => {
    
    return ( <>
    <div className="d-flex justify-content-around mt-5 container-fluid">
    <div className=""><AddNewBook/></div>
    <div className="">  <BooksTable/></div>
    </div>
    </> );
}

export default Home;