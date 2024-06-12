document.addEventListener("DOMContentLoaded", function() {
    const timezoneSelect = document.getElementById("timezoneselect");
const liveclockdiv = document.getElementById("liveclockdiv")

function updateClock(){

    if(liveclockdiv.style.display === "flex"){
        const selectedTimezone = timezoneSelect.value;
        const now = new Date();

        let hours = now.getUTCHours()
        let mins = now.getUTCMinutes()
        let seconds = now.getUTCSeconds()

        switch(selectedTimezone){
            case "IST":
                hours = (hours + 5)% 24;
                mins = mins + 30;
                if (mins >= 60) {
                    mins -= 60;
                    hours = (hours + 1) % 24;
                }
                else{
                    mins = mins % 60;
                }
                break;
            case "GMT":
                break;
            case "EST":
                hours = (hours - 5 + 24) % 24;
                break;
            case "PST":
                hours = (hours - 8 + 24) % 24;
                break;
            case "CST":
                hours = (hours - 6 + 24) % 24;
                break;
            default:
                break;
        }

        hours = hours.toString().padStart(2,0)
        mins = mins.toString().padStart(2,0)
        seconds = seconds.toString().padStart(2,0)

        liveclockdiv.textContent = `${hours}:${mins}:${seconds}`
    }
}

updateClock()

setInterval(updateClock,1000)

const timezone = document.getElementById("timezoneselect")

timezone.addEventListener('change', updateClock)


const allthemeimages = document.getElementsByClassName("themeimages");

for( let i=0;i<allthemeimages.length;i++){
    const theimage = allthemeimages[i]
    theimage.onclick = function(){
        document.body.style.backgroundImage = `url(${theimage.src})`;
    }
}

const settingsButton = document.getElementById("settingsbutton");
const settingstab = document.getElementById("settingstab");
const themesdiv = document.getElementById("themesbtn");
const text = document.getElementById("textbtn");
const themesright = document.getElementById("themesright");
const textdiv = document.getElementById("textdiv");

settingsButton.addEventListener("click", function(event) {
    settingstab.style.visibility = "visible";
    themesright.style.visibility = "visible";
    textdiv.style.visibility = "hidden";
    event.stopPropagation();
});

document.addEventListener("click", function(event) {
    const insideClick = settingstab.contains(event.target);
    if (settingstab.style.visibility === "visible" && !insideClick) {
        settingstab.style.visibility = "hidden";
        themesright.style.visibility = "hidden";
        textdiv.style.visibility = "hidden";
    }
});

themesdiv.addEventListener("click", function(event) {
    themesright.style.visibility = "visible";
    textdiv.style.visibility = "hidden"
    event.stopPropagation();
});

text.addEventListener("click", function(event) {
    themesright.style.visibility = "hidden";
    textdiv.style.visibility = "visible";
    event.stopPropagation();
});

const clocktype = document.getElementById("typeofclock");
const stopwatch = document.getElementById("stopwatchdiv");
const stopwatchOptions = document.getElementById("stopwatchoptions");
const savedtime = document.getElementById("savetime")
let isRunning = false;
let count = 0;
const start = document.getElementById("start")
const stopp = document.getElementById("stop")
const reset = document.getElementById("reset")
let hours = 0;
let mins = 0;
let seconds = 0;
let savetime = false;
let timesaved = `00:00:00:00`

clocktype.addEventListener("click", function(event){
    if(clocktype.textContent === "Stopwatch"){

        clocktype.textContent = "Live Clock";

        stopwatch.style.display = "flex"
        stopwatchOptions.style.display = "flex"
        liveclockdiv.style.display = "none"
        if(savetime){
            stopwatch.innerHTML = timesaved
            hours = savedhours 
            mins = savedminds 
            seconds = savedsecs 
            count = savedcount 
        }
        else{
            savetime = false
            hours = 0
            mins = 0
            count = 0
            seconds = 0
            stopwatch.innerHTML = `00:00:00:00`
        }
        isRunning = false;
        
        savedtime.style.display = "flex"
        timezoneSelect.style.display = "none"

    } else if(clocktype.textContent === "Live Clock"){
        clocktype.textContent = "Stopwatch";


        stopwatch.style.display = "none"
        stopwatchOptions.style.display = "none"
        liveclockdiv.style.display = "flex"

        savedtime.style.display = "none"
        timezoneSelect.style.display = "flex"
    }
});

window.onload = function(){
    clocktype.textContent = "Stopwatch";


    stopwatch.style.display = "none"
    stopwatchOptions.style.display = "none"
    liveclockdiv.style.display = "flex"
    savedtime.style.display = "none"
    timezoneSelect.style.display = "flex"
}

savedtime.addEventListener("click",function(event){
    savedhours = hours
    savedminds = mins
    savedsecs = seconds
    savedcount = count

    timesaved = stopwatch.textContent
    savetime = true
})

start.addEventListener("click",function(event){
    isRunning = true;
    update()
})

stopp.addEventListener("click",function(event){
    isRunning = false
})

reset.addEventListener("click",function(event){
    isRunning = false;
    count = 0
    hours = 0;
    mins = 0
    seconds = 0
    stopwatch.textContent = "00:00:00:00"
})

function update(){
    if(isRunning){
        count++
        if(count==100){
            count = 0;
            seconds ++
        }
        if(seconds == 60){
            seconds = 0
            mins++
        }
        if(mins == 60){
            mins = 0
            hours++
        }

        newcount = count.toString().padStart(2,"0")
        newseconds = seconds.toString().padStart(2,"0")
        newmins = mins.toString().padStart(2,"0")
        newhours = hours.toString().padStart(2,"0")

        stopwatch.textContent = `${newhours}:${newmins}:${newseconds}:${newcount}`
        
    }
}

update()

setInterval(update,10)

const coloroptions = document.getElementById("coloroptions")
const optionsthatcanbeedited = document.getElementById("editoptions")


coloroptions.addEventListener("change", function(event) {
    const selectedColor = coloroptions.value;
    switch (selectedColor) {
        case "Black":
            textcolorchanger(0, 0, 0, "Black");
            break;
        case "White":
            textcolorchanger(255, 255, 255, "White");
            break;
        case "Red":
            textcolorchanger(255, 0, 0, "Red");
            break;
        case "Light Blue":
            textcolorchanger(173, 216, 230, "LightBlue");
            break;
        case "Light Green":
            textcolorchanger(144, 238, 144, "LightGreen");
            break;
        case "Orange":
            textcolorchanger(255, 165, 0, "Orange");
            break;
        case "Dark Blue":
            textcolorchanger(0, 0, 139, "DarkBlue");
            break;
        case "Dark Green":
            textcolorchanger(0, 100, 0, "DarkGreen");
            break;
        case "Pink":
            textcolorchanger(255, 192, 203, "Pink");
            break;
        case "Purple":
            textcolorchanger(128, 0, 128, "Purple");
            break;
        case "Yellow":
            textcolorchanger(255, 255, 0, "Yellow");
            break;
        default:
            console.log("Invalid color selected");
    }
});

function textcolorchanger(Red, Green, Blue, Color) {
    const colorchangers = document.getElementsByClassName("time");
    for (let i = 0; i < colorchangers.length; i++) {
        const changeelementcolor = colorchangers[i];
        changeelementcolor.style.color = `rgb(${Red},${Green},${Blue})`;
    }

    const settingslogos = document.getElementsByClassName("settingslogo");
    for (let j = 0; j < settingslogos.length; j++) {
        const currentlogocolor = settingslogos[j];
        if (currentlogocolor.id === Color) {
            currentlogocolor.style.display = "flex";
        } else {
            currentlogocolor.style.display = "none";
        }
    }
}


const bgcolor = document.getElementById("bgcolouroptions")

bgcolor.addEventListener("change", function(event){
    console.log("text color changed");
    const selectedbgcolor = bgcolor.value;
    switch(selectedbgcolor){
        case "None":
            bgcolorchanger(0, 0, 0, true)
            break;
        case "Black":
            console.log("Color is black");
            bgcolorchanger(0, 0, 0, false);
            break;
        case "White":
            console.log("Color is white");
            bgcolorchanger(255, 255, 255, false);
            break;
        case "Red":
            bgcolorchanger(255, 0, 0, false);
            break;
        case "Light Blue":
            bgcolorchanger(173, 216, 230, false);
            break;
        case "Light Green":
            bgcolorchanger(144, 238, 144), false;
            break;
        case "Orange":
            bgcolorchanger(255, 165, 0, false);
            break;
        case "Dark Blue":
            bgcolorchanger(0, 0, 139,false);
            break;
        case "Dark Green":
            bgcolorchanger(0, 100, 0, false);
            break;
        case "Pink":
            bgcolorchanger(255, 192, 203, false);
            break;
        case "Purple":
            bgcolorchanger(128, 0, 128, false);
            break;
        case "Yellow":
            bgcolorchanger(255, 255, 0, false);
            break;
        default:
            console.log("Invalid color selected");
    }
});

function bgcolorchanger(Red , Green, Blue, Transparent){
    const bgchangers = document.getElementsByClassName("bgavailable")
    for(let i = 0 ;i<bgchangers.length;i++){
        const changebgcolor = bgchangers[i]
        console.log(changebgcolor)
        if(Transparent){
            changebgcolor.style.backgroundColor = "transparent"
        }
        else{
            changebgcolor.style.backgroundColor = `rgb(${Red},${Green},${Blue})`
        }
    }
}

const sizenumber = document.getElementById("sizenumber");

const originalSizes = Array.from(document.getElementsByClassName("time")).map(element => {
    return parseFloat(window.getComputedStyle(element).fontSize);
});

sizenumber.addEventListener("change", function(event) {
    const chosenNumber = parseInt(sizenumber.value, 10);
    const sizeToChange = document.getElementsByClassName("time");

    const adjustment = chosenNumber - 20;

    for (let i = 0; i < sizeToChange.length; i++) {
        const element = sizeToChange[i];
        const newSize = originalSizes[i] + adjustment;
        element.style.fontSize = `${newSize}px`;
    }
});

const fonttype = document.getElementById("fontoptions")

fonttype.addEventListener("change", (event) => {
    const fonttobeapplied = fonttype.value
    const elementsforfont = document.getElementsByClassName("fontstyle")

    for(let i = 0; i < elementsforfont.length; i++){
        const fontelement = elementsforfont[i]
        if(fonttobeapplied == "Default"){
            fontelement.style.fontFamily = "monospace"
        }
        else{
            fontelement.style.fontFamily = fonttobeapplied
        }
    }
})
});