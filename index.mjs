import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

(async () => {
  const stdlib = await loadStdlib('ALGO');

  const accProposer = await stdlib.newTestAccount(stdlib.parseCurrency(100));
  const accVoter = await stdlib.newTestAccount(stdlib.parseCurrency(100));

  const ctcProposer = accProposer.contract(backend);
  const ctcVoter = accVoter.contract(backend, ctcProposer.getInfo());

  await Promise.all([
    ctcProposer.participants.Proposer({
      proposal: 'Do you like coffee or tea?',
      speak: (say) => console.log(say),
    }),
    ctcVoter.participants.Voter({
      vote: Math.random() > .5 ? true : false,
      result: (coffee) => console.log(`This person prefers ${coffee ? 'coffee' : 'tea'}`),
    })
  ]);
})();
