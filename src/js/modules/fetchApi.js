export async function fetchFromApi(url, apiKey, title) {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey,
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        const dataKeys = ['items', 'films', 'genres'];
        const data = dataKeys.find(key => Array.isArray(responseData[key]) && responseData[key].length > 0);

        if (!data) {
            throw new Error("Ничего не найдено");
        }

        return responseData[data];

    } catch (error) {
        if (error.message.includes("Ошибка HTTP")) {
            title.innerHTML = `Ошибка при запросе к API: ${error.message}`;
        } else {
            title.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
        }
        return [];
    }
}