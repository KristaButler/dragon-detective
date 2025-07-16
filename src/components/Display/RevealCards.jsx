import { getColorBackground } from '../../util/util';

export default function RevealCards({
   cards,
   queryLabel,
   queryType,
   owner,
   onClick,
}) {
   let content = <p>{`${owner} has no ${queryLabel}s.`}</p>;
   let showMarkClues = false;

   if (queryType === 'show' && Array.isArray(cards) && cards.length > 0) {
      showMarkClues = true;
      content = (
         <div className='flex flex-wrap justify-center items-center gap-4 p-4'>
            {cards.map((card, index) => {
               const bgColor = getColorBackground(card.color) + '-900';
               let countSuffix = 'egg';
               if (card.count === 2) {
                  countSuffix = 'pair';
               }
               if (card.count === 3) {
                  countSuffix = 'cluster';
               }

               return (
                  <div
                     key={index}
                     className={`flex flex-col items-center gap-2 p-2 border-2 rounded-lg border-2 border-white m-2 ${bgColor}`}
                  >
                     <img
                        src={`/images/${card.species}-${countSuffix}.png`}
                        alt={card.name}
                        className='h-16 w-auto'
                     />
                     <p className='text-sm italic'>{card.name}</p>
                  </div>
               );
            })}{' '}
         </div>
      );
   }

   if (queryType === 'quantity' && Number.isInteger(cards) && cards > 0) {
      content = <p>{`${owner} has ${cards} ${queryLabel}s.`}</p>;
   }

   return (
      <div className='reveal-cards'>
         {content}
         <div className='flex justify-end'>
            {showMarkClues && (
               <button
                  onClick={() => onClick(true)}
                  className='mt-4 mr-4 hover:font-bold hover:border-b-2'
               >
                  Mark Clues
               </button>
            )}
            <button
               onClick={() => onClick(false)}
               className='mt-4 mr-4 hover:font-bold hover:border-b-2'
            >
               Close
            </button>
         </div>
      </div>
   );
}
