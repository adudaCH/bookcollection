import { FunctionComponent, useContext } from "react";
import BooksTable from "./BooksTable";
import AddNewBook from "./AddNewBook";
import { ThemeContext } from "../sevices/darkLightTheme";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
    const theme = useContext(ThemeContext);

    return (
        <main
            style={{
                backgroundColor: theme.background,
                color: theme.color,
                minHeight: "100vh",
            }}>
            <div className="container-fluid">
                <div className="row mt-5">

                    <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <AddNewBook />
                    </div>


                    <div className="col-12 col-md-8">
                        <BooksTable />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
