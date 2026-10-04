# Steel production design

This document describes the proposed steel line. It is a design record, not a
recipe export. Existing quest and recipe changes in the worktree are unrelated
and are left untouched.

## Design goals

- Keep the blast furnace as the ironmaking stage.
- Use pig iron as the feed to steelmaking. Do not smelt ore directly into steel.
- Make the first route available before steel tanks, steel vats, the distillation
  tower, or the industrial crucible.
- Follow the real process at the level that affects play: reduction, carbon
  removal, basic slag, air versus oxygen, and casting losses.
- Keep the existing 90 mB casting unit: one ingot or heavy plate is 90 mB.
- Avoid a material loop where steel is required to make the machine that makes
  the first steel.

## Existing starting point

The current `cwi:blast_furnace` already makes `kubejs:molten_pig_iron` and
`tfmg:molten_slag` from iron feed and limestone powder. Its recipes require the
`superheated` state. The furnace has a dedicated coke fuel inventory and a hot
air inventory in its MBD2 definition, while the JavaScript heat model supplies
the visible temperature and speed effect.

The intended bootstrap is salvage from the starter bunker: fresh and rusted
blast-furnace reinforcements provide the armor needed to reach the 1900 heat
threshold. Five kindled burners are insufficient by themselves; the practical
minimum is 11 heater points and about 33 armor points. Biodiesel is already a
pre-steel superheating fuel. This keeps the bunker and the furnace meaningful.

The existing metallurgy script already casts `kubejs:molten_steel` with a
fireproof mold. Oxygen production is currently behind steel distillation
equipment, so oxygen cannot be a prerequisite for the first steel batch.

## Recommended line

```text
iron ore / iron feed
        |
        v
blast furnace + coke fuel + limestone flux + hot blast (optional input)
        |
        +--> molten pig iron + molten slag
                         |
                         v
cast-iron converter vat + mechanical mixing + air + lime flux
                         |
                         +--> molten steel + slag + mixed converter exhaust
                         |
                         v
                 fireproof mold / basin casting
                         |
                         v
                   steel ingots / plates
```

### Stage 1: blast furnace

Keep the current ore-to-pig-iron recipes and their yields for the first
implementation. The machine's fuel slot should be filled with the coke forms it
already accepts. If hot blast is made mandatory later, use `tfmg:hot_air` in the
existing air hatch and restore a useful `tfmg:blast_stove_fuel` tag rather than
silently treating ambient air as hot blast.

Do not add a direct ore-to-steel recipe. It would bypass the pack's reduction
stage and make pig iron, limestone, coke, and the blast furnace optional.

### Stage 2: air converter

Represent the first converter with the existing pre-steel
`tfmg:cast_iron_chemical_vat` controller, forming the
`tfmg:cast_iron_vat` structure (or its firebrick-lined equivalent), fitted with
the existing `tfmg:mixing` machine. The vat is the refractory vessel; the
mixing attachment represents the lance and agitation. This is an implementation
abstraction, but the inputs and outputs remain those of an air-blown converter.
A dedicated MBD2 converter block can replace this representation later without
changing the material flow.

Proposed batch recipe:

| Input | Amount | Reason |
| --- | ---: | --- |
| `kubejs:molten_pig_iron` | 900 mB | Ten 90 mB iron units; enough carbon-rich metal for a useful batch |
| `kubejs:limestone_powder` (flux abstraction) | 1 item | Basic slag former; see the quicklime note below |
| `tfmg:air` | 1,500 mB | Air blast for carbon and impurity oxidation |
| `tfmg:liquid_silicon` | 5 mB | Small deoxidizing trim after blowing |

| Output | Amount | Reason |
| --- | ---: | --- |
| `kubejs:molten_steel` | 810 mB | 90% metal yield, or nine ingot units |
| `tfmg:molten_slag` | 180 mB | Flux plus oxidized impurities and metal loss |
| mixed converter exhaust | about 1,700 mB | Air-blowing produces a nitrogen-rich gas mixture; it is not pure CO or nitrogen |

