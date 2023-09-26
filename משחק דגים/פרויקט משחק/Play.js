let fish, src, rand, mark = 0, img, i = 0, x, level = 0, count = 0, flag = 1, m;
let ffR = ["img/דגים/דג-ימין.png", "img/דגים/דג1-ימין.png", "img/דגים/דג2-ימין.png", "img/דגים/דג3-ימין.png", "img/דגים/דג4-ימין.png"];
let ffL = ["img/דגים/דג-שמאל.png", "img/דגים/דג1-שמאל.png", "img/דגים/דג2-שמאל.png", "img/דגים/דג3-שמאל.png", "img/דגים/דג4-שמאל.png", "img/דגים/דג6-שמאל.png", "img/דגים/דג7-שמאל.png"];
let medusArr = ["img/מדוזה ורודה.png", "img/מדוזה ירוקה.png", "img/מדוזה כתומה.png", "img/מדוזה סגולה.png", "img/מדוזה תכלת 4.png"];
music = new Audio("music/%d7%a9%d7%9b%d7%a9%d7%95%d7%9a_%d7%92%d7%9c%d7%99%d7%9d.wav"), musicF = new Audio("music/%d7%93%d7%92%d7%92.WAV"),
    musicM = new Audio("music/%d7%9e%d7%93%d7%95%d7%96%d7%94.WAV"), musicD = new Audio("music/%d7%9b%d7%a8%d7%99%d7%a9.WAV"),
    musicS = new Audio("music/WOW.WAV ");
music.volume = 0.2;
musicS.volume = 88;

function Start() {
    mark = localStorage.getItem("mark");
    window.open('gamePage.html');
}

function StartGaming() {
    document.getElementById("buttonStart").style.display = "none";
    x = setInterval("Gaming()", 700);
    count = 0;
    level++;
    m = document.getElementById("m");
    m.style.display = "block";
    closeModal();
}

function Gaming() {

    music.play();
    /*יצירת דגים ומדוזות ואיפיון תכונות*/
    fish = document.createElement("div");
    img = document.createElement("img");

    /* מימין לשמאל*/
    if (level != 1 && i % 2 == 0) {
        /* יצירת מדוזה*/
        if (i % 4 == 0 && i > 0) {
            rand = Math.floor(Math.random() * 3) + 0;
            img.src = medusArr[rand];
            fish.className = "medusRight";
            fish.id = "medus" + i++;
            fish.addEventListener("click", LessdMark);
        }
        /*יצירת כריש*/
        else
            if (level == 3 && i % 5 == 0) {
                img.src = "img/כריש ימין.png";
                fish.className = "dangerRight";
                fish.id = "danger" + i++;
                fish.addEventListener("click", LessdMark);
            }
            /*יצירת דג*/
            else {
                rand = Math.floor(Math.random() * 4) + 0;
                img.src = ffL[rand];
                fish.className = "fishRight";
                fish.id = "fish" + i++;
                fish.addEventListener("click", AddMark);
            }
    }

    /*משמאל לימין*/
    else {
        /* יצירת מדוזה*/
        if (i % 4 == 0 && i > 0) {
            rand = Math.floor(Math.random() * 3) + 0;
            img.src = medusArr[rand];
            fish.className = "medusLeft";
            fish.id = "medus" + i++;
            fish.addEventListener("click", LessdMark);
        }
        /*יצירת כריש*/
        else if (level == 3 && i % 5 == 0) {
            img.src = "img/כריש שמאל.png";
            fish.className = "dangerLeft";
            fish.id = "danger" + i++;
            fish.addEventListener("click", Worse);
        }
        /*יצירת דג*/
        else {
            rand = Math.floor(Math.random() * 5) + 0;
            img.src = ffR[rand];
            fish.id = "fish" + i++;
            fish.className = "fishLeft";
            fish.addEventListener("click", AddMark);
        }
    }
    fish.appendChild(img);
    /* גודל הדג*/
    if (fish.className == "medusRight" || fish.className == "medusLeft") {
        rand = Math.floor(Math.random() * 200) + 100;
        img.style.height = rand + "px";
    }
    else if (fish.className == "dangerLeft" || fish.className == "dangerRight") {
        rand = Math.floor(Math.random() * 300) + 150;
        img.style.height = rand + "px";
        img.style.width = rand * 2 + "px";
    }
    else {
        rand = Math.floor(Math.random() * 300) + 150;
        img.style.height = rand + "px";
        img.style.width = rand * 1.5 + "px";
    }

    rand = Math.floor(Math.random() * 700) + 1;    //  מיקום
    fish.style.top = rand + "px";
    rand = Math.floor(Math.random() * 25) + 5;      // מהירות
    fish.style.animationDuration = rand + "s";
    rand = Math.floor(Math.random() * 3) + 1;      // זמן עיכוב
    fish.style.animationDelay = rand + "s";

    document.body.appendChild(fish);             // יצירת הדג על המסך
}

