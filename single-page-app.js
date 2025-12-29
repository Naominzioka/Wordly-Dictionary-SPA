//use fetch to request data from the dictionary API
//parse the API response to extract details(definitions,synonyms,pronounciation)
//update the DOM with the fetched data
//add event listeners to handle form submission and user actions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Grab your elements
    const dictionaryForm = document.getElementById('wordlyDictionary');
    const resultArea = document.getElementById('resultArea');

    // 2. Attach the listener
    dictionaryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInput = document.getElementById('search');
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) {
            displayError("Please enter a valid word.");
            return;
        }
        //if (searchTerm.length > 0) {
            //console.log(`Searching for ${searchTerm}`)
            fetchDefinition(searchTerm);
            searchInput.value = "";
       // }
    });

    console.log("App is ready and DOM is loaded!");
});

function fetchDefinition(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    console.log(`URL is ${url}`)
    fetch(url)
        .then(response => {
            if (!response.ok) { throw new Error("Word not found in our database. Try a more common word"); }
            return response.json()
        })
        .then(data => {
            displayResult(data)
        })
        .catch(error => {
            displayError(error)
        })
}



function displayResult(data) {
    const errorDiv = document.getElementById("error-message")
    errorDiv.textContent = '';

    const definition = data[0].meanings[0].definitions[0].definition || "No definition available.";
    const word = data[0].word;
    const partOfSpeech = data[0].meanings[0].partOfSpeech || "Classification unknown";
    const exampleUsage = data[0].meanings[0].definitions[0].example || "No example provided for this word";
    const synonyms = data[0].meanings[0].synonyms.join(", ") || "No synonyms available for this word."
    console.log(`Definition is ${definition}`)
    console.log(`Word is ${word}`)

    const resultDiv = document.getElementById("resultsArea")
    resultDiv.innerHTML = `
        <div class="definition-card">
            <h2 class="result-word">${word}</h2>
            <em class="part-of-speech">${partOfSpeech}</em>
            <p class="result-text"><strong>Defn:</strong> ${definition}</p>
            <p class="result-text"><strong>Example:</strong> ${exampleUsage}</p>
            <p class="result-text"><strong>Synonyms:</strong> ${synonyms}
        </div>
    `;


}

function displayError(message) {
    const resultDiv = document.getElementById("resultsArea")
    resultDiv.replaceChildren()

    console.log('Got error: ', message)
    const errorDiv = document.getElementById("error-message")
    errorDiv.textContent = message;
}