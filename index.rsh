'reach 0.1';
'use strict';

export const main = Reach.App(() => {
  const Proposer = Participant('Proposer', {
    proposal: Bytes(128),
  });
  const Voter = Participant('Voter', {
    vote: Bool,
    result: Fun([Bool], Null),
  });
  init();

  Proposer.only(() => {
    const proposal = declassify(interact.proposal);
  });
  Proposer.publish(proposal);
  commit();

  Voter.only(() => {
    const vote = declassify(interact.vote);
    interact.result(vote);
  });
  Voter.publish(vote);
  commit();

  exit();
});
