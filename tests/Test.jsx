import { EGG_POOL } from '../src/data/egg-pool';
import { QUERY_POOL } from '../src/data/query-pool';
import { isMatch } from '../src/utils/turn-utils';
import { TESTS } from './tests';

export default function Test() {
   function runTest() {
      for (const test of TESTS) {
         const egg = EGG_POOL.find((egg) => egg.id === test.egg);
         const card = QUERY_POOL.find((query) => query.id === test.query);
         const choice = test.choice ? test.choice : null;

         let query = { ...card };
         if (test.choice) {
            query[test.choice.type] = test.choice.value;
         }

         const result = isMatch(egg, query, choice);
         if (result !== test.expected) {
            let logMessage = `Test failed: ${test.query} for egg ${test.egg}`;

            if (choice) {
               logMessage = `${logMessage} with ${choice.type} choice ${choice.value}`;
            }

            console.error('Test Failed!');
            console.error(logMessage);
            console.error(`Expected: ${test.expected}, Got: ${result}`);

            return;
         }
      }

      console.log('All tests passed successfully!');
   }

   return (
      <>
         <h1>Test Results</h1>
         <button onClick={runTest}>Run Tests</button>
      </>
   );
}
