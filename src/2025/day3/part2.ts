import * as fs from "fs";

const N_CANDIDATES = 12;

type Candidate = {
  value: number;
  position: number;
};

fs.promises.readFile("./src/2025/day3/input.txt", "utf-8").then((text) => {
  let totalJoltage = 0;

  text.split("\n").forEach((bank: string) => {
    bank = bank.trim();
    if (bank.length === 0) return;

    const candidates = initializeCandidates(N_CANDIDATES, bank);

    for (
      let checkedBatteryIdx = 1;
      checkedBatteryIdx < bank.length;
      checkedBatteryIdx++
    ) {
      const checkedJoltage = Number(bank[checkedBatteryIdx]);

      for (
        // check all candidates left to right
        let candidateIdx = 0;
        candidateIdx < N_CANDIDATES &&
        (candidateIdx === 0 || // first candidate can always be checked
          checkedBatteryIdx > candidates[candidateIdx - 1].position); // avoid reusing earlier candidates
        candidateIdx++
      ) {
        const checkedCandidate = candidates[candidateIdx];

        if (checkedJoltage > checkedCandidate.value) {
          // handling the tail - if there is less batteries left than candidates to the right
          // then we cannot replace checked candidate
          const remainingBatteries = bank.length - checkedBatteryIdx;
          const remainingCandidates = N_CANDIDATES - candidateIdx;

          if (remainingBatteries >= remainingCandidates) {
            rollOverCandidates(
              candidateIdx,
              checkedBatteryIdx,
              candidates,
              bank
            );
            break;
          }
        }
      }
    }

    const thisJoltage = candidates.reduce(
      (total, candidate) => total * 10 + candidate.value,
      0
    );
    console.log(`Bank: ${bank} -> Joltage: ${thisJoltage}`);
    totalJoltage += thisJoltage;
  });

  console.log(`Total Joltage: ${totalJoltage}`);
});

function initializeCandidates(n_candidates: number, bank: string) {
  const candidates = new Array<Candidate>(n_candidates);
  for (let i = 0; i < n_candidates; i++) {
    candidates[i] = {
      value: Number(bank[i]),
      position: i,
    };
  }
  return candidates;
}

function rollOverCandidates(
  startingCandidateIndex: number,
  startingBankIdx: number,
  candidates: Candidate[],
  bank: string
) {
  for (
    let indexShift = 0;
    startingCandidateIndex + indexShift < candidates.length;
    indexShift++
  ) {
    const candidateToFill = startingCandidateIndex + indexShift;
    candidates[candidateToFill] = {
      value: Number(bank[startingBankIdx + indexShift]),
      position: startingBankIdx + indexShift,
    };
  }
}
