/**
 * This should load history on any team.
 * Requires constants.js and teamStats.html
*/

/**
 * Set up the teamHistory html page.
 * @param {*} team The team number of the desired team.
 */
function getTeamHistory(team) {
    var Team = team;
    getTeamData(team);

    console.log("getting Team Awards Data");
    tbaRequestHandler("team/frc" + team + "/awards", processTeamAwards);

    console.log("getting Team Event Data");
    tbaRequestHandler("team/frc" + team + "/events", processTeamEvents, team);
}


function processTeamAwards(json) {
    var newBanners = "";
    var newAwards = "<ul>";
    for (award of json) {
        if (award.award_type in BannerWorthyAwards) {
            newBanners += "<div class='banner'>" 
            newBanners += "<img src='https://www.thebluealliance.com/images/first_icon.svg'>"
            newBanners += award.name + " at " + award.event_key + "</div>";
        } else {
            newAwards += "<li>" + award.name + " at " + award.event_key + "</li>";
        }
    }
    newAwards += "</ul>";
    $("#banners").append(newBanners);
    $("#awards").append(newAwards);
};

function processTeamEvents(jstuff, params) {
    var finalText = "";
    var team = params[0];
    for (event of jstuff) {
        var eventtext = "<div class='event' id='" + event.key + "'><h5>" + event.year + " " + event.name + "</h5></div>";
        $("#eventList").append(eventtext);

        tbaRequestHandler("event/" + event.key + "/oprs", updateOprs, event.key, team);

        function updateOprs(jstuff2, params) {
            tableText = "";
            try {
                opr = parseFloat(jstuff2["oprs"]["frc" + params[1].toString()]);
                opr = opr.toFixed(2);

                dpr = parseFloat(jstuff2["dprs"]["frc" + params[1].toString()]);
                dpr = dpr.toFixed(2);

                ccwm = parseFloat(jstuff2["ccwms"]["frc" + params[1].toString()]);
                ccwm = ccwm.toFixed(2);

                npr = 0.0
                tableText += `
                <table class='eventTable' id='`+ params[0] + `'>
                <tr>
                <td><b>OPR:</b> `+ opr.toString() + `</td>
                <td><b>DPR:</b> `+ dpr.toString() + `</td>
                <td><b>CCWM:</b> `+ ccwm.toString() + `</td>
                <td><b>NPR:</b> `+ npr.toString() + `</td>
                </tr>
                </table>
                `
            } catch (error) {
                oprs = "";
            }
            //console.log("adding opr..."+jstuff2["oprs"]["frc6995"]);
            $("#" + params[0]).append(tableText);
        };
        //finalText += text;
    }
};