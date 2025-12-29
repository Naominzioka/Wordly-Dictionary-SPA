function renderResult(data) {
    const errorDiv = document.getElementById("error-message")
    errorDiv.textContent = '';

    const word = data[0].word;
    const meanings = []

    for (let i = 0; i < data.length; i++) {
        const item = data[i]
        for (let j = 0; j < item.meanings.length; j++) {
            meanings.push(item.meanings[j])
        }
    }

    const resultDiv = document.getElementById("resultsArea")
    resultDiv.replaceChildren()

    for (let i = 0; i < meanings.length; i++) {
        const meaning = meanings[i]
        const defn = meaning.definitions[0]
        const definition = defn.definition
        const partOfSpeech = meaning.partOfSpeech
        const exampleUsage = defn.example || ""
        const synonyms = meaning.synonyms.join(", ");

        const innerHTML = `
            <div class="definition-card">
                <h2 class="result-word">${word}</h2>
                <em class="part-of-speech">${partOfSpeech}</em>
                <p class="result-text"><strong>Defn:</strong> ${definition}</p>
                <p class="result-text"><strong>Example:</strong> ${exampleUsage}</p>
                <p class="result-text"><strong>Synonyms:</strong> ${synonyms}</p>
            </div>
        `;

        resultDiv.insertAdjacentHTML('beforeend', innerHTML);
    }

}