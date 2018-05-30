// module using module pattern

// budget Ctrl
var budgetController = (function () {
    // some code
})();


// UI Ctrl
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
    };

    return {
        //expossing the private data to the public
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,//will be either income or expenses
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };

        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    };
})();

// Global App Ctrl
// controller  {receiving the other two module as argument}
var controller = (function (budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function () {
        // get the field input data from the private controller
        var input = UICtrl.getInput();
        console.log(input);


        // add the item to the budget controller
        // add the item to the UI
        // calc the budget
        // Display the budget on the UI


    }

    // eventListener on add button
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); // ctrlAddItem is a callBack fxn, no need of ()

    // eventListener on keypress
    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });


})(budgetController, UIController);







