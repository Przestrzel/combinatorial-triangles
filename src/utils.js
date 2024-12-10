import BigNumber from "bignumber.js";

let factMemo = {};

const factorial = (n) => {
  if(n === 0 || n === 1) {
    return BigNumber(1);
  }
  if(factMemo[n]) {
    return factMemo[n];
  }
  factMemo[n] = BigNumber(n).multipliedBy(factorial(n - 1));
  return factMemo[n];
}

const newtonBinominal = (n, k) => {
  return factorial(n).dividedBy(factorial(k).multipliedBy(factorial(n-k)));
}

export const pascalFn = (n, k) => {
  return newtonBinominal(n, k);
}

let numberDivideMemo = {};
const numberDivideIdx = (n, k) => `${n},${k}`

export const numberDivideFn = (n_1, k_1) => {
  const valueFn = (n, k) => {
    if(k > n) {
      return 0;
    }
    if(n === k || k === 1) {
      return 1;
    }
    const idx = numberDivideIdx(n, k);
    if(numberDivideMemo[idx]) {
      return numberDivideMemo[idx];
    }

    numberDivideMemo[idx] = BigNumber(valueFn(n-1, k-1)).plus(BigNumber(valueFn(n-k, k)));
    return numberDivideMemo[idx];
  }
  return BigNumber(valueFn(n_1 + 1, k_1 + 1));
}

export const setDivideFn = (n, k) => {
  let sum = BigNumber(0);
  // Start from 1,1
  n = n + 1;
  k = k + 1;
  let j = 0;
  while(j<=k) {
    console.log(n, k, j);
    sum = sum.plus(
      BigNumber(Math.pow(-1, j))
        .multipliedBy(newtonBinominal(k, j))
        .multipliedBy(BigNumber(k-j).exponentiatedBy(n))
    );
    j++
  }
  return sum.dividedBy(factorial(k));
}

export const generateTriangle = (size = 50, valueFn = pascalFn) => {
  let triangleArray = [];
  for(let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
      if(!triangleArray[i]) {
        triangleArray[i] = [];
      }
      if(i < j) {
        triangleArray[i][j] = null;
        continue;
      }
      triangleArray[i][j] = valueFn(i, j);
    }
    triangleArray[i] = triangleArray[i].filter(r => r !== null);
  }

  return triangleArray;
}
