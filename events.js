function getEvent(eventName) {
    tbaRequestHandler("event/" + eventName + "/teams", processEventTeams)
}

function processEventTeams(json) {
    header = `
    <th id="tname" onclick="sortTable(0)">Team Name</th>
    <th id="tnum" onclick="sortTableNumber(1)">Team Number</th>
    <th id="trank" onclick="sortTableNumber(2)">Wins</th>
    <th id="tbanners" onclick="sortTableNumber(3)">Banners</th>
    <th id="lastwin" onclick="sortTableNumber(4)">Last Win Year</th>
    <th id="winpercent" onclick="sortTableNumber(5)">Win %</th>
    `
    $("#eventTableHeaders").append(header);
    for (team of json) {
        text = "<tr id='" + team["key"] + "'>";
        text += "<td><a href='teamHistory.html?team=" + team["team_number"] + "'>" + team["nickname"] + "</a></td>";
        text += "<td>" + team["team_number"] + "</td>";
        text += "<td>0</td>";
        text += "<td>0</td>";
        text += "<td></td>";
        text += "<td>0</td>";
        text += "</tr>";
        $("#eventTableBody").append(text);

        tbaRequestHandler("team/" + team["key"] + "/awards", pastEventInfo, team["key"])
    }
}


function pastEventInfo(json, params) {
    row = document.getElementById(params[0]);
    cols = row.getElementsByTagName("TD");
    wins = 0;
    for (award of json) {
        if (award.award_type in BannerWorthyAwards) {
            cols[3].innerHTML = Number(cols[3].innerHTML) + 1;
        }
        if (award.award_type == AwardTypes.WINNER) {
            wins += 1;
            cols[2].innerHTML = Number(cols[2].innerHTML) + 1;
            if (cols[4].innerHTML == "") {
                cols[4].innerHTML = award.year;
            }
            else if (Number(cols[4].innerHTML) < award.year) {
                cols[4].innerHTML = award.year;
            }

        }
    }
    tbaRequestHandler("team/"+params[0]+"/events/keys", winPercent, params[0], wins)
}

function winPercent(json, params) {
    row = document.getElementById(params[0]);
    cols = row.getElementsByTagName("TD");
    cols[5].innerHTML = String(Number(params[1]*100/json.length).toFixed(3))
}


function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("eventTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function sortTableNumber(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("eventTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (Number(x.innerHTML.toLowerCase()) > Number(y.innerHTML.toLowerCase())) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (Number(x.innerHTML.toLowerCase()) < Number(y.innerHTML.toLowerCase())) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}