
// Перший блок, введення пари Ім'я/Значення
const pairs = [];

function addPair() {
    const input = document.getElementById("pairInput").value.trim();
    const errorDiv = document.getElementById("error");
    const regex = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/;

    // Якщо формат не вірний, виводим попередження

    const match = input.match(regex);
    if (!match) {
        errorDiv.textContent = "Please enter a valid Name=Value pair. Both name and value should be alphanumeric.";
        return;
    }
    // Якщо пара вже існує(дубль), виводим інше попередження

    const name = match[1].trim();
    const value = match[2].trim();

    if (pairs.some(pair => pair === `${name}=${value}`)) {
        errorDiv.textContent = "This pair already exists.";
        return;
    }
    //Видаляєм повідомлення про помилку

    errorDiv.textContent = "";
    pairs.push(`${name}=${value}`);
    updateList();
    document.getElementById("pairInput").value = "";
}

//Викликається функція для оновлення текстового поля на сторінці textarea
function updateList() {
    const textarea = document.getElementById("pairList");
    textarea.value = pairs.map((pair, index) => `${index + 1}. ${pair}`).join("\n");
}

//Другий блок

function sortByName() {
    pairs.sort((a, b) => a.split("=")[0].localeCompare(b.split("=")[0]));
    updateList();
}

function sortByValue() {
    pairs.sort((a, b) => a.split("=")[1].localeCompare(b.split("=")[1]));
    updateList();
}

//Якщо користувач нічого не вводив, просто вихід
function deleteSelected() {
    const selectedIndexes = prompt("Enter the line number(s) to delete (e.g., 1, 3):");
    if (!selectedIndexes) return;

    // Перетворимо введення користувача на масив чисел
    const indexes = selectedIndexes
        .split(",")
        .map(num => parseInt(num.trim(), 10) - 1)
        // Відфільтровуємо валідні номери
        .filter(index => !isNaN(index) && index >= 0 && index < pairs.length);

    //Якщо не залишилось валідних номерів, виводимо повідомлення
    if (indexes.length === 0) {
        alert("No valid line numbers provided.");
        return;
    }

    // Видаляємо в зворотному напрямку, щоб індекси не збивались
    indexes.sort((a, b) => b - a).forEach(index => {
        pairs.splice(index, 1);
    });

    updateList();
}
