import {Route, Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/index';

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Switch>
        <Route to="/login">
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
