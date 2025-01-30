
const FirstElement = (arr, n = 1) => {
    return arr.slice(0, n);
};


const array = [10, 0, 5, 3];

console.log(FirstElement(array)); 
console.log(FirstElement(array,2));
