/**
 * This should load stats on any team.
*/


var teamData;


function getTeamData(team) {
    console.log("getting Team Data");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(this.readyState, this.status);
        if (this.readyState == 4 && this.status == 200) {
            jstuff = JSON.parse(this.responseText); //convert the api response from plaintext to a json array
            var sponsorText = getSponsorHtml(jstuff.name); //get the sponsor html (name is actually sponsors lol)
            $("#main").append(sponsorText); //add it to the end of the div IDed main
        }
    };
    console.log("https://www.thebluealliance.com/api/v3/team/frc" + team.toString());
    xhttp.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + team.toString(), true);
    xhttp.setRequestHeader("X-TBA-Auth-Key", "eEw2xnP2lfo4au8unAIYp4xJourubuxF7vz4b1WgHbzmOLQxZHoUomCV1qudfil9");
    xhttp.send();
};

/**
 * This method prepares the sponsors to be displayed given the data from 
 * the api call and returns some useful html for it.
 * @param {*} sponsorList The raw sponsor data
 */
function getSponsorHtml(sponsorList) {
    if (sponsorList != null) {
        var finalText = "<h4><b>Sponsors and Contributors</b></h4><ul id='sponsors'>"; // The text to eventually return.

        // Make an list of the sponsors by seperating the values at every '/'
        var sponsors = sponsorList.split("/");
        var sponsor; // An empty variable to use in the for loop.
        for (sponsor of sponsors) {
            finalText += "<li>" + sponsor + "</li>";
        }

        return finalText;
    } else {
        return "";
    }
}