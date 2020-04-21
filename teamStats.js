/**
 * This should load stats on any team.
 * Requires constants.js
*/


var teamData;

/**
 * Set up the teamStats html page.
 * @param {*} team The team number of the desired team.
 */
function getTeamData(team) {
    getTeamMediaData(team);
    getGeneralTeamData(team);
};

/**
 * Set up the teamHistory html page.
 * @param {*} team The team number of the desired team.
 */
function getTeamHistory(team) {
    getTeamData(team);
    getTeamAwards(team);
}

/**
 * Get all the data we want from a general team api request
 * (team/frcTEAM)
 * @param {*} team 
 */
function getGeneralTeamData(team) {
    console.log("getting Team Data");
    tbaRequestHandler("team/frc"+team.toString(), processGeneralTeamData);
};

/**
 * This function is passed to a tbaRequestHandler by 
 * getGeneralTeamData
 * @param {*} jstuff Json from the tba request callback.
 */
function processGeneralTeamData(jstuff) {
    getTeamNameHeader(jstuff);
    getTeamWebsites(jstuff);
    getSponsorHtml(jstuff);
}

/**
 * This starts the tba request of the desired media
 * (mainly Icon)
 * TBA path: team/frcTEAM/media/YEAR
 * @param {*} team The desired team number
 */
function getTeamMediaData(team) {
    console.log("getting Team Media Data");
    var d = new Date();
    tbaRequestHandler("team/frc"+team.toString()+"/media/"+d.getFullYear(), getTeamIcon);
};


/**
 * This method creates some html to display the team name header.
 * @param {*} nickname The name of the team as a string 
 * @param {*} number The team number
 */
function getTeamNameHeader(jstuff) {
    var finalText = "";
    if (jstuff.nickname != null && jstuff.number != null) {
        var finalText = "<h3 id='teamName'>";
        finalText += jstuff.nickname+" "+jstuff.number.toString();
    }
    $("#teamHeader").append(finalText);
};

/**
 * Display a teams icon from the base64 data from the TBA api.
 * @param {*} base64data The image data in base64 from the tba api
 */
function getTeamIcon(jstuff) {
    var text = ""
    for (media of jstuff) {
        if (media.foreign_key.startsWith("avatar")) {
            text = `<img style='display:block; width:100px;height:100px;' id='base64image', 
            src='data:image/jpeg;base64, `+media.details.base64Image+"' />";
        }
    }
    $("#teamIcon").append(text);
};


/**
 * This function processes the team website from 
 * the general team request
 * @param {*} jstuff Json from tbaRequestHandler
 */
function getTeamWebsites(jstuff) {
    var websiteList = jstuff.website;
    var finalText = "";
    if (websiteList != null) { 
        var finalText = "<h4><b>Team Websites</b></h4><ul id='websiteList'>";

        // Make an list of the websites by seperating the values at every '/'
        var websites = websiteList.split("  ");
        var site; // An empty variable to use in the for loop.
        for (site of websites) {
            finalText += "<li><a href='" + site + "'>"+site+"</a></li>";
        }
    }
    $("#websites").append(finalText);
}



/**
 * This method prepares the sponsors to be displayed given the data from 
 * the api call and returns some useful html for it.
 * @param {*} sponsorList The raw sponsor data
 */
function getSponsorHtml(jstuff) {
    var sponsorList = jstuff.name;
    var finalText = "";
    if (sponsorList != null) {
        var finalText = "<h4><b>Sponsors and Contributors</b></h4><ul id='sponsorList'>"; // The text to eventually return.

        // Make an list of the sponsors by seperating the values at every '/'
        var sponsors = sponsorList.split("/");
        var sponsor; // An empty variable to use in the for loop.
        for (sponsor of sponsors) {
            finalText += "<li>" + sponsor + "</li>";
        }
    }
    $("#sponsors").append(finalText);
};

/**
 * Process the previous awards of the team.
 * @param {*} team The desired team number
 */
function getTeamAwards(team) {
    console.log("getting Team Awards Data");
    tbaRequestHandler("team/frc"+team+"/awards", processTeamAwards);
};


function processTeamAwards(json) {
    var newBanners = "";
    var newAwards = "<li>";
    for (award of json) {
        if (award.award_type in BannerWorthyAwards) {
            newBanners += "<div>"+award.name+"</div>";
        } else {
            newAwards += "<ul>"+award.name+"</li>";
        }
    }
    newAwards += "</li>";
    $("#banners").append(newBanners);
    $("#awards").append(newAwards);
};


function tbaRequestHandler(path, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            jstuff = JSON.parse(this.responseText);
            callback(jstuff);
        }
    };
    xhttp.open("GET", "https://www.thebluealliance.com/api/v3/"+path, true);
    xhttp.setRequestHeader("X-TBA-Auth-Key", tbaAuthKey);
    xhttp.send();
}