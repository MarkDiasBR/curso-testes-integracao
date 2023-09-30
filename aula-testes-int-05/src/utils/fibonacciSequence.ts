function fibonacciSequence(numberOfElements: number) {
    const sequence = [1, 1];
    for (let i = 2; i < numberOfElements; i++) {
      const nextNumber = sequence[i - 1] + sequence[i - 2];
      sequence.push(nextNumber);
    }
  
    return sequence;
}

export default fibonacciSequence;