export default function CountHeader({ species, className }) {
   let divClasses =
      'flex flex-row justify-center items-center border-indigo-400 p-2 border-b-1';

   if (className) {
      divClasses = `${divClasses} ${className}`;
   }

   return (
      <>
         <div className={divClasses + ' border-l-2 border-r-1'}>
            <img
               className='h-6 mx-auto'
               src={`/images/${species}-egg.png`}
               alt={`${species} solitaire`}
            />
         </div>
         <div className={divClasses + ' border-r-1'}>
            <img
               className='h-6 mx-auto'
               src={`/images/${species}-pair.png`}
               alt={`${species} pair`}
            />
         </div>
         <div className={divClasses + ' border-r-2'}>
            <img
               className='h-6 mx-auto'
               src={`/images/${species}-cluster.png`}
               alt={`${species} cluster`}
            />
         </div>
      </>
   );
}
