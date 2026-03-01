|     Original Code      |     Replacment          |
|------------------------|-------------------------|
|  DisabledTransition    |  FilterEffect           |
|  disabledTransition    |  filterEffect           |
|  Disabled Transition   |  Filter Effect          |
|  Disabled-Transition   |  Filter-Effect          |
|  Disabled-transition   |  Filter-effect          |
|  disabled-transition   |  filter-effect          |
|                        |                         |
|  disabled-state        |  active-state           |
|  disabledFilter        |  activeFilter           |
|  disabledCursor        |  activeCursor           |
|  disabledOpacity       |  activeOpacity          |
|  disabledSaturate      |  activeSaturate         |
|  disabledStateVars     |  activeStateVars        |
|  disabledState         |  activeState            |
|  DisabledState         |  ActiveState            |
|                        |                         |
|  disableFactorCond     |  activeFactorCond       |
|  disableFactor         |  activeFactor           |
|  isDisabled            |  isActive               |
|  animationDisabling    |  animationActivating    |
|  animationEnabling     |  animationDeactivating  |
|  box-disabling         |  box-activating         |
|  box-enabling          |  box-deactivating       |
|  transition-disabling  |  effect-activating      |
|  transition-enabling   |  effect-deactivating    |



|  Original Phrase                             |  Replacement (Active)                   |  Notes                                                                      |
|----------------------------------------------|-----------------------------------------|-----------------------------------------------------------------------------|
|  is disabled                                 |  is active                              |  **describing a condition** → -ed form `active`.                            |
|  when disabled                               |  when active                            |  **describing a condition** → -ed form `active`.                            |
|  toward disabled                             |  toward active                          |  **describing a condition** → -ed form `active`.                            |
|  fully disabled                              |  fully active                           |  **describing a condition** → -ed form `active`.                            |
|  fully enabled                               |  fully inactive                         |  **describing a condition** → -ed form `inactive`.                          |
|  during disabled state                       |  during active state                    |  **describing a condition** → -ed form `active`.                            |
|  from enabled → disabled                     |  from inactive → active                 |  **describing a condition change** → -ed form `inactive` → `active`.        |
|  as they move into the disabled state        |  as they move into the active state     |  **describing a condition description** → -ed form `active`.                |
|  not typical for disabled                    |  not typical for active                 |  **describing a condition description** → -ed form `active`.                |
|  between neutral and disabled(?!\s+states?)  |  between neutral and active             |  **describing a condition** → -ed form `active`.                            |
|  becomes disabled(?!\s+states?)              |  becomes active                         |  **describing a condition** → -ed form `active`.                            |
|                                              |                                         |                                                                             |
|  `disabled` state                            |  `active` state                         |  **refers to code** → depens on the corresponding replacement code ⚠️.      |
|                                              |                                         |                                                                             |
|  between enabled and disabled states         |  between inactive and active states     |  **describing identifier of "states"** → base forms `active` / `inactive`.  |
|  with Disabled State                         |  with State Logic                      |  **describing identifier of "state"** → base forms `active`.                |
|  for disabled state styling                  |  for active state styling               |  **describing identifier of "state"** → base forms `active`.                |
|  for disabled states in your UI              |  for active states in your UI           |  **describing identifier of "state"** → base forms `active`.                |
|  from disabled state                         |  from active state                      |  **describing identifier of "state"** → base forms `active`.                |
|  based on disabled state                     |  based on active state                  |  **describing identifier of which "state"** → base form `active`.           |
|  disabled state rules                        |  active state rules                     |  **describing identifier of which "state"** → base form `active`.           |
|  disabled state tracking                     |  active state tracking                  |  **describing identifier of which "state"** → base form `active`.           |
|  Lifecycle-aware enabled/disabled state      |  Lifecycle-aware active/inactive state  |  **describing identifier of "state"** → base forms `active` / `inactive`.   |
|  customizing disabled transitions            |  customizing filter effects             |  **describing identifier of "state"** → base forms `active`.                |
|  disabled filter                             |  active filter                          |  **describing identifier of "filter"** → base form `active`.                |
|  disabled cursor                             |  active cursor                          |  **describing identifier of "cursor"** → base form `active`.                |
|  of enabled state                            |  of inactive state                      |  **describing identifier of which "state"** → base form `inactive`.         |



active transitions => active effects
The transitions => The effects
these transitions => these effects



Visual styling => Visual effect
state transitions => state effects
// Transitions: => // Effects:
visual transition => visual effect
transition rules => effect rules
and \w+-effect CSS variables => and CSS variables
drives the => drives a
##### 1. **Filter Formula** => simplified
##### 2. **Text Decoration Switching** => simplified
##### ✨ Key Idea => simplified
"special meaning" => **special meaning**
no gradual interpolation => no gradual transition
during active state => during active state
visually respond when active => visually respond when the active state changes
that indicate component interactivity => that signal interactivity
customizing active-state => customizing active
effects that highlight the component => effects that highlight components
smoothly \w+ => smoothly animate
with length unit => with a length unit
during active state => during active transitions
to make them => by making components
visually muted** when \w+ => visually muted**
from static content** when \w+ => from static content**
making components => making them
is responsible for tracking whether a component is => tracks whether a component is
 accordingly => <delete>
default styling effects => default visual effects


(?<!when the component is |smoothly during the |0 → 0\.5 \(|how far the |for CSS color |Smoothly |Smooth |no gradual |halfway through |fade-in and fade-out )transition(?!ing toward|al effects| progress)
