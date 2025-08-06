import Button from '../controls/Button';
import './Attribution.css';

export default function Attribution() {
   return (
      <div className='attribution-page'>
         <h2>Attribution</h2>
         <p>
            This project uses various open-source libraries and assets. Below is
            a list of the key contributors and resources:
         </p>
         <ul>
            <li>
               <a
                  href='https://reactjs.org/'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  React
               </a>{' '}
               - User Interface and Functionality
            </li>
            <li>
               <a
                  href='https://reactrouter.com/'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  React Router
               </a>{' '}
               - Declarative Routing
            </li>
            <li>
               <a href='https://zustand.docs.pmnd.rs/getting-started/introduction'>
                  Zustand
               </a>{' '}
               - State Managment
            </li>
            <li>
               <a
                  href='https://fontawesome.com/'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  Font Awesome
               </a>{' '}
               - Icons and social logos.
            </li>
            <li>
               <a
                  href='https://fonts.google.com/l'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  Google Fonts
               </a>{' '}
               - Heading Font
            </li>
            <li>
               <a
                  href='https://depositphotos.com/portfolio-2703645.html'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  Sky-Designs
               </a>{' '}
               - Avatar Images
            </li>
            <li>
               <a
                  href='https://depositphotos.com/portfolio-5248371.html'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  naripurur
               </a>{' '}
               - Creature Icons
            </li>
         </ul>
         <div className='attribution-footer'>
            <Button to='/'>Back</Button>
         </div>
      </div>
   );
}
