const { promise } = require("zod");

const arr = [9, 8, 7, 8, 6, 5, 6, 5, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - i - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}

let count = [];
for (let i = 0; i < arr.length; i++) {
  if (i === 0 || arr[i] !== arr[i + 1]) {
    count.push(arr[i]);
  }
}
console.log(count);

// console.log("1"--"1"),
// console.log("5"+-"2")

console.log(start);

setTimeout(() => {
  console.log("end");
}, 0);

console.log(promise(end));

console.log(end);
