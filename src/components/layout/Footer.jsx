import './Footer.css';

export default function Footer() {
   return (
      <footer>
         <div>&copy; Krista Butler {new Date().getFullYear()}</div>
         <div>
            <a
               href='http://www.kristathecoder.com/dragon-detective-attribution'
               target='_blank'
               className='attribution'
            >
               Attribution
            </a>
         </div>
      </footer>
   );
}
