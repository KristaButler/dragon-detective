export default function RevealCards(cards, queryLabel, queryType, owner) {
   let content = <p>{`${owner} has no ${queryLabel}s.`}</p>;

   if (queryType === 'show' && isArray(cards) && cards.length > 0) {
      content = cards.map((card, index) => (
         <div
            key={index}
            className='card'
         >
            <p>{card.name}</p>
         </div>
      ));
   }

   if (queryType === 'quantity' && Number.isInteger(cards) && cards > 0) {
      content = <p>{`${owner} has ${cards} ${queryLabel}s.`}</p>;
   }

   return <div className='reveal-cards'>{content}</div>;
}
