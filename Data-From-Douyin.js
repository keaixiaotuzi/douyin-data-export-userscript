// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://creator.douyin.com/creator-micro/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyin.com
// @require      https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    //creat a new button
    var scrollButton = document.createElement("BUTTON");
    var buttonName = document.createTextNode("Start!");
    scrollButton.appendChild(buttonName);
    document.body.appendChild(scrollButton);

    // var date = prompt("按照下列格式，输入你想要的起始年月","2023年02月")
    // if(date){
    //     alert("你想要从"+date+"开始，到今天的所有数据，对吗？")
    // }

    // create a datepicker input
    var input = document.createElement("INPUT");
    input.setAttribute("type", "month");
    // input.value= new Date().getFullYear()+"-"+(new Date().getMonth()+1)

    input.style.position = "fixed";
    input.style.top = "40px";
    input.style.left = "600px";
    input.style.zIndex = "999";
    input.style['font-size'] = "12px";
    input.style.height = "24px";
    input.style.width = "90px";
    input.style.border = "white";
    input.style.borderRadius = "5px";
    document.body.appendChild(input);



    //change the style of my button
    scrollButton.id = "scrollButton"
    scrollButton.setAttribute("class", "semi-navigation-item-normal semi-navigation-item")
    scrollButton.style.position = "fixed";
    scrollButton.style.top = "40px";
    scrollButton.style.left = "700px";
    scrollButton.style.zIndex = "999";
    scrollButton.style['font-size'] = "12px";
    scrollButton.style.fontweight = "400"
    scrollButton.style.height = "24px";
    scrollButton.style.width = "70px";
    scrollButton.style.border = "white";
    scrollButton.style.borderRadius = "5px";
    scrollButton.style[":hover"] = "background-color: black"
    scrollButton.style["align-items"] = "center";
    scrollButton.style["justify-content"] = "center";

    // change the style of my input
    function dateFormat(date) {
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        return date.getFullYear() + "年"
    }

    function getStopDate(date) {
        let year = date.getFullYear()
        let month = date.getMonth()
        if (month === 0) { // Jan
            year = year - 1
            month = 12 // Dec+1
        }
        month = month - 1
        return dateFormat(new Date(year, month));
    }

    //when the button was clicked,it can scroll down the page
    scrollButton.onclick = function () {
        if (!input.value) {
            alert("Are you crazy?!")
            return
        }
        const nowDate = new Date(input.value);
        const setDate = dateFormat(nowDate)
        const stopDate = getStopDate(nowDate)
        console.log(stopDate)
        const interval = setInterval(() => {

            const totalCardsNumber = document.getElementsByClassName("video-card--1404D").length
            let keyWord = document.getElementsByClassName("video-card--1404D")[totalCardsNumber - 1].getElementsByClassName("info-op-left--3el-Y")[0].getElementsByClassName("info-time--1PtPa")[0].textContent;
            let result = keyWord.startsWith(stopDate);
            if (result) {
                clearInterval(interval)
                const data = fetchData(setDate)
                console.log(data)
                const lines = data.map((item) => `<tr><td><img src='${item.img.replaceAll(/^url\("(.*)"\)/g, "$1")}'></td><td>${item.date}</td><td>${item.title}</td><td>${item.likes}</td><td>${item.views}</td></tr>`);
                const text = `<html>
                <style>
                table {
                    font-size: larger;
                    margin-top: 3%;
                    margin-left: 1%;
                    margin-right: 1%;
                    border-top: 1px solid gray;
                    border-bottom: 1px solid gray;
                    border-right: 1px solid gray;
                    border-left: 1px solid gray;
                }

                th{
                    font-size: larger;
                    margin-top: 3%;
                    margin-left: 1%;
                    margin-right: 1%;
                    border-bottom: 1px solid gray;
                    background-color: lightgray;
                }

                th:nth-child(2){
                    border-left: 1px solid gray;
                }

                th:nth-child(3){
                    border-left: 1px solid gray;
                }

                th:nth-child(4){
                    border-left: 1px solid gray;
                }

                th:last-child{
                    border-left: 1px solid gray;
                }

                td:first-child {
                    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    width: 0.3%;
                    text-align: center;
                    border-bottom: 1px solid gray;
                }

                td:nth-child(2) {
                    width: 13%;
                    text-align: center;
                    border-left: 1px solid gray;
                    border-bottom: 1px solid gray;
                }

                td:nth-child(3) {
                    width: 43%;
                    text-align: center;
                    border-left: 1px solid gray;
                    border-bottom: 1px solid gray;
                }

                td:nth-child(4) {
                    width: 6%;
                    text-align: center;
                    border-left: 1px solid gray;
                    border-bottom: 1px solid gray;
                }

                td:last-child {
                    width: 6%;
                    text-align: center;
                    border-left: 1px solid gray;
                    border-bottom: 1px solid gray;
                }

                tr {
                    margin-top: 1px;
                    border-bottom: 1px solid gray;
                }

                img {
                    margin-top: 1px;
                    border-bottom: 1px solid gray;
                }

                </style>

                <body><table>
                <tr>
                  <th>Cover</th>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Likes</th>
                  <th>Views</th>
                </tr>`+ lines.join("\n") + "</table></body></html>"
                const filename = setDate + "抖音数据.html";

                download(filename, text);
            }
            const body = document.body;
            const html = document.documentElement;

            const height = Math.max(body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight);
            scroll(0, height)
        }, 3000)
    }

    function WNumber(n) {
        if (n.endsWith('w')) {
            return parseInt(parseFloat(n.trimEnd('w')) * 10000)
        } else {
            return parseInt(n)
        }
    }

    function WNumberCompare(a, b) {
        return - WNumber(a) + WNumber(b)
    }

    //stop scrolling and get data from Douyin
    function fetchData(setDate) {
        const data = [];
        const totalCardsNumber = document.getElementsByClassName("video-card--1404D").length
        for (let i = 0; i < totalCardsNumber; i++) {
            const mediaCard = document.getElementsByClassName("video-card--1404D")[i]
            const mediaItem = {
                img: mediaCard.getElementsByClassName("video-card-cover--2Y2HT")[0].style['background-image'],
                title: mediaCard.getElementsByClassName("info-title-text--kEYth")[0]["outerText"],
                likes: mediaCard.getElementsByClassName("info-figure--2LJ6W")[2].getElementsByTagName("span")[0].textContent,
                views: mediaCard.getElementsByClassName("info-figure--2LJ6W")[0].getElementsByTagName("span")[0].textContent,
                date: mediaCard.getElementsByClassName("info-op-left--3el-Y")[0].getElementsByClassName("info-time--1PtPa")[0].textContent,
            }
            if (mediaItem.date.startsWith(setDate)) {
                data.push(mediaItem)
            }
        }
        data.sort((a, b) => WNumberCompare(a.likes, b.likes))
        return data
    }


    //put data in posision
    function download(filename, text) {
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        element.setAttribute("download", filename);

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }


    //export data to document


    //Yeah! We did it!

})();// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://creator.douyin.com/creator-micro/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyin.com
// @require      https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    //creat a new button
    var scrollButton = document.createElement("BUTTON");
    var buttonName = document.createTextNode("Start!");
    scrollButton.appendChild(buttonName);
    document.body.appendChild(scrollButton);

    // var date = prompt("按照下列格式，输入你想要的起始年月","2023年02月")
    // if(date){
    //     alert("你想要从"+date+"开始，到今天的所有数据，对吗？")
    // }

    // create a datepicker input
    var input = document.createElement("INPUT");
    input.setAttribute("type", "month");
    // input.value= new Date().getFullYear()+"-"+(new Date().getMonth()+1)

    input.style.position = "fixed";
    input.style.top = "40px";
    input.style.left = "600px";
    input.style.zIndex = "999";
    input.style['font-size'] = "12px";
    input.style.height = "24px";
    input.style.width = "90px";
    input.style.border = "white";
    input.style.borderRadius = "5px";
    document.body.appendChild(input);



    //change the style of my button
    scrollButton.id = "scrollButton"
    scrollButton.setAttribute("class", "semi-navigation-item-normal semi-navigation-item")
    scrollButton.style.position = "fixed";
    scrollButton.style.top = "40px";
    scrollButton.style.left = "700px";
    scrollButton.style.zIndex = "999";
    scrollButton.style['font-size'] = "12px";
    scrollButton.style.fontweight = "400"
    scrollButton.style.height = "24px";
    scrollButton.style.width = "70px";
    scrollButton.style.border = "white";
    scrollButton.style.borderRadius = "5px";
    scrollButton.style[":hover"] = "background-color: black"
    scrollButton.style["align-items"] = "center";
    scrollButton.style["justify-content"] = "center";

    // change the style of my input
    function dateFormat(date) {
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        return date.getFullYear() + "年"
    }

    function getStopDate(date) {
        let year = date.getFullYear()
        let month = date.getMonth()
        if (month === 0) { // Jan
            year = year - 1
            month = 12 // Dec+1
        }
        month = month - 1
        return dateFormat(new Date(year, month));
    }

    //when the button was clicked,it can scroll down the page automatically
    scrollButton.onclick = function () {
        if (!input.value) {
            alert("Are you crazy?!")
            return
        }
        const nowDate = new Date(input.value);
        const setDate = dateFormat(nowDate)
        const stopDate = getStopDate(nowDate)
        console.log(stopDate)
        const interval = setInterval(() => {

            const totalCardsNumber = document.getElementsByClassName("video-card--1404D").length
            let keyWord = document.getElementsByClassName("video-card--1404D")[totalCardsNumber - 1].getElementsByClassName("info-op-left--3el-Y")[0].getElementsByClassName("info-time--1PtPa")[0].textContent;
            let result = keyWord.startsWith(stopDate);
            if (result) {
                clearInterval(interval)
                const data = fetchData(setDate)
                console.log(data)
                const lines = data.map((item) => `<tr><td><img src='${item.img.replaceAll(/^url\("(.*)"\)/g, "$1")}'></td><td>${item.date}</td><td>${item.title}</td><td>${item.likes}</td><td>${item.views}</td></tr>`);
                const text = `<html>
                <style>
                table {
                    font-size: larger;
                    margin-top: 3%;
                    margin-left: 1%;
                    margin-right: 1%;
                    border-top: 1px solid gray;
                    border-bottom: 1px solid gray;
                    border-right: 1px solid gray;
                    border-left: 1px solid gray;
                }

                th{
                    font-size: larger;
                    margin-top: 3%;
                    margin-left: 1%;
                    margin-right: 1%;
                    border-bottom: 1px solid gray;
                    background-color: lightgray;
                }

                th:nth-child(2){
                    border-left: 1px solid gray;
                }

                th:nth-child(3){
                    border-left: 1px solid gray;
                }

                th:nth-child(4){
                    border-left: 1px solid gray;
                }

                th:last-child{
                    border-left: 1px solid gray;
                }

                td:first-child {
                    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    width: 0.3%;
                    text-align: center;
                    border-bottom: 1px solid gray;
                }

                td:nth-child(2) {
                    width: 13%;
                    text-align: center;
                    border-left: 1px solid gray;
                    border-bottom: 1px solid gray;
                }

                td:nth-child(3) {
                    width: 43%;
                    text-align: center;
                    border-left: 1px solid gray;
                    border-bottom: 1px solid gray;
                }

                td:nth-child(4) {
                    width: 6%;
                    text-align: center;
                    border-left: 1px solid gray;
                    border-bottom: 1px solid gray;
                }

                td:last-child {
                    width: 6%;
                    text-align: center;
                    border-left: 1px solid gray;
                    border-bottom: 1px solid gray;
                }

                tr {
                    margin-top: 1px;
                    border-bottom: 1px solid gray;
                }

                img {
                    margin-top: 1px;
                    border-bottom: 1px solid gray;
                }

                </style>

                <body><table>
                <tr>
                  <th>Cover</th>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Likes</th>
                  <th>Views</th>
                </tr>`+ lines.join("\n") + "</table></body></html>"
                const filename = setDate + "抖音数据.html";

                download(filename, text);
            }
            const body = document.body;
            const html = document.documentElement;

            const height = Math.max(body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight);
            scroll(0, height)
        }, 3000)
    }

    function WNumber(n) {
        if (n.endsWith('w')) {
            return parseInt(parseFloat(n.trimEnd('w')) * 10000)
        } else {
            return parseInt(n)
        }
    }

    function WNumberCompare(a, b) {
        return - WNumber(a) + WNumber(b)
    }

    //stop scrolling and get data from Douyin
    function fetchData(setDate) {
        const data = [];
        const totalCardsNumber = document.getElementsByClassName("video-card--1404D").length
        for (let i = 0; i < totalCardsNumber; i++) {
            const mediaCard = document.getElementsByClassName("video-card--1404D")[i]
            const mediaItem = {
                img: mediaCard.getElementsByClassName("video-card-cover--2Y2HT")[0].style['background-image'],
                title: mediaCard.getElementsByClassName("info-title-text--kEYth")[0]["outerText"],
                likes: mediaCard.getElementsByClassName("info-figure--2LJ6W")[2].getElementsByTagName("span")[0].textContent,
                views: mediaCard.getElementsByClassName("info-figure--2LJ6W")[0].getElementsByTagName("span")[0].textContent,
                date: mediaCard.getElementsByClassName("info-op-left--3el-Y")[0].getElementsByClassName("info-time--1PtPa")[0].textContent,
            }
            if (mediaItem.date.startsWith(setDate)) {
                data.push(mediaItem)
            }
        }
        data.sort((a, b) => WNumberCompare(a.likes, b.likes))
        return data
    }


    //put data in posision
    function download(filename, text) {
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        element.setAttribute("download", filename);

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }


    //export data to document


    //Yeah! We did it!

})();