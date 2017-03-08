function newHttp() {
    try
    {
        // Firefox, Opera 8.0+, Safari
        return new XMLHttpRequest();
    }
    catch (e)
    {
        // Internet Explorer
        try
        {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            try
            {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e)
            {
                alert("Your browser does not support AJAX!")
            }
        }
    }
}

async function getNatuurlijkPersoon(el, pensioennummer) {
    let xmlHttp = newHttp();
    let url = "http://natuurlijkepersonen.svc.tst.tkp/api/v1/natuurlijkepersonen/{ids}";

    xmlHttp.open( "GET", url.replace("{ids}", pensioennummer), true );
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4)
        {
            if (xmlHttp.status == 200) {
                let np = JSON.parse(xmlHttp.responseText);
                voegToe(el, pensioennummer, np.naam.adresseringsnaamVoluit);
            } else {
                alert(xmlHttp.status + " " +xmlHttp.statusText);
            }
        }
    };
    xmlHttp.send();
}

function voegToe(el, pensioennummer, naam) {
    let newElement = document.createElement("div");
    newElement.setAttribute("class", "persoontile");
    newElement.setAttribute("draggable", "true");
    newElement.innerHTML = '<p style="margin: 0; text-align: center; user-select: none;">' + pensioennummer + '</p><p style="margin: 0; text-align: center; font-size: 40%;">' + naam + '</p>';
    el.appendChild(newElement);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}