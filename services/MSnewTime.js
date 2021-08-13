/**
 * Version 1.0
 * 01.08.2021
 *
 *@author Kevin Bosse
 */

/**
 * @class Time with getSelectedTime function (for getting html element values)
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

/**
 * @method
 * This function fetches client data to createNewTime ressource on server
 * @param
 */

function addTime() {

    let time = new Time().getSelectedTime();

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(time)
    };

    fetch('/createNewTime', options)
        .then(response => response.json())

    location.reload();
}

/**
 * @class ManuallyTime with getTime function (for getting html element values)
 */

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

/**
 * @method
 * This function fetches client data to createNewManuallyTime ressource on server
 * @param
 */

function addTimeManually() {

    let time = new ManuallyTime().getManuallyTime();

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(time)
    };

    fetch('/createNewTimeManually', options)
        .then(response => response.json())

    location.reload();
}

