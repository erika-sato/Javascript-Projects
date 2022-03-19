function calculateTip (event) {
event.preventDefault();
console.log(event);
let bill= document.getElementById('Bill').value;
let servicequality= document.getElementById('servicequality').value;
let numberOfpeople= document.getElementById('people').value;

if(bill == '' | servicequality == 0) {
    alert("Por favor, preencha os valores")
    return;
}
if(numberOfpeople == '' | numberOfpeople <=1) {
    numberOfpeople = 1;
    document.getElementById('each').style.display = "none"
} 
else {document.getElementById('each').style.display = "block"

}
let total = (bill * servicequality) / numberOfpeople;
total = total.toFixed(2);
document.getElementById('tip').innerHTML = total;
document.getElementById('totalTip').style.display = "block";
}
document.getElementById('totalTip').style.display = "none";
document.getElementById('each').style.display = "none";
document.getElementById('tipsForm').addEventListener('submit',calculateTip);