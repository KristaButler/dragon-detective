export default function Footer() {
   return (
      <footer className='flex-spaced-container'>
         <div>&copy; Krista Butler {new Date().getFullYear()}</div>
         <div>
            <a
               href='/attribution'
               target='_blank'
               className='attribution'
            >
               Attribution
            </a>
         </div>
      </footer>
   );
}
