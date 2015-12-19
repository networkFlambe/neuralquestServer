

var validateIndex = function(n) {
  return checkInteger(n) && n >= 0 && n <= 9;
};

var checkInteger = function(n) {
  return (n%1 === 0);
}


exports.validateIndex = validateIndex;

