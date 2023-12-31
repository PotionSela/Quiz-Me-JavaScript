const goBackButton = document.getElementById("go-back-button"); // Go back button
const clearButton = document.getElementById("clear-button"); // Clear scores button
const highScoresList = document.getElementById("high-scores-list");

// Function to retrieve and display high scores
function displayHighScores() {
    const highScoresList = document.getElementById("high-scores-list");
    highScoresList.innerHTML = ""; // Clear the existing list

    // Retrieve high scores from Local Storage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Sort the high scores in descending order (highest scores first)
    highScores.sort((a, b) => b.score - a.score);

    // Display the high scores in a list
    highScores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        highScoresList.appendChild(listItem);
    });
}

// Call the function to display high scores when the high scores page loads
displayHighScores();

// Event listeners

document.querySelector(".button.clear-button").addEventListener("click", function () {
    // Clear high scores logic
    localStorage.removeItem("highScores"); // Remove the high scores from local storage
    highScoresList.innerHTML = ""; // Clears the high scores list on the page
});

goBackButton.addEventListener("click", function () {
    location.reload(); // Reload the page to start over
});
