const tilesContainer = document.querySelector(".tiles");

const colors = [
  "pink",
  "cyan",
  "lime",
  "orange",
  "magenta",
  "yellow",
  "olive",
  "blue",
];

const colorsPickList = [...colors, ...colors];

console.log(colorsPickList);

const tileCount= colorsPickList.length;

//Starting Game State
let revealedCount=0;
let activeTile=null;
let awaitingEndOfMove=false; //not in the middle of a turn 

function buildTile(color){
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");
        if(awaitingEndOfMove 
            || revealed === "true"
            || element === activeTile){
            return;
        }

        element.style.backgroundColor = color;

        if(!activeTile){
            activeTile = element;
            return; //ends the move
        }


        const colorToMatch = activeTile.getAttribute("data-color");

        if(colorToMatch === color){
            activeTile.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");
            activeTile=null;
            awaitingEndOfMove=false;
            revealedCount += 2;

            if(revealedCount === tileCount){
                alert("YOU WIN! Refresh to play again");
            }
            return;
        }


        awaitingEndOfMove=true;
        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;

            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000)
    });

    return element;  
}



for(let i =0; i<tileCount; i++){
    const randomIndex=Math.floor(Math.random() * colorsPickList.length);
    const color = colorsPickList[randomIndex];
    const tile = buildTile(color);
   

    colorsPickList.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);
    
    
    
    console.log(color);
}