Use a duration around 600 ticks for the initial route. This is a balancing value,
not a claimed industrial time. The recipe should be available in the cast-iron
or firebrick vat and should require the mixing attachment. It must not require
`tfmg:steel_vat`, `tfmg:steel_chemical_vat`, a steel mechanism, or the oxygen
distillation controller.

The recipe can initially output `kubejs:molten_steel` directly. If process order
needs to be visible in gameplay, split it into two recipes: converter output
`kubejs:molten_crude_steel`, followed by a short silicon-trim recipe that makes
`kubejs:molten_steel`. The split is more faithful but adds a new fluid, texture,
localisation, and tank-routing burden. The direct output is the recommended first
implementation.

### Stage 3: casting

Use the existing metallurgy casting rules. The player casts 90 mB into one
`tfmg:steel_ingot` or one `tfmg:heavy_plate`, 45 mB into a rod, and 810 mB into a
steel block. Steel uses fireproof molds because its registered melting point is
above the terracotta-mold limit. No new steel casting rule is needed.

## Flux and lining

Real converters use calcined lime rather than raw limestone. The least invasive
first implementation uses the existing `kubejs:limestone_powder` as a flux
abstraction, because it already appears in the blast-furnace line and requires
no new item or texture.

If the chemistry should be explicit, add `kubejs:quicklime_powder` and a heated
calcination recipe:

```text
1 kubejs:limestone_powder -> 1 kubejs:quicklime_powder + 250 mB kubejs:carbon_dioxide
```

Then replace the converter's limestone input with one quicklime powder. The
converter working lining should be magnesia-based (`kubejs:magnesite_powder` as
the precursor), not ordinary acid fireclay. The existing blast furnace may keep
its fireclay lining; the two vessels have different slag chemistry.

## Oxygen upgrade

After the first steel is made, the player can build the existing steel-gated
distillation equipment and separate condensed air. Add a second converter recipe
using the same vessel:

| Input | Amount | Output | Amount |
| --- | ---: | --- | ---: |
| `kubejs:molten_pig_iron` | 1,800 mB | `kubejs:molten_steel` | 1,710 mB |
| quicklime or limestone powder | 1 item | `tfmg:molten_slag` | 180 mB |
| `kubejs:oxygen` | 600 mB | mixed exhaust | about 1,000 mB |
| `tfmg:liquid_silicon` | 10 mB |  |  |

Use about 400 ticks. The 95% yield and shorter time reward oxygen without
invalidating the air route. Air remains useful for the first furnace and as a
lower-cost fallback. Do not call the exhaust pure nitrogen, pure carbon
monoxide, or pure carbon dioxide; it is a mixed off-gas abstraction.

## Balance and failure checks

- Nine steel ingots per 900 mB pig iron leaves a clear conversion loss and keeps
  slag valuable for existing asphalt/concrete lines.
- Silicon is a trim input, not a substitute for carbon removal. Do not make
  manganese mandatory: it is registered but has no reliable early production
  route in the pack.
- Do not copy the existing three-coke-dust-per-ingot industrial-iron cost into
  the converter. The blast furnace's coke is a fuel/reducing-agent cost; the
  converter consumes air or oxygen and flux instead.
- Do not require pure oxygen for the first steel batch. That would create a
  circular dependency through the steel distillation controller.
- Do not add a third fluid output to the current blast-furnace hatch without
  adding a separate exhaust trait/port. The current blast-furnace definition
  has two molten-output tanks.
- Keep the existing removed native TFMG, Ad Astra, and Create Metallurgy steel
  routes removed so the converter is the single intended steel source.

## Implementation order

1. Add the converter recipe to a new focused script using the existing TFMG vat
   recipe serializer and cast-iron/firebrick vat allowance.
2. Verify the cast-iron vat, mixing attachment, air fluid, silicon fluid, and
   molten slag output in a clean recipe dump.
3. Test one complete batch from bunker reinforcement through pig iron, steel
   casting, and a steel mechanism.
4. Only after that, add the optional quicklime item or a dedicated MBD2
   converter structure.
5. Add the oxygen recipe after the steel distillation line is playable.

The design deliberately separates verified pack behavior from proposed balance
values. The amounts above should be tuned through a real playtest rather than
presented as exact chemical mass balances.
