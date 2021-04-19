
var words = ["cheese", "bone", "socks", "leaf", "whale", "pie", "shirt", "orange", "lollipop", "bed", "mouth", "person", "horse", "snake", "jar", "spoon", "lamp", "kite", "monkey", "swing", "cloud", "snowman", "baby", "eyes", "pen", "giraffe", "grapes", "book", "ocean", "star", "cupcake", "cow", "lips", "worm", "sun", "basketball", "hat", "bus", "chair", "purse", "head", "spider", "shoe", "ghost", "coat", "chicken", "heart", "jellyfish", "tree", "seashell", "duck", "bracelet", "grass", "jacket", "slide", "doll", "spider", "clock", "cup", "bridge", "apple", "balloon", "drum", "ears", "egg", "bread", "nose", "house", "beach", "airplane", "inchworm", "hippo", "light", "turtle", "ball", "carrot", "cherry", "ice", "pencil", "circle", "bed", "ant", "girl", "glasses", "flower", "mouse", "banana", "alligator", "bell", "robot", "smile", "bike", "rocket", "dinosaur", "dog", "bunny", "cookie", "bowl", "apple", "door", "horse", "door", "song", "trip", "backbone", "bomb", "round", "treasure", "garbage", "park", "whistle", "palace", "baseball", "coal", "queen", "dominoes", "photograph", "computer", "hockey", "aircraft", "pepper", "key", "iPad", "whisk", "cake", "circus", "battery", "mailman", "cowboy", "password", "bicycle", "skate", "electricity", "lightsaber", "nature", "shallow", "toast", "outside", "America", "roller", "blading", "gingerbread", "man", "bowtie", "light", "bulb", "platypus", "music", "sailboat", "popsicle", "knee", "pineapple", "tusk", "sprinkler", "money", "spool", "lighthouse", "doormat", "face", "flute", "owl", "gate", "suitcase", "bathroom", "scale", "peach", "newspaper", "watering", "can", "hook", "school", "beaver", "camera", "hair", "dryer", "mushroom", "quilt", "chalk", "dollar", "soda", "chin", "swing", "garden", "ticket", "boot", "cello", "rain", "clam", "pelican", "stingray", "nail", "sheep", "stoplight", "coconut", "crib", "hippopotamus", "ring", "video", "camera", "snowflake"]
var alreadyPickedWords = [];
function startGame(param) {
    hideSettings();
    resetScore();
    var secondsElement = document.getElementById("seconds");
    var seconds = secondsElement.options[secondsElement.selectedIndex].text;
    console.log('seconds :>> ', seconds);
    var countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = seconds
    var interval = setInterval(() => {
        seconds--;
        countdownElement.innerHTML = seconds
        if (seconds < 1) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
    showGamePage();
}

function resetScore() {
    document.getElementById("scoreElement").innerHTML = "0";
}

function showLists() {
    document.getElementById("successList").hidden = false;
    document.getElementById("failureList").hidden = false;
}

function clearLists() {
    document.getElementById("successList").innerHTML = "";
    document.getElementById("failureList").innerHTML = "";
}

function showGamePage() {
    document.getElementById("gameElement").hidden = false;
    showLists();
    nextWord();
}

function hideGamePage() {
    document.getElementById("gameElement").hidden = true;
}

function endGame() {
    alert("Time is out!");
    hideGamePage();
    showSettings();
}

function addPoint() {
    document.getElementById("scoreElement").innerHTML = parseInt(document.getElementById("scoreElement").innerHTML) + 1;
    addWordToSuccessList(getCurrentWord());
    nextWord();
}

function skip() {
    addWordToFailureList(getCurrentWord());
    nextWord();
}

function getCurrentWord() {
    return document.getElementById("theWord").innerHTML;
}

function addWordToFailureList(word) {
    var listElement = document.getElementById("failureListElement");
    var liItem = document.createElement("li");
    liItem.innerHTML = word;
    listElement.appendChild(liItem);
}

function addWordToSuccessList(word) {
    var listElement = document.getElementById("successListElement");
    var liItem = document.createElement("li");
    liItem.innerHTML = word;
    listElement.appendChild(liItem);
}

function nextWord() {
    document.getElementById("theWord").innerHTML = getNextWord();
}

function getNextWord() {
    var index = Math.floor(Math.random() * words.length);
    var word = words[index];
    if (index > -1) {
        words.splice(index, 1);
    }
    console.log('words :>> ', words);
    console.log('word :>> ', word);
    return word;
}

function showSettings() {
    document.getElementById("settingsElement").hidden = false;
}

function hideSettings() {
    document.getElementById("settingsElement").hidden = "true";
}