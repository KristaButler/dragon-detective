import { OPPONENTS } from '../data/player-pool';
import { discardAndDraw, getBestPlay, getPlayerToAsk } from '../utils/ai-util';
import { buildMessage, findMatches } from '../utils/turn-utils';
import { getById } from '../utils/utils';

const createAISlice = (set) => ({
   ai: [],
   aiActions: {
      takeTurn: (playerId) =>
         set((state) => {
            const players = [...state.players];
            const opponents = state.players.filter(
               (player) => player.id !== playerId
            );
            const hand = [...getById(state.players, playerId).hand];
            const newClues = [...getById(state.ai, playerId).clues];
            const playerName = getById(OPPONENTS, playerId).name;

            //Find best play
            const query = getBestPlay(newClues, hand);
            const askPlayer = getPlayerToAsk(opponents, newClues, query);

            //Get matches
            const asking = getById(players, askPlayer);
            const matches = findMatches(asking.eggs, query);
            const message = buildMessage(
               asking,
               query,
               matches,
               playerName,
               false
            );

            //Mark clues
            if (query.type === 'show') {
               matches.forEach((match) => {
                  const clue = getById(newClues, match.id);
                  if (clue) {
                     clue.owner = asking.id;
                  } else {
                     newClues.push({ id: match.id, owner: asking.id, not: [] });
                  }
               });
            }

            let updatedState = discardAndDraw(state, playerId, query.id);
            const newAI = state.ai.filter((a) => a.id !== playerId);

            updatedState.message = message;
            updatedState.ai = [...newAI, { id: playerId, clues: newClues }];

            if (askPlayer !== 'player') {
               updatedState.notes = [message, ...state.notes];
            }

            return { ...updatedState };
         }),
      guess: (playerId) =>
         set((state) => {
            const clues = getById(state.ai, playerId).clues;
            const solutionClue = getById(clues, state.solution);
            //TODO: Handle end of game when AI wins.
            if (!solutionClue || !solutionClue.owner) {
               //AI make correct guess
               return { winner: playerId };
            } else {
               //AI makes incorrect guess
               const newAI = state.ai;
               const out = getById(newAI, playerId);
               out.out = true;
               return { ai: [...newAI] };
            }
         }),
   },
});

export default createAISlice;
