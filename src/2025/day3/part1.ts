import * as fs from "fs";

fs.promises.readFile("./src/2025/day3/input.txt", "utf-8").then((text) => {
  let totalJoltage = 0;
  text.split("\n").forEach((bank: string) => {
    bank = bank.trim();
    let firstDigitCandidate = Number(bank[0]);
    let secondDigitCandidate = Number(bank[1]);
    for (let i = 1; i < bank.length - 1; i++) {
      const current = Number(bank[i]);
      if (current > firstDigitCandidate) {
        firstDigitCandidate = current;
        secondDigitCandidate = Number(bank[i + 1]);
      } else if (current > secondDigitCandidate) {
        secondDigitCandidate = current;
      }

      if (firstDigitCandidate == 9 && secondDigitCandidate == 9) break;
    }
    if (Number(bank[bank.length - 1]) > secondDigitCandidate) {
      secondDigitCandidate = Number(bank[bank.length - 1]);
    }

    const thisJoltage = 10 * firstDigitCandidate + secondDigitCandidate;
    // console.log(`Bank: ${bank} -> Joltage: ${thisJoltage}`);
    totalJoltage += thisJoltage;
  });

  console.log(`Total Joltage: ${totalJoltage}`);
});
