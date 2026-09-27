ServerEvents.recipes(event => {

    event.shaped(
        'tfmg:steel_fluid_tank',
        [
            'A',
            'B',
            'A'
        ],
        {
            A: 'tfmg:heavy_plate',
            B: 'minecraft:glass'
        }
    )

    event.shaped(
        'tfmg:aluminum_fluid_tank',
        [
            'A',
            'B',
            'A'
        ],
        {
            A: 'tfmg:aluminum_sheet',
            B: 'minecraft:glass'
        }
    )

    event.shaped(
        'tfmg:cast_iron_fluid_tank',
        [
            'A',
            'B',
            'A'
        ],
        {
            A: 'tfmg:cast_iron_sheet',
            B: 'minecraft:glass'
        }
    )

})