ServerEvents.recipes(event => {

    event.shapeless(
        'kubejs:ashen_depleted_dirt',
        [
            'kubejs:dark_ash',
            'kubejs:depleted_dirt'
        ]
    )

    event.shapeless(
        'kubejs:depleted_dirt',
        [
            '2x kubejs:ash',
            'kubejs:pebbles',
            'minecraft:sand'
        ]
    )

    event.shapeless(
        '4x kubejs:sand_pile',
        'minecraft:sand'
    )

    event.shapeless(
        'minecraft:sand',
        '4x kubejs:sand_pile'
    )

    event.shapeless(
        '4x kubejs:pebbles',
        'minecraft:cobblestone'
    )

    event.shapeless(
        'minecraft:cobblestone',
        '4x kubejs:pebbles'
    )

    event.shaped(
        'minecraft:anvil',
        [
            'AAA',
            ' B ',
            'BBB'
        ],
        {
            A: 'create:industrial_iron_block',
            B: 'kubejs:industrial_iron_ingot'
        }
    )

    event.shaped(
        'minecraft:lightning_rod',
        [
            'A',
            'B',
            'B'
        ],
        {
            A: 'minecraft:copper_ingot',
            B: 'createaddition:copper_rod'
        }
    )

})