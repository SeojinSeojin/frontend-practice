const addListener = () => {
    const tds = document.getElementsByTagName("td");
    for (var i = 0; i < tds.length; i++) {
        tds[i].onclick = clicked;
    }
};

const clicked = (event) => {
    if (is_checked(event.target)) {
        event.target.style.backgroundColor = "white";
        event.target.style.color = "black";
    } else {
        event.target.style.backgroundColor = "orange";
        event.target.style.color = "white";
    }
};

const is_checked = (element) => {
    if (element.style.backgroundColor == "orange") return true;
    else return false;
};

const countBingo = () => {
    var bingo = 0;
    const tds = document.getElementsByTagName("td");
    for (var i = 0; i < 4; i++) {
        //세로줄 체크
        if (
            is_checked(tds[i]) &
            is_checked(tds[i + 4]) &
            is_checked(tds[i + 8]) &
            is_checked(tds[i + 12])
        ) {
            bingo += 1;
        }
        //가로줄 체크
        if (
            is_checked(tds[i * 4]) &
            is_checked(tds[i * 4 + 1]) &
            is_checked(tds[i * 4 + 2]) &
            is_checked(tds[i * 4 + 3])
        ) {
            bingo += 1;
        }
    }
    //대각선 체크
    if (
        is_checked(tds[0]) &
        is_checked(tds[5]) &
        is_checked(tds[10]) &
        is_checked(tds[15])
    ) {
        bingo += 1;
    }
    if (
        is_checked(tds[3]) &
        is_checked(tds[6]) &
        is_checked(tds[9]) &
        is_checked(tds[12])
    ) {
        bingo += 1;
    }

    document.getElementById("result_count").innerHTML = bingo + " bingo";
};

const init = () => {
    addListener();
    setInterval(countBingo, 500);
};

init();