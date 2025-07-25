import cardBack from '../../assets/query-card-back.png';
import Card from '../cards/Card';

export default function QueryDeck() {
   return (
      <Card className='bg-pink-900'>
         <img
            src={cardBack}
            alt='Magnifying glass.'
         />
      </Card>
   );
}
