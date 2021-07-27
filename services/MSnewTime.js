/**
 * Version 1.0
 * 08.06.2021
 *
 *
 */

class Time {

    constructor(usedTime, hours, seconds) {
        this.usedTime = usedTime;
        this.hours = hours;
        this.minutes = seconds;
    }

    getSelectedTime() {

        let usedTime = document.getElementById("stopwatch-time").getAttribute('value');

        return new Time(usedTime)

    }

}

function addTime() {

    let time = new Time().getSelectedTime();

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(time)
    };

    fetch('/createNewTime', options)
        .then(response => response.json())
}

class ManuallyTime {

    constructor(hours, seconds) {
        this.hours = hours;
        this.minutes = seconds;
    }

    getManuallyTime() {

        let hours = document.getElementById("nthours").value;
        let minutes = document.getElementById("ntminutes").value;

        return new ManuallyTime(hours, minutes)
    }

}

function addTimeManually() {

    let time = new ManuallyTime().getManuallyTime();

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(time)
    };

    fetch('/createNewTimeManually', options)
        .then(response => response.json())
}

