let base_url = "https://api.football-data.org/v2/";
let authToken = "c23fb89344494ed4898efa94f4b0ae79";
let LEAGUE_ID = 2021;

function getStanding() {
    if ("caches" in window) {
        caches.match(`${base_url}competitions/${LEAGUE_ID}/standings`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    showStanding(data);
                });
            }
        });
    }

    fetch(`${base_url}competitions/${LEAGUE_ID}/standings`, {
        headers: {
            'X-Auth-Token': authToken
        }
    })
        .then(res => {
            return res.json()
        })
        .then(resjson => {
            showStanding(resjson)
        })
}

function showStanding(dataStanding) {
    const standings = dataStanding.standings[0].table;
    var tableStandingHTML = '';
    var dataTableStanding = '';
    standings.forEach(club => {
        club = JSON.parse(JSON.stringify(club).replace(/^http:\/\//i, 'https://'));
        dataTableStanding += `
            <tr>
                <td class="center-align">${club.position}</td>
                <td>
                    <a href="detail.html?id=${club.team.id}">
                        <img class="show-on-medium-and-up show-on-medium-and-down" src="${club.team.crestUrl}" alt="${club.team.name}" style="float:left;width:22px;height:22px;margin-right:20px">
                        <p class="hide-on-small-only">${club.team.name}</p>
                    </a>
                </td>
                <td class="center-align">${club.playedGames}</td>
                <td class="center-align hide-on-small-only">${club.won}</td>
                <td class="center-align hide-on-small-only">${club.draw}</td>
                <td class="center-align hide-on-small-only">${club.lost}</td>
                <td class="center-align">${club.goalsFor}</td>
                <td class="center-align">${club.goalsAgainst}</td>
                <td class="center-align hide-on-small-only">${club.goalDifference}</td>
                <td class="center-align">${club.points}</td>
            </tr>
        `
    })

    tableStandingHTML += `
        <div class="card">
            <div class="card-content">
                <table class="striped">
                    <thead>
                        <tr>
                            <th class="center-align">Position</th>
                            <th>Team</th>
                            <th class="center-align">Played</th>
                            <th class="center-align hide-on-small-only">Won</th>
                            <th class="center-align hide-on-small-only">Draw</th>
                            <th class="center-align hide-on-small-only">Lost</th>
                            <th class="center-align">GF</th>
                            <th class="center-align">GA</th>
                            <th class="center-align hide-on-small-only">GD</th>
                            <th class="center-align">Points</th>
                        </tr>
                    </thead>
                    <tbody>` + dataTableStanding + `</tbody>
                </table>
            </div>
        </div>
    `
    document.getElementById("standing").innerHTML = tableStandingHTML;
    document.getElementById("spinner-loader").innerHTML = '';
}

function detailTeam() {
    return new Promise(function (resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(`${base_url}teams/${idParam}`).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        detailTeamHTML(data)
                        resolve(data);
                    });
                }
            });
        }

        fetch(`${base_url}teams/${idParam}`, {
            headers: {
                'X-Auth-Token': authToken
            }
        })
            .then(res => {
                return res.json()
            })
            .then(resjson => {
                detailTeamHTML(resjson);
                resolve(resjson);
            })
    })
}

function detailTeamHTML(data) {
    let dataSquadHTML = ''
    let tabelSquadHTML = ''
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    document.getElementById("logoTeam").src = data.crestUrl;
    document.getElementById("namaTeam").innerHTML = data.name;
    document.getElementById("founded").innerHTML = data.founded;

    data.squad.forEach(function (squad) {
        dataSquadHTML += `
            <tr>
                <td class="center-align">${squad.name}</td>
                <td class="center-align">${squad.position || '-'}</td>
                <td class="center-align">${squad.nationality}</td>
                <td class="center-align hide-on-small-only">${squad.countryOfBirth}</td>
                <td class="center-align hide-on-small-only">${squad.role}</td>
            </tr>
        `
    });
    tabelSquadHTML += `
        <div class="card">
            <div class="card-content">
                <table class="highlight">
                    <thead>
                        <tr>
                            <th class="center-align">Player Name</th>
                            <th class="center-align">Position</th>
                            <th class="center-align">Nationality</th>
                            <th class="center-align hide-on-small-only">Country of Birth</th>
                            <th class="center-align hide-on-small-only">Role</th>
                        <tr>
                    </thead>
                    <tbody> ${dataSquadHTML}</tbody>
                </table>
            </div>
        </div>
    `
    document.getElementById("detailTeam").innerHTML = tabelSquadHTML;
    document.getElementById("spinner-loader").innerHTML = '';
}

function getSavedFavorite() {
    getAllFavorite().then(teams => {
        var favHTML = '';
        if (teams.length == 0)
            favHTML += `<div class="container center">Kamu belum memilih team.<div class="container">`;
        teams.forEach(team => {
            favHTML += `
            <ul class="collection">
                <li class="collection-item">
                    <a href="detail.html?id=${team.id}">
                        <div>
                            <img src="${team.crestUrl}" width="20">
                            ${team.name}
                        </div>
                    </a>
                </li>
                <li class="collection-item">
                    <span class="right"><a onclick="deleteOnClick(${team.id})">Delete</a></span>
                </li>
            </ul>
            `;
        });
        document.getElementById("team-favorite").innerHTML = favHTML;
        document.getElementById("spinner-loader").innerHTML = '';
    });
}

var deleteOnClick = idteam => {
    deleteFavorite(idteam);
    getSavedFavorite();
}