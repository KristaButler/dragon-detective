import Card from '../controls/cards/Card';

export default function Matches({ list, owner }) {
   let title = 'Matching Eggs:';

   if (owner && owner.name) {
      title = `${owner.name}'s ${title}`;
   }

   return (
      <div className='flex flex-col items-center'>
         <div className='pb-2'>{title}</div>
         <div className='flex items-center gap-2'>
            {list.map((item) => (
               <Card
                  key={`match-${item.id}`}
                  id={`match-${item.id}`}
                  card={item}
               />
            ))}
         </div>
      </div>
   );
}