function AddMark() {
    music.pause();
    event.target.style.display = "none";

    count++;
    rand = Math.floor(Math.random() * 15) + 1;
    mark += rand;
    console.log(count);

    if (level == 1 && mark >= 100 || level == 2 && mark > 220 || level == 3 && mark > 345 || count == 20)
        Sucsess();
    else musicF.play();

    localStorage.setItem("mark", mark);
    document.getElementById("m").innerHTML = "הציון שלך: " + mark;
}

function LessdMark() {
    event.target.style.display = "none";
    music.pause();
    musicM.play();
    mark -= 5;
    if (mark < 0)
        Fail();
    localStorage.setItem("mark", mark);
    document.getElementById("m").innerHTML = "הציון שלך: " + mark;

}

function Worse() {
    music.pause();
    musicD.play();
    Fail();
    localStorage.setItem("mark", mark);
    document.getElementById("m").innerHTML = "הציון שלך: " + mark;
}

function Fail() {
    clearInterval(x);
    m.style.display = "none";
    modal = document.getElementById("failModal");
    modal.style.display = "block";
    var textF = document.getElementById("textF");
    textF.innerHTML = localStorage.getItem("name11") + ", " + "הים מסוכן! בפעם הבאה תזהר יותר" + "...";
    var textFMark = document.getElementById("textFMark");
    textFMark.innerHTML += mark;
}

function Sucsess() {
    clearInterval(x);
    music.pause();
    var ee = setTimeout(700, musicS.play());

    m = document.getElementById("m");
    m.style.display = "none";

    modal = document.getElementById("successModal");
    modal.style.display = "block";
    var textWinMark = document.getElementById("textWinMark");
    var textWin = document.getElementById("textWin");
    var btnWin = document.getElementById("btnWin");
    var textWinTitle = document.getElementById("textWinTitle");
    textWinMark.innerHTML = "הציון שלך הוא: " + mark;

    if (level < 3) {
        if (level == 1 && mark > 100 || level == 2 && mark > 220 || level == 3 && mark > 345)
            textWin.innerHTML = localStorage.getItem("name11") + ", אתה אלוף!";
        else {
            textWin.innerHTML = localStorage.getItem("name11") + ", מצטיין!";
            flag = 0;
        }

        btnWin.addEventListener("click", StartGaming);
    }
    else {
        if (flag)
            textWinTitle.innerHTML = "ניצחון של אלופים!"
        else textWinTitle.innerHTML = "ניצחון!";
        textWin.innerHTML = localStorage.getItem("name11") + ", סיימת את המשחק!!";
        btnWin.innerHTML = "התחל מחדש";
        btnWin.addEventListener("click", Finish);
    }
}
function Finish() {
    window.close();
}
function closeModal() {
    modal.style.display = "none";
}

/*פונקציות של הדף בית*/
function Fiildetails() {
    let names = document.getElementsByTagName("input")[0].value;

    localStorage.setItem("name11", names);
    names = document.getElementsByTagName("input")[1].value;

    localStorage.setItem("gil", names);

    console.log(localStorage.getItem("name11"));
    console.log(localStorage.getItem("gil"));
    Start();
}

function F1() {
    alert("שלב ראשון: על המסך יופיעו דגים ומדוזות. יש ללחוץ רק על הדגים, לחיצה נכונה תעלה ניקוד אחרת ירד ניקוד. עולים שלב כשמגיעים לניקוד 100 או כשנאספו 20 דגים. שלב שני: תנועת הדגים והמדוזות תפעל משני הכיוונים. שלב שלישי: יכנסו למשחק כרישים מסוכנים שלחיצה עליהם תגרום לסיום המשחק.");
}
