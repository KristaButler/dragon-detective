import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Main from './components/layout/Main';
import SettingsPage from './components/pages/SettingsPage';
import GamePage from './components/pages/GamePage';
import GameOverPage from './components/pages/gameover/GameOverPage';

//TODO LIST
//Code Improvements:
// - Zustand Auto Create Selectors
// - Document
// - Sort Imports
// - Responsive
// - Accessibility
// - Optomize Updates

//UI:
// - Better Tutorial
// - Animations
// - Hover Effects

//Other:
// - Update README
// - Attribution Page
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
   {
      path: '/gameover',
      element: <GameOverPage />,
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
