// Hammer Requirements And Max Stage

let HAMMER_REQUIREMENTS = {}
let HAMMER_MAX_STAGE = {}

global.hammers.forEach(function(arr) {
    HAMMER_REQUIREMENTS['minecraft:' + arr[0]] = arr[2]
    HAMMER_MAX_STAGE['minecraft:' + arr[0]] = arr[3]
})

HAMMER_REQUIREMENTS['kubejs:steel_pipe'] = 35
HAMMER_MAX_STAGE['kubejs:steel_pipe'] = 3

// CustomModelData helpers — mutate NBT only, never setItemInHand.
// Create filter menus compare held-stack identity (==) and close if replaced.

function readCmd(stack) {
    let tag = stack.nbt
    if (!tag) return 0
    if (typeof tag.contains === 'function' && typeof tag.getInt === 'function') {
        return tag.contains('CustomModelData') ? tag.getInt('CustomModelData') : 0
    }
    return tag.CustomModelData == null ? 0 : Number(tag.CustomModelData)
}

function writeCmd(stack, value) {
    if (readCmd(stack) === value) return false
    let tag = stack.nbt
    if (tag && typeof tag.putInt === 'function') {
        tag.putInt('CustomModelData', value)
    } else {
        stack.nbt = Object.assign({}, tag || {}, { CustomModelData: value })
    }
    return true
}

// Player Tick For Hammer Charge Display

PlayerEvents.tick(function(event) {
    let player = event.player
    let data = player.persistentData

    // Fast path: not charging — fallback reset only, and only for hammers.
    if (!data.chargedHammer_charging) {
        let hand = player.getItemInHand('main_hand')
        if (hand.id in HAMMER_REQUIREMENTS && readCmd(hand) !== 0) {
            writeCmd(hand, 0)
        }
        return
    }

    let mainHand = player.getItemInHand('main_hand')
    let id = mainHand.id

    // Interrupted (switched item / empty hand): clear flag only.
    if (id === 'minecraft:air' || !(id in HAMMER_REQUIREMENTS)) {
        data.chargedHammer_charging = false
        return
    }

    let remaining = player.getUseItemRemainingTicks()

    if (remaining <= 0) {
        data.chargedHammer_charging = false
        return
    }

    let stage = Math.min(Math.floor((100000 - remaining) / HAMMER_REQUIREMENTS[id]), HAMMER_MAX_STAGE[id])
    let targetModel = stage > 0 ? stage : 0
    let currentModel = readCmd(mainHand)

    if (writeCmd(mainHand, targetModel)) {
        if (targetModel > currentModel && !event.level.isClientSide()) {
            event.level.playSound(null, player.x, player.y, player.z, 'minecraft:item.trident.return', 'players', 1, 1.5)
        }
    }
})
