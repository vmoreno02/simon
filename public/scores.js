async function loadScores() {
    let scores = [];
    try {
        // Get the latest high scores from the service
        const response = await fetch('/api/scores');
        scores = await response.json();
  
        // Save the scores in case we go offline in the future
        localStorage.setItem('scores', JSON.stringify(scores));
    } catch {
        // If there was an error then just use the last saved scores
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }
    }
  
    displayScores(scores);
  }

function displayScores(scores) {
    const tableBody = document.querySelector("#scores");

    if (scores.length) {
        for (const [i, score] of scores.entries()) {
            const position = document.createElement('td');
            const name = document.createElement('td');
            const scoreEl = document.createElement('td');
            const date = document.createElement('td');

            position.textContent = i + 1;
            name.textContent = score.name;
            scoreEl.textContent = score.score;
            date.textContent = score.date;

            const row = document.createElement('tr');
            row.appendChild(position);
            row.appendChild(name);
            row.appendChild(scoreEl);
            row.appendChild(date);

            tableBody.appendChild(row);
        }
    }
    else {
        tableBody.innerHTML = '<tr><td colSpan=4>Oops, no one has scored yet!</td></tr>';
    }
}

loadScores();
