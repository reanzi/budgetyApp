// module using module pattern

// budget Module
var budgetController = (function () {
    var x = 12;

    var add = function (a) {
        return x + a;
    }
    return {
        publicTest: function (b) {
            return add(b);
        }
    }
})();


// UI Module
var UIController = (function () {
    // some code
})();


// controller  {receiving the other two module as argument}
var controller = (function (budgetCtrl, UICtrl) {
    var z = budgetCtrl.publicTest(10);

    return {
        anotherPublic: function () {
            console.log(z);
        }
    }
})(budgetController, UIController);