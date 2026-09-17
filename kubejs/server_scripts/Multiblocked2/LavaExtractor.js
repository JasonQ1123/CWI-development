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
    const soundMultiplier = speed / MAX_RPM

    level.playSound(null, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, 'clanginghowl:drilling', 'blocks', soundMultiplier / 2, 0.25)

    if (speed < 128) return

    let pumpCount = 0

    machine.getMultiblockState().getCache().forEach(pos => {
        if (level.getBlockState(pos).getBlock().equals(Block.getBlock('cwi:lava_extractor_pump'))) pumpCount++
    })

    const extractAmount = Math.round( pumpCount * 500 * speed / MAX_RPM)
    const isMagmaBedrock = blockBelow == 'kubejs:eruptive_bedrock'
    const fluidTank = machine.getTraitByName("fluid_tank")

    const particleCount = 3 + 2 * pumpCount
    const particleOffset = Math.sqrt(pumpCount - 1) / 4
    const particleX = blockAbovePos.x + 0.5
    const particleY = blockAbovePos.y + 0.2 + 2 * particleOffset
    const particleZ = blockAbovePos.z + 0.5

    level.spawnParticles('clanginghowl:breakdown_smoke', true, particleX, particleY, particleZ, 0.22, particleOffset, 0.22, particleCount, 0)

    if (isMagmaBedrock) {
        fluidTank.storages[0].setFluid(Fluid.of('minecraft:lava', extractAmount))
        level.playSound(null, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, 'minecraft:item.bucket.empty_lava', 'blocks', soundMultiplier, 0.5)
        level.spawnParticles('clanginghowl:flamethrower_burst', true, particleX, particleY, particleZ, 0.22, particleOffset, 0.22, particleCount, 0)
    }
})