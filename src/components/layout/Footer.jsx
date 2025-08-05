export default function Footer() {
   return (
      <footer className='flex-spaced-container'>
         <div>&copy; Krista Butler {new Date().getFullYear()}</div>
         <div>
            {/* TODO: Add this back in once I have the page setup <a
               href='http://www.kristathecoder.com/dragon-detective-attribution'
               target='_blank'
               className='attribution'
            >
               Attribution
            </a> */}
         </div>
      </footer>
   );
}
