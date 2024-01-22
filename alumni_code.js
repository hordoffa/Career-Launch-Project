document.addEventListener('DOMContentLoaded', (event) => {
    const searchButton = document.getElementById('searchbttn');
    searchButton.addEventListener('click', searchAlumni);
});

function searchAlumni() {
    // Get the search input value
    const query = document.getElementById('searchInput').value.toLowerCase();

    // Fetch the alumni data from the server
    fetch('/alumniData')
        .then(response => response.json())
        .then(alumniData => {
            // Filter alumni based on the search query
            const filteredAlumni = alumniData.filter(alum =>
                alum.company.toLowerCase().includes(query) || alum.Industry.toLowerCase().includes(query)
            );
            // Call a function to update the UI with the filtered alumni data
            updateAlumniUI(filteredAlumni);
        });
}

function updateAlumniUI(filteredAlumni) {
    // Update the UI to display the filtered alumni data
    const alumContainer = document.querySelector('.alum');
    alumContainer.innerHTML = '';

    filteredAlumni.forEach(alum => {
        const alumElement = document.createElement('div');
        alumElement.innerHTML = `
            <div id="dot"></div>
            <div id="alumText">
                <h2>${alum.first_name} ${alum.last_name}</h2>
                <h3>${alum.gender}</h3>
                <p>${alum.company} - ${alum.Industry}</p>
                <button onclick="connectToChat('${alum.id}')">Connect</button>
            </div>
        `;
        alumContainer.appendChild(alumElement);
    });
}