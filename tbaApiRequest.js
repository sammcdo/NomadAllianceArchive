/*
 * Some classes to organize tba requests.
*/

var TBA_key = "eEw2xnP2lfo4au8unAIYp4xJourubuxF7vz4b1WgHbzmOLQxZHoUomCV1qudfil9";

class BaseTBARequest {
    constructor (address) {
        this.httpRequest = new XMLHttpRequest();
    }
}