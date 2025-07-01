import { useSelector } from 'react-redux';
import ColorRow from './ColorRow';
import CountHeader from './CountHeader';
import SheetHeader from './SheetHeader';
import { extractClues } from '../../util/clue-sheets-util';

export default function ClueSheet() {
   const clueSheets = useSelector((state) => state.clueSheets.clueSheets);

   const playerClueSheet = clueSheets.find(
      (clueSheet) => clueSheet.playerId === 'player'
   );

   let owners = [null, null, null, null];

   if (playerClueSheet) {
      owners = extractClues(playerClueSheet.clues);
   }

   return (
      <div id='clue-sheet'>
         <div className='grid grid-cols-10 text-center p-2 mt-1'>
            <SheetHeader />
            <CountHeader
               species='dragon'
               className='bg-violet-900'
            />
            <CountHeader
               species='wyvern'
               className='bg-purple-900'
            />
            <CountHeader
               species='hydra'
               className='bg-fuchsia-900'
            />
            <ColorRow
               color='blue'
               title='Blue'
               owners={owners[0]}
               className='border-t-2 border-b-1 bg-indigo-900'
            />
            <ColorRow
               color='green'
               title='Green'
               owners={owners[1]}
               className='border-b-1 bg-emerald-900'
            />
            <ColorRow
               color='red'
               title='Red'
               owners={owners[2]}
               className='border-b-1 bg-red-900'
            />
            <ColorRow
               color='yellow'
               title='Yellow'
               owners={owners[3]}
               className='border-b-2 bg-yellow-900'
            />
         </div>
         <p className='text-right text-gray-300 px-2'>
            <button className='hover:font-bold hover:underline'>
               Turn History
            </button>
         </p>
      </div>
   );
}
