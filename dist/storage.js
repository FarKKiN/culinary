const STORAGE_KEY = "culinary-recipes";
const CATEGORIES = ["Завтрак", "Обед", "Ужин", "Десерт"];
function isReview(value) {
    if (typeof value !== "object" || value === null)
        return false;
    const item = value;
    return (typeof item.id === "string" &&
        typeof item.author === "string" &&
        typeof item.text === "string" &&
        typeof item.likes === "number" &&
        Number.isInteger(item.likes) &&
        item.likes >= 0 &&
        typeof item.liked === "boolean" &&
        item.likes >= (item.liked ? 1 : 0));
}
function isRecipe(value) {
    if (typeof value !== "object" || value === null)
        return false;
    const item = value;
    return (typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.category === "string" &&
        CATEGORIES.includes(item.category) &&
        typeof item.servings === "number" &&
        Number.isInteger(item.servings) &&
        item.servings >= 1 &&
        item.servings <= 30 &&
        typeof item.cookingTime === "number" &&
        Number.isInteger(item.cookingTime) &&
        item.cookingTime >= 1 &&
        item.cookingTime <= 600 &&
        Array.isArray(item.ingredients) &&
        item.ingredients.every((x) => typeof x === "string") &&
        typeof item.instructions === "string" &&
        typeof item.favorite === "boolean" &&
        (item.imageUrl === undefined || typeof item.imageUrl === "string") &&
        (item.reviews === undefined ||
            (Array.isArray(item.reviews) && item.reviews.every(isReview))));
}
export function loadRecipes() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null)
        return null;
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || !parsed.every(isRecipe)) {
            return null;
        }
        return parsed.map((recipe) => ({
            ...recipe,
            reviews: recipe.reviews ?? [],
        }));
    }
    catch {
        return null;
    }
}
export function saveRecipes(recipes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}
//# sourceMappingURL=storage.js.map