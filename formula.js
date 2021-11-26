for(let i=0;i<allGridCells.length;i++){
     allGridCells[i].addEventListener("blur",function(e){
         let content = allGridCells[i].textContent;
         let address = addressinput.value;
         let ridcidobj = getRidCidfromaddress(address);
         db[ridcidobj.rid][ridcidobj.cid].value = content;
     })
}


formulainput.addEventListener("keydown",function(e){
    if(e.key == "Enter" && formulainput.value !=""){
        let cFormula = formulainput.value;
        let addressofthecell = addressinput.value;
        let {rid,cid} = getRidCidfromaddress(addressofthecell);
         
        let value = evaluateFormula(cFormula);
        setUI(value,rid,cid);
       db[rid][cid].formula = cFormula;
    }
})


function evaluateFormula(formula){
    

    // console.log(formula);
    // ( A1 + A2 ) -> ( 10 + 20 )
    let formulaEntities = formula.split(" ");
    // [(,A1,+,A2,)]
    // console.log(formulaEntities);
    for (let i = 0; i < formulaEntities.length; i++) {
        let ascii = formulaEntities[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            // address -> rid cId
            let cellrcObj = getRidCidfromaddress(formulaEntities[i]);
            // db -> value
            let value = db[cellrcObj.rid][cellrcObj.cid].value;
            // replace in formula
            formula = formula.replace(formulaEntities[i], value);
        }
    }
    //console.log(formula);
    let result = eval(formula);
    return result;
}

function setUI(value,rid,cid){
    let tobechangedCell = document.querySelector(`.grid .cell[rid='${rid}'][cid='${cid}']`);
    tobechangedCell.textContent = value;
    db[rid][cid].value = value;
    
}
