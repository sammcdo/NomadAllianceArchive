/**
 * This should load stats on any team.
*/


var teamData;


function getTeamData(team) {
    getGeneralTeamData(team);
    getTeamMediaData(team);
};


function getGeneralTeamData(team) {
    console.log("getting Team Data");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(this.readyState, this.status);
        if (this.readyState == 4 && this.status == 200) {
            jstuff = JSON.parse(this.responseText); //convert the api response from plaintext to a json array

            $("#teamHeader").append(getTeamNameHeader(jstuff.nickname, jstuff.team_number));

            $("#websites").append(getTeamWebsites(jstuff.website));

            var sponsorText = getSponsorHtml(jstuff.name); //get the sponsor html (name is actually sponsors lol)
            $("#sponsors").append(sponsorText); //add it to the end of the div IDed main
        }
    };
    console.log("https://www.thebluealliance.com/api/v3/team/frc" + team.toString());
    xhttp.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + team.toString(), true);
    xhttp.setRequestHeader("X-TBA-Auth-Key", "eEw2xnP2lfo4au8unAIYp4xJourubuxF7vz4b1WgHbzmOLQxZHoUomCV1qudfil9");
    xhttp.send();
};

function getTeamMediaData(team) {
    console.log("getting Team Media Data");
    var d = new Date();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(this.readyState, this.status);
        if (this.readyState == 4 && this.status == 200) {
            jstuff = JSON.parse(this.responseText); //convert the api response from plaintext to a json array
            console.log(jstuff);
            for (item of jstuff) {
                console.log(item);
                if (item.foreign_key.startsWith("avatar")) {
                    console.log("true");
                    $("#teamIcon").append(getTeamIcon(item.details.base64Image));
                }
            }
        }
    };
    xhttp.open("GET", "https://www.thebluealliance.com/api/v3/team/frc"+team.toString()+"/media/"+d.getFullYear(), true);
    xhttp.setRequestHeader("X-TBA-Auth-Key", "eEw2xnP2lfo4au8unAIYp4xJourubuxF7vz4b1WgHbzmOLQxZHoUomCV1qudfil9");
    xhttp.send();
};


/**
 * This method creates some html to display the team name header.
 * @param {*} nickname The name of the team as a string 
 * @param {*} number The team number
 */
function getTeamNameHeader(nickname, number) {
    if (nickname != null && number != null) {
        var finalText = "<h3 id='teamName'>";
        finalText += nickname+" "+number.toString();
        return finalText;
    } else {
        return "";
    }
};

/**
 * Display a teams icon from the base64 data from the TBA api.
 * @param {*} base64data The image data in base64 from the tba api
 */
function getTeamIcon(base64data) {
    return `<img style='display:block; width:100px;height:100px;' id='base64image', 
    src='data:image/jpeg;base64, `+base64data+"' />";
};



function getTeamWebsites(websiteList) {
    if (websiteList != null) {
        var finalText = "<h4><b>Team Websites</b></h4><ul id='websiteList'>";

        // Make an list of the websites by seperating the values at every '/'
        var websites = websiteList.split("  ");
        var site; // An empty variable to use in the for loop.
        for (site of websites) {
            finalText += "<li><a href='" + site + "'>"+site+"</a></li>";
        }

        return finalText;
    } else {
        return "";
    }
}



/**
 * This method prepares the sponsors to be displayed given the data from 
 * the api call and returns some useful html for it.
 * @param {*} sponsorList The raw sponsor data
 */
function getSponsorHtml(sponsorList) {
    if (sponsorList != null) {
        var finalText = "<h4><b>Sponsors and Contributors</b></h4><ul id='sponsorList'>"; // The text to eventually return.

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
};