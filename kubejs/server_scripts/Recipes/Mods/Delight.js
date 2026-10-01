ServerEvents.recipes(event => {

    event.shaped(
        'farmersdelight:cooking_pot',
        [
            'BCB',
            'A A',
            'AAA'
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:brick',
            C: 'minecraft:wooden_shovel'
        }
    )

    event.shaped(
        'miners_delight:copper_pot',
        [
            'ABA',
            'AAA'
        ],
        {
            A: 'create:copper_sheet',
            B: 'minecraft:wooden_shovel'
        }
    )

})