import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/authenticate/Authenticate'
import Activate from './pages/activate/Activate';
import Rooms from './pages/rooms/Rooms';


function App() {
  let auth = false;
  const user = { activated: true }

  const GuestRoute = () => {
    return (
      !auth ? <Outlet /> : <Navigate to='/rooms' />
    )
  }

  const SemiProtectedRoute = () => {
    return (
      !auth ? <Navigate to='/' /> : auth
        && !user.activated ? <Outlet /> : <Navigate to="/rooms" />
    )
  }
  const ProtectedRoute = () => {
    return (
      !auth ? <Navigate to='/' /> : auth
        && !user.activated ? <Navigate to="/activate" /> : <Outlet/>
    )
  }


  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/authenticate' element={<Authenticate />} />
        </Route>
        <Route element={<SemiProtectedRoute />}>
          <Route path='/activate' element={<Activate />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/rooms' element={<Rooms />} />
        </Route>

        {/* <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute>
        <ProtectedRoute path="/rooms">
          <Rooms />
        </ProtectedRoute> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;