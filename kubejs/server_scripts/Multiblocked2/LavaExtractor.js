// Lava Extractor

MBDMachineEvents.onTick('cwi:lava_extractor_head', event => {
    if (globalTickCounter % 40) return

    const machine  = event.getEvent().getMachine()
    const level = machine.getLevel()
    const pos = machine.getPos()
    const blockBelowPos = pos.offset(0, -1, 0)
    const blockAbovePos = pos.offset(0, 1, 0)
    const blockBelow = level.getBlock(blockBelowPos)

    const partmachine = $IMachine.ofMachine(level, blockAbovePos).orElse(false)
    const holder = partmachine.machineHolder
    if (!holder) return
    const speed = holder.speed
    if (!speed) return
    const soundMultiplier = speed / 256

    level.playSound(null, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, 'clanginghowl:drilling', 'blocks', soundMultiplier / 2, 0.25)

    if (speed < 128) return

    let pumpCount = 0

    machine.getMultiblockState().getCache().forEach(pos => {
        if (level.getBlockState(pos).getBlock().equals(Block.getBlock('cwi:lava_extractor_pump'))) pumpCount++
    })

    const extractAmount = Math.round( pumpCount * 500 * speed / 256)
    const isMagmaBedrock = blockBelow == 'kubejs:eruptive_bedrock'
    const fluidTank = machine.getTraitByName("fluid_tank")

    if (isMagmaBedrock) {
        fluidTank.storages[0].setFluid(Fluid.of('minecraft:lava', extractAmount))
        level.playSound(null, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, 'minecraft:item.bucket.empty_lava', 'blocks', soundMultiplier, 0.5)
        for (let i = 0; i < 3 + pumpCount * 2; i++) {
            level.spawnParticles('clanginghowl:breakdown_smoke', true, blockAbovePos.x + random(0, 1), blockAbovePos.y - 0.2 + random(0, pumpCount - 1), blockAbovePos.z + random(0, 1), 0, 0, 0, 0, 0)
            level.spawnParticles('clanginghowl:flamethrower_burst', true, blockAbovePos.x + random(0, 1), blockAbovePos.y + random(0, pumpCount - 1) / 2, blockAbovePos.z + random(0, 1), 0, 0, 0, 0, 0)
            level.spawnParticles('minecraft:smoke', true, blockAbovePos.x + random(0, 1), blockAbovePos.y, blockAbovePos.z + random(0, 1), 0, 0, 0, 0, 0)
        }
    }
})