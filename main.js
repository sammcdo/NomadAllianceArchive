/**
 * The javascript for the index page.
*/

function loadXMLDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            jstuff = JSON.parse(this.responseText);
            document.getElementById("demo").innerHTML = "<ul id='sponsors'>";
            var sponsor;
            var sponsors = jstuff.name.split("/");
            for (sponsor of sponsors) {
                $("#sponsors").append("<li>" + sponsor + "</li>");
            }
            $("#sponsors").append("</ul>");
        }
    };
    xhttp.open("GET", "https://www.thebluealliance.com/api/v3/team/frc6995", true);
    xhttp.setRequestHeader("X-TBA-Auth-Key", "eEw2xnP2lfo4au8unAIYp4xJourubuxF7vz4b1WgHbzmOLQxZHoUomCV1qudfil9");
    xhttp.send();
};

