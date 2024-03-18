class Team {
    constructor(name, wins, losses, goalsScored) {
        this.name = name;
        this.wins = wins;
        this.losses = losses;
        this.goalsScored = goalsScored;
    }
}

function selectionSortTeams(teams, key='wins', ascending=false) {
    const n = teams.length;
    for (let i = 0; i < n - 1; i++) {
        let maxIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (ascending ? teams[j][key] > teams[maxIndex][key] : teams[j][key] < teams[maxIndex][key]) {
                maxIndex = j;
            }
        }
        if (i !== maxIndex) {
            [teams[i], teams[maxIndex]] = [teams[maxIndex], teams[i]];
        }
    }
    return teams;
}

const teams = []; // Array to hold team records

// Function to add a new team
function addTeam() {
    const teamName = document.getElementById('team-name').value.trim();
    const wins = parseInt(document.getElementById('wins').value);
    const losses = parseInt(document.getElementById('losses').value);
    const goalsScored = parseInt(document.getElementById('goals-scored').value);

    if (teamName && !isNaN(wins) && !isNaN(losses) && !isNaN(goalsScored)) {
        const newTeam = new Team(teamName, wins, losses, goalsScored);
        teams.push(newTeam);
        selectionSortTeams(teams, 'wins', true);
        displayTeams(teams);
        // Clear input fields after adding team
        document.getElementById('team-name').value = '';
        document.getElementById('wins').value = '';
        document.getElementById('losses').value = '';
        document.getElementById('goals-scored').value = '';
    } else {
        alert("Please fill in all fields with valid data.");
    }
}

// Function to display sorted team rankings
function displayTeams(teams) {
    const teamList = document.getElementById('team-list');
    teamList.innerHTML = ''; // Clear existing content
    teams.forEach((team, index) => {
        const rank = index + 1;
        const teamInfo = document.createElement('div');
        teamInfo.innerHTML = `
            <p><strong>Rank ${rank}:</strong> ${team.name}</p>
            <p>Wins: ${team.wins}, Losses: ${team.losses}, Goals Scored: ${team.goalsScored}</p>
            <hr>
        `;
        teamList.appendChild(teamInfo);
    });
}

// Get the "Add Team" button by id
const addTeamBtn = document.getElementById('add-team-btn');

// Add event listener to the "Add Team" button
addTeamBtn.addEventListener('click', addTeam);
