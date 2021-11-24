for(let i=0;i<allGridCells.length;i++){
     allGridCells[i].addEventListener("blur",function(e){
         let content = allGridCells[i].textContent;
         let address = addressinput.value;
         let ridcidobj = getRidCidfromaddress(address);
         db[ridcidobj.rid][ridcidobj.cid].value = content;
     })
}