
var words = [];
const allWords = ["cheese", "bone", "socks", "leaf", "whale", "pie", "shirt", "orange", "lollipop", "bed", "mouth", "person", "horse", "snake", "jar", "spoon", "lamp", "kite", "monkey", "swing", "cloud", "snowman", "baby", "eyes", "pen", "giraffe", "grapes", "book", "ocean", "star", "cupcake", "cow", "lips", "worm", "sun", "basketball", "hat", "bus", "chair", "purse", "head", "spider", "shoe", "ghost", "coat", "chicken", "heart", "jellyfish", "tree", "seashell", "duck", "bracelet", "grass", "jacket", "slide", "doll", "spider", "clock", "cup", "bridge", "apple", "balloon", "drum", "ears", "egg", "bread", "nose", "house", "beach", "airplane", "inchworm", "hippo", "light", "turtle", "ball", "carrot", "cherry", "ice", "pencil", "circle", "bed", "ant", "girl", "glasses", "flower", "mouse", "banana", "alligator", "bell", "robot", "smile", "bike", "rocket", "dinosaur", "dog", "bunny", "cookie", "bowl", "apple", "door", "horse", "door", "song", "trip", "backbone", "bomb", "round", "treasure", "garbage", "park", "whistle", "palace", "baseball", "coal", "queen", "dominoes", "photograph", "computer", "hockey", "aircraft", "pepper", "key", "iPad", "whisk", "cake", "circus", "battery", "mailman", "cowboy", "password", "bicycle", "skate", "electricity", "lightsaber", "nature", "shallow", "toast", "outside", "America", "roller", "blading", "gingerbread", "man", "bowtie", "light", "bulb", "platypus", "music", "sailboat", "popsicle", "knee", "pineapple", "tusk", "sprinkler", "money", "spool", "lighthouse", "doormat", "face", "flute", "owl", "gate", "suitcase", "bathroom", "scale", "peach", "newspaper", "watering", "can", "hook", "school", "beaver", "camera", "hair", "dryer", "mushroom", "quilt", "chalk", "dollar", "soda", "chin", "swing", "garden", "ticket", "boot", "cello", "rain", "clam", "pelican", "stingray", "nail", "sheep", "stoplight", "coconut", "crib", "hippopotamus", "ring", "video", "camera", "snowflake"]
var alreadyPickedWords = [];
var interval;
function startGame(param) {
    words = [...allWords];
    removeAlreadyUsedWords();
    hideSettings();
    resetScore();
    clearLists();
    var secondsElement = document.getElementById("seconds");
    var seconds = secondsElement.options[secondsElement.selectedIndex].text;
    console.log('seconds :>> ', seconds);
    startCountdown(seconds);

    showGamePage();
}
function startCountdown(seconds) {
    var countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = seconds
    interval = setInterval(() => {
        seconds--;
        countdownElement.innerHTML = seconds
        if (seconds < 1) {
            clearInterval(interval);
            endGame("Time is out!");
        }
    }, 1000);
}

function resetCountdown() {
    clearInterval(interval);
    var countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = "0"
}

function resetScore() {
    document.getElementById("scoreElement").innerHTML = "0";
}

function showLists() {
    document.getElementById("successList").hidden = false;
    document.getElementById("failureList").hidden = false;
}

function clearLists() {
    document.getElementById("successListElement").innerHTML = "";
    document.getElementById("failureListElement").innerHTML = "";
}

function showGamePage() {
    document.getElementById("gameElement").hidden = false;
    showLists();
    nextWord();
}

function uploadWord(word) {
    firebase.database().ref('words/' + word).set({
        word: word,
        used: true
    }, (error) => {
        if (error) {
            // The write failed...
            console.error('error :>> ', error);
        } else {
            console.log("data uploaded!");
            // Data saved successfully!
        }
    });
}

function hideGamePage() {
    document.getElementById("gameElement").hidden = true;
}

function endGame(param) {
    resetCountdown("0");
    alert(param);
    hideGamePage();
    showSettings();
}

function addPoint() {
    if (words.length < 1) {
        endGame("Out of words");
    }
    document.getElementById("scoreElement").innerHTML = parseInt(document.getElementById("scoreElement").innerHTML) + 1;
    addWordToSuccessList(getCurrentWord());
    uploadWord(getCurrentWord());
    nextWord();
}

function skip() {
    if (words.length < 1) {
        endGame("Out of words");
    }
    addWordToFailureList(getCurrentWord());
    uploadWord(getCurrentWord());
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

function removeAlreadyUsedWords() {
    firebase.database().ref().child("words").get().then((snapshot) => {
        if (snapshot.exists()) {
            var newWordsList = [];
            console.log('snapshot.length :>> ', snapshot.length);
            console.log('words.length :>> ', words.length);
            var count = 0;
            words.forEach(word => {
                count = count + 1;
                console.log('snapshot.val()[word] :>> ', snapshot.val()[word]);
                if (!snapshot.val()[word]) {
                    console.log('snapshot.val()[word] :>> ', snapshot.val()[word]);
                    newWordsList.push(word);
                    
                }
            });
            console.log('count :>> ', count);
            words = newWordsList;
            console.log('newWordsList :>> ', newWordsList);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function resetWords() {
    firebase.database().ref('words').set(null, (error) => {
        if (error) {
            // The write failed...
            console.error('error :>> ', error);
        } else {
            console.log("words reset!");
            // Data saved successfully!
        }
    });
}

function getNextWord() {
    if (words.length < 1) {
        endGame("Out of words!");
    }
    var index = Math.floor(Math.random() * words.length);
    var word = words[index];
    if (index > -1) {
        words.splice(index, 1);
    }
    return word;
    // return await isWordUploaded2(word).then(hasBeenUploaded => {
    //     if (hasBeenUploaded) {
    //         console.log('hasBeenUploaded :>> ', hasBeenUploaded);
    //         words.splice(index, 1);
    //         return getNextWord();
    //     } else {
    //         console.log('words :>> ', words);
    //         console.log('word :>> ', word);
    //         return word;
    //     }
    // }).catch(err => {
    //     console.log('err :>> ', err);
    // });
}


function showSettings() {
    document.getElementById("settingsElement").hidden = false;
}

function hideSettings() {
    document.getElementById("settingsElement").hidden = "true";
}