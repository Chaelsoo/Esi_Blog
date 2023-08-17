
import './index.css';
import login from './Auth/login.jsx';
import register from './Auth/register.jsx';
import confirm from './Auth/confirm.jsx';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import AuthenticatedRoutes from './AuthentificatedRoutes';



function Road() {

  return (
      <Router>
        <Routes>
        <Route Component={login} path="/auth/login/"/>
        <Route Component={register} path="/auth/register/" />
        <Route Component={confirm} path="/auth/confirm/" />
        <Route Component={AuthenticatedRoutes} path='/*' to >
        </Route>

        <Route path="*" element={ <center><h1 className='mt-10 font-bold'>Page not found</h1> Reach out with the admin  </center>}>  </Route>
        </Routes>
      </Router>
  );
}

export default Road;
