import { makeTime, makeSec, switchDisplay, refreshText, recordText } from "./modules/modules.js"
const btn_start = document.querySelector("#timer-start")
const btn_pause = document.querySelector("#timer-pause")
const btn_record = document.querySelector("#timer-record")
const btn_restart = document.querySelector("#timer-restart")
const div_record = document.querySelector("#timer-records")
const btn_plus1 = document.querySelector("#timer-plus1")
const btn_plus5 = document.querySelector("#timer-plus5")
const btn_plus10 = document.querySelector("#timer-plus10")
let clock, clockInterval, curSec = 0

const addTime = (sec) => {
    clock = document.querySelector("#timer-clock")
    const _ = clock.innerText.split(':')
    let minn = _[0],
        secc = _[1]
    curSec = makeSec(minn, secc) + sec
    clock.innerText = makeTime(curSec)
}

btn_plus1.onclick = () => { addTime(60) }
btn_plus5.onclick = () => { addTime(300) }
btn_plus10.onclick = () => { addTime(600) }

btn_start.addEventListener("click", () => {
    clock = document.querySelector("#timer-clock")
    const _ = clock.innerText.split(':')
    let minn = _[0],
        secc = _[1]
    curSec = makeSec(minn, secc)
    if (curSec == 0) {
        return;
    }
    clockInterval = setInterval(() => {
        curSec -= 1
        if (curSec < 0) {
            clock.innerText = "끝!"
            setTimeout(() => {
                clearInterval(clockInterval)
            }, 100)
        } else if (curSec < 10) {
            clock.innerText = makeTime(curSec)
            clock.style.color = "red"
        } else {
            clock.innerText = makeTime(curSec)
            clock.style.color = "black"
        }
    }, 100)
    btn_start.innerText = "계속"
    btn_restart.hidden = false
    switchDisplay([btn_start, btn_pause, btn_record])
})

btn_pause.addEventListener("click", () => {
    clearInterval(clockInterval)
    switchDisplay([btn_start, btn_pause, btn_record])
})

btn_record.addEventListener("click", () => {
    const recTime = document.querySelector("#timer-clock").innerText
    recordText(recTime, div_record)
})

btn_restart.addEventListener("click", () => {
    refreshText(document.querySelector("#timer-clock"), div_record)
    clearInterval(clockInterval)
    btn_start.innerText = "시작"
    document.querySelector("#timer-clock").style.color = "black"
    btn_start.hidden = false
    btn_pause.hidden = true
    btn_record.hidden = true
    btn_restart.hidden = true
})