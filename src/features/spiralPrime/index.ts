import { getPrime } from "./prime";
import { findCentroid, findDimension } from "./spiral";
import { printSpiral } from "./print";

const RIGHT = "R";
const TOP = "T";
const LEFT = "L";
const DOWN = "D";
const DIRECTIONS = [RIGHT, TOP, LEFT, DOWN];

const makeDirection = () => {
  let turnCounter = 0; // 1 or 2
  let stepCounter = 0;
  let step = 0;
  let directionIndex = -1;

  return {
    get() {
      const isDirectionChanged = step === stepCounter;
      if (isDirectionChanged) {
        if (turnCounter === 2 || stepCounter === 0) {
          turnCounter = 1;
          stepCounter++;
        } else {
          turnCounter++;
        }

        step = 1;
        directionIndex = directionIndex < 3 ? directionIndex + 1 : 0;
      } else {
        step++;
      }

      return DIRECTIONS[directionIndex];
    },
  };
};

const sortSpiralPrime = (primes: number[], size: number) => {
  const [col, row] = findDimension(size);

  if (!col) {
    return [primes];
  }

  const sorted = Array.from(Array(col), () => new Array(row).fill(0));
  const direction = makeDirection();

  let [y, x]: any = findCentroid(col, row);

  primes.forEach((prime: number) => {
    sorted[y][x] = prime;

    switch (direction.get()) {
      case RIGHT:
        x += 1;
        break;
      case TOP:
        y -= 1;
        break;
      case LEFT:
        x -= 1;
        break;
      case DOWN:
        y += 1;
        break;
      default:
    }
  });

  return sorted;
};

export const printSpiralPrime = (size: number) => {
  const primes = getPrime(size);
  const sortedPrimes = sortSpiralPrime(primes, size);

  return printSpiral(sortedPrimes, primes[size - 1]);
};

export const getSpiralPrime = (size: number) => {
  const primes = getPrime(size);
  const sortedPrimes = sortSpiralPrime(primes, size);

  return sortedPrimes;
};
