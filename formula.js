for(let i=0;i<allGridCells.length;i++){
     allGridCells[i].addEventListener("blur",function(e){
         let content = allGridCells[i].textContent;
         let address = addressinput.value;
         let {rid,cid} = getRidCidfromaddress(address);
        let cellObject =  db[rid][cid];
        if(cellObject.value == content){
            return; 
        }
        if(cellObject.formula){
            removeFormula(address,cellObject.formula);
            cellObject.formula="";
        }
        setUI(content,rid,cid);
     })
}


formulainput.addEventListener("keydown",function(e){
    if(e.key == "Enter" && formulainput.value !=""){
        let cFormula = formulainput.value;
        let addressofthecell = addressinput.value;
        let {rid,cid} = getRidCidfromaddress(addressofthecell);
         let cellObject = db[rid][cid];

         if(cellObject.formula != cFormula){
               removeFormula(addressofthecell,cellObject.formula);
         }
        let value = evaluateFormula(cFormula);
        setUI(value,rid,cid);
        cellObject.formula = cFormula;
       setParent(addressofthecell,cFormula);
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
    let childrenArr = db[rid][cid].children;


    for(let i=0;i<childrenArr.length;i++){
       let childObj = getRidCidfromaddress(childrenArr[i]);
       let cellrcObj = db[childObj.rid][childObj.cid];
       let value = evaluateFormula(cellrcObj.formula);
       setUI(value,childObj.rid,childObj.cid);
    }



    
}

function setParent(address,formula){
     // console.log(formula);
    // ( A1 + A2 ) -> ( 10 + 20 )
    let formulaEntities = formula.split(" ");
    // [(,A1,+,A2,)]
    // console.log(formulaEntities);
    for (let i = 0; i < formulaEntities.length; i++) {
        let ascii = formulaEntities[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            // address -> rid cId
            let parentrcObj = getRidCidfromaddress(formulaEntities[i]);
            // db -> value
            let children = db[parentrcObj.rid][parentrcObj.cid].children;
            children.push(address);
           
        }
    }
    //console.log(formula);
}


function removeFormula(address, formula){
     // console.log(formula);
    // ( A1 + A2 ) -> ( 10 + 20 )
    let formulaEntities = formula.split(" ");
    // [(,A1,+,A2,)]
    // console.log(formulaEntities);
    for (let i = 0; i < formulaEntities.length; i++) {
        let ascii = formulaEntities[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            // address -> rid cId
            let parentrcObj = getRidCidfromaddress(formulaEntities[i]);
            // db -> value
            let children = db[parentrcObj.rid][parentrcObj.cid].children;
            let idx = children.indexOf(address);
            children.spice(idx, 1);
           
        }
    }
    //console.log(formula);
}
