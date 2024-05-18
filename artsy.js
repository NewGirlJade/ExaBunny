const grid = document.getElementById("grid");
grid.classList.add("grid");
const output = document.getElementById("output");

const pixels = new Map();

for (let x = 0; x < 10; x++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let y = 0; y < 10; y++) { 
        const button = document.createElement("button");
        button.classList.add("pixel");
        const coordinates = `${x}${y}`
        button.innerText = coordinates;
        row.appendChild(button);

        button.addEventListener("click", () => {
            button.classList.toggle("light");
            if (pixels.get(coordinates) === "on") {
                pixels.set(coordinates, "off");
            } else {
                pixels.set(coordinates, "on");
            }
            updateProgram();
        });
    }
    grid.appendChild(row);
}


const clearButton = document.createElement("button");
clearButton.innerText = "Clear\nAll";
clearButton.classList.add("bigButton");
clearButton.addEventListener("click", () => {
    pixels.clear();
    updateProgram();

    for (const button of document.getElementsByClassName("pixel")) {
        button.classList.remove("light");
    };
})

const progButton = document.createElement("button");
progButton.innerText = "Clear\nProgram\nText";
progButton.classList.add("bigButton");
progButton.addEventListener("click", () => {
    pixels.clear();
    updateProgram();

})

grid.appendChild(clearButton);
grid.appendChild(progButton)

function updateProgram(){
    let program = "";
    for (const [pixel, state] of pixels) {
        if (state === "on") {
            program += `COPY 2${pixel} GP\n`;
        }
    }
    output.innerText = program
}