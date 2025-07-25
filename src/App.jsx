import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Main from './components/layout/Main';
import SettingsPage from './components/pages/SettingsPage';
import GamePage from './components/pages/GamePage';

const router = createBrowserRouter([
   {
      path: '/',
      element: <HomePage />,
   },
   {
      path: '/settings',
      element: <SettingsPage />,
   },
   {
      path: '/play',
      element: <GamePage />,
   },
]);

function App() {
   return (
      <>
         <Header />
         <Main>
            <RouterProvider router={router} />
         </Main>
         <Footer />
      </>
   );
}

export default App;
