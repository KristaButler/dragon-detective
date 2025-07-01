import { EGG_POOL, getEggById } from '../src/assets/data/egg-pool';
import {
   QUERY_POOL,
   getQueryById,
   isMatch,
} from '../src/assets/data/query-pool';
import { TESTS } from './tests';

export default function Test() {
   function runTest() {
      for (const test of TESTS) {
         const egg = getEggById(test.egg);
         const query = getQueryById(test.query);
         const choice = test.choice ? test.choice : null;

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
