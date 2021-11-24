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


fontsizeinput.addEventListener("change", function () {
    let fontSize = fontsizeinput.value;
    let address = addressinput.value;
    let ridcidobj = getRidCidfromaddress(address);
    let tobechangedCell = document.querySelector(`.grid .cell[rid='${ridcidobj.rid}'][cid='${ridcidobj.cid}']`);
    tobechangedCell.style.fontSize = fontSize + "px";


    let { rid, cid } = getRidCidfromaddress(address);
    let cellObject = db[rid][cid]
    cellObject.fontSize = fontSize;


})


fontfamilyinput.addEventListener("change", function () {
    let fontFamily = fontfamilyinput.value;
    let address = addressinput.value;
    let ridcidobj = getRidCidfromaddress(address);
    let tobechangedCell = document.querySelector(`.grid .cell[rid='${ridcidobj.rid}'][cid='${ridcidobj.cid}']`);
    tobechangedCell.style.fontFamily = fontFamily;

    let { rid, cid } = getRidCidfromaddress(address);
    db[rid][cid].fontFamily = fontFamily;
})



boldIcon.addEventListener("click", function () {
    let address = addressinput.value;
    let ridcidobj = getRidCidfromaddress(address);
    let tobechangedCell = document.querySelector(`.grid .cell[rid='${ridcidobj.rid}'][cid='${ridcidobj.cid}']`);
    let cellObject = db[ridcidobj.rid][ridcidobj.cid];
    if (cellObject.bold) {
        tobechangedCell.style.fontWeight = "normal";
        boldIcon.classList.remove("selected");
        cellObject.bold = false;
    } else {
        tobechangedCell.style.fontWeight = "bold";
        boldIcon.classList.add("selected");
        cellObject.bold = true;
    }

})



italicIcon.addEventListener("click", function () {
    let address = addressinput.value;
    let ridcidobj = getRidCidfromaddress(address);
    let tobechangedCell = document.querySelector(`.grid .cell[rid='${ridcidobj.rid}'][cid='${ridcidobj.cid}']`);

    let cellObject = db[ridcidobj.rid][ridcidobj.cid];
    if (cellObject.italic) {
        tobechangedCell.style.fontStyle = "none";
        italicIcon.classList.remove("selected");
        cellObject.italic = false;
    } else {
        tobechangedCell.style.fontStyle = "italic";
        italicIcon.classList.add("selected");
        cellObject.italic = true;
    }



})



underlineIcon.addEventListener("click", function () {
    let address = addressinput.value;
    let ridcidobj = getRidCidfromaddress(address);
    let tobechangedCell = document.querySelector(`.grid .cell[rid='${ridcidobj.rid}'][cid='${ridcidobj.cid}']`);

    let cellObject = db[ridcidobj.rid][ridcidobj.cid];
    if (cellObject.underline) {
        tobechangedCell.style.textDecoration = "none";
        underlineIcon.classList.remove("selected");
        cellObject.underline = false;
    } else {
        tobechangedCell.style.textDecoration = "underline";
        underlineIcon.classList.add("selected");
        cellObject.underline = true;
    }



})


allignmentContainer.addEventListener("click", function (e) {
    if (e.target !== allignmentContainer) {
        let classArr = e.target.classList;
        let hAlignment = classArr[classArr.length - 1];
        let address = addressinput.value;
        let ridcidobj = getRidCidfromaddress(address);
        let tobechangedCell = document.querySelector(`.grid .cell[rid='${ridcidobj.rid}'][cid='${ridcidobj.cid}']`);
        tobechangedCell.style.textAlignt = hAlignment;
        let optionElements = allignmentContainer.children;
        for (let i = 0; i < optionElements.length; i++) {
            optionElements[i].classList.remove("selected");
        }

        e.target.classList.add("selected");
        let cellObject = db[ridcidobj.rid][ridcidobj.cid];
        cellObject.halign = hAlignment;
    }
})

textColorinput.addEventListener("click", function (e) {
    textColorHinput.click();


})


textColorHinput.addEventListener("change", function (e) {
    let color = textColorHinput.value;
    let address = addressinput.value;
    let ridcidobj = getRidCidfromaddress(address);
    let tobechangedCell = document.querySelector(`.grid .cell[rid='${ridcidobj.rid}'][cid='${ridcidobj.cid}']`);
    tobechangedCell.style.color = color;


    let { rid, cid } = getRidCidfromaddress(address);
    db[rid][cid].color = color;

})


backgroundinput.addEventListener("click", function (e) {
    backgroundHinput.click();
})


backgroundHinput.addEventListener("change", function (e) {
    let color = backgroundHinput.value;
    let address = addressinput.value;
    let ridcidobj = getRidCidfromaddress(address);
    let tobechangedCell = document.querySelector(`.grid .cell[rid='${ridcidobj.rid}'][cid='${ridcidobj.cid}']`);
    tobechangedCell.style.backgroundColor = color;
    let { rid, cid } = getRidCidfromaddress(address);
    db[rid][cid].backgroundColor = color;

})
