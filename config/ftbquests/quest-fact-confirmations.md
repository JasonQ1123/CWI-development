# Quest facts awaiting confirmation

Audit date: 4 October 2026. All 504 quest descriptions in all 15 chapters were read. Claims were compared with KubeJS, configuration, structure contents, installed mod implementations, and the configured resource packs. This document is for maintaining the pack; its author notes contain story spoilers.

The questions below concern specific statements that local evidence does not settle. Established real-world facts are retained where suitable, with their scope made clear. File/parser checks do not establish that every interaction and generation result behaves correctly in a running world.

## Author confirmations received

- Zinc in this pack is green and gray, matching Create and the configured texture. The quest has been corrected.
- The staff-log incidents are acceptable fiction. Logs can span several pages and cover people's work and thoughts before, during, and after the Stargate incident. Small details should support foreshadowing and speculation; they should convey the story indirectly.
- The player was a developer of the Stargate and was assigned to repair it, travel back in time, and save everyone. The memory of standing at the gate is part of the backstory. The player, or players in multiplayer, were the only survivors. Saving everyone is the mission's aim; its eventual outcome has not been supplied.
- Wet biological sediment occurs in lakes and oceans. Dry sediment occurs on rocky surfaces and can be buried beneath depleted dirt. Both quest descriptions have been corrected from this author confirmation.

## Open questions

1. **Azurite and sphalerite appearance.** Azurite is described as deep blue, although its pack texture is mottled pale blue. Sphalerite is described as pale yellow to nearly black, although its texture is gray/white. These describe natural specimens but can be mistaken for visual identification of pack blocks. **Should the entries give pack colors plus explicitly labeled natural colors, or only pack colors?**
   - [Azurite](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/geology.snbt:398), quest `5F134945AFC3583E`.
   - [Sphalerite](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/geology.snbt:510), quest `207759E6F9A95646`.
   - Evidence: the relevant Create/KubeJS texture assets and the required packs in [resourcepackoverrides.json](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/resourcepackoverrides.json:22).

2. **Resolved: wet/dry sediment locations.** The user confirmed lake/ocean locations for wet sediment, and rocky surfaces for dry sediment, possibly beneath depleted dirt. The previous cave advice has been replaced. Typical Caves registration is not used as evidence of underground deposits.
   - [Wet sediment](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/environmental_note.snbt:472), quest `4F09B6C7A598452C`; [dry sediment](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/environmental_note.snbt:688), quest `0D14A252C4D9955C`.
   - Evidence: [Typical Caves registration](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/kubejs/data/cwi/worldgen/biome/typical_caves.json:43), [wet placement](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/kubejs/data/cwi/worldgen/placed_feature/structures/wet_biological_sediment.json:13), and [dry placement](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/kubejs/data/cwi/worldgen/placed_feature/structures/dry_biological_sediment.json:17).

3. **First active Carbofusor culture.** Dry recovery and active propagation exist, but no initial dry-to-active route was found. The quests currently call the revival protocol unconfirmed. A missing recipe is not automatically a mystery known to the former scientists. **What is the intended first revival method, and should the quest describe it or leave it unresolved for now?**
   - [Dried culture](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/environmental_note.snbt:1179), quest `227D6E30C7143BCB`; [active culture](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/environmental_note.snbt:1198), quest `52452BBA9F49586A`.

4. **First active Putrelys culture.** The same gap exists: dry recovery and active propagation are present, but the first activation route was not found. **What is the intended revival method, and should this manual explicitly leave it unresolved?**
   - [Dried culture](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/environmental_note.snbt:1337), quest `0B04CA26E87AB968`; [active culture](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/environmental_note.snbt:1355), quest `01D81AC34759CA01`.
   - Evidence for both culture questions: the sediment recovery, fermentation, and incubator recipes require an active starter for propagation; no initial revival recipe or alternative starter source was found in the pack files.

5. **Gasoline engine use.** The quest claims engine use. Burning and napalm use are confirmed, but the pack clears the gasoline tag used by the installed engine fuel definitions. **Is gasoline intended to power engines in the current pack, or should this description cover burner and napalm uses for now?**
   - [Gasoline](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/petroleum.snbt:397), quest `6B3B0E0C4983791F`.
   - Evidence: [tag removal](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/kubejs/server_scripts/Tags/tags.js:61), [explicit burner recipe](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/kubejs/server_scripts/Recipes/BasicRecipe.js:348), and installed Create Diesel Generators/TFMG fuel definitions. No fuel-tag changes were made.

