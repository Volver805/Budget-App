const Month = new Date().getMonth();
const MonthDiv = document.querySelector(".budget__title--month"); 
if (Month == 0) {
    MonthDiv.innerHTML = "January";
}
if (Month == 1) {
    MonthDiv.innerHTML = "February";
}
if (Month == 2) {
    MonthDiv.innerHTML = "March";
}
if (Month == 3) {
    MonthDiv.innerHTML = "April";
}
if (Month == 4) {
    MonthDiv.innerHTML = "May";
}
if (Month == 5) {
    MonthDiv.innerHTML = "June ";
}
if (Month == 6) {
    MonthDiv.innerHTML = "July";
}
if (Month == 7) {
    MonthDiv.innerHTML = "August";
}
if (Month == 8) {
    MonthDiv.innerHTML = "September ";
}
if (Month == 9) {
    MonthDiv.innerHTML = "October ";
}
if (Month == 10) {
    MonthDiv.innerHTML = "November ";
}
if (Month == 11) {
    MonthDiv.innerHTML = "Decmber ";
}


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
});



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
    document.querySelector(".budget__expenses--percentage").innerHTML = calculatePercentage(expenses).toFixed(1) + "%"; 
income > expenses ? document.querySelector(".budget__value").innerHTML = "+ " + total.toFixed(2) : document.querySelector(".budget__value").innerHTML = "- " + total.toFixed(2) ;
for (j = 0;j < e;j++) {
    var val = document.querySelector("#expense-"+j);
    console.log(val.getElementsByClassName("item__value")[0].innerHTML);
    val.getElementsByClassName("item__percentage")[0].innerHTML = calculatePercentage(parseInt(val.getElementsByClassName("item__value")[0].innerHTML)).toFixed(1) + "%";
}
}   


function createElement(item) {
    var div = document.createElement('div');
    if (item.type == "inc") {
    div.innerHTML = "<div class=\"item clearfix\"><div class=\"item__description\">"+ item.description +"</div><div class=\"right clearfix\"><div class=\"item__value\">"+ "+" + item.value.toFixed(2) +"</div><div class=\"item__delete\"><button class=\"item__delete--btn\" id=\"delete-\""+ n +" onclick=\"remove(this)\"><i class=\"ion-ios-close-outline\"></i></button></div></div></div>"
    div.setAttribute("id","income-"+n);
    document.querySelector(".income__list").appendChild(div); 
        n++;    
    }
    else {
    div.innerHTML = "<div class=\"item clearfix\"><div class=\"item__description\">"+ item.description +"</div><div class=\"right clearfix\"><div class=\"item__value\">"+ "-" + item.value.toFixed(2) +"</div><div class=\"item__percentage\">"+ calculatePercentage(item.value).toFixed(1) +"%</div><div class=\"item__delete\"><button class=\"item__delete--btn\" id=\"delete-\""+ e +" onclick=\"remove(this)\"><i class=\"ion-ios-close-outline\"></i></button></div></div></div>"
    div.setAttribute("id","expense-"+e);
    document.querySelector(".expenses__list").appendChild(div);
        e++;
    }               
}
function calculatePercentage(item) {
    console.log(income,item);
    var x = (item / income) * 100;
    return x == Infinity ? 0 : Math.abs(x);
}

function remove(x) {
    x.parentNode.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode.parentNode);
    console.log(document.querySelector('.expenses__list'));
}

