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

    // fxn to calc total depending on 'type' ; inc/exp
    var calculateTotal = function (type) {
        var sum = 0;

        data.allItems[type].forEach(function (currentElement) {
            sum += currentElement.value; // equal to [sum = sum + curEl.value]
        });
        // store to a total sorted by type
        data.totals[type] = sum;

        /*
        sum = 0; initially
        [100, 50, 220] , array to loop,
        1st , loop[0:index], sum = 0 + 100; sum =100,
        2nd , loop[1:index], sum = 100 + 50; sum =150,
        3rd , loop[2:index], sum = 150 + 220; sum =370,
        final sum = 370
         */
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
        },
        budget: 0,
        percentage: -1 // -1 means does not exist, hence it wont show %
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

        calculateBudget: function () {
            // 1. calc total income & expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // 2. calc the budget : inc - exp
            data.budget = data.totals.inc - data.totals.exp;
            // 3. calc the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
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
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
    };

    return {
        //expossing the private data to the public
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,//will be either income or expenses
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };

        },

        addListItem: function (obj, type) {

            var html, newHtml, element;
            // 1. create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id% "><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // 2. Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id); // 1st copies the html value and replaces id
            newHtml = newHtml.replace('%description%', obj.description); //copies the newHtml as it has desired format
            newHtml = newHtml.replace('%value%', obj.value);

            // 3. Insert the HTml into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            // fields return a list, so we need to convert into array
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });
            //after clear return focus to description input
            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
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

    var updateBudget = function () {
        var budget;

        // 1. calc the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
        // console.log(budget);

    };

    var ctrlAddItem = function () {
        // declare variables
        var input, newItem;



        // 1. get the field input data from the private controller
        input = UICtrl.getInput();
        // console.log(input); //show input object

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value); //this 'input' is from UICtrl
            // console.log(newItem);
            // 3. add the item to the UI
            UICtrl.addListItem(newItem, input.type); //passing the newItem to the UI

            // 4. Clear the input fields
            UICtrl.clearFields();

            // 5. Calculate & Update budget
            updateBudget();
        }


    };

    // public init fxn to initialize an app
    return {
        //this resets all functions
        reset: {
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: -1
        },
        init: function () {
            console.log('App has started');
            UICtrl.displayBudget(this.reset);
            setupEventListeners();
        }
    }


})(budgetController, UIController);

// starting the app
controller.init();




