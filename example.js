
var raphaelMaker = function () {
  return 'raphael';
};

var baskervilleMaker = function (string) {
  return (string + " baskerville");
};

var me = baskervilleMaker(raphaelMake())

console.log(me);

// console.log('before invoking: \n\n\n', baskervilleMaker);
// console.log('after invoking: \n\n\n', baskervilleMaker('raph '));

// var three = myPlusTwo(1);
// var myFour = myPlusTwo(2);
// console.log('after invoking3: \n\n\n', three);
// console.log('after invoking4: \n\n\n', myFour);
