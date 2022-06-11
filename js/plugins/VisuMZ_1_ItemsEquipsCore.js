//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.34;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.34] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x2455b1=_0x5132;(function(_0x528344,_0x5dc81b){const _0x1b2643=_0x5132,_0x299b44=_0x528344();while(!![]){try{const _0xbf6f82=parseInt(_0x1b2643(0x4cb))/0x1+parseInt(_0x1b2643(0x21e))/0x2+parseInt(_0x1b2643(0x2d9))/0x3*(parseInt(_0x1b2643(0x5c6))/0x4)+-parseInt(_0x1b2643(0x32d))/0x5*(-parseInt(_0x1b2643(0x3fa))/0x6)+-parseInt(_0x1b2643(0x2dd))/0x7+parseInt(_0x1b2643(0x2b2))/0x8*(parseInt(_0x1b2643(0x2f3))/0x9)+-parseInt(_0x1b2643(0x242))/0xa*(parseInt(_0x1b2643(0x23a))/0xb);if(_0xbf6f82===_0x5dc81b)break;else _0x299b44['push'](_0x299b44['shift']());}catch(_0xaf2dfc){_0x299b44['push'](_0x299b44['shift']());}}}(_0x49bc,0xb165e));var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2455b1(0x3d3)](function(_0x45a02e){const _0x2a3c57=_0x2455b1;return _0x45a02e[_0x2a3c57(0x29e)]&&_0x45a02e['description'][_0x2a3c57(0x474)]('['+label+']');})[0x0];function _0x49bc(){const _0x4cc26d=['ActorResetEquipSlots','drawItemEffectsHpDamage','MmhMc','SpeedNeg2000','ShopScene','commandWindowRectItemsEquipsCore','_categoryNameWindow','ZHqBy','mainAreaHeight','newLabelEnabled','qHGpe','dbIEy','isRightInputMode','isCommandEnabled','isUseParamNamesWithIcons','_tempActorB','onCategoryCancel','LabelSelfGainTP','drawItemNumber','makeCommandList','xalPH','maxBattleMembers','defaultItemMax','ELEMENT','_newLabelSprites','object','mstEL','updateCategoryNameWindow','jJEjg','statusWindowRect','_customItemInfo','jAmGH','ZzNHG','eMrYR','bSboc','left','addSellCommand','TP\x20RECOVERY','visible','_item','Scene_Shop_goldWindowRect','Window_ShopSell_isEnabled','hjZvM','CmdIconCancel','paramchangeTextColor','_data','SwitchSell','postCreateCategoryWindowItemsEquipsCore','numberWindowRectItemsEquipsCore','toUpperCase','hitIndex','price','jKufS','Window_Selectable_refresh','center','isClearCommandAdded','CmdIconBuy','contents','_actor','wtywY','Fldyu','isEquipCommandAdded','speed','fontSizeRatio','tgyID','Scene_Shop_numberWindowRect','_calculatingJSParameters','create','790948qQFQkg','XFNNA','min','IncludeShopItem','sell','mUnPf','_tempActor','PPuUm','Scene_Shop_doSell','onTouchSelectModern','playOkSound','limitedPageUpDownSceneCheck','constructor','drawItemEffectsMpDamage','onSlotCancel','isSellCommandEnabled','rateHP','DrawBackRect','kdtMt','ScopeRandomAny','ParseWeaponNotetags','checkShiftRemoveShortcut','BattleUsable','forceChangeEquip','XuqbE','placeItemNewLabel','eKBSH','LabelRemove','Nonconsumable','Step2Start','GfQpa','commandStyleCheck','addItemCategory','CmdIconSell','optKeyItemsNumber','_bypassNewLabel','indexOf','_slotId','setHelpWindowItem','DmgXy','setItemWindow','meetsItemConditionsJS','DrCHN','wiaVS','getItemEffectsSelfTpGainText','ysRBR','WmuBn','getItemDamageAmountLabel','commandSell','nonOptimizeEtypes','getItemEffectsTpDamageLabel','helpAreaTop','playBuzzerSound','width','smallParamFontSize','Window_ShopBuy_refresh','index','categoryWindowRectItemsEquipsCore','nTdJf','bestEquipItem','BorderRegExp','ParseItemNotetags','Window_Selectable_update','yQpmO','uAnnR','Scene_Equip_onSlotCancel','CommandAddOptimize','drawUpdatedAfterParamValue','EFFECT_ADD_DEBUFF','\x5cI[%1]','BqazG','bitmap','ShopMenuStatusStandard','onBuyCancel','jSSeh','Icon','_resetFontColor','isShowNew','CONSUMABLE','Scene_Shop_buyWindowRect','commandBuyItemsEquipsCore','drawIcon','equipAdjustHpMp','scrollTo','drawParamName','OlHzW','postCreateSlotWindowItemsEquipsCore','cursorPagedown','LabelSuccessRate','equipSlots','powerDownColor','FadeSpeed','processCursorHomeEndTrigger','drawItemEffectsAddedStatesBuffs','removeState','buttonAssistKey2','systemColor','QCdYq','Game_BattlerBase_meetsItemConditions','Scene_Shop_onCategoryCancel','iconText','SvrqG','LabelRepeats','EbFvD','gZcsg','A%1','CmdCancelRename','TextAlign','atypeId','KXRYN','equipSlotIndex','drawItemActorMenuImage','tBzjM','floor','mhp','mpRate','clearNewItem','flatMP','Window_ShopCommand_initialize','sPhTU','Scene_Shop_activateSellWindow','UPWCe','EFFECT_REMOVE_DEBUFF','textWidth','drawItemRepeats','CmdStyle','determineBaseSellingPrice','HYUOs','addClearCommand','weaponTypes','_buttonAssistWindow','remove','getItemOccasionText','changeTextColor','createNewLabelSprite','MBvVA','_tempActorA','_newLabelOpacityUpperLimit','activateSellWindow','vfHTy','uxPPH','cydAJ','hTWTX','LabelDamageHP','yZKTI','TwKKG','Window_EquipStatus_refresh','itemEnableJS','ymrDy','registerCommand','nonRemovableEtypes','etypeId','allowCommandWindowCursorUp','drawItemEquipType','processHandling','cPfcY','VPEHQ','LIdge','Window_Selectable_setHelpWindowItem','cursorDown','Game_Actor_changeEquip','createBitmap','ShiftShortcutKey','CgyIg','getItemEffectsTpDamageText','SWsiW','isSoleWeaponType','commandWindowRect','CoreEngine','Game_Party_gainItem','keyItem','clearNewLabelFromItem','flatHP','NxMng','commandName','aZglY','EFFECT_REMOVE_BUFF','Scene_Shop_onBuyCancel','selfTP','drawItemCost','buttonAssistText3','Step1End','lrcSw','#%1','isEquipItem','elements','?????','Param','exit','Speed0','ItemMenuStatusBgType','ignva','Scene_Shop_prepare','LnZDy','ATK','isEquipCommandEnabled','log','LwUVK','toLowerCase','RegExp','tnECc','EFFECT_RECOVER_MP','ElementWeapon','onSlotOkAutoSelect','reloadMapIfUpdated','Mstgc','tpGain','getItemEffectsMpRecoveryLabel','onSellCancel','pAVoT','MDF','addLoadListener','hide','ParseArmorNotetags','slotWindowRect','postCreateItemWindowModernControls','refreshItemsEquipsCoreNoMenuImage','qdFfg','mVAoK','Parse_Notetags_ParamValues','MaxIcons','getItemQuantityText','ItemScene','shouldCommandWindowExist','Consumable','push','dZsQp','Parse_Notetags_Batch','oYqPq','drawing','allowCreateStatusWindow','drawCustomShopGraphic','nWgnq','ItemsEquipsCore','459794GFRwFj','getItemEffectsMpDamageLabel','zSdRL','onTouchSelect','iEhye','characterName','AlreadyEquipMarker','version','EMDiu','EFFECT_ADD_BUFF','WayQu','FGxRW','acLls','KBZCz','nEfit','length','Game_BattlerBase_param','sWSFt','Parse_Notetags_EquipSlots','process_VisuMZ_ItemsEquipsCore_Notetags','ImxLv','DrawPortraitJS','isOpenAndActive','buffIconIndex','Scene_Equip_slotWindowRect','_newLabelOpacity','JcHZk','isUseItemsEquipsCoreUpdatedLayout','1507385LSaWAC','isOptimizeEquipOk','ParamChangeFontSize','Scene_Load_reloadMapIfUpdated','drawItemEffectsTpRecovery','Step3Start','DrawItemData','_doubleTouch','70nIUwVn','tWHmN','clear','LabelSpeed','processCursorSpecialCheckModernControls','drawParamText','numItems','lineHeight','getItemEffects','height','FZNHJ','categoryWindowRect','checkItemConditionsSwitchNotetags','updateChangedSlots','VisuMZ_0_CoreEngine','Scene_Shop_sellingPrice','getItemEffectsAddedStatesBuffsLabel','FadeLimit','SXECW','QoL','resetFontSettings','Scene_Shop_onSellCancel','getTextColor','LabelRecoverTP','drawItemEffectsMpRecovery','HJYPU','pdkDi','Categories','ytgsY','iconHeight','equips','LabelRecoverHP','ParamValueFontSize','getItemHitTypeLabel','changeBuff','right','innerWidth','mainAreaTop','damage','DaLqM','maxItemAmount','drawActorParamDifference','getItemRepeatsLabel','beBcd','drawItemSpeed','Step2End','smoothScrollTo','UYEqQ','fontFace','sellWindowRectItemsEquipsCore','ScopeRandomEnemies','ExtDisplayedParams','drawPossession','Speed1','split','blt','call','battleMembers','drawItemEffectsSelfTpGain','item','Scene_Shop_createSellWindow','oCHSe','BuyPriceJS','lUxfg','jWKwd','DrawFaceJS','loadSystem','setHp','popScene','setupItemDamageTempActors','XZGtH','getItemsEquipsCoreBackColor2','drawItemSuccessRate','money','NkmUZ','getMenuImage','paramPlusItemsEquipsCoreCustomJS','rdlTf','DEF','(+%1)','isNewItem','_shopStatusMenuAlly','gaugeLineHeight','addStateBuffChanges','OclMm','params','mUrYL','innerHeight','UPLkl','isMainMenuCoreMenuImageOptionAvailable','getItemEffectsHpRecoveryText','ARRAYEVAL','status','UDfth','drawTextEx','drawItemQuantity','DzpKD','powerUpColor','onActorChange','loadCharacter','JSON','_buyWindowLastIndex','helpAreaHeight','Window_ItemList_drawItem','Scene_Equip_commandEquip','previousActor','active','playEquip','Actors','LabelHitType','isCursorMovable','_itemData','16tcNnRR','\x5cI[%1]%2','FUNC','textColor','MenuPortraits','Game_Party_initialize','setHandler','setTempActor','getInputMultiButtonStrings','deactivate','IconSet','QHTgU','MdXQI','xMEUF','MDpIv','onSlotOk','bNkFX','KWRWO','xpnDX','isRepeated','Scene_Equip_onActorChange','Zamcl','maxCols','LKoaM','EFFECT_RECOVER_HP','refreshActorEquipSlotsIfUpdated','CmdTextAlign','isGoodShown','Scene_Item_categoryWindowRect','isItem','StatusWindowWidth','_resetFontSize','Scene_Boot_onDatabaseLoaded','rluje','colSpacing','KIWRj','show','occasion','_dummyWindow','3mCYSfq','onCategoryCancelItemsEquipsCore','nNqun','JRrAw','8181292DueUqC','getItemScopeText','STRUCT','ieWZU','TUjjf','setCategory','setItem','EquipParams','getItemRepeatsText','Whitelist','IvMiJ','move','NzSRb','isDualWield','Scope%1','RemoveEquipText','upyks','itemPadding','nOnRZ','CommandAddClear','getItemDamageAmountText','aOrVi','4807944vepUhh','hLCaU','_goodsCount','itemLineRect','mwGji','numberWindowRect','OffsetX','commandNameWindowDrawText','itemTextAlign','HP\x20DAMAGE','actorParams','equip2','isCancelled','EquipScene','isBuyCommandEnabled','Window_Selectable_initialize','OQLfU','CmdIconClear','iconIndex','iPlAg','gTPAR','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','getItemEffectsMpDamageText','Scene_Equip_onSlotOk','HQeoF','Scene_Item_create','loadFaceImages','mmp','VCOKf','zWIas','Scene_Item_createItemWindow','EfYDB','placeNewLabel','VBKZX','yUcFF','Parse_Notetags_Category','vKoaw','addCommand','_newLabelOpacityChange','Parse_Notetags_EnableJS','NVCOt','iYoHC','getItemEffectsAddedStatesBuffsText','allowShiftScrolling','jZwwM','rjbyc','LFdXt','Window_ItemCategory_setItemWindow','addChild','equipTypes','ParseClassNotetags','parameters','currencyUnit','OqaTi','categoryStyleCheck','drawItemData','YOCrJ','categories','2142515tloXIy','prototype','DdEKH','fVnLl','cursorLeft','GCbMQ','ItemQuantityFontSize','itypeId','puOoz','LabelConsume','sERfo','Width','getItemEffectsTpRecoveryText','FIwfc','pIFie','Settings','damageColor','SkLRI','foreground','oMDeZ','wKILT','adjustItemWidthByStatus','USER\x20TP\x20GAIN','getColor','buttonAssistSlotWindowShift','value','Scene_Shop_sellWindowRect','VrFyF','Vevtf','Enable','Window_ItemList_maxCols','ARRAYNUM','drawItemScope','getItemDamageElementText','getItemEffectsHpRecoveryLabel','tKRxM','ScopeRandomAllies','modifiedBuyPriceItemsEquipsCore','FieldUsable','isSceneShop','Text','isEquipChangeOk','UkFyo','Rlsmq','aSNwH','yNMAy','initNewItemsList','MEVna','isUseModernControls','getItemEffectsHpDamageLabel','REPEAT','hideDisabledCommands','categoryStyle','initialize','postCreateItemsEquipsCore','%1-%2','goldWindowRectItemsEquipsCore','equip','changeEquip','Window_ItemList_updateHelp','Type','weapon','discardEquip','shift','resetShopSwitches','middle','refresh','update','addWindow','ElementNone','optimize','top','drawItemStyleIconText','buttonAssistSmallIncrement','process_VisuMZ_ItemsEquipsCore_EquipSlots','buyWindowRectItemsEquipsCore','hpRate','mainFontSize','SCOPE','MROKF','createCategoryNameWindow','MaxItems','kRjXh','buttonAssistCategory','itemAt','commandBuy','ConvertParams','isBattleTest','type','isPlaytest','armor-%1','drawNewLabelIcon','SLfnh','hideAdditionalSprites','getItemColor','getItemsEquipsCoreBackColor1','getDamageStyle','consumable','currentSymbol','HiddenItemA','normalColor','isHoverEnabled','AhGqL','_category','MaxArmors','XbLUt','drawItemCustomEntryLine','parse','qLtHf','tradeItemWithParty','baseSellingPrice','isPressed','_scene','makeDeepCopy','TP\x20DAMAGE','_list','return\x200','processCursorMoveModernControls','forceChangeEquipSlots','EMbsO','isHovered','qCzxp','smoothSelect','setValue','SellPriceJS','sellingPrice','members','createCategoryWindow','helpWindowRect','drawItemEffects','buyWindowRect','_statusWindow','DamageType%1','Window_EquipItem_includes','arRkd','AllItems','commandSellItemsEquipsCore','initNewLabelSprites','eNNck','StatusWindow','buttonAssistOffset3','Style','helpWindowRectItemsEquipsCore','processShiftRemoveShortcut','processDrawIcon','kMKRP','Zljgt','_bypassReleaseUnequippableItemsItemsEquipsCore','clamp','MWiIz','setStatusWindow','_commandNameWindow','max','Game_Actor_forceChangeEquip','CannotEquipMarker','note','categoryNameWindowDrawBackground','ODVrU','Scene_Shop_statusWindowRect','EFFECT_REMOVE_STATE','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getItemHitTypeText','isSoleArmorType','effects','removeBuff','uXTIF','filter','TaaXc','keCpZ','scope','gainTP','addCancelCommand','cursorRight','loadPicture','param','itemWindowRectItemsEquipsCore','map','drawNewLabelText','addOptimizeCommand','kGyNt','match','_itemWindow','NotConsumable','Scene_Shop_onSellOk','mainCommandWidth','commandNameWindowCenter','nhvqo','maxItems','textSizeEx','statusWidth','opacity','hYDvK','nauph','getItemDamageAmountLabelOriginal','Window_ShopBuy_price','itemHasEquipLimit','ARRAYJSON','zAYEb','aolTt','%1%','hitType','armor','addInnerChild','value2','XyUAq','6mYwTkk','aGYnG','formula','repeats','isTriggered','dwgIv','wkyQZ','Zbjnb','jtEcj','BatchShop','Window_ItemCategory_initialize','nqGPS','isHandled','versionId','currentExt','+%1%','auto','cjQUL','commandNameWindowDrawBackground','ZeAnx','statusWindowRectItemsEquipsCore','qZZiD','drawItemHitType','SUCCESS\x20RATE','armorTypes','RLARC','OFBBU','getItemEffectsHpDamageText','drawItemDamageElement','successRate','eYDiU','drawItemDarkRect','FVFNY','changeEquipById','CmdIconOptimize','uiInputPosition','isOpen','createItemWindow','meetsItemConditions','process_VisuMZ_ItemsEquipsCore_RegExp','pageup','geUpdatedLayoutStatusWidth','createSellWindow','callUpdateHelp','ARRAYSTRUCT','getItemConsumableText','fill','utNWk','doBuy','description','buttonAssistText1','removeDebuff','getInputButtonString','JStlE','prepareItemCustomData','LayoutStyle','WTVeh','buy','translucentOpacity','DaEiR','AlwaysUsable','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','adjustHiddenShownGoods','select','AllArmors','AllWeapons','isOptimizeCommandAdded','LabelDamageTP','getItemEffectsRemovedStatesBuffsText','CmdIconEquip','Slots','SpeedNeg1999','drawText','categoryList','drawItemStyleIcon','EVAL','remQU','removeStateBuffChanges','elementId','pFYTB','prepare','itemWindowRect','Step1Start','ydsgE','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','DIXsv','drawItemDamage','jfbqv','updateNewLabelOpacity','updateMoneyAmount','isShiftRemoveShortcutEnabled','UhZXf','isWeapon','EFFECT_GAIN_TP','categoryNameWindowCenter','NeverUsable','iftlk','ADDED\x20EFFECTS','_buyWindow','getMatchingInitEquip','canEquip','VcjVl','setObject','_equips','onBuyCancelItemsEquipsCore','doSell','setShopStatusWindowMode','Mctfj','Scene_Equip_statusWindowRect','getItemDamageAmountLabelBattleCore','sellWindowRect','createStatusWindow','Scene_Equip_itemWindowRect','drawActorCharacter','AWHeO','CbiRT','drawItemName','HP\x20RECOVERY','Scene_Equip_create','List','weapon-%1','onSellOk','includes','setBackgroundType','FFICI','Scene_ItemBase_activateItemWindow','drwWZ','MtntH','RegularItems','drawItem','sHHYe','getItemConsumableLabel','Scene_Shop_create','XIcOm','Occasion%1','uiHelpPosition','commandEquip','Translucent','_sellWindow','activate','uiMenuStyle','name','convertInitEquipsToItems','KeyItems','mainFontFace','SyyXz','FontColor','dataId','trim','mNKTl','QUANTITY','SwitchID','getItemEffectsRemovedStatesBuffsLabel','JuTDo','GMWKU','SPEED','possession','prepareNewEquipSlotsOnLoad','(%1)','RwRbE','mainAreaBottom','values','setMp','drawCurrencyValue','buttonAssistKey1','Scene_Equip_commandWindowRect','onMenuImageLoad','paramValueFontSize','Scene_Shop_commandSell','New','deselect','fxvpf','releaseUnequippableItems','resetTextColor','setNewItem','Scene_Shop_categoryWindowRect','meetsItemConditionsNotetags','Scene_Item_createCategoryWindow','drawItemDamageAmount','itemDataFontSize','categoryNameWindowDrawText','atsjE','GBUzo','drawItemEffectsTpDamage','getItemDamageElementLabel','onTouchSelectModernControls','addState','EnableLayout','_money','atk','FensW','hideNewLabelSprites','VisuMZ_1_MainMenuCore','GmEja','_commandWindow','JBiyo','RFqJJ','isOptimizeCommandEnabled','isArmor','Parse_Notetags_Prices','OJScA','canConsumeItem','round','format','MP\x20RECOVERY','jyQlB','unoYj','_numberWindow','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','930054feWJEz','+%1','XYSaA','getItemEffectsSelfTpGainLabel','text','ceil','isShiftShortcutKeyForRemove','MaxWeapons','isBottomHelpMode','icon','pagedown','Mruje','ARRAYFUNC','NoChangeMarker','ActorChangeEquipSlots','lHNFH','drawEquipData','DAMAGE\x20MULTIPLIER','Scene_Shop_createCategoryWindow','_categoryWindow','_newItemsList','xEmgt','qStDH','HzpXQ','drUNJ','PysQM','DrawIcons','rateMP','nxEME','uxVPe','qIfvD','jtkDf','goldWindowRect','paintOpacity','gainItem','boxWidth','FontFace','Window_ItemList_colSpacing','isKeyItem','pop','KMbiu','iconWidth','LzDIr','XWFwR','contentsBack','Parse_Notetags_ParamJS','kasvU','addEquipCommand','playCursorSound','actor','cancel','OESLt','Window_EquipCommand_initialize','getItemSpeedText','SwitchBuy','drawItemEffectsHpRecovery','isClicked','fillRect','HitType%1','bind','MXtBP','isEnabled','drawRemoveItem','ifLNT','onTouchCancel','DrawEquipData','value1','paramJS','buttonAssistText2','EquipAdjustHpMp','KTTpI','UddwL','canShiftRemoveEquipment','category','updateCommandNameWindow','ItemSceneAdjustItemList','fontSize','getItemDamageAmountTextOriginal','makeItemData','isClearCommandEnabled','processCursorMove','\x5cb%1\x5cb','onSellOkItemsEquipsCore','VisuMZ_1_BattleCore','lulur','JLzRW','calcWindowHeight','lnMkH','replace','canUse','getItemSuccessRateLabel','LabelElement','ksYyH','revertGlobalNamespaceVariables','cursorPageup','_forcedSlots','sellPriceRate','oWmpx','drawItemKeyData','onCategoryOk','Speed2000','buttonAssistItemListRequirement','windowPadding','PCtbB','drawItemEffectsRemovedStatesBuffs','refreshCursor','isClearEquipOk','vHwJQ','isDrawItemNumber','wYCzO','MaxHP','down','onDatabaseLoaded','IsbPx','paramValueByName','optimizeEquipments','OCCASION','cVNag','buttonAssistKey3','getItemSuccessRateText','mYVUB','processTouchModernControls','VLDwr','BAvun','dhWNU','qhpHT','postCreateSellWindowItemsEquipsCore','createCommandNameWindow','qdjzl','fbAeh','GVaGh','_shopStatusMenuMode','item-%1','PgXGM','iEAEU','splice','createSlotWindow','Game_Actor_tradeItemWithParty','REMOVED\x20EFFECTS','drawUpdatedBeforeParamValue','prepareRefreshItemsEquipsCoreLayout','changePaintOpacity','clearEquipments','PurchaseOnly','SpeedNeg999','Scene_Equip_createSlotWindow','CmdHideDisabled','btLxy','currentClass','commandStyle','MP\x20DAMAGE','code','onTouchOk','updateHelp','Step3End','IdYVV','Game_Actor_paramPlus','drawParamsItemsEquipsCore','Game_Actor_discardEquip','Scene_Shop_commandBuy','buttonAssistRemove','getItemEffectsTpRecoveryLabel','oxnnx','ShowShopStatus','BackRectColor','isPageChangeRequested','ScopeAlliesButUser','tXFyt','updatedLayoutStyle','HciyQ','MANUAL','_slotWindow','ItemQuantityFmt','paramId','cursorUp','HiddenItemB','paramPlus','initEquips','wtypeId','Scene_Item_itemWindowRect','_handlers','ARRAYSTR','aatoh'];_0x49bc=function(){return _0x4cc26d;};return _0x49bc();}VisuMZ[label][_0x2455b1(0x33c)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x2455b1(0x383)]=function(_0x184f6e,_0x1e876c){const _0x4489e8=_0x2455b1;for(const _0x255f04 in _0x1e876c){if(_0x255f04['match'](/(.*):(.*)/i)){if('ifLNT'!==_0x4489e8(0x50a)){const _0x36d75c=_0x1722a3[_0x4489e8(0x398)]('['+_0x1f7bfa['$1']['match'](/\d+/g)+']');for(const _0x5a063d of _0x36d75c){if(!_0x3498c7[_0x4489e8(0x346)](_0x5a063d))return![];}return!![];}else{const _0x498ae4=String(RegExp['$1']),_0x146282=String(RegExp['$2'])[_0x4489e8(0x5b3)]()[_0x4489e8(0x48e)]();let _0x46c14c,_0x4a58fe,_0x4d8046;switch(_0x146282){case'NUM':_0x46c14c=_0x1e876c[_0x255f04]!==''?Number(_0x1e876c[_0x255f04]):0x0;break;case _0x4489e8(0x34c):_0x4a58fe=_0x1e876c[_0x255f04]!==''?JSON[_0x4489e8(0x398)](_0x1e876c[_0x255f04]):[],_0x46c14c=_0x4a58fe[_0x4489e8(0x3dd)](_0x31b983=>Number(_0x31b983));break;case _0x4489e8(0x445):_0x46c14c=_0x1e876c[_0x255f04]!==''?eval(_0x1e876c[_0x255f04]):null;break;case _0x4489e8(0x29d):_0x4a58fe=_0x1e876c[_0x255f04]!==''?JSON['parse'](_0x1e876c[_0x255f04]):[],_0x46c14c=_0x4a58fe['map'](_0x4d1752=>eval(_0x4d1752));break;case _0x4489e8(0x2a6):_0x46c14c=_0x1e876c[_0x255f04]!==''?JSON[_0x4489e8(0x398)](_0x1e876c[_0x255f04]):'';break;case _0x4489e8(0x3f1):_0x4a58fe=_0x1e876c[_0x255f04]!==''?JSON['parse'](_0x1e876c[_0x255f04]):[],_0x46c14c=_0x4a58fe[_0x4489e8(0x3dd)](_0x5aed31=>JSON['parse'](_0x5aed31));break;case _0x4489e8(0x2b4):_0x46c14c=_0x1e876c[_0x255f04]!==''?new Function(JSON['parse'](_0x1e876c[_0x255f04])):new Function(_0x4489e8(0x3a1));break;case _0x4489e8(0x4d7):_0x4a58fe=_0x1e876c[_0x255f04]!==''?JSON[_0x4489e8(0x398)](_0x1e876c[_0x255f04]):[],_0x46c14c=_0x4a58fe[_0x4489e8(0x3dd)](_0x134d50=>new Function(JSON['parse'](_0x134d50)));break;case'STR':_0x46c14c=_0x1e876c[_0x255f04]!==''?String(_0x1e876c[_0x255f04]):'';break;case _0x4489e8(0x580):_0x4a58fe=_0x1e876c[_0x255f04]!==''?JSON[_0x4489e8(0x398)](_0x1e876c[_0x255f04]):[],_0x46c14c=_0x4a58fe[_0x4489e8(0x3dd)](_0x283184=>String(_0x283184));break;case _0x4489e8(0x2df):_0x4d8046=_0x1e876c[_0x255f04]!==''?JSON[_0x4489e8(0x398)](_0x1e876c[_0x255f04]):{},_0x184f6e[_0x498ae4]={},VisuMZ['ConvertParams'](_0x184f6e[_0x498ae4],_0x4d8046);continue;case _0x4489e8(0x426):_0x4a58fe=_0x1e876c[_0x255f04]!==''?JSON[_0x4489e8(0x398)](_0x1e876c[_0x255f04]):[],_0x46c14c=_0x4a58fe['map'](_0x431025=>VisuMZ[_0x4489e8(0x383)]({},JSON[_0x4489e8(0x398)](_0x431025)));break;default:continue;}_0x184f6e[_0x498ae4]=_0x46c14c;}}}return _0x184f6e;},(_0x2f9e97=>{const _0x249367=_0x2455b1,_0x3707d0=_0x2f9e97[_0x249367(0x487)];for(const _0x38cd77 of dependencies){if('rJVPF'!=='ytBwh'){if(!Imported[_0x38cd77]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x249367(0x4c5)](_0x3707d0,_0x38cd77)),SceneManager[_0x249367(0x1f0)]();break;}}else{this[_0x249367(0x5c4)]=!![];const _0x4bbadc=_0x14f8e1[_0x249367(0x21d)][_0x249367(0x50e)][_0x3e4fe5][_0x249367(0x27a)](this,_0x35f6a9,_0x4c6119);return this['_calculatingJSParameters']=![],_0x4bbadc;}}const _0x4db4ba=_0x2f9e97[_0x249367(0x42b)];if(_0x4db4ba[_0x249367(0x3e1)](/\[Version[ ](.*?)\]/i)){const _0x2b8ab5=Number(RegExp['$1']);_0x2b8ab5!==VisuMZ[label][_0x249367(0x225)]&&(alert(_0x249367(0x3cd)[_0x249367(0x4c5)](_0x3707d0,_0x2b8ab5)),SceneManager[_0x249367(0x1f0)]());}if(_0x4db4ba[_0x249367(0x3e1)](/\[Tier[ ](\d+)\]/i)){const _0x31621e=Number(RegExp['$1']);if(_0x31621e<tier){if(_0x249367(0x307)!==_0x249367(0x348))alert(_0x249367(0x437)[_0x249367(0x4c5)](_0x3707d0,_0x31621e,tier)),SceneManager[_0x249367(0x1f0)]();else return!this['isUseModernControls']();}else tier=Math['max'](_0x31621e,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x249367(0x33c)],_0x2f9e97[_0x249367(0x326)]);})(pluginData),PluginManager[_0x2455b1(0x1c9)](pluginData['name'],_0x2455b1(0x4d9),_0x57c857=>{const _0x38d7e1=_0x2455b1;VisuMZ[_0x38d7e1(0x383)](_0x57c857,_0x57c857);const _0xd5bdc=_0x57c857[_0x38d7e1(0x2ae)]['map'](_0x41291c=>$gameActors['actor'](_0x41291c)),_0x3f7033=_0x57c857[_0x38d7e1(0x440)][_0x38d7e1(0x3dd)](_0x2457cc=>$dataSystem[_0x38d7e1(0x324)][_0x38d7e1(0x5ea)](_0x2457cc[_0x38d7e1(0x48e)]()));for(const _0x1cb7f5 of _0xd5bdc){if(_0x38d7e1(0x1c0)!==_0x38d7e1(0x1c0))this[_0x38d7e1(0x2a7)]=this['_buyWindow'][_0x38d7e1(0x5fe)](),this[_0x38d7e1(0x45c)]['show'](),this[_0x38d7e1(0x45c)][_0x38d7e1(0x4a4)](),this[_0x38d7e1(0x45c)][_0x38d7e1(0x270)](0x0,0x0),this['_statusWindow']['show'](),this[_0x38d7e1(0x2d8)][_0x38d7e1(0x208)]();else{if(!_0x1cb7f5)continue;_0x1cb7f5['forceChangeEquipSlots'](_0x3f7033);}}}),PluginManager['registerCommand'](pluginData[_0x2455b1(0x487)],_0x2455b1(0x582),_0x53f4f8=>{const _0x1627d2=_0x2455b1;VisuMZ[_0x1627d2(0x383)](_0x53f4f8,_0x53f4f8);const _0x2c0ad6=_0x53f4f8[_0x1627d2(0x2ae)][_0x1627d2(0x3dd)](_0x3fe16e=>$gameActors[_0x1627d2(0x4fc)](_0x3fe16e));for(const _0x4b1232 of _0x2c0ad6){if(!_0x4b1232)continue;_0x4b1232['forceResetEquipSlots']();}}),PluginManager[_0x2455b1(0x1c9)](pluginData[_0x2455b1(0x487)],_0x2455b1(0x403),_0x560203=>{const _0x1b564e=_0x2455b1;VisuMZ['ConvertParams'](_0x560203,_0x560203);const _0x411e96=[],_0x105123=_0x560203['Blacklist'][_0x1b564e(0x3dd)](_0x5b0c9e=>_0x5b0c9e[_0x1b564e(0x5b3)]()['trim']()),_0x16aaed=_0x560203[_0x1b564e(0x2e6)][_0x1b564e(0x3dd)](_0x301fa0=>_0x301fa0[_0x1b564e(0x5b3)]()[_0x1b564e(0x48e)]()),_0x5c19e7=_0x560203[_0x1b564e(0x1e9)]>=_0x560203[_0x1b564e(0x44c)]?_0x560203[_0x1b564e(0x44c)]:_0x560203[_0x1b564e(0x1e9)],_0x722f2b=_0x560203[_0x1b564e(0x1e9)]>=_0x560203[_0x1b564e(0x44c)]?_0x560203[_0x1b564e(0x1e9)]:_0x560203[_0x1b564e(0x44c)],_0x9e78d0=Array(_0x722f2b-_0x5c19e7+0x1)[_0x1b564e(0x428)]()[_0x1b564e(0x3dd)]((_0x5d20d9,_0x3c18b5)=>_0x5c19e7+_0x3c18b5);for(const _0x107bfb of _0x9e78d0){if(_0x1b564e(0x59e)===_0x1b564e(0x52c))return _0x56cfef[_0x1b564e(0x21d)]['Settings'][_0x1b564e(0x25d)][_0x1b564e(0x3ba)];else{const _0x5b1828=$dataItems[_0x107bfb];if(!_0x5b1828)continue;if(!VisuMZ['ItemsEquipsCore'][_0x1b564e(0x5c9)](_0x5b1828,_0x105123,_0x16aaed))continue;_0x411e96[_0x1b564e(0x215)]([0x0,_0x107bfb,0x0,_0x5b1828[_0x1b564e(0x5b5)]]);}}const _0x589e95=_0x560203['Step2End']>=_0x560203[_0x1b564e(0x5e3)]?_0x560203[_0x1b564e(0x5e3)]:_0x560203[_0x1b564e(0x26f)],_0xe794b7=_0x560203[_0x1b564e(0x26f)]>=_0x560203['Step2Start']?_0x560203[_0x1b564e(0x26f)]:_0x560203[_0x1b564e(0x5e3)],_0x2d9793=Array(_0xe794b7-_0x589e95+0x1)[_0x1b564e(0x428)]()['map']((_0x37a4b5,_0x4b4e91)=>_0x589e95+_0x4b4e91);for(const _0x6cd877 of _0x2d9793){const _0x50f16a=$dataWeapons[_0x6cd877];if(!_0x50f16a)continue;if(!VisuMZ[_0x1b564e(0x21d)][_0x1b564e(0x5c9)](_0x50f16a,_0x105123,_0x16aaed))continue;_0x411e96[_0x1b564e(0x215)]([0x1,_0x6cd877,0x0,_0x50f16a[_0x1b564e(0x5b5)]]);}const _0x4eef61=_0x560203[_0x1b564e(0x565)]>=_0x560203[_0x1b564e(0x23f)]?_0x560203[_0x1b564e(0x23f)]:_0x560203[_0x1b564e(0x565)],_0x6e362c=_0x560203['Step3End']>=_0x560203[_0x1b564e(0x23f)]?_0x560203[_0x1b564e(0x565)]:_0x560203['Step3Start'],_0x4a366b=Array(_0x6e362c-_0x4eef61+0x1)[_0x1b564e(0x428)]()['map']((_0x4fc853,_0x39320a)=>_0x4eef61+_0x39320a);for(const _0x4226f0 of _0x4a366b){const _0x468446=$dataArmors[_0x4226f0];if(!_0x468446)continue;if(!VisuMZ[_0x1b564e(0x21d)]['IncludeShopItem'](_0x468446,_0x105123,_0x16aaed))continue;_0x411e96[_0x1b564e(0x215)]([0x2,_0x4226f0,0x0,_0x468446[_0x1b564e(0x5b5)]]);}SceneManager['push'](Scene_Shop),SceneManager['prepareNextScene'](_0x411e96,_0x560203[_0x1b564e(0x55a)]);}),VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x5c9)]=function(_0x230063,_0x59484b,_0x2e4329){const _0x3a23cc=_0x2455b1;if(_0x230063[_0x3a23cc(0x487)][_0x3a23cc(0x48e)]()==='')return![];if(_0x230063['name']['match'](/-----/i))return![];const _0x4a7331=_0x230063[_0x3a23cc(0x32c)];if(_0x59484b[_0x3a23cc(0x22d)]>0x0)for(const _0x40ecf3 of _0x59484b){if(!_0x40ecf3)continue;if(_0x4a7331['includes'](_0x40ecf3))return![];}if(_0x2e4329[_0x3a23cc(0x22d)]>0x0){for(const _0x3a20a4 of _0x2e4329){if(!_0x3a20a4)continue;if(_0x4a7331['includes'](_0x3a20a4))return!![];}return![];}return!![];},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x2d2)]=Scene_Boot['prototype'][_0x2455b1(0x53b)],Scene_Boot[_0x2455b1(0x32e)][_0x2455b1(0x53b)]=function(){const _0x504b50=_0x2455b1;this[_0x504b50(0x421)](),VisuMZ['ItemsEquipsCore'][_0x504b50(0x2d2)][_0x504b50(0x27a)](this),this[_0x504b50(0x231)]();},Scene_Boot[_0x2455b1(0x32e)]['process_VisuMZ_ItemsEquipsCore_RegExp']=function(){const _0x19a2c1=_0x2455b1;VisuMZ[_0x19a2c1(0x21d)][_0x19a2c1(0x1fb)]={},VisuMZ[_0x19a2c1(0x21d)]['RegExp'][_0x19a2c1(0x2e4)]=[],VisuMZ[_0x19a2c1(0x21d)]['RegExp'][_0x19a2c1(0x602)]=[];const _0x1c554d=[_0x19a2c1(0x539),'MaxMP',_0x19a2c1(0x1f6),_0x19a2c1(0x290),'MAT',_0x19a2c1(0x206),'AGI','LUK'];for(const _0x176ee1 of _0x1c554d){const _0x14a602=_0x19a2c1(0x308)[_0x19a2c1(0x4c5)](_0x176ee1);VisuMZ[_0x19a2c1(0x21d)]['RegExp'][_0x19a2c1(0x2e4)][_0x19a2c1(0x215)](new RegExp(_0x14a602,'i'));const _0x7a2bb4=_0x19a2c1(0x51c)[_0x19a2c1(0x4c5)](_0x176ee1);VisuMZ['ItemsEquipsCore'][_0x19a2c1(0x1fb)][_0x19a2c1(0x602)][_0x19a2c1(0x215)](new RegExp(_0x7a2bb4,'g'));}},Scene_Boot[_0x2455b1(0x32e)][_0x2455b1(0x231)]=function(){const _0x19fde0=_0x2455b1;if(VisuMZ['ParseAllNotetags'])return;this[_0x19fde0(0x377)]();const _0x592b98=[$dataItems,$dataWeapons,$dataArmors];for(const _0xad67a4 of _0x592b98){for(const _0xf60bc4 of _0xad67a4){if(!_0xf60bc4)continue;VisuMZ['ItemsEquipsCore'][_0x19fde0(0x316)](_0xf60bc4,_0xad67a4),VisuMZ['ItemsEquipsCore'][_0x19fde0(0x4c1)](_0xf60bc4,_0xad67a4),VisuMZ[_0x19fde0(0x21d)]['Parse_Notetags_ParamValues'](_0xf60bc4,_0xad67a4),VisuMZ[_0x19fde0(0x21d)][_0x19fde0(0x4f8)](_0xf60bc4,_0xad67a4),VisuMZ[_0x19fde0(0x21d)][_0x19fde0(0x31a)](_0xf60bc4,_0xad67a4);}}},Scene_Boot[_0x2455b1(0x32e)][_0x2455b1(0x377)]=function(){const _0x10b8ed=_0x2455b1;for(const _0x1e51eb of $dataClasses){if(_0x10b8ed(0x2d5)===_0x10b8ed(0x4e2))_0x4cc5b4[_0x10b8ed(0x4ed)](_0x4381c6[_0x10b8ed(0x59b)](),0x1);else{if(!_0x1e51eb)continue;VisuMZ[_0x10b8ed(0x21d)][_0x10b8ed(0x230)](_0x1e51eb);}}},VisuMZ['ItemsEquipsCore']['ParseClassNotetags']=VisuMZ[_0x2455b1(0x325)],VisuMZ[_0x2455b1(0x325)]=function(_0x28a08a){const _0x300dbd=_0x2455b1;VisuMZ[_0x300dbd(0x21d)][_0x300dbd(0x325)][_0x300dbd(0x27a)](this,_0x28a08a),VisuMZ[_0x300dbd(0x21d)][_0x300dbd(0x230)](_0x28a08a);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x603)]=VisuMZ['ParseItemNotetags'],VisuMZ['ParseItemNotetags']=function(_0x4c05e4){const _0x5a1e6d=_0x2455b1;VisuMZ['ItemsEquipsCore'][_0x5a1e6d(0x603)][_0x5a1e6d(0x27a)](this,_0x4c05e4),VisuMZ[_0x5a1e6d(0x21d)]['Parse_Notetags_Batch'](_0x4c05e4,$dataItems);},VisuMZ['ItemsEquipsCore'][_0x2455b1(0x5da)]=VisuMZ[_0x2455b1(0x5da)],VisuMZ[_0x2455b1(0x5da)]=function(_0x3a042a){const _0x17d3e2=_0x2455b1;VisuMZ['ItemsEquipsCore'][_0x17d3e2(0x5da)]['call'](this,_0x3a042a),VisuMZ['ItemsEquipsCore'][_0x17d3e2(0x217)](_0x3a042a,$dataWeapons);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x209)]=VisuMZ[_0x2455b1(0x209)],VisuMZ[_0x2455b1(0x209)]=function(_0x30bff6){const _0x589967=_0x2455b1;VisuMZ['ItemsEquipsCore']['ParseArmorNotetags'][_0x589967(0x27a)](this,_0x30bff6),VisuMZ[_0x589967(0x21d)]['Parse_Notetags_Batch'](_0x30bff6,$dataArmors);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x230)]=function(_0x1e7046){const _0x263f5c=_0x2455b1;_0x1e7046['equipSlots']=[];if(!BattleManager[_0x263f5c(0x384)]()&&_0x1e7046[_0x263f5c(0x3c8)]['match'](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){if('IsbPx'!==_0x263f5c(0x53c))_0x41ae3d=this[_0x263f5c(0x5bc)]['paramValueByName'](_0xcb9d26,!![]);else{const _0x312214=String(RegExp['$1'])[_0x263f5c(0x278)](/[\r\n]+/);for(const _0x214344 of _0x312214){if(_0x263f5c(0x627)===_0x263f5c(0x2c2))this[_0x263f5c(0x576)][_0x263f5c(0x5fe)]()>=0x0?(_0xa4d692[_0x263f5c(0x21d)][_0x263f5c(0x30a)][_0x263f5c(0x27a)](this),this['onSlotOkAutoSelect']()):(this[_0x263f5c(0x576)][_0x263f5c(0x3a7)](0x0),this[_0x263f5c(0x576)]['activate']());else{const _0x218a4e=$dataSystem[_0x263f5c(0x324)]['indexOf'](_0x214344[_0x263f5c(0x48e)]());if(_0x218a4e>0x0)_0x1e7046[_0x263f5c(0x61f)]['push'](_0x218a4e);}}}}else{if('IrByF'==='IrByF')for(const _0x5c872f of $dataSystem['equipTypes']){if(_0x263f5c(0x5f0)!=='Cjcsb'){const _0x479660=$dataSystem['equipTypes'][_0x263f5c(0x5ea)](_0x5c872f[_0x263f5c(0x48e)]());if(_0x479660>0x0)_0x1e7046[_0x263f5c(0x61f)]['push'](_0x479660);}else this[_0x263f5c(0x394)]=_0x4b985d,this['refresh'](),this[_0x263f5c(0x4de)]&&this[_0x263f5c(0x4de)]['isUseModernControls']()?this[_0x263f5c(0x3a7)](0x0):this[_0x263f5c(0x619)](0x0,0x0);}else return this[_0x263f5c(0x2b5)](_0x1c1b70(_0x2074c4));}},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x217)]=function(_0x144ab4,_0x458a1f){const _0x48eb4a=_0x2455b1;VisuMZ[_0x48eb4a(0x21d)][_0x48eb4a(0x316)](_0x144ab4,_0x458a1f),VisuMZ[_0x48eb4a(0x21d)][_0x48eb4a(0x4c1)](_0x144ab4,_0x458a1f),VisuMZ[_0x48eb4a(0x21d)][_0x48eb4a(0x20f)](_0x144ab4,_0x458a1f),VisuMZ[_0x48eb4a(0x21d)][_0x48eb4a(0x4f8)](_0x144ab4,_0x458a1f),VisuMZ[_0x48eb4a(0x21d)]['Parse_Notetags_EnableJS'](_0x144ab4,_0x458a1f);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x316)]=function(_0x29be9d,_0x4adde5){const _0x1b79f0=_0x2455b1;_0x29be9d[_0x1b79f0(0x32c)]=[];const _0x45eafb=_0x29be9d[_0x1b79f0(0x3c8)],_0x426b8f=_0x45eafb[_0x1b79f0(0x3e1)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x426b8f)for(const _0xb31166 of _0x426b8f){if('KptHW'===_0x1b79f0(0x2a2))return _0x4b31fc[_0x1b79f0(0x21d)][_0x1b79f0(0x33c)]['EquipScene']['StatusWindowWidth'];else{_0xb31166['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x140674=String(RegExp['$1'])[_0x1b79f0(0x5b3)]()['trim']()[_0x1b79f0(0x278)](',');for(const _0x4608d7 of _0x140674){_0x29be9d[_0x1b79f0(0x32c)][_0x1b79f0(0x215)](_0x4608d7[_0x1b79f0(0x48e)]());}}}if(_0x45eafb['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x3d5bfa=RegExp['$1'][_0x1b79f0(0x278)](/[\r\n]+/);for(const _0x9d92e5 of _0x3d5bfa){_0x29be9d[_0x1b79f0(0x32c)]['push'](_0x9d92e5[_0x1b79f0(0x5b3)]()['trim']());}}},VisuMZ['ItemsEquipsCore']['Parse_Notetags_Prices']=function(_0x424117,_0x521fbb){const _0x4b38bf=_0x2455b1;if(_0x424117[_0x4b38bf(0x3c8)][_0x4b38bf(0x3e1)](/<PRICE:[ ](\d+)>/i)){if(_0x4b38bf(0x1b3)===_0x4b38bf(0x3ec)){const _0x187472=_0x39ed06(_0x8d57b['$1'])||0x1;if(_0x4a3227>=_0x187472)return!![];}else _0x424117[_0x4b38bf(0x5b5)]=Number(RegExp['$1']);}},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x20f)]=function(_0xba32a0,_0x3a7e4d){const _0x3c56d0=_0x2455b1;if(_0x3a7e4d===$dataItems)return;for(let _0x2c9d52=0x0;_0x2c9d52<0x8;_0x2c9d52++){if(_0x3c56d0(0x2bd)==='QHTgU'){const _0x25a1e1=VisuMZ[_0x3c56d0(0x21d)]['RegExp'][_0x3c56d0(0x2e4)][_0x2c9d52];if(_0xba32a0['note'][_0x3c56d0(0x3e1)](_0x25a1e1)){if(_0x3c56d0(0x511)!==_0x3c56d0(0x511))return'#%1'[_0x3c56d0(0x4c5)](_0x16dca8(_0x4f184b['$1']));else _0xba32a0['params'][_0x2c9d52]=parseInt(RegExp['$1']);}}else _0x169baf=_0x3c56d0(0x387)[_0x3c56d0(0x4c5)](_0x3a236d['id']);}},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x50e)]={},VisuMZ['ItemsEquipsCore']['Parse_Notetags_ParamJS']=function(_0x140dfe,_0x4b0897){const _0x10c18b=_0x2455b1;if(_0x4b0897===$dataItems)return;if(_0x140dfe['note']['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){if('SvrqG'===_0x10c18b(0x62b)){const _0x10f545=String(RegExp['$1']),_0x478393=(_0x4b0897===$dataWeapons?'W%1':_0x10c18b(0x62f))['format'](_0x140dfe['id']),_0x32111a=_0x10c18b(0x4ca)[_0x10c18b(0x4c5)](_0x10f545);for(let _0x18cda3=0x0;_0x18cda3<0x8;_0x18cda3++){if(_0x10f545['match'](VisuMZ[_0x10c18b(0x21d)]['RegExp'][_0x10c18b(0x602)][_0x18cda3])){const _0x4add84=_0x10c18b(0x364)[_0x10c18b(0x4c5)](_0x478393,_0x18cda3);VisuMZ[_0x10c18b(0x21d)][_0x10c18b(0x50e)][_0x4add84]=new Function(_0x10c18b(0x27d),_0x10c18b(0x578),_0x32111a);}}}else this['onTouchOk']();}},VisuMZ[_0x2455b1(0x21d)]['itemEnableJS']={},VisuMZ[_0x2455b1(0x21d)]['Parse_Notetags_EnableJS']=function(_0x508f8c,_0x3e904e){const _0x48897a=_0x2455b1;if(_0x3e904e!==$dataItems)return;if(_0x508f8c[_0x48897a(0x3c8)][_0x48897a(0x3e1)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0x48897a(0x312)!==_0x48897a(0x32b)){const _0x3bdc13=String(RegExp['$1']),_0x175b97=_0x48897a(0x44e)[_0x48897a(0x4c5)](_0x3bdc13);VisuMZ[_0x48897a(0x21d)][_0x48897a(0x1c7)][_0x508f8c['id']]=new Function(_0x48897a(0x27d),_0x175b97);}else{if(_0x2f2cab[_0x48897a(0x486)]&&_0x73a68c[_0x48897a(0x481)]!==_0x2a4ace)return _0x1a1890[_0x48897a(0x481)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x48897a(0x573)]()[_0x48897a(0x3e1)](/LOWER/i);else _0x55f377[_0x48897a(0x32e)][_0x48897a(0x58e)]['call'](this);}}}},DataManager[_0x2455b1(0x4f1)]=function(_0x2557e3){return this['isItem'](_0x2557e3)&&_0x2557e3['itypeId']===0x2;},DataManager[_0x2455b1(0x26a)]=function(_0x550981){const _0x5ce5a4=_0x2455b1;if(!_0x550981)return 0x63;else{if(_0x550981['note'][_0x5ce5a4(0x3e1)](/<MAX:[ ](\d+)>/i)){if(_0x5ce5a4(0x5f4)!==_0x5ce5a4(0x48f))return parseInt(RegExp['$1']);else this[_0x5ce5a4(0x52e)]();}else return this[_0x5ce5a4(0x598)](_0x550981);}},DataManager[_0x2455b1(0x598)]=function(_0x3e68e6){const _0x2751e8=_0x2455b1;if(this[_0x2751e8(0x2cf)](_0x3e68e6))return VisuMZ['ItemsEquipsCore'][_0x2751e8(0x33c)][_0x2751e8(0x212)]['MaxItems'];else{if(this[_0x2751e8(0x456)](_0x3e68e6))return VisuMZ[_0x2751e8(0x21d)][_0x2751e8(0x33c)]['ItemScene'][_0x2751e8(0x4d2)];else{if(this[_0x2751e8(0x4c0)](_0x3e68e6))return VisuMZ[_0x2751e8(0x21d)][_0x2751e8(0x33c)][_0x2751e8(0x212)][_0x2751e8(0x395)];}}},ColorManager[_0x2455b1(0x38b)]=function(_0x88b916){const _0xb6fd54=_0x2455b1;if(!_0x88b916)return this[_0xb6fd54(0x391)]();else{if(_0x88b916['note']['match'](/<COLOR:[ ](\d+)>/i))return this[_0xb6fd54(0x2b5)](Number(RegExp['$1'])[_0xb6fd54(0x3c1)](0x0,0x1f));else return _0x88b916[_0xb6fd54(0x3c8)]['match'](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this['normalColor']();}},ColorManager[_0x2455b1(0x344)]=function(_0x51ee60){const _0x141cc1=_0x2455b1;return _0x51ee60=String(_0x51ee60),_0x51ee60[_0x141cc1(0x3e1)](/#(.*)/i)?_0x141cc1(0x1eb)[_0x141cc1(0x4c5)](String(RegExp['$1'])):this[_0x141cc1(0x2b5)](Number(_0x51ee60));},SceneManager['isSceneShop']=function(){const _0x755f9d=_0x2455b1;return this['_scene']&&this[_0x755f9d(0x39d)]['constructor']===Scene_Shop;},Game_Temp[_0x2455b1(0x32e)][_0x2455b1(0x58b)]=function(){const _0x487f28=_0x2455b1;if(this[_0x487f28(0x5e9)])return![];return VisuMZ[_0x487f28(0x21d)][_0x487f28(0x33c)][_0x487f28(0x4a3)][_0x487f28(0x34a)];},VisuMZ['ShopMenuStatusStandard']=VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x33c)][_0x2455b1(0x3b8)]['MultiplierStandard'],VisuMZ['ItemsEquipsCore'][_0x2455b1(0x22e)]=Game_BattlerBase['prototype']['param'],Game_BattlerBase[_0x2455b1(0x32e)][_0x2455b1(0x3db)]=function(_0x13a94a){const _0x3a87b4=_0x2455b1;return this[_0x3a87b4(0x54e)]?this[_0x3a87b4(0x293)]?VisuMZ[_0x3a87b4(0x60e)]:0x1:VisuMZ[_0x3a87b4(0x21d)]['Game_BattlerBase_param'][_0x3a87b4(0x27a)](this,_0x13a94a);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x628)]=Game_BattlerBase[_0x2455b1(0x32e)]['meetsItemConditions'],Game_BattlerBase[_0x2455b1(0x32e)][_0x2455b1(0x420)]=function(_0x5e8b8a){const _0x11751d=_0x2455b1;if(!_0x5e8b8a)return![];if(!VisuMZ[_0x11751d(0x21d)]['Game_BattlerBase_meetsItemConditions'][_0x11751d(0x27a)](this,_0x5e8b8a))return![];if(!this[_0x11751d(0x4aa)](_0x5e8b8a))return![];if(!this[_0x11751d(0x5ef)](_0x5e8b8a))return![];return!![];},Game_BattlerBase[_0x2455b1(0x32e)][_0x2455b1(0x4aa)]=function(_0x5c5579){const _0x39526d=_0x2455b1;if(!this[_0x39526d(0x24e)](_0x5c5579))return![];return!![];},Game_BattlerBase[_0x2455b1(0x32e)]['checkItemConditionsSwitchNotetags']=function(_0x1a338c){const _0x12a30f=_0x2455b1,_0x5180cd=_0x1a338c[_0x12a30f(0x3c8)];if(_0x5180cd[_0x12a30f(0x3e1)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x12a30f(0x512)===_0x12a30f(0x4c8))_0x2ce2f6[_0x12a30f(0x32e)][_0x12a30f(0x58e)][_0x12a30f(0x27a)](this);else{const _0x116f30=JSON[_0x12a30f(0x398)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x28b1e4 of _0x116f30){if(!$gameSwitches[_0x12a30f(0x346)](_0x28b1e4))return![];}return!![];}}if(_0x5180cd['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x12a30f(0x228)!==_0x12a30f(0x228)){const _0x23be39=_0x34db09(_0x1d1cc3['$1'])[_0x12a30f(0x5b3)]()['trim'](),_0x3d661b=_0x5afaa7(_0x39c3c8['$2'])[_0x12a30f(0x48e)]();this['_customItemInfo'][_0x23be39]=_0x3d661b;}else{const _0x2a17a1=JSON[_0x12a30f(0x398)]('['+RegExp['$1'][_0x12a30f(0x3e1)](/\d+/g)+']');for(const _0xe44c35 of _0x2a17a1){if(_0x12a30f(0x4e8)!==_0x12a30f(0x4e8)){if(this[_0x12a30f(0x530)]())return this[_0x12a30f(0x3e2)]['maxCols']()===0x1?_0x4e3193[_0x12a30f(0x2ba)](_0x12a30f(0x5a5),_0x12a30f(0x265)):_0x54686e[_0x12a30f(0x2ba)](_0x12a30f(0x422),_0x12a30f(0x4d5));return _0x167cee['prototype'][_0x12a30f(0x49e)][_0x12a30f(0x27a)](this);}else{if(!$gameSwitches[_0x12a30f(0x346)](_0xe44c35))return![];}}return!![];}}if(_0x5180cd[_0x12a30f(0x3e1)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x43513c=JSON[_0x12a30f(0x398)]('['+RegExp['$1'][_0x12a30f(0x3e1)](/\d+/g)+']');for(const _0xca7d24 of _0x43513c){if(_0x12a30f(0x605)===_0x12a30f(0x4a5))return![];else{if($gameSwitches[_0x12a30f(0x346)](_0xca7d24))return!![];}}return![];}if(_0x5180cd[_0x12a30f(0x3e1)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x12a30f(0x62e)==='TQctH'){if(this[_0x12a30f(0x2cf)](_0x404a4d))return _0x4c18bd[_0x12a30f(0x21d)][_0x12a30f(0x33c)]['ItemScene'][_0x12a30f(0x37e)];else{if(this['isWeapon'](_0x608913))return _0xacb760[_0x12a30f(0x21d)][_0x12a30f(0x33c)][_0x12a30f(0x212)]['MaxWeapons'];else{if(this[_0x12a30f(0x4c0)](_0x246076))return _0x1dbdc1[_0x12a30f(0x21d)]['Settings']['ItemScene'][_0x12a30f(0x395)];}}}else{const _0x497d9b=JSON[_0x12a30f(0x398)]('['+RegExp['$1'][_0x12a30f(0x3e1)](/\d+/g)+']');for(const _0x3505d8 of _0x497d9b){if(_0x12a30f(0x4b8)===_0x12a30f(0x4b8)){if(!$gameSwitches[_0x12a30f(0x346)](_0x3505d8))return!![];}else{const _0x53f41d=_0x52780e[_0x12a30f(0x398)]('['+_0x537a3a['$1'][_0x12a30f(0x3e1)](/\d+/g)+']');for(const _0x2f38a4 of _0x53f41d){if(_0x2e6ae6[_0x12a30f(0x346)](_0x2f38a4))return!![];}return![];}}return![];}}if(_0x5180cd['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x59a502=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xef45ac of _0x59a502){if(_0x12a30f(0x4e7)==='ouuvQ')this[_0x12a30f(0x4df)]=[];else{if(!$gameSwitches['value'](_0xef45ac))return!![];}}return![];}if(_0x5180cd[_0x12a30f(0x3e1)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x12a30f(0x393)!==_0x12a30f(0x3f2)){const _0x91557e=JSON[_0x12a30f(0x398)]('['+RegExp['$1'][_0x12a30f(0x3e1)](/\d+/g)+']');for(const _0x3e403f of _0x91557e){if($gameSwitches[_0x12a30f(0x346)](_0x3e403f))return![];}return!![];}else{const _0x449a1d=_0x12a30f(0x561);if(this['_itemData']['rateMP']>=0x0&&this[_0x12a30f(0x2b1)][_0x12a30f(0x63b)]>=0x0&&!this[_0x12a30f(0x5a0)][_0x449a1d])return![];const _0x168b23=this['getItemEffectsMpDamageLabel']();this[_0x12a30f(0x52d)](_0x168b23,_0x418a1e,_0x427a8a,_0xaafa7e,!![]);const _0x3860fb=this[_0x12a30f(0x309)]();return this[_0x12a30f(0x1b9)](_0xc810c2['damageColor'](0x2)),this[_0x12a30f(0x52d)](_0x3860fb,_0xeebb97,_0x1f1c3d,_0x56b22b,![],'right'),this[_0x12a30f(0x419)](_0x61a39e,_0x1642f5,_0x563ec2),this[_0x12a30f(0x256)](),!![];}}return!![];},Game_BattlerBase[_0x2455b1(0x32e)][_0x2455b1(0x5ef)]=function(_0x5d8d5e){const _0xf26073=_0x2455b1,_0x8adb87=_0x5d8d5e[_0xf26073(0x3c8)],_0x3c18fc=VisuMZ[_0xf26073(0x21d)]['itemEnableJS'];return _0x3c18fc[_0x5d8d5e['id']]?_0x3c18fc[_0x5d8d5e['id']][_0xf26073(0x27a)](this,_0x5d8d5e):!![];},Game_Actor['prototype'][_0x2455b1(0x57c)]=function(_0x661ccf){const _0xabd36d=_0x2455b1;_0x661ccf=this[_0xabd36d(0x488)](_0x661ccf);const _0x258ce8=this['equipSlots']();this[_0xabd36d(0x461)]=[];for(let _0x332981=0x0;_0x332981<_0x258ce8[_0xabd36d(0x22d)];_0x332981++){this[_0xabd36d(0x461)][_0x332981]=new Game_Item();}for(let _0x3ce1f4=0x0;_0x3ce1f4<_0x258ce8[_0xabd36d(0x22d)];_0x3ce1f4++){const _0x15ee08=_0x258ce8[_0x3ce1f4],_0x4376f9=this[_0xabd36d(0x45d)](_0x661ccf,_0x15ee08);if(this['canEquip'](_0x4376f9))this[_0xabd36d(0x461)][_0x3ce1f4][_0xabd36d(0x460)](_0x4376f9);}this['releaseUnequippableItems'](!![]),this[_0xabd36d(0x36f)]();},Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x488)]=function(_0xc42d17){const _0x24b755=_0x2455b1,_0x290335=[];for(let _0x335c69=0x0;_0x335c69<_0xc42d17[_0x24b755(0x22d)];_0x335c69++){const _0x2ece17=_0xc42d17[_0x335c69];if(_0x2ece17<=0x0)continue;const _0x13fc6b=$dataSystem[_0x24b755(0x324)][_0x335c69+0x1];if(_0x13fc6b===$dataSystem[_0x24b755(0x324)][0x1]||_0x335c69===0x1&&this['isDualWield']())_0x290335['push']($dataWeapons[_0x2ece17]);else{if(BattleManager[_0x24b755(0x384)]()){const _0x17c04f=$dataArmors[_0x2ece17];_0x17c04f&&_0x17c04f[_0x24b755(0x1cb)]===_0x335c69+0x1&&_0x290335[_0x24b755(0x215)](_0x17c04f);}else{const _0xa49539=$dataArmors[_0x2ece17];_0xa49539&&_0xa49539['etypeId']===_0x335c69+0x1&&(_0x24b755(0x56d)===_0x24b755(0x56d)?_0x290335[_0x24b755(0x215)](_0xa49539):_0x260580=_0x1d6da5[_0x24b755(0x4c4)]((this['innerWidth']-_0x52aa8f)/0x2));}}}return _0x290335;},Game_Actor['prototype'][_0x2455b1(0x45d)]=function(_0x464528,_0x4c0e5c){for(const _0x5db18c of _0x464528){if(!_0x5db18c)continue;if(_0x5db18c['etypeId']===_0x4c0e5c)return _0x464528['splice'](_0x464528['indexOf'](_0x5db18c),0x1),_0x5db18c;}return null;},Game_Actor[_0x2455b1(0x32e)]['equipSlots']=function(){const _0x1dddc5=_0x2455b1,_0x2a11bf=JsonEx[_0x1dddc5(0x39e)](this[_0x1dddc5(0x52a)]||this[_0x1dddc5(0x55f)]()[_0x1dddc5(0x61f)]);if(_0x2a11bf[_0x1dddc5(0x22d)]>=0x2&&this[_0x1dddc5(0x2ea)]())_0x2a11bf[0x1]=0x1;return _0x2a11bf;},Game_Actor['prototype'][_0x2455b1(0x3a3)]=function(_0x5d0bea){const _0x31e145=_0x2455b1;_0x5d0bea[_0x31e145(0x1b7)](0x0),_0x5d0bea[_0x31e145(0x1b7)](-0x1),this['_forcedSlots']=_0x5d0bea,this['refresh'](),this[_0x31e145(0x24f)]();},Game_Actor[_0x2455b1(0x32e)]['forceResetEquipSlots']=function(){const _0xf70fec=_0x2455b1;this[_0xf70fec(0x52a)]=undefined,this['refresh'](),this[_0xf70fec(0x24f)]();},Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x24f)]=function(){const _0x4209c4=_0x2455b1;let _0x30e0fd=this['equipSlots']()[_0x4209c4(0x22d)];while(this[_0x4209c4(0x461)][_0x4209c4(0x22d)]>_0x30e0fd){const _0x4317ea=this[_0x4209c4(0x461)][this['_equips'][_0x4209c4(0x22d)]-0x1];_0x4317ea&&_0x4317ea['object']()&&$gameParty['gainItem'](_0x4317ea['object'](),0x1),this[_0x4209c4(0x461)]['pop']();}while(_0x30e0fd>this['_equips'][_0x4209c4(0x22d)]){this['_equips'][_0x4209c4(0x215)](new Game_Item());}},Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x497)]=function(){const _0x1ae3d0=_0x2455b1,_0x5e519f=this[_0x1ae3d0(0x61f)]();for(let _0x3e4b5d=0x0;_0x3e4b5d<_0x5e519f[_0x1ae3d0(0x22d)];_0x3e4b5d++){if(!this[_0x1ae3d0(0x461)][_0x3e4b5d])this[_0x1ae3d0(0x461)][_0x3e4b5d]=new Game_Item();}this[_0x1ae3d0(0x4a6)](![]),this[_0x1ae3d0(0x36f)]();},VisuMZ[_0x2455b1(0x21d)]['Game_Actor_changeEquip']=Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x367)],Game_Actor['prototype'][_0x2455b1(0x367)]=function(_0x5af83c,_0x1414af){const _0x2c2f89=_0x2455b1;if(!this[_0x2c2f89(0x5cc)]){const _0x340140=JsonEx[_0x2c2f89(0x39e)](this);_0x340140[_0x2c2f89(0x5cc)]=!![],VisuMZ[_0x2c2f89(0x21d)]['Game_Actor_changeEquip'][_0x2c2f89(0x27a)](this,_0x5af83c,_0x1414af),this['equipAdjustHpMp'](_0x340140);}else{if(_0x2c2f89(0x4d6)!==_0x2c2f89(0x205))VisuMZ['ItemsEquipsCore'][_0x2c2f89(0x1d4)][_0x2c2f89(0x27a)](this,_0x5af83c,_0x1414af);else return _0x2c2f89(0x62a);}},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x3c6)]=Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x5dd)],Game_Actor['prototype'][_0x2455b1(0x5dd)]=function(_0x5750b6,_0x4f6777){const _0x315a03=_0x2455b1;if(!this[_0x315a03(0x5cc)]){if('NtjUP'!==_0x315a03(0x3fb)){const _0x6a5679=JsonEx[_0x315a03(0x39e)](this);_0x6a5679['_tempActor']=!![],VisuMZ[_0x315a03(0x21d)][_0x315a03(0x3c6)][_0x315a03(0x27a)](this,_0x5750b6,_0x4f6777),this['equipAdjustHpMp'](_0x6a5679);}else this[_0x315a03(0x4df)][_0x315a03(0x552)](this['_newItemsList'][_0x315a03(0x5ea)](_0x42172c),0x1);}else VisuMZ[_0x315a03(0x21d)][_0x315a03(0x3c6)][_0x315a03(0x27a)](this,_0x5750b6,_0x4f6777);},VisuMZ['ItemsEquipsCore']['Game_Actor_discardEquip']=Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x36b)],Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x36b)]=function(_0x43fd8c){const _0x5b6ded=_0x2455b1;if(!this[_0x5b6ded(0x5cc)]){const _0x2c2aa1=JsonEx[_0x5b6ded(0x39e)](this);_0x2c2aa1[_0x5b6ded(0x5cc)]=!![],VisuMZ[_0x5b6ded(0x21d)][_0x5b6ded(0x569)][_0x5b6ded(0x27a)](this,_0x43fd8c),this[_0x5b6ded(0x618)](_0x2c2aa1);}else VisuMZ[_0x5b6ded(0x21d)][_0x5b6ded(0x569)]['call'](this,_0x43fd8c);},Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x4a6)]=function(_0x5e575b){const _0x1029f6=_0x2455b1;if(this[_0x1029f6(0x3c0)])return;for(;;){if(_0x1029f6(0x41a)!=='FVFNY')this['cursorPagedown']();else{const _0x589795=this[_0x1029f6(0x61f)](),_0xe75795=this[_0x1029f6(0x260)](),_0x2e6237=_0xe75795[_0x1029f6(0x22d)];let _0x3e96c8=![];for(let _0x489831=0x0;_0x489831<_0x2e6237;_0x489831++){const _0x37b464=_0xe75795[_0x489831];if(_0x37b464&&(!this['canEquip'](_0x37b464)||_0x37b464['etypeId']!==_0x589795[_0x489831])){if(_0x1029f6(0x341)!==_0x1029f6(0x429)){!_0x5e575b&&this[_0x1029f6(0x39a)](null,_0x37b464);if(!this['_tempActor']){const _0x12c5ec=JsonEx[_0x1029f6(0x39e)](this);_0x12c5ec[_0x1029f6(0x5cc)]=!![],this['_equips'][_0x489831]['setObject'](null),this[_0x1029f6(0x3c0)]=!![],this[_0x1029f6(0x618)](_0x12c5ec),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=undefined;}else this[_0x1029f6(0x461)][_0x489831]['setObject'](null);_0x3e96c8=!![];}else return _0x10a635;}}if(!_0x3e96c8)break;}}},Game_Actor['prototype'][_0x2455b1(0x618)]=function(_0x5bd89e){const _0x27603a=_0x2455b1;if(this[_0x27603a(0x5cc)])return;if(!VisuMZ[_0x27603a(0x21d)][_0x27603a(0x33c)][_0x27603a(0x300)][_0x27603a(0x510)])return;const _0x47d5d2=Math[_0x27603a(0x4c4)](_0x5bd89e[_0x27603a(0x379)]()*this[_0x27603a(0x638)]),_0x59cfad=Math[_0x27603a(0x4c4)](_0x5bd89e[_0x27603a(0x639)]()*this[_0x27603a(0x30e)]);if(this['hp']>0x0)this[_0x27603a(0x285)](_0x47d5d2);if(this['mp']>0x0)this[_0x27603a(0x49c)](_0x59cfad);},Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x559)]=function(){const _0x24c140=_0x2455b1,_0x26bb60=this[_0x24c140(0x61f)]()['length'];for(let _0x40bed3=0x0;_0x40bed3<_0x26bb60;_0x40bed3++){if(this[_0x24c140(0x535)](_0x40bed3))this[_0x24c140(0x367)](_0x40bed3,null);}},Game_Actor[_0x2455b1(0x32e)]['isClearEquipOk']=function(_0x44af2c){const _0x231a2e=_0x2455b1;if(this[_0x231a2e(0x1ca)]()[_0x231a2e(0x474)](this[_0x231a2e(0x61f)]()[_0x44af2c]))return![];else{if('oNWWG'===_0x231a2e(0x4f5)){if(_0x28c6ec[_0x231a2e(0x486)]&&_0x62f15e['uiInputPosition']!==_0x40c252)return _0xa4c3d6[_0x231a2e(0x41d)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x231a2e(0x573)]()[_0x231a2e(0x3e1)](/RIGHT/i);else _0x3e663e[_0x231a2e(0x32e)][_0x231a2e(0x58e)]['call'](this);}}else return this[_0x231a2e(0x356)](_0x44af2c);}},Game_Actor[_0x2455b1(0x32e)]['nonRemovableEtypes']=function(){const _0x187f55=_0x2455b1;return VisuMZ[_0x187f55(0x21d)]['Settings']['EquipScene']['NonRemoveETypes'];},Game_Actor['prototype'][_0x2455b1(0x53e)]=function(){const _0xd3695c=_0x2455b1,_0x4b3fd1=this['equipSlots']()['length'];for(let _0xb130d6=0x0;_0xb130d6<_0x4b3fd1;_0xb130d6++){if('fPtgu'!=='lfgkf'){if(this['isOptimizeEquipOk'](_0xb130d6))this[_0xd3695c(0x367)](_0xb130d6,null);}else return![];}for(let _0x120264=0x0;_0x120264<_0x4b3fd1;_0x120264++){if(_0xd3695c(0x28f)===_0xd3695c(0x28f)){if(this[_0xd3695c(0x23b)](_0x120264))this[_0xd3695c(0x367)](_0x120264,this[_0xd3695c(0x601)](_0x120264));}else this[_0xd3695c(0x61c)]();}},Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x23b)]=function(_0x3fc52f){const _0x2e1aa0=_0x2455b1;return this[_0x2e1aa0(0x5f7)]()[_0x2e1aa0(0x474)](this[_0x2e1aa0(0x61f)]()[_0x3fc52f])?_0x2e1aa0(0x1f3)==='cZVta'?_0x35c0fe[_0x2e1aa0(0x41d)]:![]:this[_0x2e1aa0(0x356)](_0x3fc52f);},Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x5f7)]=function(){const _0xb0e755=_0x2455b1;return VisuMZ[_0xb0e755(0x21d)][_0xb0e755(0x33c)]['EquipScene']['NonOptimizeETypes'];},VisuMZ['ItemsEquipsCore'][_0x2455b1(0x554)]=Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x39a)],Game_Actor['prototype'][_0x2455b1(0x39a)]=function(_0x508dc3,_0x1122d1){const _0x4605ff=_0x2455b1;if(this[_0x4605ff(0x5cc)])return![];$gameTemp[_0x4605ff(0x5e9)]=!![];const _0x476448=VisuMZ[_0x4605ff(0x21d)][_0x4605ff(0x554)][_0x4605ff(0x27a)](this,_0x508dc3,_0x1122d1);return $gameTemp[_0x4605ff(0x5e9)]=![],_0x476448;},Game_Actor['prototype'][_0x2455b1(0x41b)]=function(_0x593621,_0x278312){const _0x441ea8=_0x2455b1,_0x10e938=this['getNextAvailableEtypeId'](_0x593621);if(_0x10e938<0x0)return;const _0x4a5c85=_0x593621===0x1?$dataWeapons[_0x278312]:$dataArmors[_0x278312];this[_0x441ea8(0x367)](_0x10e938,_0x4a5c85);},Game_Actor[_0x2455b1(0x32e)]['getNextAvailableEtypeId']=function(_0x28a88d){const _0x480bb6=_0x2455b1;let _0x55a742=0x0;const _0x6e4466=this[_0x480bb6(0x61f)](),_0x3babb8=this[_0x480bb6(0x260)]();for(let _0x16bfec=0x0;_0x16bfec<_0x6e4466[_0x480bb6(0x22d)];_0x16bfec++){if(_0x6e4466[_0x16bfec]===_0x28a88d){_0x55a742=_0x16bfec;if(!_0x3babb8[_0x16bfec])return _0x55a742;}}return _0x55a742;},VisuMZ[_0x2455b1(0x21d)]['Game_Actor_paramPlus']=Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x57b)],Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x57b)]=function(_0xf122bf){const _0x31a868=_0x2455b1;let _0x37b4cc=VisuMZ[_0x31a868(0x21d)][_0x31a868(0x567)][_0x31a868(0x27a)](this,_0xf122bf);for(const _0x54864f of this[_0x31a868(0x260)]()){if(_0x54864f)_0x37b4cc+=this['paramPlusItemsEquipsCoreCustomJS'](_0x54864f,_0xf122bf);}return _0x37b4cc;},Game_Actor[_0x2455b1(0x32e)][_0x2455b1(0x28e)]=function(_0x2af49c,_0x1951f5){const _0x508125=_0x2455b1;if(this[_0x508125(0x5c4)])return 0x0;const _0x57969e=(DataManager[_0x508125(0x456)](_0x2af49c)?'W%1':_0x508125(0x62f))[_0x508125(0x4c5)](_0x2af49c['id']),_0x57d237=_0x508125(0x364)['format'](_0x57969e,_0x1951f5);if(VisuMZ[_0x508125(0x21d)]['paramJS'][_0x57d237]){this[_0x508125(0x5c4)]=!![];const _0x22c6d9=VisuMZ[_0x508125(0x21d)][_0x508125(0x50e)][_0x57d237][_0x508125(0x27a)](this,_0x2af49c,_0x1951f5);return this[_0x508125(0x5c4)]=![],_0x22c6d9;}else return 0x0;},Game_Actor['prototype'][_0x2455b1(0x464)]=function(_0x479d2a){const _0x5dc593=_0x2455b1;this[_0x5dc593(0x54e)]=!![],this[_0x5dc593(0x293)]=_0x479d2a;},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x2b7)]=Game_Party[_0x2455b1(0x32e)][_0x2455b1(0x362)],Game_Party['prototype']['initialize']=function(){const _0x5e4eb0=_0x2455b1;VisuMZ[_0x5e4eb0(0x21d)][_0x5e4eb0(0x2b7)][_0x5e4eb0(0x27a)](this),this[_0x5e4eb0(0x35b)]();},Game_Party[_0x2455b1(0x32e)][_0x2455b1(0x35b)]=function(){const _0x2ccfcd=_0x2455b1;this[_0x2ccfcd(0x4df)]=[];},Game_Party[_0x2455b1(0x32e)][_0x2455b1(0x292)]=function(_0x3382be){const _0x581255=_0x2455b1;if(!$gameTemp[_0x581255(0x58b)]())return![];if(this[_0x581255(0x4df)]===undefined)this[_0x581255(0x35b)]();let _0x1bf814='';if(DataManager[_0x581255(0x2cf)](_0x3382be))_0x1bf814=_0x581255(0x54f)[_0x581255(0x4c5)](_0x3382be['id']);else{if(DataManager[_0x581255(0x456)](_0x3382be))_0x1bf814=_0x581255(0x472)[_0x581255(0x4c5)](_0x3382be['id']);else{if(DataManager[_0x581255(0x4c0)](_0x3382be))_0x1bf814=_0x581255(0x387)[_0x581255(0x4c5)](_0x3382be['id']);else{if(_0x581255(0x1fc)!=='tnECc')this[_0x581255(0x4b9)](),_0x4bd402[_0x581255(0x21d)][_0x581255(0x5b7)][_0x581255(0x27a)](this);else return;}}}return this[_0x581255(0x4df)]['includes'](_0x1bf814);},Game_Party[_0x2455b1(0x32e)][_0x2455b1(0x4a8)]=function(_0xf95624){const _0x102c02=_0x2455b1;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x102c02(0x4df)]===undefined)this[_0x102c02(0x35b)]();let _0x101b32='';if(DataManager['isItem'](_0xf95624))_0x101b32=_0x102c02(0x54f)[_0x102c02(0x4c5)](_0xf95624['id']);else{if(DataManager[_0x102c02(0x456)](_0xf95624)){if(_0x102c02(0x3d2)==='TBnwM')return _0x59b0fe[_0x102c02(0x4c0)](_0x1400e3)&&_0x4ec40d['atypeId']===_0x58bffe(_0x355de1['$1']);else _0x101b32=_0x102c02(0x472)[_0x102c02(0x4c5)](_0xf95624['id']);}else{if(DataManager[_0x102c02(0x4c0)](_0xf95624))_0x101b32=_0x102c02(0x387)[_0x102c02(0x4c5)](_0xf95624['id']);else return;}}if(!this[_0x102c02(0x4df)][_0x102c02(0x474)](_0x101b32))this[_0x102c02(0x4df)][_0x102c02(0x215)](_0x101b32);},Game_Party[_0x2455b1(0x32e)][_0x2455b1(0x63a)]=function(_0x384a3f){const _0x3a25e0=_0x2455b1;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x3a25e0(0x4df)]===undefined)this[_0x3a25e0(0x35b)]();let _0x3b019b='';if(DataManager[_0x3a25e0(0x2cf)](_0x384a3f))_0x3a25e0(0x435)===_0x3a25e0(0x435)?_0x3b019b='item-%1'[_0x3a25e0(0x4c5)](_0x384a3f['id']):(this[_0x3a25e0(0x2b1)][_0x3a25e0(0x1e6)]=this[_0x3a25e0(0x5a9)]['tpGain'],_0x23e294=!![]);else{if(DataManager[_0x3a25e0(0x456)](_0x384a3f))_0x3b019b=_0x3a25e0(0x472)[_0x3a25e0(0x4c5)](_0x384a3f['id']);else{if(DataManager[_0x3a25e0(0x4c0)](_0x384a3f))_0x3b019b='armor-%1'[_0x3a25e0(0x4c5)](_0x384a3f['id']);else{if(_0x3a25e0(0x1d7)===_0x3a25e0(0x218))return _0x1ef3fb[_0x3a25e0(0x21d)][_0x3a25e0(0x33c)][_0x3a25e0(0x300)][_0x3a25e0(0x1b1)];else return;}}}if(this[_0x3a25e0(0x4df)][_0x3a25e0(0x474)](_0x3b019b)){if(_0x3a25e0(0x5a1)!==_0x3a25e0(0x600))this['_newItemsList'][_0x3a25e0(0x552)](this[_0x3a25e0(0x4df)]['indexOf'](_0x3b019b),0x1);else{const _0x1d0e56=this['commandStyleCheck'](_0x357056);if(_0x1d0e56===_0x3a25e0(0x62a))this[_0x3a25e0(0x375)](_0x5e3fbc);else _0x1d0e56==='icon'?this['drawItemStyleIcon'](_0x589645):_0x3afdb2[_0x3a25e0(0x32e)][_0x3a25e0(0x47b)][_0x3a25e0(0x27a)](this,_0x3b5bd3);}}},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x1dd)]=Game_Party[_0x2455b1(0x32e)][_0x2455b1(0x4ed)],Game_Party[_0x2455b1(0x32e)][_0x2455b1(0x4ed)]=function(_0x3f9bf0,_0x281ec5,_0x1fc87d){const _0x30e1c4=_0x2455b1,_0x2465a1=this[_0x30e1c4(0x248)](_0x3f9bf0);VisuMZ[_0x30e1c4(0x21d)][_0x30e1c4(0x1dd)][_0x30e1c4(0x27a)](this,_0x3f9bf0,_0x281ec5,_0x1fc87d);if(this[_0x30e1c4(0x248)](_0x3f9bf0)>_0x2465a1)this[_0x30e1c4(0x4a8)](_0x3f9bf0);},Game_Party[_0x2455b1(0x32e)]['maxItems']=function(_0x3d310b){const _0x43c44d=_0x2455b1;return DataManager[_0x43c44d(0x26a)](_0x3d310b);},VisuMZ['ItemsEquipsCore'][_0x2455b1(0x477)]=Scene_ItemBase[_0x2455b1(0x32e)]['activateItemWindow'],Scene_ItemBase[_0x2455b1(0x32e)]['activateItemWindow']=function(){const _0x33eda9=_0x2455b1;VisuMZ[_0x33eda9(0x21d)]['Scene_ItemBase_activateItemWindow'][_0x33eda9(0x27a)](this),this['_itemWindow']['callUpdateHelp']();},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x4d3)]=function(){const _0x51e676=_0x2455b1;if(ConfigManager[_0x51e676(0x486)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x51e676(0x481)];else{if(this[_0x51e676(0x239)]()){if(_0x51e676(0x1d9)!==_0x51e676(0x1d9))_0x3cdb3e[_0x51e676(0x32e)][_0x51e676(0x256)][_0x51e676(0x27a)](this),this[_0x51e676(0x5bb)]['fontSize']=this[_0x51e676(0x2d1)]||this[_0x51e676(0x5bb)][_0x51e676(0x517)],this[_0x51e676(0x5bb)][_0x51e676(0x2b5)]=this[_0x51e676(0x612)]||this[_0x51e676(0x5bb)][_0x51e676(0x2b5)];else return this[_0x51e676(0x573)]()['match'](/LOWER/i);}else Scene_ItemBase[_0x51e676(0x32e)][_0x51e676(0x58e)][_0x51e676(0x27a)](this);}},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x58e)]=function(){const _0x44c279=_0x2455b1;if(ConfigManager[_0x44c279(0x486)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x44c279(0x41d)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x44c279(0x573)]()[_0x44c279(0x3e1)](/RIGHT/i);else Scene_ItemBase[_0x44c279(0x32e)][_0x44c279(0x58e)][_0x44c279(0x27a)](this);}},Scene_Item['prototype'][_0x2455b1(0x573)]=function(){const _0x3a26cb=_0x2455b1;return VisuMZ[_0x3a26cb(0x21d)]['Settings'][_0x3a26cb(0x212)]['LayoutStyle'];},Scene_Item['prototype'][_0x2455b1(0x35d)]=function(){const _0x2a249f=_0x2455b1;return this[_0x2a249f(0x4de)]&&this[_0x2a249f(0x4de)][_0x2a249f(0x35d)]();},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x239)]=function(){const _0x2d059a=_0x2455b1;return VisuMZ[_0x2d059a(0x21d)][_0x2d059a(0x33c)][_0x2d059a(0x212)][_0x2d059a(0x4b5)];},VisuMZ[_0x2455b1(0x21d)]['Scene_Item_create']=Scene_Item[_0x2455b1(0x32e)]['create'],Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x5c5)]=function(){const _0x3c0680=_0x2455b1;VisuMZ[_0x3c0680(0x21d)][_0x3c0680(0x30c)][_0x3c0680(0x27a)](this);if(this[_0x3c0680(0x35d)]()){if(_0x3c0680(0x4bb)!==_0x3c0680(0x4bb)){const _0x438cd7=this[_0x3c0680(0x61f)]()[_0x3c0680(0x22d)];for(let _0x110fe5=0x0;_0x110fe5<_0x438cd7;_0x110fe5++){if(this['isClearEquipOk'](_0x110fe5))this[_0x3c0680(0x367)](_0x110fe5,null);}}else this[_0x3c0680(0x52e)]();}},Scene_Item['prototype'][_0x2455b1(0x3ad)]=function(){const _0x3cf224=_0x2455b1;return this[_0x3cf224(0x239)]()?this['helpWindowRectItemsEquipsCore']():Scene_ItemBase[_0x3cf224(0x32e)][_0x3cf224(0x3ad)]['call'](this);},Scene_Item[_0x2455b1(0x32e)]['helpWindowRectItemsEquipsCore']=function(){const _0x34689a=_0x2455b1,_0x149d3c=0x0,_0x303c14=this[_0x34689a(0x5f9)](),_0x5217de=Graphics[_0x34689a(0x4ee)],_0x568b55=this[_0x34689a(0x2a8)]();return new Rectangle(_0x149d3c,_0x303c14,_0x5217de,_0x568b55);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x4ab)]=Scene_Item['prototype'][_0x2455b1(0x3ac)],Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x3ac)]=function(){const _0x268994=_0x2455b1;VisuMZ[_0x268994(0x21d)][_0x268994(0x4ab)]['call'](this),this[_0x268994(0x35d)]()&&this[_0x268994(0x5b1)]();},Scene_Item['prototype'][_0x2455b1(0x5b1)]=function(){const _0x1fcf7e=_0x2455b1;delete this['_categoryWindow'][_0x1fcf7e(0x57f)]['ok'],delete this[_0x1fcf7e(0x4de)][_0x1fcf7e(0x57f)][_0x1fcf7e(0x4fd)];},VisuMZ['ItemsEquipsCore'][_0x2455b1(0x2ce)]=Scene_Item[_0x2455b1(0x32e)]['categoryWindowRect'],Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x24d)]=function(){const _0x487b67=_0x2455b1;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x487b67(0x216)!==_0x487b67(0x216))_0x5940f3[_0x487b67(0x32e)][_0x487b67(0x2bb)][_0x487b67(0x27a)](this),this[_0x487b67(0x4de)]&&this[_0x487b67(0x4de)][_0x487b67(0x35d)]()&&this[_0x487b67(0x4de)][_0x487b67(0x2bb)]();else return this[_0x487b67(0x5ff)]();}else return _0x487b67(0x572)!==_0x487b67(0x572)?_0x33687a[_0x487b67(0x21d)]['Settings'][_0x487b67(0x300)][_0x487b67(0x1d6)]:VisuMZ[_0x487b67(0x21d)]['Scene_Item_categoryWindowRect'][_0x487b67(0x27a)](this);},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x5ff)]=function(){const _0x543c7a=_0x2455b1,_0x19688e=0x0,_0x92ff46=this[_0x543c7a(0x267)](),_0x2c3c7c=Graphics[_0x543c7a(0x4ee)],_0x3fe8d0=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x19688e,_0x92ff46,_0x2c3c7c,_0x3fe8d0);},VisuMZ['ItemsEquipsCore']['Scene_Item_createItemWindow']=Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x41f)],Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x41f)]=function(){const _0x3d1881=_0x2455b1;VisuMZ[_0x3d1881(0x21d)][_0x3d1881(0x311)][_0x3d1881(0x27a)](this),this[_0x3d1881(0x35d)]()&&('MWlmY'!==_0x3d1881(0x33e)?this[_0x3d1881(0x20b)]():this[_0x3d1881(0x622)]()),this['allowCreateStatusWindow']()&&this['createStatusWindow']();},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x57e)]=Scene_Item[_0x2455b1(0x32e)]['itemWindowRect'],Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x44b)]=function(){const _0x3f4a84=_0x2455b1;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x3f4a84(0x545)===_0x3f4a84(0x2ef))_0x422b6e[_0x3f4a84(0x32c)][_0x3f4a84(0x215)](_0x25f823['trim']());else return this[_0x3f4a84(0x3dc)]();}else{const _0x381d67=VisuMZ[_0x3f4a84(0x21d)][_0x3f4a84(0x57e)][_0x3f4a84(0x27a)](this);return this['allowCreateStatusWindow']()&&this['adjustItemWidthByStatus']()&&(_0x381d67[_0x3f4a84(0x5fb)]-=this[_0x3f4a84(0x3ea)]()),_0x381d67;}},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x3dc)]=function(){const _0x1d24c8=_0x2455b1,_0x36ba81=this[_0x1d24c8(0x58e)]()?this[_0x1d24c8(0x3ea)]():0x0,_0x536c79=this[_0x1d24c8(0x4de)]['y']+this[_0x1d24c8(0x4de)][_0x1d24c8(0x24b)],_0x1d6a98=Graphics['boxWidth']-this[_0x1d24c8(0x3ea)](),_0x5be839=this[_0x1d24c8(0x49a)]()-_0x536c79;return new Rectangle(_0x36ba81,_0x536c79,_0x1d6a98,_0x5be839);},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x20b)]=function(){const _0x226adb=_0x2455b1;this['_itemWindow'][_0x226adb(0x2b8)](_0x226adb(0x4fd),this[_0x226adb(0x286)][_0x226adb(0x506)](this));},Scene_Item[_0x2455b1(0x32e)]['allowCreateStatusWindow']=function(){const _0x23546b=_0x2455b1;if(this[_0x23546b(0x239)]())return!![];else{if(_0x23546b(0x1c5)!==_0x23546b(0x2be))return VisuMZ['ItemsEquipsCore'][_0x23546b(0x33c)][_0x23546b(0x212)][_0x23546b(0x56e)];else{const _0x20c1d7=_0x3dbe92[_0x23546b(0x398)]('['+_0x381f38['$1'][_0x23546b(0x3e1)](/\d+/g)+']');for(const _0x29c7dc of _0x20c1d7){if(!_0x36cb0e['value'](_0x29c7dc))return![];}return!![];}}},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x342)]=function(){const _0x19172a=_0x2455b1;return VisuMZ['ItemsEquipsCore']['Settings'][_0x19172a(0x212)][_0x19172a(0x516)];},Scene_Item['prototype'][_0x2455b1(0x469)]=function(){const _0x265262=_0x2455b1,_0x4fb2ec=this[_0x265262(0x59f)]();this['_statusWindow']=new Window_ShopStatus(_0x4fb2ec),this[_0x265262(0x371)](this[_0x265262(0x3b0)]),this[_0x265262(0x3e2)][_0x265262(0x3c3)](this['_statusWindow']);const _0xd0c73a=VisuMZ[_0x265262(0x21d)][_0x265262(0x33c)][_0x265262(0x212)][_0x265262(0x1f2)];this[_0x265262(0x3b0)][_0x265262(0x475)](_0xd0c73a||0x0);},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x59f)]=function(){const _0x14f43e=_0x2455b1;return this[_0x14f43e(0x239)]()?'MWiIz'!==_0x14f43e(0x3c2)?_0x3af441[_0x14f43e(0x250)]&&_0x2e098f['prototype'][_0x14f43e(0x35d)][_0x14f43e(0x27a)](this):this[_0x14f43e(0x40e)]():VisuMZ['ItemsEquipsCore'][_0x14f43e(0x33c)]['ItemScene']['ItemMenuStatusRect'][_0x14f43e(0x27a)](this);},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x40e)]=function(){const _0x4b3665=_0x2455b1,_0x12cbf7=this['statusWidth'](),_0x32ddba=this['_itemWindow'][_0x4b3665(0x24b)],_0x20e949=this[_0x4b3665(0x58e)]()?0x0:Graphics['boxWidth']-this[_0x4b3665(0x3ea)](),_0x5e5eb4=this[_0x4b3665(0x3e2)]['y'];return new Rectangle(_0x20e949,_0x5e5eb4,_0x12cbf7,_0x32ddba);},Scene_Item['prototype']['statusWidth']=function(){const _0x55d08a=_0x2455b1;return Scene_Shop[_0x55d08a(0x32e)]['statusWidth']();},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x530)]=function(){const _0x26ddce=_0x2455b1;if(!this[_0x26ddce(0x573)]())return![];if(!this[_0x26ddce(0x35d)]())return![];if(!this[_0x26ddce(0x3e2)])return![];if(!this[_0x26ddce(0x3e2)]['active'])return![];return this[_0x26ddce(0x573)]()&&this[_0x26ddce(0x35d)]();},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x49e)]=function(){const _0x21fa94=_0x2455b1;if(this[_0x21fa94(0x530)]())return this[_0x21fa94(0x3e2)]['maxCols']()===0x1?TextManager[_0x21fa94(0x2ba)](_0x21fa94(0x5a5),_0x21fa94(0x265)):TextManager[_0x21fa94(0x2ba)](_0x21fa94(0x422),'pagedown');return Scene_ItemBase['prototype'][_0x21fa94(0x49e)][_0x21fa94(0x27a)](this);},Scene_Item[_0x2455b1(0x32e)][_0x2455b1(0x42c)]=function(){const _0x19c5db=_0x2455b1;if(this[_0x19c5db(0x530)]())return VisuMZ['ItemsEquipsCore'][_0x19c5db(0x33c)][_0x19c5db(0x212)][_0x19c5db(0x380)];return Scene_ItemBase[_0x19c5db(0x32e)][_0x19c5db(0x42c)][_0x19c5db(0x27a)](this);},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x4d3)]=function(){const _0x1ef706=_0x2455b1;if(ConfigManager[_0x1ef706(0x486)]&&ConfigManager[_0x1ef706(0x481)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x1ef706(0x239)]())return this[_0x1ef706(0x573)]()[_0x1ef706(0x3e1)](/LOWER/i);else Scene_MenuBase[_0x1ef706(0x32e)][_0x1ef706(0x58e)]['call'](this);}},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x58e)]=function(){const _0x39fc7d=_0x2455b1;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x39fc7d(0x41d)]!==undefined)return ConfigManager[_0x39fc7d(0x41d)];else{if(this[_0x39fc7d(0x239)]())return this['updatedLayoutStyle']()['match'](/RIGHT/i);else Scene_MenuBase[_0x39fc7d(0x32e)][_0x39fc7d(0x58e)][_0x39fc7d(0x27a)](this);}},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x573)]=function(){const _0x5bad2e=_0x2455b1;return VisuMZ[_0x5bad2e(0x21d)][_0x5bad2e(0x33c)]['EquipScene'][_0x5bad2e(0x431)];},Scene_Equip[_0x2455b1(0x32e)]['isUseModernControls']=function(){const _0x211c64=_0x2455b1;return this['_commandWindow']&&this[_0x211c64(0x4bc)][_0x211c64(0x35d)]();},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x239)]=function(){const _0x327e20=_0x2455b1;return VisuMZ[_0x327e20(0x21d)][_0x327e20(0x33c)][_0x327e20(0x300)][_0x327e20(0x4b5)];},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x470)]=Scene_Equip['prototype'][_0x2455b1(0x5c5)],Scene_Equip[_0x2455b1(0x32e)]['create']=function(){const _0x4c4d70=_0x2455b1;VisuMZ[_0x4c4d70(0x21d)][_0x4c4d70(0x470)][_0x4c4d70(0x27a)](this),this[_0x4c4d70(0x35d)]()&&this[_0x4c4d70(0x482)]();},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x3ad)]=function(){const _0xfc181d=_0x2455b1;return this[_0xfc181d(0x239)]()?this['helpWindowRectItemsEquipsCore']():Scene_MenuBase[_0xfc181d(0x32e)][_0xfc181d(0x3ad)][_0xfc181d(0x27a)](this);},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x3bb)]=function(){const _0x591131=_0x2455b1,_0x46267f=0x0,_0x4e2b4b=this[_0x591131(0x5f9)](),_0x173d03=Graphics[_0x591131(0x4ee)],_0x341d68=this[_0x591131(0x2a8)]();return new Rectangle(_0x46267f,_0x4e2b4b,_0x173d03,_0x341d68);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x466)]=Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x59f)],Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x59f)]=function(){const _0x1368c8=_0x2455b1;if(this[_0x1368c8(0x239)]()){if(_0x1368c8(0x22f)!=='EtcZK')return this[_0x1368c8(0x40e)]();else{if(!this['isUseModernControls']())_0x402541[_0x1368c8(0x32e)][_0x1368c8(0x5d0)][_0x1368c8(0x27a)](this);}}else return VisuMZ['ItemsEquipsCore'][_0x1368c8(0x466)][_0x1368c8(0x27a)](this);},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x40e)]=function(){const _0x4fd03e=_0x2455b1,_0x494303=this[_0x4fd03e(0x58e)]()?0x0:Graphics[_0x4fd03e(0x4ee)]-this['statusWidth'](),_0x5040b5=this[_0x4fd03e(0x267)](),_0x3a277d=this[_0x4fd03e(0x3ea)](),_0x1c4cdd=this[_0x4fd03e(0x58a)]();return new Rectangle(_0x494303,_0x5040b5,_0x3a277d,_0x1c4cdd);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x49f)]=Scene_Equip['prototype'][_0x2455b1(0x1db)],Scene_Equip['prototype'][_0x2455b1(0x1db)]=function(){const _0x3e9540=_0x2455b1;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x3e9540(0x3ff)===_0x3e9540(0x5d8))this[_0x3e9540(0x45c)][_0x3e9540(0x208)](),this[_0x3e9540(0x4bc)][_0x3e9540(0x208)]();else return this['commandWindowRectItemsEquipsCore']();}else{if(_0x3e9540(0x2f4)===_0x3e9540(0x28c)){const _0x425cec=this[_0x3e9540(0x3ea)](),_0x40cb41=this['mainAreaHeight']()-this['_commandWindow'][_0x3e9540(0x24b)],_0x57e278=this[_0x3e9540(0x58e)]()?0x0:_0x48efc6['boxWidth']-_0x425cec,_0x434216=this[_0x3e9540(0x4bc)]['y']+this[_0x3e9540(0x4bc)][_0x3e9540(0x24b)];return new _0x129044(_0x57e278,_0x434216,_0x425cec,_0x40cb41);}else return VisuMZ['ItemsEquipsCore'][_0x3e9540(0x49f)][_0x3e9540(0x27a)](this);}},Scene_Equip['prototype'][_0x2455b1(0x213)]=function(){const _0x174b38=_0x2455b1,_0x180bb3=VisuMZ[_0x174b38(0x21d)][_0x174b38(0x33c)][_0x174b38(0x300)];return _0x180bb3[_0x174b38(0x608)]||_0x180bb3['CommandAddClear'];},Scene_Equip[_0x2455b1(0x32e)]['commandWindowRectItemsEquipsCore']=function(){const _0x25cba8=_0x2455b1,_0x1bdc60=this[_0x25cba8(0x213)](),_0x140043=this[_0x25cba8(0x58e)]()?this['statusWidth']():0x0,_0x13bf1c=this['mainAreaTop'](),_0x4aaf6f=Graphics[_0x25cba8(0x4ee)]-this[_0x25cba8(0x3ea)](),_0x12a994=_0x1bdc60?this[_0x25cba8(0x521)](0x1,!![]):0x0;return new Rectangle(_0x140043,_0x13bf1c,_0x4aaf6f,_0x12a994);},VisuMZ[_0x2455b1(0x21d)]['Scene_Equip_createSlotWindow']=Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x553)],Scene_Equip['prototype'][_0x2455b1(0x553)]=function(){const _0x599dbf=_0x2455b1;VisuMZ['ItemsEquipsCore'][_0x599dbf(0x55c)]['call'](this),this[_0x599dbf(0x35d)]()&&this[_0x599dbf(0x61c)]();},VisuMZ['ItemsEquipsCore'][_0x2455b1(0x236)]=Scene_Equip[_0x2455b1(0x32e)]['slotWindowRect'],Scene_Equip['prototype']['slotWindowRect']=function(){const _0x2eb420=_0x2455b1;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['slotWindowRectItemsEquipsCore']();else{if(_0x2eb420(0x5ac)===_0x2eb420(0x5ac))return VisuMZ['ItemsEquipsCore']['Scene_Equip_slotWindowRect'][_0x2eb420(0x27a)](this);else this[_0x2eb420(0x3e2)][_0x2eb420(0x2e2)](this[_0x2eb420(0x408)]());}},Scene_Equip[_0x2455b1(0x32e)]['slotWindowRectItemsEquipsCore']=function(){const _0x13d3e0=_0x2455b1,_0x16e5bb=this['commandWindowRect'](),_0x54ca91=this[_0x13d3e0(0x58e)]()?this['statusWidth']():0x0,_0x12196d=_0x16e5bb['y']+_0x16e5bb[_0x13d3e0(0x24b)],_0x2f1ac1=Graphics[_0x13d3e0(0x4ee)]-this[_0x13d3e0(0x3ea)](),_0x4b361a=this[_0x13d3e0(0x58a)]()-_0x16e5bb[_0x13d3e0(0x24b)];return new Rectangle(_0x54ca91,_0x12196d,_0x2f1ac1,_0x4b361a);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x46a)]=Scene_Equip[_0x2455b1(0x32e)]['itemWindowRect'],Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x44b)]=function(){const _0x42a624=_0x2455b1;return this['isUseItemsEquipsCoreUpdatedLayout']()?_0x42a624(0x432)==='WTVeh'?this[_0x42a624(0x20a)]():this['_item'][_0x42a624(0x3d0)]:VisuMZ[_0x42a624(0x21d)]['Scene_Equip_itemWindowRect'][_0x42a624(0x27a)](this);},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x3ea)]=function(){const _0x17eb42=_0x2455b1;if(this[_0x17eb42(0x239)]()){if(_0x17eb42(0x413)!==_0x17eb42(0x2e1))return this[_0x17eb42(0x423)]();else{const _0x5d35b5=_0x1c95a6[_0x17eb42(0x39e)](this);_0x5d35b5[_0x17eb42(0x5cc)]=!![],_0x444f7d['ItemsEquipsCore']['Game_Actor_discardEquip']['call'](this,_0x4062a1),this[_0x17eb42(0x618)](_0x5d35b5);}}else return VisuMZ[_0x17eb42(0x21d)][_0x17eb42(0x33c)][_0x17eb42(0x300)][_0x17eb42(0x2d0)];},Scene_Equip[_0x2455b1(0x32e)]['geUpdatedLayoutStatusWidth']=function(){const _0x26e73e=_0x2455b1;return Math[_0x26e73e(0x637)](Graphics['boxWidth']/0x2);},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x61c)]=function(){const _0x40d2ad=_0x2455b1;this[_0x40d2ad(0x576)]['setHandler'](_0x40d2ad(0x4fd),this['popScene']['bind'](this)),this[_0x40d2ad(0x576)][_0x40d2ad(0x2b8)](_0x40d2ad(0x4d5),this['nextActor'][_0x40d2ad(0x506)](this)),this['_slotWindow']['setHandler'](_0x40d2ad(0x422),this[_0x40d2ad(0x2ab)][_0x40d2ad(0x506)](this));},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x2aa)]=Scene_Equip['prototype']['commandEquip'],Scene_Equip[_0x2455b1(0x32e)]['commandEquip']=function(){const _0x24f3b2=_0x2455b1;this[_0x24f3b2(0x35d)]()&&(_0x24f3b2(0x543)!==_0x24f3b2(0x543)?_0x3c83c9[_0x24f3b2(0x4f2)]():(this[_0x24f3b2(0x4bc)][_0x24f3b2(0x4a4)](),this[_0x24f3b2(0x4bc)]['deactivate']())),VisuMZ[_0x24f3b2(0x21d)][_0x24f3b2(0x2aa)][_0x24f3b2(0x27a)](this);},VisuMZ['ItemsEquipsCore']['Scene_Equip_onSlotOk']=Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x2c1)],Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x2c1)]=function(){const _0x10cb38=_0x2455b1;this[_0x10cb38(0x576)][_0x10cb38(0x5fe)]()>=0x0?_0x10cb38(0x25c)===_0x10cb38(0x25c)?(VisuMZ['ItemsEquipsCore'][_0x10cb38(0x30a)]['call'](this),this[_0x10cb38(0x1ff)]()):(_0xa9a8be['ItemsEquipsCore'][_0x10cb38(0x477)][_0x10cb38(0x27a)](this),this[_0x10cb38(0x3e2)][_0x10cb38(0x425)]()):(this[_0x10cb38(0x576)][_0x10cb38(0x3a7)](0x0),this['_slotWindow']['activate']());},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x1ff)]=function(){const _0x38118d=_0x2455b1;this[_0x38118d(0x3e2)][_0x38118d(0x36f)]();const _0x47ee9e=this[_0x38118d(0x576)]['item'](),_0x3bc758=this[_0x38118d(0x3e2)][_0x38118d(0x5af)][_0x38118d(0x5ea)](_0x47ee9e),_0x24c84d=Math[_0x38118d(0x637)](this['_itemWindow']['maxVisibleItems']()/0x2)-0x1;this['_itemWindow'][_0x38118d(0x3a7)](_0x3bc758>=0x0?_0x3bc758:0x0),this[_0x38118d(0x3e2)]['setTopRow'](this[_0x38118d(0x3e2)]['index']()-_0x24c84d);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x607)]=Scene_Equip[_0x2455b1(0x32e)]['onSlotCancel'],Scene_Equip['prototype'][_0x2455b1(0x5d4)]=function(){const _0x40bb5b=_0x2455b1;VisuMZ[_0x40bb5b(0x21d)][_0x40bb5b(0x607)][_0x40bb5b(0x27a)](this),this[_0x40bb5b(0x35d)]()&&(this[_0x40bb5b(0x4bc)][_0x40bb5b(0x3a7)](0x0),this['_slotWindow'][_0x40bb5b(0x2bb)]());},VisuMZ['ItemsEquipsCore'][_0x2455b1(0x2c6)]=Scene_Equip[_0x2455b1(0x32e)]['onActorChange'],Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x2a4)]=function(){const _0x5a1592=_0x2455b1;VisuMZ[_0x5a1592(0x21d)][_0x5a1592(0x2c6)][_0x5a1592(0x27a)](this);if(this[_0x5a1592(0x35d)]()){if(_0x5a1592(0x5cd)!==_0x5a1592(0x399))this['_commandWindow']['deactivate'](),this['_commandWindow'][_0x5a1592(0x4a4)](),this['_slotWindow'][_0x5a1592(0x3a7)](0x0),this[_0x5a1592(0x576)]['activate']();else{const _0x1afe6e=_0x3e04be[_0x5a1592(0x398)]('['+_0x3f9951['$1']['match'](/\d+/g)+']');for(const _0x4a31d5 of _0x1afe6e){if(_0x1e50a9[_0x5a1592(0x346)](_0x4a31d5))return![];}return!![];}}},Scene_Equip['prototype'][_0x2455b1(0x345)]=function(){const _0x201863=_0x2455b1;if(!this[_0x201863(0x576)])return![];if(!this[_0x201863(0x576)]['active'])return![];return this['_slotWindow']['isShiftRemoveShortcutEnabled']();},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x541)]=function(){const _0x19ef6d=_0x2455b1;if(this[_0x19ef6d(0x345)]())return TextManager['getInputButtonString'](_0x19ef6d(0x36c));return Scene_MenuBase[_0x19ef6d(0x32e)][_0x19ef6d(0x541)][_0x19ef6d(0x27a)](this);},Scene_Equip[_0x2455b1(0x32e)]['buttonAssistText3']=function(){const _0x24d167=_0x2455b1;if(this[_0x24d167(0x345)]())return VisuMZ['ItemsEquipsCore'][_0x24d167(0x33c)][_0x24d167(0x300)][_0x24d167(0x56b)];return Scene_MenuBase[_0x24d167(0x32e)][_0x24d167(0x1e8)]['call'](this);},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x3b9)]=function(){const _0x435ad3=_0x2455b1;if(this['buttonAssistSlotWindowShift']())return'xMEUF'!==_0x435ad3(0x2bf)?this[_0x435ad3(0x239)]()?this[_0x435ad3(0x5ff)]():_0x5418e7[_0x435ad3(0x21d)]['Scene_Item_categoryWindowRect'][_0x435ad3(0x27a)](this):this[_0x435ad3(0x1b6)]['width']/0x5/-0x3;return Scene_MenuBase[_0x435ad3(0x32e)]['buttonAssistOffset3'][_0x435ad3(0x27a)](this);},Scene_Equip[_0x2455b1(0x32e)][_0x2455b1(0x286)]=function(){const _0x3129a2=_0x2455b1;SceneManager[_0x3129a2(0x4f2)]();},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x23d)]=Scene_Load[_0x2455b1(0x32e)]['reloadMapIfUpdated'],Scene_Load[_0x2455b1(0x32e)][_0x2455b1(0x200)]=function(){const _0x327d68=_0x2455b1;VisuMZ[_0x327d68(0x21d)][_0x327d68(0x23d)]['call'](this),this[_0x327d68(0x2cb)]();},Scene_Load['prototype'][_0x2455b1(0x2cb)]=function(){const _0x2dec56=_0x2455b1;if($gameSystem[_0x2dec56(0x407)]()!==$dataSystem[_0x2dec56(0x407)])for(const _0x3b0c1d of $gameActors[_0x2dec56(0x5af)]){if(_0x3b0c1d)_0x3b0c1d[_0x2dec56(0x497)]();}},Scene_Shop['prototype']['isBottomHelpMode']=function(){const _0x4fcc9c=_0x2455b1;if(ConfigManager[_0x4fcc9c(0x486)]&&ConfigManager[_0x4fcc9c(0x481)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return _0x4fcc9c(0x4da)===_0x4fcc9c(0x1bf)?_0x4fcc9c(0x62a):this['updatedLayoutStyle']()[_0x4fcc9c(0x3e1)](/LOWER/i);else{if(_0x4fcc9c(0x451)!==_0x4fcc9c(0x451))return _0x28dfe8[_0x4fcc9c(0x32e)][_0x4fcc9c(0x3ad)]['call'](this);else Scene_MenuBase[_0x4fcc9c(0x32e)][_0x4fcc9c(0x58e)][_0x4fcc9c(0x27a)](this);}}},Scene_Shop[_0x2455b1(0x32e)]['isRightInputMode']=function(){const _0x361d36=_0x2455b1;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x361d36(0x41d)];else{if(this[_0x361d36(0x239)]())return this[_0x361d36(0x573)]()[_0x361d36(0x3e1)](/RIGHT/i);else Scene_MenuBase[_0x361d36(0x32e)][_0x361d36(0x58e)][_0x361d36(0x27a)](this);}},Scene_Shop[_0x2455b1(0x32e)]['updatedLayoutStyle']=function(){const _0x32154c=_0x2455b1;return VisuMZ[_0x32154c(0x21d)][_0x32154c(0x33c)][_0x32154c(0x586)]['LayoutStyle'];},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x35d)]=function(){const _0x3f1cea=_0x2455b1;return this['_categoryWindow']&&this[_0x3f1cea(0x4de)][_0x3f1cea(0x35d)]();},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x239)]=function(){const _0x2cf530=_0x2455b1;return VisuMZ[_0x2cf530(0x21d)][_0x2cf530(0x33c)][_0x2cf530(0x586)][_0x2cf530(0x4b5)];},VisuMZ[_0x2455b1(0x21d)]['Scene_Shop_prepare']=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x44a)],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x44a)]=function(_0x1f5239,_0x4d4062){const _0xd6c980=_0x2455b1;_0x1f5239=JsonEx[_0xd6c980(0x39e)](_0x1f5239),VisuMZ[_0xd6c980(0x21d)][_0xd6c980(0x1f4)][_0xd6c980(0x27a)](this,_0x1f5239,_0x4d4062),this[_0xd6c980(0x438)]();},Scene_Shop['prototype'][_0x2455b1(0x438)]=function(){const _0x9da5f6=_0x2455b1;this[_0x9da5f6(0x2f5)]=0x0;for(const _0x2edaf9 of this['_goods']){this[_0x9da5f6(0x2cd)](_0x2edaf9)?this[_0x9da5f6(0x2f5)]++:_0x2edaf9[0x0]=-0x1;}},Scene_Shop['prototype'][_0x2455b1(0x2cd)]=function(_0x2ae5e8){const _0x78a53=_0x2455b1;if(_0x2ae5e8[0x0]>0x2||_0x2ae5e8[0x0]<0x0)return![];const _0x5ba288=[$dataItems,$dataWeapons,$dataArmors][_0x2ae5e8[0x0]][_0x2ae5e8[0x1]];if(!_0x5ba288)return![];const _0x55cfc8=_0x5ba288[_0x78a53(0x3c8)]||'';if(_0x55cfc8[_0x78a53(0x3e1)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('nWgnq'!==_0x78a53(0x21c))return this['categoryWindowRectItemsEquipsCore']();else{const _0xa4227c=JSON[_0x78a53(0x398)]('['+RegExp['$1'][_0x78a53(0x3e1)](/\d+/g)+']');for(const _0x5ac27a of _0xa4227c){if(!$gameSwitches[_0x78a53(0x346)](_0x5ac27a))return![];}return!![];}}if(_0x55cfc8[_0x78a53(0x3e1)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4edcef=JSON['parse']('['+RegExp['$1'][_0x78a53(0x3e1)](/\d+/g)+']');for(const _0x4d5409 of _0x4edcef){if(!$gameSwitches[_0x78a53(0x346)](_0x4d5409))return![];}return!![];}if(_0x55cfc8['match'](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x78a53(0x3b3)!==_0x78a53(0x1e3)){const _0x56ecf2=JSON[_0x78a53(0x398)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5d26d3 of _0x56ecf2){if($gameSwitches[_0x78a53(0x346)](_0x5d26d3))return!![];}return![];}else{const _0x1f1cb0=_0xc8ed0d[_0x78a53(0x21d)]['Settings'][_0x78a53(0x4a3)]['FontColor'];return _0x1f1cb0[_0x78a53(0x3e1)](/#(.*)/i)?'#'+_0x5b9fac(_0x2aa46a['$1']):_0x27a521['textColor'](_0x1f1cb0);}}if(_0x55cfc8[_0x78a53(0x3e1)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x78a53(0x22a)!=='acLls')_0x28636a=_0x5c12b4+_0x3ef8f7-_0x400fcd['width'];else{const _0x2ea666=JSON[_0x78a53(0x398)]('['+RegExp['$1'][_0x78a53(0x3e1)](/\d+/g)+']');for(const _0x29a73c of _0x2ea666){if(!$gameSwitches['value'](_0x29a73c))return!![];}return![];}}if(_0x55cfc8[_0x78a53(0x3e1)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x403a7d=JSON[_0x78a53(0x398)]('['+RegExp['$1'][_0x78a53(0x3e1)](/\d+/g)+']');for(const _0x4528e8 of _0x403a7d){if(_0x78a53(0x238)===_0x78a53(0x54b)){if(_0x33d6a8[_0x78a53(0x3e1)](_0x33f24f[_0x78a53(0x21d)][_0x78a53(0x1fb)][_0x78a53(0x602)][_0xadfaf5])){const _0x9f69a9=_0x78a53(0x364)[_0x78a53(0x4c5)](_0x168e26,_0x255ed7);_0x1b3e7c[_0x78a53(0x21d)][_0x78a53(0x50e)][_0x9f69a9]=new _0x468e0c(_0x78a53(0x27d),_0x78a53(0x578),_0x483185);}}else{if(!$gameSwitches[_0x78a53(0x346)](_0x4528e8))return!![];}}return![];}if(_0x55cfc8[_0x78a53(0x3e1)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x78a53(0x1c1)!==_0x78a53(0x476)){const _0x49a126=JSON['parse']('['+RegExp['$1'][_0x78a53(0x3e1)](/\d+/g)+']');for(const _0x14e64f of _0x49a126){if('riupK'===_0x78a53(0x222))return _0x3381fa[_0x78a53(0x21d)][_0x78a53(0x33c)]['ItemScene'][_0x78a53(0x431)];else{if($gameSwitches[_0x78a53(0x346)](_0x14e64f))return![];}}return!![];}else return _0x4c7cf7[_0x78a53(0x21d)][_0x78a53(0x22e)][_0x78a53(0x27a)](this,_0x56643f);}return!![];},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x47e)]=Scene_Shop['prototype'][_0x2455b1(0x5c5)],Scene_Shop[_0x2455b1(0x32e)]['create']=function(){const _0x2a8e79=_0x2455b1;VisuMZ['ItemsEquipsCore'][_0x2a8e79(0x47e)]['call'](this),this[_0x2a8e79(0x239)]()&&(_0x2a8e79(0x566)!==_0x2a8e79(0x402)?this[_0x2a8e79(0x363)]():_0x192097[_0x2a8e79(0x39d)]['constructor']===_0x14e3a2&&(this[_0x2a8e79(0x4b6)]=_0x468686[_0x2a8e79(0x39d)][_0x2a8e79(0x28b)]())),this['resetShopSwitches']();},Scene_Shop[_0x2455b1(0x32e)]['postCreateItemsEquipsCore']=function(){const _0x15871a=_0x2455b1;this[_0x15871a(0x2d8)][_0x15871a(0x208)](),this[_0x15871a(0x45c)][_0x15871a(0x2d6)](),this['_buyWindow'][_0x15871a(0x4a4)](),this[_0x15871a(0x3b0)][_0x15871a(0x2d6)]();},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x3ad)]=function(){const _0x4ad88a=_0x2455b1;if(this[_0x4ad88a(0x239)]()){if('Vkcjr'!==_0x4ad88a(0x5a2))return this[_0x4ad88a(0x3bb)]();else this[_0x4ad88a(0x2a0)](_0x417fba,_0x44853a['x']+_0x2bbc79[_0x4ad88a(0x5fb)]-_0x189462,_0x204085['y'],_0x13376c);}else{if('Eaikn'!==_0x4ad88a(0x54d))return Scene_MenuBase[_0x4ad88a(0x32e)][_0x4ad88a(0x3ad)][_0x4ad88a(0x27a)](this);else this[_0x4ad88a(0x4bc)][_0x4ad88a(0x2bb)](),this[_0x4ad88a(0x4bc)][_0x4ad88a(0x4a4)](),this['_slotWindow'][_0x4ad88a(0x3a7)](0x0),this[_0x4ad88a(0x576)]['activate']();}},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x3bb)]=function(){const _0x2c8855=_0x2455b1,_0x4b2d93=0x0,_0x5aedf2=this[_0x2c8855(0x5f9)](),_0x5082fc=Graphics[_0x2c8855(0x4ee)],_0x1f1209=this[_0x2c8855(0x2a8)]();return new Rectangle(_0x4b2d93,_0x5aedf2,_0x5082fc,_0x1f1209);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x5aa)]=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x4eb)],Scene_Shop['prototype'][_0x2455b1(0x4eb)]=function(){const _0x37e9d5=_0x2455b1;if(this[_0x37e9d5(0x239)]()){if(_0x37e9d5(0x31c)===_0x37e9d5(0x31c))return this[_0x37e9d5(0x365)]();else{const _0x17b71f=_0x41f1fc[_0x37e9d5(0x21d)]['Scene_Item_itemWindowRect'][_0x37e9d5(0x27a)](this);return this[_0x37e9d5(0x21a)]()&&this['adjustItemWidthByStatus']()&&(_0x17b71f[_0x37e9d5(0x5fb)]-=this[_0x37e9d5(0x3ea)]()),_0x17b71f;}}else return _0x37e9d5(0x3a4)==='WqOzb'?this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x37e9d5(0x3bb)]():_0x10a5c1[_0x37e9d5(0x32e)][_0x37e9d5(0x3ad)][_0x37e9d5(0x27a)](this):VisuMZ[_0x37e9d5(0x21d)][_0x37e9d5(0x5aa)][_0x37e9d5(0x27a)](this);},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x365)]=function(){const _0xbe9f16=_0x2455b1,_0x5098a2=this[_0xbe9f16(0x3e5)](),_0x4e3b84=this[_0xbe9f16(0x521)](0x1,!![]),_0x458a61=this[_0xbe9f16(0x58e)]()?0x0:Graphics[_0xbe9f16(0x4ee)]-_0x5098a2,_0x281bae=this[_0xbe9f16(0x267)]();return new Rectangle(_0x458a61,_0x281bae,_0x5098a2,_0x4e3b84);},VisuMZ[_0x2455b1(0x21d)]['Scene_Shop_commandWindowRect']=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x1db)],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x1db)]=function(){const _0x3f7498=_0x2455b1;if(this[_0x3f7498(0x239)]())return this[_0x3f7498(0x587)]();else{if(_0x3f7498(0x2c4)===_0x3f7498(0x2c7))this[_0x3f7498(0x39a)](null,_0xef26fd);else return VisuMZ[_0x3f7498(0x21d)]['Scene_Shop_commandWindowRect'][_0x3f7498(0x27a)](this);}},Scene_Shop['prototype']['commandWindowRectItemsEquipsCore']=function(){const _0x8d4b1b=_0x2455b1,_0x180c19=this[_0x8d4b1b(0x58e)]()?this[_0x8d4b1b(0x3e5)]():0x0,_0x3faa6b=this[_0x8d4b1b(0x267)](),_0x4e8031=Graphics[_0x8d4b1b(0x4ee)]-this[_0x8d4b1b(0x3e5)](),_0x9bc28=this[_0x8d4b1b(0x521)](0x1,!![]);return new Rectangle(_0x180c19,_0x3faa6b,_0x4e8031,_0x9bc28);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x5c3)]=Scene_Shop['prototype']['numberWindowRect'],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x2f8)]=function(){const _0x1db603=_0x2455b1;if(this[_0x1db603(0x239)]()){if(_0x1db603(0x3a6)==='rPjHl'){if(!_0x20fef8[_0x1db603(0x346)](_0x320c41))return![];}else return this['numberWindowRectItemsEquipsCore']();}else return VisuMZ[_0x1db603(0x21d)][_0x1db603(0x5c3)][_0x1db603(0x27a)](this);},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x5b2)]=function(){const _0x37d4c4=_0x2455b1,_0x48d20c=this[_0x37d4c4(0x4bc)]['y']+this[_0x37d4c4(0x4bc)]['height'],_0x1a7acb=Graphics[_0x37d4c4(0x4ee)]-this['statusWidth'](),_0x3c27f9=this[_0x37d4c4(0x58e)]()?Graphics[_0x37d4c4(0x4ee)]-_0x1a7acb:0x0,_0x578c7b=this[_0x37d4c4(0x58a)]()-this['_commandWindow']['height'];return new Rectangle(_0x3c27f9,_0x48d20c,_0x1a7acb,_0x578c7b);},VisuMZ[_0x2455b1(0x21d)]['Scene_Shop_statusWindowRect']=Scene_Shop['prototype'][_0x2455b1(0x59f)],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x59f)]=function(){const _0x584078=_0x2455b1;if(this[_0x584078(0x239)]()){if(_0x584078(0x1ad)==='ssyON'){this[_0x584078(0x256)]();const _0x120169=_0x3304ef[_0x584078(0x21d)]['Settings']['ItemScene'],_0x1ad1e1=_0x120169[_0x584078(0x577)],_0x2202c0=_0x1ad1e1[_0x584078(0x4c5)](_0x43eebd[_0x584078(0x248)](_0x51cc2f));this['contents'][_0x584078(0x517)]=_0x120169[_0x584078(0x333)],this[_0x584078(0x442)](_0x2202c0,_0x565046,_0x44bfe2,_0x7a265b,_0x584078(0x265)),this['resetFontSettings']();}else return this['statusWindowRectItemsEquipsCore']();}else{if('eBCCy'!==_0x584078(0x536))return VisuMZ['ItemsEquipsCore'][_0x584078(0x3cb)]['call'](this);else{const _0x3fc4f1=_0x754067[_0x584078(0x224)];this['drawText'](_0x3fc4f1,_0x24b89d,_0x38c9a3,_0x1dcd7c,_0x584078(0x5b8));}}},Scene_Shop[_0x2455b1(0x32e)]['statusWindowRectItemsEquipsCore']=function(){const _0x2e692d=_0x2455b1,_0x716534=this[_0x2e692d(0x3ea)](),_0x268928=this[_0x2e692d(0x58a)]()-this['_commandWindow'][_0x2e692d(0x24b)],_0x2e92b6=this[_0x2e692d(0x58e)]()?0x0:Graphics[_0x2e692d(0x4ee)]-_0x716534,_0x377e75=this[_0x2e692d(0x4bc)]['y']+this[_0x2e692d(0x4bc)][_0x2e692d(0x24b)];return new Rectangle(_0x2e92b6,_0x377e75,_0x716534,_0x268928);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x615)]=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x3af)],Scene_Shop['prototype'][_0x2455b1(0x3af)]=function(){const _0x56978f=_0x2455b1;if(this[_0x56978f(0x239)]()){if(_0x56978f(0x507)!==_0x56978f(0x310))return this[_0x56978f(0x378)]();else this['createStatusWindow']();}else{if(_0x56978f(0x30b)!==_0x56978f(0x30b))_0x240a15[_0x56978f(0x32e)][_0x56978f(0x51b)]['call'](this),this[_0x56978f(0x5db)]();else return VisuMZ[_0x56978f(0x21d)][_0x56978f(0x615)][_0x56978f(0x27a)](this);}},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x378)]=function(){const _0x2d3808=_0x2455b1,_0x78441c=this[_0x2d3808(0x4bc)]['y']+this['_commandWindow'][_0x2d3808(0x24b)],_0x414383=Graphics[_0x2d3808(0x4ee)]-this[_0x2d3808(0x3ea)](),_0x4ca481=this[_0x2d3808(0x58a)]()-this[_0x2d3808(0x4bc)]['height'],_0x2459a4=this[_0x2d3808(0x58e)]()?Graphics['boxWidth']-_0x414383:0x0;return new Rectangle(_0x2459a4,_0x78441c,_0x414383,_0x4ca481);},VisuMZ[_0x2455b1(0x21d)]['Scene_Shop_createCategoryWindow']=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x3ac)],Scene_Shop[_0x2455b1(0x32e)]['createCategoryWindow']=function(){const _0x3a4646=_0x2455b1;VisuMZ[_0x3a4646(0x21d)][_0x3a4646(0x4dd)][_0x3a4646(0x27a)](this),this[_0x3a4646(0x35d)]()&&('eYDiU'!==_0x3a4646(0x418)?this[_0x3a4646(0x2a0)](_0x565382,_0x4d0b93['x']+_0x3900f6[_0x3a4646(0x5fb)]-_0xd00e07,_0x579852['y'],_0x5dfbb2):this['postCreateCategoryWindowItemsEquipsCore']());},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x4a9)]=Scene_Shop['prototype'][_0x2455b1(0x24d)],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x24d)]=function(){const _0x291f39=_0x2455b1;return this[_0x291f39(0x239)]()?_0x291f39(0x303)!=='ovPrY'?this[_0x291f39(0x5ff)]():this[_0x291f39(0x239)]()?this[_0x291f39(0x3bb)]():_0x2512a2[_0x291f39(0x32e)][_0x291f39(0x3ad)]['call'](this):VisuMZ[_0x291f39(0x21d)]['Scene_Shop_categoryWindowRect'][_0x291f39(0x27a)](this);},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x5ff)]=function(){const _0x39aebf=_0x2455b1,_0xeaf388=this['_commandWindow']['y'],_0x2afc19=this[_0x39aebf(0x4bc)][_0x39aebf(0x5fb)],_0x81d098=this[_0x39aebf(0x521)](0x1,!![]),_0xe64365=this['isRightInputMode']()?Graphics[_0x39aebf(0x4ee)]-_0x2afc19:0x0;return new Rectangle(_0xe64365,_0xeaf388,_0x2afc19,_0x81d098);},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x5b1)]=function(){const _0x2149f4=_0x2455b1;delete this[_0x2149f4(0x4de)][_0x2149f4(0x57f)]['ok'],delete this['_categoryWindow'][_0x2149f4(0x57f)][_0x2149f4(0x4fd)];},VisuMZ['ItemsEquipsCore']['Scene_Shop_createSellWindow']=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x424)],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x424)]=function(){const _0x12d712=_0x2455b1;VisuMZ[_0x12d712(0x21d)][_0x12d712(0x27e)][_0x12d712(0x27a)](this),this[_0x12d712(0x239)]()&&(_0x12d712(0x60c)==='sWXvp'?(_0x2cde68['ItemsEquipsCore'][_0x12d712(0x33c)][_0x12d712(0x300)][_0x12d712(0x233)][_0x12d712(0x27a)](this),this[_0x12d712(0x568)]()):this[_0x12d712(0x549)]());},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x347)]=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x468)],Scene_Shop[_0x2455b1(0x32e)]['sellWindowRect']=function(){const _0x4c43eb=_0x2455b1;return this[_0x4c43eb(0x239)]()?this[_0x4c43eb(0x273)]():VisuMZ[_0x4c43eb(0x21d)][_0x4c43eb(0x347)][_0x4c43eb(0x27a)](this);},Scene_Shop[_0x2455b1(0x32e)]['sellWindowRectItemsEquipsCore']=function(){const _0x4c026e=_0x2455b1,_0x357a8f=this[_0x4c026e(0x4de)]['y']+this[_0x4c026e(0x4de)][_0x4c026e(0x24b)],_0x2bdc07=Graphics[_0x4c026e(0x4ee)]-this[_0x4c026e(0x3ea)](),_0x1a29df=this[_0x4c026e(0x58a)]()-this['_categoryWindow'][_0x4c026e(0x24b)],_0x27f1b0=this[_0x4c026e(0x58e)]()?Graphics[_0x4c026e(0x4ee)]-_0x2bdc07:0x0;return new Rectangle(_0x27f1b0,_0x357a8f,_0x2bdc07,_0x1a29df);},Scene_Shop['prototype'][_0x2455b1(0x549)]=function(){const _0x4a7377=_0x2455b1;this['_sellWindow'][_0x4a7377(0x3c3)](this[_0x4a7377(0x3b0)]);},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x3ea)]=function(){const _0x598f3f=_0x2455b1;return VisuMZ[_0x598f3f(0x21d)][_0x598f3f(0x33c)]['StatusWindow'][_0x598f3f(0x338)];},VisuMZ[_0x2455b1(0x21d)]['Scene_Shop_activateSellWindow']=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x1be)],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x1be)]=function(){const _0x10d11e=_0x2455b1;VisuMZ[_0x10d11e(0x21d)][_0x10d11e(0x63e)][_0x10d11e(0x27a)](this),this[_0x10d11e(0x239)]()&&(_0x10d11e(0x4e4)!==_0x10d11e(0x4e4)?this[_0x10d11e(0x375)](_0x406644):this['_statusWindow'][_0x10d11e(0x2d6)]()),this[_0x10d11e(0x484)][_0x10d11e(0x564)]();},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x56a)]=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x382)],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x382)]=function(){const _0x4a435c=_0x2455b1;VisuMZ[_0x4a435c(0x21d)][_0x4a435c(0x56a)]['call'](this),this[_0x4a435c(0x239)]()&&this[_0x4a435c(0x616)]();},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x616)]=function(){const _0x26365e=_0x2455b1;this[_0x26365e(0x2a7)]=this[_0x26365e(0x2a7)]||0x0,this[_0x26365e(0x45c)][_0x26365e(0x3a7)](this[_0x26365e(0x2a7)]);},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x4a2)]=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x5f6)],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x5f6)]=function(){const _0x570d9c=_0x2455b1;VisuMZ[_0x570d9c(0x21d)][_0x570d9c(0x4a2)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x570d9c(0x3b5)](),this[_0x570d9c(0x35d)]()&&(this[_0x570d9c(0x4de)][_0x570d9c(0x3a7)](0x0),this[_0x570d9c(0x52e)]());},Scene_Shop[_0x2455b1(0x32e)]['commandSellItemsEquipsCore']=function(){const _0xbc6fce=_0x2455b1;this[_0xbc6fce(0x45c)][_0xbc6fce(0x208)](),this[_0xbc6fce(0x4bc)][_0xbc6fce(0x208)]();},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x1e5)]=Scene_Shop[_0x2455b1(0x32e)]['onBuyCancel'],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x60f)]=function(){const _0xabc5fb=_0x2455b1;VisuMZ['ItemsEquipsCore']['Scene_Shop_onBuyCancel']['call'](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0xabc5fb(0x328)!==_0xabc5fb(0x328))return this[_0xabc5fb(0x3a0)]?this[_0xabc5fb(0x3e8)]():0x4;else this[_0xabc5fb(0x462)]();}},Scene_Shop['prototype'][_0x2455b1(0x462)]=function(){const _0x579a93=_0x2455b1;this['_buyWindowLastIndex']=this[_0x579a93(0x45c)]['index'](),this['_buyWindow'][_0x579a93(0x2d6)](),this[_0x579a93(0x45c)]['deselect'](),this[_0x579a93(0x45c)][_0x579a93(0x270)](0x0,0x0),this[_0x579a93(0x3b0)][_0x579a93(0x2d6)](),this['_dummyWindow'][_0x579a93(0x208)]();},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x629)]=Scene_Shop['prototype'][_0x2455b1(0x592)],Scene_Shop['prototype'][_0x2455b1(0x592)]=function(){const _0x2d78a0=_0x2455b1;VisuMZ[_0x2d78a0(0x21d)][_0x2d78a0(0x629)][_0x2d78a0(0x27a)](this),this[_0x2d78a0(0x239)]()&&this['onCategoryCancelItemsEquipsCore']();},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x2da)]=function(){const _0x48653e=_0x2455b1;this[_0x48653e(0x45c)][_0x48653e(0x2d6)](),this[_0x48653e(0x4bc)][_0x48653e(0x2d6)]();},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x3e4)]=Scene_Shop['prototype'][_0x2455b1(0x473)],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x473)]=function(){const _0x3371a2=_0x2455b1;VisuMZ[_0x3371a2(0x21d)][_0x3371a2(0x3e4)]['call'](this),this[_0x3371a2(0x239)]()&&('GUMsG'!==_0x3371a2(0x29f)?this[_0x3371a2(0x51d)]():_0x16cbbd=_0x3371a2(0x54f)[_0x3371a2(0x4c5)](_0x1f76bc['id']));},Scene_Shop[_0x2455b1(0x32e)]['onSellOkItemsEquipsCore']=function(){this['_categoryWindow']['show']();},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x257)]=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x204)],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x204)]=function(){const _0x4c0400=_0x2455b1;VisuMZ['ItemsEquipsCore']['Scene_Shop_onSellCancel'][_0x4c0400(0x27a)](this),this[_0x4c0400(0x35d)]()&&this[_0x4c0400(0x592)](),this[_0x4c0400(0x239)]()&&this[_0x4c0400(0x2d8)][_0x4c0400(0x208)]();},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x251)]=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x3aa)],Scene_Shop['prototype']['sellingPrice']=function(){const _0x1b7d33=_0x2455b1;let _0x336a87=this[_0x1b7d33(0x1b2)]();const _0x49bf63=this[_0x1b7d33(0x5a9)];return _0x336a87=VisuMZ['ItemsEquipsCore'][_0x1b7d33(0x33c)][_0x1b7d33(0x586)][_0x1b7d33(0x3a9)][_0x1b7d33(0x27a)](this,_0x49bf63,_0x336a87),_0x336a87;},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x1b2)]=function(){const _0x5273b8=_0x2455b1;let _0x395d6b=this[_0x5273b8(0x5a9)][_0x5273b8(0x5b5)];if(!this[_0x5273b8(0x5a9)])return 0x0;else{if(this[_0x5273b8(0x5a9)]['note'][_0x5273b8(0x3e1)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if(_0x5273b8(0x4ea)==='jtkDf'){const _0x384a25=String(RegExp['$1']);let _0x23d21d=this[_0x5273b8(0x5a9)],_0x229b76=_0x395d6b*this[_0x5273b8(0x52b)]();try{_0x5273b8(0x330)!==_0x5273b8(0x4f9)?eval(_0x384a25):this[_0x5273b8(0x4fb)]();}catch(_0x5adfcc){if(_0x5273b8(0x610)==='wAlyq'){const _0x412724=_0x27ee92[_0x5273b8(0x21d)]['Settings'][_0x5273b8(0x300)];return _0x412724['CommandAddOptimize']||_0x412724[_0x5273b8(0x2f0)];}else{if($gameTemp[_0x5273b8(0x386)]())console[_0x5273b8(0x1f8)](_0x5adfcc);}}if(isNaN(_0x229b76))_0x229b76=0x0;return Math[_0x5273b8(0x637)](_0x229b76);}else{const _0x14c9a8=_0x47eea3['note'];if(_0x14c9a8[_0x5273b8(0x3e1)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x432f1e=_0x18d481(_0x42ffab['$1']);try{_0x124660(_0x432f1e);}catch(_0x405d09){if(_0x2eb756['isPlaytest']())_0x528e0e[_0x5273b8(0x1f8)](_0x405d09);}}_0x18e9d8=_0x3f4924[_0x5273b8(0x21d)][_0x5273b8(0x33c)][_0x5273b8(0x586)][_0x5273b8(0x280)][_0x5273b8(0x27a)](this,_0x145cf9,_0x12e50e);if(_0x5cc75c(_0xae2b6d))_0x3bec1b=0x0;return _0x1aa893[_0x5273b8(0x637)](_0x2197cc);}}else return this['_item'][_0x5273b8(0x3c8)][_0x5273b8(0x3e1)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x5273b8(0x637)](this[_0x5273b8(0x39b)]());}},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x39b)]=function(){const _0x260175=_0x2455b1;return this[_0x260175(0x5a9)][_0x260175(0x5b5)]*this[_0x260175(0x52b)]();},Scene_Shop['prototype'][_0x2455b1(0x52b)]=function(){const _0x34d188=_0x2455b1;return VisuMZ[_0x34d188(0x21d)][_0x34d188(0x33c)][_0x34d188(0x586)]['SellPriceRate'];},Scene_Shop['prototype'][_0x2455b1(0x530)]=function(){const _0x177928=_0x2455b1;if(!this[_0x177928(0x573)]())return![];if(!this['isUseModernControls']())return![];if(!this['_sellWindow'])return![];if(!this['_sellWindow'][_0x177928(0x2ac)])return![];return this[_0x177928(0x573)]()&&this[_0x177928(0x35d)]();},Scene_Shop['prototype'][_0x2455b1(0x49e)]=function(){const _0x4f5975=_0x2455b1;if(this[_0x4f5975(0x530)]()){if(this['_sellWindow'][_0x4f5975(0x2c8)]()===0x1){if(_0x4f5975(0x40b)===_0x4f5975(0x35a)){const _0x4e6f01=_0x2bfe42['equipTypes'][_0x4f5975(0x5ea)](_0x531719[_0x4f5975(0x48e)]());if(_0x4e6f01>0x0)_0xb534e4[_0x4f5975(0x61f)][_0x4f5975(0x215)](_0x4e6f01);}else return TextManager[_0x4f5975(0x2ba)](_0x4f5975(0x5a5),'right');}else return TextManager['getInputMultiButtonStrings'](_0x4f5975(0x422),_0x4f5975(0x4d5));}else{if(this[_0x4f5975(0x4c9)]&&this[_0x4f5975(0x4c9)][_0x4f5975(0x2ac)]){if(_0x4f5975(0x220)!=='zsJXM')return TextManager['getInputMultiButtonStrings'](_0x4f5975(0x5a5),'right');else{if(!this['makeItemData']())return _0x3b8a85;if(this[_0x4f5975(0x502)](_0x1f0390,_0x5873fe,_0x41b99e))_0x5344ae+=this['lineHeight']();if(this[_0x4f5975(0x25a)](_0x55c00c,_0x36cbea,_0x49444c))_0x445b34+=this[_0x4f5975(0x249)]();if(this[_0x4f5975(0x23e)](_0x5a79dc,_0x705988,_0x46439a))_0x373177+=this['lineHeight']();if(this['drawItemEffectsHpDamage'](_0xa3e13c,_0x3a025c,_0x3ba50e))_0x189cc2+=this['lineHeight']();if(this[_0x4f5975(0x5d3)](_0x491752,_0x2f698c,_0x354ccf))_0x362b62+=this[_0x4f5975(0x249)]();if(this['drawItemEffectsTpDamage'](_0x14ca66,_0x451f22,_0x228bab))_0xb4cba+=this[_0x4f5975(0x249)]();if(this[_0x4f5975(0x27c)](_0x2a2bc3,_0x5263f4,_0x1d5e04))_0x17bae1+=this['lineHeight']();if(this[_0x4f5975(0x623)](_0x12be64,_0x26f641,_0x4ff02f))_0x5408dd+=this['lineHeight']();if(this['drawItemEffectsRemovedStatesBuffs'](_0x39acc8,_0x1716a1,_0x3e91b8))_0x30ce30+=this[_0x4f5975(0x249)]();return this[_0x4f5975(0x256)](),_0x1018ec;}}}return Scene_MenuBase[_0x4f5975(0x32e)][_0x4f5975(0x49e)][_0x4f5975(0x27a)](this);},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x625)]=function(){const _0x5c7eaf=_0x2455b1;if(this['_numberWindow']&&this[_0x5c7eaf(0x4c9)]['active'])return TextManager[_0x5c7eaf(0x2ba)]('up',_0x5c7eaf(0x53a));return Scene_MenuBase['prototype'][_0x5c7eaf(0x625)][_0x5c7eaf(0x27a)](this);},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x42c)]=function(){const _0x51a5ae=_0x2455b1;if(this[_0x51a5ae(0x530)]())return VisuMZ[_0x51a5ae(0x21d)][_0x51a5ae(0x33c)][_0x51a5ae(0x212)]['buttonAssistCategory'];else{if(this[_0x51a5ae(0x4c9)]&&this['_numberWindow']['active'])return VisuMZ[_0x51a5ae(0x21d)][_0x51a5ae(0x33c)][_0x51a5ae(0x586)][_0x51a5ae(0x376)];}return Scene_MenuBase[_0x51a5ae(0x32e)]['buttonAssistText1']['call'](this);},Scene_Shop['prototype'][_0x2455b1(0x50f)]=function(){const _0x576346=_0x2455b1;if(this['_numberWindow']&&this[_0x576346(0x4c9)]['active']){if('UkFyo'===_0x576346(0x357))return VisuMZ[_0x576346(0x21d)][_0x576346(0x33c)][_0x576346(0x586)]['buttonAssistLargeIncrement'];else{if(!this[_0x576346(0x5cc)]){const _0xfd3644=_0x3bd1f1[_0x576346(0x39e)](this);_0xfd3644[_0x576346(0x5cc)]=!![],_0x2bd341[_0x576346(0x21d)]['Game_Actor_changeEquip'][_0x576346(0x27a)](this,_0x278f80,_0x891f22),this[_0x576346(0x618)](_0xfd3644);}else _0x1de37d['ItemsEquipsCore'][_0x576346(0x1d4)][_0x576346(0x27a)](this,_0x145da3,_0x4b3fd4);}}return Scene_MenuBase[_0x576346(0x32e)][_0x576346(0x50f)][_0x576346(0x27a)](this);},Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x36d)]=function(){const _0x558cc7=_0x2455b1;if(!SceneManager[_0x558cc7(0x354)]())return;const _0x38d955=VisuMZ[_0x558cc7(0x21d)][_0x558cc7(0x33c)][_0x558cc7(0x586)];_0x38d955[_0x558cc7(0x501)]&&$gameSwitches['setValue'](_0x38d955['SwitchBuy'],![]),_0x38d955[_0x558cc7(0x5b0)]&&$gameSwitches[_0x558cc7(0x3a8)](_0x38d955[_0x558cc7(0x5b0)],![]);},VisuMZ[_0x2455b1(0x21d)]['Scene_Shop_doBuy']=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x42a)],Scene_Shop['prototype'][_0x2455b1(0x42a)]=function(_0x26a43f){const _0x692985=_0x2455b1;VisuMZ['ItemsEquipsCore']['Scene_Shop_doBuy']['call'](this,_0x26a43f);if(_0x26a43f<=0x0)return;const _0x6dd90b=VisuMZ[_0x692985(0x21d)]['Settings']['ShopScene'];if(_0x6dd90b[_0x692985(0x501)]){if('wYCzO'===_0x692985(0x538))$gameSwitches['setValue'](_0x6dd90b[_0x692985(0x501)],!![]);else{if(!this[_0x692985(0x576)])return![];if(!this[_0x692985(0x576)][_0x692985(0x2ac)])return![];return this[_0x692985(0x576)][_0x692985(0x454)]();}}},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x5ce)]=Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x463)],Scene_Shop[_0x2455b1(0x32e)][_0x2455b1(0x463)]=function(_0x48c53e){const _0xe488ab=_0x2455b1;VisuMZ[_0xe488ab(0x21d)][_0xe488ab(0x5ce)][_0xe488ab(0x27a)](this,_0x48c53e);if(_0x48c53e<=0x0)return;const _0x5e9da6=VisuMZ[_0xe488ab(0x21d)][_0xe488ab(0x33c)]['ShopScene'];if(_0x5e9da6[_0xe488ab(0x501)]){if(_0xe488ab(0x62d)!==_0xe488ab(0x254))$gameSwitches[_0xe488ab(0x3a8)](_0x5e9da6[_0xe488ab(0x5b0)],!![]);else{const _0x28e88d=_0x1ef3d5[_0xe488ab(0x4f4)],_0x429f11=_0x8f67c0[_0xe488ab(0x25f)];this[_0xe488ab(0x60d)]=new _0x3d3661(_0x28e88d,_0x429f11),this[_0xe488ab(0x388)](),this[_0xe488ab(0x3de)]();}}};function _0x5132(_0x583893,_0x2ccfcf){const _0x49bced=_0x49bc();return _0x5132=function(_0x51326d,_0x56478c){_0x51326d=_0x51326d-0x1ad;let _0x2aa93d=_0x49bced[_0x51326d];return _0x2aa93d;},_0x5132(_0x583893,_0x2ccfcf);}function Sprite_NewLabel(){const _0xd75f97=_0x2455b1;this[_0xd75f97(0x362)](...arguments);}Sprite_NewLabel[_0x2455b1(0x32e)]=Object[_0x2455b1(0x5c5)](Sprite[_0x2455b1(0x32e)]),Sprite_NewLabel['prototype'][_0x2455b1(0x5d2)]=Sprite_NewLabel,Sprite_NewLabel[_0x2455b1(0x32e)][_0x2455b1(0x362)]=function(){const _0x55f67b=_0x2455b1;Sprite[_0x55f67b(0x32e)]['initialize']['call'](this),this[_0x55f67b(0x1d5)]();},Sprite_NewLabel[_0x2455b1(0x32e)]['createBitmap']=function(){const _0x2e818b=_0x2455b1,_0x229bcb=ImageManager[_0x2e818b(0x4f4)],_0xda1a52=ImageManager[_0x2e818b(0x25f)];this[_0x2e818b(0x60d)]=new Bitmap(_0x229bcb,_0xda1a52),this[_0x2e818b(0x388)](),this['drawNewLabelText']();},Sprite_NewLabel['prototype']['drawNewLabelIcon']=function(){const _0x2f87e6=_0x2455b1,_0x5c3adb=VisuMZ[_0x2f87e6(0x21d)][_0x2f87e6(0x33c)]['New'][_0x2f87e6(0x611)];if(_0x5c3adb<=0x0)return;const _0x1cab49=ImageManager[_0x2f87e6(0x284)](_0x2f87e6(0x2bc)),_0x1896a9=ImageManager['iconWidth'],_0x837977=ImageManager[_0x2f87e6(0x25f)],_0x123b7c=_0x5c3adb%0x10*_0x1896a9,_0x370725=Math[_0x2f87e6(0x637)](_0x5c3adb/0x10)*_0x837977;this[_0x2f87e6(0x60d)][_0x2f87e6(0x279)](_0x1cab49,_0x123b7c,_0x370725,_0x1896a9,_0x837977,0x0,0x0);},Sprite_NewLabel[_0x2455b1(0x32e)][_0x2455b1(0x3de)]=function(){const _0x37f7ca=_0x2455b1,_0x11d6b7=VisuMZ[_0x37f7ca(0x21d)][_0x37f7ca(0x33c)][_0x37f7ca(0x4a3)],_0x2ed701=_0x11d6b7[_0x37f7ca(0x355)];if(_0x2ed701==='')return;const _0x398188=ImageManager[_0x37f7ca(0x4f4)],_0x4b0d78=ImageManager[_0x37f7ca(0x25f)];this[_0x37f7ca(0x60d)][_0x37f7ca(0x272)]=_0x11d6b7[_0x37f7ca(0x4ef)]||$gameSystem[_0x37f7ca(0x48a)](),this['bitmap'][_0x37f7ca(0x2b5)]=this['getTextColor'](),this[_0x37f7ca(0x60d)][_0x37f7ca(0x517)]=_0x11d6b7['FontSize'],this[_0x37f7ca(0x60d)][_0x37f7ca(0x442)](_0x2ed701,0x0,_0x4b0d78/0x2,_0x398188,_0x4b0d78/0x2,'center');},Sprite_NewLabel[_0x2455b1(0x32e)][_0x2455b1(0x258)]=function(){const _0x10a326=_0x2455b1,_0x2b066e=VisuMZ[_0x10a326(0x21d)][_0x10a326(0x33c)][_0x10a326(0x4a3)][_0x10a326(0x48c)];return _0x2b066e[_0x10a326(0x3e1)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x10a326(0x2b5)](_0x2b066e);},Window_Base['prototype']['drawItemName']=function(_0x10a25e,_0x59ce06,_0xea1ba,_0x1c978d){const _0x206715=_0x2455b1;if(_0x10a25e){if(_0x206715(0x3f9)!=='XyUAq')return this[_0x206715(0x391)]();else{const _0x4b4730=_0xea1ba+(this[_0x206715(0x249)]()-ImageManager[_0x206715(0x25f)])/0x2,_0x351894=ImageManager[_0x206715(0x4f4)]+0x4,_0x47af7a=Math['max'](0x0,_0x1c978d-_0x351894);this[_0x206715(0x1b9)](ColorManager[_0x206715(0x38b)](_0x10a25e)),this['drawIcon'](_0x10a25e[_0x206715(0x305)],_0x59ce06,_0x4b4730),this[_0x206715(0x442)](_0x10a25e['name'],_0x59ce06+_0x351894,_0xea1ba,_0x47af7a),this[_0x206715(0x4a7)]();}}},Window_Base[_0x2455b1(0x32e)][_0x2455b1(0x594)]=function(_0x394e51,_0x3286f1,_0x567e68,_0x11655b){const _0x50c463=_0x2455b1;if(this['isDrawItemNumber'](_0x394e51)){if(_0x50c463(0x449)!==_0x50c463(0x449))this[_0x50c463(0x2bb)](),this[_0x50c463(0x4a4)]();else{this[_0x50c463(0x256)]();const _0x1ac663=VisuMZ[_0x50c463(0x21d)][_0x50c463(0x33c)]['ItemScene'],_0x21769e=_0x1ac663[_0x50c463(0x577)],_0x385837=_0x21769e[_0x50c463(0x4c5)]($gameParty['numItems'](_0x394e51));this[_0x50c463(0x5bb)][_0x50c463(0x517)]=_0x1ac663['ItemQuantityFontSize'],this['drawText'](_0x385837,_0x3286f1,_0x567e68,_0x11655b,_0x50c463(0x265)),this['resetFontSettings']();}}},Window_Base[_0x2455b1(0x32e)][_0x2455b1(0x537)]=function(_0x1b3b20){const _0x3d5827=_0x2455b1;if(DataManager[_0x3d5827(0x4f1)](_0x1b3b20))return $dataSystem[_0x3d5827(0x5e8)];return!![];},Window_Base['prototype']['drawItemDarkRect']=function(_0x1390e4,_0x5afefc,_0x482be5,_0x55ce73,_0x22d271){const _0x2d9fcc=_0x2455b1;_0x22d271=Math[_0x2d9fcc(0x3c5)](_0x22d271||0x1,0x1);while(_0x22d271--){_0x55ce73=_0x55ce73||this[_0x2d9fcc(0x249)](),this[_0x2d9fcc(0x4f7)]['paintOpacity']=0xa0;const _0x3131c8=ColorManager['gaugeBackColor']();this[_0x2d9fcc(0x4f7)][_0x2d9fcc(0x504)](_0x1390e4+0x1,_0x5afefc+0x1,_0x482be5-0x2,_0x55ce73-0x2,_0x3131c8),this['contentsBack']['paintOpacity']=0xff;}},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x302)]=Window_Selectable[_0x2455b1(0x32e)]['initialize'],Window_Selectable[_0x2455b1(0x32e)]['initialize']=function(_0x20b1d9){const _0x4bb5bb=_0x2455b1;this[_0x4bb5bb(0x3b6)](),VisuMZ[_0x4bb5bb(0x21d)][_0x4bb5bb(0x302)][_0x4bb5bb(0x27a)](this,_0x20b1d9);},Window_Selectable['prototype'][_0x2455b1(0x3b6)]=function(){const _0x1e4269=_0x2455b1;this['_newLabelSprites']={},this[_0x1e4269(0x237)]=0xff,this[_0x1e4269(0x319)]=VisuMZ[_0x1e4269(0x21d)][_0x1e4269(0x33c)][_0x1e4269(0x4a3)][_0x1e4269(0x621)],this[_0x1e4269(0x1bd)]=VisuMZ['ItemsEquipsCore'][_0x1e4269(0x33c)][_0x1e4269(0x4a3)][_0x1e4269(0x253)];},Window_Selectable[_0x2455b1(0x32e)]['isShowNew']=function(){return![];},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x1d2)]=Window_Selectable[_0x2455b1(0x32e)][_0x2455b1(0x5ec)],Window_Selectable['prototype'][_0x2455b1(0x5ec)]=function(_0x47424c){const _0x33838a=_0x2455b1;VisuMZ[_0x33838a(0x21d)]['Window_Selectable_setHelpWindowItem'][_0x33838a(0x27a)](this,_0x47424c);if(this[_0x33838a(0x613)]())this[_0x33838a(0x1df)](_0x47424c);},Window_Selectable[_0x2455b1(0x32e)]['clearNewLabelFromItem']=function(_0x3485a0){const _0x58dd2d=_0x2455b1;if(!_0x3485a0)return;$gameParty[_0x58dd2d(0x63a)](_0x3485a0);let _0x26a08e='';if(DataManager['isItem'](_0x3485a0))_0x26a08e=_0x58dd2d(0x54f)[_0x58dd2d(0x4c5)](_0x3485a0['id']);else{if(DataManager[_0x58dd2d(0x456)](_0x3485a0))_0x26a08e='weapon-%1'[_0x58dd2d(0x4c5)](_0x3485a0['id']);else{if(DataManager[_0x58dd2d(0x4c0)](_0x3485a0)){if(_0x58dd2d(0x520)!==_0x58dd2d(0x520)){const _0x19ed75=_0x58dd2d(0x599);if(this['_customItemInfo'][_0x19ed75])return this[_0x58dd2d(0x5a0)][_0x19ed75];if(this['_item']['damage']['elementId']<=-0x1)return _0x2c442c[_0x58dd2d(0x21d)][_0x58dd2d(0x33c)]['StatusWindow'][_0x58dd2d(0x1fe)];else return this[_0x58dd2d(0x5a9)][_0x58dd2d(0x268)][_0x58dd2d(0x448)]===0x0?_0x321ff5['ItemsEquipsCore'][_0x58dd2d(0x33c)]['StatusWindow'][_0x58dd2d(0x372)]:_0x3381dd[_0x58dd2d(0x1ed)][this['_item'][_0x58dd2d(0x268)]['elementId']];}else _0x26a08e=_0x58dd2d(0x387)['format'](_0x3485a0['id']);}else{if('remQU'===_0x58dd2d(0x446))return;else this['onTouchSelectModernControls'](!![]);}}}const _0x4b741f=this[_0x58dd2d(0x59a)][_0x26a08e];if(_0x4b741f)_0x4b741f[_0x58dd2d(0x208)]();},VisuMZ[_0x2455b1(0x21d)]['Window_Selectable_refresh']=Window_Selectable['prototype'][_0x2455b1(0x36f)],Window_Selectable[_0x2455b1(0x32e)]['refresh']=function(){const _0x4923c2=_0x2455b1;this[_0x4923c2(0x4b9)](),VisuMZ['ItemsEquipsCore'][_0x4923c2(0x5b7)]['call'](this);},Window_Selectable['prototype'][_0x2455b1(0x4b9)]=function(){const _0x8dc6cb=_0x2455b1;for(const _0xde563a of Object['values'](this[_0x8dc6cb(0x59a)])){_0xde563a[_0x8dc6cb(0x208)]();}},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x604)]=Window_Selectable['prototype'][_0x2455b1(0x370)],Window_Selectable[_0x2455b1(0x32e)][_0x2455b1(0x370)]=function(){const _0x2d850c=_0x2455b1;this[_0x2d850c(0x452)](),VisuMZ[_0x2d850c(0x21d)][_0x2d850c(0x604)][_0x2d850c(0x27a)](this);},Window_Selectable[_0x2455b1(0x32e)]['updateNewLabelOpacity']=function(){const _0x16f5fc=_0x2455b1;if(!this[_0x16f5fc(0x613)]())return;const _0x28dc8f=this['_newLabelOpacityUpperLimit'];this[_0x16f5fc(0x237)]+=this[_0x16f5fc(0x319)];if(this['_newLabelOpacity']>=_0x28dc8f||this[_0x16f5fc(0x237)]<=0x0){if(_0x16f5fc(0x33b)!==_0x16f5fc(0x33b)){const _0x4b8051=this['itemLineRect'](_0x4c2365),_0xcf14c9=this[_0x16f5fc(0x1e2)](_0x57214c),_0x577fde=this[_0x16f5fc(0x3e9)](_0xcf14c9)[_0x16f5fc(0x5fb)];this[_0x16f5fc(0x558)](this[_0x16f5fc(0x58f)](_0x29f7eb));const _0x3872e6=this['itemTextAlign']();if(_0x3872e6==='right')this['drawTextEx'](_0xcf14c9,_0x4b8051['x']+_0x4b8051[_0x16f5fc(0x5fb)]-_0x577fde,_0x4b8051['y'],_0x577fde);else{if(_0x3872e6===_0x16f5fc(0x5b8)){const _0x350961=_0x4b8051['x']+_0x3ecc5f[_0x16f5fc(0x637)]((_0x4b8051[_0x16f5fc(0x5fb)]-_0x577fde)/0x2);this[_0x16f5fc(0x2a0)](_0xcf14c9,_0x350961,_0x4b8051['y'],_0x577fde);}else this['drawTextEx'](_0xcf14c9,_0x4b8051['x'],_0x4b8051['y'],_0x577fde);}}else this['_newLabelOpacityChange']*=-0x1;}this['_newLabelOpacity']=this[_0x16f5fc(0x237)]['clamp'](0x0,_0x28dc8f);for(const _0x243d46 of Object[_0x16f5fc(0x49b)](this[_0x16f5fc(0x59a)])){_0x243d46[_0x16f5fc(0x3eb)]=this[_0x16f5fc(0x237)];}},Window_Selectable[_0x2455b1(0x32e)]['createNewLabelSprite']=function(_0x13e3bb){const _0x1e7a05=_0x2455b1,_0x265d04=this['_newLabelSprites'];if(_0x265d04[_0x13e3bb])return _0x265d04[_0x13e3bb];else{const _0x2eb783=new Sprite_NewLabel();return _0x265d04[_0x13e3bb]=_0x2eb783,this[_0x1e7a05(0x3f7)](_0x2eb783),_0x2eb783;}},Window_Selectable[_0x2455b1(0x32e)][_0x2455b1(0x313)]=function(_0x163e5f,_0x58b27b,_0x331871){const _0x5a997a=_0x2455b1;let _0x152e7f='';if(DataManager[_0x5a997a(0x2cf)](_0x163e5f))_0x152e7f=_0x5a997a(0x54f)[_0x5a997a(0x4c5)](_0x163e5f['id']);else{if(DataManager['isWeapon'](_0x163e5f))_0x152e7f=_0x5a997a(0x472)[_0x5a997a(0x4c5)](_0x163e5f['id']);else{if(DataManager[_0x5a997a(0x4c0)](_0x163e5f))_0x152e7f=_0x5a997a(0x387)[_0x5a997a(0x4c5)](_0x163e5f['id']);else{if(_0x5a997a(0x2c9)!==_0x5a997a(0x2c9)){if(this[_0x5a997a(0x535)](_0x400489))this['changeEquip'](_0x448210,null);}else return;}}}const _0x58cf14=this[_0x5a997a(0x1ba)](_0x152e7f);_0x58cf14[_0x5a997a(0x2e8)](_0x58b27b,_0x331871),_0x58cf14[_0x5a997a(0x2d6)](),_0x58cf14[_0x5a997a(0x3eb)]=this[_0x5a997a(0x237)];},Window_ItemCategory[_0x2455b1(0x443)]=VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x33c)][_0x2455b1(0x25d)][_0x2455b1(0x471)],Window_ItemCategory['categoryItemTypes']=[_0x2455b1(0x390),_0x2455b1(0x57a),_0x2455b1(0x5e2),'Consumable',_0x2455b1(0x436),_0x2455b1(0x5dc),'FieldUsable',_0x2455b1(0x459)],VisuMZ['ItemsEquipsCore'][_0x2455b1(0x404)]=Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x362)],Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x362)]=function(_0x30fcbd){const _0x1f742c=_0x2455b1;VisuMZ[_0x1f742c(0x21d)][_0x1f742c(0x404)]['call'](this,_0x30fcbd),this[_0x1f742c(0x37d)](_0x30fcbd);},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x37d)]=function(_0x2c6b0c){const _0x1fbdd1=_0x2455b1,_0x1ae531=new Rectangle(0x0,0x0,_0x2c6b0c[_0x1fbdd1(0x5fb)],_0x2c6b0c[_0x1fbdd1(0x24b)]);this[_0x1fbdd1(0x588)]=new Window_Base(_0x1ae531),this[_0x1fbdd1(0x588)][_0x1fbdd1(0x3eb)]=0x0,this['addChild'](this[_0x1fbdd1(0x588)]),this[_0x1fbdd1(0x59d)]();},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x35d)]=function(){const _0x15416d=_0x2455b1;return Imported[_0x15416d(0x250)]&&Window_HorzCommand['prototype'][_0x15416d(0x35d)][_0x15416d(0x27a)](this);},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x622)]=function(){},Window_ItemCategory['prototype']['playOkSound']=function(){const _0x4520ca=_0x2455b1;if(!this[_0x4520ca(0x35d)]())Window_HorzCommand[_0x4520ca(0x32e)][_0x4520ca(0x5d0)][_0x4520ca(0x27a)](this);},Window_ItemCategory['prototype']['maxCols']=function(){const _0x295bc7=_0x2455b1;return this[_0x295bc7(0x3a0)]?this[_0x295bc7(0x3e8)]():0x4;},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x370)]=function(){const _0x3d42a5=_0x2455b1;Window_HorzCommand[_0x3d42a5(0x32e)]['update'][_0x3d42a5(0x27a)](this);if(this[_0x3d42a5(0x3e2)]){if(_0x3d42a5(0x4e3)!==_0x3d42a5(0x306))this['_itemWindow'][_0x3d42a5(0x2e2)](this[_0x3d42a5(0x408)]());else{const _0x407b93=_0x378fc8[_0x3d42a5(0x39e)](this);_0x407b93[_0x3d42a5(0x5cc)]=!![],_0x30a1db[_0x3d42a5(0x21d)][_0x3d42a5(0x1d4)][_0x3d42a5(0x27a)](this,_0x1c5888,_0x4e7a12),this[_0x3d42a5(0x618)](_0x407b93);}}},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x3a2)]=function(){const _0x22621d=_0x2455b1;if(this[_0x22621d(0x2b0)]()){const _0x1f231e=this[_0x22621d(0x5fe)]();if(this[_0x22621d(0x3e2)]&&this[_0x22621d(0x3e2)][_0x22621d(0x2c8)]()<=0x1){if(_0x22621d(0x3b7)!==_0x22621d(0x33a)){if(Input['isRepeated']('right')){if(_0x22621d(0x3d5)!==_0x22621d(0x47f))this[_0x22621d(0x3d9)](Input['isTriggered'](_0x22621d(0x265)));else{const _0x2c269e=_0xc3a769+(this['lineHeight']()-_0x182fd5[_0x22621d(0x25f)])/0x2,_0x2c453d=_0x2818e0[_0x22621d(0x4f4)]+0x4,_0x2cbfb4=_0x42a402[_0x22621d(0x3c5)](0x0,_0x37d5e1-_0x2c453d);this[_0x22621d(0x1b9)](_0x49c01e[_0x22621d(0x38b)](_0x9e9fe5)),this[_0x22621d(0x617)](_0x3b33fb[_0x22621d(0x305)],_0x5a1580,_0x2c269e),this[_0x22621d(0x442)](_0x3676b6['name'],_0x157155+_0x2c453d,_0x4a5255,_0x2cbfb4),this[_0x22621d(0x4a7)]();}}if(Input['isRepeated'](_0x22621d(0x5a5))){if(_0x22621d(0x527)===_0x22621d(0x527))this['cursorLeft'](Input[_0x22621d(0x3fe)](_0x22621d(0x5a5)));else return this[_0x22621d(0x239)]()?this['slotWindowRect']():_0x286993[_0x22621d(0x21d)]['Scene_Equip_itemWindowRect'][_0x22621d(0x27a)](this);}}else{if(!this['isEquipCommandAdded']())return;const _0x26f97c=this[_0x22621d(0x560)](),_0x44f88f=_0x401faf['ItemsEquipsCore']['Settings'][_0x22621d(0x300)][_0x22621d(0x43f)],_0x23b542=_0x26f97c==='text'?_0x4594b6['equip2']:'\x5cI[%1]%2'[_0x22621d(0x4c5)](_0x44f88f,_0x3f066c[_0x22621d(0x2fe)]),_0x6cfe74=this[_0x22621d(0x1f7)]();this[_0x22621d(0x318)](_0x23b542,'equip',_0x6cfe74);}}else{if(this[_0x22621d(0x3e2)]&&this[_0x22621d(0x3e2)][_0x22621d(0x2c8)]()>0x1){if(Input[_0x22621d(0x2c5)](_0x22621d(0x4d5))&&!Input[_0x22621d(0x39c)](_0x22621d(0x36c))){if(_0x22621d(0x5b6)!==_0x22621d(0x58c))this[_0x22621d(0x3d9)](Input[_0x22621d(0x3fe)](_0x22621d(0x4d5)));else{if(_0x1f98e0===_0x4c7e53)return;for(let _0x43ad99=0x0;_0x43ad99<0x8;_0x43ad99++){const _0x171f8d=_0x5af00b['ItemsEquipsCore'][_0x22621d(0x1fb)][_0x22621d(0x2e4)][_0x43ad99];_0x59b3a2[_0x22621d(0x3c8)][_0x22621d(0x3e1)](_0x171f8d)&&(_0x1dec5b[_0x22621d(0x297)][_0x43ad99]=_0x11bae6(_0x4ece4e['$1']));}}}Input[_0x22621d(0x2c5)](_0x22621d(0x422))&&!Input[_0x22621d(0x39c)]('shift')&&this[_0x22621d(0x331)](Input['isTriggered']('pageup'));}}this[_0x22621d(0x5fe)]()!==_0x1f231e&&this['playCursorSound']();}},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x1ce)]=function(){const _0xa1c63d=_0x2455b1;if(this['isUseModernControls']())return;Window_HorzCommand[_0xa1c63d(0x32e)][_0xa1c63d(0x1ce)][_0xa1c63d(0x27a)](this);},Window_ItemCategory['prototype']['isHoverEnabled']=function(){const _0x541e5b=_0x2455b1;if(this['isUseModernControls']())return![];else{if('qZZiD'!==_0x541e5b(0x40f)){if(_0x332672>=0x0)_0x37d214===this[_0x541e5b(0x5fe)]()&&(this['_doubleTouch']=!![]),this[_0x541e5b(0x485)](),this[_0x541e5b(0x439)](_0x23b101);else _0x109b63[_0x541e5b(0x5b4)]()>=0x0&&(this['deactivate'](),this[_0x541e5b(0x4a4)]());}else return Window_HorzCommand['prototype'][_0x541e5b(0x392)][_0x541e5b(0x27a)](this);}},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x544)]=function(){const _0x3caf3a=_0x2455b1;if(this[_0x3caf3a(0x234)]()){TouchInput[_0x3caf3a(0x3fe)]()&&this[_0x3caf3a(0x221)](!![]);if(TouchInput[_0x3caf3a(0x503)]()){if(_0x3caf3a(0x349)==='dDJum'){_0x1b4141[_0x3caf3a(0x32e)]['callUpdateHelp'][_0x3caf3a(0x27a)](this);if(this[_0x3caf3a(0x3c4)])this[_0x3caf3a(0x515)]();}else this[_0x3caf3a(0x563)]();}else{if(TouchInput[_0x3caf3a(0x2ff)]()){if(_0x3caf3a(0x31f)===_0x3caf3a(0x31f))this[_0x3caf3a(0x50b)]();else{const _0x49fe48=new _0x16e4ed(0x0,0x0,_0xae76f9[_0x3caf3a(0x5fb)],_0x21823a['height']);this[_0x3caf3a(0x3c4)]=new _0x40fed8(_0x49fe48),this[_0x3caf3a(0x3c4)][_0x3caf3a(0x3eb)]=0x0,this[_0x3caf3a(0x323)](this[_0x3caf3a(0x3c4)]),this['updateCommandNameWindow']();}}}}},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x221)]=function(_0x2f6301){const _0x1c1bd7=_0x2455b1;if(this[_0x1c1bd7(0x35d)]())this[_0x1c1bd7(0x5cf)](!![]);else{if(_0x1c1bd7(0x271)==='lkXYI')return _0x17e5e[_0x1c1bd7(0x21d)][_0x1c1bd7(0x33c)]['EquipScene'][_0x1c1bd7(0x2f0)];else Window_HorzCommand['prototype'][_0x1c1bd7(0x221)]['call'](this,_0x2f6301);}},Window_ItemCategory['prototype'][_0x2455b1(0x5cf)]=function(_0x25d062){const _0x1b8601=_0x2455b1;this[_0x1b8601(0x241)]=![];if(this[_0x1b8601(0x2b0)]()){if(_0x1b8601(0x320)!==_0x1b8601(0x320))_0x54c238[_0x1b8601(0x3a8)](_0xc7757a[_0x1b8601(0x501)],![]);else{const _0xdb9ca1=this['index'](),_0x4d82e6=this['hitIndex']();_0x4d82e6>=0x0&&_0x4d82e6!==this['index']()&&this[_0x1b8601(0x439)](_0x4d82e6);if(_0x25d062&&this['index']()!==_0xdb9ca1){if(_0x1b8601(0x3bf)!==_0x1b8601(0x4c2))this[_0x1b8601(0x4fb)]();else{const _0xa1ca12=this[_0x1b8601(0x3c4)];_0xa1ca12[_0x1b8601(0x5bb)]['clear']();const _0x1971bd=this['commandStyleCheck'](this[_0x1b8601(0x5fe)]());if(_0x1971bd==='icon'){const _0x20b3ed=this[_0x1b8601(0x2f6)](this['index']());let _0x490ea4=this['commandName'](this[_0x1b8601(0x5fe)]());_0x490ea4=_0x490ea4['replace'](/\\I\[(\d+)\]/gi,''),_0xa1ca12['resetFontSettings'](),this[_0x1b8601(0x40c)](_0x490ea4,_0x20b3ed),this[_0x1b8601(0x2fa)](_0x490ea4,_0x20b3ed),this[_0x1b8601(0x3e6)](_0x490ea4,_0x20b3ed);}}}}}},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x595)]=function(){const _0x5cf962=_0x2455b1;for(const _0x6da80d of Window_ItemCategory[_0x5cf962(0x443)]){this[_0x5cf962(0x5e6)](_0x6da80d);}this[_0x5cf962(0x439)](this[_0x5cf962(0x5fe)]());},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x5e6)]=function(_0x25d077){const _0x3301fe=_0x2455b1,_0x4015c6=_0x25d077[_0x3301fe(0x369)],_0x37bcca=_0x25d077['Icon'],_0xbe78b2=_0x25d077[_0x3301fe(0x491)]||0x0;if(_0xbe78b2>0x0&&!$gameSwitches[_0x3301fe(0x346)](_0xbe78b2))return;let _0x3d12c5='',_0x3ad73d=_0x3301fe(0x514),_0x51abcf=_0x4015c6;if(_0x4015c6['match'](/Category:(.*)/i))_0x3301fe(0x350)!==_0x3301fe(0x350)?this[_0x3301fe(0x563)]():_0x3d12c5=String(RegExp['$1'])[_0x3301fe(0x48e)]();else{if(Window_ItemCategory['categoryItemTypes']['includes'](_0x4015c6))_0x3d12c5=VisuMZ[_0x3301fe(0x21d)][_0x3301fe(0x33c)][_0x3301fe(0x25d)][_0x4015c6];else{if([_0x3301fe(0x3b4),'RegularItems'][_0x3301fe(0x474)](_0x4015c6))_0x3301fe(0x606)!==_0x3301fe(0x4c7)?_0x3d12c5=TextManager[_0x3301fe(0x27d)]:(_0x32da73[_0x3301fe(0x21d)][_0x3301fe(0x56a)][_0x3301fe(0x27a)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['commandBuyItemsEquipsCore']());else{if(_0x4015c6===_0x3301fe(0x489))_0x3d12c5=TextManager['keyItem'];else{if(_0x4015c6===_0x3301fe(0x43b))_0x3301fe(0x499)!=='YXhAV'?_0x3d12c5=TextManager[_0x3301fe(0x36a)]:_0x184787[_0x3301fe(0x297)][_0x2ff409]=_0x3d5b36(_0x2d594f['$1']);else{if(_0x4015c6===_0x3301fe(0x43a))_0x3d12c5=TextManager[_0x3301fe(0x3f6)];else{if(_0x4015c6[_0x3301fe(0x3e1)](/WTYPE:(\d+)/i))_0x3d12c5=$dataSystem[_0x3301fe(0x1b5)][Number(RegExp['$1'])]||'';else{if(_0x4015c6[_0x3301fe(0x3e1)](/ATYPE:(\d+)/i)){if(_0x3301fe(0x389)==='GZiTI')return this[_0x3301fe(0x4de)]&&this['_categoryWindow'][_0x3301fe(0x35d)]();else _0x3d12c5=$dataSystem[_0x3301fe(0x412)][Number(RegExp['$1'])]||'';}else{if(_0x4015c6[_0x3301fe(0x3e1)](/ETYPE:(\d+)/i)){if(_0x3301fe(0x321)===_0x3301fe(0x321))_0x3d12c5=$dataSystem[_0x3301fe(0x324)][Number(RegExp['$1'])]||'';else return _0x17cba1[_0x3301fe(0x26a)](_0x505786);}}}}}}}}}_0x37bcca>0x0&&this[_0x3301fe(0x361)]()!=='text'&&(_0x3d12c5='\x5cI[%1]%2'[_0x3301fe(0x4c5)](_0x37bcca,_0x3d12c5)),this[_0x3301fe(0x318)](_0x3d12c5,_0x3ad73d,!![],_0x51abcf);},Window_ItemCategory[_0x2455b1(0x32e)]['itemTextAlign']=function(){const _0xf04db3=_0x2455b1;return VisuMZ[_0xf04db3(0x21d)]['Settings'][_0xf04db3(0x25d)][_0xf04db3(0x631)];},Window_ItemCategory['prototype'][_0x2455b1(0x47b)]=function(_0x4e42db){const _0x11c018=_0x2455b1,_0x861461=this['categoryStyleCheck'](_0x4e42db);if(_0x861461===_0x11c018(0x62a)){if(_0x11c018(0x4f3)!==_0x11c018(0x4f3))return _0x3eac7a[_0x11c018(0x21d)][_0x11c018(0x33c)][_0x11c018(0x3b8)][_0x11c018(0x2af)];else this[_0x11c018(0x375)](_0x4e42db);}else{if(_0x861461==='icon'){if('TuhTR'!=='TuhTR')return _0xbd772f[_0x11c018(0x21d)][_0x11c018(0x34b)][_0x11c018(0x27a)](this);else this['drawItemStyleIcon'](_0x4e42db);}else{if(_0x11c018(0x315)===_0x11c018(0x5e4)){const _0x388801=_0x11c018(0x39f);if(this['_customItemInfo'][_0x388801])return this[_0x11c018(0x5a0)][_0x388801];let _0x172a0e='';return _0x172a0e+='%1'[_0x11c018(0x4c5)](this['_itemData']['gainTP']),_0x172a0e;}else Window_HorzCommand[_0x11c018(0x32e)][_0x11c018(0x47b)][_0x11c018(0x27a)](this,_0x4e42db);}}},Window_ItemCategory[_0x2455b1(0x32e)]['categoryStyle']=function(){const _0x345906=_0x2455b1;return VisuMZ[_0x345906(0x21d)][_0x345906(0x33c)]['Categories'][_0x345906(0x3ba)];},Window_ItemCategory['prototype'][_0x2455b1(0x329)]=function(_0x5e3d54){const _0x5f5cd3=_0x2455b1;if(_0x5e3d54<0x0)return _0x5f5cd3(0x4cf);const _0x1ca0a1=this[_0x5f5cd3(0x361)]();if(_0x1ca0a1!==_0x5f5cd3(0x40a))return _0x1ca0a1;else{if(_0x5f5cd3(0x32f)==='pFGws')_0xed4554=_0xbea478[_0x5f5cd3(0x3c5)](this[_0x5f5cd3(0x61a)](_0x2822eb,_0x18bf42+0x4,_0x16b09d+0x4,_0x5aea0e),_0x2da66e),_0x4db59a+=_0x157e58;else{const _0xfb4ca7=this[_0x5f5cd3(0x1e2)](_0x5e3d54);if(_0xfb4ca7['match'](/\\I\[(\d+)\]/i)){if(_0x5f5cd3(0x282)==='YmpdN'){const _0x5dafe6=_0x56cb3c['parse']('['+_0x2bdf84['$1'][_0x5f5cd3(0x3e1)](/\d+/g)+']');for(const _0x3ba2eb of _0x5dafe6){if(!_0x5dd0c3[_0x5f5cd3(0x346)](_0x3ba2eb))return!![];}return![];}else{const _0x4ab657=this['itemLineRect'](_0x5e3d54),_0x77ff29=this[_0x5f5cd3(0x3e9)](_0xfb4ca7)[_0x5f5cd3(0x5fb)];if(_0x77ff29<=_0x4ab657[_0x5f5cd3(0x5fb)]){if(_0x5f5cd3(0x5c2)==='tgyID')return'iconText';else{if(!_0x41c9db)return 0x63;else return _0x372b0f[_0x5f5cd3(0x3c8)]['match'](/<MAX:[ ](\d+)>/i)?_0x37f493(_0x290e50['$1']):this[_0x5f5cd3(0x598)](_0x3be75c);}}else{if('MtntH'!==_0x5f5cd3(0x479)){if(this['_tempActor'])return;if(!_0x4b9489[_0x5f5cd3(0x21d)]['Settings'][_0x5f5cd3(0x300)][_0x5f5cd3(0x510)])return;const _0x245bc9=_0x5d833d[_0x5f5cd3(0x4c4)](_0x977cd6['hpRate']()*this[_0x5f5cd3(0x638)]),_0xf362c7=_0xfbba3d[_0x5f5cd3(0x4c4)](_0x220207[_0x5f5cd3(0x639)]()*this[_0x5f5cd3(0x30e)]);if(this['hp']>0x0)this['setHp'](_0x245bc9);if(this['mp']>0x0)this['setMp'](_0xf362c7);}else return _0x5f5cd3(0x4d4);}}}else return _0x5f5cd3(0x4cf);}}},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x375)]=function(_0x18a895){const _0x33238b=_0x2455b1,_0x8b512d=this['itemLineRect'](_0x18a895),_0x2bfbe2=this[_0x33238b(0x1e2)](_0x18a895),_0x2fa4bc=this[_0x33238b(0x3e9)](_0x2bfbe2)[_0x33238b(0x5fb)];this[_0x33238b(0x558)](this['isCommandEnabled'](_0x18a895));const _0x231da5=this[_0x33238b(0x2fb)]();if(_0x231da5==='right'){if('mUrYL'!==_0x33238b(0x298))return _0x33238b(0x4d4);else this[_0x33238b(0x2a0)](_0x2bfbe2,_0x8b512d['x']+_0x8b512d[_0x33238b(0x5fb)]-_0x2fa4bc,_0x8b512d['y'],_0x2fa4bc);}else{if(_0x231da5===_0x33238b(0x5b8)){if(_0x33238b(0x584)==='MmhMc'){const _0x5bc7cd=_0x8b512d['x']+Math[_0x33238b(0x637)]((_0x8b512d[_0x33238b(0x5fb)]-_0x2fa4bc)/0x2);this[_0x33238b(0x2a0)](_0x2bfbe2,_0x5bc7cd,_0x8b512d['y'],_0x2fa4bc);}else{const _0x5c787f=_0x185048[_0x33238b(0x27b)]()[_0x33238b(0x5ea)](_0x48369c),_0x192ecf=_0x53d0f8+_0x1f3e24+_0x5c787f*_0xf4046;this[_0x33238b(0x558)](_0x3bcc2a['canEquip'](this[_0x33238b(0x5a9)])),this[_0x33238b(0x46b)](_0x44f16b,_0x192ecf+_0x394cc3/0x2,_0x3efbaa);let _0x1f6ee9=_0x54de3f;for(const _0x5e40da of _0x156004){const _0x51edea=_0x1f6ee9-(_0x448209-_0x2628bc)/0x2;this[_0x33238b(0x26b)](_0x9e268e,_0x5e40da,_0x192ecf,_0x51edea,_0x41d72b),_0x1f6ee9+=_0x405359;}}}else this[_0x33238b(0x2a0)](_0x2bfbe2,_0x8b512d['x'],_0x8b512d['y'],_0x2fa4bc);}},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x444)]=function(_0x43d630){const _0x49ed19=_0x2455b1,_0x3cf5ef=this['commandName'](_0x43d630);if(_0x3cf5ef['match'](/\\I\[(\d+)\]/i)){if(_0x49ed19(0x546)===_0x49ed19(0x493))return _0x3357e2[_0x49ed19(0x1dc)]['Settings'][_0x49ed19(0x1ef)]['ExtDisplayedParams'];else{const _0x54f53b=Number(RegExp['$1'])||0x0,_0x18ed23=this['itemLineRect'](_0x43d630),_0x46f06e=_0x18ed23['x']+Math[_0x49ed19(0x637)]((_0x18ed23[_0x49ed19(0x5fb)]-ImageManager[_0x49ed19(0x4f4)])/0x2),_0x24e224=_0x18ed23['y']+(_0x18ed23[_0x49ed19(0x24b)]-ImageManager[_0x49ed19(0x25f)])/0x2;this[_0x49ed19(0x617)](_0x54f53b,_0x46f06e,_0x24e224);}}},VisuMZ['ItemsEquipsCore'][_0x2455b1(0x322)]=Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x5ee)],Window_ItemCategory['prototype']['setItemWindow']=function(_0x53223e){const _0x527d92=_0x2455b1;VisuMZ[_0x527d92(0x21d)]['Window_ItemCategory_setItemWindow'][_0x527d92(0x27a)](this,_0x53223e),_0x53223e['_categoryWindow']=this;},Window_ItemCategory[_0x2455b1(0x32e)]['callUpdateHelp']=function(){const _0x1b314a=_0x2455b1;Window_HorzCommand[_0x1b314a(0x32e)]['callUpdateHelp']['call'](this);if(this['_categoryNameWindow'])this[_0x1b314a(0x59d)]();},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x59d)]=function(){const _0x8deba1=_0x2455b1,_0x1c770d=this['_categoryNameWindow'];_0x1c770d[_0x8deba1(0x5bb)]['clear']();const _0x4ed95b=this[_0x8deba1(0x329)](this[_0x8deba1(0x5fe)]());if(_0x4ed95b===_0x8deba1(0x4d4)){if(_0x8deba1(0x5c7)===_0x8deba1(0x229))_0x61475d='weapon-%1'[_0x8deba1(0x4c5)](_0x1d6de2['id']);else{const _0x4a427e=this[_0x8deba1(0x2f6)](this[_0x8deba1(0x5fe)]());let _0x132fe0=this[_0x8deba1(0x1e2)](this[_0x8deba1(0x5fe)]());_0x132fe0=_0x132fe0['replace'](/\\I\[(\d+)\]/gi,''),_0x1c770d['resetFontSettings'](),this[_0x8deba1(0x3c9)](_0x132fe0,_0x4a427e),this[_0x8deba1(0x4ae)](_0x132fe0,_0x4a427e),this[_0x8deba1(0x458)](_0x132fe0,_0x4a427e);}}},Window_ItemCategory[_0x2455b1(0x32e)][_0x2455b1(0x3c9)]=function(_0x311231,_0x56c462){},Window_ItemCategory[_0x2455b1(0x32e)]['categoryNameWindowDrawText']=function(_0x7308a9,_0x1e4625){const _0x31b683=_0x2455b1,_0x2b1f21=this[_0x31b683(0x588)];_0x2b1f21[_0x31b683(0x442)](_0x7308a9,0x0,_0x1e4625['y'],_0x2b1f21[_0x31b683(0x266)],_0x31b683(0x5b8));},Window_ItemCategory['prototype'][_0x2455b1(0x458)]=function(_0x46ae77,_0x1629c7){const _0x2dd9fe=_0x2455b1,_0x2438e1=this[_0x2dd9fe(0x588)],_0x4e5c8c=$gameSystem[_0x2dd9fe(0x531)](),_0xebbc2b=_0x1629c7['x']+Math[_0x2dd9fe(0x637)](_0x1629c7[_0x2dd9fe(0x5fb)]/0x2)+_0x4e5c8c;_0x2438e1['x']=_0x2438e1[_0x2dd9fe(0x5fb)]/-0x2+_0xebbc2b,_0x2438e1['y']=Math['floor'](_0x1629c7[_0x2dd9fe(0x24b)]/0x2);},Window_ItemList[_0x2455b1(0x32e)][_0x2455b1(0x3a2)]=function(){const _0x1c761c=_0x2455b1;if(this[_0x1c761c(0x2b0)]()){const _0xa35240=this['index']();if(this[_0x1c761c(0x2c8)]()<=0x1)_0x1c761c(0x551)==='jRsyl'?this[_0x1c761c(0x3d9)](_0x191f40['isTriggered']('pagedown')):(!this[_0x1c761c(0x406)](_0x1c761c(0x4d5))&&Input['isTriggered'](_0x1c761c(0x4d5))&&this[_0x1c761c(0x61d)](),!this['isHandled']('pageup')&&Input[_0x1c761c(0x3fe)](_0x1c761c(0x422))&&this['cursorPageup']());else{if(this[_0x1c761c(0x2c8)]()>0x1){if(_0x1c761c(0x58d)===_0x1c761c(0x44d)){const _0x152379=this[_0x1c761c(0x2b1)][_0x1c761c(0x264)][_0x2b6b15],_0x486e39=_0xb2468f[_0x1c761c(0x32e)]['buffIconIndex'](_0x152379,_0x2539ab);if(_0x486e39>0x0){_0xbfa7da+=_0x1c761c(0x60b)['format'](_0x486e39),_0x3e2790++;if(_0x26c6a7>=_0x22a7f5)return _0x29c719;}}else{Input[_0x1c761c(0x2c5)](_0x1c761c(0x265))&&(_0x1c761c(0x574)!==_0x1c761c(0x574)?this['onTouchSelectModernControls'](![]):this['cursorRight'](Input['isTriggered'](_0x1c761c(0x265))));if(Input[_0x1c761c(0x2c5)](_0x1c761c(0x5a5))){if(_0x1c761c(0x37c)!==_0x1c761c(0x22b))this[_0x1c761c(0x331)](Input['isTriggered'](_0x1c761c(0x5a5)));else{const _0x10805e=this[_0x1c761c(0x5e5)](_0x400de0);if(_0x10805e===_0x1c761c(0x62a))this['drawItemStyleIconText'](_0x3707ea);else _0x10805e===_0x1c761c(0x4d4)?this[_0x1c761c(0x444)](_0x2a6f37):_0x5163aa[_0x1c761c(0x32e)][_0x1c761c(0x47b)]['call'](this,_0x163072);}}if(this['limitedPageUpDownSceneCheck']()){if('OFBBU'!==_0x1c761c(0x414)){this[_0x1c761c(0x419)](_0x57529d,_0x3bc749,_0x327598,_0x8333d2);for(let _0x8e51b3=0x0;_0x8e51b3<_0x4814a9;_0x8e51b3++){const _0x2c9cef=_0x41dba1+_0x27773b+_0x8e51b3*_0x2ceee0;this[_0x1c761c(0x419)](_0x2c9cef,_0x9d76fe,_0x1a0a4e,_0x51b66c);}_0x2fab6d+=_0x75e010;}else Input[_0x1c761c(0x3fe)](_0x1c761c(0x4d5))&&Input[_0x1c761c(0x39c)](_0x1c761c(0x36c))&&this[_0x1c761c(0x61d)](),Input['isTriggered'](_0x1c761c(0x422))&&Input['isPressed'](_0x1c761c(0x36c))&&this[_0x1c761c(0x529)]();}else Input['isTriggered']('pagedown')&&(_0x1c761c(0x30f)===_0x1c761c(0x358)?_0x1937fe[_0x1c761c(0x32c)][_0x1c761c(0x215)](_0x2cd03d[_0x1c761c(0x5b3)]()['trim']()):this[_0x1c761c(0x61d)]()),Input[_0x1c761c(0x3fe)](_0x1c761c(0x422))&&this[_0x1c761c(0x529)]();}}}if(Input[_0x1c761c(0x2c5)](_0x1c761c(0x53a))){if('SqgIZ'===_0x1c761c(0x532))return this[_0x1c761c(0x587)]();else Input[_0x1c761c(0x39c)](_0x1c761c(0x36c))&&this[_0x1c761c(0x31e)]()?this['cursorPagedown']():this[_0x1c761c(0x1d3)](Input[_0x1c761c(0x3fe)]('down'));}if(Input[_0x1c761c(0x2c5)]('up')){if(_0x1c761c(0x548)==='Pnpqg')return this[_0x1c761c(0x239)]()?this[_0x1c761c(0x40e)]():_0x51508a[_0x1c761c(0x21d)][_0x1c761c(0x466)][_0x1c761c(0x27a)](this);else{if(Input['isPressed'](_0x1c761c(0x36c))&&this[_0x1c761c(0x31e)]()){if(_0x1c761c(0x54c)!=='IPEJT')this[_0x1c761c(0x529)]();else return _0x3efec4[_0x1c761c(0x41d)];}else _0x1c761c(0x1e1)!==_0x1c761c(0x4fe)?this[_0x1c761c(0x579)](Input[_0x1c761c(0x3fe)]('up')):(_0x297392===this[_0x1c761c(0x5fe)]()&&(this[_0x1c761c(0x241)]=!![]),this[_0x1c761c(0x485)](),this['select'](_0xf03581));}}Imported[_0x1c761c(0x250)]&&this[_0x1c761c(0x622)](),this[_0x1c761c(0x5fe)]()!==_0xa35240&&this[_0x1c761c(0x4fb)]();}},Window_ItemList['prototype'][_0x2455b1(0x5d1)]=function(){const _0x378caf=_0x2455b1,_0x5d0b80=SceneManager[_0x378caf(0x39d)],_0x4ea6e6=[Scene_Item,Scene_Shop];return _0x4ea6e6['includes'](_0x5d0b80['constructor']);},Window_ItemList[_0x2455b1(0x32e)][_0x2455b1(0x485)]=function(){const _0x342519=_0x2455b1;Window_Selectable[_0x342519(0x32e)][_0x342519(0x485)][_0x342519(0x27a)](this),this['_categoryWindow']&&this['_categoryWindow'][_0x342519(0x35d)]()&&this['_categoryWindow'][_0x342519(0x485)]();},Window_ItemList['prototype'][_0x2455b1(0x2bb)]=function(){const _0x15e62c=_0x2455b1;Window_Selectable[_0x15e62c(0x32e)]['deactivate']['call'](this),this[_0x15e62c(0x4de)]&&this[_0x15e62c(0x4de)][_0x15e62c(0x35d)]()&&this[_0x15e62c(0x4de)]['deactivate']();},Window_ItemList[_0x2455b1(0x32e)]['setCategory']=function(_0x6792ff){const _0x334560=_0x2455b1;this[_0x334560(0x394)]!==_0x6792ff&&(this[_0x334560(0x394)]=_0x6792ff,this[_0x334560(0x36f)](),this[_0x334560(0x4de)]&&this[_0x334560(0x4de)][_0x334560(0x35d)]()?this['smoothSelect'](0x0):this[_0x334560(0x619)](0x0,0x0));},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x34b)]=Window_ItemList[_0x2455b1(0x32e)][_0x2455b1(0x2c8)],Window_ItemList[_0x2455b1(0x32e)][_0x2455b1(0x2c8)]=function(){const _0x1564fb=_0x2455b1;if(SceneManager[_0x1564fb(0x39d)][_0x1564fb(0x5d2)]===Scene_Battle)return VisuMZ[_0x1564fb(0x21d)]['Window_ItemList_maxCols'][_0x1564fb(0x27a)](this);else{if(SceneManager['_scene']['constructor']===Scene_Map){if(_0x1564fb(0x3d4)!==_0x1564fb(0x2ed))return VisuMZ[_0x1564fb(0x21d)][_0x1564fb(0x34b)][_0x1564fb(0x27a)](this);else return;}else{if(_0x1564fb(0x5e0)!==_0x1564fb(0x201))return VisuMZ['ItemsEquipsCore'][_0x1564fb(0x33c)][_0x1564fb(0x212)]['ListWindowCols'];else _0x59ca10=this[_0x1564fb(0x5bc)]['param'](_0x5e74d3);}}},VisuMZ[_0x2455b1(0x21d)]['Window_ItemList_colSpacing']=Window_ItemList[_0x2455b1(0x32e)][_0x2455b1(0x2d4)],Window_ItemList[_0x2455b1(0x32e)][_0x2455b1(0x2d4)]=function(){const _0x591ba3=_0x2455b1;return this[_0x591ba3(0x2c8)]()<=0x1?Window_Selectable[_0x591ba3(0x32e)][_0x591ba3(0x2d4)][_0x591ba3(0x27a)](this):VisuMZ['ItemsEquipsCore']['Window_ItemList_colSpacing']['call'](this);},Window_ItemList['prototype'][_0x2455b1(0x474)]=function(_0x42d185){const _0xf379a0=_0x2455b1;switch(this[_0xf379a0(0x394)]){case _0xf379a0(0x3b4):return DataManager[_0xf379a0(0x2cf)](_0x42d185);case _0xf379a0(0x47a):return DataManager[_0xf379a0(0x2cf)](_0x42d185)&&_0x42d185[_0xf379a0(0x334)]===0x1;case _0xf379a0(0x489):return DataManager[_0xf379a0(0x2cf)](_0x42d185)&&_0x42d185['itypeId']===0x2;case _0xf379a0(0x390):return DataManager[_0xf379a0(0x2cf)](_0x42d185)&&_0x42d185[_0xf379a0(0x334)]===0x3;case _0xf379a0(0x57a):return DataManager[_0xf379a0(0x2cf)](_0x42d185)&&_0x42d185[_0xf379a0(0x334)]===0x4;case'Consumable':return DataManager[_0xf379a0(0x2cf)](_0x42d185)&&_0x42d185[_0xf379a0(0x38e)];case _0xf379a0(0x5e2):return DataManager['isItem'](_0x42d185)&&!_0x42d185[_0xf379a0(0x38e)];case _0xf379a0(0x436):return DataManager[_0xf379a0(0x2cf)](_0x42d185)&&[0x0][_0xf379a0(0x474)](_0x42d185[_0xf379a0(0x2d7)]);case _0xf379a0(0x5dc):return DataManager[_0xf379a0(0x2cf)](_0x42d185)&&[0x0,0x1][_0xf379a0(0x474)](_0x42d185['occasion']);case _0xf379a0(0x353):return DataManager[_0xf379a0(0x2cf)](_0x42d185)&&[0x0,0x2][_0xf379a0(0x474)](_0x42d185[_0xf379a0(0x2d7)]);case _0xf379a0(0x459):return DataManager[_0xf379a0(0x2cf)](_0x42d185)&&[0x3][_0xf379a0(0x474)](_0x42d185[_0xf379a0(0x2d7)]);case _0xf379a0(0x43b):return DataManager['isWeapon'](_0x42d185);case _0xf379a0(0x43a):return DataManager[_0xf379a0(0x4c0)](_0x42d185);default:if(this[_0xf379a0(0x394)][_0xf379a0(0x3e1)](/WTYPE:(\d+)/i))return DataManager[_0xf379a0(0x456)](_0x42d185)&&_0x42d185[_0xf379a0(0x57d)]===Number(RegExp['$1']);else{if(this['_category']['match'](/WTYPE:(.*)/i)){if(_0xf379a0(0x48b)===_0xf379a0(0x396))_0x2d15af='foreground';else{const _0x5ec9e0=$dataSystem[_0xf379a0(0x1b5)][_0xf379a0(0x5ea)](String(RegExp['$1'])['trim']());return DataManager[_0xf379a0(0x456)](_0x42d185)&&_0x42d185[_0xf379a0(0x57d)]===_0x5ec9e0;}}else{if(this['_category']['match'](/ATYPE:(\d+)/i))return DataManager['isArmor'](_0x42d185)&&_0x42d185['atypeId']===Number(RegExp['$1']);else{if(this[_0xf379a0(0x394)][_0xf379a0(0x3e1)](/ATYPE:(.*)/i)){const _0x37e5d5=$dataSystem[_0xf379a0(0x412)]['indexOf'](String(RegExp['$1'])['trim']());return DataManager['isArmor'](_0x42d185)&&_0x42d185['atypeId']===_0x37e5d5;}else{if(this['_category']['match'](/ETYPE:(\d+)/i)){if('AuWAo'!=='pQozC')return!!_0x42d185&&_0x42d185[_0xf379a0(0x1cb)]===Number(RegExp['$1']);else return;}else{if(this['_category'][_0xf379a0(0x3e1)](/ETYPE:(.*)/i)){if(_0xf379a0(0x547)===_0xf379a0(0x547)){const _0x519503=$dataSystem[_0xf379a0(0x324)]['indexOf'](String(RegExp['$1'])['trim']());return DataManager[_0xf379a0(0x4c0)](_0x42d185)&&_0x42d185[_0xf379a0(0x1cb)]===_0x519503;}else{if(this['isUseModernControls']())return;_0x2b39ab[_0xf379a0(0x32e)][_0xf379a0(0x1ce)]['call'](this);}}else{if(this[_0xf379a0(0x394)][_0xf379a0(0x3e1)](/Category:(.*)/i))return!!_0x42d185&&_0x42d185[_0xf379a0(0x32c)][_0xf379a0(0x474)](String(RegExp['$1'])['toUpperCase']()['trim']());}}}}}}}return![];},Window_ItemList[_0x2455b1(0x32e)][_0x2455b1(0x613)]=function(){return!![];},VisuMZ['ItemsEquipsCore'][_0x2455b1(0x2a9)]=Window_ItemList[_0x2455b1(0x32e)]['drawItem'],Window_ItemList[_0x2455b1(0x32e)][_0x2455b1(0x47b)]=function(_0x2565b9){const _0x274bac=_0x2455b1;VisuMZ[_0x274bac(0x21d)][_0x274bac(0x2a9)][_0x274bac(0x27a)](this,_0x2565b9),this['placeItemNewLabel'](_0x2565b9);},Window_ItemList['prototype']['drawItemNumber']=function(_0x211352,_0xb6a80a,_0x9ac2d2,_0x3dbdb7){const _0x24e4e7=_0x2455b1;Window_Selectable[_0x24e4e7(0x32e)][_0x24e4e7(0x594)][_0x24e4e7(0x27a)](this,_0x211352,_0xb6a80a,_0x9ac2d2,_0x3dbdb7);},Window_ItemList[_0x2455b1(0x32e)][_0x2455b1(0x5df)]=function(_0x3854fe){const _0xa4fa4e=_0x2455b1,_0x359bcd=this[_0xa4fa4e(0x381)](_0x3854fe);if(!_0x359bcd||!this[_0xa4fa4e(0x613)]())return;if(!$gameParty[_0xa4fa4e(0x292)](_0x359bcd))return;const _0x539c41=this[_0xa4fa4e(0x2f6)](_0x3854fe),_0x207328=_0x539c41['x'],_0x169010=_0x539c41['y']+(this['lineHeight']()-ImageManager[_0xa4fa4e(0x25f)])/0x2,_0x6e9b7=VisuMZ[_0xa4fa4e(0x21d)][_0xa4fa4e(0x33c)][_0xa4fa4e(0x4a3)][_0xa4fa4e(0x2f9)],_0x2d9858=VisuMZ[_0xa4fa4e(0x21d)][_0xa4fa4e(0x33c)]['New']['OffsetY'];this[_0xa4fa4e(0x313)](_0x359bcd,_0x207328+_0x6e9b7,_0x169010+_0x2d9858);},Window_ItemList[_0x2455b1(0x32e)]['setStatusWindow']=function(_0x4389c9){const _0x38b89e=_0x2455b1;this[_0x38b89e(0x3b0)]=_0x4389c9,this['callUpdateHelp']();},VisuMZ['ItemsEquipsCore']['Window_ItemList_updateHelp']=Window_ItemList[_0x2455b1(0x32e)]['updateHelp'],Window_ItemList['prototype'][_0x2455b1(0x564)]=function(){const _0x322528=_0x2455b1;VisuMZ[_0x322528(0x21d)][_0x322528(0x368)][_0x322528(0x27a)](this),this[_0x322528(0x3b0)]&&this[_0x322528(0x3b0)][_0x322528(0x5d2)]===Window_ShopStatus&&this[_0x322528(0x3b0)][_0x322528(0x2e3)](this[_0x322528(0x27d)]());},Window_BattleItem['prototype']['isEnabled']=function(_0x4e8b8c){const _0x4a2dcb=_0x2455b1;return BattleManager['actor']()?_0x4a2dcb(0x24c)!==_0x4a2dcb(0x3e0)?BattleManager[_0x4a2dcb(0x4fc)]()[_0x4a2dcb(0x524)](_0x4e8b8c):this[_0x4a2dcb(0x239)]()?this[_0x4a2dcb(0x365)]():_0x473ca6[_0x4a2dcb(0x21d)][_0x4a2dcb(0x5aa)][_0x4a2dcb(0x27a)](this):Window_ItemList[_0x4a2dcb(0x32e)][_0x4a2dcb(0x508)][_0x4a2dcb(0x27a)](this,_0x4e8b8c);},Window_EventItem[_0x2455b1(0x32e)][_0x2455b1(0x613)]=function(){return![];},Window_EquipStatus[_0x2455b1(0x32e)][_0x2455b1(0x239)]=function(){const _0x53b339=_0x2455b1;return VisuMZ[_0x53b339(0x21d)][_0x53b339(0x33c)][_0x53b339(0x300)][_0x53b339(0x4b5)];},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x1c6)]=Window_EquipStatus[_0x2455b1(0x32e)][_0x2455b1(0x36f)],Window_EquipStatus[_0x2455b1(0x32e)][_0x2455b1(0x36f)]=function(){const _0x3d07ec=_0x2455b1;this[_0x3d07ec(0x38a)](),this[_0x3d07ec(0x256)]();if(this['_actor'])this['_actor'][_0x3d07ec(0x36f)]();if(this[_0x3d07ec(0x239)]()){if('mstEL'!==_0x3d07ec(0x59c))return _0x19a388[_0x3d07ec(0x39d)][_0x3d07ec(0x239)]()?0x1:0x2;else this[_0x3d07ec(0x557)]();}else VisuMZ[_0x3d07ec(0x21d)][_0x3d07ec(0x1c6)][_0x3d07ec(0x27a)](this);},Window_EquipStatus[_0x2455b1(0x32e)][_0x2455b1(0x557)]=function(){const _0x3faa66=_0x2455b1;this[_0x3faa66(0x5bb)][_0x3faa66(0x244)]();if(!this[_0x3faa66(0x5bc)])return;if(this[_0x3faa66(0x29b)]()){const _0x297871=ImageManager[_0x3faa66(0x3da)](this['_actor'][_0x3faa66(0x28d)]());_0x297871['addLoadListener'](this[_0x3faa66(0x4a0)][_0x3faa66(0x506)](this));}else this[_0x3faa66(0x20c)]();},Window_EquipStatus[_0x2455b1(0x32e)][_0x2455b1(0x29b)]=function(){const _0x29d1e=_0x2455b1;return Imported[_0x29d1e(0x4ba)]&&this[_0x29d1e(0x5bc)][_0x29d1e(0x28d)]()!==''&&VisuMZ[_0x29d1e(0x21d)][_0x29d1e(0x33c)][_0x29d1e(0x300)][_0x29d1e(0x2b6)];},Window_EquipStatus[_0x2455b1(0x32e)][_0x2455b1(0x4a0)]=function(){const _0x3f89dd=_0x2455b1;VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x3f89dd(0x233)][_0x3f89dd(0x27a)](this),this[_0x3f89dd(0x568)]();},Window_EquipStatus['prototype'][_0x2455b1(0x20c)]=function(){const _0x5f2127=_0x2455b1;VisuMZ[_0x5f2127(0x21d)][_0x5f2127(0x33c)]['EquipScene'][_0x5f2127(0x283)]['call'](this),this[_0x5f2127(0x568)]();},Window_EquipStatus[_0x2455b1(0x32e)][_0x2455b1(0x568)]=function(){const _0x410c4f=_0x2455b1;this['resetFontSettings'](),VisuMZ[_0x410c4f(0x21d)]['Settings'][_0x410c4f(0x300)]['DrawParamJS'][_0x410c4f(0x27a)](this);},Window_EquipStatus[_0x2455b1(0x32e)][_0x2455b1(0x635)]=function(_0x18d202,_0x2d0ea8,_0x303c70,_0x517284,_0x13e562){const _0x16948c=_0x2455b1,_0xd1e08a=ImageManager[_0x16948c(0x3da)](_0x18d202[_0x16948c(0x28d)]()),_0xde6e99=this[_0x16948c(0x266)]-_0xd1e08a[_0x16948c(0x5fb)];_0x2d0ea8+=_0xde6e99/0x2;if(_0xde6e99<0x0)_0x517284-=_0xde6e99;Window_StatusBase[_0x16948c(0x32e)][_0x16948c(0x635)][_0x16948c(0x27a)](this,_0x18d202,_0x2d0ea8,_0x303c70,_0x517284,_0x13e562);},Window_EquipStatus[_0x2455b1(0x32e)][_0x2455b1(0x2fd)]=function(){const _0x42fe7e=_0x2455b1;return Imported[_0x42fe7e(0x250)]?_0x42fe7e(0x31b)!=='NVCOt'?(this[_0x42fe7e(0x4fb)](),_0x4b21dc['clear'](),_0x34108b[_0x42fe7e(0x39d)][_0x42fe7e(0x5d4)](),![]):VisuMZ[_0x42fe7e(0x1dc)][_0x42fe7e(0x33c)]['Param'][_0x42fe7e(0x275)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus['prototype'][_0x2455b1(0x4a1)]=function(){const _0x6b3829=_0x2455b1;return VisuMZ['ItemsEquipsCore'][_0x6b3829(0x33c)][_0x6b3829(0x300)][_0x6b3829(0x262)];},Window_EquipStatus['prototype'][_0x2455b1(0x590)]=function(){const _0x256839=_0x2455b1;return Imported[_0x256839(0x250)]&&VisuMZ[_0x256839(0x1dc)][_0x256839(0x33c)]['Param'][_0x256839(0x4e5)];},Window_EquipStatus[_0x2455b1(0x32e)]['drawUpdatedParamName']=function(_0x11cacd,_0x523b59,_0x908733,_0x559c51){const _0x4f7207=_0x2455b1,_0x70e256=this[_0x4f7207(0x2ee)]();Imported[_0x4f7207(0x250)]?this[_0x4f7207(0x247)](_0x523b59+_0x70e256,_0x908733,_0x559c51,_0x11cacd,![]):this[_0x4f7207(0x442)](TextManager[_0x4f7207(0x3db)](_0x11cacd),_0x523b59+_0x70e256,_0x908733,_0x559c51);},Window_EquipStatus[_0x2455b1(0x32e)][_0x2455b1(0x556)]=function(_0x437882,_0x25694d,_0x12781b,_0x2eee11){const _0xf86562=_0x2455b1,_0x3de729=this[_0xf86562(0x2ee)]();let _0x461b02=0x0;Imported[_0xf86562(0x250)]?_0x461b02=this['_actor'][_0xf86562(0x53d)](_0x437882,!![]):_0x461b02=this[_0xf86562(0x5bc)][_0xf86562(0x3db)](_0x437882);const _0x453c24=_0x461b02;this[_0xf86562(0x442)](_0x461b02,_0x25694d,_0x12781b,_0x2eee11-_0x3de729,_0xf86562(0x265));},Window_EquipStatus[_0x2455b1(0x32e)][_0x2455b1(0x609)]=function(_0x6fa460,_0xc211de,_0x2ebeea,_0x21938a){const _0x693d39=_0x2455b1,_0x12a6df=this['itemPadding']();let _0x192bdf=0x0,_0x5279cf=0x0,_0x212720='';if(this[_0x693d39(0x5cc)]){if(_0x693d39(0x478)==='drwWZ'){Imported[_0x693d39(0x250)]?_0x693d39(0x269)===_0x693d39(0x2dc)?_0x524588[_0x693d39(0x21d)][_0x693d39(0x3c6)][_0x693d39(0x27a)](this,_0x7f474a,_0x8d61ea):(_0x192bdf=this[_0x693d39(0x5bc)][_0x693d39(0x53d)](_0x6fa460,![]),_0x5279cf=this[_0x693d39(0x5cc)][_0x693d39(0x53d)](_0x6fa460,![]),_0x212720=this[_0x693d39(0x5cc)][_0x693d39(0x53d)](_0x6fa460,!![])):(_0x192bdf=this[_0x693d39(0x5bc)][_0x693d39(0x3db)](_0x6fa460),_0x5279cf=this[_0x693d39(0x5cc)][_0x693d39(0x3db)](_0x6fa460),_0x212720=this[_0x693d39(0x5cc)][_0x693d39(0x3db)](_0x6fa460));const _0x476a78=_0x192bdf,_0x4f62ba=_0x5279cf;diffValue=_0x4f62ba-_0x476a78,this[_0x693d39(0x1b9)](ColorManager['paramchangeTextColor'](diffValue)),this[_0x693d39(0x442)](_0x212720,_0xc211de,_0x2ebeea,_0x21938a-_0x12a6df,'right');}else _0xcde4bc=_0x733777[_0x693d39(0x3db)](_0x43467c),_0x54719c=_0x456e41-_0x15f86f[_0x693d39(0x3db)](_0x39602f),this['changeTextColor'](_0x281167[_0x693d39(0x5ae)](_0x33c980)),_0x329e7d=(_0x5c86fb>=0x0?'+':'')+_0x3086d2;}},Window_EquipStatus[_0x2455b1(0x32e)]['drawUpdatedParamValueDiff']=function(_0x19643f,_0x27b1bc,_0x13b500,_0x21dbaa){const _0x44a371=_0x2455b1,_0x82a4ac=this[_0x44a371(0x2ee)]();let _0x3e8b21=0x0,_0x3720f7=0x0,_0x247cfe=![];if(this[_0x44a371(0x5cc)]){if(Imported['VisuMZ_0_CoreEngine']){if(_0x44a371(0x25e)!==_0x44a371(0x25e))return _0x459d2d[_0x44a371(0x1ed)][this[_0x44a371(0x5a9)][_0x44a371(0x268)][_0x44a371(0x448)]];else _0x3e8b21=this['_actor']['paramValueByName'](_0x19643f,![]),_0x3720f7=this[_0x44a371(0x5cc)]['paramValueByName'](_0x19643f,![]),_0x247cfe=String(this['_actor'][_0x44a371(0x53d)](_0x19643f,!![]))['match'](/([%％])/i);}else _0x3e8b21=this['_actor'][_0x44a371(0x3db)](_0x19643f),_0x3720f7=this[_0x44a371(0x5cc)][_0x44a371(0x3db)](_0x19643f),_0x247cfe=_0x3e8b21%0x1!==0x0||_0x3720f7%0x1!==0x0;const _0x5a5414=_0x3e8b21,_0x5d60e1=_0x3720f7,_0x3b0a18=_0x5d60e1-_0x5a5414;let _0xf9ac3=_0x3b0a18;if(_0x247cfe)_0xf9ac3=Math[_0x44a371(0x4c4)](_0x3b0a18*0x64)+'%';_0x3b0a18!==0x0&&(this[_0x44a371(0x1b9)](ColorManager['paramchangeTextColor'](_0x3b0a18)),_0xf9ac3=(_0x3b0a18>0x0?_0x44a371(0x291):_0x44a371(0x498))['format'](_0xf9ac3),this[_0x44a371(0x442)](_0xf9ac3,_0x27b1bc+_0x82a4ac,_0x13b500,_0x21dbaa,'left'));}},Window_EquipStatus[_0x2455b1(0x32e)]['drawItemDarkRect']=function(_0x1af322,_0x49d804,_0x122f36,_0x57d576,_0x3317df){const _0x5e8e71=_0x2455b1;if(VisuMZ[_0x5e8e71(0x21d)]['Settings'][_0x5e8e71(0x300)][_0x5e8e71(0x5d7)]===![])return;_0x3317df=Math[_0x5e8e71(0x3c5)](_0x3317df||0x1,0x1);while(_0x3317df--){if(_0x5e8e71(0x3f3)===_0x5e8e71(0x3f3)){_0x57d576=_0x57d576||this['lineHeight'](),this[_0x5e8e71(0x5bb)][_0x5e8e71(0x4ec)]=0xa0;const _0x5ec11a=ColorManager[_0x5e8e71(0x289)]();this['contents'][_0x5e8e71(0x504)](_0x1af322+0x1,_0x49d804+0x1,_0x122f36-0x2,_0x57d576-0x2,_0x5ec11a),this[_0x5e8e71(0x5bb)][_0x5e8e71(0x4ec)]=0xff;}else return _0x1ec332[_0x5e8e71(0x21d)][_0x5e8e71(0x33c)]['StatusWindow'][_0x5e8e71(0x5e1)];}},ColorManager[_0x2455b1(0x289)]=function(){const _0x15a57b=_0x2455b1,_0x2000fd=VisuMZ[_0x15a57b(0x21d)][_0x15a57b(0x33c)][_0x15a57b(0x300)];let _0x23bd44=_0x2000fd[_0x15a57b(0x56f)]!==undefined?_0x2000fd['BackRectColor']:0x13;return ColorManager['getColor'](_0x23bd44);},VisuMZ['ItemsEquipsCore'][_0x2455b1(0x4ff)]=Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x362)],Window_EquipCommand[_0x2455b1(0x32e)]['initialize']=function(_0x4c5547){const _0x3ae6f0=_0x2455b1;VisuMZ['ItemsEquipsCore'][_0x3ae6f0(0x4ff)]['call'](this,_0x4c5547),this['createCommandNameWindow'](_0x4c5547);},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x54a)]=function(_0x5bc457){const _0x582dd3=_0x2455b1,_0xed12c3=new Rectangle(0x0,0x0,_0x5bc457[_0x582dd3(0x5fb)],_0x5bc457['height']);this['_commandNameWindow']=new Window_Base(_0xed12c3),this['_commandNameWindow'][_0x582dd3(0x3eb)]=0x0,this[_0x582dd3(0x323)](this['_commandNameWindow']),this[_0x582dd3(0x515)]();},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x425)]=function(){const _0x354cf7=_0x2455b1;Window_HorzCommand['prototype'][_0x354cf7(0x425)]['call'](this);if(this[_0x354cf7(0x3c4)])this['updateCommandNameWindow']();},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x515)]=function(){const _0x40aa9b=_0x2455b1,_0x5802b3=this[_0x40aa9b(0x3c4)];_0x5802b3['contents'][_0x40aa9b(0x244)]();const _0x27e517=this[_0x40aa9b(0x5e5)](this[_0x40aa9b(0x5fe)]());if(_0x27e517===_0x40aa9b(0x4d4)){const _0x32fe19=this[_0x40aa9b(0x2f6)](this[_0x40aa9b(0x5fe)]());let _0x3940cf=this[_0x40aa9b(0x1e2)](this['index']());_0x3940cf=_0x3940cf['replace'](/\\I\[(\d+)\]/gi,''),_0x5802b3[_0x40aa9b(0x256)](),this['commandNameWindowDrawBackground'](_0x3940cf,_0x32fe19),this['commandNameWindowDrawText'](_0x3940cf,_0x32fe19),this[_0x40aa9b(0x3e6)](_0x3940cf,_0x32fe19);}},Window_EquipCommand['prototype'][_0x2455b1(0x40c)]=function(_0x45bb93,_0x34bdf1){},Window_EquipCommand['prototype'][_0x2455b1(0x2fa)]=function(_0x6c310e,_0x356f09){const _0x5ae6b6=_0x2455b1,_0x35bd57=this['_commandNameWindow'];_0x35bd57[_0x5ae6b6(0x442)](_0x6c310e,0x0,_0x356f09['y'],_0x35bd57[_0x5ae6b6(0x266)],_0x5ae6b6(0x5b8));},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x3e6)]=function(_0x3cb046,_0xbb896f){const _0xbf72da=_0x2455b1,_0x1cac95=this[_0xbf72da(0x3c4)],_0x2d81c3=$gameSystem['windowPadding'](),_0x587138=_0xbb896f['x']+Math['floor'](_0xbb896f[_0xbf72da(0x5fb)]/0x2)+_0x2d81c3;_0x1cac95['x']=_0x1cac95[_0xbf72da(0x5fb)]/-0x2+_0x587138,_0x1cac95['y']=Math['floor'](_0xbb896f[_0xbf72da(0x24b)]/0x2);},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x35d)]=function(){const _0x4a4f44=_0x2455b1;return Imported[_0x4a4f44(0x250)]&&Window_HorzCommand[_0x4a4f44(0x32e)][_0x4a4f44(0x35d)][_0x4a4f44(0x27a)](this);},Window_EquipCommand['prototype'][_0x2455b1(0x5d0)]=function(){const _0x3fcb50=_0x2455b1;if(this[_0x3fcb50(0x38f)]()===_0x3fcb50(0x366))Window_HorzCommand['prototype'][_0x3fcb50(0x5d0)][_0x3fcb50(0x27a)](this);},Window_EquipCommand['prototype'][_0x2455b1(0x3a2)]=function(){const _0x392e69=_0x2455b1;!this['processCursorSpecialCheckModernControls']()&&Window_HorzCommand['prototype'][_0x392e69(0x3a2)][_0x392e69(0x27a)](this);},Window_EquipCommand['prototype'][_0x2455b1(0x246)]=function(){const _0x13a25a=_0x2455b1;if(!this[_0x13a25a(0x2b0)]())return![];if(SceneManager[_0x13a25a(0x39d)]['constructor']!==Scene_Equip)return![];return Input[_0x13a25a(0x3fe)]('down')&&(this[_0x13a25a(0x4fb)](),SceneManager['_scene'][_0x13a25a(0x482)](),SceneManager[_0x13a25a(0x39d)][_0x13a25a(0x576)][_0x13a25a(0x3a7)](-0x1)),![];},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x2c8)]=function(){const _0x329596=_0x2455b1;return this[_0x329596(0x3a0)]?this['_list'][_0x329596(0x22d)]:0x3;},Window_EquipCommand[_0x2455b1(0x32e)]['processTouchModernControls']=function(){const _0x5a13d4=_0x2455b1;if(this[_0x5a13d4(0x41e)]()&&this[_0x5a13d4(0x5a8)]&&SceneManager['_scene'][_0x5a13d4(0x5d2)]===Scene_Equip){if(this[_0x5a13d4(0x392)]()&&TouchInput[_0x5a13d4(0x3a5)]()){if(_0x5a13d4(0x455)===_0x5a13d4(0x2e9))return _0xe181d1['ScopeRandomAllies'][_0x5a13d4(0x4c5)](_0x6085cd(_0x2798fd['$1']));else this[_0x5a13d4(0x4b3)](![]);}else TouchInput[_0x5a13d4(0x3fe)]()&&this['onTouchSelectModernControls'](!![]);TouchInput['isClicked']()&&this[_0x5a13d4(0x563)]();}},Window_EquipCommand['prototype']['onTouchSelectModernControls']=function(_0x44d2ca){const _0x335c42=_0x2455b1;this[_0x335c42(0x241)]=![];const _0xf564a6=this[_0x335c42(0x5fe)](),_0x521576=this['hitIndex'](),_0x260783=SceneManager[_0x335c42(0x39d)]['_slotWindow'];if(_0x260783[_0x335c42(0x41e)]()&&_0x260783['visible']){if(_0x521576>=0x0)_0x521576===this[_0x335c42(0x5fe)]()&&(this[_0x335c42(0x241)]=!![]),this['activate'](),this['select'](_0x521576);else _0x260783[_0x335c42(0x5b4)]()>=0x0&&(this['deactivate'](),this[_0x335c42(0x4a4)]());}_0x44d2ca&&this[_0x335c42(0x5fe)]()!==_0xf564a6&&this['playCursorSound']();},Window_EquipCommand[_0x2455b1(0x32e)]['makeCommandList']=function(){const _0x47b36d=_0x2455b1;this[_0x47b36d(0x4fa)](),this[_0x47b36d(0x3df)](),this[_0x47b36d(0x1b4)]();},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x36f)]=function(){const _0x21e366=_0x2455b1;Window_HorzCommand[_0x21e366(0x32e)][_0x21e366(0x36f)]['call'](this),this[_0x21e366(0x534)]();},Window_EquipCommand[_0x2455b1(0x32e)]['addEquipCommand']=function(){const _0x3c9ddd=_0x2455b1;if(!this[_0x3c9ddd(0x5bf)]())return;const _0x3b049e=this[_0x3c9ddd(0x560)](),_0xff4e0=VisuMZ[_0x3c9ddd(0x21d)][_0x3c9ddd(0x33c)][_0x3c9ddd(0x300)]['CmdIconEquip'],_0x4c82ac=_0x3b049e===_0x3c9ddd(0x4cf)?TextManager[_0x3c9ddd(0x2fe)]:'\x5cI[%1]%2'[_0x3c9ddd(0x4c5)](_0xff4e0,TextManager[_0x3c9ddd(0x2fe)]),_0x3a2377=this[_0x3c9ddd(0x1f7)]();this['addCommand'](_0x4c82ac,_0x3c9ddd(0x366),_0x3a2377);},Window_EquipCommand[_0x2455b1(0x32e)]['isEquipCommandAdded']=function(){const _0x1bf3b6=_0x2455b1;return!this[_0x1bf3b6(0x35d)]();},Window_EquipCommand[_0x2455b1(0x32e)]['isEquipCommandEnabled']=function(){return!![];},Window_EquipCommand['prototype'][_0x2455b1(0x3df)]=function(){const _0xf0c6f6=_0x2455b1;if(!this[_0xf0c6f6(0x43c)]())return;const _0x22d694=this[_0xf0c6f6(0x560)](),_0x3c613a=VisuMZ[_0xf0c6f6(0x21d)][_0xf0c6f6(0x33c)][_0xf0c6f6(0x300)][_0xf0c6f6(0x41c)],_0x252dc6=_0x22d694==='text'?TextManager[_0xf0c6f6(0x373)]:'\x5cI[%1]%2'[_0xf0c6f6(0x4c5)](_0x3c613a,TextManager[_0xf0c6f6(0x373)]),_0x1a9198=this[_0xf0c6f6(0x4bf)]();this[_0xf0c6f6(0x318)](_0x252dc6,_0xf0c6f6(0x373),_0x1a9198);},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x43c)]=function(){const _0x4ce40d=_0x2455b1;return VisuMZ[_0x4ce40d(0x21d)][_0x4ce40d(0x33c)]['EquipScene'][_0x4ce40d(0x608)];},Window_EquipCommand['prototype'][_0x2455b1(0x4bf)]=function(){return!![];},Window_EquipCommand['prototype'][_0x2455b1(0x1b4)]=function(){const _0x5efc07=_0x2455b1;if(!this['isClearCommandAdded']())return;const _0x5437f4=this[_0x5efc07(0x560)](),_0x5049e2=VisuMZ[_0x5efc07(0x21d)][_0x5efc07(0x33c)][_0x5efc07(0x300)][_0x5efc07(0x304)],_0x1f94b5=_0x5437f4===_0x5efc07(0x4cf)?TextManager[_0x5efc07(0x244)]:_0x5efc07(0x2b3)[_0x5efc07(0x4c5)](_0x5049e2,TextManager[_0x5efc07(0x244)]),_0x261e9d=this[_0x5efc07(0x51a)]();this[_0x5efc07(0x318)](_0x1f94b5,'clear',_0x261e9d);},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x5b9)]=function(){const _0x2756e2=_0x2455b1;return VisuMZ[_0x2756e2(0x21d)][_0x2756e2(0x33c)][_0x2756e2(0x300)][_0x2756e2(0x2f0)];},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x51a)]=function(){return!![];},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x2fb)]=function(){const _0x11fc21=_0x2455b1;return VisuMZ['ItemsEquipsCore']['Settings'][_0x11fc21(0x300)]['CmdTextAlign'];},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x47b)]=function(_0x360700){const _0x43c682=_0x2455b1,_0x820529=this['commandStyleCheck'](_0x360700);if(_0x820529===_0x43c682(0x62a))this[_0x43c682(0x375)](_0x360700);else _0x820529===_0x43c682(0x4d4)?this[_0x43c682(0x444)](_0x360700):Window_HorzCommand[_0x43c682(0x32e)][_0x43c682(0x47b)][_0x43c682(0x27a)](this,_0x360700);},Window_EquipCommand[_0x2455b1(0x32e)]['commandStyle']=function(){const _0x52427e=_0x2455b1;return VisuMZ[_0x52427e(0x21d)][_0x52427e(0x33c)][_0x52427e(0x300)][_0x52427e(0x1b1)];},Window_EquipCommand['prototype']['commandStyleCheck']=function(_0xc321e0){const _0x287d42=_0x2455b1;if(_0xc321e0<0x0)return _0x287d42(0x4cf);const _0x2fdb46=this[_0x287d42(0x560)]();if(_0x2fdb46!=='auto')return'smrYk'!==_0x287d42(0x20d)?_0x2fdb46:_0x51f70b[_0x287d42(0x21d)][_0x287d42(0x5aa)]['call'](this);else{if(this[_0x287d42(0x3e8)]()>0x0){const _0x31cc84=this['commandName'](_0xc321e0);if(_0x31cc84[_0x287d42(0x3e1)](/\\I\[(\d+)\]/i)){if(_0x287d42(0x37f)===_0x287d42(0x281))return _0x3fd852[_0x287d42(0x21d)][_0x287d42(0x33c)]['EquipScene']['LayoutStyle'];else{const _0x17fd2d=this['itemLineRect'](_0xc321e0),_0x3f7d43=this[_0x287d42(0x3e9)](_0x31cc84)[_0x287d42(0x5fb)];return _0x3f7d43<=_0x17fd2d[_0x287d42(0x5fb)]?_0x287d42(0x62a):_0x287d42(0x4d4);}}}}return _0x287d42(0x4cf);},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x375)]=function(_0xa1145a){const _0x2df1e6=_0x2455b1,_0x2a6aed=this['itemLineRect'](_0xa1145a),_0x1266d4=this['commandName'](_0xa1145a),_0x4025b4=this[_0x2df1e6(0x3e9)](_0x1266d4)[_0x2df1e6(0x5fb)];this['changePaintOpacity'](this[_0x2df1e6(0x58f)](_0xa1145a));const _0x377bdf=this[_0x2df1e6(0x2fb)]();if(_0x377bdf==='right'){if(_0x2df1e6(0x401)!==_0x2df1e6(0x401))return _0x589514[_0x2df1e6(0x21d)][_0x2df1e6(0x466)]['call'](this);else this[_0x2df1e6(0x2a0)](_0x1266d4,_0x2a6aed['x']+_0x2a6aed['width']-_0x4025b4,_0x2a6aed['y'],_0x4025b4);}else{if(_0x377bdf===_0x2df1e6(0x5b8)){const _0x1bfa82=_0x2a6aed['x']+Math[_0x2df1e6(0x637)]((_0x2a6aed[_0x2df1e6(0x5fb)]-_0x4025b4)/0x2);this[_0x2df1e6(0x2a0)](_0x1266d4,_0x1bfa82,_0x2a6aed['y'],_0x4025b4);}else{if('wkyQZ'===_0x2df1e6(0x400))this['drawTextEx'](_0x1266d4,_0x2a6aed['x'],_0x2a6aed['y'],_0x4025b4);else return this[_0x2df1e6(0x391)]();}}},Window_EquipCommand[_0x2455b1(0x32e)][_0x2455b1(0x444)]=function(_0x4f8b18){const _0xc19496=_0x2455b1;this['commandName'](_0x4f8b18)[_0xc19496(0x3e1)](/\\I\[(\d+)\]/i);const _0x3db37c=Number(RegExp['$1'])||0x0,_0x2bce5b=this['itemLineRect'](_0x4f8b18),_0x35496e=_0x2bce5b['x']+Math[_0xc19496(0x637)]((_0x2bce5b[_0xc19496(0x5fb)]-ImageManager[_0xc19496(0x4f4)])/0x2),_0x4f2cb1=_0x2bce5b['y']+(_0x2bce5b[_0xc19496(0x24b)]-ImageManager['iconHeight'])/0x2;this[_0xc19496(0x617)](_0x3db37c,_0x35496e,_0x4f2cb1);},Window_EquipSlot['prototype']['isUseModernControls']=function(){const _0x294cb6=_0x2455b1;return Imported[_0x294cb6(0x250)]&&Window_HorzCommand[_0x294cb6(0x32e)][_0x294cb6(0x35d)]['call'](this);},Window_EquipSlot[_0x2455b1(0x32e)]['activate']=function(){const _0x1029fc=_0x2455b1;Window_StatusBase[_0x1029fc(0x32e)][_0x1029fc(0x485)][_0x1029fc(0x27a)](this),this[_0x1029fc(0x425)]();},Window_EquipSlot['prototype']['processCursorMove']=function(){const _0x480c0f=_0x2455b1;Window_StatusBase['prototype']['processCursorMove'][_0x480c0f(0x27a)](this),this[_0x480c0f(0x5db)]();},Window_EquipSlot[_0x2455b1(0x32e)][_0x2455b1(0x5db)]=function(){const _0x483edf=_0x2455b1;if(!this['isShiftRemoveShortcutEnabled']())return;if(Input[_0x483edf(0x3fe)](_0x483edf(0x36c))&&this[_0x483edf(0x27d)]()){const _0x357a9c=SceneManager[_0x483edf(0x39d)][_0x483edf(0x5bc)];_0x357a9c&&(this[_0x483edf(0x513)](this[_0x483edf(0x5fe)]())?(this[_0x483edf(0x3bc)](),this[_0x483edf(0x564)]()):this[_0x483edf(0x5fa)]());}},Window_EquipSlot[_0x2455b1(0x32e)][_0x2455b1(0x513)]=function(_0x3b9330){const _0x150c89=_0x2455b1,_0x55dcf2=SceneManager[_0x150c89(0x39d)][_0x150c89(0x5bc)];if(!_0x55dcf2)return;if(!_0x55dcf2[_0x150c89(0x356)](this[_0x150c89(0x5fe)]()))return![];const _0x134b14=_0x55dcf2[_0x150c89(0x61f)]()[this[_0x150c89(0x5fe)]()];if(_0x55dcf2[_0x150c89(0x1ca)]()[_0x150c89(0x474)](_0x134b14))return![];return!![];;},Window_EquipSlot['prototype']['processShiftRemoveShortcut']=function(){const _0x573f8e=_0x2455b1;SoundManager[_0x573f8e(0x2ad)]();const _0x88286f=SceneManager[_0x573f8e(0x39d)][_0x573f8e(0x5bc)];_0x88286f[_0x573f8e(0x367)](this[_0x573f8e(0x5fe)](),null),this[_0x573f8e(0x36f)](),this['_itemWindow'][_0x573f8e(0x36f)](),this[_0x573f8e(0x425)]();const _0x35f1d7=SceneManager['_scene']['_statusWindow'];if(_0x35f1d7)_0x35f1d7[_0x573f8e(0x36f)]();},Window_EquipSlot[_0x2455b1(0x32e)][_0x2455b1(0x454)]=function(){const _0x3d9926=_0x2455b1;if(!this[_0x3d9926(0x2ac)])return![];if(!VisuMZ[_0x3d9926(0x21d)][_0x3d9926(0x33c)][_0x3d9926(0x300)]['ShiftShortcutKey'])return![];return!![];},Window_EquipSlot[_0x2455b1(0x32e)]['processCursorMoveModernControls']=function(){const _0x4ffcf7=_0x2455b1;!this[_0x4ffcf7(0x246)]()&&Window_StatusBase[_0x4ffcf7(0x32e)][_0x4ffcf7(0x3a2)]['call'](this);},Window_EquipSlot[_0x2455b1(0x32e)][_0x2455b1(0x246)]=function(){const _0x54eca=_0x2455b1;if(!this[_0x54eca(0x2b0)]())return![];if(SceneManager[_0x54eca(0x39d)][_0x54eca(0x5d2)]!==Scene_Equip)return![];if(this[_0x54eca(0x1cc)]())return this[_0x54eca(0x4fb)](),Input[_0x54eca(0x244)](),SceneManager[_0x54eca(0x39d)][_0x54eca(0x5d4)](),![];else{if(Input['isRepeated'](_0x54eca(0x53a))){const _0x2ab843=this['index']();if(Input[_0x54eca(0x39c)](_0x54eca(0x36c))){if('tbgGl'!=='tbgGl')return this['contents'][_0x54eca(0x517)]/_0x47cd00['mainFontSize']();else this[_0x54eca(0x61d)]();}else this[_0x54eca(0x1d3)](Input[_0x54eca(0x3fe)]('down'));return this[_0x54eca(0x5fe)]()!==_0x2ab843&&(_0x54eca(0x20e)!==_0x54eca(0x20e)?_0x316368=_0x57a9f8(_0x14fed9['$1'])[_0x54eca(0x1fa)]()[_0x54eca(0x48e)]():this[_0x54eca(0x4fb)]()),!![];}else{if(this[_0x54eca(0x4d1)]()&&Input['isTriggered'](_0x54eca(0x36c)))return!![];}}return![];},Window_EquipSlot[_0x2455b1(0x32e)]['allowCommandWindowCursorUp']=function(){const _0x29d5d7=_0x2455b1;if(this['index']()!==0x0)return![];const _0x1d1a48=VisuMZ[_0x29d5d7(0x21d)][_0x29d5d7(0x33c)][_0x29d5d7(0x300)];if(!_0x1d1a48[_0x29d5d7(0x608)]&&!_0x1d1a48[_0x29d5d7(0x2f0)])return![];return Input[_0x29d5d7(0x3fe)]('up');},Window_EquipSlot[_0x2455b1(0x32e)]['isShiftShortcutKeyForRemove']=function(){const _0x3216ee=_0x2455b1;return VisuMZ[_0x3216ee(0x21d)][_0x3216ee(0x33c)][_0x3216ee(0x300)]['ShiftShortcutKey'];},Window_EquipSlot[_0x2455b1(0x32e)][_0x2455b1(0x544)]=function(){const _0x5b30e7=_0x2455b1;if(this['isOpen']()&&this[_0x5b30e7(0x5a8)]&&SceneManager[_0x5b30e7(0x39d)][_0x5b30e7(0x5d2)]===Scene_Equip){if(this[_0x5b30e7(0x392)]()&&TouchInput[_0x5b30e7(0x3a5)]())this['onTouchSelectModernControls'](![]);else TouchInput[_0x5b30e7(0x3fe)]()&&this[_0x5b30e7(0x4b3)](!![]);if(TouchInput[_0x5b30e7(0x503)]())this[_0x5b30e7(0x563)]();else TouchInput[_0x5b30e7(0x2ff)]()&&this[_0x5b30e7(0x50b)]();}},Window_EquipSlot[_0x2455b1(0x32e)][_0x2455b1(0x4b3)]=function(_0x916a13){const _0x15bbfd=_0x2455b1;this['_doubleTouch']=![];const _0x97e0b8=this[_0x15bbfd(0x5fe)](),_0x1e18fb=this[_0x15bbfd(0x5b4)](),_0xe6b82c=SceneManager[_0x15bbfd(0x39d)][_0x15bbfd(0x4bc)];if(_0xe6b82c[_0x15bbfd(0x41e)]()&&_0xe6b82c['visible']){if(_0x1e18fb>=0x0)_0x1e18fb===this[_0x15bbfd(0x5fe)]()&&(this[_0x15bbfd(0x241)]=!![]),this['activate'](),this[_0x15bbfd(0x439)](_0x1e18fb);else _0xe6b82c['hitIndex']()>=0x0&&(this[_0x15bbfd(0x2bb)](),this[_0x15bbfd(0x4a4)]());}_0x916a13&&this[_0x15bbfd(0x5fe)]()!==_0x97e0b8&&this['playCursorSound']();},Window_EquipSlot[_0x2455b1(0x32e)][_0x2455b1(0x634)]=function(){const _0x25d553=_0x2455b1;return this[_0x25d553(0x5fe)]();},VisuMZ['ItemsEquipsCore'][_0x2455b1(0x3b2)]=Window_EquipItem[_0x2455b1(0x32e)][_0x2455b1(0x474)],Window_EquipItem['prototype'][_0x2455b1(0x474)]=function(_0xe6c518){const _0x1f3f3d=_0x2455b1;if(_0xe6c518===null&&this[_0x1f3f3d(0x1ca)]()['includes'](this[_0x1f3f3d(0x1cb)]())){if(_0x1f3f3d(0x589)!==_0x1f3f3d(0x589))_0x3b43ad[_0x1f3f3d(0x21d)][_0x1f3f3d(0x569)]['call'](this,_0x3b4fbb);else return![];}else return VisuMZ[_0x1f3f3d(0x21d)][_0x1f3f3d(0x3b2)]['call'](this,_0xe6c518);},VisuMZ[_0x2455b1(0x21d)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x2455b1(0x32e)][_0x2455b1(0x508)],Window_EquipItem['prototype']['isEnabled']=function(_0x41f270){const _0x17e949=_0x2455b1;if(_0x41f270&&this['_actor']){if(this[_0x17e949(0x3f0)](_0x41f270))return![];if(this[_0x17e949(0x1da)](_0x41f270))return![];if(this[_0x17e949(0x3cf)](_0x41f270))return![];}if(!_0x41f270)return!this[_0x17e949(0x1ca)]()[_0x17e949(0x474)](this['etypeId']());return VisuMZ[_0x17e949(0x21d)]['Window_EquipItem_isEnabled'][_0x17e949(0x27a)](this,_0x41f270);},Window_EquipItem[_0x2455b1(0x32e)][_0x2455b1(0x3f0)]=function(_0x2ea5e4){const _0x14e47e=_0x2455b1,_0xb7b8bd=_0x2ea5e4['note'];if(_0xb7b8bd[_0x14e47e(0x3e1)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if(_0x14e47e(0x3ed)===_0x14e47e(0x2db))return _0x14e47e(0x4cf);else{const _0x14aa81=Number(RegExp['$1'])||0x1;let _0x282dc7=0x0;const _0x2a2840=this[_0x14e47e(0x5bc)]['equips'](),_0x4518a1=SceneManager[_0x14e47e(0x39d)][_0x14e47e(0x576)][_0x14e47e(0x634)]();_0x2a2840[_0x4518a1]=null;for(const _0x5202e6 of _0x2a2840){if(!_0x5202e6)continue;if(DataManager[_0x14e47e(0x456)](_0x2ea5e4)===DataManager['isWeapon'](_0x5202e6)){if(_0x2ea5e4['id']===_0x5202e6['id'])_0x282dc7+=0x1;}}return _0x282dc7>=_0x14aa81;}}else return![];},Window_EquipItem['prototype'][_0x2455b1(0x1da)]=function(_0xeaf742){const _0x516a5f=_0x2455b1;if(!DataManager[_0x516a5f(0x456)](_0xeaf742))return![];const _0x50fd41=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x35859e=0x0;const _0x3709d1=this[_0x516a5f(0x5bc)][_0x516a5f(0x260)](),_0x40fc45=SceneManager['_scene'][_0x516a5f(0x576)][_0x516a5f(0x634)]();_0x3709d1[_0x40fc45]=null;for(const _0x42d7bc of _0x3709d1){if(!_0x42d7bc)continue;if(!DataManager['isWeapon'](_0x42d7bc))continue;if(_0xeaf742[_0x516a5f(0x57d)]===_0x42d7bc[_0x516a5f(0x57d)]){_0x35859e+=0x1;if(_0xeaf742[_0x516a5f(0x3c8)][_0x516a5f(0x3e1)](_0x50fd41)){const _0x21e88f=Number(RegExp['$1'])||0x1;if(_0x35859e>=_0x21e88f)return!![];}if(_0x42d7bc[_0x516a5f(0x3c8)][_0x516a5f(0x3e1)](_0x50fd41)){const _0x4f1d69=Number(RegExp['$1'])||0x1;if(_0x35859e>=_0x4f1d69)return!![];}}}return![];},Window_EquipItem[_0x2455b1(0x32e)][_0x2455b1(0x3cf)]=function(_0x2dd950){const _0x421208=_0x2455b1;if(!DataManager[_0x421208(0x4c0)](_0x2dd950))return![];const _0x472150=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x40fc59=0x0;const _0x15fba5=this['_actor'][_0x421208(0x260)](),_0x184e16=SceneManager['_scene']['_slotWindow'][_0x421208(0x634)]();_0x15fba5[_0x184e16]=null;for(const _0x27b1cf of _0x15fba5){if(!_0x27b1cf)continue;if(!DataManager['isArmor'](_0x27b1cf))continue;if(_0x2dd950[_0x421208(0x632)]===_0x27b1cf[_0x421208(0x632)]){_0x40fc59+=0x1;if(_0x2dd950['note'][_0x421208(0x3e1)](_0x472150)){const _0x27abb6=Number(RegExp['$1'])||0x1;if(_0x40fc59>=_0x27abb6)return!![];}if(_0x27b1cf[_0x421208(0x3c8)]['match'](_0x472150)){const _0x498e6e=Number(RegExp['$1'])||0x1;if(_0x40fc59>=_0x498e6e)return!![];}}}return![];},Window_EquipItem['prototype'][_0x2455b1(0x1ca)]=function(){const _0x56e645=_0x2455b1;return VisuMZ['ItemsEquipsCore'][_0x56e645(0x33c)][_0x56e645(0x300)]['NonRemoveETypes'];},Window_EquipItem[_0x2455b1(0x32e)]['drawItem']=function(_0x39b654){const _0x46356c=_0x2455b1,_0x18dc4b=this[_0x46356c(0x381)](_0x39b654);if(_0x18dc4b)'cJgXf'==='cJgXf'?Window_ItemList['prototype'][_0x46356c(0x47b)][_0x46356c(0x27a)](this,_0x39b654):_0xb10ce2=_0x34bbe0+_0x4e5580[_0x46356c(0x637)]((_0x570d80-_0x28f552['width'])/0x2);else{if(_0x46356c(0x25b)!==_0x46356c(0x25b)){if(this[_0x46356c(0x345)]())return _0x2ad647[_0x46356c(0x42e)](_0x46356c(0x36c));return _0x5126ae[_0x46356c(0x32e)]['buttonAssistKey3'][_0x46356c(0x27a)](this);}else this[_0x46356c(0x509)](_0x39b654);}},Window_EquipItem['prototype']['drawRemoveItem']=function(_0x333439){const _0x14842d=_0x2455b1;this['changePaintOpacity'](this[_0x14842d(0x508)](null));const _0x21bcf3=VisuMZ[_0x14842d(0x21d)]['Settings'][_0x14842d(0x300)],_0x3f44f8=this[_0x14842d(0x2f6)](_0x333439),_0x350522=_0x3f44f8['y']+(this['lineHeight']()-ImageManager[_0x14842d(0x25f)])/0x2,_0x320377=ImageManager[_0x14842d(0x4f4)]+0x4,_0xcd80b9=Math[_0x14842d(0x3c5)](0x0,_0x3f44f8[_0x14842d(0x5fb)]-_0x320377);this[_0x14842d(0x4a7)](),this[_0x14842d(0x617)](_0x21bcf3['RemoveEquipIcon'],_0x3f44f8['x'],_0x350522),this[_0x14842d(0x442)](_0x21bcf3[_0x14842d(0x2ec)],_0x3f44f8['x']+_0x320377,_0x3f44f8['y'],_0xcd80b9),this[_0x14842d(0x558)](!![]);},Window_EquipItem[_0x2455b1(0x32e)][_0x2455b1(0x564)]=function(){const _0x1ab340=_0x2455b1;Window_ItemList[_0x1ab340(0x32e)][_0x1ab340(0x564)]['call'](this);if(this[_0x1ab340(0x5bc)]&&this[_0x1ab340(0x3b0)]&&this['_slotId']>=0x0){const _0x348af9=JsonEx[_0x1ab340(0x39e)](this[_0x1ab340(0x5bc)]);_0x348af9['_tempActor']=!![],_0x348af9[_0x1ab340(0x5dd)](this[_0x1ab340(0x5eb)],this['item']()),this['_statusWindow'][_0x1ab340(0x2b9)](_0x348af9);}},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x63c)]=Window_ShopCommand['prototype'][_0x2455b1(0x362)],Window_ShopCommand[_0x2455b1(0x32e)][_0x2455b1(0x362)]=function(_0x434f68){const _0x22f0d5=_0x2455b1;VisuMZ[_0x22f0d5(0x21d)][_0x22f0d5(0x63c)][_0x22f0d5(0x27a)](this,_0x434f68),this[_0x22f0d5(0x54a)](_0x434f68);},Window_ShopCommand[_0x2455b1(0x32e)][_0x2455b1(0x54a)]=function(_0x2739f7){const _0x43a7ff=_0x2455b1,_0x1fa454=new Rectangle(0x0,0x0,_0x2739f7['width'],_0x2739f7['height']);this['_commandNameWindow']=new Window_Base(_0x1fa454),this[_0x43a7ff(0x3c4)][_0x43a7ff(0x3eb)]=0x0,this[_0x43a7ff(0x323)](this['_commandNameWindow']),this[_0x43a7ff(0x515)]();},Window_ShopCommand[_0x2455b1(0x32e)]['callUpdateHelp']=function(){const _0x8cd0fc=_0x2455b1;Window_HorzCommand[_0x8cd0fc(0x32e)][_0x8cd0fc(0x425)][_0x8cd0fc(0x27a)](this);if(this[_0x8cd0fc(0x3c4)])this[_0x8cd0fc(0x515)]();},Window_ShopCommand[_0x2455b1(0x32e)][_0x2455b1(0x515)]=function(){const _0xc1d838=_0x2455b1,_0x4a2e6d=this['_commandNameWindow'];_0x4a2e6d['contents'][_0xc1d838(0x244)]();const _0x8cf3d3=this[_0xc1d838(0x5e5)](this['index']());if(_0x8cf3d3===_0xc1d838(0x4d4)){const _0x48ec95=this[_0xc1d838(0x2f6)](this[_0xc1d838(0x5fe)]());let _0x40d174=this[_0xc1d838(0x1e2)](this[_0xc1d838(0x5fe)]());_0x40d174=_0x40d174[_0xc1d838(0x523)](/\\I\[(\d+)\]/gi,''),_0x4a2e6d[_0xc1d838(0x256)](),this[_0xc1d838(0x40c)](_0x40d174,_0x48ec95),this[_0xc1d838(0x2fa)](_0x40d174,_0x48ec95),this[_0xc1d838(0x3e6)](_0x40d174,_0x48ec95);}},Window_ShopCommand['prototype']['commandNameWindowDrawBackground']=function(_0x56e542,_0x38e550){},Window_ShopCommand[_0x2455b1(0x32e)]['commandNameWindowDrawText']=function(_0x562ea0,_0x4c5159){const _0xd951c5=_0x2455b1,_0x2effe6=this[_0xd951c5(0x3c4)];_0x2effe6[_0xd951c5(0x442)](_0x562ea0,0x0,_0x4c5159['y'],_0x2effe6['innerWidth'],_0xd951c5(0x5b8));},Window_ShopCommand[_0x2455b1(0x32e)][_0x2455b1(0x3e6)]=function(_0x16a0b0,_0x5dcbe6){const _0x230f13=_0x2455b1,_0x2aab41=this[_0x230f13(0x3c4)],_0x2ec488=$gameSystem[_0x230f13(0x531)](),_0x17792c=_0x5dcbe6['x']+Math[_0x230f13(0x637)](_0x5dcbe6[_0x230f13(0x5fb)]/0x2)+_0x2ec488;_0x2aab41['x']=_0x2aab41[_0x230f13(0x5fb)]/-0x2+_0x17792c,_0x2aab41['y']=Math[_0x230f13(0x637)](_0x5dcbe6[_0x230f13(0x24b)]/0x2);},Window_ShopCommand[_0x2455b1(0x32e)]['maxCols']=function(){const _0x428e31=_0x2455b1;return this[_0x428e31(0x3a0)]?this[_0x428e31(0x3a0)][_0x428e31(0x22d)]:0x3;},Window_ShopCommand['prototype'][_0x2455b1(0x360)]=function(){const _0x44eb00=_0x2455b1;return VisuMZ['ItemsEquipsCore'][_0x44eb00(0x33c)]['ShopScene'][_0x44eb00(0x55d)];},Window_ShopCommand[_0x2455b1(0x32e)][_0x2455b1(0x595)]=function(){const _0x355edf=_0x2455b1;this['addBuyCommand'](),this[_0x355edf(0x5a6)](),this['addCancelCommand']();},Window_ShopCommand[_0x2455b1(0x32e)][_0x2455b1(0x36f)]=function(){const _0x298cd3=_0x2455b1;Window_HorzCommand['prototype'][_0x298cd3(0x36f)][_0x298cd3(0x27a)](this),this['refreshCursor']();},Window_ShopCommand[_0x2455b1(0x32e)]['addBuyCommand']=function(){const _0x116ab5=_0x2455b1,_0x55db58=this[_0x116ab5(0x560)](),_0x3f81c1=VisuMZ[_0x116ab5(0x21d)]['Settings']['ShopScene'][_0x116ab5(0x5ba)],_0x31e8ad=_0x55db58===_0x116ab5(0x4cf)?TextManager['buy']:_0x116ab5(0x2b3)[_0x116ab5(0x4c5)](_0x3f81c1,TextManager['buy']),_0x41fa28=this[_0x116ab5(0x301)]();if(this[_0x116ab5(0x360)]()&&!_0x41fa28)return;this[_0x116ab5(0x318)](_0x31e8ad,_0x116ab5(0x433),_0x41fa28);},Window_ShopCommand[_0x2455b1(0x32e)][_0x2455b1(0x301)]=function(){const _0x27dc3b=_0x2455b1;if(SceneManager['_scene'][_0x27dc3b(0x5d2)]===Scene_Shop){if(_0x27dc3b(0x29a)!=='UPLkl')this[_0x27dc3b(0x2a0)](_0x5b4ce0,_0x27ec46['x']+_0x4fcad9[_0x27dc3b(0x5fb)]-_0x15ca8e,_0x3e2a34['y'],_0x19bbc1);else return SceneManager[_0x27dc3b(0x39d)][_0x27dc3b(0x2f5)]>0x0;}else return _0x27dc3b(0x335)!==_0x27dc3b(0x335)?this[_0x27dc3b(0x573)]()[_0x27dc3b(0x3e1)](/RIGHT/i):!![];},Window_ShopCommand['prototype'][_0x2455b1(0x5a6)]=function(){const _0xa61136=_0x2455b1,_0x3a246b=this[_0xa61136(0x560)](),_0x29ddef=VisuMZ[_0xa61136(0x21d)][_0xa61136(0x33c)]['ShopScene']['CmdIconSell'],_0x55fe7d=_0x3a246b===_0xa61136(0x4cf)?TextManager[_0xa61136(0x5ca)]:_0xa61136(0x2b3)['format'](_0x29ddef,TextManager[_0xa61136(0x5ca)]),_0x3fa85c=this[_0xa61136(0x5d5)]();if(this[_0xa61136(0x360)]()&&!_0x3fa85c)return;this['addCommand'](_0x55fe7d,'sell',_0x3fa85c);},Window_ShopCommand[_0x2455b1(0x32e)][_0x2455b1(0x5d5)]=function(){return!this['_purchaseOnly'];},Window_ShopCommand[_0x2455b1(0x32e)][_0x2455b1(0x3d8)]=function(){const _0x39b360=_0x2455b1,_0x20db44=this['commandStyle'](),_0x4ef08c=VisuMZ[_0x39b360(0x21d)][_0x39b360(0x33c)][_0x39b360(0x586)][_0x39b360(0x5ad)],_0x3f68f1=VisuMZ[_0x39b360(0x21d)][_0x39b360(0x33c)][_0x39b360(0x586)][_0x39b360(0x630)],_0x1be874=_0x20db44===_0x39b360(0x4cf)?_0x3f68f1:'\x5cI[%1]%2'['format'](_0x4ef08c,_0x3f68f1);this['addCommand'](_0x1be874,_0x39b360(0x4fd));},Window_ShopCommand[_0x2455b1(0x32e)]['itemTextAlign']=function(){const _0x2bda83=_0x2455b1;return VisuMZ[_0x2bda83(0x21d)][_0x2bda83(0x33c)][_0x2bda83(0x586)][_0x2bda83(0x2cc)];},Window_ShopCommand['prototype'][_0x2455b1(0x47b)]=function(_0xa30c67){const _0x2d1b15=_0x2455b1,_0x3328ad=this[_0x2d1b15(0x5e5)](_0xa30c67);if(_0x3328ad===_0x2d1b15(0x62a))this[_0x2d1b15(0x375)](_0xa30c67);else{if(_0x3328ad==='icon'){if(_0x2d1b15(0x337)===_0x2d1b15(0x337))this[_0x2d1b15(0x444)](_0xa30c67);else return this[_0x2d1b15(0x239)]()?this[_0x2d1b15(0x423)]():_0x48b9c[_0x2d1b15(0x21d)][_0x2d1b15(0x33c)][_0x2d1b15(0x300)][_0x2d1b15(0x2d0)];}else Window_HorzCommand[_0x2d1b15(0x32e)][_0x2d1b15(0x47b)][_0x2d1b15(0x27a)](this,_0xa30c67);}},Window_ShopCommand[_0x2455b1(0x32e)][_0x2455b1(0x560)]=function(){const _0x2d552d=_0x2455b1;return VisuMZ['ItemsEquipsCore'][_0x2d552d(0x33c)][_0x2d552d(0x586)]['CmdStyle'];},Window_ShopCommand[_0x2455b1(0x32e)]['commandStyleCheck']=function(_0x298dd1){const _0x35b817=_0x2455b1;if(_0x298dd1<0x0)return _0x35b817(0x4cf);const _0x582768=this[_0x35b817(0x560)]();if(_0x582768!==_0x35b817(0x40a))return _0x582768;else{if(this[_0x35b817(0x3e8)]()>0x0){const _0x4a9435=this[_0x35b817(0x1e2)](_0x298dd1);if(_0x4a9435['match'](/\\I\[(\d+)\]/i)){if(_0x35b817(0x636)===_0x35b817(0x633))return _0x35b817(0x1ee);else{const _0x15eeec=this['itemLineRect'](_0x298dd1),_0x520bbb=this[_0x35b817(0x3e9)](_0x4a9435)['width'];if(_0x520bbb<=_0x15eeec[_0x35b817(0x5fb)])return _0x35b817(0x62a);else{if(_0x35b817(0x1c2)!=='kqlpF')return'icon';else{const _0x515790=_0x3f3229[_0x35b817(0x39e)](this['_forcedSlots']||this['currentClass']()[_0x35b817(0x61f)]);if(_0x515790[_0x35b817(0x22d)]>=0x2&&this['isDualWield']())_0x515790[0x1]=0x1;return _0x515790;}}}}}}return _0x35b817(0x4cf);},Window_ShopCommand[_0x2455b1(0x32e)][_0x2455b1(0x375)]=function(_0x1945e9){const _0x163f8e=_0x2455b1,_0xc2fb19=this['itemLineRect'](_0x1945e9),_0x9ffbaf=this[_0x163f8e(0x1e2)](_0x1945e9),_0x29af22=this[_0x163f8e(0x3e9)](_0x9ffbaf)['width'];this[_0x163f8e(0x558)](this[_0x163f8e(0x58f)](_0x1945e9));const _0x227622=this[_0x163f8e(0x2fb)]();if(_0x227622==='right')this[_0x163f8e(0x2a0)](_0x9ffbaf,_0xc2fb19['x']+_0xc2fb19['width']-_0x29af22,_0xc2fb19['y'],_0x29af22);else{if(_0x227622===_0x163f8e(0x5b8)){if('itYjJ'===_0x163f8e(0x1c8))return _0x180340[_0x163f8e(0x21d)][_0x163f8e(0x33c)][_0x163f8e(0x3b8)][_0x163f8e(0x277)];else{const _0x4cf5f2=_0xc2fb19['x']+Math['floor']((_0xc2fb19[_0x163f8e(0x5fb)]-_0x29af22)/0x2);this[_0x163f8e(0x2a0)](_0x9ffbaf,_0x4cf5f2,_0xc2fb19['y'],_0x29af22);}}else this[_0x163f8e(0x2a0)](_0x9ffbaf,_0xc2fb19['x'],_0xc2fb19['y'],_0x29af22);}},Window_ShopCommand['prototype']['drawItemStyleIcon']=function(_0x171658){const _0x2ccb96=_0x2455b1;this[_0x2ccb96(0x1e2)](_0x171658)[_0x2ccb96(0x3e1)](/\\I\[(\d+)\]/i);const _0x92e4a2=Number(RegExp['$1'])||0x0,_0x11c226=this['itemLineRect'](_0x171658),_0x2dd024=_0x11c226['x']+Math[_0x2ccb96(0x637)]((_0x11c226['width']-ImageManager[_0x2ccb96(0x4f4)])/0x2),_0x5f3b1a=_0x11c226['y']+(_0x11c226['height']-ImageManager[_0x2ccb96(0x25f)])/0x2;this[_0x2ccb96(0x617)](_0x92e4a2,_0x2dd024,_0x5f3b1a);},VisuMZ['ItemsEquipsCore'][_0x2455b1(0x5fd)]=Window_ShopBuy['prototype'][_0x2455b1(0x36f)],Window_ShopBuy[_0x2455b1(0x32e)][_0x2455b1(0x36f)]=function(){const _0x2f3255=_0x2455b1;this[_0x2f3255(0x453)](),VisuMZ[_0x2f3255(0x21d)][_0x2f3255(0x5fd)][_0x2f3255(0x27a)](this);},Window_ShopBuy[_0x2455b1(0x32e)][_0x2455b1(0x453)]=function(){const _0x27d360=_0x2455b1;if(SceneManager[_0x27d360(0x39d)][_0x27d360(0x5d2)]===Scene_Shop){if(_0x27d360(0x243)===_0x27d360(0x1d1)){const _0x4367e2=this[_0x27d360(0x560)](),_0x5516d5=_0x380b5d['ItemsEquipsCore'][_0x27d360(0x33c)][_0x27d360(0x586)][_0x27d360(0x5e7)],_0x689f0e=_0x4367e2===_0x27d360(0x4cf)?_0x20f7a7[_0x27d360(0x5ca)]:_0x27d360(0x2b3)[_0x27d360(0x4c5)](_0x5516d5,_0xc85f84[_0x27d360(0x5ca)]),_0x3c53e6=this[_0x27d360(0x5d5)]();if(this[_0x27d360(0x360)]()&&!_0x3c53e6)return;this[_0x27d360(0x318)](_0x689f0e,_0x27d360(0x5ca),_0x3c53e6);}else this[_0x27d360(0x4b6)]=SceneManager[_0x27d360(0x39d)][_0x27d360(0x28b)]();}},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x3ef)]=Window_ShopBuy['prototype'][_0x2455b1(0x5b5)],Window_ShopBuy[_0x2455b1(0x32e)][_0x2455b1(0x5b5)]=function(_0xe22057){const _0x3011b6=_0x2455b1;if(!_0xe22057)return 0x0;let _0x425b24=VisuMZ[_0x3011b6(0x21d)][_0x3011b6(0x3ef)]['call'](this,_0xe22057);return Math[_0x3011b6(0x3c5)](0x0,this[_0x3011b6(0x352)](_0xe22057,_0x425b24));},Window_ShopBuy[_0x2455b1(0x32e)]['modifiedBuyPriceItemsEquipsCore']=function(_0x38fec8,_0x3f5e86){const _0x392900=_0x2455b1,_0x284657=_0x38fec8[_0x392900(0x3c8)];if(_0x284657[_0x392900(0x3e1)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x22d375=String(RegExp['$1']);try{eval(_0x22d375);}catch(_0x3a20e9){if(_0x392900(0x46d)!==_0x392900(0x226)){if($gameTemp[_0x392900(0x386)]())console[_0x392900(0x1f8)](_0x3a20e9);}else{if(_0x59c421['isKeyItem'](_0x325284))return _0x5399dd['optKeyItemsNumber'];return!![];}}}_0x3f5e86=VisuMZ[_0x392900(0x21d)][_0x392900(0x33c)][_0x392900(0x586)][_0x392900(0x280)][_0x392900(0x27a)](this,_0x38fec8,_0x3f5e86);if(isNaN(_0x3f5e86))_0x3f5e86=0x0;return Math[_0x392900(0x637)](_0x3f5e86);},Window_ShopBuy[_0x2455b1(0x32e)][_0x2455b1(0x47b)]=function(_0x26d7c3){const _0x50bf77=_0x2455b1;this[_0x50bf77(0x256)]();const _0x30b20d=this[_0x50bf77(0x381)](_0x26d7c3),_0x26ef66=this[_0x50bf77(0x2f6)](_0x26d7c3),_0x3ef027=_0x26ef66[_0x50bf77(0x5fb)];this[_0x50bf77(0x558)](this[_0x50bf77(0x508)](_0x30b20d)),this['drawItemName'](_0x30b20d,_0x26ef66['x'],_0x26ef66['y'],_0x3ef027),this[_0x50bf77(0x1e7)](_0x30b20d,_0x26ef66),this['changePaintOpacity'](!![]);},Window_ShopBuy[_0x2455b1(0x32e)][_0x2455b1(0x1e7)]=function(_0x2f4645,_0x2afbbf){const _0x11116f=_0x2455b1,_0x47eab9=this[_0x11116f(0x5b5)](_0x2f4645);this[_0x11116f(0x49d)](_0x47eab9,TextManager[_0x11116f(0x327)],_0x2afbbf['x'],_0x2afbbf['y'],_0x2afbbf[_0x11116f(0x5fb)]);},Window_ShopSell[_0x2455b1(0x32e)][_0x2455b1(0x2c8)]=function(){const _0x2ee736=_0x2455b1;return SceneManager[_0x2ee736(0x39d)][_0x2ee736(0x239)]()?0x1:0x2;},VisuMZ[_0x2455b1(0x21d)][_0x2455b1(0x5ab)]=Window_ShopSell[_0x2455b1(0x32e)][_0x2455b1(0x508)],Window_ShopSell[_0x2455b1(0x32e)][_0x2455b1(0x508)]=function(_0x39e28c){const _0x3c6391=_0x2455b1;if(!_0x39e28c)return![];const _0x582a17=_0x39e28c[_0x3c6391(0x3c8)];if(_0x582a17['match'](/<CANNOT SELL>/i))return![];if(_0x582a17['match'](/<CAN SELL>/i))return!![];if(_0x582a17[_0x3c6391(0x3e1)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2dc5be=JSON[_0x3c6391(0x398)]('['+RegExp['$1'][_0x3c6391(0x3e1)](/\d+/g)+']');for(const _0x5bc333 of _0x2dc5be){if(_0x3c6391(0x2c3)==='KWRWO'){if(!$gameSwitches[_0x3c6391(0x346)](_0x5bc333))return![];}else return;}}if(_0x582a17[_0x3c6391(0x3e1)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3c6391(0x5f1)!==_0x3c6391(0x5f1))return _0x1992ca[_0x3c6391(0x21d)][_0x3c6391(0x33c)]['StatusWindow'][_0x3c6391(0x1fe)];else{const _0x3e3940=JSON[_0x3c6391(0x398)]('['+RegExp['$1'][_0x3c6391(0x3e1)](/\d+/g)+']');for(const _0x1cafbe of _0x3e3940){if(_0x3c6391(0x44f)!==_0x3c6391(0x540)){if(!$gameSwitches['value'](_0x1cafbe))return![];}else{const _0x260a82=_0x4f29f5[_0x21e419];_0x260a82&&_0x260a82['etypeId']===_0xb0f622+0x1&&_0x439d7d[_0x3c6391(0x215)](_0x260a82);}}}}if(_0x582a17[_0x3c6391(0x3e1)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3c6391(0x2c0)===_0x3c6391(0x550))_0x3f2fb8=_0x3c6391(0x2b3)[_0x3c6391(0x4c5)](_0x4f0ead,_0x3a7fec);else{const _0x35f551=JSON[_0x3c6391(0x398)]('['+RegExp['$1'][_0x3c6391(0x3e1)](/\d+/g)+']');for(const _0x4796bb of _0x35f551){if(_0x3c6391(0x55e)!=='MfZSS'){if($gameSwitches['value'](_0x4796bb))return![];}else{_0x1a6e48=_0x5820ef;if(!_0x28133a[_0x13706f])return _0x3b3315;}}}}return VisuMZ['ItemsEquipsCore'][_0x3c6391(0x5ab)][_0x3c6391(0x27a)](this,_0x39e28c);},Window_ShopStatus['prototype'][_0x2455b1(0x570)]=function(){return![];},Window_ShopStatus[_0x2455b1(0x32e)]['loadFaceImages']=function(){const _0x492634=_0x2455b1;Window_StatusBase['prototype'][_0x492634(0x30d)][_0x492634(0x27a)](this);for(const _0x42eb81 of $gameParty[_0x492634(0x3ab)]()){ImageManager[_0x492634(0x2a5)](_0x42eb81[_0x492634(0x223)]());}},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x434)]=function(){const _0x51352e=_0x2455b1;return VisuMZ[_0x51352e(0x21d)][_0x51352e(0x33c)]['StatusWindow'][_0x51352e(0x483)];},Window_ShopStatus[_0x2455b1(0x32e)]['refresh']=function(){const _0x116b11=_0x2455b1;this[_0x116b11(0x5bb)][_0x116b11(0x244)](),this['contentsBack'][_0x116b11(0x244)]();if(this[_0x116b11(0x5a9)]){if('GMWKU'===_0x116b11(0x494))this['resetFontSettings'](),this['changePaintOpacity'](!![]),this[_0x116b11(0x430)](),this[_0x116b11(0x1ec)]()?_0x116b11(0x4e0)===_0x116b11(0x40d)?this['_doubleTouch']=!![]:this[_0x116b11(0x4db)]():this['drawItemData'](),this[_0x116b11(0x21b)]();else{const _0x199251=_0x515615(_0x5ca356['$1'])||0x1;if(_0xb6a07e>=_0x199251)return!![];}}},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x276)]=function(_0x2a176d,_0x240616){const _0x25ba98=_0x2455b1;if(!this[_0x25ba98(0x1ec)]()&&!DataManager[_0x25ba98(0x2cf)](this['_item']))return;const _0x25bf17=this[_0x25ba98(0x266)]-this[_0x25ba98(0x2ee)]()-_0x2a176d,_0x440ec5=this['textWidth']('0000');this['changeTextColor'](ColorManager[_0x25ba98(0x626)]()),this['drawText'](TextManager['possession'],_0x2a176d+this['itemPadding'](),_0x240616,_0x25bf17-_0x440ec5),this[_0x25ba98(0x4a7)](),this['drawItemNumber'](this[_0x25ba98(0x5a9)],_0x2a176d,_0x240616,_0x25bf17);},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x419)]=function(_0x5b3d4c,_0x3d20fc,_0x4d4590,_0x4bd813,_0x1fc4c2){const _0x55db79=_0x2455b1;if(VisuMZ['ItemsEquipsCore'][_0x55db79(0x33c)][_0x55db79(0x3b8)][_0x55db79(0x5d7)]===![])return;_0x1fc4c2=Math[_0x55db79(0x3c5)](_0x1fc4c2||0x1,0x1);while(_0x1fc4c2--){if('bGKFO'==='bGKFO'){_0x4bd813=_0x4bd813||this[_0x55db79(0x249)](),this[_0x55db79(0x4f7)][_0x55db79(0x4ec)]=0xa0;const _0x68cbf0=ColorManager[_0x55db79(0x38c)]();this[_0x55db79(0x4f7)]['fillRect'](_0x5b3d4c+0x1,_0x3d20fc+0x1,_0x4d4590-0x2,_0x4bd813-0x2,_0x68cbf0),this[_0x55db79(0x4f7)][_0x55db79(0x4ec)]=0xff;}else{if(_0x4f9b56===_0x4e4d4a)return;if(_0x3b3efc[_0x55db79(0x3c8)]['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x2430af=_0x1ed57f(_0x25abbf['$1']),_0x4eace8=(_0x1597d0===_0x937fdb?'W%1':'A%1')[_0x55db79(0x4c5)](_0x35fb30['id']),_0x24fb0f=_0x55db79(0x4ca)['format'](_0x2430af);for(let _0x533ffc=0x0;_0x533ffc<0x8;_0x533ffc++){if(_0x2430af[_0x55db79(0x3e1)](_0x18e828[_0x55db79(0x21d)][_0x55db79(0x1fb)][_0x55db79(0x602)][_0x533ffc])){const _0x4faf43=_0x55db79(0x364)[_0x55db79(0x4c5)](_0x4eace8,_0x533ffc);_0x2cb999[_0x55db79(0x21d)][_0x55db79(0x50e)][_0x4faf43]=new _0x1ff8a3(_0x55db79(0x27d),_0x55db79(0x578),_0x24fb0f);}}}}}},ColorManager['getItemsEquipsCoreBackColor1']=function(){const _0x2072c3=_0x2455b1,_0x293068=VisuMZ[_0x2072c3(0x21d)]['Settings']['StatusWindow'];let _0x25b19f=_0x293068['BackRectColor']!==undefined?_0x293068[_0x2072c3(0x56f)]:0x13;return ColorManager[_0x2072c3(0x344)](_0x25b19f);},Window_ShopStatus['prototype'][_0x2455b1(0x4db)]=function(){const _0x105a19=_0x2455b1;if(VisuMZ[_0x105a19(0x21d)][_0x105a19(0x33c)][_0x105a19(0x3b8)][_0x105a19(0x50c)]){if(_0x105a19(0x581)!==_0x105a19(0x581))return this[_0x105a19(0x598)](_0x29dafe);else{VisuMZ['ItemsEquipsCore'][_0x105a19(0x33c)][_0x105a19(0x3b8)]['DrawEquipData'][_0x105a19(0x27a)](this);return;}}const _0x17b49d=this['lineHeight'](),_0x31733e=this[_0x105a19(0x294)]()+0x8;let _0x31082a=0x0,_0x381b38=0x0,_0x42716c=this[_0x105a19(0x266)],_0x3aee03=this['innerHeight'],_0x6f2dd5=Math[_0x105a19(0x637)](_0x42716c/0x2),_0x46580c=_0x31082a+_0x42716c-_0x6f2dd5;this[_0x105a19(0x46e)](this[_0x105a19(0x5a9)],_0x31082a+this[_0x105a19(0x2ee)](),_0x381b38,_0x42716c-this[_0x105a19(0x2ee)]()*0x2),this['drawItemDarkRect'](_0x31082a,_0x381b38,_0x42716c),_0x381b38+=_0x17b49d;if(this[_0x105a19(0x1cd)](_0x31082a,_0x381b38,_0x6f2dd5))_0x381b38+=0x0;if(this[_0x105a19(0x2a1)](_0x46580c,_0x381b38,_0x6f2dd5))_0x381b38+=_0x17b49d;const _0x49b212=this[_0x105a19(0x2fd)](),_0x5eac6e=_0x381b38;_0x381b38=_0x3aee03-_0x49b212[_0x105a19(0x22d)]*_0x31733e-0x4;let _0x47e1cc=_0x31082a,_0x48e52a=0x0,_0x1660a3=_0x381b38;for(const _0xf13868 of _0x49b212){_0x48e52a=Math['max'](this[_0x105a19(0x61a)](_0xf13868,_0x31082a+0x4,_0x381b38+0x4,_0x42716c),_0x48e52a),_0x381b38+=_0x31733e;}const _0x41155c=$gameParty[_0x105a19(0x597)](),_0x105495=Math[_0x105a19(0x637)]((_0x42716c-_0x48e52a)/_0x41155c);_0x48e52a=_0x42716c-_0x105495*_0x41155c;for(const _0x302a8b of $gameParty[_0x105a19(0x27b)]()){if(_0x105a19(0x26d)!==_0x105a19(0x22c)){const _0x3e8904=$gameParty[_0x105a19(0x27b)]()[_0x105a19(0x5ea)](_0x302a8b),_0x162058=_0x47e1cc+_0x48e52a+_0x3e8904*_0x105495;this[_0x105a19(0x558)](_0x302a8b[_0x105a19(0x45e)](this[_0x105a19(0x5a9)])),this[_0x105a19(0x46b)](_0x302a8b,_0x162058+_0x105495/0x2,_0x1660a3);let _0x484972=_0x1660a3;for(const _0x5ec2a9 of _0x49b212){if(_0x105a19(0x1cf)===_0x105a19(0x1cf)){const _0x53de73=_0x484972-(_0x17b49d-_0x31733e)/0x2;this[_0x105a19(0x26b)](_0x302a8b,_0x5ec2a9,_0x162058,_0x53de73,_0x105495),_0x484972+=_0x31733e;}else this[_0x105a19(0x1b9)](_0x28f8a1[_0x105a19(0x5ae)](_0x4f7cfc)),_0x59066d=(_0x5e9387>0x0?_0x105a19(0x291):_0x105a19(0x498))[_0x105a19(0x4c5)](_0x1fd666),this['drawText'](_0xd85d55,_0x1f54ef+_0x5e5fdd,_0x2ac01e,_0x1d9783,_0x105a19(0x5a5));}}else return this['_itemWindow'][_0x105a19(0x2c8)]()===0x1?_0x516eab[_0x105a19(0x2ba)]('left',_0x105a19(0x265)):_0xfebf2f['getInputMultiButtonStrings'](_0x105a19(0x422),_0x105a19(0x4d5));}this[_0x105a19(0x419)](_0x47e1cc,_0x5eac6e,_0x48e52a,_0x1660a3-_0x5eac6e);for(let _0x38975d=0x0;_0x38975d<_0x41155c;_0x38975d++){const _0x275182=_0x47e1cc+_0x48e52a+_0x38975d*_0x105495;this['drawItemDarkRect'](_0x275182,_0x5eac6e,_0x105495,_0x1660a3-_0x5eac6e);}for(const _0xf82f16 of _0x49b212){this[_0x105a19(0x419)](_0x47e1cc,_0x1660a3,_0x48e52a,_0x31733e);for(let _0x424350=0x0;_0x424350<_0x41155c;_0x424350++){const _0x2f4b35=_0x47e1cc+_0x48e52a+_0x424350*_0x105495;this[_0x105a19(0x419)](_0x2f4b35,_0x1660a3,_0x105495,_0x31733e);}_0x1660a3+=_0x31733e;}},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x1cd)]=function(_0x29de5e,_0x59cdd6,_0x2bc0ca){const _0xd35356=_0x2455b1;if(!this[_0xd35356(0x1ec)]())return![];const _0x53ac3c=$dataSystem[_0xd35356(0x324)][this[_0xd35356(0x5a9)][_0xd35356(0x1cb)]];return this[_0xd35356(0x52d)](_0x53ac3c,_0x29de5e,_0x59cdd6,_0x2bc0ca,!![]),this[_0xd35356(0x419)](_0x29de5e,_0x59cdd6,_0x2bc0ca),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x2455b1(0x211)]=function(){const _0x383c9b=_0x2455b1,_0x3ceddc=VisuMZ['ItemsEquipsCore'][_0x383c9b(0x33c)][_0x383c9b(0x212)][_0x383c9b(0x577)];return _0x3ceddc[_0x383c9b(0x4c5)]($gameParty[_0x383c9b(0x248)](this[_0x383c9b(0x5a9)]));},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x2fd)]=function(){const _0x39e035=_0x2455b1;return Imported[_0x39e035(0x250)]?VisuMZ[_0x39e035(0x1dc)][_0x39e035(0x33c)][_0x39e035(0x1ef)][_0x39e035(0x275)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus['prototype'][_0x2455b1(0x5fc)]=function(){const _0x4d3aec=_0x2455b1;return VisuMZ['ItemsEquipsCore'][_0x4d3aec(0x33c)][_0x4d3aec(0x3b8)][_0x4d3aec(0x23c)];},Window_ShopStatus['prototype'][_0x2455b1(0x61a)]=function(_0x52ea30,_0x101d47,_0xcfe9cb,_0x51ff67){const _0x4c5c86=_0x2455b1;this[_0x4c5c86(0x256)](),this[_0x4c5c86(0x5bb)][_0x4c5c86(0x517)]=this['smallParamFontSize']();let _0x3dfde5=this[_0x4c5c86(0x1af)](TextManager[_0x4c5c86(0x3db)](_0x52ea30))+0x4+_0x101d47;return Imported[_0x4c5c86(0x250)]?(this[_0x4c5c86(0x247)](_0x101d47,_0xcfe9cb,_0x51ff67,_0x52ea30,!![]),VisuMZ['CoreEngine'][_0x4c5c86(0x33c)]['Param'][_0x4c5c86(0x4e5)]&&(_0x3dfde5+=ImageManager[_0x4c5c86(0x4f4)]+0x4)):(this[_0x4c5c86(0x1b9)](ColorManager[_0x4c5c86(0x626)]()),this['drawText'](TextManager['param'](_0x52ea30),_0x101d47,_0xcfe9cb,_0x51ff67)),this['resetFontSettings'](),_0x3dfde5;},Window_ShopStatus[_0x2455b1(0x32e)]['drawActorParamDifference']=function(_0x11baa1,_0x337cba,_0x1e0e66,_0x34cb35,_0xc7543c){const _0x279248=_0x2455b1;_0x1e0e66+=this['itemPadding'](),_0xc7543c-=this['itemPadding']()*0x2;const _0x55224a=VisuMZ[_0x279248(0x21d)]['Settings'][_0x279248(0x3b8)];this['contents'][_0x279248(0x517)]=_0x55224a[_0x279248(0x23c)],this[_0x279248(0x558)](_0x11baa1[_0x279248(0x45e)](this[_0x279248(0x5a9)]));if(_0x11baa1['isEquipped'](this['_item'])){const _0xd2e79c=_0x55224a['AlreadyEquipMarker'];this['drawText'](_0xd2e79c,_0x1e0e66,_0x34cb35,_0xc7543c,_0x279248(0x5b8));}else{if(_0x11baa1[_0x279248(0x45e)](this[_0x279248(0x5a9)])){if(_0x279248(0x46c)==='AWHeO'){const _0x534091=JsonEx[_0x279248(0x39e)](_0x11baa1);_0x534091[_0x279248(0x5cc)]=!![];const _0x377289=_0x534091[_0x279248(0x61f)]()['indexOf'](this[_0x279248(0x5a9)][_0x279248(0x1cb)]);if(_0x377289>=0x0)_0x534091['forceChangeEquip'](_0x377289,this[_0x279248(0x5a9)]);let _0x1737b7=0x0,_0x4a1b7c=0x0,_0x2f9faa=0x0;Imported[_0x279248(0x250)]?(_0x1737b7=_0x534091['paramValueByName'](_0x337cba),_0x4a1b7c=_0x1737b7-_0x11baa1['paramValueByName'](_0x337cba),this[_0x279248(0x1b9)](ColorManager[_0x279248(0x5ae)](_0x4a1b7c)),_0x2f9faa=(_0x4a1b7c>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x4a1b7c,0x0,_0x337cba)):'zJGvs'==='yzNUs'?(_0x54a347+=_0x148299(_0x14d4cc['$1']),_0x194745+=_0x40f3bf(_0x2c1137['$2'])):(_0x1737b7=_0x534091[_0x279248(0x3db)](_0x337cba),_0x4a1b7c=_0x1737b7-_0x11baa1[_0x279248(0x3db)](_0x337cba),this[_0x279248(0x1b9)](ColorManager['paramchangeTextColor'](_0x4a1b7c)),_0x2f9faa=(_0x4a1b7c>=0x0?'+':'')+_0x4a1b7c);if(_0x2f9faa==='+0')_0x2f9faa=_0x55224a[_0x279248(0x4d8)];this['drawText'](_0x2f9faa,_0x1e0e66,_0x34cb35,_0xc7543c,_0x279248(0x5b8));}else return!![];}else{if(_0x279248(0x5de)!==_0x279248(0x5de)){this['_goodsCount']=0x0;for(const _0x4620e5 of this['_goods']){this[_0x279248(0x2cd)](_0x4620e5)?this[_0x279248(0x2f5)]++:_0x4620e5[0x0]=-0x1;}}else{const _0x57e177=_0x55224a[_0x279248(0x3c7)];this['drawText'](_0x57e177,_0x1e0e66,_0x34cb35,_0xc7543c,'center');}}}this[_0x279248(0x256)](),this['changePaintOpacity'](!![]);},Window_ShopStatus['prototype'][_0x2455b1(0x32a)]=function(){const _0x1a45bb=_0x2455b1;VisuMZ['ItemsEquipsCore'][_0x1a45bb(0x33c)][_0x1a45bb(0x3b8)][_0x1a45bb(0x240)][_0x1a45bb(0x27a)](this);},Window_ShopStatus[_0x2455b1(0x32e)]['prepareItemCustomData']=function(){const _0x4dc83a=_0x2455b1;this[_0x4dc83a(0x5a0)]={};if(!this[_0x4dc83a(0x5a9)])return;const _0xd5e7fd=this[_0x4dc83a(0x5a9)][_0x4dc83a(0x3c8)];if(_0xd5e7fd[_0x4dc83a(0x3e1)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){if(_0x4dc83a(0x1d0)!==_0x4dc83a(0x5cb)){const _0x7eb5bb=String(RegExp['$1'])[_0x4dc83a(0x278)](/[\r\n]+/);for(const _0x3b17e1 of _0x7eb5bb){if(_0x4dc83a(0x45a)===_0x4dc83a(0x5be)){_0x15e2d1+='\x5cI[%1]'[_0x4dc83a(0x4c5)](_0x76b924),_0x466090++;if(_0xb03cc>=_0x81c432)return _0x53f43c;}else{if(_0x3b17e1['match'](/(.*):[ ](.*)/i)){const _0x3c851d=String(RegExp['$1'])[_0x4dc83a(0x5b3)]()[_0x4dc83a(0x48e)](),_0x1ef53b=String(RegExp['$2'])[_0x4dc83a(0x48e)]();this[_0x4dc83a(0x5a0)][_0x3c851d]=_0x1ef53b;}}}}else{const _0x5d7008=_0x3d1634[_0x4dc83a(0x398)]('['+_0x116191['$1']['match'](/\d+/g)+']');for(const _0x1a6564 of _0x5d7008){if(!_0x3f57bc['value'](_0x1a6564))return!![];}return![];}}},Window_ShopStatus['prototype'][_0x2455b1(0x4ad)]=function(){const _0x29771c=_0x2455b1;return Math[_0x29771c(0x3c5)](0x1,$gameSystem[_0x29771c(0x37a)]()-0x4);},Window_ShopStatus['prototype']['resetFontSettings']=function(){const _0xcccd29=_0x2455b1;Window_StatusBase[_0xcccd29(0x32e)][_0xcccd29(0x256)][_0xcccd29(0x27a)](this),this['contents'][_0xcccd29(0x517)]=this[_0xcccd29(0x2d1)]||this[_0xcccd29(0x5bb)]['fontSize'],this['contents'][_0xcccd29(0x2b5)]=this['_resetFontColor']||this[_0xcccd29(0x5bb)][_0xcccd29(0x2b5)];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x5c1)]=function(){const _0x14a0b7=_0x2455b1;return this['contents'][_0x14a0b7(0x517)]/$gameSystem['mainFontSize']();},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x617)]=function(_0x45915a,_0x5b2cc9,_0x4ffbb6){const _0x766843=_0x2455b1,_0xe23c31=ImageManager[_0x766843(0x284)](_0x766843(0x2bc)),_0xe2a69b=ImageManager['iconWidth'],_0x10393f=ImageManager[_0x766843(0x25f)],_0x493e02=_0x45915a%0x10*_0xe2a69b,_0x3c92c3=Math[_0x766843(0x637)](_0x45915a/0x10)*_0x10393f,_0x5cf951=Math[_0x766843(0x4d0)](_0xe2a69b*this['fontSizeRatio']()),_0x44e316=Math[_0x766843(0x4d0)](_0x10393f*this[_0x766843(0x5c1)]());this[_0x766843(0x5bb)][_0x766843(0x279)](_0xe23c31,_0x493e02,_0x3c92c3,_0xe2a69b,_0x10393f,_0x5b2cc9,_0x4ffbb6,_0x5cf951,_0x44e316);},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x3bd)]=function(_0x10994b,_0x4a68bc){const _0x2e99c8=_0x2455b1;_0x4a68bc[_0x2e99c8(0x219)]&&this[_0x2e99c8(0x617)](_0x10994b,_0x4a68bc['x'],_0x4a68bc['y']+0x2);_0x4a68bc['x']+=Math[_0x2e99c8(0x4d0)](ImageManager[_0x2e99c8(0x4f4)]*this[_0x2e99c8(0x5c1)]());if(this[_0x2e99c8(0x5c1)]()===0x1)_0x4a68bc['x']+=0x4;},Window_ShopStatus['prototype'][_0x2455b1(0x52d)]=function(_0x5c9c32,_0x42c030,_0x22eff8,_0x22e87c,_0x445387,_0x5a10bb){const _0x596426=_0x2455b1;_0x5c9c32=_0x5c9c32||'',_0x5a10bb=_0x5a10bb||_0x596426(0x5a5),this[_0x596426(0x2d1)]=this[_0x596426(0x4ad)](),this[_0x596426(0x612)]=_0x445387?ColorManager[_0x596426(0x626)]():this[_0x596426(0x5bb)][_0x596426(0x2b5)],_0x42c030+=this['itemPadding'](),_0x22e87c-=this[_0x596426(0x2ee)]()*0x2;const _0x42e64f=this[_0x596426(0x3e9)](_0x5c9c32);if(_0x5a10bb===_0x596426(0x5b8))_0x42c030=_0x42c030+Math[_0x596426(0x637)]((_0x22e87c-_0x42e64f['width'])/0x2);else _0x5a10bb===_0x596426(0x265)&&(_0x42c030=_0x42c030+_0x22e87c-_0x42e64f['width']);_0x22eff8+=(this[_0x596426(0x249)]()-_0x42e64f['height'])/0x2,this[_0x596426(0x2a0)](_0x5c9c32,_0x42c030,_0x22eff8,_0x22e87c),this[_0x596426(0x2d1)]=undefined,this[_0x596426(0x612)]=undefined,this[_0x596426(0x256)]();},Window_ShopStatus[_0x2455b1(0x32e)]['drawItemConsumable']=function(_0x18f7a2,_0x5c283c,_0x5017db){const _0x2f509d=_0x2455b1;if(!DataManager[_0x2f509d(0x2cf)](this[_0x2f509d(0x5a9)]))return![];const _0x3644f7=this[_0x2f509d(0x47d)]();this['drawItemKeyData'](_0x3644f7,_0x18f7a2,_0x5c283c,_0x5017db,!![]);const _0x5c421b=this[_0x2f509d(0x427)]();return this['drawItemKeyData'](_0x5c421b,_0x18f7a2,_0x5c283c,_0x5017db,![],_0x2f509d(0x265)),this['drawItemDarkRect'](_0x18f7a2,_0x5c283c,_0x5017db),this[_0x2f509d(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)]['getItemConsumableLabel']=function(){const _0x141135=_0x2455b1;return VisuMZ[_0x141135(0x21d)][_0x141135(0x33c)][_0x141135(0x3b8)][_0x141135(0x336)];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x427)]=function(){const _0x1c5d60=_0x2455b1,_0x49a13d='CONSUMABLE';if(this['_customItemInfo'][_0x49a13d])return this[_0x1c5d60(0x5a0)][_0x49a13d];return this[_0x1c5d60(0x4c3)]()?VisuMZ[_0x1c5d60(0x21d)]['Settings']['StatusWindow'][_0x1c5d60(0x214)]:VisuMZ[_0x1c5d60(0x21d)][_0x1c5d60(0x33c)][_0x1c5d60(0x3b8)][_0x1c5d60(0x3e3)];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x4c3)]=function(){const _0x542e6e=_0x2455b1;return VisuMZ[_0x542e6e(0x1dc)]&&VisuMZ[_0x542e6e(0x1dc)]['Settings'][_0x542e6e(0x255)]['KeyItemProtect']&&DataManager[_0x542e6e(0x4f1)](this[_0x542e6e(0x5a9)])?![]:this['_item']['consumable'];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x2a1)]=function(_0x101864,_0x5aa8d9,_0x3a0730){const _0x414046=_0x2455b1;if(!this[_0x414046(0x1ec)]()&&!DataManager[_0x414046(0x2cf)](this[_0x414046(0x5a9)]))return![];if(DataManager['isKeyItem'](this['_item'])&&!$dataSystem[_0x414046(0x5e8)]){if(_0x414046(0x340)!==_0x414046(0x340)){const _0x14ff71=_0x91cd5f['prototype'][_0x414046(0x235)](-0x1,_0x3ccbce);if(_0x14ff71>0x0){_0x22fa10+='\x5cI[%1]'[_0x414046(0x4c5)](_0x14ff71),_0x50c62f++;if(_0xf52a52>=_0x5e08c9)return _0x2dd6fe;}}else{const _0xb87875=TextManager[_0x414046(0x1de)];this['drawItemKeyData'](_0xb87875,_0x101864,_0x5aa8d9,_0x3a0730,!![],'center');}}else{const _0x4b8a2b=TextManager[_0x414046(0x496)];this[_0x414046(0x52d)](_0x4b8a2b,_0x101864,_0x5aa8d9,_0x3a0730,!![]);const _0x217cd1=this[_0x414046(0x211)]();this[_0x414046(0x52d)](_0x217cd1,_0x101864,_0x5aa8d9,_0x3a0730,![],_0x414046(0x265));}return this[_0x414046(0x419)](_0x101864,_0x5aa8d9,_0x3a0730),this[_0x414046(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)]['getItemQuantityText']=function(){const _0x4ed7ea=_0x2455b1,_0x381549=_0x4ed7ea(0x490);if(this[_0x4ed7ea(0x5a0)][_0x381549])return this[_0x4ed7ea(0x5a0)][_0x381549];const _0x16eb58=VisuMZ[_0x4ed7ea(0x21d)][_0x4ed7ea(0x33c)][_0x4ed7ea(0x212)][_0x4ed7ea(0x577)];return _0x16eb58[_0x4ed7ea(0x4c5)]($gameParty['numItems'](this['_item']));},Window_ShopStatus[_0x2455b1(0x32e)]['drawItemOccasion']=function(_0x5a8636,_0x4373e7,_0x24e738){const _0x35f2d4=_0x2455b1,_0x112828=this[_0x35f2d4(0x1b8)]();return this['drawItemKeyData'](_0x112828,_0x5a8636,_0x4373e7,_0x24e738,![],_0x35f2d4(0x5b8)),this[_0x35f2d4(0x419)](_0x5a8636,_0x4373e7,_0x24e738),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x1b8)]=function(){const _0x50436b=_0x2455b1,_0x29ba48=_0x50436b(0x53f);if(this[_0x50436b(0x5a0)][_0x29ba48])return this[_0x50436b(0x5a0)][_0x29ba48];const _0x44d98c=VisuMZ[_0x50436b(0x21d)][_0x50436b(0x33c)][_0x50436b(0x3b8)],_0x414b83=_0x50436b(0x480)[_0x50436b(0x4c5)](this['_item'][_0x50436b(0x2d7)]);return _0x44d98c[_0x414b83];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x34d)]=function(_0x209e1b,_0x5bf8be,_0x11ac71){const _0x34ab83=_0x2455b1,_0x404b88=this[_0x34ab83(0x2de)]();return this['drawItemKeyData'](_0x404b88,_0x209e1b,_0x5bf8be,_0x11ac71,![],_0x34ab83(0x5b8)),this['drawItemDarkRect'](_0x209e1b,_0x5bf8be,_0x11ac71),this[_0x34ab83(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x2de)]=function(){const _0x956096=_0x2455b1,_0x5f07be=_0x956096(0x37b);if(this['_customItemInfo'][_0x5f07be])return this[_0x956096(0x5a0)][_0x5f07be];const _0x3f37b7=VisuMZ['ItemsEquipsCore']['Settings'][_0x956096(0x3b8)];if(Imported[_0x956096(0x51e)]){const _0x4737da=this[_0x956096(0x5a9)][_0x956096(0x3c8)];if(_0x4737da['match'](/<TARGET:[ ](.*)>/i)){if('yIHOm'===_0x956096(0x1bb))return _0x25ca7f[_0x956096(0x32e)]['statusWidth']();else{const _0xf828f8=String(RegExp['$1']);if(_0xf828f8['match'](/(\d+) RANDOM ANY/i))return _0x3f37b7[_0x956096(0x5d9)][_0x956096(0x4c5)](Number(RegExp['$1']));else{if(_0xf828f8[_0x956096(0x3e1)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){if(_0x956096(0x1c4)==='xwizv')return;else return _0x3f37b7[_0x956096(0x274)][_0x956096(0x4c5)](Number(RegExp['$1']));}else{if(_0xf828f8[_0x956096(0x3e1)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x3f37b7[_0x956096(0x351)][_0x956096(0x4c5)](Number(RegExp['$1']));else{if(_0xf828f8[_0x956096(0x3e1)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x3f37b7[_0x956096(0x571)];}}}}}}const _0x36e82a=_0x956096(0x2eb)['format'](this[_0x956096(0x5a9)][_0x956096(0x3d6)]);return _0x3f37b7[_0x36e82a];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x26e)]=function(_0x1a1302,_0x30c4e7,_0x1775b2){const _0x147484=_0x2455b1,_0xa9ec1e=this['getItemSpeedLabel']();this[_0x147484(0x52d)](_0xa9ec1e,_0x1a1302,_0x30c4e7,_0x1775b2,!![]);const _0x568f98=this[_0x147484(0x500)]();return this['drawItemKeyData'](_0x568f98,_0x1a1302,_0x30c4e7,_0x1775b2,![],'right'),this[_0x147484(0x419)](_0x1a1302,_0x30c4e7,_0x1775b2),this[_0x147484(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)]['getItemSpeedLabel']=function(){const _0x3c91d4=_0x2455b1;return VisuMZ[_0x3c91d4(0x21d)][_0x3c91d4(0x33c)]['StatusWindow'][_0x3c91d4(0x245)];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x500)]=function(){const _0x10d00c=_0x2455b1,_0x4d43f1=_0x10d00c(0x495);if(this['_customItemInfo'][_0x4d43f1])return this[_0x10d00c(0x5a0)][_0x4d43f1];const _0x3d7ffe=this['_item'][_0x10d00c(0x5c0)];if(_0x3d7ffe>=0x7d0)return VisuMZ[_0x10d00c(0x21d)]['Settings'][_0x10d00c(0x3b8)][_0x10d00c(0x52f)];else{if(_0x3d7ffe>=0x3e8)return _0x10d00c(0x4bd)===_0x10d00c(0x35c)?this[_0x10d00c(0x587)]():VisuMZ[_0x10d00c(0x21d)]['Settings'][_0x10d00c(0x3b8)]['Speed1000'];else{if(_0x3d7ffe>0x0)return VisuMZ[_0x10d00c(0x21d)][_0x10d00c(0x33c)]['StatusWindow'][_0x10d00c(0x277)];else{if(_0x3d7ffe===0x0){if('meoms'==='meoms')return VisuMZ['ItemsEquipsCore'][_0x10d00c(0x33c)][_0x10d00c(0x3b8)][_0x10d00c(0x1f1)];else _0x5aec26=_0x10d00c(0x54f)['format'](_0x2156c4['id']);}else{if(_0x3d7ffe>-0x3e8)return VisuMZ[_0x10d00c(0x21d)][_0x10d00c(0x33c)][_0x10d00c(0x3b8)][_0x10d00c(0x55b)];else{if(_0x3d7ffe>-0x7d0){if(_0x10d00c(0x5ed)!=='DmgXy')this[_0x10d00c(0x617)](_0x480198,_0x11ee0a['x'],_0x251514['y']+0x2);else return VisuMZ['ItemsEquipsCore'][_0x10d00c(0x33c)][_0x10d00c(0x3b8)][_0x10d00c(0x441)];}else{if(_0x3d7ffe<=-0x7d0)return VisuMZ[_0x10d00c(0x21d)]['Settings'][_0x10d00c(0x3b8)][_0x10d00c(0x585)];else{if(_0x10d00c(0x3e7)===_0x10d00c(0x596)){if(this[_0x10d00c(0x530)]())return _0x990b1b['ItemsEquipsCore'][_0x10d00c(0x33c)][_0x10d00c(0x212)][_0x10d00c(0x380)];return _0x39ca6b[_0x10d00c(0x32e)][_0x10d00c(0x42c)]['call'](this);}else return _0x10d00c(0x1ee);}}}}}}}},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x28a)]=function(_0x172048,_0x5678da,_0xf28f23){const _0x4c4de6=_0x2455b1,_0x580e4e=this[_0x4c4de6(0x525)]();this[_0x4c4de6(0x52d)](_0x580e4e,_0x172048,_0x5678da,_0xf28f23,!![]);const _0x1f7932=this[_0x4c4de6(0x542)]();return this[_0x4c4de6(0x52d)](_0x1f7932,_0x172048,_0x5678da,_0xf28f23,![],_0x4c4de6(0x265)),this[_0x4c4de6(0x419)](_0x172048,_0x5678da,_0xf28f23),this[_0x4c4de6(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x525)]=function(){const _0x9f3c8e=_0x2455b1;return VisuMZ[_0x9f3c8e(0x21d)][_0x9f3c8e(0x33c)][_0x9f3c8e(0x3b8)][_0x9f3c8e(0x61e)];},Window_ShopStatus[_0x2455b1(0x32e)]['getItemSuccessRateText']=function(){const _0x5e3be8=_0x2455b1,_0x2c261f=_0x5e3be8(0x411);if(this[_0x5e3be8(0x5a0)][_0x2c261f])return this['_customItemInfo'][_0x2c261f];if(Imported[_0x5e3be8(0x51e)]){const _0x480588=this[_0x5e3be8(0x5a9)][_0x5e3be8(0x3c8)];if(_0x480588['match'](/<ALWAYS HIT>/i))return'100%';else{if(_0x480588[_0x5e3be8(0x3e1)](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if(_0x5e3be8(0x2d3)!==_0x5e3be8(0x47c))return _0x5e3be8(0x3f4)[_0x5e3be8(0x4c5)](Number(RegExp['$1']));else{if(!this[_0x5e3be8(0x573)]())return![];if(!this[_0x5e3be8(0x35d)]())return![];if(!this[_0x5e3be8(0x3e2)])return![];if(!this[_0x5e3be8(0x3e2)][_0x5e3be8(0x2ac)])return![];return this[_0x5e3be8(0x573)]()&&this[_0x5e3be8(0x35d)]();}}}}return'%1%'[_0x5e3be8(0x4c5)](this['_item'][_0x5e3be8(0x417)]);},Window_ShopStatus['prototype'][_0x2455b1(0x1b0)]=function(_0x419396,_0x29d639,_0x4d0880){const _0x2652ce=_0x2455b1,_0x4e7383=this[_0x2652ce(0x26c)]();this[_0x2652ce(0x52d)](_0x4e7383,_0x419396,_0x29d639,_0x4d0880,!![]);const _0x3ca6a4=this[_0x2652ce(0x2e5)]();return this[_0x2652ce(0x52d)](_0x3ca6a4,_0x419396,_0x29d639,_0x4d0880,![],'right'),this[_0x2652ce(0x419)](_0x419396,_0x29d639,_0x4d0880),this[_0x2652ce(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)]['getItemRepeatsLabel']=function(){const _0x1d09f8=_0x2455b1;return VisuMZ['ItemsEquipsCore']['Settings'][_0x1d09f8(0x3b8)][_0x1d09f8(0x62c)];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x2e5)]=function(){const _0x4c521e=_0x2455b1,_0x490609=_0x4c521e(0x35f);if(this[_0x4c521e(0x5a0)][_0x490609])return this[_0x4c521e(0x5a0)][_0x490609];const _0x435e8f='×%1';return _0x435e8f['format'](this['_item'][_0x4c521e(0x3fd)]);},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x410)]=function(_0x47d300,_0x1656b9,_0x44ea4b){const _0x18278a=_0x2455b1,_0x53073b=this[_0x18278a(0x263)]();this[_0x18278a(0x52d)](_0x53073b,_0x47d300,_0x1656b9,_0x44ea4b,!![]);const _0x4c1c64=this[_0x18278a(0x3ce)]();return this[_0x18278a(0x52d)](_0x4c1c64,_0x47d300,_0x1656b9,_0x44ea4b,![],_0x18278a(0x265)),this['drawItemDarkRect'](_0x47d300,_0x1656b9,_0x44ea4b),this[_0x18278a(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x263)]=function(){const _0x558330=_0x2455b1;return VisuMZ['ItemsEquipsCore'][_0x558330(0x33c)][_0x558330(0x3b8)]['LabelHitType'];},Window_ShopStatus['prototype']['getItemHitTypeText']=function(){const _0x40ca9c=_0x2455b1,_0x49fc13='HIT\x20TYPE';if(this['_customItemInfo'][_0x49fc13])return this['_customItemInfo'][_0x49fc13];const _0x19bac4=VisuMZ[_0x40ca9c(0x21d)]['Settings']['StatusWindow'],_0x3f2808=_0x40ca9c(0x505)[_0x40ca9c(0x4c5)](this[_0x40ca9c(0x5a9)][_0x40ca9c(0x3f5)]);return _0x19bac4[_0x3f2808];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x450)]=function(_0x55769c,_0x10fa9f,_0xd8c900){const _0xf17320=_0x2455b1;if(this['_item'][_0xf17320(0x268)]['type']<=0x0)return _0x10fa9f;if(this['drawItemDamageElement'](_0x55769c,_0x10fa9f,_0xd8c900))_0x10fa9f+=this[_0xf17320(0x249)]();if(this[_0xf17320(0x4ac)](_0x55769c,_0x10fa9f,_0xd8c900))_0x10fa9f+=this[_0xf17320(0x249)]();return this[_0xf17320(0x256)](),_0x10fa9f;},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x416)]=function(_0x3ee327,_0x100388,_0x5bcb5f){const _0x249848=_0x2455b1,_0x304d50=this[_0x249848(0x4b2)]();this[_0x249848(0x52d)](_0x304d50,_0x3ee327,_0x100388,_0x5bcb5f,!![]);const _0x269ca5=this['getItemDamageElementText']();return this[_0x249848(0x52d)](_0x269ca5,_0x3ee327,_0x100388,_0x5bcb5f,![],_0x249848(0x265)),this[_0x249848(0x419)](_0x3ee327,_0x100388,_0x5bcb5f),this[_0x249848(0x256)](),!![];},Window_ShopStatus['prototype']['getItemDamageElementLabel']=function(){const _0x16c800=_0x2455b1;return VisuMZ[_0x16c800(0x21d)][_0x16c800(0x33c)][_0x16c800(0x3b8)][_0x16c800(0x526)];},Window_ShopStatus['prototype'][_0x2455b1(0x34e)]=function(){const _0x18a52c=_0x2455b1,_0x10225c=_0x18a52c(0x599);if(this[_0x18a52c(0x5a0)][_0x10225c])return this[_0x18a52c(0x5a0)][_0x10225c];if(this[_0x18a52c(0x5a9)][_0x18a52c(0x268)]['elementId']<=-0x1){if(_0x18a52c(0x3ca)===_0x18a52c(0x3ca))return VisuMZ[_0x18a52c(0x21d)]['Settings'][_0x18a52c(0x3b8)][_0x18a52c(0x1fe)];else this['isUseModernControls']()&&(this[_0x18a52c(0x4bc)][_0x18a52c(0x4a4)](),this[_0x18a52c(0x4bc)][_0x18a52c(0x2bb)]()),_0x29a5d7[_0x18a52c(0x21d)][_0x18a52c(0x2aa)][_0x18a52c(0x27a)](this);}else{if(this[_0x18a52c(0x5a9)]['damage'][_0x18a52c(0x448)]===0x0)return _0x18a52c(0x5a4)!==_0x18a52c(0x2f7)?VisuMZ[_0x18a52c(0x21d)][_0x18a52c(0x33c)][_0x18a52c(0x3b8)]['ElementNone']:this['geUpdatedLayoutStatusWidth']();else{if(_0x18a52c(0x2e7)===_0x18a52c(0x2e7))return $dataSystem[_0x18a52c(0x1ed)][this[_0x18a52c(0x5a9)]['damage']['elementId']];else{const _0x57718c=0x0,_0x3f6843=this[_0x18a52c(0x5f9)](),_0x4a8ec5=_0x347557[_0x18a52c(0x4ee)],_0x134460=this[_0x18a52c(0x2a8)]();return new _0x37b9a5(_0x57718c,_0x3f6843,_0x4a8ec5,_0x134460);}}}},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x4ac)]=function(_0x26d449,_0x16b7fb,_0x4eca3b){const _0x2c9bf0=_0x2455b1,_0x3466ab=this[_0x2c9bf0(0x5f5)]();this[_0x2c9bf0(0x52d)](_0x3466ab,_0x26d449,_0x16b7fb,_0x4eca3b,!![]),this[_0x2c9bf0(0x287)]();const _0x11d8f7=this[_0x2c9bf0(0x2f1)](),_0x370b9e=ColorManager[_0x2c9bf0(0x33d)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x2c9bf0(0x5a9)][_0x2c9bf0(0x268)][_0x2c9bf0(0x385)]]);return this[_0x2c9bf0(0x1b9)](_0x370b9e),this[_0x2c9bf0(0x52d)](_0x11d8f7,_0x26d449,_0x16b7fb,_0x4eca3b,![],_0x2c9bf0(0x265)),this['drawItemDarkRect'](_0x26d449,_0x16b7fb,_0x4eca3b),this[_0x2c9bf0(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)]['getItemDamageAmountLabel']=function(){const _0x481369=_0x2455b1;return Imported[_0x481369(0x51e)]&&DataManager[_0x481369(0x38d)](this[_0x481369(0x5a9)])!==_0x481369(0x575)?this[_0x481369(0x467)]():this[_0x481369(0x3ee)]();},Window_ShopStatus['prototype'][_0x2455b1(0x3ee)]=function(){const _0x2f7852=_0x2455b1,_0x17adf8=VisuMZ[_0x2f7852(0x21d)][_0x2f7852(0x33c)][_0x2f7852(0x3b8)],_0x14fa7e=_0x2f7852(0x3b1)[_0x2f7852(0x4c5)](this[_0x2f7852(0x5a9)]['damage'][_0x2f7852(0x385)]),_0x3eb75d=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item']['damage'][_0x2f7852(0x385)]];return _0x17adf8[_0x14fa7e][_0x2f7852(0x4c5)](_0x3eb75d);},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x287)]=function(){const _0x593675=_0x2455b1,_0xb23f00=$gameActors[_0x593675(0x4fc)](0x1);this['_tempActorA']=JsonEx[_0x593675(0x39e)](_0xb23f00),this[_0x593675(0x591)]=JsonEx[_0x593675(0x39e)](_0xb23f00);},Window_ShopStatus[_0x2455b1(0x32e)]['getItemDamageAmountText']=function(){const _0x4253ad=_0x2455b1,_0x89d2bc=_0x4253ad(0x4dc);if(this[_0x4253ad(0x5a0)][_0x89d2bc])return this['_customItemInfo'][_0x89d2bc];if(Imported[_0x4253ad(0x51e)]&&DataManager[_0x4253ad(0x38d)](this[_0x4253ad(0x5a9)])!==_0x4253ad(0x575)){if('XZGtH'!==_0x4253ad(0x288)){const _0x308ce1=_0x485996(_0x59bea1['$1']);let _0x2b9069=this[_0x4253ad(0x5a9)],_0x3337fe=_0x43ff5e*this[_0x4253ad(0x52b)]();try{_0x3b17c9(_0x308ce1);}catch(_0x5924b5){if(_0x495a38[_0x4253ad(0x386)]())_0xcd178a[_0x4253ad(0x1f8)](_0x5924b5);}if(_0x1560a9(_0x3337fe))_0x3337fe=0x0;return _0x538dc2[_0x4253ad(0x637)](_0x3337fe);}else return this['getItemDamageAmountTextBattleCore']();}else{if(_0x4253ad(0x317)===_0x4253ad(0x317))return this[_0x4253ad(0x518)]();else this[_0x4253ad(0x3b0)]=_0x107869,this[_0x4253ad(0x425)]();}},Window_ShopStatus['prototype'][_0x2455b1(0x518)]=function(){const _0x416b05=_0x2455b1;window['a']=this[_0x416b05(0x1bc)],window['b']=this[_0x416b05(0x591)],this[_0x416b05(0x1bc)][_0x416b05(0x464)](!![]),this[_0x416b05(0x591)]['setShopStatusWindowMode']([0x3,0x4]['includes'](this['_item']['damage']['type']));let _0x3e9238=this[_0x416b05(0x5a9)][_0x416b05(0x268)][_0x416b05(0x3fc)];try{if(_0x416b05(0x4af)!==_0x416b05(0x5bd)){const _0x25a64e=Math['max'](eval(_0x3e9238),0x0)/window['a'][_0x416b05(0x4b7)];return this[_0x416b05(0x528)](),isNaN(_0x25a64e)?_0x416b05(0x1ee):'%1%'['format'](Math[_0x416b05(0x4c4)](_0x25a64e*0x64));}else _0x1a9938=_0x2c4402[_0x416b05(0x1b5)][_0x4656f6(_0x498052['$1'])]||'';}catch(_0x536803){if($gameTemp['isPlaytest']()){if(_0x416b05(0x27f)!=='unytS')console[_0x416b05(0x1f8)]('Damage\x20Formula\x20Error\x20for\x20%1'[_0x416b05(0x4c5)](this[_0x416b05(0x5a9)][_0x416b05(0x487)])),console[_0x416b05(0x1f8)](_0x536803);else return _0x165783[_0x416b05(0x21d)][_0x416b05(0x33c)][_0x416b05(0x300)]['CommandAddOptimize'];}return this[_0x416b05(0x528)](),_0x416b05(0x1ee);}},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x528)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x3ae)]=function(_0x3ff98a,_0x3ed6d1,_0x2983c4){const _0x1c4145=_0x2455b1;if(!this[_0x1c4145(0x519)]())return _0x3ed6d1;if(this[_0x1c4145(0x502)](_0x3ff98a,_0x3ed6d1,_0x2983c4))_0x3ed6d1+=this['lineHeight']();if(this[_0x1c4145(0x25a)](_0x3ff98a,_0x3ed6d1,_0x2983c4))_0x3ed6d1+=this[_0x1c4145(0x249)]();if(this['drawItemEffectsTpRecovery'](_0x3ff98a,_0x3ed6d1,_0x2983c4))_0x3ed6d1+=this['lineHeight']();if(this[_0x1c4145(0x583)](_0x3ff98a,_0x3ed6d1,_0x2983c4))_0x3ed6d1+=this[_0x1c4145(0x249)]();if(this[_0x1c4145(0x5d3)](_0x3ff98a,_0x3ed6d1,_0x2983c4))_0x3ed6d1+=this[_0x1c4145(0x249)]();if(this[_0x1c4145(0x4b1)](_0x3ff98a,_0x3ed6d1,_0x2983c4))_0x3ed6d1+=this[_0x1c4145(0x249)]();if(this[_0x1c4145(0x27c)](_0x3ff98a,_0x3ed6d1,_0x2983c4))_0x3ed6d1+=this['lineHeight']();if(this['drawItemEffectsAddedStatesBuffs'](_0x3ff98a,_0x3ed6d1,_0x2983c4))_0x3ed6d1+=this['lineHeight']();if(this['drawItemEffectsRemovedStatesBuffs'](_0x3ff98a,_0x3ed6d1,_0x2983c4))_0x3ed6d1+=this[_0x1c4145(0x249)]();return this[_0x1c4145(0x256)](),_0x3ed6d1;},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x24a)]=function(){const _0x50e94e=_0x2455b1;return this[_0x50e94e(0x5a9)]['effects'];},Window_ShopStatus['prototype'][_0x2455b1(0x519)]=function(){const _0x3afcf5=_0x2455b1;let _0x201566=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x23d6e0=this['getItemEffects']();for(const _0x11f8f8 of _0x23d6e0){switch(_0x11f8f8[_0x3afcf5(0x562)]){case Game_Action[_0x3afcf5(0x2ca)]:this[_0x3afcf5(0x2b1)][_0x3afcf5(0x5d6)]+=_0x11f8f8[_0x3afcf5(0x50d)],this[_0x3afcf5(0x2b1)][_0x3afcf5(0x1e0)]+=_0x11f8f8['value2'],_0x201566=!![];break;case Game_Action[_0x3afcf5(0x1fd)]:this[_0x3afcf5(0x2b1)][_0x3afcf5(0x4e6)]+=_0x11f8f8['value1'],this['_itemData']['flatMP']+=_0x11f8f8[_0x3afcf5(0x3f8)],_0x201566=!![];break;case Game_Action[_0x3afcf5(0x457)]:this[_0x3afcf5(0x2b1)]['gainTP']+=_0x11f8f8['value1'],_0x201566=!![];break;case Game_Action['EFFECT_ADD_STATE']:this['_itemData'][_0x3afcf5(0x4b4)][_0x3afcf5(0x215)](_0x11f8f8[_0x3afcf5(0x48d)]),_0x201566=!![];break;case Game_Action[_0x3afcf5(0x3cc)]:this[_0x3afcf5(0x2b1)][_0x3afcf5(0x624)][_0x3afcf5(0x215)](_0x11f8f8[_0x3afcf5(0x48d)]),this[_0x3afcf5(0x2b1)][_0x3afcf5(0x447)]=!![],_0x201566=!![];break;case Game_Action[_0x3afcf5(0x227)]:this[_0x3afcf5(0x2b1)][_0x3afcf5(0x264)][_0x11f8f8[_0x3afcf5(0x48d)]]+=0x1,_0x201566=!![];break;case Game_Action[_0x3afcf5(0x60a)]:this['_itemData'][_0x3afcf5(0x264)][_0x11f8f8[_0x3afcf5(0x48d)]]-=0x1,_0x201566=!![];break;case Game_Action[_0x3afcf5(0x1e4)]:this['_itemData'][_0x3afcf5(0x3d1)][_0x3afcf5(0x215)](_0x11f8f8[_0x3afcf5(0x48d)]),this['_itemData'][_0x3afcf5(0x447)]=!![],_0x201566=!![];break;case Game_Action[_0x3afcf5(0x1ae)]:this[_0x3afcf5(0x2b1)][_0x3afcf5(0x42d)]['push'](_0x11f8f8[_0x3afcf5(0x48d)]),this[_0x3afcf5(0x2b1)]['removeStateBuffChanges']=!![],_0x201566=!![];break;}}if(this[_0x3afcf5(0x2b1)][_0x3afcf5(0x4b4)][_0x3afcf5(0x22d)]>0x0)this[_0x3afcf5(0x2b1)][_0x3afcf5(0x295)]=!![];for(let _0xda89d6=0x0;_0xda89d6<this['_itemData']['changeBuff'][_0x3afcf5(0x22d)];_0xda89d6++){if('jdBYs'!==_0x3afcf5(0x5f3)){if(this['_itemData']['changeBuff'][_0xda89d6]!==0x0)this[_0x3afcf5(0x2b1)][_0x3afcf5(0x295)]=!![];}else{if(this['_numberWindow']&&this[_0x3afcf5(0x4c9)]['active'])return _0x716daa[_0x3afcf5(0x2ba)]('up',_0x3afcf5(0x53a));return _0x1e3589[_0x3afcf5(0x32e)][_0x3afcf5(0x625)][_0x3afcf5(0x27a)](this);}}this[_0x3afcf5(0x5a9)][_0x3afcf5(0x202)]!==0x0&&(this[_0x3afcf5(0x2b1)][_0x3afcf5(0x1e6)]=this['_item']['tpGain'],_0x201566=!![]);const _0x281e02=['HP\x20RECOVERY',_0x3afcf5(0x4c6),_0x3afcf5(0x5a7),_0x3afcf5(0x2fc),_0x3afcf5(0x561),'TP\x20DAMAGE',_0x3afcf5(0x343),'ADDED\x20EFFECTS',_0x3afcf5(0x555)];for(const _0x5a1530 of _0x281e02){if(_0x3afcf5(0x4e9)==='DEKjC')_0x1f999d[_0x3afcf5(0x32e)][_0x3afcf5(0x58e)]['call'](this);else{if(this['_customItemInfo'][_0x5a1530]){if('OlHzW'===_0x3afcf5(0x61b)){_0x201566=!![];break;}else this['_dummyWindow']['hide']();}}}return _0x201566;},Window_ShopStatus['prototype'][_0x2455b1(0x502)]=function(_0x427131,_0x3ab511,_0x2dddef){const _0x4c58e9=_0x2455b1,_0x4994d8=_0x4c58e9(0x46f);if(this[_0x4c58e9(0x2b1)]['rateHP']<=0x0&&this[_0x4c58e9(0x2b1)][_0x4c58e9(0x1e0)]<=0x0&&!this[_0x4c58e9(0x5a0)][_0x4994d8])return![];const _0x4ec36a=this[_0x4c58e9(0x34f)]();this[_0x4c58e9(0x52d)](_0x4ec36a,_0x427131,_0x3ab511,_0x2dddef,!![]);const _0x3ffaa1=this[_0x4c58e9(0x29c)]();return this[_0x4c58e9(0x1b9)](ColorManager[_0x4c58e9(0x33d)](0x1)),this[_0x4c58e9(0x52d)](_0x3ffaa1,_0x427131,_0x3ab511,_0x2dddef,![],_0x4c58e9(0x265)),this[_0x4c58e9(0x419)](_0x427131,_0x3ab511,_0x2dddef),this[_0x4c58e9(0x256)](),!![];},Window_ShopStatus['prototype']['getItemEffectsHpRecoveryLabel']=function(){const _0x35d2e5=_0x2455b1,_0x20e90c=VisuMZ[_0x35d2e5(0x21d)][_0x35d2e5(0x33c)][_0x35d2e5(0x3b8)][_0x35d2e5(0x261)];return _0x20e90c[_0x35d2e5(0x4c5)](TextManager['hp']);},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x29c)]=function(){const _0x572063=_0x2455b1,_0x2217ed=_0x572063(0x46f);if(this['_customItemInfo'][_0x2217ed])return this['_customItemInfo'][_0x2217ed];let _0x587998='';if(this[_0x572063(0x2b1)]['rateHP']>0x0)_0x587998+=_0x572063(0x409)[_0x572063(0x4c5)](Math['floor'](this[_0x572063(0x2b1)]['rateHP']*0x64));if(this[_0x572063(0x2b1)][_0x572063(0x5d6)]>0x0&&this[_0x572063(0x2b1)]['flatHP']>0x0)_0x587998+='\x20';if(this['_itemData'][_0x572063(0x1e0)]>0x0)_0x587998+='+%1'[_0x572063(0x4c5)](this[_0x572063(0x2b1)][_0x572063(0x1e0)]);return _0x587998;},Window_ShopStatus[_0x2455b1(0x32e)]['drawItemEffectsMpRecovery']=function(_0xeb3e48,_0x48c9c0,_0x40f166){const _0x2fa44b=_0x2455b1,_0x4fc449='MP\x20RECOVERY';if(this[_0x2fa44b(0x2b1)][_0x2fa44b(0x4e6)]<=0x0&&this['_itemData'][_0x2fa44b(0x63b)]<=0x0&&!this[_0x2fa44b(0x5a0)][_0x4fc449])return![];const _0x571359=this['getItemEffectsMpRecoveryLabel']();this[_0x2fa44b(0x52d)](_0x571359,_0xeb3e48,_0x48c9c0,_0x40f166,!![]);const _0x19cf0d=this['getItemEffectsMpRecoveryText']();return this[_0x2fa44b(0x1b9)](ColorManager[_0x2fa44b(0x33d)](0x3)),this[_0x2fa44b(0x52d)](_0x19cf0d,_0xeb3e48,_0x48c9c0,_0x40f166,![],'right'),this[_0x2fa44b(0x419)](_0xeb3e48,_0x48c9c0,_0x40f166),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x203)]=function(){const _0x3c2f53=_0x2455b1,_0x47c9cc=VisuMZ[_0x3c2f53(0x21d)][_0x3c2f53(0x33c)][_0x3c2f53(0x3b8)]['LabelRecoverMP'];return _0x47c9cc[_0x3c2f53(0x4c5)](TextManager['mp']);},Window_ShopStatus[_0x2455b1(0x32e)]['getItemEffectsMpRecoveryText']=function(){const _0x1957b8=_0x2455b1,_0x408054='MP\x20RECOVERY';if(this[_0x1957b8(0x5a0)][_0x408054])return this[_0x1957b8(0x5a0)][_0x408054];let _0xd2cc0b='';if(this[_0x1957b8(0x2b1)][_0x1957b8(0x4e6)]>0x0)_0xd2cc0b+='+%1%'[_0x1957b8(0x4c5)](Math[_0x1957b8(0x637)](this[_0x1957b8(0x2b1)]['rateMP']*0x64));if(this[_0x1957b8(0x2b1)][_0x1957b8(0x4e6)]>0x0&&this[_0x1957b8(0x2b1)][_0x1957b8(0x63b)]>0x0)_0xd2cc0b+='\x20';if(this[_0x1957b8(0x2b1)][_0x1957b8(0x63b)]>0x0)_0xd2cc0b+=_0x1957b8(0x4cc)[_0x1957b8(0x4c5)](this[_0x1957b8(0x2b1)][_0x1957b8(0x63b)]);return _0xd2cc0b;},Window_ShopStatus[_0x2455b1(0x32e)]['drawItemEffectsTpRecovery']=function(_0x462c9d,_0x3de09c,_0x69889d){const _0x54cdea=_0x2455b1,_0x3eb26a=_0x54cdea(0x5a7);if(this[_0x54cdea(0x2b1)][_0x54cdea(0x3d7)]<=0x0&&!this[_0x54cdea(0x5a0)][_0x3eb26a])return![];const _0x25f9f0=this['getItemEffectsTpRecoveryLabel']();this['drawItemKeyData'](_0x25f9f0,_0x462c9d,_0x3de09c,_0x69889d,!![]);const _0x217919=this[_0x54cdea(0x339)]();return this[_0x54cdea(0x1b9)](ColorManager['powerUpColor']()),this[_0x54cdea(0x52d)](_0x217919,_0x462c9d,_0x3de09c,_0x69889d,![],_0x54cdea(0x265)),this['drawItemDarkRect'](_0x462c9d,_0x3de09c,_0x69889d),this[_0x54cdea(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x56c)]=function(){const _0x191dd9=_0x2455b1,_0x42acf7=VisuMZ[_0x191dd9(0x21d)][_0x191dd9(0x33c)]['StatusWindow'][_0x191dd9(0x259)];return _0x42acf7[_0x191dd9(0x4c5)](TextManager['tp']);},Window_ShopStatus[_0x2455b1(0x32e)]['getItemEffectsTpRecoveryText']=function(){const _0x141cef=_0x2455b1,_0x4d5069='TP\x20RECOVERY';if(this[_0x141cef(0x5a0)][_0x4d5069])return this[_0x141cef(0x5a0)][_0x4d5069];let _0x84fcff='';return _0x84fcff+=_0x141cef(0x4cc)['format'](this[_0x141cef(0x2b1)][_0x141cef(0x3d7)]),_0x84fcff;},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x27c)]=function(_0x202a37,_0x1e728a,_0x1046b7){const _0x2f0a3a=_0x2455b1,_0x4b195f=_0x2f0a3a(0x343);if(this[_0x2f0a3a(0x2b1)][_0x2f0a3a(0x1e6)]===0x0&&!this[_0x2f0a3a(0x5a0)][_0x4b195f])return![];const _0x57dcc7=this[_0x2f0a3a(0x4ce)]();this[_0x2f0a3a(0x52d)](_0x57dcc7,_0x202a37,_0x1e728a,_0x1046b7,!![]);const _0x425fbb=this[_0x2f0a3a(0x5f2)]();return this[_0x2f0a3a(0x2b1)][_0x2f0a3a(0x1e6)]>0x0?this['changeTextColor'](ColorManager[_0x2f0a3a(0x2a3)]()):this[_0x2f0a3a(0x1b9)](ColorManager[_0x2f0a3a(0x620)]()),this[_0x2f0a3a(0x52d)](_0x425fbb,_0x202a37,_0x1e728a,_0x1046b7,![],'right'),this[_0x2f0a3a(0x419)](_0x202a37,_0x1e728a,_0x1046b7),this[_0x2f0a3a(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x4ce)]=function(){const _0xbb128f=_0x2455b1,_0x55d678=VisuMZ[_0xbb128f(0x21d)][_0xbb128f(0x33c)][_0xbb128f(0x3b8)][_0xbb128f(0x593)];return _0x55d678[_0xbb128f(0x4c5)](TextManager['tp']);},Window_ShopStatus['prototype']['getItemEffectsSelfTpGainText']=function(){const _0x34359e=_0x2455b1,_0x471429=_0x34359e(0x343);if(this['_customItemInfo'][_0x471429])return this[_0x34359e(0x5a0)][_0x471429];let _0x294172='';if(this['_itemData']['selfTP']>0x0)_0x34359e(0x4be)===_0x34359e(0x4be)?_0x294172+='+%1'[_0x34359e(0x4c5)](this[_0x34359e(0x2b1)][_0x34359e(0x1e6)]):(_0x44285f=this[_0x34359e(0x5bc)]['paramValueByName'](_0x3a3fc6,![]),_0x24c6f6=this[_0x34359e(0x5cc)][_0x34359e(0x53d)](_0x221c0a,![]),_0xd4c32e=this[_0x34359e(0x5cc)][_0x34359e(0x53d)](_0x37e233,!![]));else{if(_0x34359e(0x42f)!==_0x34359e(0x42f))return _0x6c324['prototype'][_0x34359e(0x3ad)][_0x34359e(0x27a)](this);else _0x294172+='%1'[_0x34359e(0x4c5)](this[_0x34359e(0x2b1)][_0x34359e(0x1e6)]);}return _0x294172;},Window_ShopStatus['prototype'][_0x2455b1(0x583)]=function(_0x2381c6,_0x53f700,_0xb8d05d){const _0x21a84b=_0x2455b1,_0x44fa27=_0x21a84b(0x2fc);if(this[_0x21a84b(0x2b1)][_0x21a84b(0x5d6)]>=0x0&&this[_0x21a84b(0x2b1)][_0x21a84b(0x1e0)]>=0x0&&!this[_0x21a84b(0x5a0)][_0x44fa27])return![];const _0x1544ca=this[_0x21a84b(0x35e)]();this[_0x21a84b(0x52d)](_0x1544ca,_0x2381c6,_0x53f700,_0xb8d05d,!![]);const _0x996204=this[_0x21a84b(0x415)]();return this[_0x21a84b(0x1b9)](ColorManager[_0x21a84b(0x33d)](0x0)),this[_0x21a84b(0x52d)](_0x996204,_0x2381c6,_0x53f700,_0xb8d05d,![],_0x21a84b(0x265)),this[_0x21a84b(0x419)](_0x2381c6,_0x53f700,_0xb8d05d),this[_0x21a84b(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x35e)]=function(){const _0x389e3a=_0x2455b1,_0x1f5952=VisuMZ[_0x389e3a(0x21d)][_0x389e3a(0x33c)][_0x389e3a(0x3b8)][_0x389e3a(0x1c3)];return _0x1f5952[_0x389e3a(0x4c5)](TextManager['hp']);},Window_ShopStatus[_0x2455b1(0x32e)]['getItemEffectsHpDamageText']=function(){const _0x538ebe=_0x2455b1,_0x2c3db7=_0x538ebe(0x2fc);if(this[_0x538ebe(0x5a0)][_0x2c3db7])return this['_customItemInfo'][_0x2c3db7];let _0x4d7ba2='';if(this[_0x538ebe(0x2b1)][_0x538ebe(0x5d6)]<0x0)_0x4d7ba2+=_0x538ebe(0x3f4)[_0x538ebe(0x4c5)](Math['floor'](this[_0x538ebe(0x2b1)][_0x538ebe(0x5d6)]*0x64));if(this['_itemData'][_0x538ebe(0x5d6)]<0x0&&this[_0x538ebe(0x2b1)][_0x538ebe(0x1e0)]<0x0)_0x4d7ba2+='\x20';if(this['_itemData'][_0x538ebe(0x1e0)]<0x0)_0x4d7ba2+='%1'[_0x538ebe(0x4c5)](this['_itemData'][_0x538ebe(0x1e0)]);return _0x4d7ba2;},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x5d3)]=function(_0x268e7e,_0x1eeb57,_0x258526){const _0x96616=_0x2455b1,_0x525974='MP\x20DAMAGE';if(this[_0x96616(0x2b1)]['rateMP']>=0x0&&this[_0x96616(0x2b1)][_0x96616(0x63b)]>=0x0&&!this[_0x96616(0x5a0)][_0x525974])return![];const _0x5b2f6a=this['getItemEffectsMpDamageLabel']();this[_0x96616(0x52d)](_0x5b2f6a,_0x268e7e,_0x1eeb57,_0x258526,!![]);const _0x3bdef8=this[_0x96616(0x309)]();return this[_0x96616(0x1b9)](ColorManager[_0x96616(0x33d)](0x2)),this[_0x96616(0x52d)](_0x3bdef8,_0x268e7e,_0x1eeb57,_0x258526,![],_0x96616(0x265)),this[_0x96616(0x419)](_0x268e7e,_0x1eeb57,_0x258526),this[_0x96616(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x21f)]=function(){const _0x315d28=_0x2455b1,_0x529b18=VisuMZ[_0x315d28(0x21d)][_0x315d28(0x33c)][_0x315d28(0x3b8)]['LabelDamageMP'];return _0x529b18['format'](TextManager['mp']);},Window_ShopStatus['prototype'][_0x2455b1(0x309)]=function(){const _0x41c2d4=_0x2455b1,_0x3847f1='MP\x20DAMAGE';if(this[_0x41c2d4(0x5a0)][_0x3847f1])return this[_0x41c2d4(0x5a0)][_0x3847f1];let _0x43183a='';if(this[_0x41c2d4(0x2b1)][_0x41c2d4(0x4e6)]<0x0)_0x43183a+=_0x41c2d4(0x3f4)['format'](Math[_0x41c2d4(0x637)](this[_0x41c2d4(0x2b1)]['rateMP']*0x64));if(this[_0x41c2d4(0x2b1)][_0x41c2d4(0x4e6)]<0x0&&this[_0x41c2d4(0x2b1)][_0x41c2d4(0x63b)]<0x0)_0x43183a+='\x20';if(this['_itemData'][_0x41c2d4(0x63b)]<0x0)_0x43183a+='%1'[_0x41c2d4(0x4c5)](this[_0x41c2d4(0x2b1)]['flatMP']);return _0x43183a;},Window_ShopStatus[_0x2455b1(0x32e)]['drawItemEffectsTpDamage']=function(_0x475cd0,_0x4f538f,_0x2334c3){const _0x133c6c=_0x2455b1,_0x1295a9=_0x133c6c(0x39f);if(this[_0x133c6c(0x2b1)]['gainTP']>=0x0&&!this[_0x133c6c(0x5a0)][_0x1295a9])return![];const _0x33c071=this[_0x133c6c(0x5f8)]();this[_0x133c6c(0x52d)](_0x33c071,_0x475cd0,_0x4f538f,_0x2334c3,!![]);const _0xdcfde5=this[_0x133c6c(0x1d8)]();return this[_0x133c6c(0x1b9)](ColorManager['powerDownColor']()),this[_0x133c6c(0x52d)](_0xdcfde5,_0x475cd0,_0x4f538f,_0x2334c3,![],'right'),this[_0x133c6c(0x419)](_0x475cd0,_0x4f538f,_0x2334c3),this[_0x133c6c(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x5f8)]=function(){const _0x47f281=_0x2455b1,_0x391457=VisuMZ['ItemsEquipsCore'][_0x47f281(0x33c)][_0x47f281(0x3b8)][_0x47f281(0x43d)];return _0x391457['format'](TextManager['tp']);},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x1d8)]=function(){const _0x589788=_0x2455b1,_0x281f6e=_0x589788(0x39f);if(this[_0x589788(0x5a0)][_0x281f6e])return this[_0x589788(0x5a0)][_0x281f6e];let _0x1b0d4d='';return _0x1b0d4d+='%1'[_0x589788(0x4c5)](this['_itemData'][_0x589788(0x3d7)]),_0x1b0d4d;},Window_ShopStatus['prototype'][_0x2455b1(0x623)]=function(_0xa22ec1,_0x4bd763,_0x3cd4e4){const _0x109b15=_0x2455b1,_0x4ff964=_0x109b15(0x45b);if(!this['_itemData'][_0x109b15(0x295)]&&!this[_0x109b15(0x5a0)][_0x4ff964])return![];const _0x3893d2=this[_0x109b15(0x252)]();this[_0x109b15(0x52d)](_0x3893d2,_0xa22ec1,_0x4bd763,_0x3cd4e4,!![]);const _0x34e784=this[_0x109b15(0x31d)]();return this[_0x109b15(0x52d)](_0x34e784,_0xa22ec1,_0x4bd763,_0x3cd4e4,![],_0x109b15(0x265)),this[_0x109b15(0x419)](_0xa22ec1,_0x4bd763,_0x3cd4e4),this[_0x109b15(0x256)](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x252)]=function(){const _0x3ea6fa=_0x2455b1;return VisuMZ[_0x3ea6fa(0x21d)][_0x3ea6fa(0x33c)][_0x3ea6fa(0x3b8)]['LabelApply'];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x31d)]=function(){const _0x5c3921=_0x2455b1,_0xba52e9=_0x5c3921(0x45b);if(this[_0x5c3921(0x5a0)][_0xba52e9])return this['_customItemInfo'][_0xba52e9];let _0x524956='',_0x588583=0x0;const _0x52c7d0=0x8;for(const _0x36c72f of this[_0x5c3921(0x2b1)][_0x5c3921(0x4b4)]){const _0x436d78=$dataStates[_0x36c72f];if(_0x436d78&&_0x436d78[_0x5c3921(0x305)]>0x0){_0x524956+=_0x5c3921(0x60b)[_0x5c3921(0x4c5)](_0x436d78[_0x5c3921(0x305)]),_0x588583++;if(_0x588583>=_0x52c7d0)return _0x524956;}}for(let _0x33412b=0x0;_0x33412b<this[_0x5c3921(0x2b1)]['changeBuff'][_0x5c3921(0x22d)];_0x33412b++){const _0x2957d9=this[_0x5c3921(0x2b1)]['changeBuff'][_0x33412b],_0x11c969=Game_BattlerBase['prototype'][_0x5c3921(0x235)](_0x2957d9,_0x33412b);if(_0x11c969>0x0){if(_0x5c3921(0x1ea)!==_0x5c3921(0x1ea)){const _0x42e99a=_0x5c3921(0x614);if(this['_customItemInfo'][_0x42e99a])return this[_0x5c3921(0x5a0)][_0x42e99a];return this[_0x5c3921(0x4c3)]()?_0x4978d9[_0x5c3921(0x21d)]['Settings'][_0x5c3921(0x3b8)][_0x5c3921(0x214)]:_0x254735[_0x5c3921(0x21d)]['Settings']['StatusWindow'][_0x5c3921(0x3e3)];}else{_0x524956+='\x5cI[%1]'[_0x5c3921(0x4c5)](_0x11c969),_0x588583++;if(_0x588583>=_0x52c7d0)return _0x524956;}}}return _0x524956;},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x533)]=function(_0x59bfdd,_0x28b04b,_0x2430fd){const _0x35f335=_0x2455b1,_0x2f2ad0=_0x35f335(0x555);if(!this[_0x35f335(0x2b1)][_0x35f335(0x447)]&&!this[_0x35f335(0x5a0)][_0x2f2ad0])return![];const _0x397735=this[_0x35f335(0x492)]();this[_0x35f335(0x52d)](_0x397735,_0x59bfdd,_0x28b04b,_0x2430fd,!![]);const _0x29c20b=this['getItemEffectsRemovedStatesBuffsText']();return this['drawItemKeyData'](_0x29c20b,_0x59bfdd,_0x28b04b,_0x2430fd,![],_0x35f335(0x265)),this[_0x35f335(0x419)](_0x59bfdd,_0x28b04b,_0x2430fd),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x492)]=function(){const _0xe298a4=_0x2455b1;return VisuMZ[_0xe298a4(0x21d)][_0xe298a4(0x33c)][_0xe298a4(0x3b8)]['LabelRemove'];},Window_ShopStatus['prototype'][_0x2455b1(0x43e)]=function(){const _0x3734c4=_0x2455b1,_0x5be7d2='REMOVED\x20EFFECTS';if(this['_customItemInfo'][_0x5be7d2])return this[_0x3734c4(0x5a0)][_0x5be7d2];let _0x3df0b9='',_0x43bc71=0x0;const _0x4b78d3=VisuMZ[_0x3734c4(0x21d)]['Settings'][_0x3734c4(0x3b8)][_0x3734c4(0x210)];for(const _0x168c98 of this[_0x3734c4(0x2b1)][_0x3734c4(0x624)]){if(_0x3734c4(0x2e0)!==_0x3734c4(0x465)){const _0x46bb6e=$dataStates[_0x168c98];if(_0x46bb6e&&_0x46bb6e['iconIndex']>0x0){_0x3df0b9+=_0x3734c4(0x60b)[_0x3734c4(0x4c5)](_0x46bb6e[_0x3734c4(0x305)]),_0x43bc71++;if(_0x43bc71>=_0x4b78d3)return _0x3df0b9;}}else this[_0x3734c4(0x2a0)](_0x5ce061,_0x1c28e9['x'],_0x586a26['y'],_0x30ca4a);}for(let _0x356337=0x0;_0x356337<this['_itemData'][_0x3734c4(0x3d1)]['length'];_0x356337++){const _0x28a581=Game_BattlerBase['prototype'][_0x3734c4(0x235)](0x1,_0x356337);if(_0x28a581>0x0){if(_0x3734c4(0x45f)!==_0x3734c4(0x45f)){_0x46df53[_0x3734c4(0x21d)]['Scene_Shop_doBuy']['call'](this,_0x52e6a6);if(_0x5190bd<=0x0)return;const _0x30151c=_0x53aeb3['ItemsEquipsCore'][_0x3734c4(0x33c)][_0x3734c4(0x586)];_0x30151c[_0x3734c4(0x501)]&&_0x4a165d['setValue'](_0x30151c['SwitchBuy'],!![]);}else{_0x3df0b9+=_0x3734c4(0x60b)[_0x3734c4(0x4c5)](_0x28a581),_0x43bc71++;if(_0x43bc71>=_0x4b78d3)return _0x3df0b9;}}}for(let _0x50c7f9=0x0;_0x50c7f9<this['_itemData']['removeDebuff']['length'];_0x50c7f9++){if(_0x3734c4(0x4f6)!==_0x3734c4(0x4cd)){const _0x5b261c=Game_BattlerBase[_0x3734c4(0x32e)]['buffIconIndex'](-0x1,_0x50c7f9);if(_0x5b261c>0x0){if('eMrYR'!==_0x3734c4(0x5a3))this[_0x3734c4(0x331)](_0x5f3607[_0x3734c4(0x3fe)](_0x3734c4(0x5a5)));else{_0x3df0b9+=_0x3734c4(0x60b)[_0x3734c4(0x4c5)](_0x5b261c),_0x43bc71++;if(_0x43bc71>=_0x4b78d3)return _0x3df0b9;}}}else this[_0x3734c4(0x241)]=!![];}return _0x3df0b9;},Window_ShopStatus[_0x2455b1(0x32e)]['drawItemCustomEntries']=function(_0x2c8ca7,_0x27c052,_0x3504a3){const _0x1d18b9=_0x2455b1;if(this[_0x1d18b9(0x5a9)]['note']['match'](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){if(_0x1d18b9(0x296)!==_0x1d18b9(0x4e1)){const _0x2d741b=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x1a68a1 of _0x2d741b){if(_0x1d18b9(0x3be)!==_0x1d18b9(0x522)){if(_0x1a68a1[_0x1d18b9(0x3e1)](/(.*):[ ](.*)/i)){const _0x447f54=String(RegExp['$1'])[_0x1d18b9(0x48e)](),_0x4207e0=String(RegExp['$2'])['trim']();this['drawItemCustomEntryLine'](_0x447f54,_0x4207e0,_0x2c8ca7,_0x27c052,_0x3504a3),_0x27c052+=this['lineHeight']();}}else return![];}}else return _0x1d18b9(0x62a);}return this[_0x1d18b9(0x256)](),_0x27c052;},Window_ShopStatus[_0x2455b1(0x32e)][_0x2455b1(0x397)]=function(_0x33cedb,_0x35bf2f,_0x2f416b,_0x56605b,_0x3a0dd0){const _0xa6bca=_0x2455b1;this[_0xa6bca(0x52d)](_0x33cedb,_0x2f416b,_0x56605b,_0x3a0dd0,!![]),this['drawItemKeyData'](_0x35bf2f,_0x2f416b,_0x56605b,_0x3a0dd0,![],_0xa6bca(0x265)),this[_0xa6bca(0x419)](_0x2f416b,_0x56605b,_0x3a0dd0),this[_0xa6bca(0x256)]();},Window_ShopStatus['prototype']['drawCustomShopGraphic']=function(){const _0x556862=_0x2455b1;if(!this[_0x556862(0x5a9)])return;const _0x3d09a2=this[_0x556862(0x5a9)]['note'],_0xff065f=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x291693=_0x3d09a2['match'](_0xff065f);if(_0x291693){if(_0x556862(0x4b0)!==_0x556862(0x4b0))return _0xeb09d6[_0x556862(0x21d)]['Window_ItemList_colSpacing'][_0x556862(0x27a)](this);else for(const _0x46dc85 of _0x291693){_0x46dc85['match'](_0xff065f);const _0x1443ed=String(RegExp['$1'])[_0x556862(0x48e)]()||'';if(_0x1443ed==='')continue;const _0x28cc69=ImageManager[_0x556862(0x3da)](_0x1443ed);_0x28cc69[_0x556862(0x207)](this['drawCustomShopGraphicLoad'][_0x556862(0x506)](this,_0x28cc69,this[_0x556862(0x5a9)]));}}},Window_ShopStatus[_0x2455b1(0x32e)]['drawCustomShopGraphicLoad']=function(_0x18f46d,_0x3bcbb6){const _0x12fe08=_0x2455b1;if(this[_0x12fe08(0x5a9)]!==_0x3bcbb6)return;if(!_0x18f46d)return;if(_0x18f46d[_0x12fe08(0x5fb)]<=0x0||_0x18f46d[_0x12fe08(0x24b)]<=0x0)return;const _0x28051d=_0x3bcbb6[_0x12fe08(0x3c8)];let _0x3486a4='background';_0x28051d[_0x12fe08(0x3e1)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x3486a4=_0x12fe08(0x33f));const _0x35e038=_0x3486a4==='background'?this[_0x12fe08(0x4f7)]:this[_0x12fe08(0x5bb)];let _0xdabae2=this[_0x12fe08(0x266)],_0x28df6f=this[_0x12fe08(0x299)];_0x28051d[_0x12fe08(0x3e1)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0xdabae2=Number(RegExp['$1']));_0x28051d['match'](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x28df6f=Number(RegExp['$1']));_0x28051d[_0x12fe08(0x3e1)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0xdabae2=Number(RegExp['$1']),_0x28df6f=Number(RegExp['$2']));const _0x378769=Math[_0x12fe08(0x5c8)](0x1,_0xdabae2/_0x18f46d[_0x12fe08(0x5fb)],_0x28df6f/_0x18f46d[_0x12fe08(0x24b)]);let _0x5690ab=0x0,_0x11ed30=0x0,_0x4b82bd=Math[_0x12fe08(0x637)](_0x18f46d[_0x12fe08(0x5fb)]*_0x378769),_0x12e2df=Math['floor'](_0x18f46d[_0x12fe08(0x24b)]*_0x378769),_0x5ebd78=_0x12fe08(0x5b8);_0x28051d[_0x12fe08(0x3e1)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x5ebd78=String(RegExp['$1'])[_0x12fe08(0x1fa)]()['trim']());if(_0x5ebd78==='left')_0x5690ab=0x0;else{if(_0x5ebd78==='center'){if(_0x12fe08(0x232)===_0x12fe08(0x232))_0x5690ab=Math[_0x12fe08(0x4c4)]((this[_0x12fe08(0x266)]-_0x4b82bd)/0x2);else{if(_0x42b91a['versionId']()!==_0x19529b['versionId'])for(const _0x5a1c80 of _0x5f5a5c[_0x12fe08(0x5af)]){if(_0x5a1c80)_0x5a1c80['prepareNewEquipSlotsOnLoad']();}}}else{if(_0x12fe08(0x51f)==='lulur')_0x5690ab=this[_0x12fe08(0x266)]-_0x4b82bd;else return this[_0x12fe08(0x39d)]&&this['_scene'][_0x12fe08(0x5d2)]===_0x5c962d;}}let _0x39900e=_0x12fe08(0x36e);_0x28051d[_0x12fe08(0x3e1)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x39900e=String(RegExp['$1'])['toLowerCase']()['trim']());if(_0x39900e===_0x12fe08(0x374))_0x12fe08(0x405)===_0x12fe08(0x2f2)?_0x233777=_0x2e43ef[_0x12fe08(0x4c4)](_0x4c2ec6(_0x5dd623['$1'])*0.01*0xff)[_0x12fe08(0x3c1)](0x0,0xff):_0x11ed30=0x0;else{if(_0x39900e===_0x12fe08(0x36e))_0x11ed30=Math[_0x12fe08(0x4c4)]((this[_0x12fe08(0x299)]-_0x12e2df)/0x2);else{if(_0x12fe08(0x1f5)!==_0x12fe08(0x359))_0x11ed30=this[_0x12fe08(0x299)]-_0x12e2df;else return this[_0x12fe08(0x2c8)]()<=0x1?_0xf21f0d[_0x12fe08(0x32e)][_0x12fe08(0x2d4)][_0x12fe08(0x27a)](this):_0x8a268b[_0x12fe08(0x21d)][_0x12fe08(0x4f0)][_0x12fe08(0x27a)](this);}}_0x28051d[_0x12fe08(0x3e1)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x5690ab+=Number(RegExp['$1']));_0x28051d['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x11ed30+=Number(RegExp['$1']));if(_0x28051d[_0x12fe08(0x3e1)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)){if('sPhTU'!==_0x12fe08(0x63d))return _0x12fe08(0x4d4);else _0x5690ab+=Number(RegExp['$1']),_0x11ed30+=Number(RegExp['$2']);}let _0x2a43d7=0xff;if(_0x28051d[_0x12fe08(0x3e1)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i)){if(_0x12fe08(0x1f9)!==_0x12fe08(0x314))_0x2a43d7=Number(RegExp['$1']);else{this[_0x12fe08(0x241)]=![];if(this[_0x12fe08(0x2b0)]()){const _0x8b3d23=this[_0x12fe08(0x5fe)](),_0x51a217=this[_0x12fe08(0x5b4)]();_0x51a217>=0x0&&_0x51a217!==this[_0x12fe08(0x5fe)]()&&this['select'](_0x51a217),_0x469a69&&this[_0x12fe08(0x5fe)]()!==_0x8b3d23&&this['playCursorSound']();}}}else{if(_0x28051d[_0x12fe08(0x3e1)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)){if('RPJwL'===_0x12fe08(0x332)){const _0x1b4540=this['itemLineRect'](this[_0x12fe08(0x5fe)]());let _0x319722=this[_0x12fe08(0x1e2)](this[_0x12fe08(0x5fe)]());_0x319722=_0x319722[_0x12fe08(0x523)](/\\I\[(\d+)\]/gi,''),_0x4644f7['resetFontSettings'](),this[_0x12fe08(0x3c9)](_0x319722,_0x1b4540),this[_0x12fe08(0x4ae)](_0x319722,_0x1b4540),this['categoryNameWindowCenter'](_0x319722,_0x1b4540);}else _0x2a43d7=Math[_0x12fe08(0x4c4)](Number(RegExp['$1'])*0.01*0xff)[_0x12fe08(0x3c1)](0x0,0xff);}}_0x35e038[_0x12fe08(0x4ec)]=_0x2a43d7,_0x35e038[_0x12fe08(0x279)](_0x18f46d,0x0,0x0,_0x18f46d[_0x12fe08(0x5fb)],_0x18f46d[_0x12fe08(0x24b)],_0x5690ab,_0x11ed30,_0x4b82bd,_0x12e2df),_0x35e038[_0x12fe08(0x4ec)]=0xff;};