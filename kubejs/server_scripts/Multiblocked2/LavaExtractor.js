// On Machine Tick

MBDMachineEvents.onTick('cwi:lava_extractor_head', event => {
    if (globalTickCounter % 40) return

    const machine  = event.getEvent().getMachine()
    const level = machine.getLevel()
    const pos = machine.getPos()
    const blockBelowPos = pos.offset(0, -1, 0)
    const blockAbovePos = pos.offset(0, 1, 0)
    const blockBelow = level.getBlock(blockBelowPos)

    const partmachine = $IMachine.ofMachine(level, blockAbovePos).orElse(null)
    const holder = partmachine.machineHolder
    const speed = holder.speed
    if (holder.speed < 0) return

    const extractTime = 256 / speed
    const isMagmaBedrock = blockBelow == 'kubejs:magma_bedrock'

    const trait = machine.getTraitByName('fluid_tank')

    if (extractTime > 2) return
    level.playSound(null, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, 'minecraft:item.bucket.empty_lava', 'blocks', 0.5, 0.5)
    level.playSound(null, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, 'clanginghowl:drilling', 'blocks', 0.25, 0.25)
})