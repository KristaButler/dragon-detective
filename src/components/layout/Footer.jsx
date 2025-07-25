export default function Footer() {
   return (
      <footer className='flex justify-between'>
         <div>&copy; Krista Butler {new Date().getFullYear()}</div>
         <div>
            <a
               href='http://www.kristathecoder.com/dragon-detective-attribution'
               target='_blank'
               className='underline hover:text-zinc-300'
            >
               Attribution
            </a>
         </div>
      </footer>
   );
}
