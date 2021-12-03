let toprow = document.querySelector(".top_row");

let fontfamilyinput = document.querySelector(".font_family_input");
let fontsizeinput = document.querySelector(".font_size_input");
let boldIcon = document.querySelector(".fa-bold");
let italicIcon = document.querySelector(".fa-italic");
let underlineIcon = document.querySelector(".fa-underline");
let allignmentContainer = document.querySelector(".allignment_container");
let textColorHinput = document.querySelector(".text_color");
let textColorinput = document.querySelector(".fa-tint");
let backgroundHinput = document.querySelector(".background_color");
let backgroundinput = document.querySelector(".fa-fill-drip");
let createSheetIcon = document.querySelector(".fa-plus");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");

// -43:40

for (let i = 0; i < 26; i++) {
    let div = document.createElement("div");
    div.textContent = String.fromCharCode(65 + i);
    div.setAttribute("class", "cell");

    toprow.appendChild(div);
}


let leftcol = document.querySelector(".left_col")
for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.textContent = i;
    div.setAttribute("class", "cell");
    leftcol.appendChild(div);
}


let grid = document.querySelector(".grid");
for (let i = 0; i < 100; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row")

    for (let j = 0; j < 26; j++) {
        let div = document.createElement("div");
        div.setAttribute("contentEditable", true);
        // div.textContent=String.fromCharCode(65+j)+i;
        //every cell identification is required
        div.setAttribute("rId", i);
        div.setAttribute("cId", j);
        div.setAttribute("class", "cell");

        row.appendChild(div);

    }
    grid.appendChild(row)
}


//if a click on any cell
let allGridCells = document.querySelectorAll(".grid .cell");
let addressinput = document.querySelector(".address_input");
let formulainput = document.querySelector(".formula_input");

//formula input

for (let j = 0; j < allGridCells.length; j++) {
    allGridCells[j].addEventListener("click", function (e) {
        // alert("hello");
        let prevAddresss = addressinput.value;
        if (prevAddresss != "") {
            let ridcidobj = getRidCidfromaddress(prevAddresss);
            let prevCell = document.querySelector(`.grid .cell[rid='${ridcidobj.rid}'][cid='${ridcidobj.cid}']`);
            prevCell.style.border = "0.9px solid gray";
            //prevCell.style.borderRight="none";
            prevCell.style.borderTop = "none";
            prevCell.style.borderLeft = "none";

        }
        //then i will get the address
        let rid = allGridCells[j].getAttribute("rid");
        let cid = allGridCells[j].getAttribute("cid");
        rid = Number(rid);
        cid = Number(cid);
        // alert(rid + " "+ cid)

        addressinput.value = String.fromCharCode(cid + 65) + (rid + 1);

        let cCell = document.querySelector(`.grid .cell[rid='${rid}'][cid='${cid}']`);
        cCell.style.border = "2px solid #1B9CFC";

        let cellObject = db[rid][cid];
        // font size 
        let fontSize = cellObject.fontSize;
        fontsizeinput.value = fontSize;
        //boldness
        boldIcon.classList.remove("selected");
        if (cellObject.bold) {
            boldIcon.classList.add("selected");
        }
        //italic

        italicIcon.classList.remove("selected");
        if (cellObject.italic) {
            italicIcon.classList.add("selected");
        }


        //underline
        underlineIcon.classList.remove("selected");
        if (cellObject.underline) {
            underlineIcon.classList.add("selected");
        }


        //halignment
        let optionElements = allignmentContainer.children;
        for (let i = 0; i < optionElements.length; i++) {
            optionElements[i].classList.remove("selected");
        }

        if (cellObject.halign) {
            for (let i = 0; i < optionElements.length; i++) {
                let elementClasses = optionElements[i].classList;
                let hAlignment = elementClasses[elementClasses.length - 1];
                if (hAlignment == cellObject.halign) {
                    elementClasses.add("selected");
                }
            }
        }


      
            formulainput.value = cellObject.formula;
            
       

    })
}


//2way binding*******************************
//default value for every cell
let sheetsDb = [];

function initDB() {

    let db = [];
    for (let i = 0; i < 100; i++) {
        let rowArr = [];
        for (let j = 0; j < 26; j++) {
            let cellObject = {
                color: "black",
                backgroundColor: "white",
                fontFamily: "san-serif",
                fontSize: 14,
                halign: "center",
                italic: false,
                underline: false,
                bold: false,
                value: "",
                formula:"",
                children: []
            }
            rowArr.push(cellObject);
        }
        db.push(rowArr);
    }
    sheetsDb.push(db);
}

initDB();

let db=sheetsDb[0];

//for first cell
let firstCell = document.querySelector(".grid .cell[rId='0'][cId='0']");
firstCell.click();
firstCell.focus();

// firstCell.style.border = "2px solid green";

function getRidCidfromaddress(address) {
    let Asciivalue = address.charCodeAt(0);
    let cid = Asciivalue - 65;
    let rid = Number(address.substring(1)) - 1;
    return {
        rid: rid, cid: cid

    }
}


//create sheet icon
firstSheet.addEventListener("click",function(){
    for(let i=0;i<sheetList.children.length;i++){
        sheetList.children[i].classList.remove("active-sheet");
 }
 firstSheet.classList.add("active-sheet");
 db = sheetsDb[0];
 setinitUI();

})


createSheetIcon.addEventListener("click",sheetHandler);

function sheetHandler(){
    let noofchildren = sheetList.children.length;
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class","sheet");
    
    newSheet.setAttribute("sheetIdx",noofchildren);
    newSheet.textContent=`Sheet ${noofchildren+1}`
    sheetList.appendChild(newSheet);
    initDB();

    newSheet.addEventListener("click",function(){
        for(let i=0;i<sheetList.children.length;i++){
               sheetList.children[i].classList.remove("active-sheet");
        }
        newSheet.classList.add("active-sheet");
        let idx = newSheet.getAttribute("sheetIdx");
        db=sheetsDb[idx];
        setinitUI();
    })
    newSheet.click();
}

function sheetopenHandler(){
    let noofchildren = sheetList.children.length;
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class","sheet");
    newSheet.setAttribute("sheetIdx",noofchildren);
    newSheet.textContent=`Sheet ${noofchildren+1}`
    sheetList.appendChild(newSheet);

    newSheet.addEventListener("click",function(){
        for(let i=0;i<sheetList.children.length;i++){
               sheetList.children[i].classList.remove("active-sheet");
        }
        newSheet.classList.add("active-sheet");
        let idx = newSheet.getAttribute("sheetIdx");
        db=sheetsDb[idx];
        setinitUI();
    })
}