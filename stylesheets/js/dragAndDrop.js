var selectedId = 0;

/**
 * @type {object} ドラッグされたbuttonのvalue一覧
 */
const selectedValueList = [];
/**
 * @type {object} ドラッグされたbuttonのid一覧
 */
const selectedIdList = [];

/**
 * @type {Object} dropをidに持つ要素のobject
 */
const dropElement = document.getElementById("drop");

/**
 * @type {Object} selectedをidに持つ要素のobject
 */
const order =document.getElementById("selected");

// drag開始時の処理
document.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/html", event.target.id);
    event.stopPropagation();
});

// drop時の処理
dropElement.addEventListener("drop", (event) => {
    var buttonId = event.dataTransfer.getData("text/html");
    var button = document.getElementById(buttonId);
    var buttonClone = button.cloneNode(true);
    buttonClone.id = `clone_${selectedId}`;
    buttonClone.draggable = false;
    selectedId ++ ;
    buttonClone.setAttribute("onclick", "deleteSelect(id)");
    dropElement.appendChild(buttonClone);
    selectedValueList.push(button.value);
    selectedIdList.push(buttonClone.id);
    order.value = selectedValueList;
    event.preventDefault();
    efectFlag(false);
})

// ドロップターゲット上にあるときに実行
dropElement.addEventListener("dragover", function(event) {
    event.preventDefault();
})

// ドロップターゲットに入ったときに実行
dropElement.addEventListener("dragenter", function(event) {
    event.preventDefault();
    efectFlag(true);
})

// ドロップターゲットから離れた時に実行
dropElement.addEventListener("dragleave", function(event) {
    efectFlag(false);
})

/**
 * @param {boolean} flag ドロップターゲットの背景を決めるboolean値
 */
function efectFlag(flag) {
    if(flag){
        dropElement.style.backgroundColor = "gray";
    } 
    else {
        dropElement.style.backgroundColor = "white"
    }
    return;
}


/**
 * @param {} id clickした要素のid
 */
function deleteSelect(id) {
    for(let i in selectedIdList) {
        if (selectedIdList[i]==id) {
            selectedValueList.splice(i, 1);
            selectedIdList.splice(i, 1);
        }
    }
    var button = document.getElementById(id);
    button.remove();
    order.value = selectedValueList;
    return;
}
