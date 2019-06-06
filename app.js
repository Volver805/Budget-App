var i = 0;
e = 0;
n = 0;
var incArr = [];
var expArr = [];
var income;
var expenses;
var total;
const itype = document.querySelector('.add__type');
const ides = document.querySelector('.add__description');
const ival = document.querySelector('.add__value');
document.querySelector('.add__btn').addEventListener("click",function() {
    controller();
});
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13) {
        controller();
    }
})
function controller() {
    if(ival.value && ides.value) {
    items[i] = new item(itype.value,ides.value,parseInt(ival.value));
    updateBudget(); 
    createElement(items[i]);
    i++;
    ides.value = '';
    ival.value= '';
    }
}
function item(type,description,value) {
    this.type = type;
    this.description = description;
    this.value = value;
}
var items = [];

function updateBudget() {
incArr = items.filter(item => item.type == "inc");
income = incArr.reduce((acc,{value}) => acc + value,0);
expArr = items.filter(item => item.type == "exp");
expenses = expArr.reduce((acc,{value}) => acc + value,0);
total = Math.abs(income - expenses);
document.querySelector(".budget__income--value").innerHTML = "+ " + income.toFixed(2);
document.querySelector(".budget__expenses--value").innerHTML = "- " + expenses.toFixed(2);
income > expenses ? document.querySelector(".budget__value").innerHTML = "+ " + total.toFixed(2) : document.querySelector(".budget__value").innerHTML = "- " + total.toFixed(2) ;
}   


function createElement(item) {
    var div = document.createElement('div');
    if (item.type == "inc") {
    div.innerHTML = "<div class=\"item clearfix\"><div class=\"item__description\">"+ item.description +"</div><div class=\"right clearfix\"><div class=\"item__value\">"+ item.value.toFixed(2) +"</div><div class=\"item__delete\"><button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button></div></div></div>"
    div.setAttribute("id","income-"+n);
    document.querySelector(".income__list").appendChild(div); 
        n++;    
    }
    else {
    div.innerHTML = "<div class=\"item clearfix\"><div class=\"item__description\">"+ item.description +"</div><div class=\"right clearfix\"><div class=\"item__value\">"+ item.value.toFixed(2) +"</div><div class=\"item__percentage\">"+ calculatePercentage(item.value) +"%</div><div class=\"item__delete\"><button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button></div></div></div>"
    div.setAttribute("id","expense-"+e);
    document.querySelector(".expenses__list").appendChild(div);
        e++;
    }               
}
function calculatePercentage(item) {
    console.log(income,item);
    var x = (item / income) * 100;
    return x == Infinity ? 0 : x;
}