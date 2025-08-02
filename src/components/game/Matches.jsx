import { useState } from 'react';
import useBoundStore from '../../store/store';
import Button from '../controls/Button';
import Card from '../controls/cards/Card';

export default function Matches({ list, owner }) {
   const [cluesMarked, setCluesMarked] = useState(false);
   const markClues = useBoundStore((state) => state.cluesheetActions.markClues);
   let title = 'Matching Eggs:';

   if (owner && owner.name) {
      title = `${owner.name}'s ${title}`;
   }

   function handleMarkClues() {
      markClues(list, owner.id);
      setCluesMarked(true);
   }

   return (
      <div className='flex-centered-columns'>
         <div className='matches-list'>
            {list.map((item) => (
               <Card
                  key={`match-${item.id}`}
                  id={`match-${item.id}`}
                  card={item}
               />
            ))}
         </div>
         <Button
            color='green'
            onClick={handleMarkClues}
            disabled={cluesMarked}
         >
            Mark Clues
         </Button>
      </div>
   );
}
