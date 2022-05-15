import { Route, Switch } from "react-router-dom";
import BookDetails from "../../components/BookDetails";
import BookForm from "../../components/BookForm";
import BookList from "../../components/BookList";
import Menu from "../Menu/Menu";
import NoMatch from "../../components/NoMatch";
import RolesRoute from "../../components/RolesRoute";
import SecretBooks from "../../components/SecretBooks";

const Home = () => (
  <>
    <Menu/>
    <Switch>
      <Route exact path="/books">
        <BookList/>
      </Route>
      <Route exact path="/books/new">
        <BookForm/>
      </Route>
      <Route path="/books/:bookId">
        <BookDetails/>
      </Route>
      <RolesRoute path="/secret" roles={['admin']}>
        <SecretBooks/>
      </RolesRoute>
      <Route path="*">
        <NoMatch/>
      </Route>
    </Switch>
  </>
)

export default Home
