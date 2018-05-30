// module using module pattern

// budget Ctrl
var budgetController = (function () {
    // function constructor start with capital letter, to distinguish from other functions
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    // Data structure
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    // public exponsure, can be called by other modules
    return {
        addItem: function (type, des, val) {

            var newItem;
            // [1 2 3 4 5], next ID = 6
            // [1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            // // Create new unique ID

            if (data.allItems[type].length > 0) {
                // runs only when there's some thing in the array
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                //assign 0 to avoid -1
                ID = 0;
            }


            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // pushi it into or data Structure 
            data.allItems[type].push(newItem);
            // return the new item
            return newItem; //so that other module can have access to the newItem
        },
        testing: function () {
            console.log(data);
        }
    };
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
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        // eventListener on add button
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); // ctrlAddItem is a callBack fxn, no need of ()

        // eventListener on keypress
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };


    var ctrlAddItem = function () {
        // declare variables
        var input, newItem;



        // 1. get the field input data from the private controller
        input = UICtrl.getInput();
        // console.log(input); //show input object


        // 2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value); //this 'input' is from UICtrl
        console.log(newItem);
        // 3. add the item to the UI
        // 4. calc the budget
        // 5. Display the budget on the UI


    };

    // public init fxn to initialize an app
    return {
        init: function () {
            console.log('App has started');
            setupEventListeners();
        }
    }


})(budgetController, UIController);

// starting the app
controller.init();




