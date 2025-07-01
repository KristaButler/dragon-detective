import { useSelector } from 'react-redux';
import QueryCard from './QueryCard';

export default function QueryCards() {
   const playerHands = useSelector((state) => state.queryDeck.playerHands);
   const playerHand = playerHands.find((hand) => hand.playerId === 'player');

   return (
      <div
         id='queries'
         className='flex items-center gap-2'
      >
         {playerHand &&
            playerHand.cards.map((card) => (
               <QueryCard
                  key={card.id}
                  queryId={card.id}
                  title={card.name}
               />
            ))}
      </div>
   );
}
