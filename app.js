// ################## DataController ##################

var DataController = (function() {

    function income (id,description,value) {
        this.id = id;
        this.des = description;
        this.val = value;
        this.removeObject = function() {
            this.des = '';
            this.val = 0;
        }
    }
    function expense(id,description,value) {
        this.id = id;
        this.des = description;
        this.val = value;
        this.percent = sumPercent(value);
        this.removeObject = function() {
            this.des = '';
            this.val = 0;
        }
    }

    
    var data = {
           items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0,
            total: 0,
            totalPercent: 0
        }
    
    }
    
    function sumTotal(t) {
       data.totals[t] = data.items[t].reduce((a,{val}) => a+= val,0);
       data.totals.total = data.totals.inc - data.totals.exp;
       data.totals.totalPercent = sumPercent(data.totals.exp);
       for (var i = 0;i < data.items.exp.length;i++) {
           data.items.exp[i].percent = sumPercent(data.items.exp[i].val);
       }
    }
    
    function sumPercent(x) {
        x = (x / data.totals.inc) * 100;
        if (x == Infinity || isNaN(x)) {
            return 0;
        }
        else {
            return x;
        }
    }
    
    return { 
        add: function(type,des,val) {
            var newItem;
            var ID;
            data.items[type].length > 0 ? ID = data.items[type][data.items[type].length - 1].id + 1: ID = 0;
            if (type == "inc") {
                newItem = new income(ID,des,val);
            }
            else {
            newItem = new expense(ID,des,val);
            }
           data.items[type].push(newItem);
           sumTotal(type);
           return newItem;
        },
        getData: function() {
            return data;
        },
        removeData: function(id,type) {
            data.items[type][id].removeObject();
            sumTotal(type);
            return data;
        }
        
    }
})();


// ################## UIController Object ##################


var UiController = (function() {
    var DOMstrings ={
        itype: document.querySelector(".add__type"),
        ides:  document.querySelector(".add__description"),
        ival:  document.querySelector(".add__value"),
        income: document.querySelector(".budget__income--value"),
        expense: document.querySelector(".budget__expenses--value"),
        total: document.querySelector(".budget__value"),
        percentage: document.querySelector(".budget__expenses--percentage"),
        incomeList: document.querySelector(".income__list"),
        expensesList: document.querySelector(".expenses__list"),
        date: document.querySelector('.budget__title--month')
    }
    var d = new Date();
    d = d.getMonth();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    DOMstrings.date.innerHTML = months[d];
    function percentageChange(el) {
        if(document.querySelector("#exp-"+el.id))  {
        document.querySelector("#exp-"+el.id).querySelector(".item__percentage").innerHTML = el.percent.toFixed(1) + "%";
    }
}
    return {
        getInput: function() {
            return {
                type: DOMstrings.itype.value,
                des: DOMstrings.ides.value,
                value: parseFloat(DOMstrings.ival.value)  
            }
        },
        removeInput: function() {
            DOMstrings.ival.value = 0;
            DOMstrings.ides.value = "";
        },
        updateUi: function(data) {
            DOMstrings.income.innerHTML = "+ " + data.totals.inc.toFixed(2);
            DOMstrings.expense.innerHTML = "- " + data.totals.exp.toFixed(2);
            data.totals.inc > data.totals.exp ? DOMstrings.total.innerHTML = "+"+data.totals.total.toFixed(2): DOMstrings.total.innerHTML = data.totals.total.toFixed(2);
            DOMstrings.percentage.innerHTML = data.totals.totalPercent.toFixed(1) + "%";    
        },
        addElement: function(el) {
            var type_;
            var div = document.createElement("div");
            if (el.constructor.name == "income") {
                type_ = 0;
                div.innerHTML = '<div class="item clearfix" id="inc-'+ el.id + '"><div class="item__description">'+ el.des +'</div><div class="right clearfix"><div class="item__value">+ '+ el.val.toFixed(2) + '</div><div class="item__delete">  <button class="item__delete--btn" onclick=\"deleteItem('+ el.id + ','+type_ +')"><i class="ion-ios-close-outline"></i></button></div></div> </div>'
                DOMstrings.incomeList.appendChild(div);
                        }
            else {
                type_ = 1;
                div.innerHTML = '<div class="item clearfix" id="exp-'+ el.id + '"><div class="item__description">'+ el.des +'</div><div class="right clearfix"><div class="item__value">- '+ el.val.toFixed(2) + '</div>  <div class="item__percentage">'+el.percent.toFixed(1)+'%</div><div class="item__delete">  <button class="item__delete--btn" onclick="deleteItem('+ el.id +','+type_+')""><i class="ion-ios-close-outline"></i></button></div></div> </div>'
                DOMstrings.expensesList.appendChild(div);
            }
        }
            ,
        updatePercents: function(arr) {
            arr.map(item => percentageChange(item));
        },
        deleteDiv: function(id,type) {
            var add = type + "-" + id;
            add = add.toString();
            var Div = document.getElementById(add);    
            Div.parentNode.removeChild(Div);
        }
    }
})();


// ################## Controller Object ##################


var Controller = function(dataCtrl,uiCtrl) {
    
    var setupEventListeners = function () {

        document.querySelector('.add__btn').addEventListener('click',addItem);

        document.addEventListener('keypress',function(e){
          
            if (e.keyCode == 13) {
                addItem();
             }
            });
        }
 
    function UI(x){
        uiCtrl.updateUi(x);
        uiCtrl.updatePercents(x.items.exp);
    }
    var addItem = function() {
        var item = uiCtrl.getInput();
        if(item.des !== '' && item.value !== 0 && !isNaN(item.value))  { 
        var newItem = dataCtrl.add(item.type,item.des,item.value);
        uiCtrl.removeInput();
        var Data = dataCtrl.getData();
        uiCtrl.addElement(newItem);
        UI(Data);

        }
    };

    return {
        init: function() {
            setupEventListeners();
        },
        removeItem: function(id,type) {
            var Data = dataCtrl.removeData(id,type);
            UI(Data);
            uiCtrl.deleteDiv(id,type);
        }
    }
    
}(DataController,UiController);

Controller.init();



var deleteItem = function (e,t) {
    var type;
    t == 0 ? type = "inc" : type = "exp";
    Controller.removeItem(e,type);
   
}


