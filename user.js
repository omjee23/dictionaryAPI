const button = document.querySelector(".btn");
const loader = document.querySelector(".custom-loader");
const searchValue = document.querySelector("#search");
const dataContainer = document.querySelector('.dataContainer');
const templateContainer = document.querySelector('.templateContainer');
const mainBox = document.querySelector('#mainBox');
const errorMsg = document.querySelector('.error');

const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

button.addEventListener("click", () => {
    let value = searchValue.value;
    fetchData(value);
});

const fetchData = async (value) => {
    dataContainer.innerHTML = ""
    loader.style.display = "block";
    try {
        let response = await fetch(`${BASE_URL}${value}`);
        if (response.status === 200) {
            response = await response.json();
            const result = response[0].meanings;
            dataBinding(result);
            loader.style.display = "none";
        }
        else{
            loader.style.display = "none";
            errorMsg.textContent = "Data is not Found"
        }
    } catch (e) {
        console.log("Error loading", e);
    }
};

const dataBinding = (result) => {
    let len;
    if (result.length > 2) {
        len = 3;
    } else if (result.length == 2) {
        len = 2;
    } else {
        len = 1;
    }

    for (let i = 0; i < len; i++) {
        const cloneNode = document.importNode(templateContainer.content, true);
        cloneNode.querySelector('.speech').textContent = `Part Of Speech: ${result[i].partOfSpeech}`;
        cloneNode.querySelector('.definition').textContent = `Definition: ${result[i].definitions[0].definition}`;
        dataContainer.appendChild(cloneNode);
    }
};
