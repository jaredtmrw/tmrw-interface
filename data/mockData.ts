export const APP_CONFIG = {
  name: "TMRW",
  default_location: {
    address: "1071 Dominion Rd, Ojai, CA 93023",
    neighborhood_name: "Meiners Oaks",
    city_region_label: "Ojai, CA",
  },
};

export const GLOBAL_SHELL = {
  top_bar: {
    left: {
      logo_text: "TMRW",
      logo_subtext: "Fire readiness",
    },
    center: {
      search_box: {
        placeholder: "Search: 1071 Dominion Rd, Ojai",
        value_shown: "1071 Dominion Rd, Ojai, CA 93023",
        leading_icon: "search",
        trailing_icon: "crosshair",
      },
    },
    right: {
      quick_controls: [
        { type: "pill", label: "Area", icon: "neighbors", state: "selected", id: "area_overview_watershed" },
        { type: "pill", label: "Neighborhood", icon: "cluster", state: "default", id: "neighborhood_plan_dominion" },
        { type: "pill", label: "Home", icon: "house", state: "default", id: "parcel_detail_home" },
      ],
      profile_icon: "circle_user",
    },
  },
  bottom_bar: {
    left: {
      mode_hint: {
        text: "",
      },
    },
    center: {
      quick_filters: [],
    },
    right: {
      chat_entry: {
        input_value_shown: "Ask about 1071 Dominion Rd",
        send_button_icon: "arrow_up_right",
      },
    },
  },
};

