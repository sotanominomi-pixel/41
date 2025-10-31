let currentMode = "clock";
let stopwatchInterval, startTime, elapsedTime = 0;
let alarmList = [];
let showSeconds = true;
let speedMultiplier = 1;
let currentLanguage = "ja";

function switchMode(mode) {
    document.querySelectorAll('.mode').forEach(m => m.classList.remove('active'));
    document.getElementById(mode).classList.add('active');
    currentMode = mode;
}

function updateClock() {
    const now = new Date(Date.now() * speedMultiplier);
    const options = { hour12: false };
    if (!showSeconds) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    } else {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
    }
    const timeString = now.toLocaleTimeString('ja-JP', options);
    document.getElementById("clock-time").textContent = timeString;
}

setInterval(updateClock, 1000);

function toggleStopwatch() {
    const button = document.getElementById("startStopBtn");
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        button.textContent = currentLanguage === "ja" ? "スタート" : "Start";
    } else {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateStopwatch, 100);
        button.textContent = currentLanguage === "ja" ? "ストップ" : "Stop";
    }
}

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, '0');
    if (showSeconds) {
        document.getElementById("stopwatch-time").textContent = `${minutes}:${seconds}.${milliseconds}`;
    } else {
        document.getElementById("stopwatch-time").textContent = `${minutes}:${seconds}`;
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedTime = 0;
    document.getElementById("stopwatch-time").textContent = "00:00";
    document.getElementById("laps").innerHTML = "";
    document.getElementById("startStopBtn").textContent = currentLanguage === "ja" ? "スタート" : "Start";
}

function recordLap() {
    const lapTime = document.getElementById("stopwatch-time").textContent;
    const li = document.createElement("li");
    li.textContent = `${currentLanguage === "ja" ? "ラップ" : "Lap"}: ${lapTime}`;
    document.getElementById("laps").appendChild(li);
}

function addAlarm() {
    const alarmTime = prompt(currentLanguage === "ja" ? "アラーム時刻をHH:MM形式で入力してください" : "Enter alarm time (HH:MM):");
    if (!alarmTime) return;

    const li = document.createElement("li");
    li.textContent = `${alarmTime}`;
    document.getElementById("alarmList").appendChild(li);
    alarmList.push(alarmTime);
}

function checkAlarms() {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    if (alarmList.includes(currentTime)) {
        alert(currentLanguage === "ja" ? "アラームです！" : "Alarm!");
        alarmList = alarmList.filter(a => a !== currentTime);
    }
}
setInterval(checkAlarms, 1000);

function changeLanguage(lang) {
    currentLanguage = lang;
    const elements = {
        "clockBtn": { ja: "時計", en: "Clock" },
        "stopwatchBtn": { ja: "ストップウォッチ", en: "Stopwatch" },
        "alarmBtn": { ja: "アラーム", en: "Alarm" },
        "settingsBtn": { ja: "設定", en: "Settings" },
        "startStopBtn": { ja: "スタート", en: "Start" },
        "resetBtn": { ja: "リセット", en: "Reset" },
        "lapBtn": { ja: "ラップ", en: "Lap" },
        "addAlarmBtn": { ja: "アラーム追加", en: "Add Alarm" }
    };
    for (const id in elements) {
        const el = document.getElementById(id);
        if (el) el.textContent = elements[id][lang];
    }
}

function toggleSecondsDisplay() {
    showSeconds = !showSeconds;
}

function changeSpeed(value) {
    speedMultiplier = value / 24;
}
