/**
 * Calculates performance bolts (0-5) from tries and correct answers.
 * @param {number} tries - Total number of tries
 * @param {number} correct - Total number of correct answers
 * @returns {number} Performance bolts (0-5)
 */
function calculatePerformanceBolts(tries, correct) {
    if (!tries || tries <= 0) return 0;
   /*  let ratio = correct / tries; */
   let ratio = Math.max(0, 1 - ((tries-correct)/correct)* 0.25);
    let bolts = Math.round(ratio * 5);
    console.log(`Performance bolts calculated: ${bolts} (tries: ${tries}, correct: ${correct})`);
    return Math.max(0, Math.min(5, bolts));
}

module.exports = {
    calculatePerformanceBolts
};