export const PAGES = [
  {
    id: "area_overview_watershed",
    title: "Area",
    layout: "map + right panel",
    map_state: {
      camera: {
        center_label: "Ojai + Meiners Oaks",
        zoom_level: "city",
        center_lat: 34.4480,
        center_lng: -119.2429,
        zoom: 13
      },
      overlays: [
        { name: "Watershed outline", style: { stroke: "rgba(93,169,255,0.45)", stroke_width_px: 2, fill: "rgba(93,169,255,0.06)" } },
        { name: "Neighborhood blocks", style: { stroke: "rgba(243,245,247,0.10)", stroke_width_px: 1, fill: "transparent" } },
      ],
      parcel_coloring_legend: {
        title: "Flood & Fire vulnerability",
        scale: [
          { label: "Lower", color: "rgba(62,224,137,0.22)" },
          { label: "Medium", color: "rgba(255,176,32,0.22)" },
          { label: "Higher", color: "rgba(255,92,92,0.22)" },
        ],
      },
    },
    right_panel: {
      header: {
        title: "Watershed Security (Updated)",
        subtitle: "Meiners Oaks Basin",
        neighborhood_ranking: "Meiners Oaks is currently the 2nd most vulnerable sub-basin in the Ojai Valley for concurrent flood and fire events.",
        status_chips: [
          { label: "Landscape Moisture: 34%", tone: "warning", icon: "water" },
          { label: "Multi-Hazard View", tone: "primary", icon: "layers" }
        ],
      },
      sections: [
        {
          type: "collective_progress",
          title: "Connecting the Watershed",
          description: "1071 Dominion is 1 of 17 critical properties needed to complete the continuous 2-mile 'Wet Break'. 12 neighbors have already signed the restoration pact. Your property is a vital link; without it, the whole basin remains ineligible for Federal Flood Resilience funding.",
          current: 12,
          target: 17,
          label: "12 links secured / 17 needed for basin-wide funding",
          cta: "Sign the Watershed Pact"
        },
        {
          type: "actionable_risks",
          title: "Regional Defense Projects",
          subtitle: "Strategic, investable projects that address root-cause vulnerabilities across the area.",
          cards: [
            {
              title: "Flood: The River Channel 'V-Ditch' Fix",
              icon: "water",
              risk_reduction: 18,
              tags: [
                { label: "Hydraulic Hazard", tone: "danger" },
              ],
              body: "The Ventura River has become a narrow 'V' channel that accelerates water into a fire-hose aimed at the valley. Restoring the floodplain at the Dominion intersection creates a 'leaky dam' system.",
              specifics: [
                "Widens river channel by 40% at critical bottleneck.",
                "Raises local water table by 3ft via beaver-mimicry dams.",
              ],
              ctas: [
                { label: "Vote for Measure B", sub: "Secure $2M bond", icon: "arrow_up_right" },
                { label: "Lobby City Council", sub: "Send support email", icon: "message_square" },
                { label: "Join Beaver Corps", sub: "Volunteer for build day", icon: "users" },
                { label: "Basin Rebates", sub: "Wetland credits", icon: "accent-success" }
              ]
            },
            {
              title: "Heat: The Hwy 33 'Heat Plume' Break",
              icon: "heat",
              risk_reduction: 9,
              tags: [
                { label: "Thermal Battery", tone: "warning" },
              ],
              body: "The asphalt of Hwy 33 reaches 120°F, creating a 'heat plume' that dries adjacent neighborhood vegetation 3x faster. 40 coast live oaks along the perimeter will break this plume.",
              specifics: [
                "Reduces block-level ambient temp by ~9°F.",
                "Shades out invasive 'flashy' grass along the corridor.",
              ],
              ctas: [
                { label: "Email Caltrans", sub: "Demand corridor shade", icon: "message_square" },
                { label: "Adopt a Tree", sub: "Stewardship program", icon: "plants" },
                { label: "Forest Grants", sub: "Tree planting funds", icon: "accent-success" },
                { label: "Attend Meeting", sub: "Planning commission", icon: "users" }
              ]
            },
            {
              title: "Biodiversity: The Topatopa-to-River Corridor",
              icon: "plants",
              risk_reduction: 12,
              tags: [
                { label: "Brittle Landscape", tone: "warning" },
              ],
              body: "Disconnected wildlands make flora brittle and prone to sudden curing. Connecting the Wilderness to the River via native Rice Rd hedgerows restores soil health and moisture retention.",
              specifics: [
                "Restores native soil microbes that hold water.",
                "Creates a migration path for fire-resistant local species.",
              ],
              ctas: [
                { label: "Sign Agreement", sub: "Land-owner pact", icon: "arrow_up_right" },
                { label: "Volunteer Seed", sub: "Native collection day", icon: "users" },
                { label: "Native Seed Order", sub: "Rice Rd bulk buy", icon: "plants" },
                { label: "Attend Meeting", sub: "Watershed board", icon: "message_square" }
              ]
            },
          ],
        },
        {
          type: "status_leaderboard",
          title: "Watershed Protectors",
          subtitle: "Gold-standard areas for drought and fire resilience.",
          items: [
            { title: "East Block Rice Rd", icon: "shield", body: "80% Native Canopy Coverage" },
            { title: "Dominion Basin", icon: "shield", body: "Level 1 Beaver-Mimicry Status" },
          ]
        }
      ],
    },
  },
  {
    id: "parcel_detail_home",
    title: "Home",
    layout: "map + right panel (selected parcel)",
    map_state: {
      camera: {
        center_label: "1071 Dominion Rd, Ojai, CA 93023",
        zoom_level: "parcel",
        center_lat: 34.4505,
        center_lng: -119.2865,
        zoom: 18
      },
      selected_parcel: {
        label: "1071 Dominion Rd",
        fill: "selected_fill",
        outline: "selected_outline",
      },
      nearby_context: {
        show_neighbor_parcels: true,
        show_roads: true,
        show_rooftops: true,
      },
      parcel_boundaries: [
        // Subject Parcel (1071 Dominion)
        { 
          id: "subject", 
          coords: [
            [34.4506, -119.2867],
            [34.4506, -119.2863],
            [34.4504, -119.2863],
            [34.4504, -119.2867]
          ],
          type: "subject"
        },
        // Neighbor East
        { 
          id: "neighbor_east", 
          coords: [
            [34.4506, -119.2863],
            [34.4506, -119.2859],
            [34.4504, -119.2859],
            [34.4504, -119.2863]
          ],
          type: "neighbor"
        },
        // Neighbor West
        { 
          id: "neighbor_west", 
          coords: [
            [34.4506, -119.2871],
            [34.4506, -119.2867],
            [34.4504, -119.2867],
            [34.4504, -119.2871]
          ],
          type: "neighbor"
        },
        // Neighbor North (Across Street)
        { 
          id: "neighbor_north", 
          coords: [
            [34.4508, -119.2867],
            [34.4508, -119.2863],
            [34.4507, -119.2863],
            [34.4507, -119.2867]
          ],
          type: "neighbor"
        }
      ],
      callouts_on_map: [
        { label: "Bamboo Stand", icon: "fire", pin_color: "#FF5C5C", lat: 34.4505, lng: -119.28635 }, // Property line East
        { label: "Wood Fence (Fuse)", icon: "warning", pin_color: "#FF5C5C", lat: 34.4505, lng: -119.28665 }, // West side
        { label: "30ft Fig Canopy", icon: "plants", pin_color: "#FFB020", lat: 34.45045, lng: -119.2865 }, // Backyard
      ],
    },
    right_panel: {
      header: {
        title: "1071 Dominion Rd",
        subtitle: "Meiners Oaks, Ojai",
        neighborhood_ranking: "Of the 10 houses on your block, yours is the 3rd most likely to catch fire fast.",
        status_chips: [
          { label: "East: Explosive Fuels", tone: "danger", icon: "plants" },
          { label: "West: Fence Fuse", tone: "warning", icon: "warning" },
          { label: "Rear: Canopy Risk", tone: "primary", icon: "plants" },
        ],
      },
      sections: [
        {
          type: "hero_metric",
          style: "minimal",
          title: "Critical Weak Points",
          rows: [
            { left_label: "East Ignition Source", right_value: "Dense Bamboo (Neighbor)" },
            { left_label: "West Fuse Path", right_value: "Fence (2' from wall)" },
            { left_label: "Rear Canopy", right_value: "30' Fig Tree" },
          ],
        },
        {
          type: "actionable_risks",
          title: "Hyper-Specific Risks",
          subtitle: "Every risk below is actionable. Addressing them breaks the path fire takes into your home.",
          cards: [
            {
              title: "The Bamboo Problem (East Side)",
              icon: "plants",
              risk_reduction: 22,
              rebates_count: 2,
              tags: [
                { label: "Extreme Hazard", tone: "danger" },
              ],
              body: "The neighbor's dense bamboo stand (8ft away) acts as a vertical torch. High silica stems explode when heated, throwing shrapnel and sparks directly into your eaves.",
              specifics: [
                "Air inside stems expands and explodes.",
                "Creates a deep, dry litter layer that ignites easily.",
              ],
            },
            {
              title: "Structural Wick (West Fence)",
              icon: "warning",
              risk_reduction: 18,
              rebates_count: 1,
              tags: [
                { label: "Direct Fuse", tone: "danger" },
              ],
              body: "The wood fence on the west side connects to the house with only a 2-foot gap. If the fence ignites, it wicks fire directly to your roof trim.",
              specifics: [
                "2-foot gap is insufficient to stop radiant heat transfer.",
                "Connects ground fuels directly to structural eaves.",
              ],
            },
            {
              title: "Massive Fig Tree (Rear)",
              icon: "plants",
              risk_reduction: 9,
              rebates_count: 0,
              tags: [
                { label: "Ladder Fuel", tone: "warning" },
              ],
              body: "The 30ft fig tree is moisture-dense but currently unpruned. Dead wood and leaf litter accumulation in the crotches create a ladder for fire to climb into the canopy.",
              specifics: [
                "Massive canopy can trap heat beneath it.",
                "Unpruned limbs overhang the rear roof line.",
              ],
            },
            {
              title: "Hoarder Complex (East Neighbor)",
              icon: "neighbors",
              risk_reduction: 12,
              rebates_count: 3,
              tags: [
                { label: "Fuel Load", tone: "danger" },
              ],
              body: "The neighbor to the east has significant outdoor storage of mixed materials. This creates a high-intensity fire pocket that will bake your east wall longer than a simple grass fire.",
              specifics: [
                "Complex fuel loads burn hotter and longer.",
                "Increases likelihood of window failure from radiant heat.",
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: "neighborhood_plan_dominion",
    title: "Neighborhood",
    layout: "map + right panel",
    map_state: {
      camera: {
        center_label: "Dominion Rd (Meiners Oaks)",
        zoom_level: "street",
        center_lat: 34.4505,
        center_lng: -119.2865,
        zoom: 17
      },
      overlays: [
        {
          name: "Backyard Heat Island",
          style: { fill: "rgba(255, 92, 92, 0.22)", stroke: "rgba(255, 92, 92, 0.65)", stroke_width_px: 2 },
          label: "7-Home Heat Corridor",
        },
      ],
      pins: [
        { label: "Proposed Swale", icon: "water", pin_color: "#5DA9FF", lat: 34.4375, lng: -119.26 },
      ],
    },
    right_panel: {
      header: {
        title: "Dominion Rd — Block Resilience",
        subtitle: "4 of the 7 houses in our 'Backyard Heat Island' have already completed their hydration swales. Dominion Rd is leading Meiners Oaks in collective readiness.",
        status_chips: [
          { label: "Collective Target: 60%", tone: "primary", icon: "cluster" },
          { label: "Certified Protectors: 2", tone: "success", icon: "shield" }
        ],
      },
      sections: [
        {
          type: "collective_progress",
          title: "Breaking the Santa Ana Channel",
          description: "We are 2 neighbors away from a 15% reduction in block-level wind speed. Adding two more Western Redbuds in the 1080-block backyards breaks the laminar flow corridor that dries our yards.",
          current: 4,
          target: 6,
          label: "4 properties breaking wind / 6 needed for tipping point",
          cta: "Invite 1080 & 1085 backyards"
        },
        {
          type: "actionable_risks",
          title: "Shared Vulnerabilities",
          subtitle: "Risks that require neighbors to act together. One unmanaged property is a risk to all.",
          cards: [
            {
              title: "The Shared Fence 'Fuse'",
              icon: "warning",
              risk_reduction: 35,
              rebates_count: 1,
              tags: [
                { label: "Weakest Link", tone: "danger" },
              ],
              body: "The continuous wood fence running from 1071 to 1095 Dominion is a 200ft direct path for fire. 3 properties still have wood sections connecting directly to their eaves.",
              specifics: [
                "If one property's section catches, the whole run burns.",
                "Needs non-combustible 'breaks' at every property line.",
              ],
            },
            {
              title: "Block-Wide Western Redbud Order",
              icon: "plants",
              risk_reduction: 15,
              rebates_count: 1,
              tags: [
                { label: "Urgent Group Buy", tone: "warning" },
              ],
              body: "6 of 10 neighbors committed. If we hit 10 orders by Friday, the nursery discount for native shade trees increases from 10% to 25% for everyone.",
              specifics: [
                "Native, fire-resistant shade lowers surface temps by 12°F.",
                "Bulk delivery scheduled for Jan 15th.",
              ],
            },
          ],
        },
        {
          type: "status_leaderboard",
          title: "Certified Block Protectors",
          subtitle: "Properties that have verified their 'Zero-Ember Gap' for shared fence lines and completed hydration swales.",
          items: [
            { title: "1071 Dominion Rd", icon: "shield", body: "Certified Protector - Jan 2026" },
            { title: "1085 Dominion Rd", icon: "shield", body: "Certified Protector - Dec 2025" },
          ]
        }
      ],
    },
  },
];
