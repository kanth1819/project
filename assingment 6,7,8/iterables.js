let num =[2356, 1212, 8967, 4563, 2345];


//reduce 
let add=num.reduce((acc,num)=> acc+num);
console.log(add);

let sub=num.reduce((acc,num)=> acc-num);
console.log(sub);

let mul=num.reduce((acc,num)=> acc*num);
console.log(mul);


//foreach
let add1=num.forEach((acc,num)=> acc+num);
console.log(add);

let sub1=num.forEach((acc,num)=> acc-num);
console.log(sub);

let mul1=num.forEach((acc,num)=> acc*num);
console.log(mul);