6. **Lapis enchanting use.** The quest lists enchanting, but the enchanting-table recipe is removed and the item hidden from JEI. No replacement recipe or table in the pack's structures was found. **Is conventional lapis enchanting unavailable, or is there an intended access route?**
   - [Lapis](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/geology.snbt:125), quest `7D513F2990AAD38B`.
   - Evidence: [recipe removal](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/kubejs/server_scripts/Recipes/RecipeDelete.js:533), client JEI hiding, and structure contents.

7. **Emerald trading use.** The quest presents emeralds as trading currency. Wandering traders are disabled, and no villager source was verified in the custom starting biomes or structures. Vanilla trading still exists as a mechanic; its availability in this progression is unsettled. **Is trading an available use now, a later use in another world, or something to omit from this entry? If available, how does the player reach villagers?**
   - [Emerald](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/geology.snbt:1206), quest `3209C4128550BBD3`.
   - Evidence: [starter gamerules](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/kubejs/server_scripts/Starter.js:8), custom biome spawns, and structure contents. A separate `minecraft:new_world` dimension has normal biomes, but no intended progression connection was established.

8. **Running laboratory equipment.** The opening says some equipment still runs. The template includes machinery and saved block-entity data, and the arrival script plays sounds, but those do not prove that machinery remains operational after placement. **Does equipment actually remain running when the player wakes, or should the opening describe only the sounds and surviving machinery?**
   - [Opening](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/desolated_awakening.snbt:89), quest `48FAA6DBC81EED3F`.
   - Evidence: starter templates and [arrival sequence](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/kubejs/server_scripts/Starter.js:49). This needs author/world observation.

9. **Damaged reference-book bindings.** The discovery description says identification marks and properties survived better than the bindings. This condition was an authored detail, rather than an established item state. **Are those books meant to have damaged bindings, or should the entry simply identify their subjects?**
   - [Reference books](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/desolated_awakening.snbt:543), quest `01145B3810F3CA52`.

10. **Lost Logs visibility.** The chapter has `always_invisible: true`. Installed FTB Quests keeps such a chapter absent from the chapter list even when quests complete, and excludes its quests from normal search. **Should it stay hidden during development, or should recovering logs reveal a readable chapter?**
    - [Lost Logs flag](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/memories.snbt:2). The flag has been preserved; the question concerns intended access, rather than a prose correction.

11. **Meaning of stage advancement.** The preface says completing quests is required to advance stages. Quest dependencies are implemented, but no recipe check against quest completion was found. **Does this mean unlocking quest chapters, or should gameplay/crafting also require quest completion?**
    - [Quest-system explanation](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/chapters/preface.snbt:163), quest `7A44091B6E68D50D`; [linear quest progression setting](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quests/data.snbt:21).

12. **Facts behind future Stargate foreshadowing.** The player's role, mission, and status as the sole survivor (or sole surviving group in multiplayer) are confirmed. The event's cause, the mission's timing, participants' knowledge, and the eventual mission outcome remain unspecified. **What went wrong, when was the player assigned the mission, who knew the plan, and what facts should remain genuinely ambiguous?** These are private writing constraints; they will guide indirect details in the logs rather than direct exposition in the quests. No successful rescue ending has been assumed.

## Corrections established without questions

- **Zinc:** green/gray pack appearance; real galvanic protection is explicitly real industry.
- **Industrial Crucible:** heat range, not minimum/maximum batch size. The recipe schema uses `minHeatRequirement` and `maxHeatRequirement`.
- **Gauge Attachment:** a visible heat indicator and a goggles thermal readout. Contents are separate crucible information available without the gauge.
- **Diamond Properties:** the verified local use is the construction-wand Angel Core; ordinary diamond gear recipes are removed.
- **Netherite:** dropped vanilla tools and armor resist fire/lava. The statement no longer covers every custom netherite item; hammer behavior is deferred.
- **Sugar:** a food ingredient, rather than a directly edible item.
- **Copper, magnesium, and polyethylene:** patina, powder combustion, and manufacturing/heat behavior are explicitly framed as real-world context. Lead toxicity is also implemented through the pack's Neurotoxin tags and inventory effect; it is not an invented mechanic.

All other audited descriptions had support in the local definitions, installed behavior, established short real-world explanations, or the user's narrative requirements. That is evidence for the current text, not a promise of exhaustive runtime validation. Parser, protected-text, and structural verification are recorded in [the writing review](/Users/ivan/Documents/curseforge/minecraft/Instances/CWI/config/ftbquests/quest-writing-review.md).
