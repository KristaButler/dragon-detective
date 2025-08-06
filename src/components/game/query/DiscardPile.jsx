import useStore from '../../../store/store';
import Card from '../../controls/cards/Card';
import './DiscardPile.css';

export default function DiscardPile() {
   const discardPile = useStore.use.discardPile();
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
