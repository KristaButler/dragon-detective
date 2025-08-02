import useBoundStore from '../../../store/store';
import Card from '../../controls/cards/Card';
import './DiscardPile.css';

export default function DiscardPile() {
   const discardPile = useBoundStore((state) => state.discardPile);
   const topCard = discardPile[discardPile.length - 1];

   let content = <div className='discard-pile-placeholder'>Discard Pile</div>;

   if (topCard) {
      content = (
         <Card
            key={`discard-${topCard.id}`}
            id={topCard.id}
            backgroundColor='background-default'
            card={topCard}
            textOnly
         />
      );
   }

   return content;
}
