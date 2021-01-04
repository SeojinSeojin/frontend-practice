export const makeTime = (sec) => {
    return (`${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`)
}

export const makeSec = (min, sec) => {
    return Number(Number(sec) + (Number(min) * 60))
}

export const switchDisplay = (args) => {
    args.forEach((ele) => {
        ele.hidden ? ele.hidden = false : ele.hidden = true
    })
}

export const refreshText = (clock, records) => {
    clock.innerText = "00:00"
    while (records.hasChildNodes()) {
        records.removeChild(records.firstChild)
    }
}

export const recordText = (curTime, recordDiv) => {
    let p = document.createElement("p")
    p.innerText = curTime
    recordDiv.appendChild(p)
}