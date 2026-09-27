// priority: 1000

function random(min, max) {
    return Math.random() * (max - min) + min
}

function desaturateHex(hex, amount) {

    let num = parseInt(hex.replace("#", ""), 16)
    let r = (num >> 16) & 255
    let g = (num >> 8) & 255
    let b = num & 255

    let avg = (r + g + b) / 3

    r = Math.round(r + amount * (avg - r))
    g = Math.round(g + amount * (avg - g))
    b = Math.round(b + amount * (avg - b))

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function expandCountedIngredients(ingredients) {
    const expanded = []

    ingredients.forEach(ingredient => {
        if (ingredient.count && !ingredient.chance) {
            for (let i = 0; i < ingredient.count; i++) {
                const copy = {}
                for (const key in ingredient) {
                    if (ingredient.hasOwnProperty(key) && key !== 'count') {
                        copy[key] = ingredient[key]
                    }
                }
                expanded.push(copy)
            }
        } else {
            expanded.push(ingredient)
        }
    })

    return expanded
}

function getGlobalEntry(mapName, entryId, type, nestedKey) {
    const map = global[mapName]
    if (!map) return null

    const entry = map[entryId]
    if (!entry) return null

    if (entry[type] !== undefined) return entry[type]

    const nested = nestedKey ? entry[nestedKey] : null
    if (nested && nested[type] !== undefined) {
        return nested[type]
    }

    return null
}

function getMaterial(materialId, type) {
    if (type === 'fluid') {
        return getGlobalEntry('materialTypes', materialId, type)
    }

    return getGlobalEntry('materialTypes', materialId, type, 'items')
}

function getStone(stoneId, type) {
    return getGlobalEntry('stoneTypes', stoneId, type, 'items')
}
