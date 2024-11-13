
type Rarity = "common" | "uncommon" | "rare" | "epic";
type TooltipType = "default" | "red" | "blue"
class ToolTip {
    text: string;
    type: TooltipType;

    constructor(text: string, type: TooltipType) {
        this.text = text;
        this.type = type;
    }

}
class Item {
    name: string;
    image: string; // The path from /src/assets/items to the image
    quantity: number;
    rarity: Rarity;
    tooltips: ToolTip[] = [];

    constructor(name: string, image: string, quantity: number, rarity: Rarity) {
        this.name = name;
        this.image = image;
        this.quantity = quantity;
        this.rarity = rarity;
    }

    static of(name: string, image: string, quantity: number): Item;
    static of(name: string, image: string, quantity: number, rarity: Rarity): Item;
    static of(name: string, image: string, quantity: number, rarity?: Rarity): Item {
        return new Item(name, image, quantity, rarity ?? "common");
    }


    withTooltip(text: string): this;
    withTooltip(text: string, type: TooltipType): this;
    withTooltip(text: string, type?: TooltipType): this {
        this.tooltips.push(new ToolTip(text, type ?? "default"));
        return this;
    }
}

/**
 * Represents a simple recipe for crafting an item. Based on a 9x9 crafting grid.
 */
class CraftingRecipe {
    result: Item;
    ingredients: (Item|null)[]; // The ingredients in the crafting grid (9 slots, null if empty

    constructor(result: Item, ingredients: (Item|null)[]) {
        this.result = result;
        this.ingredients = ingredients.concat(Array(9 - ingredients.length).fill(null));
    }
}

class CraftingRecipeSimpleBuilder {
    pattern: string[] = [];
    ingredients: {[key: string]: Item} = {};
    result!: Item;

    constructor() {
    }

    static create() {
        return new CraftingRecipeSimpleBuilder();
    }

    setPattern(...pattern: string[]) {
        this.pattern = pattern;
        return this;
    }

    setIngredient(key: string, item: Item) {
        this.ingredients[key] = item;
        return this;
    }

    setOutput(item: Item) {
        this.result = item;
        return this;
    }

    build() {
        // Adds padding to 2x2 recipes
        if (this.pattern.length === 2) {
            this.pattern = this.pattern.map(row => row.padEnd(3, " "));
        }
        const ingredients = this.pattern.flatMap(row => row.split("").map(char => this.ingredients[char] || null));
        return new CraftingRecipe(this.result, ingredients);
    }

}

class SmeltingRecipe {
    result: Item;
    ingredient: Item;
    experience: number;
    time: number;

    constructor(result: Item, ingredient: Item, experience: number, time: number) {
        this.result = result;
        this.ingredient = ingredient;
        this.experience = experience;
        this.time = time;
    }
    static of(result: Item, ingredient: Item): SmeltingRecipe;
    static of(result: Item, ingredient: Item, experience: number): SmeltingRecipe;
    static of(result: Item, ingredient: Item, experience: number, time: number): SmeltingRecipe;
    static of(result: Item, ingredient: Item, experience?: number, time?: number): SmeltingRecipe {
        return new SmeltingRecipe(result, ingredient, experience ?? 0, time ?? 200);
    }


}

class SmeltingRecipeBuilder {
    result!: Item;
    ingredient!: Item;
    experience: number = 0;
    time: number = 200;

    constructor() {
    }

    static create() {
        return new SmeltingRecipeBuilder();
    }

    setResult(item: Item) {
        this.result = item;
        return this;
    }

    setIngredient(item: Item) {
        this.ingredient = item;
        return this;
    }

    setExperience(experience: number) {
        this.experience = experience;
        return this;
    }

    setTime(time: number) {
        this.time = time;
        return this;
    }

    build() {
        return new SmeltingRecipe(this.result, this.ingredient, this.experience, this.time);
    }

}


export { Item, CraftingRecipe, CraftingRecipeSimpleBuilder, ToolTip, SmeltingRecipe, SmeltingRecipeBuilder };
export type { Rarity, TooltipType };