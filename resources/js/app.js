// module using module pattern

// budget Ctrl
var budgetController = (function () {
    // some code
})();


// UI Ctrl
var UIController = (function () {
    // some code
})();

// Global App Ctrl
// controller  {receiving the other two module as argument}
var controller = (function (budgetCtrl, UICtrl) {

    var ctrlAddItem = function () {
        // get the field input data
        // add the item to the budget controller
        // add the item to the UI
        // calc the budget
        // Display the budget on the UI

        console.log('It works');
    }

    // eventListener on add button
    var addBtn = document.querySelector('.add__btn');
    addBtn.addEventListener('click', ctrlAddItem); // ctrlAddItem is a callBack fxn, no need of ()

    // eventListener on keypress
    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });


})(budgetController, UIController);







