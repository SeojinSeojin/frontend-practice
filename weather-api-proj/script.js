const unixtToDate = (t) => {
    const date = new Date(t * 1000);
    const year = date.getFullYear();
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    const hour = "0" + date.getHours();
    return year + "/" + month.substr(-2) + "/" + day.substr(-2) + " " + hour.substr(-2)
}

const ctx = document.getElementById('myChart').getContext('2d');

let data = {
    labels: [],
    datasets: [{
        label: "pm2-5",
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }, {
        label: "pm10",
        data: [],
        backgroundColor: 'rgba(99, 132, 255, 0.2)',
        borderColor: 'rgba(99, 132, 255, 1)',
        borderWidth: 1
    }]
};

$.ajax({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=37.5326&lon=127.0246&appid=18a1a16ff26a25bcea6aa824c657e300",
}).done((results) => {
    results.list.forEach((d) => {
        data.labels.push(unixtToDate(d.dt));
        data.datasets[0].data.push(d.components["pm2_5"]);
        data.datasets[1].data.push(d.components["pm10"]);
    })

    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
})