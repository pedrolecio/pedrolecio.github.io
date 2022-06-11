//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.49;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.49] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
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
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x140e58=_0x2d25;(function(_0x546fb4,_0x4babbb){const _0x3b15f7=_0x2d25,_0x1bf288=_0x546fb4();while(!![]){try{const _0x554af1=parseInt(_0x3b15f7(0x481))/0x1*(-parseInt(_0x3b15f7(0x234))/0x2)+-parseInt(_0x3b15f7(0x71b))/0x3*(parseInt(_0x3b15f7(0x3a8))/0x4)+parseInt(_0x3b15f7(0x347))/0x5*(parseInt(_0x3b15f7(0x2b2))/0x6)+parseInt(_0x3b15f7(0xe2))/0x7+-parseInt(_0x3b15f7(0x401))/0x8+parseInt(_0x3b15f7(0x61d))/0x9*(parseInt(_0x3b15f7(0x238))/0xa)+-parseInt(_0x3b15f7(0x61c))/0xb*(-parseInt(_0x3b15f7(0x5ea))/0xc);if(_0x554af1===_0x4babbb)break;else _0x1bf288['push'](_0x1bf288['shift']());}catch(_0x2af91b){_0x1bf288['push'](_0x1bf288['shift']());}}}(_0x3658,0x5131c));var label=_0x140e58(0x370),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x468d1b){const _0x46f7de=_0x140e58;return _0x468d1b[_0x46f7de(0x808)]&&_0x468d1b['description'][_0x46f7de(0x7fd)]('['+label+']');})[0x0];VisuMZ[label][_0x140e58(0x452)]=VisuMZ[label][_0x140e58(0x452)]||{},VisuMZ[_0x140e58(0x222)]=function(_0xc65878,_0x1f0484){const _0x5372ea=_0x140e58;for(const _0x590a20 in _0x1f0484){if('eMppm'!==_0x5372ea(0x7ea)){var _0x3a0d71=_0x18b714(_0x590422['$1'])/0x64;_0x36b493*=_0x3a0d71;}else{if(_0x590a20[_0x5372ea(0x461)](/(.*):(.*)/i)){const _0x554d73=String(RegExp['$1']),_0x5ebd67=String(RegExp['$2'])[_0x5372ea(0x5a9)]()[_0x5372ea(0x36f)]();let _0xce1a74,_0x2528a8,_0x11bdd5;switch(_0x5ebd67){case'NUM':_0xce1a74=_0x1f0484[_0x590a20]!==''?Number(_0x1f0484[_0x590a20]):0x0;break;case _0x5372ea(0x240):_0x2528a8=_0x1f0484[_0x590a20]!==''?JSON[_0x5372ea(0x703)](_0x1f0484[_0x590a20]):[],_0xce1a74=_0x2528a8[_0x5372ea(0x82f)](_0x2bbbb8=>Number(_0x2bbbb8));break;case _0x5372ea(0x4a8):_0xce1a74=_0x1f0484[_0x590a20]!==''?eval(_0x1f0484[_0x590a20]):null;break;case _0x5372ea(0x786):_0x2528a8=_0x1f0484[_0x590a20]!==''?JSON['parse'](_0x1f0484[_0x590a20]):[],_0xce1a74=_0x2528a8[_0x5372ea(0x82f)](_0x3c6339=>eval(_0x3c6339));break;case _0x5372ea(0x7b0):_0xce1a74=_0x1f0484[_0x590a20]!==''?JSON[_0x5372ea(0x703)](_0x1f0484[_0x590a20]):'';break;case _0x5372ea(0x6b7):_0x2528a8=_0x1f0484[_0x590a20]!==''?JSON[_0x5372ea(0x703)](_0x1f0484[_0x590a20]):[],_0xce1a74=_0x2528a8[_0x5372ea(0x82f)](_0x13964e=>JSON[_0x5372ea(0x703)](_0x13964e));break;case _0x5372ea(0x671):_0xce1a74=_0x1f0484[_0x590a20]!==''?new Function(JSON[_0x5372ea(0x703)](_0x1f0484[_0x590a20])):new Function(_0x5372ea(0x7bb));break;case _0x5372ea(0xc1):_0x2528a8=_0x1f0484[_0x590a20]!==''?JSON[_0x5372ea(0x703)](_0x1f0484[_0x590a20]):[],_0xce1a74=_0x2528a8[_0x5372ea(0x82f)](_0x3eff40=>new Function(JSON[_0x5372ea(0x703)](_0x3eff40)));break;case _0x5372ea(0x5e3):_0xce1a74=_0x1f0484[_0x590a20]!==''?String(_0x1f0484[_0x590a20]):'';break;case _0x5372ea(0x407):_0x2528a8=_0x1f0484[_0x590a20]!==''?JSON[_0x5372ea(0x703)](_0x1f0484[_0x590a20]):[],_0xce1a74=_0x2528a8[_0x5372ea(0x82f)](_0x628bcb=>String(_0x628bcb));break;case _0x5372ea(0x341):_0x11bdd5=_0x1f0484[_0x590a20]!==''?JSON[_0x5372ea(0x703)](_0x1f0484[_0x590a20]):{},_0xc65878[_0x554d73]={},VisuMZ[_0x5372ea(0x222)](_0xc65878[_0x554d73],_0x11bdd5);continue;case _0x5372ea(0x545):_0x2528a8=_0x1f0484[_0x590a20]!==''?JSON['parse'](_0x1f0484[_0x590a20]):[],_0xce1a74=_0x2528a8[_0x5372ea(0x82f)](_0x2ff9da=>VisuMZ[_0x5372ea(0x222)]({},JSON[_0x5372ea(0x703)](_0x2ff9da)));break;default:continue;}_0xc65878[_0x554d73]=_0xce1a74;}}}return _0xc65878;},(_0x551563=>{const _0x3d2cbc=_0x140e58,_0x4ba7e8=_0x551563[_0x3d2cbc(0x6f8)];for(const _0x233b5c of dependencies){if(!Imported[_0x233b5c]){if(_0x3d2cbc(0x478)!==_0x3d2cbc(0x59b)){alert(_0x3d2cbc(0x365)[_0x3d2cbc(0x722)](_0x4ba7e8,_0x233b5c)),SceneManager[_0x3d2cbc(0x518)]();break;}else this['setViewportCoreEngineFix'](_0x171dca);}}const _0x20e95b=_0x551563['description'];if(_0x20e95b[_0x3d2cbc(0x461)](/\[Version[ ](.*?)\]/i)){const _0x52a480=Number(RegExp['$1']);if(_0x52a480!==VisuMZ[label][_0x3d2cbc(0x51e)]){if('JrLUT'===_0x3d2cbc(0x1ba)){const _0x24666b=_0x6dfbfc[_0x3d2cbc(0x839)]()<=_0x18d8a6;_0x285610[_0x3d2cbc(0x477)](_0x2e2f2b,_0x24666b);}else alert(_0x3d2cbc(0x512)[_0x3d2cbc(0x722)](_0x4ba7e8,_0x52a480)),SceneManager['exit']();}}if(_0x20e95b[_0x3d2cbc(0x461)](/\[Tier[ ](\d+)\]/i)){if(_0x3d2cbc(0x89d)===_0x3d2cbc(0x7a0))_0x270306+=_0x3d2cbc(0x2c7);else{const _0xaab611=Number(RegExp['$1']);_0xaab611<tier?'eAqvn'!==_0x3d2cbc(0x4d0)?this[_0x3d2cbc(0x24b)](_0x424130['note']):(alert(_0x3d2cbc(0x70d)['format'](_0x4ba7e8,_0xaab611,tier)),SceneManager[_0x3d2cbc(0x518)]()):_0x3d2cbc(0x803)===_0x3d2cbc(0x803)?tier=Math[_0x3d2cbc(0x1d1)](_0xaab611,tier):this[_0x3d2cbc(0x409)]+=_0x31a40b;}}VisuMZ[_0x3d2cbc(0x222)](VisuMZ[label]['Settings'],_0x551563['parameters']);})(pluginData),PluginManager[_0x140e58(0x143)](pluginData[_0x140e58(0x6f8)],_0x140e58(0x79f),_0x2fb406=>{const _0x2e6d1b=_0x140e58;if(!SceneManager[_0x2e6d1b(0x8a1)])return;if(!SceneManager[_0x2e6d1b(0x8a1)][_0x2e6d1b(0x5be)])return;VisuMZ[_0x2e6d1b(0x222)](_0x2fb406,_0x2fb406);const _0x184979=Math[_0x2e6d1b(0x372)](_0x2fb406[_0x2e6d1b(0x4b6)]),_0x1aa353=Math[_0x2e6d1b(0x372)](_0x2fb406['pointY']);$gameTemp['requestPointAnimation'](_0x184979,_0x1aa353,_0x2fb406['AnimationID'],_0x2fb406[_0x2e6d1b(0x21e)],_0x2fb406[_0x2e6d1b(0x1a9)]);}),PluginManager[_0x140e58(0x143)](pluginData['name'],_0x140e58(0x63b),_0x1f3d00=>{const _0x59edca=_0x140e58;if(!$gameTemp[_0x59edca(0x4c1)]())return;if(!Utils[_0x59edca(0x724)]())return;SceneManager['_scene']['_active']=![],VisuMZ['CoreEngine']['ExportStrFromAllMaps']();}),PluginManager[_0x140e58(0x143)](pluginData[_0x140e58(0x6f8)],_0x140e58(0x799),_0x5c0c2d=>{const _0x390a3c=_0x140e58;if(!$gameTemp[_0x390a3c(0x4c1)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x390a3c(0x8a1)][_0x390a3c(0x3c6)]=![],VisuMZ[_0x390a3c(0x370)][_0x390a3c(0x898)]();}),PluginManager[_0x140e58(0x143)](pluginData['name'],_0x140e58(0x570),_0xe3d9f=>{const _0x3b4855=_0x140e58;if(!$gameTemp[_0x3b4855(0x4c1)]())return;if(!Utils[_0x3b4855(0x724)]())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x3b4855(0x222)](_0xe3d9f,_0xe3d9f);const _0x1d89cf='Map%1'[_0x3b4855(0x722)]($gameMap[_0x3b4855(0x5e2)]()[_0x3b4855(0x209)](0x3)),_0x59e168=VisuMZ[_0x3b4855(0x370)][_0x3b4855(0x1c1)]($gameMap[_0x3b4855(0x5e2)]());VisuMZ['CoreEngine']['ExportString'](_0x59e168,_0x1d89cf,!![]);}),PluginManager['registerCommand'](pluginData[_0x140e58(0x6f8)],'ExportCurTroopText',_0x807b15=>{const _0x5df399=_0x140e58;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x5df399(0x724)]())return;if(!$gameParty[_0x5df399(0x6d7)]())return;VisuMZ[_0x5df399(0x222)](_0x807b15,_0x807b15);const _0x2455cd='Troop%1'[_0x5df399(0x722)]($gameTroop[_0x5df399(0x6c5)][_0x5df399(0x209)](0x4)),_0x30020f=VisuMZ[_0x5df399(0x370)][_0x5df399(0x805)]($gameTroop[_0x5df399(0x6c5)]);VisuMZ[_0x5df399(0x370)][_0x5df399(0x174)](_0x30020f,_0x2455cd,!![]);}),VisuMZ[_0x140e58(0x370)]['ExportString']=function(_0x25be62,_0x2a239a,_0x3669a4){const _0x16010c=_0x140e58,_0x340085=require('fs');let _0x14b500='Exported_Script_%1.txt'[_0x16010c(0x722)](_0x2a239a||'0');_0x340085[_0x16010c(0x44a)](_0x14b500,_0x25be62,_0x1dd07e=>{const _0x362056=_0x16010c;if(_0x1dd07e)throw err;else{if(_0x3669a4){if(_0x362056(0x26c)===_0x362056(0x1fe)){let _0x4ddd3d=_0x567ec4[_0x362056(0x7a2)](/[\d+]/g,'')[_0x362056(0x5a9)]();const _0x500092=_0x17e084['format'](_0x3fcb97,_0x4ddd3d);_0xb8b651[_0x362056(0x370)]['RegExp'][_0x5de872][_0x362056(0x750)](new _0x47b762(_0x500092,'i'));const _0x5c2e2b=_0x362056(0x53a)[_0x362056(0x722)](_0x41b101,_0x4ddd3d);_0x4572e8[_0x362056(0x370)][_0x362056(0x142)][_0x1e9f6f+'JS'][_0x362056(0x750)](new _0x2fe3d3(_0x5c2e2b,'i'));}else alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x362056(0x722)](_0x14b500));}}});},VisuMZ[_0x140e58(0x370)][_0x140e58(0x7a9)]=function(){const _0x92d1f0=_0x140e58,_0x493ac1=[];for(const _0xe10055 of $dataMapInfos){if(_0x92d1f0(0x740)==='SwrGT'){if(!_0xe10055)continue;_0x493ac1[_0x92d1f0(0x750)](_0xe10055['id']);}else return this[_0x92d1f0(0x3e5)]()[_0x92d1f0(0x35c)];}const _0x26723e=_0x493ac1['length']*0x64+Math[_0x92d1f0(0x2f7)](0x64);alert(_0x92d1f0(0x2ce)['format'](_0x26723e)),this[_0x92d1f0(0x649)]=[],this[_0x92d1f0(0x4c2)]=$dataMap;for(const _0x16390a of _0x493ac1){VisuMZ['CoreEngine'][_0x92d1f0(0x1c9)](_0x16390a);}setTimeout(VisuMZ[_0x92d1f0(0x370)][_0x92d1f0(0x268)][_0x92d1f0(0xfe)](this),_0x26723e);},VisuMZ[_0x140e58(0x370)]['loadMapData']=function(_0x298e03){const _0x91be83=_0x140e58,_0x12bb10=_0x91be83(0x600)[_0x91be83(0x722)](_0x298e03[_0x91be83(0x209)](0x3)),_0x3a9dd5=new XMLHttpRequest(),_0x19eab9=_0x91be83(0x1c5)+_0x12bb10;_0x3a9dd5['open'](_0x91be83(0x3e8),_0x19eab9),_0x3a9dd5[_0x91be83(0x453)]('application/json'),_0x3a9dd5[_0x91be83(0x275)]=()=>this['storeMapData'](_0x3a9dd5,_0x298e03,_0x12bb10,_0x19eab9),_0x3a9dd5[_0x91be83(0x13d)]=()=>DataManager[_0x91be83(0x3b9)](_0x91be83(0x2dc),_0x12bb10,_0x19eab9),_0x3a9dd5['send']();},VisuMZ['CoreEngine'][_0x140e58(0x630)]=function(_0x596850,_0x26bca9,_0x59b22b,_0x143b41){const _0x269e9c=_0x140e58;$dataMap=JSON[_0x269e9c(0x703)](_0x596850[_0x269e9c(0x45e)]),DataManager[_0x269e9c(0x34c)]($dataMap),this[_0x269e9c(0x649)][_0x26bca9]=VisuMZ[_0x269e9c(0x370)][_0x269e9c(0x1c1)](_0x26bca9),$dataMap=this[_0x269e9c(0x4c2)];},VisuMZ[_0x140e58(0x370)][_0x140e58(0x268)]=function(){const _0x33b31c=_0x140e58,_0x27ca75=_0x33b31c(0x205);this[_0x33b31c(0x649)][_0x33b31c(0x2fe)](undefined)[_0x33b31c(0x2fe)]('')[_0x33b31c(0x2fe)](null);const _0x473831=this[_0x33b31c(0x649)][_0x33b31c(0x490)](_0x33b31c(0x6aa))[_0x33b31c(0x36f)]();VisuMZ['CoreEngine'][_0x33b31c(0x174)](_0x473831,_0x27ca75,!![]),SceneManager[_0x33b31c(0x8a1)][_0x33b31c(0x3c6)]=!![];},VisuMZ[_0x140e58(0x370)][_0x140e58(0x1c1)]=function(_0x2d3bb8){const _0x51516c=_0x140e58;if(!$dataMap)return'';let _0x1397eb='█'[_0x51516c(0xd9)](0x46)+'\x0a\x0a',_0xf3cf74='═'[_0x51516c(0xd9)](0x46)+'\x0a\x0a',_0x576465='';this[_0x51516c(0x5d3)]=0x0;for(const _0xd66365 of $dataMap['events']){if(!_0xd66365)continue;let _0x17d75e=_0xd66365['id'],_0x549e9f=_0xd66365[_0x51516c(0x6f8)],_0x45c36e=_0xd66365[_0x51516c(0x262)];for(const _0x724325 of _0x45c36e){const _0x23d07e=_0x45c36e[_0x51516c(0x673)](_0x724325)+0x1;let _0x216799=_0xf3cf74+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x127275=VisuMZ[_0x51516c(0x370)][_0x51516c(0x411)](_0x724325[_0x51516c(0x351)]);if(_0x127275[_0x51516c(0x4d7)]>0x0){if(_0x576465[_0x51516c(0x4d7)]>0x0)_0x576465+=_0xf3cf74+_0x51516c(0x6aa);else{const _0x204e00=$dataMapInfos[_0x2d3bb8][_0x51516c(0x6f8)];_0x576465+=_0x1397eb+_0x51516c(0x74f)[_0x51516c(0x722)](_0x2d3bb8,_0x204e00||_0x51516c(0x656))+_0x1397eb;}_0x576465+=_0x216799['format'](_0x17d75e,_0x549e9f,_0x23d07e,_0x127275);}}}return _0x576465[_0x51516c(0x4d7)]>0x0&&(_0x576465+=_0xf3cf74),_0x576465;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x898)]=function(){const _0x9993ea=_0x140e58,_0x2d90e3=$dataTroops['length']*0xa+Math[_0x9993ea(0x2f7)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x9993ea(0x722)](_0x2d90e3));const _0x2d4a8d=[];for(const _0x44f75e of $dataTroops){if(!_0x44f75e)continue;const _0x50cba5=_0x44f75e['id'];_0x2d4a8d[_0x50cba5]=VisuMZ[_0x9993ea(0x370)]['ExtractStrFromTroop'](_0x50cba5);}setTimeout(VisuMZ[_0x9993ea(0x370)]['exportAllTroopStrings'][_0x9993ea(0xfe)](this,_0x2d4a8d),_0x2d90e3);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x805)]=function(_0x465d5a){const _0x324e6d=_0x140e58;if(!$dataTroops[_0x465d5a])return'';let _0x3d1fc2='█'[_0x324e6d(0xd9)](0x46)+'\x0a\x0a',_0x37f710='═'[_0x324e6d(0xd9)](0x46)+'\x0a\x0a',_0x4444f2='';this[_0x324e6d(0x5d3)]=0x0;const _0x3cfcfd=$dataTroops[_0x465d5a];let _0x380d09=_0x3cfcfd[_0x324e6d(0x262)];for(const _0x45ada8 of _0x380d09){if(_0x324e6d(0x4ae)===_0x324e6d(0x4ae)){const _0x1a58ea=_0x380d09[_0x324e6d(0x673)](_0x45ada8)+0x1;let _0x1ead34=_0x37f710+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x57bef8=VisuMZ['CoreEngine'][_0x324e6d(0x411)](_0x45ada8[_0x324e6d(0x351)]);if(_0x57bef8[_0x324e6d(0x4d7)]>0x0){if(_0x324e6d(0x36b)==='rAeiM')this[_0x324e6d(0x3ec)]+=_0x2d68cb[_0x324e6d(0x372)]((_0x1407cc[_0x324e6d(0x757)]-0x270)/0x2),this[_0x324e6d(0x3ec)]-=_0x34b7bd[_0x324e6d(0x184)]((_0x35673c[_0x324e6d(0x757)]-_0x39ab67[_0x324e6d(0x6f1)])/0x2),_0x24226b[_0x324e6d(0x27e)]()?this['_screenX']-=_0x32ff74[_0x324e6d(0x184)]((_0xb672dc[_0x324e6d(0x3b1)]-_0x1c0e27['boxWidth'])/0x2):this['_screenX']+=_0x4d1edb[_0x324e6d(0x372)]((_0x11ccfd[_0x324e6d(0x754)]-0x330)/0x2);else{if(_0x4444f2[_0x324e6d(0x4d7)]>0x0){if('uGRwu'!=='uGRwu'){const _0x404e4b=_0x324e6d(0x736);this[_0x324e6d(0x64a)]=this[_0x324e6d(0x64a)]||{};if(this[_0x324e6d(0x64a)][_0x404e4b])return this[_0x324e6d(0x64a)][_0x404e4b];const _0x4218e9=_0x373f9a['CoreEngine'][_0x324e6d(0x452)]['Color'][_0x324e6d(0x5e7)];return this[_0x324e6d(0x45f)](_0x404e4b,_0x4218e9);}else _0x4444f2+=_0x37f710+_0x324e6d(0x6aa);}else{if(_0x324e6d(0x526)===_0x324e6d(0x526))_0x4444f2+=_0x3d1fc2+_0x324e6d(0x211)['format'](_0x465d5a,_0x3cfcfd[_0x324e6d(0x6f8)]||'Unnamed')+_0x3d1fc2;else return _0x36024b[_0x324e6d(0x370)][_0x324e6d(0x452)]['QoL'][_0x324e6d(0x556)]??!![];}_0x4444f2+=_0x1ead34[_0x324e6d(0x722)](_0x1a58ea,_0x57bef8);}}}else _0x163ce9[_0x324e6d(0x370)][_0x324e6d(0x4a2)][_0x324e6d(0x129)](this),this[_0x324e6d(0x463)](),this[_0x324e6d(0xdd)]();}return _0x4444f2[_0x324e6d(0x4d7)]>0x0&&(_0x4444f2+=_0x37f710),_0x4444f2;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x2e4)]=function(_0x3f521f){const _0x24cd36=_0x140e58,_0x5bdbba='AllTroops';_0x3f521f[_0x24cd36(0x2fe)](undefined)[_0x24cd36(0x2fe)]('')[_0x24cd36(0x2fe)](null);const _0xa3020f=_0x3f521f[_0x24cd36(0x490)](_0x24cd36(0x6aa))['trim']();VisuMZ[_0x24cd36(0x370)][_0x24cd36(0x174)](_0xa3020f,_0x5bdbba,!![]),SceneManager['_scene'][_0x24cd36(0x3c6)]=!![];},VisuMZ['CoreEngine'][_0x140e58(0x411)]=function(_0x1de9cf){const _0x321bf2=_0x140e58;let _0x372eef='\x0a'+'─'[_0x321bf2(0xd9)](0x46)+'\x0a',_0x21dfcb='\x0a'+'┄'[_0x321bf2(0xd9)](0x46)+'\x0a',_0x3fe9ed='';for(const _0x6edf87 of _0x1de9cf){if(_0x321bf2(0x3db)!=='qaJzG'){if(!_0x6edf87)continue;if(_0x6edf87[_0x321bf2(0x413)]===0x65)_0x3fe9ed+=_0x372eef+'\x0a',_0x3fe9ed+=_0x321bf2(0x3a4),_0x6edf87[_0x321bf2(0x78c)][0x4]!==''&&_0x6edf87['parameters'][0x4]!==undefined&&(_0x3fe9ed+='【%1】\x0a'['format'](_0x6edf87['parameters'][0x4]));else{if(_0x6edf87[_0x321bf2(0x413)]===0x191)_0x3fe9ed+=_0x321bf2(0x4a1)[_0x321bf2(0x722)](_0x6edf87[_0x321bf2(0x78c)][0x0]);else{if(_0x6edf87['code']===0x192)_0x3fe9ed+=_0x372eef,_0x3fe9ed+='%1〘Choice\x20%2〙\x20%3%1'[_0x321bf2(0x722)](_0x21dfcb,_0x6edf87[_0x321bf2(0x78c)][0x0]+0x1,_0x6edf87[_0x321bf2(0x78c)][0x1]);else{if(_0x6edf87[_0x321bf2(0x413)]===0x193)_0x3fe9ed+=_0x372eef,_0x3fe9ed+='%1〘Choice\x20Cancel〙%1'[_0x321bf2(0x722)](_0x21dfcb);else{if(_0x6edf87['code']===0x194)_0x3fe9ed+=_0x372eef,_0x3fe9ed+='%1〘End\x20Choice\x20Selection〙%1'[_0x321bf2(0x722)](_0x21dfcb);else{if(_0x6edf87[_0x321bf2(0x413)]===0x69)_0x3fe9ed+=_0x372eef+'\x0a',_0x3fe9ed+=_0x321bf2(0x641);else{if(_0x6edf87[_0x321bf2(0x413)]===0x6c){if(_0x321bf2(0x870)==='zDTkB'){if(!this['_coreEasing'])return _0x9a056;const _0x32759a=this[_0x321bf2(0x6ce)][_0x321bf2(0x20d)],_0x1cf729=this[_0x321bf2(0x6ce)][_0x321bf2(0x291)],_0x516ff7=this[_0x321bf2(0x361)]((_0x1cf729-_0x32759a)/_0x1cf729),_0x4355b9=this[_0x321bf2(0x361)]((_0x1cf729-_0x32759a+0x1)/_0x1cf729),_0x4984cf=(_0x52937f-_0x237412*_0x516ff7)/(0x1-_0x516ff7);return _0x4984cf+(_0x34c729-_0x4984cf)*_0x4355b9;}else _0x3fe9ed+=_0x372eef+'\x0a',_0x3fe9ed+=_0x321bf2(0x60e)[_0x321bf2(0x722)](_0x6edf87['parameters'][0x0]);}else{if(_0x6edf87['code']===0x198){if(_0x321bf2(0x34e)===_0x321bf2(0x34e))_0x3fe9ed+=_0x321bf2(0x4a1)[_0x321bf2(0x722)](_0x6edf87[_0x321bf2(0x78c)][0x0]);else{const _0x14f864=_0x321bf2(0x4ee);this['_colorCache']=this[_0x321bf2(0x64a)]||{};if(this[_0x321bf2(0x64a)][_0x14f864])return this[_0x321bf2(0x64a)][_0x14f864];const _0x4a10f5=_0x4d7d2b[_0x321bf2(0x370)][_0x321bf2(0x452)][_0x321bf2(0x543)][_0x321bf2(0x4f0)];return this['getColorDataFromPluginParameters'](_0x14f864,_0x4a10f5);}}else{if(_0x6edf87[_0x321bf2(0x413)]===0x75){const _0x30a952=$dataCommonEvents[_0x6edf87[_0x321bf2(0x78c)][0x0]];if(_0x30a952&&this[_0x321bf2(0x5d3)]<=0xa){this[_0x321bf2(0x5d3)]++;let _0x117ddc=VisuMZ['CoreEngine'][_0x321bf2(0x411)](_0x30a952['list']);_0x117ddc[_0x321bf2(0x4d7)]>0x0&&(_0x321bf2(0x442)!==_0x321bf2(0x442)?_0x6c7ed6[_0x321bf2(0x502)]=_0x4521ce[_0x321bf2(0x6a4)](_0x1ea211(_0x520774['$1']),_0x33b9ac[_0x321bf2(0x6c9)]):(_0x3fe9ed+=_0x372eef,_0x3fe9ed+=_0x21dfcb,_0x3fe9ed+=_0x321bf2(0x897)[_0x321bf2(0x722)](_0x30a952['id'],_0x30a952[_0x321bf2(0x6f8)]),_0x3fe9ed+=_0x21dfcb,_0x3fe9ed+=_0x117ddc,_0x3fe9ed+=_0x21dfcb,_0x3fe9ed+=_0x321bf2(0x336)['format'](_0x30a952['id'],_0x30a952[_0x321bf2(0x6f8)]),_0x3fe9ed+=_0x21dfcb)),this[_0x321bf2(0x5d3)]--;}}}}}}}}}}}else return _0x2a087b(_0x79b855)[_0x321bf2(0x363)](_0x54e7b3,_0x4f3e58)+'.';}return _0x3fe9ed[_0x321bf2(0x4d7)]>0x0&&('fdAwW'!==_0x321bf2(0x531)?_0x3fe9ed+=_0x372eef:_0x5f4bcf=0x0),_0x3fe9ed;},PluginManager['registerCommand'](pluginData[_0x140e58(0x6f8)],_0x140e58(0x43c),_0xa8ee0e=>{const _0x588422=_0x140e58;VisuMZ[_0x588422(0x222)](_0xa8ee0e,_0xa8ee0e);const _0x2add47=_0xa8ee0e[_0x588422(0x892)];VisuMZ[_0x588422(0x4d8)](_0x2add47);}),PluginManager[_0x140e58(0x143)](pluginData[_0x140e58(0x6f8)],'GoldChange',_0x1f90de=>{const _0x255592=_0x140e58;VisuMZ[_0x255592(0x222)](_0x1f90de,_0x1f90de);const _0x31c17e=_0x1f90de[_0x255592(0x51c)]||0x0;$gameParty[_0x255592(0x4aa)](_0x31c17e);}),PluginManager['registerCommand'](pluginData[_0x140e58(0x6f8)],_0x140e58(0x232),_0x122346=>{const _0x76250e=_0x140e58;if(!SceneManager[_0x76250e(0x60d)]())return;VisuMZ[_0x76250e(0x222)](_0x122346,_0x122346);const _0x50cfc9=_0x122346[_0x76250e(0x100)];SceneManager[_0x76250e(0x8a1)]['playOnceParallelInterpreter'](_0x50cfc9);}),PluginManager[_0x140e58(0x143)](pluginData[_0x140e58(0x6f8)],_0x140e58(0x1cd),_0x29d82b=>{const _0x555949=_0x140e58;if(!$gameTemp[_0x555949(0x4c1)]())return;if(!Utils[_0x555949(0x724)]())return;VisuMZ[_0x555949(0x222)](_0x29d82b,_0x29d82b);const _0xa14ef7=_0x29d82b[_0x555949(0x4e6)]||0x1;$gameTemp['_pictureCoordinatesMode']=_0xa14ef7;}),PluginManager['registerCommand'](pluginData[_0x140e58(0x6f8)],'PictureEasingType',_0x4bc247=>{const _0x695ec7=_0x140e58;VisuMZ[_0x695ec7(0x222)](_0x4bc247,_0x4bc247);const _0x3ab206=_0x4bc247[_0x695ec7(0x123)]||0x1,_0x3c6e8b=_0x4bc247[_0x695ec7(0x6b6)]||'Linear',_0x4e2aa5=$gameScreen['picture'](_0x3ab206);if(_0x4e2aa5){if('XvGga'!==_0x695ec7(0x402))_0x4e2aa5[_0x695ec7(0x235)](_0x3c6e8b);else return _0x37bbc2[_0x695ec7(0x579)][_0x695ec7(0x5a8)][_0x695ec7(0x129)](this);}}),PluginManager[_0x140e58(0x143)](pluginData[_0x140e58(0x6f8)],'PictureEraseAll',_0x36a46a=>{const _0x3c575a=_0x140e58;for(let _0x4a4b15=0x1;_0x4a4b15<=0x64;_0x4a4b15++){'uxeIc'==='uxeIc'?$gameScreen['erasePicture'](_0x4a4b15):(this['drawIcon'](_0x5a513b,_0x537e8e+0x2,_0x2a76e6+0x2),_0x5a2f07-=_0x472b64[_0x3c575a(0x3d6)]+0x4,_0x1b0f3f+=_0xd87e4d['iconWidth']+0x4);}}),PluginManager[_0x140e58(0x143)](pluginData[_0x140e58(0x6f8)],_0x140e58(0x825),_0x36aec0=>{const _0x5a7986=_0x140e58;VisuMZ[_0x5a7986(0x222)](_0x36aec0,_0x36aec0);const _0x176bf5=Math[_0x5a7986(0x6a4)](_0x36aec0['StartID'],_0x36aec0[_0x5a7986(0x2f8)]),_0x65cfb5=Math[_0x5a7986(0x1d1)](_0x36aec0['StartID'],_0x36aec0['EndingID']);for(let _0x3da2b0=_0x176bf5;_0x3da2b0<=_0x65cfb5;_0x3da2b0++){if(_0x5a7986(0x39f)!=='gxPlm')$gameScreen['erasePicture'](_0x3da2b0);else return _0xc9a4ee[_0x5a7986(0x3eb)](this),_0x58f19c['CoreEngine'][_0x5a7986(0x11b)][_0x5a7986(0x129)](this,_0x4382ee);}}),PluginManager['registerCommand'](pluginData[_0x140e58(0x6f8)],_0x140e58(0x5ec),_0x95b6b7=>{const _0x941b5=_0x140e58;VisuMZ[_0x941b5(0x222)](_0x95b6b7,_0x95b6b7);const _0x37d7a8=Math['round'](_0x95b6b7[_0x941b5(0x4e6)])[_0x941b5(0x16b)](0x1,0x64),_0x4ef461=_0x95b6b7[_0x941b5(0x452)],_0x2635ab=_0x4ef461[_0x941b5(0x73c)]['clamp'](0x0,0x1),_0x4f6e64=Math[_0x941b5(0x372)](_0x4ef461[_0x941b5(0x3b0)]||0x0),_0xe22f77=Math[_0x941b5(0x372)](_0x4ef461[_0x941b5(0x1db)]||0x0),_0x44ec73=Math[_0x941b5(0x372)](_0x4ef461[_0x941b5(0x4cc)]||0x0),_0xe49bd1=Math[_0x941b5(0x372)](_0x4ef461[_0x941b5(0x289)]||0x0),_0x411e9d=Math['round'](_0x4ef461['Opacity'])[_0x941b5(0x16b)](0x0,0xff),_0x3f5e3e=_0x4ef461[_0x941b5(0x2f1)],_0x4b077e=_0x941b5(0x346),_0x533b4d=_0x95b6b7[_0x941b5(0x760)]?_0x941b5(0x760):_0x941b5(0x83b),_0x122628=_0x4b077e['format'](_0x95b6b7['IconIndex'],_0x533b4d);$gameScreen[_0x941b5(0x830)](_0x37d7a8,_0x122628,_0x2635ab,_0x4f6e64,_0xe22f77,_0x44ec73,_0xe49bd1,_0x411e9d,_0x3f5e3e);}),PluginManager['registerCommand'](pluginData[_0x140e58(0x6f8)],_0x140e58(0x77e),_0x59dac6=>{const _0x18a93c=_0x140e58;VisuMZ['ConvertParams'](_0x59dac6,_0x59dac6);const _0x3ac3a6=_0x59dac6[_0x18a93c(0x74c)]||_0x18a93c(0x839),_0x193cff=_0x59dac6[_0x18a93c(0x377)][_0x18a93c(0x16b)](0x1,0x9),_0x30a20b=_0x59dac6[_0x18a93c(0x891)][_0x18a93c(0x16b)](0x1,0x9),_0x1b69fa=_0x59dac6[_0x18a93c(0x2cb)]||0x1,_0x412c4c=_0x59dac6[_0x18a93c(0x53c)];$gameScreen[_0x18a93c(0x3d1)](_0x3ac3a6),$gameScreen[_0x18a93c(0x756)](_0x193cff,_0x30a20b,_0x1b69fa);if(_0x412c4c){if(_0x18a93c(0x421)===_0x18a93c(0x1ad))return this[_0x18a93c(0x876)]=this[_0x18a93c(0x876)]||0x0,[0x0,0x1,0x2,0x3][_0x18a93c(0x7fd)](this[_0x18a93c(0x876)])?_0x5803db[_0x18a93c(0x370)][_0x18a93c(0x639)]['call'](this,_0x5a0574):_0x3e28d7[_0x18a93c(0x46f)](_0xbf4b2b,this['_coreEasingType']);else{const _0x5b642a=$gameTemp[_0x18a93c(0x5c5)]();if(_0x5b642a)_0x5b642a[_0x18a93c(0x517)](_0x1b69fa);}}}),PluginManager['registerCommand'](pluginData[_0x140e58(0x6f8)],'SystemSetFontSize',_0xb7687=>{const _0x41d172=_0x140e58;VisuMZ[_0x41d172(0x222)](_0xb7687,_0xb7687);const _0x295a3c=_0xb7687['option']||0x1;$gameSystem['setMainFontSize'](_0x295a3c);}),PluginManager[_0x140e58(0x143)](pluginData['name'],_0x140e58(0x171),_0x6c926b=>{const _0x248d87=_0x140e58;if($gameParty[_0x248d87(0x6d7)]())return;VisuMZ['ConvertParams'](_0x6c926b,_0x6c926b);const _0x2d17a4=_0x6c926b[_0x248d87(0xea)];if(_0x2d17a4[_0x248d87(0x461)](/Front/i)){if(_0x248d87(0x631)===_0x248d87(0x71c)){if(_0x325deb[_0x248d87(0x720)](_0x248d87(0x1df))){var _0x3d07e6=_0x56c8c7(_0x248d87(0x271))[_0x248d87(0x7ad)][_0x248d87(0x312)]();_0x4f6967[_0x248d87(0x267)]();if(_0x2c5412)_0x4b8652(_0x3d07e6[_0x248d87(0x230)][_0x248d87(0xfe)](_0x3d07e6),0x190);}}else $gameSystem['setSideView'](![]);}else _0x2d17a4[_0x248d87(0x461)](/Side/i)?$gameSystem[_0x248d87(0x638)](!![]):$gameSystem[_0x248d87(0x638)](!$gameSystem[_0x248d87(0x27e)]());}),PluginManager[_0x140e58(0x143)](pluginData[_0x140e58(0x6f8)],_0x140e58(0x686),_0x3101cb=>{const _0x357c19=_0x140e58;if($gameParty['inBattle']())return;VisuMZ[_0x357c19(0x222)](_0x3101cb,_0x3101cb);const _0x233dba=[_0x357c19(0x228),_0x357c19(0x814),'me','se'];for(const _0x6cd90c of _0x233dba){if(_0x357c19(0x5b7)===_0x357c19(0x3ca))this[_0x357c19(0x741)][_0x357c19(0x67c)](_0x8a0e27[_0x357c19(0x579)]['HelpBgType']);else{const _0x716b9e=_0x3101cb[_0x6cd90c],_0x32d972=_0x357c19(0x85c)[_0x357c19(0x722)](_0x6cd90c);for(const _0xb5f433 of _0x716b9e){AudioManager[_0x357c19(0x27f)](_0x32d972,_0xb5f433);}}}}),PluginManager[_0x140e58(0x143)](pluginData['name'],_0x140e58(0x63f),_0x14dbcd=>{const _0x5307f9=_0x140e58;if($gameParty[_0x5307f9(0x6d7)]())return;VisuMZ['ConvertParams'](_0x14dbcd,_0x14dbcd);const _0x48b660=[_0x5307f9(0x22c),_0x5307f9(0x606),_0x5307f9(0x4f2),'characters',_0x5307f9(0x692),'faces',_0x5307f9(0x6c7),'pictures',_0x5307f9(0x67b),_0x5307f9(0x48a),_0x5307f9(0x197),_0x5307f9(0x766),'titles1',_0x5307f9(0x6e7)];for(const _0x56a182 of _0x48b660){const _0x49ed2d=_0x14dbcd[_0x56a182],_0x1262c8=_0x5307f9(0x6de)[_0x5307f9(0x722)](_0x56a182);for(const _0x13f3e6 of _0x49ed2d){ImageManager[_0x5307f9(0x1d5)](_0x1262c8,_0x13f3e6);}}}),PluginManager[_0x140e58(0x143)](pluginData[_0x140e58(0x6f8)],'SwitchRandomizeOne',_0x360582=>{const _0x22ef09=_0x140e58;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x360582,_0x360582);const _0x39feb7=_0x360582[_0x22ef09(0x4cb)],_0xd1ea59=(_0x360582['Chance']||0x0)/0x64;for(const _0x9cece2 of _0x39feb7){if(_0x22ef09(0x3c1)!==_0x22ef09(0x1ee)){const _0x477d97=Math[_0x22ef09(0x839)]()<=_0xd1ea59;$gameSwitches['setValue'](_0x9cece2,_0x477d97);}else return _0x5750df&&this[_0x22ef09(0x17e)]?this[_0x22ef09(0x17e)][_0x22ef09(0x61e)](_0xb3638c):_0x4ad425['CoreEngine'][_0x22ef09(0x6ea)][_0x22ef09(0x129)](this,_0x38fa13);}}),PluginManager['registerCommand'](pluginData[_0x140e58(0x6f8)],_0x140e58(0x13a),_0x53eb02=>{const _0x29d464=_0x140e58;if($gameParty[_0x29d464(0x6d7)]())return;VisuMZ[_0x29d464(0x222)](_0x53eb02,_0x53eb02);const _0x128eab=Math[_0x29d464(0x6a4)](_0x53eb02[_0x29d464(0x614)],_0x53eb02['EndingID']),_0x25c3ff=Math['max'](_0x53eb02[_0x29d464(0x614)],_0x53eb02['EndingID']),_0x3f504a=(_0x53eb02[_0x29d464(0x836)]||0x0)/0x64;for(let _0x1f9cd1=_0x128eab;_0x1f9cd1<=_0x25c3ff;_0x1f9cd1++){if('uGwqJ'==='JlBfg'){var _0x309064=_0x405b81(_0xe32b8f['$1']);try{_0x24cfe3*=_0x3f1b0b(_0x309064);}catch(_0x2e6f1a){if(_0x57d7a9[_0x29d464(0x4c1)]())_0x1b41b1[_0x29d464(0x6be)](_0x2e6f1a);}}else{const _0xdf8211=Math[_0x29d464(0x839)]()<=_0x3f504a;$gameSwitches['setValue'](_0x1f9cd1,_0xdf8211);}}}),PluginManager[_0x140e58(0x143)](pluginData[_0x140e58(0x6f8)],_0x140e58(0x470),_0x123eb9=>{const _0x2c9f4a=_0x140e58;if($gameParty[_0x2c9f4a(0x6d7)]())return;VisuMZ[_0x2c9f4a(0x222)](_0x123eb9,_0x123eb9);const _0x2e269e=_0x123eb9[_0x2c9f4a(0x4cb)];for(const _0x42047d of _0x2e269e){const _0x21b221=$gameSwitches[_0x2c9f4a(0x51c)](_0x42047d);$gameSwitches[_0x2c9f4a(0x477)](_0x42047d,!_0x21b221);}}),PluginManager[_0x140e58(0x143)](pluginData[_0x140e58(0x6f8)],_0x140e58(0x7c2),_0x45b350=>{const _0x3229dc=_0x140e58;if($gameParty[_0x3229dc(0x6d7)]())return;VisuMZ['ConvertParams'](_0x45b350,_0x45b350);const _0x50fa9a=Math[_0x3229dc(0x6a4)](_0x45b350[_0x3229dc(0x614)],_0x45b350['EndingID']),_0x40be36=Math[_0x3229dc(0x1d1)](_0x45b350[_0x3229dc(0x614)],_0x45b350[_0x3229dc(0x2f8)]);for(let _0x1e6d25=_0x50fa9a;_0x1e6d25<=_0x40be36;_0x1e6d25++){const _0x483ff0=$gameSwitches['value'](_0x1e6d25);$gameSwitches[_0x3229dc(0x477)](_0x1e6d25,!_0x483ff0);}}),PluginManager[_0x140e58(0x143)](pluginData[_0x140e58(0x6f8)],'SystemSetBattleSystem',_0x34180c=>{const _0x1f9e15=_0x140e58;if($gameParty[_0x1f9e15(0x6d7)]())return;VisuMZ[_0x1f9e15(0x222)](_0x34180c,_0x34180c);const _0x34e6e5=_0x34180c[_0x1f9e15(0xea)][_0x1f9e15(0x5a9)]()[_0x1f9e15(0x36f)](),_0x54fd3b=VisuMZ[_0x1f9e15(0x370)][_0x1f9e15(0x330)](_0x34e6e5);$gameSystem[_0x1f9e15(0x37e)](_0x54fd3b);}),VisuMZ[_0x140e58(0x370)][_0x140e58(0x330)]=function(_0x49f28c){const _0x1513b7=_0x140e58;_0x49f28c=_0x49f28c||_0x1513b7(0x4d5),_0x49f28c=String(_0x49f28c)['toUpperCase']()['trim']();switch(_0x49f28c){case _0x1513b7(0x101):return 0x0;case _0x1513b7(0x2f6):Imported[_0x1513b7(0x20c)]&&('QelXJ'===_0x1513b7(0x157)?_0x26af0d['startAnimation']&&_0x1f2bef[_0x1513b7(0x47f)]():ConfigManager['atbActive']=!![]);return 0x1;case _0x1513b7(0x15e):Imported[_0x1513b7(0x20c)]&&(_0x1513b7(0x875)!==_0x1513b7(0x875)?this[_0x1513b7(0x5cd)](_0x404bc2):ConfigManager[_0x1513b7(0x68e)]=![]);return 0x2;case _0x1513b7(0x894):if(Imported[_0x1513b7(0x451)])return _0x1513b7(0x894);break;case _0x1513b7(0x4f5):if(Imported[_0x1513b7(0x208)]){if(_0x1513b7(0x809)===_0x1513b7(0x5cc))this[_0x1513b7(0x569)](_0x3130ef);else return _0x1513b7(0x4f5);}break;case _0x1513b7(0x7ca):if(Imported[_0x1513b7(0x3b4)])return _0x1513b7(0x7ca);break;case _0x1513b7(0x7da):if(Imported[_0x1513b7(0x7f3)]){if(_0x1513b7(0x4f3)===_0x1513b7(0x4f3))return _0x1513b7(0x7da);else this['_cancelButton']['x']=_0x5704a8[_0x1513b7(0x754)]+0x4;}break;case _0x1513b7(0x2f3):if(Imported['VisuMZ_2_BattleSystemOTB'])return _0x1513b7(0x2f3);break;case'ETB':if(Imported['VisuMZ_2_BattleSystemETB'])return'ETB';break;case _0x1513b7(0x3ea):if(Imported[_0x1513b7(0x186)]){if(_0x1513b7(0x188)!==_0x1513b7(0x110))return _0x1513b7(0x3ea);else{if(_0x141cff)_0x1a1f6e[_0x1513b7(0x573)](_0x31e36a);}}break;}return $dataSystem['battleSystem'];},PluginManager['registerCommand'](pluginData[_0x140e58(0x6f8)],_0x140e58(0x7a5),_0x1e7300=>{const _0x156d6b=_0x140e58;VisuMZ['ConvertParams'](_0x1e7300,_0x1e7300);const _0x5f086a=_0x1e7300['option']||0x1;$gameSystem[_0x156d6b(0x3c7)](_0x5f086a);}),VisuMZ[_0x140e58(0x370)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x140e58(0x468)][_0x140e58(0x55f)]=function(){const _0x4af308=_0x140e58;VisuMZ[_0x4af308(0x370)]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x4af308(0x5b3)](),this['process_VisuMZ_CoreEngine_Notetags'](),this['process_VisuMZ_CoreEngine_Settings'](),this[_0x4af308(0x6e5)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x142)]={},Scene_Boot[_0x140e58(0x468)][_0x140e58(0x5b3)]=function(){const _0x2f3d04=_0x140e58,_0x495911=[_0x2f3d04(0x6ef),_0x2f3d04(0x412),'ATK','DEF','MAT','MDF','AGI',_0x2f3d04(0x426)],_0x1dee4e=[_0x2f3d04(0x40a),_0x2f3d04(0x500),'CRI',_0x2f3d04(0x3fb),_0x2f3d04(0x2c4),_0x2f3d04(0x324),_0x2f3d04(0x81e),_0x2f3d04(0x644),_0x2f3d04(0x47a),_0x2f3d04(0x26a)],_0x6bfaf7=['TGR',_0x2f3d04(0x8a0),_0x2f3d04(0x718),'PHA','MCR','TCR',_0x2f3d04(0x2b5),_0x2f3d04(0x56b),_0x2f3d04(0x73f),_0x2f3d04(0x460)],_0x4dbaf3=[_0x495911,_0x1dee4e,_0x6bfaf7],_0x30c33a=[_0x2f3d04(0x516),_0x2f3d04(0x769),'Plus2',_0x2f3d04(0x6d4),_0x2f3d04(0x69a),'Rate1',_0x2f3d04(0x1dc),_0x2f3d04(0x8b0),_0x2f3d04(0x524),_0x2f3d04(0x2c6)];for(const _0x34d49f of _0x4dbaf3){let _0x1ed2d1='';if(_0x34d49f===_0x495911)_0x1ed2d1=_0x2f3d04(0x2bf);if(_0x34d49f===_0x1dee4e)_0x1ed2d1=_0x2f3d04(0x6c2);if(_0x34d49f===_0x6bfaf7)_0x1ed2d1=_0x2f3d04(0x48c);for(const _0x2a2d68 of _0x30c33a){if('vEOLb'===_0x2f3d04(0x423)){let _0x5ead43=_0x2f3d04(0x489)['format'](_0x1ed2d1,_0x2a2d68);VisuMZ[_0x2f3d04(0x370)][_0x2f3d04(0x142)][_0x5ead43]=[],VisuMZ[_0x2f3d04(0x370)][_0x2f3d04(0x142)][_0x5ead43+'JS']=[];let _0x120078=_0x2f3d04(0x857);if(['Plus',_0x2f3d04(0x8b0)]['includes'](_0x2a2d68)){if(_0x2f3d04(0x601)!==_0x2f3d04(0x1c2))_0x120078+=_0x2f3d04(0x2fb);else{const _0x12613c=this[_0x2f3d04(0x418)]();this[_0x2f3d04(0x353)](),this['drawText'](this[_0x2f3d04(0x17e)][_0x2f3d04(0x224)](_0x5a51da,!![]),_0xb8a7ef,_0x160928,_0x12613c,_0x2f3d04(0x1c0));}}else{if([_0x2f3d04(0x769),_0x2f3d04(0x524)][_0x2f3d04(0x7fd)](_0x2a2d68)){if('fgIfa'===_0x2f3d04(0x38c)){let _0x4a3e29=_0x4933bc[_0x2f3d04(0x269)](_0x11d4fd['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x4a3e29);}else _0x120078+=_0x2f3d04(0x565);}else{if([_0x2f3d04(0x441),_0x2f3d04(0x2c6)][_0x2f3d04(0x7fd)](_0x2a2d68))_0x120078+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x2a2d68==='Max')_0x120078+=_0x2f3d04(0x4a5);else{if(_0x2a2d68===_0x2f3d04(0x7fb)){if(_0x2f3d04(0x582)!==_0x2f3d04(0x582)){const _0x111db8=_0x43d408[_0x2f3d04(0x5e4)]()[_0x2f3d04(0x7a2)](/\\I\[(\d+)\]/gi,'');this[_0x2f3d04(0xd0)](_0xf73808[_0x2f3d04(0x5e4)](),_0x2249ea,_0x27d0d4,_0x472a33);}else _0x120078+=_0x2f3d04(0x467);}else _0x2a2d68===_0x2f3d04(0x1dc)&&(_0x120078+=_0x2f3d04(0x2a2));}}}}for(const _0x5b9dab of _0x34d49f){if('XmRcm'===_0x2f3d04(0x8ad)){let _0x2e65c3=_0x2a2d68[_0x2f3d04(0x7a2)](/[\d+]/g,'')['toUpperCase']();const _0x90d7f2=_0x120078[_0x2f3d04(0x722)](_0x5b9dab,_0x2e65c3);VisuMZ[_0x2f3d04(0x370)]['RegExp'][_0x5ead43][_0x2f3d04(0x750)](new RegExp(_0x90d7f2,'i'));const _0x247c7d=_0x2f3d04(0x53a)[_0x2f3d04(0x722)](_0x5b9dab,_0x2e65c3);VisuMZ[_0x2f3d04(0x370)]['RegExp'][_0x5ead43+'JS'][_0x2f3d04(0x750)](new RegExp(_0x247c7d,'i'));}else _0x14f363-=_0x1473bb[_0x2f3d04(0x468)][_0x2f3d04(0x172)]();}}else this[_0x2f3d04(0x7ef)][_0x2f3d04(0x67c)](_0x2e8f07[_0x2f3d04(0x579)][_0x2f3d04(0x181)]);}}},Scene_Boot[_0x140e58(0x468)][_0x140e58(0x204)]=function(){const _0x641f4c=_0x140e58;if(VisuMZ[_0x641f4c(0x44f)])return;},Scene_Boot[_0x140e58(0x468)][_0x140e58(0x257)]=function(){const _0x2a0a9f=_0x140e58;VisuMZ[_0x2a0a9f(0x370)][_0x2a0a9f(0x452)][_0x2a0a9f(0x1f0)][_0x2a0a9f(0x56e)]&&(_0x2a0a9f(0x3a9)!==_0x2a0a9f(0x3a9)?_0x297118['prototype']['createBackground'][_0x2a0a9f(0x129)](this):VisuMZ[_0x2a0a9f(0x144)](!![]));if(VisuMZ[_0x2a0a9f(0x370)][_0x2a0a9f(0x452)][_0x2a0a9f(0x1f0)][_0x2a0a9f(0x2e1)]){if(_0x2a0a9f(0x5cb)!=='EUXoF')return 0x1;else Input[_0x2a0a9f(0x465)][0x23]='end',Input['keyMapper'][0x24]=_0x2a0a9f(0x527);}if(VisuMZ[_0x2a0a9f(0x370)]['Settings'][_0x2a0a9f(0x227)]){const _0x119600=VisuMZ[_0x2a0a9f(0x370)][_0x2a0a9f(0x452)]['ButtonAssist'];_0x119600[_0x2a0a9f(0x1e1)]=_0x119600[_0x2a0a9f(0x1e1)]||_0x2a0a9f(0x1d8),_0x119600[_0x2a0a9f(0x6d6)]=_0x119600[_0x2a0a9f(0x6d6)]||_0x2a0a9f(0x322);}if(VisuMZ[_0x2a0a9f(0x370)]['Settings'][_0x2a0a9f(0x7d5)][_0x2a0a9f(0x83f)]){if(_0x2a0a9f(0x28f)===_0x2a0a9f(0x28f))Input[_0x2a0a9f(0x465)][0x57]='up',Input['keyMapper'][0x41]=_0x2a0a9f(0x332),Input[_0x2a0a9f(0x465)][0x53]=_0x2a0a9f(0x3ce),Input[_0x2a0a9f(0x465)][0x44]=_0x2a0a9f(0x1c0),Input['keyMapper'][0x45]=_0x2a0a9f(0x627);else return _0x5ad09d[_0x2a0a9f(0x370)][_0x2a0a9f(0x452)][_0x2a0a9f(0x227)]['Location'];}VisuMZ[_0x2a0a9f(0x370)]['Settings'][_0x2a0a9f(0x7d5)][_0x2a0a9f(0x705)]&&(Input[_0x2a0a9f(0x465)][0x52]=_0x2a0a9f(0x378));},Scene_Boot['prototype'][_0x140e58(0x6e5)]=function(){const _0x250aea=_0x140e58;this[_0x250aea(0x2fa)]();},Scene_Boot[_0x140e58(0x468)][_0x140e58(0x2fa)]=function(){const _0x545ff4=_0x140e58,_0xa7a899=VisuMZ[_0x545ff4(0x370)][_0x545ff4(0x452)]['jsQuickFunc'];for(const _0x26bc27 of _0xa7a899){const _0x831657=_0x26bc27[_0x545ff4(0x8af)][_0x545ff4(0x7a2)](/[ ]/g,''),_0x13d485=_0x26bc27[_0x545ff4(0x88b)];VisuMZ[_0x545ff4(0x370)]['createJsQuickFunction'](_0x831657,_0x13d485);}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x432)]=function(_0x46ed7d,_0x13f777){const _0x5625a2=_0x140e58;if(!!window[_0x46ed7d]){if($gameTemp[_0x5625a2(0x4c1)]())console[_0x5625a2(0x6be)](_0x5625a2(0x89f)[_0x5625a2(0x722)](_0x46ed7d));}const _0x5c9b21=_0x5625a2(0x66b)['format'](_0x46ed7d,_0x13f777);window[_0x46ed7d]=new Function(_0x5c9b21);},Scene_Boot['prototype'][_0x140e58(0x10a)]=function(){const _0x57a179=_0x140e58,_0x1a4224=VisuMZ[_0x57a179(0x370)]['Settings'][_0x57a179(0x6da)];if(!_0x1a4224)return;for(const _0x3e6e7b of _0x1a4224){if(!_0x3e6e7b)continue;VisuMZ['CoreEngine']['createCustomParameter'](_0x3e6e7b);}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x44d)]={},VisuMZ[_0x140e58(0x370)][_0x140e58(0x15a)]={},VisuMZ[_0x140e58(0x370)][_0x140e58(0x70e)]={},VisuMZ['CoreEngine'][_0x140e58(0x214)]={},VisuMZ[_0x140e58(0x370)]['createCustomParameter']=function(_0x133988){const _0x21aba1=_0x140e58,_0x13a11c=_0x133988[_0x21aba1(0x117)],_0x582bbe=_0x133988['ParamName'],_0x58e0c7=_0x133988['Icon'],_0x39eff4=_0x133988[_0x21aba1(0x74c)],_0x49a4a9=new Function(_0x133988[_0x21aba1(0x427)]);VisuMZ[_0x21aba1(0x370)]['CustomParamNames'][_0x13a11c[_0x21aba1(0x5a9)]()[_0x21aba1(0x36f)]()]=_0x582bbe,VisuMZ['CoreEngine'][_0x21aba1(0x15a)][_0x13a11c[_0x21aba1(0x5a9)]()[_0x21aba1(0x36f)]()]=_0x58e0c7,VisuMZ[_0x21aba1(0x370)]['CustomParamType'][_0x13a11c['toUpperCase']()[_0x21aba1(0x36f)]()]=_0x39eff4,VisuMZ[_0x21aba1(0x370)][_0x21aba1(0x214)][_0x13a11c[_0x21aba1(0x5a9)]()[_0x21aba1(0x36f)]()]=_0x13a11c,Object['defineProperty'](Game_BattlerBase[_0x21aba1(0x468)],_0x13a11c,{'get'(){const _0x21d7c9=_0x21aba1,_0x3a34bd=_0x49a4a9[_0x21d7c9(0x129)](this);return _0x39eff4===_0x21d7c9(0x29a)?Math[_0x21d7c9(0x372)](_0x3a34bd):_0x3a34bd;}});},VisuMZ['ParseAllNotetags']=function(){const _0x115656=_0x140e58;for(const _0x3b5909 of $dataActors){if(_0x3b5909)VisuMZ[_0x115656(0x3d0)](_0x3b5909);}for(const _0x41de69 of $dataClasses){if(_0x41de69)VisuMZ[_0x115656(0x24d)](_0x41de69);}for(const _0x324867 of $dataSkills){if(_0x324867)VisuMZ[_0x115656(0x573)](_0x324867);}for(const _0x398305 of $dataItems){if(_0x398305)VisuMZ['ParseItemNotetags'](_0x398305);}for(const _0x499dc5 of $dataWeapons){if('AdoxX'!=='CMDSg'){if(_0x499dc5)VisuMZ['ParseWeaponNotetags'](_0x499dc5);}else this[_0x115656(0x797)]();}for(const _0x52730b of $dataArmors){if(_0x115656(0x8a3)===_0x115656(0x8a3)){if(_0x52730b)VisuMZ['ParseArmorNotetags'](_0x52730b);}else{if(this[_0x115656(0x8a1)][_0x115656(0x3bb)])this[_0x115656(0x8a1)][_0x115656(0x3bb)]['refresh']();if(this[_0x115656(0x8a1)][_0x115656(0x5ab)])this[_0x115656(0x8a1)][_0x115656(0x5ab)]['refresh']();}}for(const _0x4675f4 of $dataEnemies){if(_0x4675f4)VisuMZ[_0x115656(0x6e3)](_0x4675f4);}for(const _0x49fa00 of $dataStates){if(_0x49fa00)VisuMZ[_0x115656(0x22d)](_0x49fa00);}for(const _0x6d8462 of $dataTilesets){if(_0x115656(0x152)!==_0x115656(0x743)){if(_0x6d8462)VisuMZ['ParseTilesetNotetags'](_0x6d8462);}else this[_0x115656(0x1dd)]+=_0x43a42e[_0x115656(0x372)]((_0x199281[_0x115656(0x754)]-0x330)/0x2);}},VisuMZ['ParseActorNotetags']=function(_0x3ef324){},VisuMZ['ParseClassNotetags']=function(_0x31128b){},VisuMZ[_0x140e58(0x573)]=function(_0x49861c){},VisuMZ['ParseItemNotetags']=function(_0x4955e9){},VisuMZ[_0x140e58(0x3d2)]=function(_0x20299b){},VisuMZ['ParseArmorNotetags']=function(_0x18bf67){},VisuMZ[_0x140e58(0x6e3)]=function(_0x4268fc){},VisuMZ['ParseStateNotetags']=function(_0x4559b4){},VisuMZ['ParseTilesetNotetags']=function(_0x31ca5c){},VisuMZ[_0x140e58(0x370)][_0x140e58(0x3d0)]=VisuMZ[_0x140e58(0x3d0)],VisuMZ[_0x140e58(0x3d0)]=function(_0x308e75){const _0x48764d=_0x140e58;VisuMZ[_0x48764d(0x370)][_0x48764d(0x3d0)][_0x48764d(0x129)](this,_0x308e75);const _0x707ec3=_0x308e75[_0x48764d(0x51b)];if(_0x707ec3[_0x48764d(0x461)](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x48764d(0x31d)!=='okyts'){_0x308e75['maxLevel']=Number(RegExp['$1']);if(_0x308e75[_0x48764d(0x6c9)]===0x0)_0x308e75['maxLevel']=Number[_0x48764d(0x1c8)];}else _0x4341db[_0x48764d(0x4c1)]()&&(_0x427395['log']('Conditional\x20Branch\x20Script\x20Error'),_0x439922[_0x48764d(0x6be)](_0x5dd077)),this[_0x48764d(0x7bd)]();}_0x707ec3[_0x48764d(0x461)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x308e75['initialLevel']=Math[_0x48764d(0x6a4)](Number(RegExp['$1']),_0x308e75[_0x48764d(0x6c9)]));},VisuMZ[_0x140e58(0x370)]['ParseClassNotetags']=VisuMZ[_0x140e58(0x24d)],VisuMZ['ParseClassNotetags']=function(_0xab0b55){const _0x317d76=_0x140e58;VisuMZ[_0x317d76(0x370)][_0x317d76(0x24d)][_0x317d76(0x129)](this,_0xab0b55);if(_0xab0b55[_0x317d76(0x333)])for(const _0x18eec6 of _0xab0b55['learnings']){if(_0x317d76(0x5da)!==_0x317d76(0x5da)){var _0x56d55d=_0x3c55d1(_0xbe3f99['$1']);try{_0x229b65+=_0x15850a(_0x56d55d);}catch(_0x150188){if(_0x2ce7e6[_0x317d76(0x4c1)]())_0x5e7201[_0x317d76(0x6be)](_0x150188);}}else{if(_0x18eec6[_0x317d76(0x51b)][_0x317d76(0x461)](/<LEARN AT LEVEL:[ ](\d+)>/i)){if('lxNBF'===_0x317d76(0x40f))return _0x4345b4[_0x317d76(0x579)][_0x317d76(0x5a8)][_0x317d76(0x129)](this);else _0x18eec6[_0x317d76(0x35c)]=Math['max'](Number(RegExp['$1']),0x1);}}}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x6e3)]=VisuMZ[_0x140e58(0x6e3)],VisuMZ[_0x140e58(0x6e3)]=function(_0x116e4b){const _0x371b42=_0x140e58;VisuMZ['CoreEngine'][_0x371b42(0x6e3)]['call'](this,_0x116e4b),_0x116e4b['level']=0x1;const _0x2bfc1a=_0x116e4b['note'];if(_0x2bfc1a['match'](/<LEVEL:[ ](\d+)>/i))_0x116e4b[_0x371b42(0x35c)]=Number(RegExp['$1']);if(_0x2bfc1a[_0x371b42(0x461)](/<MAXHP:[ ](\d+)>/i))_0x116e4b['params'][0x0]=Number(RegExp['$1']);if(_0x2bfc1a[_0x371b42(0x461)](/<MAXMP:[ ](\d+)>/i))_0x116e4b[_0x371b42(0x15d)][0x1]=Number(RegExp['$1']);if(_0x2bfc1a[_0x371b42(0x461)](/<ATK:[ ](\d+)>/i))_0x116e4b['params'][0x2]=Number(RegExp['$1']);if(_0x2bfc1a[_0x371b42(0x461)](/<DEF:[ ](\d+)>/i))_0x116e4b[_0x371b42(0x15d)][0x3]=Number(RegExp['$1']);if(_0x2bfc1a[_0x371b42(0x461)](/<MAT:[ ](\d+)>/i))_0x116e4b[_0x371b42(0x15d)][0x4]=Number(RegExp['$1']);if(_0x2bfc1a['match'](/<MDF:[ ](\d+)>/i))_0x116e4b['params'][0x5]=Number(RegExp['$1']);if(_0x2bfc1a[_0x371b42(0x461)](/<AGI:[ ](\d+)>/i))_0x116e4b[_0x371b42(0x15d)][0x6]=Number(RegExp['$1']);if(_0x2bfc1a[_0x371b42(0x461)](/<LUK:[ ](\d+)>/i))_0x116e4b[_0x371b42(0x15d)][0x7]=Number(RegExp['$1']);if(_0x2bfc1a[_0x371b42(0x461)](/<EXP:[ ](\d+)>/i))_0x116e4b[_0x371b42(0x721)]=Number(RegExp['$1']);if(_0x2bfc1a['match'](/<GOLD:[ ](\d+)>/i))_0x116e4b['gold']=Number(RegExp['$1']);},VisuMZ['CoreEngine']['Graphics_defaultStretchMode']=Graphics[_0x140e58(0x11a)],Graphics[_0x140e58(0x11a)]=function(){const _0x599470=_0x140e58;switch(VisuMZ[_0x599470(0x370)]['Settings'][_0x599470(0x1f0)]['AutoStretch']){case _0x599470(0x395):return!![];case _0x599470(0x838):return![];default:return VisuMZ[_0x599470(0x370)]['Graphics_defaultStretchMode']['call'](this);}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x5d2)]=Graphics['printError'],Graphics['printError']=function(_0x28f839,_0x34b909,_0x1fbd99=null){const _0x36ec01=_0x140e58;VisuMZ[_0x36ec01(0x370)][_0x36ec01(0x5d2)]['call'](this,_0x28f839,_0x34b909,_0x1fbd99),VisuMZ[_0x36ec01(0x144)](![]);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x1bc)]=Graphics['_centerElement'],Graphics[_0x140e58(0x820)]=function(_0x46bd54){const _0x221573=_0x140e58;VisuMZ['CoreEngine']['Graphics_centerElement']['call'](this,_0x46bd54),this[_0x221573(0x70c)](_0x46bd54);},Graphics['_centerElementCoreEngine']=function(_0x1edd86){const _0x5e38cc=_0x140e58;VisuMZ['CoreEngine']['Settings'][_0x5e38cc(0x1f0)][_0x5e38cc(0x403)]&&('NTmBS'===_0x5e38cc(0x464)?_0x1edd86[_0x5e38cc(0x6c0)][_0x5e38cc(0x880)]=_0x5e38cc(0x1b3):_0x10be6c['isTriggered'](_0x5e38cc(0x378))&&(_0x4f78d0[_0x5e38cc(0x331)]=!_0x55c03[_0x5e38cc(0x331)],_0x43e213['save']()));VisuMZ[_0x5e38cc(0x370)][_0x5e38cc(0x452)]['QoL'][_0x5e38cc(0x548)]&&(_0x5e38cc(0x1d7)===_0x5e38cc(0x1d7)?_0x1edd86['style'][_0x5e38cc(0x3fc)]=_0x5e38cc(0x520):_0x510419['CoreEngine']['Sprite_Actor_setActorHome'][_0x5e38cc(0x129)](this,_0x59388c));const _0x802b2d=Math['max'](0x0,Math[_0x5e38cc(0x184)](_0x1edd86[_0x5e38cc(0x3b1)]*this[_0x5e38cc(0x868)])),_0x174015=Math[_0x5e38cc(0x1d1)](0x0,Math[_0x5e38cc(0x184)](_0x1edd86[_0x5e38cc(0x757)]*this[_0x5e38cc(0x868)]));_0x1edd86[_0x5e38cc(0x6c0)]['width']=_0x802b2d+'px',_0x1edd86[_0x5e38cc(0x6c0)][_0x5e38cc(0x757)]=_0x174015+'px';},VisuMZ['CoreEngine'][_0x140e58(0x2d4)]=Bitmap['prototype'][_0x140e58(0x2cd)],Bitmap['prototype']['initialize']=function(_0x1f1f51,_0x42b869){const _0x9fde3c=_0x140e58;VisuMZ[_0x9fde3c(0x370)]['Bitmap_initialize']['call'](this,_0x1f1f51,_0x42b869),this[_0x9fde3c(0x1ca)]=!(VisuMZ[_0x9fde3c(0x370)][_0x9fde3c(0x452)][_0x9fde3c(0x1f0)][_0x9fde3c(0x548)]??!![]);},Bitmap[_0x140e58(0x468)][_0x140e58(0x4df)]=function(){const _0xeb442=_0x140e58;this[_0xeb442(0x587)]=!![];},VisuMZ[_0x140e58(0x370)][_0x140e58(0x57a)]=Sprite[_0x140e58(0x468)][_0x140e58(0x734)],Sprite[_0x140e58(0x468)][_0x140e58(0x734)]=function(){const _0x5eeef3=_0x140e58;VisuMZ[_0x5eeef3(0x370)][_0x5eeef3(0x57a)][_0x5eeef3(0x129)](this),this[_0x5eeef3(0x119)]();},Sprite[_0x140e58(0x468)][_0x140e58(0x119)]=function(){const _0x54e7cd=_0x140e58;if(!this[_0x54e7cd(0x78a)])return;if(!this[_0x54e7cd(0x78a)][_0x54e7cd(0x587)])return;this[_0x54e7cd(0x78a)]['_baseTexture']&&!this[_0x54e7cd(0x297)][_0x54e7cd(0x23b)][_0x54e7cd(0x52f)]&&this['bitmap'][_0x54e7cd(0x734)]();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x327)]=Bitmap[_0x140e58(0x468)][_0x140e58(0x708)],Bitmap['prototype'][_0x140e58(0x708)]=function(_0x37dd7c,_0x37f02a){const _0x1718fc=_0x140e58;VisuMZ['CoreEngine'][_0x1718fc(0x327)]['call'](this,_0x37dd7c,_0x37f02a),this['markCoreEngineModified']();},VisuMZ[_0x140e58(0x370)]['Bitmap_blt']=Bitmap[_0x140e58(0x468)]['blt'],Bitmap[_0x140e58(0x468)][_0x140e58(0x2f5)]=function(_0x3a56ad,_0x1f9c80,_0x3e6954,_0x42f7f1,_0x17343a,_0x124e4a,_0x4b7b53,_0x1d5d2f,_0x811f9d){const _0x40a329=_0x140e58;_0x1f9c80=Math[_0x40a329(0x372)](_0x1f9c80),_0x3e6954=Math['round'](_0x3e6954),_0x42f7f1=Math['round'](_0x42f7f1),_0x17343a=Math[_0x40a329(0x372)](_0x17343a),_0x124e4a=Math['round'](_0x124e4a),_0x4b7b53=Math[_0x40a329(0x372)](_0x4b7b53),VisuMZ[_0x40a329(0x370)]['Bitmap_blt'][_0x40a329(0x129)](this,_0x3a56ad,_0x1f9c80,_0x3e6954,_0x42f7f1,_0x17343a,_0x124e4a,_0x4b7b53,_0x1d5d2f,_0x811f9d),this['markCoreEngineModified']();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x141)]=Bitmap[_0x140e58(0x468)][_0x140e58(0x775)],Bitmap['prototype'][_0x140e58(0x775)]=function(_0x254a34,_0x25c9a0,_0x5e4173,_0x53fad9){const _0xb8d17e=_0x140e58;VisuMZ[_0xb8d17e(0x370)][_0xb8d17e(0x141)][_0xb8d17e(0x129)](this,_0x254a34,_0x25c9a0,_0x5e4173,_0x53fad9),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x140e58(0x5d5)]=Bitmap[_0x140e58(0x468)][_0x140e58(0x4a9)],Bitmap[_0x140e58(0x468)][_0x140e58(0x4a9)]=function(_0x4dd1f2,_0x36d6f3,_0x44b264,_0x4cd2ee,_0x474b6b){const _0x31fa19=_0x140e58;VisuMZ[_0x31fa19(0x370)][_0x31fa19(0x5d5)][_0x31fa19(0x129)](this,_0x4dd1f2,_0x36d6f3,_0x44b264,_0x4cd2ee,_0x474b6b),this[_0x31fa19(0x4df)]();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x7c6)]=Bitmap[_0x140e58(0x468)][_0x140e58(0x727)],Bitmap[_0x140e58(0x468)][_0x140e58(0x727)]=function(_0x21f422,_0x2d9ff4,_0x117da0,_0x3ef643,_0x4f44d2){const _0x53aa0b=_0x140e58;VisuMZ[_0x53aa0b(0x370)][_0x53aa0b(0x7c6)]['call'](this,_0x21f422,_0x2d9ff4,_0x117da0,_0x3ef643,_0x4f44d2),this[_0x53aa0b(0x4df)]();},VisuMZ[_0x140e58(0x370)][_0x140e58(0xe7)]=Bitmap[_0x140e58(0x468)]['gradientFillRect'],Bitmap[_0x140e58(0x468)][_0x140e58(0x7ce)]=function(_0x1323a5,_0x4d30fe,_0x2cbbfb,_0x4cf4b5,_0xd88d6d,_0x101a3c,_0x4e7d50){const _0x244a67=_0x140e58;VisuMZ[_0x244a67(0x370)][_0x244a67(0xe7)]['call'](this,_0x1323a5,_0x4d30fe,_0x2cbbfb,_0x4cf4b5,_0xd88d6d,_0x101a3c,_0x4e7d50),this[_0x244a67(0x4df)]();},VisuMZ['CoreEngine']['Bitmap_drawCircle']=Bitmap[_0x140e58(0x468)][_0x140e58(0x758)],Bitmap[_0x140e58(0x468)][_0x140e58(0x758)]=function(_0x341887,_0x2c0935,_0x49d958,_0x2d6265){const _0x11bf1d=_0x140e58;_0x341887=Math[_0x11bf1d(0x372)](_0x341887),_0x2c0935=Math[_0x11bf1d(0x372)](_0x2c0935),_0x49d958=Math[_0x11bf1d(0x372)](_0x49d958),VisuMZ['CoreEngine'][_0x11bf1d(0x137)][_0x11bf1d(0x129)](this,_0x341887,_0x2c0935,_0x49d958,_0x2d6265),this[_0x11bf1d(0x4df)]();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x5f3)]=Bitmap[_0x140e58(0x468)][_0x140e58(0x145)],Bitmap[_0x140e58(0x468)]['measureTextWidth']=function(_0x1a136a){const _0x591824=_0x140e58;return Math[_0x591824(0x372)](VisuMZ[_0x591824(0x370)][_0x591824(0x5f3)]['call'](this,_0x1a136a));},VisuMZ[_0x140e58(0x370)][_0x140e58(0x559)]=Bitmap[_0x140e58(0x468)][_0x140e58(0xd0)],Bitmap[_0x140e58(0x468)]['drawText']=function(_0x103b89,_0x3a1a57,_0x2f91ac,_0x478afd,_0x416247,_0x53082a){const _0x10856f=_0x140e58;_0x3a1a57=Math[_0x10856f(0x372)](_0x3a1a57),_0x2f91ac=Math[_0x10856f(0x372)](_0x2f91ac),_0x478afd=Math['round'](_0x478afd),_0x416247=Math['round'](_0x416247),VisuMZ[_0x10856f(0x370)]['Bitmap_drawText'][_0x10856f(0x129)](this,_0x103b89,_0x3a1a57,_0x2f91ac,_0x478afd,_0x416247,_0x53082a),this[_0x10856f(0x4df)]();},VisuMZ['CoreEngine'][_0x140e58(0x85d)]=Bitmap[_0x140e58(0x468)]['_drawTextOutline'],Bitmap['prototype'][_0x140e58(0x3d4)]=function(_0x398281,_0x26b0f5,_0x541722,_0x1d2ffb){const _0x3f777b=_0x140e58;VisuMZ['CoreEngine'][_0x3f777b(0x452)]['QoL'][_0x3f777b(0x4b8)]?this[_0x3f777b(0x133)](_0x398281,_0x26b0f5,_0x541722,_0x1d2ffb):VisuMZ[_0x3f777b(0x370)][_0x3f777b(0x85d)][_0x3f777b(0x129)](this,_0x398281,_0x26b0f5,_0x541722,_0x1d2ffb);},Bitmap[_0x140e58(0x468)][_0x140e58(0x133)]=function(_0x2bc0b8,_0x555840,_0x219f69,_0x2cd499){const _0x2634b9=_0x140e58,_0x27891a=this[_0x2634b9(0x86a)];_0x27891a[_0x2634b9(0x476)]=this[_0x2634b9(0x127)],_0x27891a[_0x2634b9(0x5c6)](_0x2bc0b8,_0x555840+0x2,_0x219f69+0x2,_0x2cd499);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x842)]=Input['clear'],Input[_0x140e58(0x827)]=function(){const _0x43a614=_0x140e58;VisuMZ['CoreEngine'][_0x43a614(0x842)]['call'](this),this[_0x43a614(0x409)]=undefined,this[_0x43a614(0x4dc)]=undefined,this[_0x43a614(0x739)]=Input[_0x43a614(0x73a)];},VisuMZ[_0x140e58(0x370)][_0x140e58(0x3ab)]=Input['update'],Input['update']=function(){const _0x302263=_0x140e58;VisuMZ[_0x302263(0x370)][_0x302263(0x3ab)][_0x302263(0x129)](this);if(this['_gamepadWait'])this['_gamepadWait']--;},VisuMZ[_0x140e58(0x370)]['Input_pollGamepads']=Input['_pollGamepads'],Input['_pollGamepads']=function(){const _0x3a00d3=_0x140e58;if(this[_0x3a00d3(0x739)])return;VisuMZ[_0x3a00d3(0x370)][_0x3a00d3(0x326)][_0x3a00d3(0x129)](this);},VisuMZ[_0x140e58(0x370)][_0x140e58(0xfb)]=Input[_0x140e58(0x7e7)],Input[_0x140e58(0x7e7)]=function(){const _0x264a54=_0x140e58;VisuMZ[_0x264a54(0x370)]['Input_setupEventHandlers'][_0x264a54(0x129)](this),document[_0x264a54(0x25a)](_0x264a54(0x881),this['_onKeyPress'][_0x264a54(0xfe)](this));},VisuMZ[_0x140e58(0x370)][_0x140e58(0x850)]=Input['_onKeyDown'],Input['_onKeyDown']=function(_0x24ec8d){const _0x49c0cf=_0x140e58;this[_0x49c0cf(0x4dc)]=_0x24ec8d[_0x49c0cf(0xf4)],VisuMZ[_0x49c0cf(0x370)][_0x49c0cf(0x850)]['call'](this,_0x24ec8d);},Input[_0x140e58(0x115)]=function(_0x45973d){const _0x17767d=_0x140e58;this[_0x17767d(0x25c)](_0x45973d);},Input['_registerKeyInput']=function(_0x4912fd){const _0x6b8da8=_0x140e58;this['_inputSpecialKeyCode']=_0x4912fd[_0x6b8da8(0xf4)];let _0x3b0190=String[_0x6b8da8(0x124)](_0x4912fd[_0x6b8da8(0x1cc)]);if(this[_0x6b8da8(0x409)]===undefined)this[_0x6b8da8(0x409)]=_0x3b0190;else{if('xgtCP'===_0x6b8da8(0x748)){if(!this['needsUpdate']())return;this['refresh']();}else this[_0x6b8da8(0x409)]+=_0x3b0190;}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x286)]=Input[_0x140e58(0x3b7)],Input[_0x140e58(0x3b7)]=function(_0x580fbe){const _0x365b5d=_0x140e58;if(_0x580fbe===0x8)return![];return VisuMZ[_0x365b5d(0x370)][_0x365b5d(0x286)]['call'](this,_0x580fbe);},Input[_0x140e58(0x5ae)]=function(_0x4ef91c){const _0x2066bc=_0x140e58;if(_0x4ef91c[_0x2066bc(0x461)](/backspace/i))return this[_0x2066bc(0x4dc)]===0x8;if(_0x4ef91c['match'](/enter/i))return this[_0x2066bc(0x4dc)]===0xd;if(_0x4ef91c[_0x2066bc(0x461)](/escape/i))return this[_0x2066bc(0x4dc)]===0x1b;},Input[_0x140e58(0x1cb)]=function(){const _0x1bb628=_0x140e58;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x1bb628(0x624)](this['_inputSpecialKeyCode']);},Input[_0x140e58(0x5b5)]=function(){const _0xe084c2=_0x140e58;return[0x25,0x26,0x27,0x28][_0xe084c2(0x624)](this[_0xe084c2(0x4dc)]);},Input['isGamepadConnected']=function(){const _0x48415d=_0x140e58;if(navigator[_0x48415d(0x643)]){const _0x19b1c0=navigator[_0x48415d(0x643)]();if(_0x19b1c0){if(_0x48415d(0x185)===_0x48415d(0x301))this[_0x48415d(0x876)]=_0x6fd5fe;else for(const _0x2e782f of _0x19b1c0){if(_0x48415d(0x52a)!==_0x48415d(0x52a))return _0x172c51[_0x48415d(0x370)][_0x48415d(0x452)]['Color'][_0x48415d(0x835)];else{if(_0x2e782f&&_0x2e782f[_0x48415d(0x49e)])return!![];}}}}return![];},Input[_0x140e58(0xdc)]=function(){const _0x495fa5=_0x140e58;if(navigator[_0x495fa5(0x643)]){const _0x39ae41=navigator['getGamepads']();if(_0x39ae41)for(const _0x4f80a0 of _0x39ae41){if(_0x4f80a0&&_0x4f80a0[_0x495fa5(0x49e)]){if(this[_0x495fa5(0x296)](_0x4f80a0))return!![];}}}return![];},Input[_0x140e58(0x296)]=function(_0x18802d){const _0x43bd2a=_0x140e58,_0x4d1147=_0x18802d[_0x43bd2a(0x511)];for(let _0x4e21cf=0x0;_0x4e21cf<_0x4d1147[_0x43bd2a(0x4d7)];_0x4e21cf++){if(_0x43bd2a(0x798)!==_0x43bd2a(0x677)){if(_0x4d1147[_0x4e21cf][_0x43bd2a(0x5a0)])return!![];}else{_0x45737b=_0x132a7c(_0x1e5819)[_0x43bd2a(0x5a9)]();const _0x23b37b=_0x402bd8['CoreEngine'][_0x43bd2a(0x452)][_0x43bd2a(0x3d3)];if(_0x4f2198===_0x43bd2a(0x6ef))return _0x23b37b[_0x43bd2a(0x75c)];if(_0x580570===_0x43bd2a(0x412))return _0x23b37b[_0x43bd2a(0x5ca)];if(_0x8a834f===_0x43bd2a(0x865))return _0x23b37b[_0x43bd2a(0x292)];if(_0x4608ec===_0x43bd2a(0x48e))return _0x23b37b['IconParam3'];if(_0x5f49bf===_0x43bd2a(0x417))return _0x23b37b['IconParam4'];if(_0xdd4c0a===_0x43bd2a(0x566))return _0x23b37b['IconParam5'];if(_0x2bf9bf===_0x43bd2a(0x3b2))return _0x23b37b[_0x43bd2a(0x783)];if(_0x326e03===_0x43bd2a(0x426))return _0x23b37b[_0x43bd2a(0x7db)];if(_0x81c3cd===_0x43bd2a(0x40a))return _0x23b37b[_0x43bd2a(0x510)];if(_0x44cce8==='EVA')return _0x23b37b[_0x43bd2a(0x62d)];if(_0x2dd91b===_0x43bd2a(0x3d9))return _0x23b37b['IconXParam2'];if(_0xebb4f1===_0x43bd2a(0x3fb))return _0x23b37b['IconXParam3'];if(_0x56e875===_0x43bd2a(0x2c4))return _0x23b37b[_0x43bd2a(0xd5)];if(_0x3a53c4===_0x43bd2a(0x324))return _0x23b37b[_0x43bd2a(0xf1)];if(_0x4aa82e===_0x43bd2a(0x81e))return _0x23b37b['IconXParam6'];if(_0x32aeee===_0x43bd2a(0x644))return _0x23b37b[_0x43bd2a(0xf6)];if(_0x2b1909==='MRG')return _0x23b37b[_0x43bd2a(0x3c9)];if(_0x49545e==='TRG')return _0x23b37b['IconXParam9'];if(_0x5325ae===_0x43bd2a(0x88a))return _0x23b37b['IconSParam0'];if(_0x3ea701===_0x43bd2a(0x8a0))return _0x23b37b[_0x43bd2a(0x859)];if(_0x22c5d8===_0x43bd2a(0x718))return _0x23b37b[_0x43bd2a(0x4cd)];if(_0x3fbd0==='PHA')return _0x23b37b[_0x43bd2a(0x4ab)];if(_0x543fb5===_0x43bd2a(0x2ae))return _0x23b37b['IconSParam4'];if(_0x1145ce==='TCR')return _0x23b37b[_0x43bd2a(0x1c7)];if(_0x582072===_0x43bd2a(0x2b5))return _0x23b37b[_0x43bd2a(0x387)];if(_0x2ddc86==='MDR')return _0x23b37b[_0x43bd2a(0x338)];if(_0x2f17e7==='FDR')return _0x23b37b[_0x43bd2a(0x18c)];if(_0x5295ac==='EXR')return _0x23b37b[_0x43bd2a(0x4a4)];if(_0x710f5c[_0x43bd2a(0x370)][_0x43bd2a(0x15a)][_0x64c143])return _0x441f5d['CoreEngine'][_0x43bd2a(0x15a)][_0x427a8e]||0x0;return 0x0;}}return![];},VisuMZ['CoreEngine'][_0x140e58(0x138)]=Tilemap[_0x140e58(0x468)]['_addShadow'],Tilemap[_0x140e58(0x468)][_0x140e58(0x2a7)]=function(_0xfe5342,_0x1078af,_0x1c3e5f,_0x38c6fa){const _0x21c56b=_0x140e58;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ[_0x21c56b(0x370)][_0x21c56b(0x138)]['call'](this,_0xfe5342,_0x1078af,_0x1c3e5f,_0x38c6fa);},Tilemap[_0x140e58(0x725)][_0x140e58(0x468)][_0x140e58(0x362)]=function(){const _0x4e642b=_0x140e58;this['_destroyInternalTextures']();for(let _0x905506=0x0;_0x905506<Tilemap['Layer'][_0x4e642b(0x693)];_0x905506++){if(_0x4e642b(0x48f)!=='pgQcA')_0x10dadb[_0x4e642b(0x370)][_0x4e642b(0x390)][_0x4e642b(0x129)](this),this[_0x4e642b(0x4b3)](this['_maxDigits']-0x1),_0x120d5c[_0x4e642b(0x827)]();else{const _0x10d512=new PIXI[(_0x4e642b(0xc8))]();_0x10d512[_0x4e642b(0x7f0)](0x800,0x800);if(VisuMZ[_0x4e642b(0x370)]['Settings']['QoL'][_0x4e642b(0x548)]){if(_0x4e642b(0x70a)!==_0x4e642b(0x70a)){if(_0x9dd00d)_0x35539e[_0x4e642b(0x699)](_0x3db6fc);}else _0x10d512[_0x4e642b(0x585)]=PIXI[_0x4e642b(0x2ed)]['NEAREST'];}this[_0x4e642b(0x38b)][_0x4e642b(0x750)](_0x10d512);}}},WindowLayer['prototype']['isMaskingEnabled']=function(){const _0x4c93eb=_0x140e58;if(SceneManager&&SceneManager[_0x4c93eb(0x8a1)])return SceneManager[_0x4c93eb(0x8a1)]['isWindowMaskingEnabled']();else{if(_0x4c93eb(0x7ed)!==_0x4c93eb(0x7ed))this[_0x4c93eb(0x5a3)]=0x1;else return!![];}},VisuMZ['CoreEngine']['WindowLayer_render']=WindowLayer[_0x140e58(0x468)][_0x140e58(0xe1)],WindowLayer['prototype'][_0x140e58(0xe1)]=function render(_0x3a69fd){const _0x434286=_0x140e58;this[_0x434286(0x7cf)]()?VisuMZ[_0x434286(0x370)][_0x434286(0x521)][_0x434286(0x129)](this,_0x3a69fd):this[_0x434286(0xcd)](_0x3a69fd);},WindowLayer['prototype'][_0x140e58(0xcd)]=function render(_0x23f4bc){const _0x39464f=_0x140e58;if(!this[_0x39464f(0x111)])return;const _0x20af09=new PIXI['Graphics'](),_0x20e534=_0x23f4bc['gl'],_0x5c5144=this[_0x39464f(0x2c3)]['clone']();_0x23f4bc[_0x39464f(0x626)][_0x39464f(0x87f)](),_0x20af09[_0x39464f(0x82c)]=this['transform'],_0x23f4bc[_0x39464f(0x5c0)][_0x39464f(0x58f)](),_0x20e534['enable'](_0x20e534[_0x39464f(0x5fa)]);while(_0x5c5144[_0x39464f(0x4d7)]>0x0){const _0x129b60=_0x5c5144[_0x39464f(0xd7)]();if(_0x129b60['_isWindow']&&_0x129b60['visible']&&_0x129b60[_0x39464f(0x383)]>0x0){if(_0x39464f(0x5e1)==='WoNqS')return _0x218d3d['layoutSettings'][_0x39464f(0x279)][_0x39464f(0x129)](this);else _0x20e534[_0x39464f(0x11d)](_0x20e534[_0x39464f(0x201)],0x0,~0x0),_0x20e534[_0x39464f(0x31a)](_0x20e534['KEEP'],_0x20e534[_0x39464f(0x4fe)],_0x20e534[_0x39464f(0x4fe)]),_0x129b60[_0x39464f(0xe1)](_0x23f4bc),_0x23f4bc[_0x39464f(0x5c0)]['flush'](),_0x20af09[_0x39464f(0x827)](),_0x20e534[_0x39464f(0x11d)](_0x20e534['ALWAYS'],0x1,~0x0),_0x20e534['stencilOp'](_0x20e534[_0x39464f(0x314)],_0x20e534[_0x39464f(0x314)],_0x20e534[_0x39464f(0x314)]),_0x20e534[_0x39464f(0x10f)](_0x20e534[_0x39464f(0x250)],_0x20e534['ONE']),_0x20af09[_0x39464f(0xe1)](_0x23f4bc),_0x23f4bc[_0x39464f(0x5c0)][_0x39464f(0x58f)](),_0x20e534[_0x39464f(0x10f)](_0x20e534[_0x39464f(0x586)],_0x20e534['ONE_MINUS_SRC_ALPHA']);}}_0x20e534[_0x39464f(0x604)](_0x20e534[_0x39464f(0x5fa)]),_0x20e534[_0x39464f(0x827)](_0x20e534[_0x39464f(0x5bb)]),_0x20e534[_0x39464f(0x57d)](0x0),_0x23f4bc[_0x39464f(0x5c0)][_0x39464f(0x58f)]();for(const _0x1eb1a1 of this[_0x39464f(0x2c3)]){!_0x1eb1a1[_0x39464f(0x379)]&&_0x1eb1a1[_0x39464f(0x111)]&&(_0x39464f(0x4d2)!=='UMqiC'?this[_0x39464f(0x27a)]():_0x1eb1a1[_0x39464f(0xe1)](_0x23f4bc));}_0x23f4bc[_0x39464f(0x5c0)]['flush']();},DataManager[_0x140e58(0x6dd)]=function(_0x54d296){const _0x1e7fc9=_0x140e58;return this[_0x1e7fc9(0x245)](_0x54d296)&&_0x54d296[_0x1e7fc9(0x619)]===0x2;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x4a2)]=DataManager[_0x140e58(0x424)],DataManager[_0x140e58(0x424)]=function(){const _0x46b070=_0x140e58;VisuMZ[_0x46b070(0x370)]['DataManager_setupNewGame'][_0x46b070(0x129)](this),this['reservePlayTestNewGameCommonEvent'](),this['reserveNewGameCommonEvent']();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x3e4021=_0x140e58;if($gameTemp[_0x3e4021(0x4c1)]()){const _0x8e2f6c=VisuMZ['CoreEngine'][_0x3e4021(0x452)][_0x3e4021(0x1f0)][_0x3e4021(0x56a)];if(_0x8e2f6c>0x0)$gameTemp['reserveCommonEvent'](_0x8e2f6c);}},DataManager[_0x140e58(0xdd)]=function(){const _0x3c0777=_0x140e58,_0x57c91a=VisuMZ['CoreEngine'][_0x3c0777(0x452)][_0x3c0777(0x1f0)][_0x3c0777(0x399)]||0x0;if(_0x57c91a>0x0)$gameTemp['reserveCommonEvent'](_0x57c91a);},DataManager[_0x140e58(0x269)]=function(_0xae32c6){const _0x3c701e=_0x140e58,_0x415857=$dataTroops[_0xae32c6];if(!_0x415857)return'';let _0x538199='';_0x538199+=_0x415857['name'];for(const _0xd8191a of _0x415857[_0x3c701e(0x262)]){for(const _0x12ba1c of _0xd8191a['list']){[0x6c,0x198]['includes'](_0x12ba1c[_0x3c701e(0x413)])&&(_0x3c701e(0x216)!==_0x3c701e(0x216)?this['contents'][_0x3c701e(0x1b8)]-=0x6:(_0x538199+='\x0a',_0x538199+=_0x12ba1c[_0x3c701e(0x78c)][0x0]));}}return _0x538199;},TextManager[_0x140e58(0x38f)]=['','','',_0x140e58(0x8a6),'','',_0x140e58(0x791),'',_0x140e58(0x4d9),'TAB','','',_0x140e58(0xeb),_0x140e58(0x676),'ENTER_SPECIAL','',_0x140e58(0x2ef),_0x140e58(0x56f),_0x140e58(0x4e0),_0x140e58(0x74e),_0x140e58(0x483),_0x140e58(0x2ee),_0x140e58(0x68d),_0x140e58(0x283),_0x140e58(0x41c),_0x140e58(0x6eb),'',_0x140e58(0xcc),_0x140e58(0x7cd),_0x140e58(0x4ca),'ACCEPT',_0x140e58(0x187),_0x140e58(0x571),_0x140e58(0x1e7),'PGDN',_0x140e58(0x1d3),_0x140e58(0x58e),_0x140e58(0xee),'UP',_0x140e58(0x730),_0x140e58(0x82d),_0x140e58(0x657),_0x140e58(0x40e),'EXECUTE',_0x140e58(0x4e4),_0x140e58(0x7fe),_0x140e58(0x359),'','0','1','2','3','4','5','6','7','8','9',_0x140e58(0x5e8),_0x140e58(0x2a0),'LESS_THAN','EQUALS',_0x140e58(0x494),_0x140e58(0x304),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x140e58(0x71d),'',_0x140e58(0x6cf),'',_0x140e58(0x8a5),_0x140e58(0x3e0),_0x140e58(0x3e3),_0x140e58(0x8b5),_0x140e58(0x5a7),_0x140e58(0x274),_0x140e58(0x5b6),_0x140e58(0x49b),_0x140e58(0x4b2),_0x140e58(0xdb),_0x140e58(0x6c6),_0x140e58(0x821),_0x140e58(0x202),_0x140e58(0x444),_0x140e58(0x2da),_0x140e58(0x536),_0x140e58(0x12a),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x140e58(0x4f7),'F11',_0x140e58(0x83c),'F13',_0x140e58(0x491),'F15',_0x140e58(0x482),'F17',_0x140e58(0x4e5),_0x140e58(0x5bd),'F20',_0x140e58(0xe4),_0x140e58(0x7fa),_0x140e58(0x2d6),'F24','','','','','','','','',_0x140e58(0x1a2),_0x140e58(0x27c),'WIN_OEM_FJ_JISHO','WIN_OEM_FJ_MASSHOU','WIN_OEM_FJ_TOUROKU','WIN_OEM_FJ_LOYA',_0x140e58(0x4a3),'','','','','','','','','',_0x140e58(0x1b9),_0x140e58(0x40d),'DOUBLE_QUOTE',_0x140e58(0x78e),'DOLLAR',_0x140e58(0x1e8),'AMPERSAND',_0x140e58(0x744),_0x140e58(0x88d),_0x140e58(0x69f),_0x140e58(0x53e),'PLUS',_0x140e58(0x80d),_0x140e58(0x131),_0x140e58(0x32a),_0x140e58(0x555),_0x140e58(0x18a),'','','','',_0x140e58(0x4dd),_0x140e58(0x276),_0x140e58(0x368),'','',_0x140e58(0x2a0),_0x140e58(0x3dd),_0x140e58(0x4f9),_0x140e58(0x1a6),'PERIOD',_0x140e58(0x792),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x140e58(0x54d),'BACK_SLASH',_0x140e58(0x817),_0x140e58(0x899),'','META',_0x140e58(0x7ec),'','WIN_ICO_HELP','WIN_ICO_00','',_0x140e58(0x5ad),'','','WIN_OEM_RESET','WIN_OEM_JUMP',_0x140e58(0x823),_0x140e58(0x34f),'WIN_OEM_PA3','WIN_OEM_WSCTRL',_0x140e58(0x78b),'WIN_OEM_ATTN',_0x140e58(0xc7),'WIN_OEM_COPY',_0x140e58(0x7d4),_0x140e58(0x605),'WIN_OEM_BACKTAB','ATTN',_0x140e58(0x42c),_0x140e58(0x530),'EREOF','PLAY',_0x140e58(0x4e3),'','PA1',_0x140e58(0x3a6),''],TextManager['buttonAssistOk']=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)][_0x140e58(0x227)][_0x140e58(0x5b8)],TextManager[_0x140e58(0x3bd)]=VisuMZ[_0x140e58(0x370)]['Settings'][_0x140e58(0x227)][_0x140e58(0x63a)],TextManager[_0x140e58(0x380)]=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)]['ButtonAssist'][_0x140e58(0x7ff)],VisuMZ['CoreEngine'][_0x140e58(0x21f)]=TextManager['param'],TextManager['param']=function(_0x5a71a9){const _0xf7b8e3=_0x140e58;if(typeof _0x5a71a9===_0xf7b8e3(0x610)){if('duvZi'!==_0xf7b8e3(0x6b1))this[_0xf7b8e3(0xfc)][_0xf7b8e3(0x67c)](_0xe8619b[_0xf7b8e3(0x579)][_0xf7b8e3(0x176)]);else return VisuMZ['CoreEngine'][_0xf7b8e3(0x21f)][_0xf7b8e3(0x129)](this,_0x5a71a9);}else return this[_0xf7b8e3(0x12e)](_0x5a71a9);},TextManager[_0x140e58(0x12e)]=function(_0x3e6af3){const _0x2901e8=_0x140e58;_0x3e6af3=String(_0x3e6af3||'')['toUpperCase']();const _0x5a7c67=VisuMZ[_0x2901e8(0x370)][_0x2901e8(0x452)]['Param'];if(_0x3e6af3===_0x2901e8(0x6ef))return $dataSystem[_0x2901e8(0x8aa)][_0x2901e8(0x15d)][0x0];if(_0x3e6af3===_0x2901e8(0x412))return $dataSystem[_0x2901e8(0x8aa)][_0x2901e8(0x15d)][0x1];if(_0x3e6af3===_0x2901e8(0x865))return $dataSystem[_0x2901e8(0x8aa)][_0x2901e8(0x15d)][0x2];if(_0x3e6af3==='DEF')return $dataSystem['terms'][_0x2901e8(0x15d)][0x3];if(_0x3e6af3===_0x2901e8(0x417))return $dataSystem[_0x2901e8(0x8aa)][_0x2901e8(0x15d)][0x4];if(_0x3e6af3===_0x2901e8(0x566))return $dataSystem[_0x2901e8(0x8aa)]['params'][0x5];if(_0x3e6af3===_0x2901e8(0x3b2))return $dataSystem[_0x2901e8(0x8aa)][_0x2901e8(0x15d)][0x6];if(_0x3e6af3==='LUK')return $dataSystem[_0x2901e8(0x8aa)]['params'][0x7];if(_0x3e6af3===_0x2901e8(0x40a))return _0x5a7c67['XParamVocab0'];if(_0x3e6af3===_0x2901e8(0x500))return _0x5a7c67['XParamVocab1'];if(_0x3e6af3===_0x2901e8(0x3d9))return _0x5a7c67[_0x2901e8(0x449)];if(_0x3e6af3===_0x2901e8(0x3fb))return _0x5a7c67[_0x2901e8(0x1cf)];if(_0x3e6af3==='MEV')return _0x5a7c67[_0x2901e8(0x3cc)];if(_0x3e6af3===_0x2901e8(0x324))return _0x5a7c67[_0x2901e8(0x5f0)];if(_0x3e6af3===_0x2901e8(0x81e))return _0x5a7c67[_0x2901e8(0x1be)];if(_0x3e6af3===_0x2901e8(0x644))return _0x5a7c67[_0x2901e8(0x719)];if(_0x3e6af3===_0x2901e8(0x47a))return _0x5a7c67[_0x2901e8(0x33a)];if(_0x3e6af3===_0x2901e8(0x26a))return _0x5a7c67[_0x2901e8(0x3a0)];if(_0x3e6af3===_0x2901e8(0x88a))return _0x5a7c67['SParamVocab0'];if(_0x3e6af3==='GRD')return _0x5a7c67[_0x2901e8(0x455)];if(_0x3e6af3===_0x2901e8(0x718))return _0x5a7c67[_0x2901e8(0x17c)];if(_0x3e6af3===_0x2901e8(0x685))return _0x5a7c67[_0x2901e8(0x832)];if(_0x3e6af3===_0x2901e8(0x2ae))return _0x5a7c67[_0x2901e8(0x4bc)];if(_0x3e6af3===_0x2901e8(0x46c))return _0x5a7c67['SParamVocab5'];if(_0x3e6af3===_0x2901e8(0x2b5))return _0x5a7c67[_0x2901e8(0x522)];if(_0x3e6af3==='MDR')return _0x5a7c67[_0x2901e8(0x33c)];if(_0x3e6af3===_0x2901e8(0x73f))return _0x5a7c67[_0x2901e8(0x213)];if(_0x3e6af3===_0x2901e8(0x460))return _0x5a7c67[_0x2901e8(0x72b)];if(VisuMZ['CoreEngine'][_0x2901e8(0x44d)][_0x3e6af3])return VisuMZ[_0x2901e8(0x370)]['CustomParamNames'][_0x3e6af3];return'';},TextManager[_0x140e58(0x37a)]=function(_0x3030d6){const _0x5cfcf9=_0x140e58;if(_0x3030d6===_0x5cfcf9(0x42b))_0x3030d6='escape';let _0x5a67ef=[];for(let _0x227a01 in Input['keyMapper']){if(_0x5cfcf9(0x2e3)===_0x5cfcf9(0x2e3)){_0x227a01=Number(_0x227a01);if(_0x227a01>=0x60&&_0x227a01<=0x69)continue;if([0x12,0x20]['includes'](_0x227a01))continue;_0x3030d6===Input[_0x5cfcf9(0x465)][_0x227a01]&&_0x5a67ef['push'](_0x227a01);}else return _0x70cb3a['CoreEngine'][_0x5cfcf9(0x452)][_0x5cfcf9(0x7ad)][_0x5cfcf9(0x4f1)];}for(let _0x3e12ec=0x0;_0x3e12ec<_0x5a67ef[_0x5cfcf9(0x4d7)];_0x3e12ec++){'yGpOx'===_0x5cfcf9(0x35f)?_0x5a67ef[_0x3e12ec]=TextManager[_0x5cfcf9(0x38f)][_0x5a67ef[_0x3e12ec]]:(_0x2cc8d3[_0x5cfcf9(0x370)][_0x5cfcf9(0x1fa)][_0x5cfcf9(0x129)](this,_0x53a704,_0x86bf32,_0x455a38,_0x2e456e,_0x259969,_0x45d42f,_0x372af5,_0x2f0a10,_0x19215f),this[_0x5cfcf9(0x648)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1a701c]||{'x':0x0,'y':0x0}));}return this['makeInputButtonString'](_0x5a67ef);},TextManager[_0x140e58(0x612)]=function(_0x476da3){const _0x9133da=_0x140e58,_0x5c4662=VisuMZ[_0x9133da(0x370)][_0x9133da(0x452)]['ButtonAssist'],_0x5201c3=_0x5c4662[_0x9133da(0x104)],_0x138dce=_0x476da3[_0x9133da(0x3cf)](),_0x572712='Key%1'[_0x9133da(0x722)](_0x138dce);return _0x5c4662[_0x572712]?_0x5c4662[_0x572712]:_0x5201c3['format'](_0x138dce);},TextManager[_0x140e58(0x11e)]=function(_0x54ae7f,_0x3a92c6){const _0x8fe558=_0x140e58,_0x240332=VisuMZ[_0x8fe558(0x370)][_0x8fe558(0x452)][_0x8fe558(0x227)],_0x5eb4a9=_0x240332['MultiKeyFmt'],_0x25fe65=this[_0x8fe558(0x37a)](_0x54ae7f),_0x3785a2=this[_0x8fe558(0x37a)](_0x3a92c6);return _0x5eb4a9[_0x8fe558(0x722)](_0x25fe65,_0x3785a2);},VisuMZ[_0x140e58(0x370)]['ColorManager_loadWindowskin']=ColorManager[_0x140e58(0x38a)],ColorManager[_0x140e58(0x38a)]=function(){const _0x1f3429=_0x140e58;VisuMZ[_0x1f3429(0x370)][_0x1f3429(0x350)]['call'](this),this[_0x1f3429(0x64a)]=this[_0x1f3429(0x64a)]||{};},ColorManager[_0x140e58(0x45f)]=function(_0x452fb0,_0x29a343){const _0x1b6d2b=_0x140e58;_0x29a343=String(_0x29a343),this['_colorCache']=this['_colorCache']||{};if(_0x29a343[_0x1b6d2b(0x461)](/#(.*)/i)){if(_0x1b6d2b(0xd3)==='QxrLj')return this[_0x1b6d2b(0x12e)](_0x1234b7);else this[_0x1b6d2b(0x64a)][_0x452fb0]=_0x1b6d2b(0xe0)['format'](String(RegExp['$1']));}else this['_colorCache'][_0x452fb0]=this['textColor'](Number(_0x29a343));return this['_colorCache'][_0x452fb0];},ColorManager[_0x140e58(0x687)]=function(_0x1966ba){const _0x16e55e=_0x140e58;return _0x1966ba=String(_0x1966ba),_0x1966ba[_0x16e55e(0x461)](/#(.*)/i)?_0x16e55e(0xe0)['format'](String(RegExp['$1'])):_0x16e55e(0x2af)===_0x16e55e(0x753)?(this['_cache']=this[_0x16e55e(0x84e)]||{},this[_0x16e55e(0x84e)][_0x275bc9]!==_0x3f717c):this[_0x16e55e(0x419)](Number(_0x1966ba));},ColorManager[_0x140e58(0x42a)]=function(){const _0x1d5b17=_0x140e58;this[_0x1d5b17(0x64a)]={};},ColorManager[_0x140e58(0x4af)]=function(){const _0x3458d7=_0x140e58,_0x370d84='_stored_normalColor';this[_0x3458d7(0x64a)]=this[_0x3458d7(0x64a)]||{};if(this['_colorCache'][_0x370d84])return this[_0x3458d7(0x64a)][_0x370d84];const _0x274f1a=VisuMZ[_0x3458d7(0x370)][_0x3458d7(0x452)]['Color'][_0x3458d7(0x3b6)];return this[_0x3458d7(0x45f)](_0x370d84,_0x274f1a);},ColorManager[_0x140e58(0x834)]=function(){const _0x2e6cca=_0x140e58,_0x53d404=_0x2e6cca(0x70f);this['_colorCache']=this['_colorCache']||{};if(this[_0x2e6cca(0x64a)][_0x53d404])return this[_0x2e6cca(0x64a)][_0x53d404];const _0x3a0fcb=VisuMZ['CoreEngine']['Settings'][_0x2e6cca(0x543)]['ColorSystem'];return this[_0x2e6cca(0x45f)](_0x53d404,_0x3a0fcb);},ColorManager['crisisColor']=function(){const _0x1a32a7=_0x140e58,_0x77e07d=_0x1a32a7(0x177);this[_0x1a32a7(0x64a)]=this[_0x1a32a7(0x64a)]||{};if(this[_0x1a32a7(0x64a)][_0x77e07d])return this[_0x1a32a7(0x64a)][_0x77e07d];const _0x37e63c=VisuMZ[_0x1a32a7(0x370)][_0x1a32a7(0x452)][_0x1a32a7(0x543)]['ColorCrisis'];return this[_0x1a32a7(0x45f)](_0x77e07d,_0x37e63c);},ColorManager[_0x140e58(0x1ab)]=function(){const _0x4e62e7=_0x140e58,_0x2ec202=_0x4e62e7(0x458);this[_0x4e62e7(0x64a)]=this['_colorCache']||{};if(this['_colorCache'][_0x2ec202])return this[_0x4e62e7(0x64a)][_0x2ec202];const _0x8ee5da=VisuMZ[_0x4e62e7(0x370)]['Settings']['Color'][_0x4e62e7(0x15f)];return this[_0x4e62e7(0x45f)](_0x2ec202,_0x8ee5da);},ColorManager[_0x140e58(0x895)]=function(){const _0xfbe400=_0x140e58,_0x1a9583=_0xfbe400(0x8ac);this[_0xfbe400(0x64a)]=this[_0xfbe400(0x64a)]||{};if(this[_0xfbe400(0x64a)][_0x1a9583])return this['_colorCache'][_0x1a9583];const _0x1d43b7=VisuMZ[_0xfbe400(0x370)]['Settings'][_0xfbe400(0x543)]['ColorGaugeBack'];return this['getColorDataFromPluginParameters'](_0x1a9583,_0x1d43b7);},ColorManager['hpGaugeColor1']=function(){const _0xcbd98b=_0x140e58,_0x1f6886=_0xcbd98b(0x352);this[_0xcbd98b(0x64a)]=this['_colorCache']||{};if(this[_0xcbd98b(0x64a)][_0x1f6886])return this['_colorCache'][_0x1f6886];const _0x41fb32=VisuMZ['CoreEngine']['Settings']['Color'][_0xcbd98b(0x3af)];return this[_0xcbd98b(0x45f)](_0x1f6886,_0x41fb32);},ColorManager[_0x140e58(0x260)]=function(){const _0x2fa218=_0x140e58,_0x100c7b=_0x2fa218(0xed);this[_0x2fa218(0x64a)]=this[_0x2fa218(0x64a)]||{};if(this[_0x2fa218(0x64a)][_0x100c7b])return this['_colorCache'][_0x100c7b];const _0x4db011=VisuMZ[_0x2fa218(0x370)][_0x2fa218(0x452)][_0x2fa218(0x543)][_0x2fa218(0x6e9)];return this['getColorDataFromPluginParameters'](_0x100c7b,_0x4db011);},ColorManager[_0x140e58(0x86f)]=function(){const _0x1eccb4=_0x140e58,_0xe53435=_0x1eccb4(0x736);this['_colorCache']=this[_0x1eccb4(0x64a)]||{};if(this[_0x1eccb4(0x64a)][_0xe53435])return this['_colorCache'][_0xe53435];const _0x1cc913=VisuMZ['CoreEngine'][_0x1eccb4(0x452)][_0x1eccb4(0x543)][_0x1eccb4(0x5e7)];return this['getColorDataFromPluginParameters'](_0xe53435,_0x1cc913);},ColorManager[_0x140e58(0x8a9)]=function(){const _0x52014b=_0x140e58,_0x4ef3df=_0x52014b(0x32e);this[_0x52014b(0x64a)]=this[_0x52014b(0x64a)]||{};if(this[_0x52014b(0x64a)][_0x4ef3df])return this[_0x52014b(0x64a)][_0x4ef3df];const _0x29ed19=VisuMZ[_0x52014b(0x370)]['Settings']['Color'][_0x52014b(0x210)];return this[_0x52014b(0x45f)](_0x4ef3df,_0x29ed19);},ColorManager[_0x140e58(0x13e)]=function(){const _0x3197da=_0x140e58,_0x701ef1=_0x3197da(0x259);this[_0x3197da(0x64a)]=this[_0x3197da(0x64a)]||{};if(this[_0x3197da(0x64a)][_0x701ef1])return this[_0x3197da(0x64a)][_0x701ef1];const _0x4d0faf=VisuMZ[_0x3197da(0x370)][_0x3197da(0x452)]['Color']['ColorMPCost'];return this['getColorDataFromPluginParameters'](_0x701ef1,_0x4d0faf);},ColorManager[_0x140e58(0x329)]=function(){const _0x4b3daf=_0x140e58,_0x57664a='_stored_powerUpColor';this[_0x4b3daf(0x64a)]=this[_0x4b3daf(0x64a)]||{};if(this['_colorCache'][_0x57664a])return this[_0x4b3daf(0x64a)][_0x57664a];const _0x2a2cb9=VisuMZ['CoreEngine']['Settings'][_0x4b3daf(0x543)][_0x4b3daf(0x454)];return this[_0x4b3daf(0x45f)](_0x57664a,_0x2a2cb9);},ColorManager[_0x140e58(0x6ca)]=function(){const _0x52e56e=_0x140e58,_0x4c8daa='_stored_powerDownColor';this[_0x52e56e(0x64a)]=this[_0x52e56e(0x64a)]||{};if(this[_0x52e56e(0x64a)][_0x4c8daa])return this[_0x52e56e(0x64a)][_0x4c8daa];const _0x4554aa=VisuMZ['CoreEngine']['Settings'][_0x52e56e(0x543)]['ColorPowerDown'];return this[_0x52e56e(0x45f)](_0x4c8daa,_0x4554aa);},ColorManager[_0x140e58(0x219)]=function(){const _0x308fbf=_0x140e58,_0x167e75=_0x308fbf(0x64f);this[_0x308fbf(0x64a)]=this[_0x308fbf(0x64a)]||{};if(this[_0x308fbf(0x64a)][_0x167e75])return this['_colorCache'][_0x167e75];const _0x1872cd=VisuMZ[_0x308fbf(0x370)][_0x308fbf(0x452)][_0x308fbf(0x543)][_0x308fbf(0x241)];return this[_0x308fbf(0x45f)](_0x167e75,_0x1872cd);},ColorManager['ctGaugeColor2']=function(){const _0x2d6c95=_0x140e58,_0x14a5a2=_0x2d6c95(0x4ee);this[_0x2d6c95(0x64a)]=this[_0x2d6c95(0x64a)]||{};if(this['_colorCache'][_0x14a5a2])return this[_0x2d6c95(0x64a)][_0x14a5a2];const _0x589702=VisuMZ['CoreEngine'][_0x2d6c95(0x452)][_0x2d6c95(0x543)]['ColorCTGauge2'];return this[_0x2d6c95(0x45f)](_0x14a5a2,_0x589702);},ColorManager[_0x140e58(0x596)]=function(){const _0x528e32=_0x140e58,_0x425440=_0x528e32(0x790);this['_colorCache']=this['_colorCache']||{};if(this[_0x528e32(0x64a)][_0x425440])return this[_0x528e32(0x64a)][_0x425440];const _0x448e70=VisuMZ[_0x528e32(0x370)][_0x528e32(0x452)]['Color'][_0x528e32(0x72e)];return this['getColorDataFromPluginParameters'](_0x425440,_0x448e70);},ColorManager['tpGaugeColor2']=function(){const _0x25c248=_0x140e58,_0x1f8bfb=_0x25c248(0x46e);this[_0x25c248(0x64a)]=this[_0x25c248(0x64a)]||{};if(this['_colorCache'][_0x1f8bfb])return this['_colorCache'][_0x1f8bfb];const _0xce3c6d=VisuMZ[_0x25c248(0x370)][_0x25c248(0x452)][_0x25c248(0x543)][_0x25c248(0x7a1)];return this[_0x25c248(0x45f)](_0x1f8bfb,_0xce3c6d);},ColorManager[_0x140e58(0x6a1)]=function(){const _0x341850=_0x140e58,_0x31d3dd=_0x341850(0x83a);this[_0x341850(0x64a)]=this[_0x341850(0x64a)]||{};if(this[_0x341850(0x64a)][_0x31d3dd])return this['_colorCache'][_0x31d3dd];const _0x398bb0=VisuMZ[_0x341850(0x370)][_0x341850(0x452)][_0x341850(0x543)][_0x341850(0x6ee)];return this[_0x341850(0x45f)](_0x31d3dd,_0x398bb0);},ColorManager[_0x140e58(0x342)]=function(){const _0x44c0b4=_0x140e58,_0x18faf9=_0x44c0b4(0x66d);this[_0x44c0b4(0x64a)]=this[_0x44c0b4(0x64a)]||{};if(this[_0x44c0b4(0x64a)][_0x18faf9])return this[_0x44c0b4(0x64a)][_0x18faf9];const _0x4033d0=VisuMZ[_0x44c0b4(0x370)]['Settings'][_0x44c0b4(0x543)][_0x44c0b4(0x6ee)];return this[_0x44c0b4(0x45f)](_0x18faf9,_0x4033d0);},ColorManager[_0x140e58(0x3b3)]=function(){const _0x3bbea9=_0x140e58,_0x11492c=_0x3bbea9(0x447);this['_colorCache']=this[_0x3bbea9(0x64a)]||{};if(this[_0x3bbea9(0x64a)][_0x11492c])return this['_colorCache'][_0x11492c];const _0x5e7bf7=VisuMZ[_0x3bbea9(0x370)][_0x3bbea9(0x452)][_0x3bbea9(0x543)]['ColorExpGauge1'];return this[_0x3bbea9(0x45f)](_0x11492c,_0x5e7bf7);},ColorManager[_0x140e58(0x50b)]=function(){const _0xeea68c=_0x140e58,_0x33f7f3=_0xeea68c(0x59f);this[_0xeea68c(0x64a)]=this[_0xeea68c(0x64a)]||{};if(this[_0xeea68c(0x64a)][_0x33f7f3])return this[_0xeea68c(0x64a)][_0x33f7f3];const _0x36e494=VisuMZ[_0xeea68c(0x370)][_0xeea68c(0x452)][_0xeea68c(0x543)]['ColorExpGauge2'];return this[_0xeea68c(0x45f)](_0x33f7f3,_0x36e494);},ColorManager['maxLvGaugeColor1']=function(){const _0x444ca0=_0x140e58,_0x28959a=_0x444ca0(0x25e);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x28959a])return this[_0x444ca0(0x64a)][_0x28959a];const _0x189cd3=VisuMZ[_0x444ca0(0x370)][_0x444ca0(0x452)][_0x444ca0(0x543)][_0x444ca0(0xe6)];return this['getColorDataFromPluginParameters'](_0x28959a,_0x189cd3);},ColorManager[_0x140e58(0x243)]=function(){const _0x203914=_0x140e58,_0x592367=_0x203914(0x3ff);this[_0x203914(0x64a)]=this['_colorCache']||{};if(this[_0x203914(0x64a)][_0x592367])return this[_0x203914(0x64a)][_0x592367];const _0x3e1ce5=VisuMZ[_0x203914(0x370)][_0x203914(0x452)][_0x203914(0x543)][_0x203914(0x207)];return this[_0x203914(0x45f)](_0x592367,_0x3e1ce5);},ColorManager[_0x140e58(0x69c)]=function(_0x1a9f1f){const _0x10bd15=_0x140e58;return VisuMZ[_0x10bd15(0x370)][_0x10bd15(0x452)][_0x10bd15(0x543)][_0x10bd15(0x436)]['call'](this,_0x1a9f1f);},ColorManager[_0x140e58(0x4be)]=function(_0x2ae2c6){const _0x438334=_0x140e58;return VisuMZ[_0x438334(0x370)]['Settings'][_0x438334(0x543)][_0x438334(0x81c)][_0x438334(0x129)](this,_0x2ae2c6);},ColorManager[_0x140e58(0x6f9)]=function(_0x43dda0){const _0x9a9979=_0x140e58;return VisuMZ['CoreEngine'][_0x9a9979(0x452)][_0x9a9979(0x543)]['ActorTPColor'][_0x9a9979(0x129)](this,_0x43dda0);},ColorManager[_0x140e58(0x37c)]=function(_0x41a104){const _0x5dd389=_0x140e58;return VisuMZ[_0x5dd389(0x370)][_0x5dd389(0x452)]['Color'][_0x5dd389(0x3f3)][_0x5dd389(0x129)](this,_0x41a104);},ColorManager[_0x140e58(0x6ad)]=function(_0x35b2b6){const _0x518fbf=_0x140e58;return VisuMZ[_0x518fbf(0x370)][_0x518fbf(0x452)][_0x518fbf(0x543)][_0x518fbf(0x5f5)][_0x518fbf(0x129)](this,_0x35b2b6);},ColorManager[_0x140e58(0x127)]=function(){const _0x2853e2=_0x140e58;return VisuMZ[_0x2853e2(0x370)][_0x2853e2(0x452)]['Color'][_0x2853e2(0x2bc)];},ColorManager[_0x140e58(0x636)]=function(){const _0x45c1a8=_0x140e58;return VisuMZ[_0x45c1a8(0x370)][_0x45c1a8(0x452)]['Color']['OutlineColorDmg']||_0x45c1a8(0x5f8);},ColorManager[_0x140e58(0x76e)]=function(){const _0x1b09c2=_0x140e58;return VisuMZ[_0x1b09c2(0x370)][_0x1b09c2(0x452)][_0x1b09c2(0x543)][_0x1b09c2(0x889)]||_0x1b09c2(0x18b);},ColorManager[_0x140e58(0x300)]=function(){const _0x198e20=_0x140e58;return VisuMZ[_0x198e20(0x370)][_0x198e20(0x452)][_0x198e20(0x543)][_0x198e20(0x254)];},ColorManager[_0x140e58(0x715)]=function(){const _0x365f56=_0x140e58;return VisuMZ['CoreEngine'][_0x365f56(0x452)][_0x365f56(0x543)]['DimColor2'];},ColorManager['itemBackColor1']=function(){const _0x170cbc=_0x140e58;return VisuMZ['CoreEngine'][_0x170cbc(0x452)][_0x170cbc(0x543)][_0x170cbc(0x75b)];},ColorManager['itemBackColor2']=function(){const _0x364dde=_0x140e58;return VisuMZ[_0x364dde(0x370)][_0x364dde(0x452)][_0x364dde(0x543)][_0x364dde(0x42f)];},SceneManager[_0x140e58(0x53d)]=[],SceneManager[_0x140e58(0x683)]=function(){const _0x524f10=_0x140e58;return this['_scene']&&this[_0x524f10(0x8a1)][_0x524f10(0x4fd)]===Scene_Battle;},SceneManager[_0x140e58(0x60d)]=function(){const _0x10a8a5=_0x140e58;return this['_scene']&&this[_0x10a8a5(0x8a1)][_0x10a8a5(0x4fd)]===Scene_Map;},SceneManager[_0x140e58(0x21c)]=function(){const _0x5c66f0=_0x140e58;return this['_scene']&&this[_0x5c66f0(0x8a1)]instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x140e58(0x668)]=SceneManager[_0x140e58(0x2cd)],SceneManager['initialize']=function(){const _0x357b75=_0x140e58;VisuMZ[_0x357b75(0x370)][_0x357b75(0x668)][_0x357b75(0x129)](this),this[_0x357b75(0x280)]();},VisuMZ[_0x140e58(0x370)][_0x140e58(0xef)]=SceneManager[_0x140e58(0x43d)],SceneManager[_0x140e58(0x43d)]=function(_0x5a8a13){const _0x27adf2=_0x140e58;if($gameTemp)this[_0x27adf2(0x6fe)](_0x5a8a13);VisuMZ[_0x27adf2(0x370)][_0x27adf2(0xef)][_0x27adf2(0x129)](this,_0x5a8a13);},SceneManager[_0x140e58(0x6fe)]=function(_0x78627){const _0x553ce3=_0x140e58;if(!_0x78627[_0x553ce3(0x632)]&&!_0x78627['altKey'])switch(_0x78627[_0x553ce3(0xf4)]){case 0x54:this[_0x553ce3(0x7a3)]();break;case 0x75:this['playTestF6']();break;case 0x76:if(Input[_0x553ce3(0x26f)](_0x553ce3(0xd7))||Input['isPressed'](_0x553ce3(0x3ae)))return;this['playTestF7']();break;}},SceneManager[_0x140e58(0x861)]=function(){const _0x46725d=_0x140e58;if($gameTemp[_0x46725d(0x4c1)]()&&VisuMZ[_0x46725d(0x370)]['Settings']['QoL'][_0x46725d(0x658)]){ConfigManager[_0x46725d(0x557)]!==0x0?(ConfigManager[_0x46725d(0x5c7)]=0x0,ConfigManager[_0x46725d(0x5d6)]=0x0,ConfigManager[_0x46725d(0x6e6)]=0x0,ConfigManager[_0x46725d(0x557)]=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager[_0x46725d(0x5d6)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x46725d(0x557)]=0x64);ConfigManager['save']();if(this[_0x46725d(0x8a1)][_0x46725d(0x4fd)]===Scene_Options){if(_0x46725d(0x2c1)!==_0x46725d(0x2c1)){const _0x155248=_0x14e17b['eventsXyNt'](_0xfe250e,_0x25db53)['filter'](_0x4c555b=>_0x4c555b[_0x46725d(0x44e)]());return _0x155248[_0x46725d(0x4d7)]>0x0;}else{if(this[_0x46725d(0x8a1)]['_optionsWindow'])this['_scene'][_0x46725d(0x3bb)]['refresh']();if(this[_0x46725d(0x8a1)][_0x46725d(0x5ab)])this[_0x46725d(0x8a1)]['_listWindow'][_0x46725d(0x308)]();}}}},SceneManager['playTestF7']=function(){const _0x56e229=_0x140e58;$gameTemp[_0x56e229(0x4c1)]()&&VisuMZ[_0x56e229(0x370)][_0x56e229(0x452)][_0x56e229(0x1f0)][_0x56e229(0x58c)]&&($gameTemp['_playTestFastMode']=!$gameTemp[_0x56e229(0x723)]);},SceneManager[_0x140e58(0x7a3)]=function(){const _0x255a57=_0x140e58;if(!$gameTemp[_0x255a57(0x4c1)]())return;if(!SceneManager[_0x255a57(0x683)]())return;for(const _0x181a2f of $gameParty[_0x255a57(0x700)]()){if(!_0x181a2f)continue;_0x181a2f['gainSilentTp'](_0x181a2f['maxTp']());}},SceneManager[_0x140e58(0x280)]=function(){const _0x2b34f7=_0x140e58;this[_0x2b34f7(0x6d1)]=![],this[_0x2b34f7(0x83e)]=!VisuMZ[_0x2b34f7(0x370)][_0x2b34f7(0x452)]['UI'][_0x2b34f7(0x869)];},SceneManager['setSideButtonLayout']=function(_0x4769cb){const _0x5ab848=_0x140e58;if(VisuMZ[_0x5ab848(0x370)][_0x5ab848(0x452)]['UI'][_0x5ab848(0x14e)]){if(_0x5ab848(0x29b)!=='SVPtH')this[_0x5ab848(0x6d1)]=_0x4769cb;else return 0xc0;}},SceneManager[_0x140e58(0x888)]=function(){const _0x1dd390=_0x140e58;return this[_0x1dd390(0x6d1)];},SceneManager[_0x140e58(0x273)]=function(){return this['_hideButtons'];},SceneManager[_0x140e58(0x87c)]=function(){const _0x15ad2f=_0x140e58;return this[_0x15ad2f(0x273)]()||this['isSideButtonLayout']();},VisuMZ[_0x140e58(0x370)]['SceneManager_isGameActive']=SceneManager[_0x140e58(0x20f)],SceneManager[_0x140e58(0x20f)]=function(){const _0xc8351f=_0x140e58;if(VisuMZ[_0xc8351f(0x370)][_0xc8351f(0x452)][_0xc8351f(0x1f0)][_0xc8351f(0x710)]){if(_0xc8351f(0x23f)!=='yvzaY')return VisuMZ['CoreEngine'][_0xc8351f(0x819)][_0xc8351f(0x129)](this);else{const _0x5653da=_0x3d579f['displayX']()*_0x5d0137[_0xc8351f(0x226)]();return this['_x']-_0x5653da;}}else return!![];},SceneManager['catchException']=function(_0x28fffb){const _0x34db9=_0x140e58;if(_0x28fffb instanceof Error)this['catchNormalError'](_0x28fffb);else _0x28fffb instanceof Array&&_0x28fffb[0x0]===_0x34db9(0x544)?this[_0x34db9(0x779)](_0x28fffb):_0x34db9(0x7df)!==_0x34db9(0x7df)?this['playCursorSound']():this[_0x34db9(0x569)](_0x28fffb);this[_0x34db9(0x3c3)]();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x5cf)]=BattleManager['processEscape'],BattleManager[_0x140e58(0x793)]=function(){const _0x1f4150=_0x140e58;if(VisuMZ['CoreEngine'][_0x1f4150(0x452)][_0x1f4150(0x1f0)][_0x1f4150(0x53b)])this[_0x1f4150(0x27a)]();else{if(_0x1f4150(0x82a)==='VfKXE')return VisuMZ['CoreEngine'][_0x1f4150(0x5cf)]['call'](this);else{if(_0x262d14[_0x1f4150(0x44f)])return;}}},BattleManager[_0x140e58(0x27a)]=function(){const _0x51620a=_0x140e58;return $gameParty[_0x51620a(0x1f1)](),SoundManager[_0x51620a(0x18d)](),this[_0x51620a(0x1ac)](),!![];},BattleManager[_0x140e58(0x622)]=function(){const _0x585276=_0x140e58;return $gameSystem[_0x585276(0x887)]()>=0x1;},BattleManager[_0x140e58(0x77b)]=function(){const _0x4328ce=_0x140e58;return $gameSystem[_0x4328ce(0x887)]()===0x1;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x1bb)]=Game_Temp[_0x140e58(0x468)]['initialize'],Game_Temp[_0x140e58(0x468)][_0x140e58(0x2cd)]=function(){const _0x156b2a=_0x140e58;VisuMZ[_0x156b2a(0x370)][_0x156b2a(0x1bb)]['call'](this),this[_0x156b2a(0x164)](),this[_0x156b2a(0x43a)](),this[_0x156b2a(0x66a)]();},Game_Temp['prototype'][_0x140e58(0x164)]=function(){const _0xfc546f=_0x140e58;VisuMZ[_0xfc546f(0x370)][_0xfc546f(0x452)][_0xfc546f(0x1f0)][_0xfc546f(0x4fb)]&&(this[_0xfc546f(0x73b)]=![]);},Game_Temp[_0x140e58(0x468)]['setLastPluginCommandInterpreter']=function(_0x44dc12){const _0x43b073=_0x140e58;this[_0x43b073(0x2d1)]=_0x44dc12;},Game_Temp[_0x140e58(0x468)][_0x140e58(0x5c5)]=function(){const _0x5da753=_0x140e58;return this[_0x5da753(0x2d1)];},Game_Temp['prototype']['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x4192b2=_0x140e58;this[_0x4192b2(0x3a5)]=undefined,this['_forcedBattleSys']=undefined;},Game_Temp[_0x140e58(0x468)][_0x140e58(0x57c)]=function(_0x4f146d){const _0x36fb30=_0x140e58;if($gameMap&&$dataMap&&$dataMap['note']){if(_0x36fb30(0x69b)!==_0x36fb30(0x69b))return this;else this[_0x36fb30(0x24b)]($dataMap[_0x36fb30(0x51b)]);}const _0x3d36ed=$dataTroops[_0x4f146d];if(_0x3d36ed){let _0x59e538=DataManager[_0x36fb30(0x269)](_0x3d36ed['id']);this[_0x36fb30(0x24b)](_0x59e538);}},Game_Temp[_0x140e58(0x468)][_0x140e58(0x24b)]=function(_0x2de790){const _0x4aec4d=_0x140e58;if(!_0x2de790)return;if(_0x2de790[_0x4aec4d(0x461)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x4aec4d(0x3a5)]='FV';else{if(_0x2de790[_0x4aec4d(0x461)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x4aec4d(0x3a5)]='SV';else{if(_0x2de790[_0x4aec4d(0x461)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x82deaa=String(RegExp['$1']);if(_0x82deaa[_0x4aec4d(0x461)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x4aec4d(0x3a5)]='FV';else _0x82deaa[_0x4aec4d(0x461)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x4aec4d(0x3a5)]='SV');}}}if(_0x2de790[_0x4aec4d(0x461)](/<(?:DTB)>/i))_0x4aec4d(0x11c)===_0x4aec4d(0x4e1)?this[_0x4aec4d(0x149)][_0x4aec4d(0x67c)](_0xe866df[_0x4aec4d(0x579)][_0x4aec4d(0x5b0)]):this[_0x4aec4d(0x5a3)]=0x0;else{if(_0x2de790[_0x4aec4d(0x461)](/<(?:TPB|ATB)[ ]ACTIVE>/i))'eVrRn'===_0x4aec4d(0x28a)?this['_forcedBattleSys']=0x1:(this[_0x4aec4d(0x863)]=new _0x21ca10[(_0x4aec4d(0x4e2))][(_0x4aec4d(0x568))](_0x307628=!![]),this['_backgroundSprite']=new _0x20bfa3(),this[_0x4aec4d(0x866)][_0x4aec4d(0x78a)]=_0x1f8eec[_0x4aec4d(0x5a2)](),this[_0x4aec4d(0x866)][_0x4aec4d(0x4e2)]=[this[_0x4aec4d(0x863)]],this[_0x4aec4d(0x837)](this[_0x4aec4d(0x866)]),this['setBackgroundOpacity'](0xc0),this[_0x4aec4d(0x2e0)](this['getBackgroundOpacity']()),this['createCustomBackgroundImages']());else{if(_0x2de790[_0x4aec4d(0x461)](/<(?:TPB|ATB)[ ]WAIT>/i))_0x4aec4d(0x49d)!==_0x4aec4d(0x49d)?(_0x46ecee[_0x4aec4d(0x370)][_0x4aec4d(0x2ab)]['call'](this),this[_0x4aec4d(0x7d6)](),this[_0x4aec4d(0x89e)](),this[_0x4aec4d(0x12b)]()):this[_0x4aec4d(0x5a3)]=0x2;else{if(_0x2de790[_0x4aec4d(0x461)](/<(?:CTB)>/i))Imported[_0x4aec4d(0x451)]&&(this[_0x4aec4d(0x5a3)]='CTB');else{if(_0x2de790[_0x4aec4d(0x461)](/<(?:STB)>/i))Imported[_0x4aec4d(0x208)]&&(_0x4aec4d(0x7e2)===_0x4aec4d(0x366)?(_0x4e923e[_0x4aec4d(0x370)]['Bitmap_fillRect'][_0x4aec4d(0x129)](this,_0x5b7a79,_0x5de040,_0x2776c7,_0x11d7fb,_0xf5c585),this[_0x4aec4d(0x4df)]()):this['_forcedBattleSys']='STB');else{if(_0x2de790[_0x4aec4d(0x461)](/<(?:BTB)>/i))Imported[_0x4aec4d(0x3b4)]&&(_0x4aec4d(0x1f5)!=='rxKPL'?(_0x35190c+=_0x18a4ec,_0x4cb845+=_0xaf09a,_0x54c5cb+=_0x4aec4d(0x897)[_0x4aec4d(0x722)](_0x3e6287['id'],_0x38e605[_0x4aec4d(0x6f8)]),_0x5602a4+=_0x217307,_0x528452+=_0x117203,_0x5399ba+=_0x20d14b,_0x107433+='〘Common\x20Event\x20%1:\x20%2〙\x20End'['format'](_0x58c67c['id'],_0x2a6c9d['name']),_0x5842fb+=_0x510a8a):this['_forcedBattleSys']=_0x4aec4d(0x7ca));else{if(_0x2de790[_0x4aec4d(0x461)](/<(?:FTB)>/i))Imported[_0x4aec4d(0x7f3)]&&(this[_0x4aec4d(0x5a3)]='FTB');else{if(_0x2de790[_0x4aec4d(0x461)](/<(?:OTB)>/i))_0x4aec4d(0x691)!==_0x4aec4d(0x896)?Imported[_0x4aec4d(0x112)]&&(this[_0x4aec4d(0x5a3)]=_0x4aec4d(0x2f3)):_0x4c8e77[_0x4aec4d(0x370)][_0x4aec4d(0x6b5)][_0x4aec4d(0x129)](this,_0x438363);else{if(_0x2de790[_0x4aec4d(0x461)](/<(?:ETB)>/i)){if(_0x4aec4d(0x665)==='FUCIq')Imported[_0x4aec4d(0x79e)]&&(_0x4aec4d(0x7a8)===_0x4aec4d(0x7a8)?this[_0x4aec4d(0x5a3)]=_0x4aec4d(0x660):(_0x3dd0ac['CoreEngine']['Window_Base_update'][_0x4aec4d(0x129)](this),this[_0x4aec4d(0x2bd)]()));else{const _0x597c20=_0x4aec4d(0x83a);this[_0x4aec4d(0x64a)]=this['_colorCache']||{};if(this[_0x4aec4d(0x64a)][_0x597c20])return this[_0x4aec4d(0x64a)][_0x597c20];const _0x3b9186=_0x4dee3c[_0x4aec4d(0x370)][_0x4aec4d(0x452)]['Color'][_0x4aec4d(0x6ee)];return this['getColorDataFromPluginParameters'](_0x597c20,_0x3b9186);}}else{if(_0x2de790['match'](/<(?:PTB)>/i)){if(_0x4aec4d(0x198)===_0x4aec4d(0x198))Imported[_0x4aec4d(0x186)]&&(this['_forcedBattleSys']=_0x4aec4d(0x3ea));else{if(!this[_0x4aec4d(0x726)]())return;const _0x473faa=this[_0x4aec4d(0x5f7)]();this[_0x4aec4d(0x4a7)]=new _0x265baf(_0x473faa),this[_0x4aec4d(0x5a5)](this[_0x4aec4d(0x4a7)]);}}else{if(_0x2de790[_0x4aec4d(0x461)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x1040f9=String(RegExp['$1']);if(_0x1040f9[_0x4aec4d(0x461)](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0x1040f9['match'](/(?:TPB|ATB)[ ]ACTIVE/i)){if('Jbxvm'!=='Fasym')this[_0x4aec4d(0x5a3)]=0x1;else{if(_0x71a713[_0x4aec4d(0x4c1)]())_0x46aa74[_0x4aec4d(0x6be)](_0x47e274);}}else{if(_0x1040f9[_0x4aec4d(0x461)](/(?:TPB|ATB)[ ]WAIT/i)){if('abUiN'!==_0x4aec4d(0x79b))return _0x4b130b[_0x4aec4d(0x808)]&&_0x2062cf['description'][_0x4aec4d(0x7fd)]('['+_0x5e5530+']');else this[_0x4aec4d(0x5a3)]=0x2;}else{if(_0x1040f9[_0x4aec4d(0x461)](/CTB/i)){if(_0x4aec4d(0x62f)!==_0x4aec4d(0x386))Imported[_0x4aec4d(0x451)]&&(_0x4aec4d(0x252)!==_0x4aec4d(0x252)?_0x5edf90[_0x4aec4d(0x144)](!![]):this[_0x4aec4d(0x5a3)]=_0x4aec4d(0x894));else{if(!_0x2220fe[_0x4aec4d(0x8a1)])return;if(!_0x2e1df9[_0x4aec4d(0x8a1)][_0x4aec4d(0x5be)])return;_0x33bed6[_0x4aec4d(0x222)](_0x33cee7,_0x5181e7);const _0x5e79fe=_0x1d7efa[_0x4aec4d(0x372)](_0x1ef8bc[_0x4aec4d(0x4b6)]),_0x2c45ab=_0x38bdfd['round'](_0x2a35a0[_0x4aec4d(0x560)]);_0x20c78b[_0x4aec4d(0x4e8)](_0x5e79fe,_0x2c45ab,_0x125a90[_0x4aec4d(0x128)],_0x2df44f[_0x4aec4d(0x21e)],_0x967386[_0x4aec4d(0x1a9)]);}}else{if(_0x1040f9[_0x4aec4d(0x461)](/STB/i)){if(_0x4aec4d(0x735)===_0x4aec4d(0x735))Imported[_0x4aec4d(0x208)]&&(this[_0x4aec4d(0x5a3)]=_0x4aec4d(0x4f5));else return this[_0x4aec4d(0x33e)]();}else{if(_0x1040f9['match'](/BTB/i))Imported[_0x4aec4d(0x3b4)]&&(this[_0x4aec4d(0x5a3)]=_0x4aec4d(0x7ca));else{if(_0x1040f9['match'](/FTB/i)){if(Imported['VisuMZ_2_BattleSystemFTB']){if(_0x4aec4d(0x7dc)!==_0x4aec4d(0x655))this[_0x4aec4d(0x5a3)]=_0x4aec4d(0x7da);else for(const _0x1d2f9d of _0x158385[_0x4aec4d(0x694)]){const _0x25dafb=new _0x51f0ff(_0x1d2f9d);this[_0x4aec4d(0x837)](_0x25dafb);}}}else{if(_0x1040f9[_0x4aec4d(0x461)](/OTB/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x4aec4d(0x5a3)]=_0x4aec4d(0x2f3));else{if(_0x1040f9[_0x4aec4d(0x461)](/ETB/i))Imported[_0x4aec4d(0x79e)]&&(_0x4aec4d(0x7d3)!==_0x4aec4d(0x309)?this[_0x4aec4d(0x5a3)]='ETB':(_0x1c2895[_0x4aec4d(0x827)](),this[_0x4aec4d(0x4f8)]()));else _0x1040f9[_0x4aec4d(0x461)](/PTB/i)&&(Imported[_0x4aec4d(0x186)]&&(_0x4aec4d(0x6cb)===_0x4aec4d(0x6cb)?this[_0x4aec4d(0x5a3)]=_0x4aec4d(0x3ea):_0x38239d['isOptionValid']('test')&&_0x41b5ad[_0x4aec4d(0x370)][_0x4aec4d(0x452)][_0x4aec4d(0x1f0)][_0x4aec4d(0x28e)]?this[_0x4aec4d(0x625)]():_0x58edde['CoreEngine'][_0x4aec4d(0x4ad)][_0x4aec4d(0x129)](this)));}}}}}}}}}}}}}}}}}}}},Game_Temp['prototype'][_0x140e58(0x43a)]=function(){const _0xa53b13=_0x140e58;this[_0xa53b13(0x343)]=[];},Game_Temp[_0x140e58(0x468)][_0x140e58(0x20e)]=function(_0x3a39db,_0x2a51cc,_0x11dc8f,_0x330551){const _0x3a0ee4=_0x140e58;if(!this[_0x3a0ee4(0x80b)]())return;_0x11dc8f=_0x11dc8f||![],_0x330551=_0x330551||![];if($dataAnimations[_0x2a51cc]){const _0x26a1eb={'targets':_0x3a39db,'animationId':_0x2a51cc,'mirror':_0x11dc8f,'mute':_0x330551};this[_0x3a0ee4(0x343)][_0x3a0ee4(0x750)](_0x26a1eb);for(const _0x3cc92a of _0x3a39db){_0x3cc92a[_0x3a0ee4(0x47f)]&&('DwPdb'===_0x3a0ee4(0x2e6)?_0x3cc92a[_0x3a0ee4(0x47f)]():(this[_0x3a0ee4(0x435)]['x']=_0x23fdc7[_0x3a0ee4(0x435)]()['x'],this['anchor']['y']=_0x48eb5c[_0x3a0ee4(0x435)]()['y']));}}},Game_Temp[_0x140e58(0x468)][_0x140e58(0x80b)]=function(){return!![];},Game_Temp[_0x140e58(0x468)]['retrieveFauxAnimation']=function(){return this['_fauxAnimationQueue']['shift']();},Game_Temp[_0x140e58(0x468)]['createPointAnimationQueue']=function(){const _0x11d1f5=_0x140e58;this[_0x11d1f5(0x858)]=[];},Game_Temp['prototype'][_0x140e58(0x4e8)]=function(_0x3f80ad,_0x494313,_0x1ed4e8,_0x38afc6,_0x523dfd){const _0x246e17=_0x140e58;if(!this['showPointAnimations']())return;_0x38afc6=_0x38afc6||![],_0x523dfd=_0x523dfd||![];if($dataAnimations[_0x1ed4e8]){const _0x411160={'x':_0x3f80ad,'y':_0x494313,'animationId':_0x1ed4e8,'mirror':_0x38afc6,'mute':_0x523dfd};this[_0x246e17(0x858)][_0x246e17(0x750)](_0x411160);}},Game_Temp[_0x140e58(0x468)]['showPointAnimations']=function(){return!![];},Game_Temp[_0x140e58(0x468)][_0x140e58(0x340)]=function(){const _0x4f53a4=_0x140e58;return this[_0x4f53a4(0x858)]['shift']();},VisuMZ[_0x140e58(0x370)]['Game_System_initialize']=Game_System[_0x140e58(0x468)][_0x140e58(0x2cd)],Game_System[_0x140e58(0x468)][_0x140e58(0x2cd)]=function(){const _0x2019b7=_0x140e58;VisuMZ[_0x2019b7(0x370)][_0x2019b7(0x199)][_0x2019b7(0x129)](this),this[_0x2019b7(0x398)]();},Game_System['prototype']['initCoreEngine']=function(){const _0x55c643=_0x140e58;this[_0x55c643(0x6f2)]={'SideView':$dataSystem[_0x55c643(0x689)],'BattleSystem':this['initialBattleSystem'](),'FontSize':$dataSystem[_0x55c643(0x7a4)]['fontSize'],'Padding':0xc};},Game_System[_0x140e58(0x468)]['isSideView']=function(){const _0x60de18=_0x140e58;if($gameTemp[_0x60de18(0x3a5)]==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x60de18(0x6f2)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings']['SideView']===undefined)this[_0x60de18(0x398)]();return this[_0x60de18(0x6f2)][_0x60de18(0x26d)];},Game_System['prototype']['setSideView']=function(_0x4181b2){const _0xd8deca=_0x140e58;if(this[_0xd8deca(0x6f2)]===undefined)this[_0xd8deca(0x398)]();if(this[_0xd8deca(0x6f2)][_0xd8deca(0x26d)]===undefined)this[_0xd8deca(0x398)]();this[_0xd8deca(0x6f2)]['SideView']=_0x4181b2;},Game_System[_0x140e58(0x468)][_0x140e58(0x35e)]=function(){const _0x4fa498=_0x140e58;if(this[_0x4fa498(0x6f2)]===undefined)this[_0x4fa498(0x398)]();this[_0x4fa498(0x6f2)][_0x4fa498(0x82b)]=this[_0x4fa498(0x118)]();},Game_System[_0x140e58(0x468)]['initialBattleSystem']=function(){const _0x317d5a=_0x140e58,_0x4800fb=(VisuMZ['CoreEngine'][_0x317d5a(0x452)][_0x317d5a(0x82b)]||_0x317d5a(0x4d5))[_0x317d5a(0x5a9)]()[_0x317d5a(0x36f)]();return VisuMZ['CoreEngine'][_0x317d5a(0x330)](_0x4800fb);},Game_System[_0x140e58(0x468)]['getBattleSystem']=function(){const _0x3c0047=_0x140e58;if($gameTemp[_0x3c0047(0x5a3)]!==undefined)return $gameTemp[_0x3c0047(0x5a3)];if(this[_0x3c0047(0x6f2)]===undefined)this['initCoreEngine']();if(this[_0x3c0047(0x6f2)][_0x3c0047(0x82b)]===undefined)this[_0x3c0047(0x35e)]();return this[_0x3c0047(0x6f2)][_0x3c0047(0x82b)];},Game_System['prototype']['setBattleSystem']=function(_0x1159d9){const _0x21855e=_0x140e58;if(this[_0x21855e(0x6f2)]===undefined)this[_0x21855e(0x398)]();if(this[_0x21855e(0x6f2)][_0x21855e(0x82b)]===undefined)this[_0x21855e(0x35e)]();this[_0x21855e(0x6f2)]['BattleSystem']=_0x1159d9;},Game_System[_0x140e58(0x468)][_0x140e58(0x80a)]=function(){const _0x1281eb=_0x140e58;if(this[_0x1281eb(0x6f2)]===undefined)this[_0x1281eb(0x398)]();if(this[_0x1281eb(0x6f2)][_0x1281eb(0x7d2)]===undefined)this[_0x1281eb(0x398)]();return this['_CoreEngineSettings'][_0x1281eb(0x7d2)];},Game_System[_0x140e58(0x468)]['setMainFontSize']=function(_0x24b49d){const _0x45e917=_0x140e58;if(this[_0x45e917(0x6f2)]===undefined)this[_0x45e917(0x398)]();if(this[_0x45e917(0x6f2)][_0x45e917(0x76f)]===undefined)this[_0x45e917(0x398)]();this[_0x45e917(0x6f2)]['FontSize']=_0x24b49d;},Game_System[_0x140e58(0x468)][_0x140e58(0x32b)]=function(){const _0x52bd05=_0x140e58;if(this[_0x52bd05(0x6f2)]===undefined)this[_0x52bd05(0x398)]();if(this[_0x52bd05(0x6f2)][_0x52bd05(0x751)]===undefined)this['initCoreEngine']();return this[_0x52bd05(0x6f2)]['Padding'];},Game_System[_0x140e58(0x468)][_0x140e58(0x3c7)]=function(_0xba2d8c){const _0x39bd39=_0x140e58;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x39bd39(0x6f2)][_0x39bd39(0x76f)]===undefined)this[_0x39bd39(0x398)]();this[_0x39bd39(0x6f2)]['Padding']=_0xba2d8c;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x2a4)]=Game_Screen['prototype'][_0x140e58(0x2cd)],Game_Screen[_0x140e58(0x468)]['initialize']=function(){const _0x33ccf1=_0x140e58;VisuMZ[_0x33ccf1(0x370)][_0x33ccf1(0x2a4)][_0x33ccf1(0x129)](this),this[_0x33ccf1(0x34d)]();},Game_Screen['prototype'][_0x140e58(0x34d)]=function(){const _0x2d0ed4=_0x140e58,_0x2344a=VisuMZ[_0x2d0ed4(0x370)][_0x2d0ed4(0x452)][_0x2d0ed4(0x77e)];this['_coreEngineShakeStyle']=_0x2344a?.[_0x2d0ed4(0x109)]||'random';},Game_Screen['prototype'][_0x140e58(0x2bb)]=function(){const _0x13331c=_0x140e58;if(this['_coreEngineShakeStyle']===undefined)this[_0x13331c(0x34d)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0x140e58(0x468)][_0x140e58(0x3d1)]=function(_0x51e4c2){const _0x443adf=_0x140e58;if(this[_0x443adf(0x7de)]===undefined)this[_0x443adf(0x34d)]();this[_0x443adf(0x7de)]=_0x51e4c2[_0x443adf(0x77c)]()[_0x443adf(0x36f)]();},Game_Picture[_0x140e58(0x468)][_0x140e58(0x192)]=function(){const _0x374b25=_0x140e58;if($gameParty[_0x374b25(0x6d7)]())return![];return this[_0x374b25(0x6f8)]()&&this[_0x374b25(0x6f8)]()[_0x374b25(0x64c)](0x0)==='!';},VisuMZ['CoreEngine']['Game_Picture_x']=Game_Picture[_0x140e58(0x468)]['x'],Game_Picture[_0x140e58(0x468)]['x']=function(){const _0x2e5413=_0x140e58;return this[_0x2e5413(0x192)]()?_0x2e5413(0x72f)===_0x2e5413(0x72f)?this[_0x2e5413(0x551)]():0x3:VisuMZ[_0x2e5413(0x370)][_0x2e5413(0x3e4)]['call'](this);},Game_Picture[_0x140e58(0x468)][_0x140e58(0x551)]=function(){const _0x4cf596=_0x140e58,_0x3e1a6b=$gameMap[_0x4cf596(0x8a7)]()*$gameMap[_0x4cf596(0x226)]();return this['_x']-_0x3e1a6b;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x4d4)]=Game_Picture[_0x140e58(0x468)]['y'],Game_Picture[_0x140e58(0x468)]['y']=function(){const _0x63ae26=_0x140e58;return this['isMapScrollLinked']()?this[_0x63ae26(0x4db)]():VisuMZ[_0x63ae26(0x370)][_0x63ae26(0x4d4)][_0x63ae26(0x129)](this);},Game_Picture[_0x140e58(0x468)]['yScrollLinkedOffset']=function(){const _0x50bb1b=_0x140e58,_0x24b9c3=$gameMap[_0x50bb1b(0x7f5)]()*$gameMap[_0x50bb1b(0x547)]();return this['_y']-_0x24b9c3;},Game_Picture[_0x140e58(0x468)]['setEasingType']=function(_0xed537d){this['_coreEasingType']=_0xed537d;},VisuMZ[_0x140e58(0x370)]['Game_Picture_calcEasing']=Game_Picture['prototype']['calcEasing'],Game_Picture[_0x140e58(0x468)][_0x140e58(0x8b1)]=function(_0x4644f){const _0x5ba0c5=_0x140e58;this[_0x5ba0c5(0x876)]=this[_0x5ba0c5(0x876)]||0x0;if([0x0,0x1,0x2,0x3][_0x5ba0c5(0x7fd)](this[_0x5ba0c5(0x876)])){if(_0x5ba0c5(0x52e)===_0x5ba0c5(0x52e))return VisuMZ[_0x5ba0c5(0x370)][_0x5ba0c5(0x639)][_0x5ba0c5(0x129)](this,_0x4644f);else _0x547cc7[_0x5ba0c5(0x451)]&&(this[_0x5ba0c5(0x5a3)]='CTB');}else return VisuMZ[_0x5ba0c5(0x46f)](_0x4644f,this[_0x5ba0c5(0x876)]);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x33b)]=Game_Action[_0x140e58(0x468)][_0x140e58(0x71a)],Game_Action['prototype'][_0x140e58(0x71a)]=function(_0x501787){const _0x557e19=_0x140e58;return VisuMZ['CoreEngine'][_0x557e19(0x452)][_0x557e19(0x1f0)][_0x557e19(0x21a)]?this[_0x557e19(0x4fa)](_0x501787):VisuMZ[_0x557e19(0x370)][_0x557e19(0x33b)][_0x557e19(0x129)](this,_0x501787);},Game_Action[_0x140e58(0x468)][_0x140e58(0x4fa)]=function(_0x4be95b){const _0x31d9d1=_0x140e58,_0x3058b1=this[_0x31d9d1(0x66f)](_0x4be95b),_0x571469=this[_0x31d9d1(0x523)](_0x4be95b),_0x109d50=this['targetEvaRate'](_0x4be95b);return _0x3058b1*(_0x571469-_0x109d50);},VisuMZ[_0x140e58(0x370)]['Game_Action_itemEva']=Game_Action[_0x140e58(0x468)][_0x140e58(0x6ac)],Game_Action[_0x140e58(0x468)][_0x140e58(0x6ac)]=function(_0x1841c6){const _0x7950d3=_0x140e58;return VisuMZ[_0x7950d3(0x370)][_0x7950d3(0x452)][_0x7950d3(0x1f0)][_0x7950d3(0x21a)]?0x0:VisuMZ[_0x7950d3(0x370)][_0x7950d3(0x6a6)][_0x7950d3(0x129)](this,_0x1841c6);},Game_Action[_0x140e58(0x468)]['itemSuccessRate']=function(_0x599305){const _0x8d8202=_0x140e58;return this[_0x8d8202(0x3bf)]()[_0x8d8202(0x6b8)]*0.01;},Game_Action[_0x140e58(0x468)][_0x140e58(0x523)]=function(_0xa71e3){const _0x317e29=_0x140e58;if(VisuMZ[_0x317e29(0x370)][_0x317e29(0x452)]['QoL'][_0x317e29(0xd8)]&&this[_0x317e29(0x245)]())return 0x1;return this[_0x317e29(0x6f6)]()?_0x317e29(0x278)!==_0x317e29(0x18e)?VisuMZ['CoreEngine']['Settings'][_0x317e29(0x1f0)]['AccuracyBoost']&&this[_0x317e29(0x1e5)]()[_0x317e29(0x49c)]()?this['subject']()[_0x317e29(0x763)]+0.05:this[_0x317e29(0x1e5)]()[_0x317e29(0x763)]:_0x3bc52a[_0x317e29(0x370)]['Settings'][_0x317e29(0x505)][_0x317e29(0x3dc)]['CommandRect'][_0x317e29(0x129)](this):0x1;},Game_Action['prototype']['targetEvaRate']=function(_0x162a63){const _0x284235=_0x140e58;if(this[_0x284235(0x1e5)]()[_0x284235(0x49c)]()===_0x162a63['isActor']())return 0x0;if(this[_0x284235(0x6f6)]()){if('usKqg'===_0x284235(0x108))return VisuMZ[_0x284235(0x370)][_0x284235(0x452)][_0x284235(0x1f0)][_0x284235(0xd8)]&&_0x162a63['isEnemy']()?_0x162a63[_0x284235(0x155)]-0.05:_0x284235(0xd6)!==_0x284235(0x180)?_0x162a63[_0x284235(0x155)]:_0x34c1b3[_0x284235(0x370)]['Settings']['QoL'][_0x284235(0x21a)]?0x0:_0x595d3e[_0x284235(0x370)][_0x284235(0x6a6)]['call'](this,_0x1f704a);else{_0x5778c8+=_0x512bb1;if(_0xc4ee16>=_0xb15fa5)_0x33a4fa=_0x32519c-0x1;this[_0x284235(0x822)](_0x7b1ccb);}}else{if(this['isMagical']())return _0x162a63[_0x284235(0x67a)];else{if(_0x284235(0x220)!==_0x284235(0x712))return 0x0;else{var _0x381543=_0x49f003(_0x11468c['$1']);if(_0x381543===0x0)_0x381543=_0x6358c4[_0x284235(0x1c8)];_0x44056f=_0x2be2c4['max'](_0x1139f1,_0x381543);}}}},VisuMZ[_0x140e58(0x370)][_0x140e58(0xf5)]=Game_Action['prototype'][_0x140e58(0x782)],Game_Action[_0x140e58(0x468)][_0x140e58(0x782)]=function(_0x447ffd){const _0x3090fa=_0x140e58;VisuMZ['CoreEngine'][_0x3090fa(0xf5)][_0x3090fa(0x129)](this,_0x447ffd);if(VisuMZ['CoreEngine'][_0x3090fa(0x452)][_0x3090fa(0x1f0)][_0x3090fa(0x21a)])return;const _0x2da241=_0x447ffd['result']();_0x2da241['missed']&&(0x1-this[_0x3090fa(0x6ac)](_0x447ffd)>this[_0x3090fa(0x71a)](_0x447ffd)&&(_0x2da241[_0x3090fa(0x19a)]=![],_0x2da241[_0x3090fa(0x7f1)]=!![]));},VisuMZ[_0x140e58(0x370)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x140e58(0x468)]['initMembers'],Game_BattlerBase[_0x140e58(0x468)]['initMembers']=function(){const _0x53be2e=_0x140e58;this[_0x53be2e(0x84e)]={},VisuMZ[_0x53be2e(0x370)][_0x53be2e(0x5ba)]['call'](this);},VisuMZ[_0x140e58(0x370)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x140e58(0x468)][_0x140e58(0x308)],Game_BattlerBase[_0x140e58(0x468)][_0x140e58(0x308)]=function(){const _0xc8b274=_0x140e58;this['_cache']={},VisuMZ[_0xc8b274(0x370)][_0xc8b274(0x1d9)][_0xc8b274(0x129)](this);},Game_BattlerBase['prototype'][_0x140e58(0x60a)]=function(_0x4b8ca3){const _0x5f0d35=_0x140e58;return this['_cache']=this[_0x5f0d35(0x84e)]||{},this[_0x5f0d35(0x84e)][_0x4b8ca3]!==undefined;},Game_BattlerBase[_0x140e58(0x468)]['paramPlus']=function(_0x20c52b){const _0x1f09e1=_0x140e58,_0x1c19a0=(_0x4e372f,_0x36710e)=>{const _0x26bf61=_0x2d25;if(!_0x36710e)return _0x4e372f;if(_0x36710e[_0x26bf61(0x51b)][_0x26bf61(0x461)](VisuMZ[_0x26bf61(0x370)][_0x26bf61(0x142)][_0x26bf61(0x2c2)][_0x20c52b])){if(_0x26bf61(0x20a)===_0x26bf61(0x7e3))return!this['isBottomHelpMode']()?this[_0x26bf61(0x443)]():0x0;else{var _0x454710=Number(RegExp['$1']);_0x4e372f+=_0x454710;}}if(_0x36710e[_0x26bf61(0x51b)][_0x26bf61(0x461)](VisuMZ[_0x26bf61(0x370)][_0x26bf61(0x142)][_0x26bf61(0x22b)][_0x20c52b])){var _0x471920=String(RegExp['$1']);try{_0x4e372f+=eval(_0x471920);}catch(_0x1a86da){if(_0x26bf61(0x5d0)===_0x26bf61(0x5d0)){if($gameTemp[_0x26bf61(0x4c1)]())console['log'](_0x1a86da);}else this[_0x26bf61(0x4ff)]()?this['onInputBannedWords']():_0x53d9d6[_0x26bf61(0x370)][_0x26bf61(0x288)][_0x26bf61(0x129)](this);}}return _0x4e372f;};return this[_0x1f09e1(0x770)]()['reduce'](_0x1c19a0,this['_paramPlus'][_0x20c52b]);},Game_BattlerBase[_0x140e58(0x468)][_0x140e58(0x167)]=function(_0x1820f1){const _0x278ea8=_0x140e58;var _0x4482b7=_0x278ea8(0x89b)+(this['isActor']()?_0x278ea8(0x1d6):'Enemy')+_0x278ea8(0x60f)+_0x1820f1;if(this[_0x278ea8(0x60a)](_0x4482b7))return this['_cache'][_0x4482b7];this[_0x278ea8(0x84e)][_0x4482b7]=eval(VisuMZ[_0x278ea8(0x370)][_0x278ea8(0x452)][_0x278ea8(0x3d3)][_0x4482b7]);const _0x4c2094=(_0x380d18,_0x3fcaf0)=>{const _0x4b9ddb=_0x278ea8;if(!_0x3fcaf0)return _0x380d18;if(_0x3fcaf0[_0x4b9ddb(0x51b)]['match'](VisuMZ[_0x4b9ddb(0x370)][_0x4b9ddb(0x142)][_0x4b9ddb(0x167)][_0x1820f1])){if('uruap'===_0x4b9ddb(0x244)){var _0x2f9196=Number(RegExp['$1']);if(_0x2f9196===0x0)_0x2f9196=Number[_0x4b9ddb(0x1c8)];_0x380d18=Math[_0x4b9ddb(0x1d1)](_0x380d18,_0x2f9196);}else return _0x13092b[_0x4b9ddb(0x370)][_0x4b9ddb(0x4d4)][_0x4b9ddb(0x129)](this);}if(_0x3fcaf0[_0x4b9ddb(0x51b)][_0x4b9ddb(0x461)](VisuMZ[_0x4b9ddb(0x370)][_0x4b9ddb(0x142)]['paramMaxJS'][_0x1820f1])){if(_0x4b9ddb(0x845)===_0x4b9ddb(0x348))this[_0x4b9ddb(0x848)](_0x2a11da[_0x4b9ddb(0x834)]()),this['drawText'](_0x52f4e5,_0x766aa1,_0x4e82ab,_0x27a3fd,_0x4b9ddb(0x1c0)),_0xfd0460-=this['textWidth'](_0x2a168c)+0x6;else{var _0x47a7df=String(RegExp['$1']);try{_0x380d18=Math['max'](_0x380d18,Number(eval(_0x47a7df)));}catch(_0xa69f6b){if($gameTemp[_0x4b9ddb(0x4c1)]())console[_0x4b9ddb(0x6be)](_0xa69f6b);}}}return _0x380d18;};if(this[_0x278ea8(0x84e)][_0x4482b7]===0x0)this['_cache'][_0x4482b7]=Number[_0x278ea8(0x1c8)];return this['_cache'][_0x4482b7]=this[_0x278ea8(0x770)]()[_0x278ea8(0x69d)](_0x4c2094,this[_0x278ea8(0x84e)][_0x4482b7]),this[_0x278ea8(0x84e)][_0x4482b7];},Game_BattlerBase[_0x140e58(0x468)]['paramRate']=function(_0x352e15){const _0x3ce8b2=_0x140e58,_0x21baa4=this['traitsPi'](Game_BattlerBase[_0x3ce8b2(0x7d0)],_0x352e15),_0x5f5389=(_0x3572be,_0x4b3702)=>{const _0x5adb4e=_0x3ce8b2;if(!_0x4b3702)return _0x3572be;if(_0x4b3702[_0x5adb4e(0x51b)]['match'](VisuMZ[_0x5adb4e(0x370)][_0x5adb4e(0x142)][_0x5adb4e(0x479)][_0x352e15])){if(_0x5adb4e(0x6bc)===_0x5adb4e(0x319)){const _0x560480=_0x56ffea[_0x5d7d83];_0x560480?this['setup'](_0x560480['list'],0x0):this[_0x5adb4e(0x2b6)]();}else{var _0x3f3b79=Number(RegExp['$1'])/0x64;_0x3572be*=_0x3f3b79;}}if(_0x4b3702[_0x5adb4e(0x51b)]['match'](VisuMZ[_0x5adb4e(0x370)][_0x5adb4e(0x142)][_0x5adb4e(0x150)][_0x352e15])){var _0x3f3b79=Number(RegExp['$1']);_0x3572be*=_0x3f3b79;}if(_0x4b3702[_0x5adb4e(0x51b)][_0x5adb4e(0x461)](VisuMZ[_0x5adb4e(0x370)][_0x5adb4e(0x142)][_0x5adb4e(0x6c3)][_0x352e15])){if(_0x5adb4e(0x106)==='ZZITL'){const _0x138478=this['itemSuccessRate'](_0x33695c),_0x37a779=this[_0x5adb4e(0x523)](_0x3f17cc),_0x46de4c=this[_0x5adb4e(0x434)](_0x55638f);return _0x138478*(_0x37a779-_0x46de4c);}else{var _0x531694=String(RegExp['$1']);try{if(_0x5adb4e(0x266)!==_0x5adb4e(0x4c5))_0x3572be*=eval(_0x531694);else return this['skills']()[_0x5adb4e(0x6b3)](_0x1878d7=>this[_0x5adb4e(0x29f)](_0x1878d7)&&this[_0x5adb4e(0x76a)]()[_0x5adb4e(0x7fd)](_0x1878d7[_0x5adb4e(0x251)]));}catch(_0xd47288){if($gameTemp['isPlaytest']())console['log'](_0xd47288);}}}return _0x3572be;};return this[_0x3ce8b2(0x770)]()['reduce'](_0x5f5389,_0x21baa4);},Game_BattlerBase[_0x140e58(0x468)]['paramFlatBonus']=function(_0x10537f){const _0x3b7c99=_0x140e58,_0x53084c=(_0x5ebd9b,_0x121986)=>{const _0x455e55=_0x2d25;if(!_0x121986)return _0x5ebd9b;if(_0x121986['note'][_0x455e55(0x461)](VisuMZ[_0x455e55(0x370)]['RegExp']['paramFlat'][_0x10537f])){if(_0x455e55(0x433)!==_0x455e55(0x433))this[_0x455e55(0x56c)]();else{var _0x293c11=Number(RegExp['$1']);_0x5ebd9b+=_0x293c11;}}if(_0x121986[_0x455e55(0x51b)][_0x455e55(0x461)](VisuMZ['CoreEngine'][_0x455e55(0x142)][_0x455e55(0x1f9)][_0x10537f])){var _0x55c5e2=String(RegExp['$1']);try{_0x5ebd9b+=eval(_0x55c5e2);}catch(_0x5b1782){if(_0x455e55(0x4bd)===_0x455e55(0x55d)){if(_0x414666)_0x4b3a27[_0x455e55(0x680)](_0x2edcfd);}else{if($gameTemp['isPlaytest']())console[_0x455e55(0x6be)](_0x5b1782);}}}return _0x5ebd9b;};return this[_0x3b7c99(0x770)]()['reduce'](_0x53084c,0x0);},Game_BattlerBase[_0x140e58(0x468)]['param']=function(_0x3f9734){const _0x4d5552=_0x140e58;let _0x2a0c43=_0x4d5552(0x2bf)+_0x3f9734+_0x4d5552(0x480);if(this['checkCacheKey'](_0x2a0c43))return this['_cache'][_0x2a0c43];return this[_0x4d5552(0x84e)][_0x2a0c43]=Math['round'](VisuMZ['CoreEngine'][_0x4d5552(0x452)][_0x4d5552(0x3d3)]['BasicParameterFormula'][_0x4d5552(0x129)](this,_0x3f9734)),this[_0x4d5552(0x84e)][_0x2a0c43];},Game_BattlerBase[_0x140e58(0x468)][_0x140e58(0x7af)]=function(_0x2d5c9c){const _0xd7fa32=_0x140e58,_0x42d236=(_0x4ec71f,_0x46a2b9)=>{const _0x2e98b1=_0x2d25;if(_0x2e98b1(0x284)!==_0x2e98b1(0x284))return 0x0;else{if(!_0x46a2b9)return _0x4ec71f;if(_0x46a2b9[_0x2e98b1(0x51b)][_0x2e98b1(0x461)](VisuMZ[_0x2e98b1(0x370)][_0x2e98b1(0x142)]['xparamPlus1'][_0x2d5c9c])){var _0x481283=Number(RegExp['$1'])/0x64;_0x4ec71f+=_0x481283;}if(_0x46a2b9[_0x2e98b1(0x51b)][_0x2e98b1(0x461)](VisuMZ[_0x2e98b1(0x370)][_0x2e98b1(0x142)][_0x2e98b1(0x513)][_0x2d5c9c])){if(_0x2e98b1(0x3ee)===_0x2e98b1(0x3ee)){var _0x481283=Number(RegExp['$1']);_0x4ec71f+=_0x481283;}else _0x58e223[_0x2e98b1(0x370)][_0x2e98b1(0x844)][_0x2e98b1(0x129)](this,_0x1244e9),this[_0x2e98b1(0x6bb)](_0x401a67);}if(_0x46a2b9[_0x2e98b1(0x51b)][_0x2e98b1(0x461)](VisuMZ[_0x2e98b1(0x370)][_0x2e98b1(0x142)][_0x2e98b1(0x261)][_0x2d5c9c])){if(_0x2e98b1(0x13c)!==_0x2e98b1(0x13c)){if(!this[_0x2e98b1(0x6ce)])return _0x3ea912;return _0x36cc1d['ApplyEasing'](_0x1c2419,this[_0x2e98b1(0x6ce)][_0x2e98b1(0x16c)]||'LINEAR');}else{var _0x4ab90c=String(RegExp['$1']);try{_0x4ec71f+=eval(_0x4ab90c);}catch(_0x3f2c02){if($gameTemp[_0x2e98b1(0x4c1)]())console[_0x2e98b1(0x6be)](_0x3f2c02);}}}return _0x4ec71f;}};return this[_0xd7fa32(0x770)]()['reduce'](_0x42d236,0x0);},Game_BattlerBase[_0x140e58(0x468)]['xparamRate']=function(_0x44fea9){const _0x23c3e7=_0x140e58,_0x15fff4=(_0x345b38,_0x1d7c78)=>{const _0x3fa061=_0x2d25;if(!_0x1d7c78)return _0x345b38;if(_0x1d7c78[_0x3fa061(0x51b)][_0x3fa061(0x461)](VisuMZ[_0x3fa061(0x370)][_0x3fa061(0x142)]['xparamRate1'][_0x44fea9])){var _0x535e69=Number(RegExp['$1'])/0x64;_0x345b38*=_0x535e69;}if(_0x1d7c78[_0x3fa061(0x51b)][_0x3fa061(0x461)](VisuMZ[_0x3fa061(0x370)][_0x3fa061(0x142)][_0x3fa061(0x21d)][_0x44fea9])){var _0x535e69=Number(RegExp['$1']);_0x345b38*=_0x535e69;}if(_0x1d7c78[_0x3fa061(0x51b)][_0x3fa061(0x461)](VisuMZ[_0x3fa061(0x370)][_0x3fa061(0x142)]['xparamRateJS'][_0x44fea9])){var _0x508476=String(RegExp['$1']);try{_0x345b38*=eval(_0x508476);}catch(_0x209183){if($gameTemp[_0x3fa061(0x4c1)]())console[_0x3fa061(0x6be)](_0x209183);}}return _0x345b38;};return this[_0x23c3e7(0x770)]()[_0x23c3e7(0x69d)](_0x15fff4,0x1);},Game_BattlerBase['prototype']['xparamFlatBonus']=function(_0x5c1066){const _0x367038=_0x140e58,_0x4c2aca=(_0x5434c3,_0x3ceef1)=>{const _0x2af3f9=_0x2d25;if(!_0x3ceef1)return _0x5434c3;if(_0x3ceef1[_0x2af3f9(0x51b)][_0x2af3f9(0x461)](VisuMZ['CoreEngine'][_0x2af3f9(0x142)][_0x2af3f9(0x764)][_0x5c1066])){var _0xb6cecb=Number(RegExp['$1'])/0x64;_0x5434c3+=_0xb6cecb;}if(_0x3ceef1['note'][_0x2af3f9(0x461)](VisuMZ[_0x2af3f9(0x370)][_0x2af3f9(0x142)][_0x2af3f9(0x66e)][_0x5c1066])){if('AyztF'!==_0x2af3f9(0x553)){var _0xb6cecb=Number(RegExp['$1']);_0x5434c3+=_0xb6cecb;}else{if(this['_hideTileShadows']===_0x2ecbb0)this[_0x2af3f9(0x6bb)]();return this[_0x2af3f9(0x3cb)];}}if(_0x3ceef1['note'][_0x2af3f9(0x461)](VisuMZ[_0x2af3f9(0x370)][_0x2af3f9(0x142)]['xparamFlatJS'][_0x5c1066])){var _0x5bf421=String(RegExp['$1']);try{_0x5434c3+=eval(_0x5bf421);}catch(_0x3986db){if($gameTemp[_0x2af3f9(0x4c1)]())console['log'](_0x3986db);}}return _0x5434c3;};return this[_0x367038(0x770)]()[_0x367038(0x69d)](_0x4c2aca,0x0);},Game_BattlerBase[_0x140e58(0x468)][_0x140e58(0x6c2)]=function(_0x2b3bb8){const _0x2ea61f=_0x140e58;let _0x2a52c7='xparam'+_0x2b3bb8+_0x2ea61f(0x480);if(this['checkCacheKey'](_0x2a52c7))return this[_0x2ea61f(0x84e)][_0x2a52c7];return this[_0x2ea61f(0x84e)][_0x2a52c7]=VisuMZ[_0x2ea61f(0x370)][_0x2ea61f(0x452)][_0x2ea61f(0x3d3)]['XParameterFormula'][_0x2ea61f(0x129)](this,_0x2b3bb8),this[_0x2ea61f(0x84e)][_0x2a52c7];},Game_BattlerBase[_0x140e58(0x468)]['sparamPlus']=function(_0x5a0ee5){const _0x6536b8=(_0x5386c7,_0x1c58e7)=>{const _0x15e2ac=_0x2d25;if(!_0x1c58e7)return _0x5386c7;if(_0x1c58e7[_0x15e2ac(0x51b)][_0x15e2ac(0x461)](VisuMZ[_0x15e2ac(0x370)][_0x15e2ac(0x142)]['sparamPlus1'][_0x5a0ee5])){if('QFgud'==='ssWGh'){const _0x59ddfa=_0x5bb6e3[_0x15e2ac(0x8af)]['replace'](/[ ]/g,''),_0x5fd937=_0x1f8b05['CodeJS'];_0xa5adbe[_0x15e2ac(0x370)][_0x15e2ac(0x432)](_0x59ddfa,_0x5fd937);}else{var _0x3b213e=Number(RegExp['$1'])/0x64;_0x5386c7+=_0x3b213e;}}if(_0x1c58e7[_0x15e2ac(0x51b)][_0x15e2ac(0x461)](VisuMZ[_0x15e2ac(0x370)]['RegExp'][_0x15e2ac(0x203)][_0x5a0ee5])){var _0x3b213e=Number(RegExp['$1']);_0x5386c7+=_0x3b213e;}if(_0x1c58e7[_0x15e2ac(0x51b)]['match'](VisuMZ[_0x15e2ac(0x370)]['RegExp']['sparamPlusJS'][_0x5a0ee5])){var _0xfb10d1=String(RegExp['$1']);try{_0x5386c7+=eval(_0xfb10d1);}catch(_0x240628){if(_0x15e2ac(0x153)!==_0x15e2ac(0x153))_0x5d98ce[_0x15e2ac(0x800)]['call'](this,_0x5e3594);else{if($gameTemp[_0x15e2ac(0x4c1)]())console['log'](_0x240628);}}}return _0x5386c7;};return this['traitObjects']()['reduce'](_0x6536b8,0x0);},Game_BattlerBase[_0x140e58(0x468)]['sparamRate']=function(_0x47bbf7){const _0x3479a4=_0x140e58,_0x1c2d58=(_0xcdbed4,_0x16e7d0)=>{const _0x16253b=_0x2d25;if(_0x16253b(0x514)===_0x16253b(0x514)){if(!_0x16e7d0)return _0xcdbed4;if(_0x16e7d0[_0x16253b(0x51b)][_0x16253b(0x461)](VisuMZ[_0x16253b(0x370)][_0x16253b(0x142)][_0x16253b(0x713)][_0x47bbf7])){if(_0x16253b(0x7e5)!==_0x16253b(0x46a)){var _0x2aeade=Number(RegExp['$1'])/0x64;_0xcdbed4*=_0x2aeade;}else this[_0x16253b(0x5a3)]=_0x16253b(0x7ca);}if(_0x16e7d0[_0x16253b(0x51b)][_0x16253b(0x461)](VisuMZ[_0x16253b(0x370)][_0x16253b(0x142)]['sparamRate2'][_0x47bbf7])){if('uTdZV'!==_0x16253b(0xf7))this[_0x16253b(0x19e)]['x']=-0x1*(this[_0x16253b(0x19e)][_0x16253b(0x3b1)]+this[_0x16253b(0x576)][_0x16253b(0x3b1)]+0x8),this[_0x16253b(0x576)]['x']=-0x1*(this[_0x16253b(0x576)][_0x16253b(0x3b1)]+0x4);else{var _0x2aeade=Number(RegExp['$1']);_0xcdbed4*=_0x2aeade;}}if(_0x16e7d0[_0x16253b(0x51b)]['match'](VisuMZ[_0x16253b(0x370)]['RegExp'][_0x16253b(0x87d)][_0x47bbf7])){var _0x11daac=String(RegExp['$1']);try{_0xcdbed4*=eval(_0x11daac);}catch(_0x3b1f50){if($gameTemp[_0x16253b(0x4c1)]())console[_0x16253b(0x6be)](_0x3b1f50);}}return _0xcdbed4;}else this[_0x16253b(0x618)]();};return this[_0x3479a4(0x770)]()[_0x3479a4(0x69d)](_0x1c2d58,0x1);},Game_BattlerBase[_0x140e58(0x468)][_0x140e58(0x698)]=function(_0x56ecb9){const _0x6dafb9=_0x140e58,_0x2f51ba=(_0x5a19a3,_0x114509)=>{const _0xe8d28f=_0x2d25;if(!_0x114509)return _0x5a19a3;if(_0x114509[_0xe8d28f(0x51b)][_0xe8d28f(0x461)](VisuMZ['CoreEngine'][_0xe8d28f(0x142)]['sparamFlat1'][_0x56ecb9])){var _0x5c9649=Number(RegExp['$1'])/0x64;_0x5a19a3+=_0x5c9649;}if(_0x114509[_0xe8d28f(0x51b)][_0xe8d28f(0x461)](VisuMZ[_0xe8d28f(0x370)][_0xe8d28f(0x142)][_0xe8d28f(0x30a)][_0x56ecb9])){var _0x5c9649=Number(RegExp['$1']);_0x5a19a3+=_0x5c9649;}if(_0x114509['note'][_0xe8d28f(0x461)](VisuMZ[_0xe8d28f(0x370)][_0xe8d28f(0x142)][_0xe8d28f(0x53f)][_0x56ecb9])){if('znQAN'==='znQAN'){var _0x4b373a=String(RegExp['$1']);try{_0x5a19a3+=eval(_0x4b373a);}catch(_0x18a167){if($gameTemp[_0xe8d28f(0x4c1)]())console[_0xe8d28f(0x6be)](_0x18a167);}}else _0x346c46+=_0xe0a06d(_0x3727d5);}return _0x5a19a3;};return this[_0x6dafb9(0x770)]()['reduce'](_0x2f51ba,0x0);},Game_BattlerBase['prototype'][_0x140e58(0x48c)]=function(_0x24ab1c){const _0x45702d=_0x140e58;let _0x48703a=_0x45702d(0x48c)+_0x24ab1c+'Total';if(this[_0x45702d(0x60a)](_0x48703a))return this[_0x45702d(0x84e)][_0x48703a];return this[_0x45702d(0x84e)][_0x48703a]=VisuMZ[_0x45702d(0x370)][_0x45702d(0x452)][_0x45702d(0x3d3)][_0x45702d(0x2f0)][_0x45702d(0x129)](this,_0x24ab1c),this[_0x45702d(0x84e)][_0x48703a];},Game_BattlerBase['prototype']['paramValueByName']=function(_0x3efa0b,_0x2b064f){const _0x18ef24=_0x140e58;if(typeof paramId==='number')return this[_0x18ef24(0x2bf)](_0x3efa0b);_0x3efa0b=String(_0x3efa0b||'')[_0x18ef24(0x5a9)]();if(_0x3efa0b===_0x18ef24(0x6ef))return this[_0x18ef24(0x2bf)](0x0);if(_0x3efa0b==='MAXMP')return this[_0x18ef24(0x2bf)](0x1);if(_0x3efa0b===_0x18ef24(0x865))return this[_0x18ef24(0x2bf)](0x2);if(_0x3efa0b===_0x18ef24(0x48e))return this[_0x18ef24(0x2bf)](0x3);if(_0x3efa0b===_0x18ef24(0x417))return this[_0x18ef24(0x2bf)](0x4);if(_0x3efa0b==='MDF')return this['param'](0x5);if(_0x3efa0b==='AGI')return this[_0x18ef24(0x2bf)](0x6);if(_0x3efa0b===_0x18ef24(0x426))return this['param'](0x7);if(_0x3efa0b===_0x18ef24(0x40a))return _0x2b064f?String(Math['round'](this[_0x18ef24(0x6c2)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x3efa0b===_0x18ef24(0x500))return _0x2b064f?String(Math['round'](this[_0x18ef24(0x6c2)](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x3efa0b===_0x18ef24(0x3d9))return _0x2b064f?String(Math[_0x18ef24(0x372)](this['xparam'](0x2)*0x64))+'%':this[_0x18ef24(0x6c2)](0x2);if(_0x3efa0b===_0x18ef24(0x3fb))return _0x2b064f?String(Math[_0x18ef24(0x372)](this['xparam'](0x3)*0x64))+'%':this[_0x18ef24(0x6c2)](0x3);if(_0x3efa0b==='MEV')return _0x2b064f?String(Math[_0x18ef24(0x372)](this[_0x18ef24(0x6c2)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x3efa0b===_0x18ef24(0x324))return _0x2b064f?String(Math[_0x18ef24(0x372)](this[_0x18ef24(0x6c2)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x3efa0b===_0x18ef24(0x81e))return _0x2b064f?String(Math[_0x18ef24(0x372)](this[_0x18ef24(0x6c2)](0x6)*0x64))+'%':this[_0x18ef24(0x6c2)](0x6);if(_0x3efa0b===_0x18ef24(0x644))return _0x2b064f?String(Math[_0x18ef24(0x372)](this[_0x18ef24(0x6c2)](0x7)*0x64))+'%':this[_0x18ef24(0x6c2)](0x7);if(_0x3efa0b===_0x18ef24(0x47a))return _0x2b064f?String(Math[_0x18ef24(0x372)](this['xparam'](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x3efa0b===_0x18ef24(0x26a))return _0x2b064f?String(Math[_0x18ef24(0x372)](this['xparam'](0x9)*0x64))+'%':this[_0x18ef24(0x6c2)](0x9);if(_0x3efa0b==='TGR')return _0x2b064f?String(Math[_0x18ef24(0x372)](this[_0x18ef24(0x48c)](0x0)*0x64))+'%':this[_0x18ef24(0x48c)](0x0);if(_0x3efa0b===_0x18ef24(0x8a0))return _0x2b064f?String(Math[_0x18ef24(0x372)](this[_0x18ef24(0x48c)](0x1)*0x64))+'%':this[_0x18ef24(0x48c)](0x1);if(_0x3efa0b===_0x18ef24(0x718))return _0x2b064f?String(Math['round'](this['sparam'](0x2)*0x64))+'%':this[_0x18ef24(0x48c)](0x2);if(_0x3efa0b===_0x18ef24(0x685))return _0x2b064f?String(Math[_0x18ef24(0x372)](this[_0x18ef24(0x48c)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x3efa0b===_0x18ef24(0x2ae))return _0x2b064f?String(Math['round'](this[_0x18ef24(0x48c)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x3efa0b==='TCR')return _0x2b064f?String(Math[_0x18ef24(0x372)](this[_0x18ef24(0x48c)](0x5)*0x64))+'%':this[_0x18ef24(0x48c)](0x5);if(_0x3efa0b===_0x18ef24(0x2b5))return _0x2b064f?String(Math[_0x18ef24(0x372)](this['sparam'](0x6)*0x64))+'%':this[_0x18ef24(0x48c)](0x6);if(_0x3efa0b===_0x18ef24(0x56b))return _0x2b064f?String(Math[_0x18ef24(0x372)](this[_0x18ef24(0x48c)](0x7)*0x64))+'%':this[_0x18ef24(0x48c)](0x7);if(_0x3efa0b===_0x18ef24(0x73f))return _0x2b064f?String(Math['round'](this[_0x18ef24(0x48c)](0x8)*0x64))+'%':this[_0x18ef24(0x48c)](0x8);if(_0x3efa0b==='EXR')return _0x2b064f?String(Math[_0x18ef24(0x372)](this[_0x18ef24(0x48c)](0x9)*0x64))+'%':this[_0x18ef24(0x48c)](0x9);if(VisuMZ[_0x18ef24(0x370)]['CustomParamAbb'][_0x3efa0b]){if(_0x18ef24(0x772)===_0x18ef24(0x852)){const _0x193044=this[_0x18ef24(0x746)]();let _0x18dd87=_0x566eb2[_0x18ef24(0x85f)];this[_0x18ef24(0x51f)](_0x19776b,_0x193044[0x0]);for(const _0x1af04b of _0x193044){const _0x17ec83=_0x1af04b[_0x18ef24(0x580)]();_0x17ec83>_0x18dd87&&(_0x18dd87=_0x17ec83,this['setAction'](_0x28ead8,_0x1af04b));}}else{const _0x3de995=VisuMZ[_0x18ef24(0x370)][_0x18ef24(0x214)][_0x3efa0b],_0x2e1331=this[_0x3de995];return VisuMZ[_0x18ef24(0x370)][_0x18ef24(0x70e)][_0x3efa0b]===_0x18ef24(0x29a)?_0x2e1331:_0x2b064f?String(Math[_0x18ef24(0x372)](_0x2e1331*0x64))+'%':_0x2e1331;}}return'';},Game_BattlerBase['prototype'][_0x140e58(0x87e)]=function(){const _0x2da197=_0x140e58;return this[_0x2da197(0x4de)]()&&this['_hp']<this['mhp']*VisuMZ[_0x2da197(0x370)][_0x2da197(0x452)][_0x2da197(0x3d3)][_0x2da197(0x7ba)];},Game_Battler[_0x140e58(0x468)][_0x140e58(0x84b)]=function(){const _0x13d1a1=_0x140e58;SoundManager[_0x13d1a1(0xe9)](),this[_0x13d1a1(0x367)]('evade');},VisuMZ['CoreEngine'][_0x140e58(0x6a3)]=Game_Actor[_0x140e58(0x468)][_0x140e58(0x1a8)],Game_Actor['prototype']['paramBase']=function(_0x12a0a){const _0x5d7759=_0x140e58;if(this[_0x5d7759(0x35c)]>0x63)return this['paramBaseAboveLevel99'](_0x12a0a);return VisuMZ[_0x5d7759(0x370)][_0x5d7759(0x6a3)][_0x5d7759(0x129)](this,_0x12a0a);},Game_Actor[_0x140e58(0x468)][_0x140e58(0x1ea)]=function(_0x40559a){const _0x49e1d0=_0x140e58,_0x31e515=this['currentClass']()[_0x49e1d0(0x15d)][_0x40559a][0x63],_0x5453b0=this['currentClass']()[_0x49e1d0(0x15d)][_0x40559a][0x62];return _0x31e515+(_0x31e515-_0x5453b0)*(this[_0x49e1d0(0x35c)]-0x63);},VisuMZ['CoreEngine']['Game_Actor_changeClass']=Game_Actor[_0x140e58(0x468)]['changeClass'],Game_Actor[_0x140e58(0x468)][_0x140e58(0x2ec)]=function(_0x421f67,_0x91dd2b){const _0x206b28=_0x140e58;$gameTemp[_0x206b28(0x597)]=!![],VisuMZ['CoreEngine']['Game_Actor_changeClass']['call'](this,_0x421f67,_0x91dd2b),$gameTemp['_changingClass']=undefined;},VisuMZ['CoreEngine'][_0x140e58(0x6fd)]=Game_Actor['prototype']['levelUp'],Game_Actor[_0x140e58(0x468)][_0x140e58(0x537)]=function(){const _0x4e7d1b=_0x140e58;VisuMZ[_0x4e7d1b(0x370)][_0x4e7d1b(0x6fd)][_0x4e7d1b(0x129)](this);if(!$gameTemp[_0x4e7d1b(0x597)])this[_0x4e7d1b(0x2f2)]();},Game_Actor[_0x140e58(0x468)][_0x140e58(0x2f2)]=function(){const _0x30adc7=_0x140e58;this[_0x30adc7(0x84e)]={};if(VisuMZ[_0x30adc7(0x370)]['Settings'][_0x30adc7(0x1f0)]['LevelUpFullHp'])this[_0x30adc7(0x7eb)]=this['mhp'];if(VisuMZ[_0x30adc7(0x370)][_0x30adc7(0x452)][_0x30adc7(0x1f0)][_0x30adc7(0x6a8)])this['_mp']=this[_0x30adc7(0x50c)];},Game_Actor[_0x140e58(0x468)][_0x140e58(0x14a)]=function(){const _0x42790e=_0x140e58;if(this[_0x42790e(0x690)]())return 0x1;const _0x49223c=this[_0x42790e(0x58d)]()-this[_0x42790e(0x43b)](),_0x49cbbc=this['currentExp']()-this[_0x42790e(0x43b)]();return(_0x49cbbc/_0x49223c)[_0x42790e(0x16b)](0x0,0x1);},Game_Actor['prototype']['traitObjects']=function(){const _0x3051fa=_0x140e58,_0x4c68ad=Game_Battler['prototype'][_0x3051fa(0x770)]['call'](this);for(const _0x3db285 of this[_0x3051fa(0x728)]()){_0x3db285&&(_0x3051fa(0x2a6)===_0x3051fa(0x2a6)?_0x4c68ad[_0x3051fa(0x750)](_0x3db285):(this[_0x3051fa(0x765)]&&this[_0x3051fa(0x765)]['setBackgroundType'](_0x389752[_0x3051fa(0x579)][_0x3051fa(0x6a7)]),this[_0x3051fa(0x140)]&&this[_0x3051fa(0x140)][_0x3051fa(0x67c)](_0x59d8ab[_0x3051fa(0x579)]['GoldBgType']),this['_statusWindow']&&this[_0x3051fa(0xfc)][_0x3051fa(0x67c)](_0x323024[_0x3051fa(0x579)][_0x3051fa(0x176)])));}return _0x4c68ad[_0x3051fa(0x750)](this[_0x3051fa(0x5ac)](),this[_0x3051fa(0x459)]()),_0x4c68ad;},Object[_0x140e58(0x8a8)](Game_Enemy[_0x140e58(0x468)],'level',{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0x140e58(0x468)][_0x140e58(0x113)]=function(){const _0x256732=_0x140e58;return this[_0x256732(0x3e5)]()[_0x256732(0x35c)];},Game_Enemy['prototype']['moveRelativeToResolutionChange']=function(){const _0x27ca76=_0x140e58;if(!this[_0x27ca76(0x5fe)]){if(_0x27ca76(0x47c)!=='DRkub')_0x455797+=_0x4597ef(_0x14f02b);else{this[_0x27ca76(0x3ec)]+=Math[_0x27ca76(0x372)]((Graphics['height']-0x270)/0x2),this[_0x27ca76(0x3ec)]-=Math[_0x27ca76(0x184)]((Graphics[_0x27ca76(0x757)]-Graphics[_0x27ca76(0x6f1)])/0x2);if($gameSystem[_0x27ca76(0x27e)]())this[_0x27ca76(0x1dd)]-=Math[_0x27ca76(0x184)]((Graphics[_0x27ca76(0x3b1)]-Graphics[_0x27ca76(0x754)])/0x2);else{if(_0x27ca76(0x672)===_0x27ca76(0x672))this[_0x27ca76(0x1dd)]+=Math[_0x27ca76(0x372)]((Graphics[_0x27ca76(0x754)]-0x330)/0x2);else return _0x48efc7['ApplyEasing'](_0x37773f,this[_0x27ca76(0x876)]);}}}this[_0x27ca76(0x5fe)]=!![];},Game_Party[_0x140e58(0x468)][_0x140e58(0x159)]=function(){const _0x598030=_0x140e58;return VisuMZ[_0x598030(0x370)][_0x598030(0x452)][_0x598030(0x30f)][_0x598030(0x831)];},VisuMZ[_0x140e58(0x370)]['Game_Party_consumeItem']=Game_Party['prototype'][_0x140e58(0xf0)],Game_Party[_0x140e58(0x468)][_0x140e58(0xf0)]=function(_0x1a5eec){const _0x16115c=_0x140e58;if(VisuMZ[_0x16115c(0x370)][_0x16115c(0x452)]['QoL'][_0x16115c(0x1e2)]&&DataManager[_0x16115c(0x6dd)](_0x1a5eec))return;VisuMZ[_0x16115c(0x370)][_0x16115c(0x6ec)][_0x16115c(0x129)](this,_0x1a5eec);},Game_Party[_0x140e58(0x468)][_0x140e58(0x7f9)]=function(){const _0x16f32a=_0x140e58,_0x151630=VisuMZ[_0x16f32a(0x370)][_0x16f32a(0x452)]['QoL'],_0x1cb37a=_0x151630[_0x16f32a(0x864)]??0x63;let _0x264cff=[];(_0x151630[_0x16f32a(0x47d)]??!![])&&(_0x16f32a(0x796)===_0x16f32a(0x6f7)?_0x2c0393[_0x16f32a(0x186)]&&(this[_0x16f32a(0x5a3)]=_0x16f32a(0x3ea)):_0x264cff=_0x264cff[_0x16f32a(0x732)]($dataItems));if(_0x151630['BTestWeapons']??!![]){if(_0x16f32a(0x1f4)===_0x16f32a(0x87b))return _0xa624bc['CoreEngine'][_0x16f32a(0x452)]['QoL'][_0x16f32a(0x710)]?_0x19668b['CoreEngine'][_0x16f32a(0x819)][_0x16f32a(0x129)](this):!![];else _0x264cff=_0x264cff[_0x16f32a(0x732)]($dataWeapons);}(_0x151630[_0x16f32a(0x2b1)]??!![])&&(_0x264cff=_0x264cff['concat']($dataArmors));for(const _0xfa5b3b of _0x264cff){if(!_0xfa5b3b)continue;if(_0xfa5b3b[_0x16f32a(0x6f8)]['trim']()<=0x0)continue;if(_0xfa5b3b[_0x16f32a(0x6f8)][_0x16f32a(0x461)](/-----/i))continue;this[_0x16f32a(0x4eb)](_0xfa5b3b,_0x1cb37a);}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x4da)]=Game_Troop[_0x140e58(0x468)]['setup'],Game_Troop[_0x140e58(0x468)][_0x140e58(0x843)]=function(_0x328105){const _0x5dced2=_0x140e58;$gameTemp[_0x5dced2(0x29c)](),$gameTemp[_0x5dced2(0x57c)](_0x328105),VisuMZ[_0x5dced2(0x370)][_0x5dced2(0x4da)]['call'](this,_0x328105);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x844)]=Game_Map[_0x140e58(0x468)][_0x140e58(0x843)],Game_Map[_0x140e58(0x468)][_0x140e58(0x843)]=function(_0x1f3574){const _0xb5444c=_0x140e58;VisuMZ[_0xb5444c(0x370)][_0xb5444c(0x844)][_0xb5444c(0x129)](this,_0x1f3574),this[_0xb5444c(0x6bb)](_0x1f3574);},Game_Map[_0x140e58(0x468)]['setupCoreEngine']=function(){const _0x6c00b8=_0x140e58;this['_hideTileShadows']=VisuMZ[_0x6c00b8(0x370)][_0x6c00b8(0x452)][_0x6c00b8(0x1f0)][_0x6c00b8(0x37b)]||![];if($dataMap&&$dataMap[_0x6c00b8(0x51b)]){if($dataMap[_0x6c00b8(0x51b)][_0x6c00b8(0x461)](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];if($dataMap[_0x6c00b8(0x51b)]['match'](/<HIDE TILE SHADOWS>/i))this[_0x6c00b8(0x3cb)]=!![];}},Game_Map[_0x140e58(0x468)][_0x140e58(0x231)]=function(){const _0x2a423e=_0x140e58;if(this[_0x2a423e(0x3cb)]===undefined)this[_0x2a423e(0x6bb)]();return this[_0x2a423e(0x3cb)];},VisuMZ[_0x140e58(0x370)]['Game_Character_processMoveCommand']=Game_Character[_0x140e58(0x468)][_0x140e58(0x41f)],Game_Character[_0x140e58(0x468)]['processMoveCommand']=function(_0x24d44e){const _0x193caf=_0x140e58;try{if(_0x193caf(0x1d0)===_0x193caf(0x1d0))VisuMZ[_0x193caf(0x370)][_0x193caf(0x3fa)]['call'](this,_0x24d44e);else{const _0x42eeaa='_stored_powerUpColor';this[_0x193caf(0x64a)]=this[_0x193caf(0x64a)]||{};if(this[_0x193caf(0x64a)][_0x42eeaa])return this[_0x193caf(0x64a)][_0x42eeaa];const _0x407020=_0x59c1e4['CoreEngine'][_0x193caf(0x452)][_0x193caf(0x543)][_0x193caf(0x454)];return this[_0x193caf(0x45f)](_0x42eeaa,_0x407020);}}catch(_0x3bed52){if($gameTemp['isPlaytest']())console[_0x193caf(0x6be)](_0x3bed52);}},Game_Player[_0x140e58(0x468)][_0x140e58(0x49f)]=function(){const _0x5e2e2c=_0x140e58,_0x20d7a5=$gameMap[_0x5e2e2c(0x49a)]();this[_0x5e2e2c(0x425)]=Math['randomInt'](_0x20d7a5)+Math['randomInt'](_0x20d7a5)+this[_0x5e2e2c(0x607)]();},Game_Player[_0x140e58(0x468)]['encounterStepsMinimum']=function(){const _0x574415=_0x140e58;return $dataMap&&$dataMap[_0x574415(0x51b)]&&$dataMap[_0x574415(0x51b)][_0x574415(0x461)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x574415(0x370)][_0x574415(0x452)][_0x574415(0x1f0)][_0x574415(0x28d)];},VisuMZ[_0x140e58(0x370)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x140e58(0x468)][_0x140e58(0x316)],Game_Event[_0x140e58(0x468)][_0x140e58(0x316)]=function(_0x11904b,_0x49ca6b){const _0x37d9d8=_0x140e58;return this[_0x37d9d8(0x33d)]()?this[_0x37d9d8(0xec)](_0x11904b,_0x49ca6b):VisuMZ[_0x37d9d8(0x370)][_0x37d9d8(0x440)][_0x37d9d8(0x129)](this,_0x11904b,_0x49ca6b);},Game_Event[_0x140e58(0x468)]['isSmartEventCollisionOn']=function(){const _0x277ed5=_0x140e58;return VisuMZ[_0x277ed5(0x370)][_0x277ed5(0x452)][_0x277ed5(0x1f0)]['SmartEventCollisionPriority'];},Game_Event[_0x140e58(0x468)][_0x140e58(0xec)]=function(_0x2c2e43,_0x133c37){const _0x5b3224=_0x140e58;if(!this[_0x5b3224(0x44e)]())return![];else{if('aedOY'!==_0x5b3224(0x492)){const _0x21c4d3=_0x5648c4[_0x5b3224(0x370)][_0x5b3224(0x452)][_0x5b3224(0x227)],_0x14a5a3=_0x21c4d3[_0x5b3224(0x4ec)],_0x2933e0=this[_0x5b3224(0x37a)](_0xd5303d),_0x27c8b2=this[_0x5b3224(0x37a)](_0xbe2bc8);return _0x14a5a3[_0x5b3224(0x722)](_0x2933e0,_0x27c8b2);}else{const _0x49f921=$gameMap['eventsXyNt'](_0x2c2e43,_0x133c37)[_0x5b3224(0x6b3)](_0x5aac78=>_0x5aac78['isNormalPriority']());return _0x49f921[_0x5b3224(0x4d7)]>0x0;}}},VisuMZ[_0x140e58(0x370)]['Game_Interpreter_command105']=Game_Interpreter['prototype'][_0x140e58(0x24f)],Game_Interpreter[_0x140e58(0x468)][_0x140e58(0x24f)]=function(_0x3ac29f){const _0x1604f1=_0x140e58,_0x183cf8=this['getCombinedScrollingText']();if(_0x183cf8['match'](/\/\/[ ]SCRIPT[ ]CALL/i)){if('wtVuF'===_0x1604f1(0x534))return this[_0x1604f1(0x6b9)](_0x183cf8);else for(const _0x77d8e5 of _0xa85bcc[_0x1604f1(0x333)]){_0x77d8e5[_0x1604f1(0x51b)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x77d8e5[_0x1604f1(0x35c)]=_0x1c7781[_0x1604f1(0x1d1)](_0x4db440(_0x290187['$1']),0x1));}}else return VisuMZ[_0x1604f1(0x370)][_0x1604f1(0x63c)][_0x1604f1(0x129)](this,_0x3ac29f);},Game_Interpreter[_0x140e58(0x468)][_0x140e58(0x217)]=function(){const _0x4a8409=_0x140e58;let _0x103283='',_0x359ee4=this['_index']+0x1;while(this['_list'][_0x359ee4]&&this['_list'][_0x359ee4][_0x4a8409(0x413)]===0x195){_0x103283+=this['_list'][_0x359ee4]['parameters'][0x0]+'\x0a',_0x359ee4++;}return _0x103283;},Game_Interpreter[_0x140e58(0x468)]['runCombinedScrollingTextAsCode']=function(_0x20a716){const _0x3f7f40=_0x140e58;try{eval(_0x20a716);}catch(_0x1e1e3b){$gameTemp[_0x3f7f40(0x4c1)]()&&(_0x3f7f40(0x17a)!==_0x3f7f40(0x17a)?_0x4a3e42['se'][_0x3f7f40(0x486)]=0x0:(console[_0x3f7f40(0x6be)](_0x3f7f40(0x2a5)),console[_0x3f7f40(0x6be)](_0x1e1e3b)));}return!![];},VisuMZ[_0x140e58(0x370)][_0x140e58(0x6b5)]=Game_Interpreter['prototype']['command111'],Game_Interpreter['prototype']['command111']=function(_0x1815b8){const _0x22814f=_0x140e58;try{VisuMZ[_0x22814f(0x370)]['Game_Interpreter_command111'][_0x22814f(0x129)](this,_0x1815b8);}catch(_0x4d78f1){if('TUmLB'===_0x22814f(0x321)){const _0x529d6e=_0x6f58e5[_0x22814f(0x49a)]();this[_0x22814f(0x425)]=_0x552380[_0x22814f(0x2f7)](_0x529d6e)+_0x539fc4[_0x22814f(0x2f7)](_0x529d6e)+this[_0x22814f(0x607)]();}else{if($gameTemp[_0x22814f(0x4c1)]()){if(_0x22814f(0x355)===_0x22814f(0x355))console[_0x22814f(0x6be)](_0x22814f(0x661)),console[_0x22814f(0x6be)](_0x4d78f1);else{if(this['_mode']===_0x22814f(0x5a4)&&!_0x2cb512[_0x22814f(0x5b5)]())return;if(_0x10401d[_0x22814f(0x1cb)]())return;_0x40213c[_0x22814f(0x370)][_0x22814f(0x701)][_0x22814f(0x129)](this,_0x2c93a1),this[_0x22814f(0x1b2)](_0x22814f(0x6e0));}}this[_0x22814f(0x7bd)]();}}return!![];},VisuMZ[_0x140e58(0x370)][_0x140e58(0x76c)]=Game_Interpreter['prototype'][_0x140e58(0x79a)],Game_Interpreter[_0x140e58(0x468)]['command122']=function(_0x3e58a0){const _0xca221c=_0x140e58;try{_0xca221c(0x801)===_0xca221c(0x801)?VisuMZ[_0xca221c(0x370)][_0xca221c(0x76c)][_0xca221c(0x129)](this,_0x3e58a0):this[_0xca221c(0x717)]();}catch(_0x43d01e){$gameTemp[_0xca221c(0x4c1)]()&&(console[_0xca221c(0x6be)](_0xca221c(0x504)),console[_0xca221c(0x6be)](_0x43d01e));}return!![];},VisuMZ['CoreEngine'][_0x140e58(0x50a)]=Game_Interpreter[_0x140e58(0x468)][_0x140e58(0x621)],Game_Interpreter[_0x140e58(0x468)][_0x140e58(0x621)]=function(){const _0x527089=_0x140e58;try{VisuMZ[_0x527089(0x370)]['Game_Interpreter_command355']['call'](this);}catch(_0x2f8584){$gameTemp['isPlaytest']()&&('wHwCo'!==_0x527089(0x4b0)?(console[_0x527089(0x6be)](_0x527089(0x6dc)),console[_0x527089(0x6be)](_0x2f8584)):(_0x3cc194>=_0x12ef07||_0x5ece14&&_0x9d91c4===0x1)&&this['smoothSelect']((_0x209c42-_0x19cb95+_0x5eb436)%_0x359971));}return!![];},VisuMZ['CoreEngine'][_0x140e58(0x11b)]=Game_Interpreter[_0x140e58(0x468)][_0x140e58(0x5d9)],Game_Interpreter[_0x140e58(0x468)]['command357']=function(_0x46cf4e){const _0x24b432=_0x140e58;return $gameTemp[_0x24b432(0x3eb)](this),VisuMZ[_0x24b432(0x370)]['Game_Interpreter_PluginCommand']['call'](this,_0x46cf4e);},Scene_Base[_0x140e58(0x468)][_0x140e58(0x358)]=function(){const _0x112f79=_0x140e58;return VisuMZ[_0x112f79(0x370)][_0x112f79(0x452)]['UI'][_0x112f79(0x237)];},Scene_Base[_0x140e58(0x468)]['isBottomHelpMode']=function(){const _0x479490=_0x140e58;return VisuMZ[_0x479490(0x370)][_0x479490(0x452)]['UI']['BottomHelp'];},Scene_Base['prototype']['isBottomButtonMode']=function(){const _0x37b834=_0x140e58;return VisuMZ[_0x37b834(0x370)][_0x37b834(0x452)]['UI'][_0x37b834(0x5c2)];},Scene_Base[_0x140e58(0x468)][_0x140e58(0x628)]=function(){const _0xafc857=_0x140e58;return VisuMZ[_0xafc857(0x370)][_0xafc857(0x452)]['UI'][_0xafc857(0x428)];},Scene_Base[_0x140e58(0x468)][_0x140e58(0x5d1)]=function(){const _0x1c3649=_0x140e58;return VisuMZ['CoreEngine'][_0x1c3649(0x452)]['UI'][_0x1c3649(0xfd)];},Scene_Base[_0x140e58(0x468)][_0x140e58(0x4ac)]=function(){const _0x5f2a7d=_0x140e58;return VisuMZ[_0x5f2a7d(0x370)][_0x5f2a7d(0x452)]['UI'][_0x5f2a7d(0x1e3)];},Scene_Base[_0x140e58(0x468)][_0x140e58(0x4fc)]=function(){const _0x2d492e=_0x140e58;return VisuMZ['CoreEngine'][_0x2d492e(0x452)][_0x2d492e(0x7ad)][_0x2d492e(0x4f1)];},VisuMZ[_0x140e58(0x370)][_0x140e58(0x242)]=Scene_Base[_0x140e58(0x468)][_0x140e58(0x1e4)],Scene_Base[_0x140e58(0x468)][_0x140e58(0x1e4)]=function(){const _0x57b146=_0x140e58;VisuMZ['CoreEngine'][_0x57b146(0x242)][_0x57b146(0x129)](this),this[_0x57b146(0x4bf)](),this['_windowLayer']['x']=Math[_0x57b146(0x372)](this[_0x57b146(0x4cf)]['x']),this[_0x57b146(0x4cf)]['y']=Math[_0x57b146(0x372)](this[_0x57b146(0x4cf)]['y']);},Scene_Base[_0x140e58(0x468)]['createButtonAssistWindow']=function(){},Scene_Base['prototype'][_0x140e58(0x77a)]=function(){const _0x3f786f=_0x140e58;return TextManager[_0x3f786f(0x11e)](_0x3f786f(0x5b1),_0x3f786f(0x627));},Scene_Base[_0x140e58(0x468)][_0x140e58(0x51d)]=function(){const _0x164813=_0x140e58;return TextManager[_0x164813(0x37a)](_0x164813(0x162));},Scene_Base[_0x140e58(0x468)]['buttonAssistKey3']=function(){const _0x13cda5=_0x140e58;return TextManager['getInputButtonString'](_0x13cda5(0xd7));},Scene_Base['prototype'][_0x140e58(0x4a6)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x140e58(0x468)][_0x140e58(0x4ed)]=function(){return TextManager['getInputButtonString']('cancel');},Scene_Base[_0x140e58(0x468)]['buttonAssistText1']=function(){const _0x5023d5=_0x140e58;if(this[_0x5023d5(0x19e)]&&this[_0x5023d5(0x19e)][_0x5023d5(0x111)]){if(_0x5023d5(0x31e)==='kcbCy')return TextManager[_0x5023d5(0x380)];else{if(this[_0x5023d5(0x6f2)]===_0x40c964)this['initCoreEngine']();this['_CoreEngineSettings'][_0x5023d5(0x82b)]=this[_0x5023d5(0x118)]();}}else return _0x5023d5(0x34a)==='CVacX'?'':this[_0x5023d5(0x8a1)]&&this[_0x5023d5(0x8a1)][_0x5023d5(0x4fd)]===_0x3257b0;},Scene_Base[_0x140e58(0x468)]['buttonAssistText2']=function(){return'';},Scene_Base['prototype'][_0x140e58(0x633)]=function(){return'';},Scene_Base[_0x140e58(0x468)][_0x140e58(0x290)]=function(){const _0x125452=_0x140e58;return TextManager[_0x125452(0x664)];},Scene_Base[_0x140e58(0x468)]['buttonAssistText5']=function(){const _0x25cd74=_0x140e58;return TextManager[_0x25cd74(0x3bd)];},Scene_Base[_0x140e58(0x468)][_0x140e58(0x684)]=function(){return 0x0;},Scene_Base[_0x140e58(0x468)][_0x140e58(0x5bf)]=function(){return 0x0;},Scene_Base[_0x140e58(0x468)][_0x140e58(0x3ef)]=function(){return 0x0;},Scene_Base[_0x140e58(0x468)][_0x140e58(0x40c)]=function(){return 0x0;},Scene_Base[_0x140e58(0x468)][_0x140e58(0x54e)]=function(){return 0x0;},VisuMZ['CoreEngine']['Scene_Boot_loadSystemImages']=Scene_Boot[_0x140e58(0x468)]['loadSystemImages'],Scene_Boot['prototype'][_0x140e58(0x349)]=function(){const _0x1a39e1=_0x140e58;VisuMZ[_0x1a39e1(0x370)][_0x1a39e1(0x52c)][_0x1a39e1(0x129)](this),this[_0x1a39e1(0x2d9)]();},Scene_Boot['prototype']['loadGameImagesCoreEngine']=function(){const _0x560873=_0x140e58,_0x2b79b0=[_0x560873(0x22c),_0x560873(0x606),_0x560873(0x4f2),_0x560873(0xf3),'enemies',_0x560873(0x47b),_0x560873(0x6c7),_0x560873(0x12c),_0x560873(0x67b),_0x560873(0x48a),_0x560873(0x197),_0x560873(0x766),_0x560873(0x1f8),_0x560873(0x6e7)];for(const _0x2a374d of _0x2b79b0){const _0x391ba3=VisuMZ[_0x560873(0x370)][_0x560873(0x452)][_0x560873(0x3f0)][_0x2a374d],_0xd194d8='img/%1/'[_0x560873(0x722)](_0x2a374d);for(const _0x3caa4d of _0x391ba3){_0x560873(0x24e)!==_0x560873(0x17d)?ImageManager[_0x560873(0x1d5)](_0xd194d8,_0x3caa4d):(_0xb3012f[_0x560873(0x122)](),_0x1659f0['removeChild'](_0x3c07fd[_0x560873(0x389)]),_0x51a775[_0x560873(0x389)]=_0x147b0e);}}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x4ad)]=Scene_Boot[_0x140e58(0x468)][_0x140e58(0xc9)],Scene_Boot[_0x140e58(0x468)][_0x140e58(0xc9)]=function(){const _0x375a6b=_0x140e58;Utils[_0x375a6b(0x720)](_0x375a6b(0x1df))&&VisuMZ[_0x375a6b(0x370)]['Settings'][_0x375a6b(0x1f0)][_0x375a6b(0x28e)]?this['startAutoNewGame']():VisuMZ['CoreEngine'][_0x375a6b(0x4ad)][_0x375a6b(0x129)](this);},Scene_Boot['prototype'][_0x140e58(0x625)]=function(){const _0x36a69b=_0x140e58;DataManager[_0x36a69b(0x424)](),SceneManager[_0x36a69b(0x7f2)](Scene_Map);},Scene_Boot['prototype']['adjustBoxSize']=function(){const _0x277c11=_0x140e58,_0x2f0600=$dataSystem['advanced'][_0x277c11(0x360)],_0x90ed7d=$dataSystem[_0x277c11(0x7a4)][_0x277c11(0x223)],_0x338bf7=VisuMZ[_0x277c11(0x370)][_0x277c11(0x452)]['UI']['BoxMargin'];Graphics[_0x277c11(0x754)]=_0x2f0600-_0x338bf7*0x2,Graphics['boxHeight']=_0x90ed7d-_0x338bf7*0x2,this[_0x277c11(0x2e9)]();},VisuMZ[_0x140e58(0x370)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x140e58(0x468)][_0x140e58(0x1b4)],Scene_Boot[_0x140e58(0x468)][_0x140e58(0x1b4)]=function(){const _0x13b1f1=_0x140e58;if(this['isFullDocumentTitle']())'mGKgP'===_0x13b1f1(0x31b)?(_0x438005[_0x13b1f1(0x6be)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),_0x15e06a[_0x13b1f1(0x6be)](_0x290d4a)):this['makeDocumentTitle']();else{if(_0x13b1f1(0x3ad)===_0x13b1f1(0x776)){var _0x2716bd=_0x2aa6b6(_0x199c35['$1']);_0x543782+=_0x2716bd;}else VisuMZ[_0x13b1f1(0x370)][_0x13b1f1(0x2be)][_0x13b1f1(0x129)](this);}},Scene_Boot['prototype'][_0x140e58(0x60b)]=function(){const _0x49ced0=_0x140e58;if(Scene_Title[_0x49ced0(0x2e8)]==='')return![];if(Scene_Title[_0x49ced0(0x2e8)]===_0x49ced0(0x794))return![];if(Scene_Title[_0x49ced0(0x51e)]==='')return![];if(Scene_Title[_0x49ced0(0x51e)]===_0x49ced0(0x1de))return![];return!![];},Scene_Boot['prototype'][_0x140e58(0x552)]=function(){const _0x1ceb51=_0x140e58,_0x2a625f=$dataSystem[_0x1ceb51(0x1a3)],_0x3227bc=Scene_Title[_0x1ceb51(0x2e8)]||'',_0x2578a9=Scene_Title[_0x1ceb51(0x51e)]||'',_0x495a1f=VisuMZ[_0x1ceb51(0x370)][_0x1ceb51(0x452)]['MenuLayout'][_0x1ceb51(0x3dc)][_0x1ceb51(0x4d3)],_0x3e4c83=_0x495a1f[_0x1ceb51(0x722)](_0x2a625f,_0x3227bc,_0x2578a9);document[_0x1ceb51(0x1da)]=_0x3e4c83;},Scene_Boot[_0x140e58(0x468)][_0x140e58(0x2e9)]=function(){const _0x459726=_0x140e58;if(VisuMZ[_0x459726(0x370)][_0x459726(0x452)]['UI'][_0x459726(0x14e)]){const _0x2367ff=Graphics[_0x459726(0x3b1)]-Graphics[_0x459726(0x754)]-VisuMZ['CoreEngine'][_0x459726(0x452)]['UI'][_0x459726(0x815)]*0x2,_0x3fb40=Sprite_Button[_0x459726(0x468)][_0x459726(0x5d7)][_0x459726(0x129)](this)*0x4;if(_0x2367ff>=_0x3fb40)SceneManager[_0x459726(0x136)](!![]);}},Scene_Title['subtitle']=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)]['MenuLayout'][_0x140e58(0x3dc)]['Subtitle'],Scene_Title[_0x140e58(0x51e)]=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)][_0x140e58(0x505)]['Title']['Version'],Scene_Title[_0x140e58(0x694)]=VisuMZ[_0x140e58(0x370)]['Settings'][_0x140e58(0x265)],VisuMZ[_0x140e58(0x370)][_0x140e58(0x4e7)]=Scene_Title[_0x140e58(0x468)]['drawGameTitle'],Scene_Title[_0x140e58(0x468)][_0x140e58(0x4ef)]=function(){const _0x4b6f56=_0x140e58;VisuMZ[_0x4b6f56(0x370)][_0x4b6f56(0x452)][_0x4b6f56(0x505)]['Title'][_0x4b6f56(0x4ef)][_0x4b6f56(0x129)](this);if(Scene_Title[_0x4b6f56(0x2e8)]!==''&&Scene_Title[_0x4b6f56(0x2e8)]!==_0x4b6f56(0x794))this[_0x4b6f56(0x6a2)]();if(Scene_Title[_0x4b6f56(0x51e)]!==''&&Scene_Title[_0x4b6f56(0x51e)]!==_0x4b6f56(0x1de))this[_0x4b6f56(0x469)]();},Scene_Title[_0x140e58(0x468)][_0x140e58(0x6a2)]=function(){const _0x13ab60=_0x140e58;VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x13ab60(0x3dc)][_0x13ab60(0x6a2)][_0x13ab60(0x129)](this);},Scene_Title[_0x140e58(0x468)][_0x140e58(0x469)]=function(){const _0x134d63=_0x140e58;VisuMZ[_0x134d63(0x370)]['Settings'][_0x134d63(0x505)]['Title'][_0x134d63(0x469)][_0x134d63(0x129)](this);},Scene_Title[_0x140e58(0x468)][_0x140e58(0x38d)]=function(){const _0x4867b1=_0x140e58;this[_0x4867b1(0x410)]();const _0x48007f=$dataSystem[_0x4867b1(0x1ce)][_0x4867b1(0x83d)],_0x24c473=this['commandWindowRect']();this[_0x4867b1(0x765)]=new Window_TitleCommand(_0x24c473),this[_0x4867b1(0x765)][_0x4867b1(0x67c)](_0x48007f);const _0x13bd7d=this[_0x4867b1(0x6fa)]();this[_0x4867b1(0x765)]['move'](_0x13bd7d['x'],_0x13bd7d['y'],_0x13bd7d[_0x4867b1(0x3b1)],_0x13bd7d[_0x4867b1(0x757)]),this[_0x4867b1(0x5a5)](this['_commandWindow']);},Scene_Title['prototype'][_0x140e58(0x325)]=function(){const _0x61fdc9=_0x140e58;return this['_commandWindow']?this['_commandWindow']['maxItems']():VisuMZ[_0x61fdc9(0x370)][_0x61fdc9(0x452)][_0x61fdc9(0x561)][_0x61fdc9(0x4d7)];},Scene_Title['prototype'][_0x140e58(0x6fa)]=function(){const _0x229f48=_0x140e58;return VisuMZ[_0x229f48(0x370)][_0x229f48(0x452)][_0x229f48(0x505)][_0x229f48(0x3dc)][_0x229f48(0x279)]['call'](this);},Scene_Title[_0x140e58(0x468)]['createTitleButtons']=function(){const _0x4a5490=_0x140e58;for(const _0x4c1b7d of Scene_Title['pictureButtons']){const _0x18fd19=new Sprite_TitlePictureButton(_0x4c1b7d);this[_0x4a5490(0x837)](_0x18fd19);}},VisuMZ[_0x140e58(0x370)]['Scene_Map_initialize']=Scene_Map[_0x140e58(0x468)][_0x140e58(0x2cd)],Scene_Map[_0x140e58(0x468)]['initialize']=function(){const _0x186b3e=_0x140e58;VisuMZ[_0x186b3e(0x370)]['Scene_Map_initialize'][_0x186b3e(0x129)](this),$gameTemp[_0x186b3e(0x29c)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x6af)]=Scene_Map[_0x140e58(0x468)]['updateMainMultiply'],Scene_Map[_0x140e58(0x468)][_0x140e58(0x317)]=function(){const _0xed91ce=_0x140e58;VisuMZ[_0xed91ce(0x370)][_0xed91ce(0x6af)][_0xed91ce(0x129)](this),$gameTemp[_0xed91ce(0x723)]&&!$gameMessage[_0xed91ce(0x156)]()&&(this[_0xed91ce(0x663)](),SceneManager[_0xed91ce(0x19c)]());},Scene_Map[_0x140e58(0x468)][_0x140e58(0x2b6)]=function(){const _0x1252de=_0x140e58;Scene_Message['prototype']['terminate'][_0x1252de(0x129)](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x1252de(0x5be)][_0x1252de(0x8b3)](),this[_0x1252de(0x165)][_0x1252de(0x373)](),this['_windowLayer'][_0x1252de(0x111)]=![],SceneManager[_0x1252de(0x496)]()),$gameScreen['clearZoom'](),this[_0x1252de(0x6d3)]();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x135)]=Scene_Map[_0x140e58(0x468)]['createMenuButton'],Scene_Map[_0x140e58(0x468)]['createMenuButton']=function(){const _0x504bb6=_0x140e58;VisuMZ[_0x504bb6(0x370)][_0x504bb6(0x135)][_0x504bb6(0x129)](this),SceneManager[_0x504bb6(0x888)]()&&(_0x504bb6(0x43f)===_0x504bb6(0x41b)?this[_0x504bb6(0x653)][_0x504bb6(0x67c)](_0x5a4bf7[_0x504bb6(0x579)][_0x504bb6(0x4f6)]):this[_0x504bb6(0x849)]());},Scene_Map[_0x140e58(0x468)][_0x140e58(0x849)]=function(){const _0x298f2d=_0x140e58;this[_0x298f2d(0x429)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x3cd)]=Scene_Map[_0x140e58(0x468)]['updateScene'],Scene_Map[_0x140e58(0x468)][_0x140e58(0x16a)]=function(){const _0x7385cd=_0x140e58;VisuMZ[_0x7385cd(0x370)][_0x7385cd(0x3cd)]['call'](this),this[_0x7385cd(0x285)](),this['updateOnceParallelInterpreters']();},Scene_Map['prototype']['updateDashToggle']=function(){const _0x525659=_0x140e58;Input['isTriggered']('dashToggle')&&(ConfigManager[_0x525659(0x331)]=!ConfigManager['alwaysDash'],ConfigManager[_0x525659(0x42e)]());},Scene_Map[_0x140e58(0x468)][_0x140e58(0x6d3)]=function(){const _0x11cd5d=_0x140e58;this[_0x11cd5d(0x8a4)]=[];},Scene_Map[_0x140e58(0x468)]['updateOnceParallelInterpreters']=function(){const _0x3ed60b=_0x140e58;if(!this[_0x3ed60b(0x8a4)])return;for(const _0x4034de of this[_0x3ed60b(0x8a4)]){_0x4034de&&_0x4034de['update']();}},Scene_Map[_0x140e58(0x468)][_0x140e58(0x65e)]=function(_0x6ea3b4){const _0x22f845=_0x140e58,_0x4b539d=$dataCommonEvents[_0x6ea3b4];if(!_0x4b539d)return;const _0x4a2fdf=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x4a2fdf),_0x4a2fdf[_0x22f845(0x562)](_0x6ea3b4);},Scene_Map[_0x140e58(0x468)][_0x140e58(0x56d)]=function(_0x498cd6){const _0x3e1519=_0x140e58;this[_0x3e1519(0x8a4)]=this[_0x3e1519(0x8a4)]||[],this['_onceParallelInterpreters'][_0x3e1519(0x750)](_0x498cd6);},Scene_Map[_0x140e58(0x468)][_0x140e58(0xf9)]=function(_0x9152de){const _0x43c302=_0x140e58;this[_0x43c302(0x8a4)]=this[_0x43c302(0x8a4)]||[],this[_0x43c302(0x8a4)][_0x43c302(0x2fe)](_0x9152de);};function Game_OnceParallelInterpreter(){this['initialize'](...arguments);}Game_OnceParallelInterpreter[_0x140e58(0x468)]=Object['create'](Game_Interpreter['prototype']),Game_OnceParallelInterpreter[_0x140e58(0x468)][_0x140e58(0x4fd)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x140e58(0x562)]=function(_0x23a8de){const _0x394891=_0x140e58,_0x58c099=$dataCommonEvents[_0x23a8de];_0x58c099?this['setup'](_0x58c099[_0x394891(0x351)],0x0):this[_0x394891(0x2b6)]();},Game_OnceParallelInterpreter[_0x140e58(0x468)][_0x140e58(0x2b6)]=function(){const _0x5c3d67=_0x140e58;if(!SceneManager[_0x5c3d67(0x60d)]())return;SceneManager['_scene'][_0x5c3d67(0xf9)](this),Game_Interpreter[_0x5c3d67(0x468)][_0x5c3d67(0x2b6)][_0x5c3d67(0x129)](this);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x371)]=Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x12f)],Scene_MenuBase[_0x140e58(0x468)]['helpAreaTop']=function(){const _0x538d9a=_0x140e58;let _0x106336=0x0;if(SceneManager[_0x538d9a(0x87c)]())_0x106336=this['helpAreaTopSideButtonLayout']();else{if(_0x538d9a(0x495)!==_0x538d9a(0x76b))_0x106336=VisuMZ['CoreEngine']['Scene_MenuBase_helpAreaTop'][_0x538d9a(0x129)](this);else return _0x3c02a4[_0x538d9a(0x579)]['HelpRect'][_0x538d9a(0x129)](this);}return this[_0x538d9a(0x726)]()&&this[_0x538d9a(0x1e6)]()===_0x538d9a(0x675)&&(_0x538d9a(0x688)===_0x538d9a(0x688)?_0x106336+=Window_ButtonAssist[_0x538d9a(0x468)][_0x538d9a(0x172)]():this[_0x538d9a(0x5a3)]=0x1),_0x106336;},Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x558)]=function(){const _0x3d61ad=_0x140e58;if(this[_0x3d61ad(0x11f)]())return this[_0x3d61ad(0x64d)]();else{if(_0x3d61ad(0x853)!==_0x3d61ad(0x853))_0x408d4c=_0x475f99['concat'](_0x255904);else return 0x0;}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x1a1)]=Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x6c8)],Scene_MenuBase[_0x140e58(0x468)]['mainAreaTop']=function(){const _0x1e16f4=_0x140e58;if(SceneManager[_0x1e16f4(0x87c)]())return this[_0x1e16f4(0x1b0)]();else{if('lyBKk'!==_0x1e16f4(0x855))return VisuMZ[_0x1e16f4(0x370)][_0x1e16f4(0x1a1)]['call'](this);else{if(_0x1bf013&&_0x2d323e[_0x1e16f4(0x49e)]){if(this[_0x1e16f4(0x296)](_0x2fb97d))return!![];}}}},Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x1b0)]=function(){const _0x1495b4=_0x140e58;return!this[_0x1495b4(0x11f)]()?this[_0x1495b4(0x443)]():0x0;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x183)]=Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x493)],Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x493)]=function(){const _0x2dbc82=_0x140e58;let _0xcc5f02=0x0;return SceneManager[_0x2dbc82(0x87c)]()?_0x2dbc82(0x4c6)!==_0x2dbc82(0x2eb)?_0xcc5f02=this['mainAreaHeightSideButtonLayout']():_0x4b1e33*=_0x2d970d(_0x5ed44f):_0x2dbc82(0x1b1)!==_0x2dbc82(0x76d)?_0xcc5f02=VisuMZ[_0x2dbc82(0x370)][_0x2dbc82(0x183)]['call'](this):this[_0x2dbc82(0x3a5)]='SV',this[_0x2dbc82(0x726)]()&&this['getButtonAssistLocation']()!==_0x2dbc82(0x714)&&(_0xcc5f02-=Window_ButtonAssist[_0x2dbc82(0x468)]['lineHeight']()),_0xcc5f02;},Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x2db)]=function(){const _0x59935b=_0x140e58;return Graphics[_0x59935b(0x6f1)]-this[_0x59935b(0x488)]();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x583)]=Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x392)],Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x392)]=function(){const _0x3f6f8e=_0x140e58;this['_backgroundFilter']=new PIXI[(_0x3f6f8e(0x4e2))]['BlurFilter'](clamp=!![]),this[_0x3f6f8e(0x866)]=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager['backgroundBitmap'](),this[_0x3f6f8e(0x866)]['filters']=[this[_0x3f6f8e(0x863)]],this[_0x3f6f8e(0x837)](this['_backgroundSprite']),this[_0x3f6f8e(0x2e0)](0xc0),this['setBackgroundOpacity'](this[_0x3f6f8e(0x8b2)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x8b2)]=function(){const _0x3ccd01=_0x140e58,_0x1f6c5c=String(this['constructor']['name']),_0x41ad7d=this[_0x3ccd01(0x3a1)](_0x1f6c5c);if(_0x41ad7d){if(_0x3ccd01(0x2b7)===_0x3ccd01(0x3c0))_0x2a4f71[_0x3ccd01(0x7f3)]&&(this['_forcedBattleSys']=_0x3ccd01(0x7da));else return _0x41ad7d[_0x3ccd01(0x255)];}else return 0xc0;},Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x681)]=function(){const _0x3a66c6=_0x140e58,_0x25094f=String(this[_0x3a66c6(0x4fd)][_0x3a66c6(0x6f8)]),_0x3503dd=this[_0x3a66c6(0x3a1)](_0x25094f);_0x3503dd&&(_0x3503dd[_0x3a66c6(0x84a)]!==''||_0x3503dd['BgFilename2']!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x3a66c6(0x7e8)](_0x3503dd[_0x3a66c6(0x84a)])),this[_0x3a66c6(0x603)]=new Sprite(ImageManager['loadTitle2'](_0x3503dd['BgFilename2'])),this[_0x3a66c6(0x837)](this['_backSprite1']),this[_0x3a66c6(0x837)](this[_0x3a66c6(0x603)]),this[_0x3a66c6(0x334)][_0x3a66c6(0x78a)][_0x3a66c6(0x1f2)](this[_0x3a66c6(0x22e)][_0x3a66c6(0xfe)](this,this[_0x3a66c6(0x334)])),this['_backSprite2'][_0x3a66c6(0x78a)]['addLoadListener'](this[_0x3a66c6(0x22e)][_0x3a66c6(0xfe)](this,this['_backSprite2'])));},Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x3a1)]=function(_0x14004d){const _0x4f14b2=_0x140e58;return VisuMZ['CoreEngine'][_0x4f14b2(0x452)][_0x4f14b2(0xd4)][_0x14004d]||VisuMZ[_0x4f14b2(0x370)][_0x4f14b2(0x452)][_0x4f14b2(0xd4)]['Scene_Unlisted'];},Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x22e)]=function(_0x3dd3eb){const _0x3fabe1=_0x140e58;this[_0x3fabe1(0x59c)](_0x3dd3eb),this[_0x3fabe1(0x5ed)](_0x3dd3eb);},VisuMZ[_0x140e58(0x370)]['Scene_MenuBase_createCancelButton']=Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0xc3)],Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0xc3)]=function(){const _0x599f81=_0x140e58;VisuMZ['CoreEngine'][_0x599f81(0x4f4)][_0x599f81(0x129)](this),SceneManager[_0x599f81(0x888)]()&&(_0x599f81(0x7d9)==='RnnRP'?this[_0x599f81(0x659)]():this[_0x599f81(0x652)](_0x5221b4[_0x599f81(0x709)](_0x599f81(0x3ce))));},Scene_MenuBase['prototype'][_0x140e58(0x659)]=function(){const _0x187f1c=_0x140e58;this[_0x187f1c(0x302)]['x']=Graphics[_0x187f1c(0x754)]+0x4;},VisuMZ['CoreEngine'][_0x140e58(0x3f5)]=Scene_MenuBase['prototype'][_0x140e58(0x3fd)],Scene_MenuBase[_0x140e58(0x468)]['createPageButtons']=function(){const _0x65d812=_0x140e58;VisuMZ[_0x65d812(0x370)]['Scene_MenuBase_createPageButtons'][_0x65d812(0x129)](this),SceneManager[_0x65d812(0x888)]()&&this[_0x65d812(0x717)]();},Scene_MenuBase['prototype'][_0x140e58(0x717)]=function(){const _0x569a54=_0x140e58;this[_0x569a54(0x19e)]['x']=-0x1*(this['_pageupButton'][_0x569a54(0x3b1)]+this['_pagedownButton'][_0x569a54(0x3b1)]+0x8),this['_pagedownButton']['x']=-0x1*(this['_pagedownButton'][_0x569a54(0x3b1)]+0x4);},Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x726)]=function(){const _0x438511=_0x140e58;return VisuMZ[_0x438511(0x370)][_0x438511(0x452)][_0x438511(0x227)][_0x438511(0x14f)];},Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x1e6)]=function(){const _0x1e71ef=_0x140e58;if(SceneManager[_0x1e71ef(0x888)]()||SceneManager['areButtonsHidden']())return VisuMZ[_0x1e71ef(0x370)][_0x1e71ef(0x452)][_0x1e71ef(0x227)][_0x1e71ef(0x3b8)];else{if(_0x1e71ef(0x759)===_0x1e71ef(0x759))return _0x1e71ef(0x714);else this[_0x1e71ef(0x5a3)]=_0x1e71ef(0x660);}},Scene_MenuBase[_0x140e58(0x468)]['createButtonAssistWindow']=function(){const _0xbfc6ae=_0x140e58;if(!this[_0xbfc6ae(0x726)]())return;const _0x30f6b9=this[_0xbfc6ae(0x5f7)]();this[_0xbfc6ae(0x4a7)]=new Window_ButtonAssist(_0x30f6b9),this[_0xbfc6ae(0x5a5)](this['_buttonAssistWindow']);},Scene_MenuBase[_0x140e58(0x468)][_0x140e58(0x5f7)]=function(){const _0x414ff1=_0x140e58;return this[_0x414ff1(0x1e6)]()===_0x414ff1(0x714)?this[_0x414ff1(0x6ba)]():'RDxVK'!==_0x414ff1(0x729)?this[_0x414ff1(0x33e)]():_0x539b5e[_0x414ff1(0x370)]['Settings']['Color'][_0x414ff1(0x42f)];},Scene_MenuBase['prototype']['buttonAssistWindowButtonRect']=function(){const _0x1f4715=_0x140e58,_0x2cb666=ConfigManager['touchUI']?(Sprite_Button[_0x1f4715(0x468)][_0x1f4715(0x5d7)]()+0x6)*0x2:0x0,_0x1f1bba=this[_0x1f4715(0x5f1)](),_0x13efab=Graphics[_0x1f4715(0x754)]-_0x2cb666*0x2,_0x42a0e0=this[_0x1f4715(0x4ac)]();return new Rectangle(_0x2cb666,_0x1f1bba,_0x13efab,_0x42a0e0);},Scene_MenuBase['prototype'][_0x140e58(0x33e)]=function(){const _0x371383=_0x140e58,_0x3acd3e=Graphics['boxWidth'],_0x17af86=Window_ButtonAssist[_0x371383(0x468)][_0x371383(0x172)](),_0x1b9a77=0x0;let _0x2cbc43=0x0;return this[_0x371383(0x1e6)]()===_0x371383(0x675)?_0x2cbc43=0x0:_0x2cbc43=Graphics[_0x371383(0x6f1)]-_0x17af86,new Rectangle(_0x1b9a77,_0x2cbc43,_0x3acd3e,_0x17af86);},Scene_Menu[_0x140e58(0x579)]=VisuMZ['CoreEngine'][_0x140e58(0x452)][_0x140e58(0x505)][_0x140e58(0x6ab)],VisuMZ['CoreEngine'][_0x140e58(0x883)]=Scene_Menu['prototype'][_0x140e58(0x39c)],Scene_Menu[_0x140e58(0x468)]['create']=function(){const _0x2f2b92=_0x140e58;VisuMZ['CoreEngine'][_0x2f2b92(0x883)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0x140e58(0x468)][_0x140e58(0x1fd)]=function(){const _0x1b67c1=_0x140e58;if(this[_0x1b67c1(0x765)]){if(_0x1b67c1(0xdf)===_0x1b67c1(0xdf))this[_0x1b67c1(0x765)]['setBackgroundType'](Scene_Menu[_0x1b67c1(0x579)][_0x1b67c1(0x6a7)]);else{_0x1ae74d[_0x1b67c1(0x557)]!==0x0?(_0x340057[_0x1b67c1(0x5c7)]=0x0,_0xea385e['bgsVolume']=0x0,_0x24dcae['meVolume']=0x0,_0x290ab7[_0x1b67c1(0x557)]=0x0):(_0x412791[_0x1b67c1(0x5c7)]=0x64,_0x41cf20[_0x1b67c1(0x5d6)]=0x64,_0xaf7d['meVolume']=0x64,_0x13ea09[_0x1b67c1(0x557)]=0x64);_0x1e8330['save']();if(this[_0x1b67c1(0x8a1)][_0x1b67c1(0x4fd)]===_0x27b7eb){if(this[_0x1b67c1(0x8a1)]['_optionsWindow'])this[_0x1b67c1(0x8a1)][_0x1b67c1(0x3bb)][_0x1b67c1(0x308)]();if(this[_0x1b67c1(0x8a1)][_0x1b67c1(0x5ab)])this[_0x1b67c1(0x8a1)]['_listWindow'][_0x1b67c1(0x308)]();}}}this['_goldWindow']&&(_0x1b67c1(0x70b)!==_0x1b67c1(0x70b)?(_0x25044d[_0x1b67c1(0x499)](),_0x437383[_0x1b67c1(0x389)]=new _0x765eea(),_0x45410a[_0x1b67c1(0x837)](_0x17c823[_0x1b67c1(0x389)])):this[_0x1b67c1(0x140)][_0x1b67c1(0x67c)](Scene_Menu['layoutSettings'][_0x1b67c1(0x404)])),this[_0x1b67c1(0xfc)]&&this['_statusWindow'][_0x1b67c1(0x67c)](Scene_Menu[_0x1b67c1(0x579)][_0x1b67c1(0x176)]);},Scene_Menu[_0x140e58(0x468)][_0x140e58(0x6fa)]=function(){const _0x349588=_0x140e58;return Scene_Menu[_0x349588(0x579)][_0x349588(0x279)][_0x349588(0x129)](this);},Scene_Menu[_0x140e58(0x468)][_0x140e58(0x158)]=function(){const _0x48d68f=_0x140e58;return Scene_Menu['layoutSettings'][_0x48d68f(0x5f4)][_0x48d68f(0x129)](this);},Scene_Menu[_0x140e58(0x468)][_0x140e58(0x47e)]=function(){const _0x5b4cdb=_0x140e58;return Scene_Menu['layoutSettings']['StatusRect'][_0x5b4cdb(0x129)](this);},Scene_Item[_0x140e58(0x579)]=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)][_0x140e58(0x505)][_0x140e58(0x4ea)],VisuMZ[_0x140e58(0x370)]['Scene_Item_create']=Scene_Item[_0x140e58(0x468)]['create'],Scene_Item[_0x140e58(0x468)][_0x140e58(0x39c)]=function(){const _0x195093=_0x140e58;VisuMZ[_0x195093(0x370)][_0x195093(0x2ff)][_0x195093(0x129)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item['prototype'][_0x140e58(0x1fd)]=function(){const _0x448c9f=_0x140e58;this['_helpWindow']&&this['_helpWindow'][_0x448c9f(0x67c)](Scene_Item[_0x448c9f(0x579)][_0x448c9f(0x41d)]),this['_categoryWindow']&&(_0x448c9f(0x376)!==_0x448c9f(0x394)?this[_0x448c9f(0x653)][_0x448c9f(0x67c)](Scene_Item[_0x448c9f(0x579)][_0x448c9f(0x4f6)]):(this[_0x448c9f(0x160)](_0x4a3971,_0x488ec9,_0x9c7050,this[_0x448c9f(0x161)]()),_0x2dce98-=this[_0x448c9f(0x161)]()+0x2,_0x5a78c2+=this[_0x448c9f(0x161)]()+0x2)),this[_0x448c9f(0x7ef)]&&this[_0x448c9f(0x7ef)]['setBackgroundType'](Scene_Item[_0x448c9f(0x579)]['ItemBgType']),this[_0x448c9f(0x55a)]&&this[_0x448c9f(0x55a)][_0x448c9f(0x67c)](Scene_Item[_0x448c9f(0x579)][_0x448c9f(0x7bf)]);},Scene_Item[_0x140e58(0x468)][_0x140e58(0x169)]=function(){const _0x527493=_0x140e58;return Scene_Item[_0x527493(0x579)][_0x527493(0x12d)][_0x527493(0x129)](this);},Scene_Item['prototype'][_0x140e58(0xf2)]=function(){const _0x1c2b2b=_0x140e58;return Scene_Item['layoutSettings']['CategoryRect'][_0x1c2b2b(0x129)](this);},Scene_Item['prototype'][_0x140e58(0x299)]=function(){const _0x32cd22=_0x140e58;return Scene_Item['layoutSettings'][_0x32cd22(0x616)][_0x32cd22(0x129)](this);},Scene_Item[_0x140e58(0x468)][_0x140e58(0x120)]=function(){const _0x3be536=_0x140e58;return Scene_Item[_0x3be536(0x579)]['ActorRect']['call'](this);},Scene_Skill['layoutSettings']=VisuMZ['CoreEngine'][_0x140e58(0x452)][_0x140e58(0x505)][_0x140e58(0x81f)],VisuMZ[_0x140e58(0x370)]['Scene_Skill_create']=Scene_Skill[_0x140e58(0x468)][_0x140e58(0x39c)],Scene_Skill[_0x140e58(0x468)][_0x140e58(0x39c)]=function(){const _0x209bb4=_0x140e58;VisuMZ['CoreEngine'][_0x209bb4(0x74a)][_0x209bb4(0x129)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x140e58(0x468)][_0x140e58(0x1fd)]=function(){const _0xa46e67=_0x140e58;this[_0xa46e67(0x741)]&&this[_0xa46e67(0x741)][_0xa46e67(0x67c)](Scene_Skill['layoutSettings'][_0xa46e67(0x41d)]);if(this[_0xa46e67(0x80e)]){if('VMByT'!=='psRgd')this[_0xa46e67(0x80e)][_0xa46e67(0x67c)](Scene_Skill[_0xa46e67(0x579)]['SkillTypeBgType']);else{_0x9043c4-=_0x1b76cb;if(_0x516e17<=0x0)_0x11fcc6=0x0;this[_0xa46e67(0x822)](_0x5747c4);}}this[_0xa46e67(0xfc)]&&this[_0xa46e67(0xfc)][_0xa46e67(0x67c)](Scene_Skill['layoutSettings'][_0xa46e67(0x176)]);if(this[_0xa46e67(0x7ef)]){if(_0xa46e67(0x31f)!==_0xa46e67(0x31f)){var _0x47ac23=_0x346850(_0x27a4b0['$1'])/0x64;_0x581e83+=_0x47ac23;}else this[_0xa46e67(0x7ef)][_0xa46e67(0x67c)](Scene_Skill[_0xa46e67(0x579)][_0xa46e67(0x181)]);}this[_0xa46e67(0x55a)]&&this[_0xa46e67(0x55a)][_0xa46e67(0x67c)](Scene_Skill[_0xa46e67(0x579)][_0xa46e67(0x7bf)]);},Scene_Skill['prototype'][_0x140e58(0x169)]=function(){const _0x3e5c31=_0x140e58;return Scene_Skill[_0x3e5c31(0x579)][_0x3e5c31(0x12d)][_0x3e5c31(0x129)](this);},Scene_Skill[_0x140e58(0x468)][_0x140e58(0x737)]=function(){const _0x5e24a0=_0x140e58;return Scene_Skill[_0x5e24a0(0x579)][_0x5e24a0(0x3f8)]['call'](this);},Scene_Skill[_0x140e58(0x468)][_0x140e58(0x47e)]=function(){const _0x1e0351=_0x140e58;return Scene_Skill[_0x1e0351(0x579)]['StatusRect']['call'](this);},Scene_Skill[_0x140e58(0x468)]['itemWindowRect']=function(){const _0x497a7d=_0x140e58;return Scene_Skill[_0x497a7d(0x579)][_0x497a7d(0x616)][_0x497a7d(0x129)](this);},Scene_Skill[_0x140e58(0x468)][_0x140e58(0x120)]=function(){const _0x537992=_0x140e58;return Scene_Skill['layoutSettings'][_0x537992(0x856)][_0x537992(0x129)](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)]['MenuLayout'][_0x140e58(0x3c5)],VisuMZ[_0x140e58(0x370)][_0x140e58(0x1f3)]=Scene_Equip[_0x140e58(0x468)][_0x140e58(0x39c)],Scene_Equip[_0x140e58(0x468)][_0x140e58(0x39c)]=function(){const _0x26c05f=_0x140e58;VisuMZ[_0x26c05f(0x370)][_0x26c05f(0x1f3)]['call'](this),this[_0x26c05f(0x1fd)]();},Scene_Equip['prototype'][_0x140e58(0x1fd)]=function(){const _0xdaac24=_0x140e58;if(this['_helpWindow']){if('UBtBx'===_0xdaac24(0x6f5))this[_0xdaac24(0x741)][_0xdaac24(0x67c)](Scene_Equip[_0xdaac24(0x579)][_0xdaac24(0x41d)]);else{const _0x213fc6=_0x4ce3e3[_0xdaac24(0x51c)](_0x2d93d9);_0x18760e[_0xdaac24(0x477)](_0x414b63,!_0x213fc6);}}this['_statusWindow']&&this[_0xdaac24(0xfc)][_0xdaac24(0x67c)](Scene_Equip[_0xdaac24(0x579)]['StatusBgType']);this[_0xdaac24(0x765)]&&(_0xdaac24(0x64b)!==_0xdaac24(0x320)?this[_0xdaac24(0x765)][_0xdaac24(0x67c)](Scene_Equip[_0xdaac24(0x579)][_0xdaac24(0x6a7)]):_0x4e3ee1[_0xdaac24(0x370)][_0xdaac24(0x3c2)][_0xdaac24(0x129)](this));this[_0xdaac24(0x5eb)]&&this['_slotWindow'][_0xdaac24(0x67c)](Scene_Equip[_0xdaac24(0x579)]['SlotBgType']);if(this[_0xdaac24(0x7ef)]){if('tmQcT'!==_0xdaac24(0x397)){var _0x4a100f=_0x8ed9c4-2.625/2.75;return 7.5625*_0x4a100f*_0x4a100f+0.984375;}else this[_0xdaac24(0x7ef)][_0xdaac24(0x67c)](Scene_Equip['layoutSettings']['ItemBgType']);}},Scene_Equip[_0x140e58(0x468)]['helpWindowRect']=function(){const _0xf97521=_0x140e58;return Scene_Equip[_0xf97521(0x579)][_0xf97521(0x12d)]['call'](this);},Scene_Equip['prototype'][_0x140e58(0x47e)]=function(){const _0x75223f=_0x140e58;return Scene_Equip[_0x75223f(0x579)][_0x75223f(0x2aa)][_0x75223f(0x129)](this);},Scene_Equip[_0x140e58(0x468)][_0x140e58(0x6fa)]=function(){const _0x44adad=_0x140e58;return Scene_Equip[_0x44adad(0x579)][_0x44adad(0x279)][_0x44adad(0x129)](this);},Scene_Equip[_0x140e58(0x468)][_0x140e58(0x2dd)]=function(){const _0x365ad1=_0x140e58;return Scene_Equip[_0x365ad1(0x579)][_0x365ad1(0x7ee)][_0x365ad1(0x129)](this);},Scene_Equip[_0x140e58(0x468)]['itemWindowRect']=function(){const _0x381d4f=_0x140e58;return Scene_Equip[_0x381d4f(0x579)][_0x381d4f(0x616)]['call'](this);},Scene_Status[_0x140e58(0x579)]=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)][_0x140e58(0x505)][_0x140e58(0x408)],VisuMZ[_0x140e58(0x370)][_0x140e58(0x7ab)]=Scene_Status[_0x140e58(0x468)]['create'],Scene_Status['prototype'][_0x140e58(0x39c)]=function(){const _0x4f01cb=_0x140e58;VisuMZ[_0x4f01cb(0x370)][_0x4f01cb(0x7ab)][_0x4f01cb(0x129)](this),this[_0x4f01cb(0x1fd)]();},Scene_Status[_0x140e58(0x468)]['setCoreEngineUpdateWindowBg']=function(){const _0x2bed08=_0x140e58;if(this[_0x2bed08(0x30d)]){if(_0x2bed08(0x54a)===_0x2bed08(0x6ed))return _0x85ad1f;else this[_0x2bed08(0x30d)][_0x2bed08(0x67c)](Scene_Status[_0x2bed08(0x579)][_0x2bed08(0x65c)]);}this[_0x2bed08(0xfc)]&&(_0x2bed08(0x497)!==_0x2bed08(0x497)?(_0x21e414=_0x516fa7||_0x468009[_0x2bed08(0x795)],_0x5911ee=_0x27f7eb||_0x3e7cfd[_0x2bed08(0x28b)],_0x4e33c2=_0x4df0fd[_0x2bed08(0x372)](_0x12a029),_0x5beb23=_0x569805[_0x2bed08(0x372)](_0x3140bd),_0x53f739=_0x2f50f0[_0x2bed08(0x372)](_0x3e097e),_0x53307e=_0x58906f[_0x2bed08(0x372)](_0x56c0d1),_0xb0283['CoreEngine']['Window_Base_drawFace'][_0x2bed08(0x129)](this,_0x1b21a9,_0xd274c2,_0x36995c,_0x5910c4,_0x4329b6,_0x211b6f)):this[_0x2bed08(0xfc)][_0x2bed08(0x67c)](Scene_Status[_0x2bed08(0x579)]['StatusBgType']));if(this[_0x2bed08(0x45d)]){if(_0x2bed08(0x1b7)!==_0x2bed08(0x1b7))return 0.5*_0x309b41*_0x11f3fe*((_0x282145+0x1)*_0x9f71af-_0x2def55);else this['_statusParamsWindow'][_0x2bed08(0x67c)](Scene_Status[_0x2bed08(0x579)][_0x2bed08(0x86d)]);}this['_statusEquipWindow']&&this[_0x2bed08(0x6bd)][_0x2bed08(0x67c)](Scene_Status['layoutSettings'][_0x2bed08(0x7f4)]);},Scene_Status[_0x140e58(0x468)][_0x140e58(0x179)]=function(){const _0x4e58ee=_0x140e58;return Scene_Status['layoutSettings'][_0x4e58ee(0x20b)][_0x4e58ee(0x129)](this);},Scene_Status[_0x140e58(0x468)][_0x140e58(0x47e)]=function(){const _0x29195b=_0x140e58;return Scene_Status[_0x29195b(0x579)][_0x29195b(0x2aa)][_0x29195b(0x129)](this);},Scene_Status['prototype']['statusParamsWindowRect']=function(){const _0x58b5cc=_0x140e58;return Scene_Status['layoutSettings'][_0x58b5cc(0x59d)][_0x58b5cc(0x129)](this);},Scene_Status[_0x140e58(0x468)]['statusEquipWindowRect']=function(){const _0x17db63=_0x140e58;return Scene_Status[_0x17db63(0x579)]['StatusEquipRect'][_0x17db63(0x129)](this);},Scene_Options['layoutSettings']=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)][_0x140e58(0x505)]['OptionsMenu'],VisuMZ[_0x140e58(0x370)][_0x140e58(0x422)]=Scene_Options[_0x140e58(0x468)][_0x140e58(0x39c)],Scene_Options['prototype']['create']=function(){const _0x33121d=_0x140e58;VisuMZ[_0x33121d(0x370)]['Scene_Options_create'][_0x33121d(0x129)](this),this[_0x33121d(0x1fd)]();},Scene_Options['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x35e2c6=_0x140e58;if(this['_optionsWindow']){if(_0x35e2c6(0x147)==='jXInD')this[_0x35e2c6(0x3bb)]['setBackgroundType'](Scene_Options[_0x35e2c6(0x579)][_0x35e2c6(0xc2)]);else{const _0x3f9406=_0x5e3e4e['random']()<=_0x21097f;_0x2c2f4d['setValue'](_0x4a502a,_0x3f9406);}}},Scene_Options[_0x140e58(0x468)]['optionsWindowRect']=function(){const _0x9c94c6=_0x140e58;return Scene_Options[_0x9c94c6(0x579)]['OptionsRect']['call'](this);},Scene_Save[_0x140e58(0x579)]=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)]['MenuLayout']['SaveMenu'],Scene_Save[_0x140e58(0x468)][_0x140e58(0x39c)]=function(){const _0x51bbbd=_0x140e58;Scene_File[_0x51bbbd(0x468)][_0x51bbbd(0x39c)][_0x51bbbd(0x129)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x415ed5=_0x140e58;this['_helpWindow']&&(_0x415ed5(0x733)!==_0x415ed5(0x5aa)?this[_0x415ed5(0x741)]['setBackgroundType'](Scene_Save['layoutSettings'][_0x415ed5(0x41d)]):this['processTouchModernControls']()),this[_0x415ed5(0x5ab)]&&this['_listWindow'][_0x415ed5(0x67c)](Scene_Save['layoutSettings'][_0x415ed5(0x61f)]);},Scene_Save['prototype'][_0x140e58(0x169)]=function(){const _0x12ac8f=_0x140e58;return Scene_Save[_0x12ac8f(0x579)][_0x12ac8f(0x12d)][_0x12ac8f(0x129)](this);},Scene_Save[_0x140e58(0x468)]['listWindowRect']=function(){const _0x200233=_0x140e58;return Scene_Save[_0x200233(0x579)]['ListRect'][_0x200233(0x129)](this);},Scene_Load[_0x140e58(0x579)]=VisuMZ[_0x140e58(0x370)]['Settings'][_0x140e58(0x505)][_0x140e58(0x640)],Scene_Load['prototype']['create']=function(){const _0xa9dbe5=_0x140e58;Scene_File[_0xa9dbe5(0x468)][_0xa9dbe5(0x39c)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x140e58(0x468)][_0x140e58(0x1fd)]=function(){const _0x33e154=_0x140e58;this[_0x33e154(0x741)]&&this[_0x33e154(0x741)]['setBackgroundType'](Scene_Load[_0x33e154(0x579)][_0x33e154(0x41d)]);if(this[_0x33e154(0x5ab)]){if('dsChL'===_0x33e154(0x617))this['_listWindow'][_0x33e154(0x67c)](Scene_Load[_0x33e154(0x579)][_0x33e154(0x61f)]);else{const _0x441ad9=_0x12dc6c(this[_0x33e154(0x4fd)][_0x33e154(0x6f8)]),_0x45d752=this['getCustomBackgroundSettings'](_0x441ad9);return _0x45d752?_0x45d752[_0x33e154(0x255)]:0xc0;}}},Scene_Load['prototype'][_0x140e58(0x169)]=function(){const _0x591481=_0x140e58;return Scene_Load[_0x591481(0x579)][_0x591481(0x12d)][_0x591481(0x129)](this);},Scene_Load[_0x140e58(0x468)][_0x140e58(0x515)]=function(){const _0x11561c=_0x140e58;return Scene_Load[_0x11561c(0x579)]['ListRect']['call'](this);},Scene_GameEnd[_0x140e58(0x579)]=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)][_0x140e58(0x505)]['GameEnd'],VisuMZ['CoreEngine'][_0x140e58(0x50d)]=Scene_GameEnd[_0x140e58(0x468)][_0x140e58(0x392)],Scene_GameEnd[_0x140e58(0x468)][_0x140e58(0x392)]=function(){const _0x3d1455=_0x140e58;Scene_MenuBase[_0x3d1455(0x468)]['createBackground']['call'](this);},Scene_GameEnd[_0x140e58(0x468)][_0x140e58(0x38d)]=function(){const _0x24555c=_0x140e58,_0x517b09=this[_0x24555c(0x6fa)]();this[_0x24555c(0x765)]=new Window_GameEnd(_0x517b09),this[_0x24555c(0x765)][_0x24555c(0x2ad)](_0x24555c(0x42b),this['popScene']['bind'](this)),this[_0x24555c(0x5a5)](this[_0x24555c(0x765)]),this[_0x24555c(0x765)][_0x24555c(0x67c)](Scene_GameEnd[_0x24555c(0x579)][_0x24555c(0x6a7)]);},Scene_GameEnd['prototype'][_0x140e58(0x6fa)]=function(){const _0x40466e=_0x140e58;return Scene_GameEnd[_0x40466e(0x579)][_0x40466e(0x279)][_0x40466e(0x129)](this);},Scene_Shop[_0x140e58(0x579)]=VisuMZ[_0x140e58(0x370)]['Settings'][_0x140e58(0x505)][_0x140e58(0xde)],VisuMZ['CoreEngine'][_0x140e58(0x71f)]=Scene_Shop[_0x140e58(0x468)][_0x140e58(0x39c)],Scene_Shop['prototype']['create']=function(){const _0x3f120c=_0x140e58;VisuMZ['CoreEngine']['Scene_Shop_create'][_0x3f120c(0x129)](this),this[_0x3f120c(0x1fd)]();},Scene_Shop['prototype'][_0x140e58(0x1fd)]=function(){const _0x47e798=_0x140e58;if(this[_0x47e798(0x741)]){if(_0x47e798(0x846)!==_0x47e798(0x3ed))this[_0x47e798(0x741)][_0x47e798(0x67c)](Scene_Shop['layoutSettings'][_0x47e798(0x41d)]);else return _0x2e3d55[_0x47e798(0x37a)](_0x47e798(0x162));}if(this[_0x47e798(0x140)]){if(_0x47e798(0x6b4)!=='pFLjI')this[_0x47e798(0x140)][_0x47e798(0x67c)](Scene_Shop[_0x47e798(0x579)][_0x47e798(0x404)]);else return _0xce9da7[_0x47e798(0x370)][_0x47e798(0x44d)][_0x3396e1];}if(this[_0x47e798(0x765)]){if(_0x47e798(0x2a3)===_0x47e798(0x4c9)){if(_0x375dd7===0x8)return![];return _0x59f917['CoreEngine']['Input_shouldPreventDefault'][_0x47e798(0x129)](this,_0x3bed59);}else this[_0x47e798(0x765)][_0x47e798(0x67c)](Scene_Shop[_0x47e798(0x579)][_0x47e798(0x6a7)]);}this[_0x47e798(0x14d)]&&this[_0x47e798(0x14d)][_0x47e798(0x67c)](Scene_Shop[_0x47e798(0x579)]['DummyBgType']);this['_numberWindow']&&('KCcdS'===_0x47e798(0xca)?this[_0x47e798(0x1ed)](_0x502989):this[_0x47e798(0x2d2)][_0x47e798(0x67c)](Scene_Shop[_0x47e798(0x579)][_0x47e798(0x78f)]));this[_0x47e798(0xfc)]&&this[_0x47e798(0xfc)][_0x47e798(0x67c)](Scene_Shop['layoutSettings'][_0x47e798(0x176)]);if(this[_0x47e798(0x233)]){if('iBafc'===_0x47e798(0x6f4))return'';else this[_0x47e798(0x233)]['setBackgroundType'](Scene_Shop[_0x47e798(0x579)][_0x47e798(0x833)]);}this[_0x47e798(0x653)]&&this[_0x47e798(0x653)][_0x47e798(0x67c)](Scene_Shop['layoutSettings'][_0x47e798(0x4f6)]),this[_0x47e798(0x356)]&&this[_0x47e798(0x356)][_0x47e798(0x67c)](Scene_Shop['layoutSettings']['SellBgType']);},Scene_Shop['prototype']['helpWindowRect']=function(){const _0x2f1f04=_0x140e58;return Scene_Shop[_0x2f1f04(0x579)][_0x2f1f04(0x12d)][_0x2f1f04(0x129)](this);},Scene_Shop[_0x140e58(0x468)][_0x140e58(0x158)]=function(){const _0x15a6aa=_0x140e58;return Scene_Shop[_0x15a6aa(0x579)][_0x15a6aa(0x5f4)][_0x15a6aa(0x129)](this);},Scene_Shop[_0x140e58(0x468)]['commandWindowRect']=function(){const _0x3b6800=_0x140e58;return Scene_Shop[_0x3b6800(0x579)][_0x3b6800(0x279)][_0x3b6800(0x129)](this);},Scene_Shop[_0x140e58(0x468)][_0x140e58(0x130)]=function(){const _0x363655=_0x140e58;return Scene_Shop['layoutSettings'][_0x363655(0x1ef)]['call'](this);},Scene_Shop['prototype'][_0x140e58(0x450)]=function(){const _0x313016=_0x140e58;return Scene_Shop['layoutSettings'][_0x313016(0x3f2)][_0x313016(0x129)](this);},Scene_Shop[_0x140e58(0x468)][_0x140e58(0x47e)]=function(){const _0x167ce2=_0x140e58;return Scene_Shop['layoutSettings']['StatusRect'][_0x167ce2(0x129)](this);},Scene_Shop[_0x140e58(0x468)][_0x140e58(0x72d)]=function(){const _0x4cfbd3=_0x140e58;return Scene_Shop[_0x4cfbd3(0x579)][_0x4cfbd3(0x37f)]['call'](this);},Scene_Shop[_0x140e58(0x468)][_0x140e58(0xf2)]=function(){const _0x3da673=_0x140e58;return Scene_Shop[_0x3da673(0x579)][_0x3da673(0x5a8)][_0x3da673(0x129)](this);},Scene_Shop[_0x140e58(0x468)][_0x140e58(0x666)]=function(){const _0x2ad2fd=_0x140e58;return Scene_Shop[_0x2ad2fd(0x579)]['SellRect'][_0x2ad2fd(0x129)](this);},Scene_Name['layoutSettings']=VisuMZ[_0x140e58(0x370)]['Settings'][_0x140e58(0x505)][_0x140e58(0x388)],VisuMZ['CoreEngine'][_0x140e58(0x7b1)]=Scene_Name[_0x140e58(0x468)][_0x140e58(0x39c)],Scene_Name['prototype'][_0x140e58(0x39c)]=function(){const _0x109f65=_0x140e58;VisuMZ['CoreEngine']['Scene_Name_create'][_0x109f65(0x129)](this),this[_0x109f65(0x1fd)]();},Scene_Name['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x169ece=_0x140e58;if(this['_editWindow']){if(_0x169ece(0x3e6)!==_0x169ece(0x654))this[_0x169ece(0x149)][_0x169ece(0x67c)](Scene_Name[_0x169ece(0x579)]['EditBgType']);else{const _0x4dc095=this[_0x169ece(0x2b3)]();!_0x4dc095[_0x169ece(0x435)]()?_0x384f84[_0x169ece(0x370)][_0x169ece(0x3c2)][_0x169ece(0x129)](this):(this[_0x169ece(0x435)]['x']=_0x4dc095[_0x169ece(0x435)]()['x'],this[_0x169ece(0x435)]['y']=_0x4dc095[_0x169ece(0x435)]()['y']);}}this[_0x169ece(0x647)]&&this[_0x169ece(0x647)]['setBackgroundType'](Scene_Name['layoutSettings'][_0x169ece(0x471)]);},Scene_Name[_0x140e58(0x468)][_0x140e58(0x488)]=function(){return 0x0;},Scene_Name['prototype'][_0x140e58(0x5db)]=function(){const _0x1f211b=_0x140e58;return Scene_Name[_0x1f211b(0x579)][_0x1f211b(0x507)][_0x1f211b(0x129)](this);},Scene_Name[_0x140e58(0x468)][_0x140e58(0xc6)]=function(){const _0x426761=_0x140e58;return Scene_Name['layoutSettings'][_0x426761(0x173)][_0x426761(0x129)](this);},Scene_Name['prototype'][_0x140e58(0x345)]=function(){const _0x4bcc4a=_0x140e58;if(!this[_0x4bcc4a(0x647)])return![];return VisuMZ[_0x4bcc4a(0x370)]['Settings']['KeyboardInput'][_0x4bcc4a(0x345)];},Scene_Name[_0x140e58(0x468)]['buttonAssistKey1']=function(){const _0x14350a=_0x140e58;if(this[_0x14350a(0x345)]())return _0x14350a(0x81d)===_0x14350a(0x572)?_0x1fa367['CoreEngine'][_0x14350a(0x452)]['QoL'][_0x14350a(0xce)]:TextManager[_0x14350a(0x37a)]('tab');else{if('QIHqt'==='JPuUV')_0x5cbf5e[_0x14350a(0x750)](_0x4d7753);else return Scene_MenuBase[_0x14350a(0x468)][_0x14350a(0x77a)][_0x14350a(0x129)](this);}},Scene_Name['prototype'][_0x140e58(0x487)]=function(){const _0x4746e9=_0x140e58;if(this[_0x4746e9(0x345)]()){const _0x4ffecd=VisuMZ[_0x4746e9(0x370)][_0x4746e9(0x452)][_0x4746e9(0x7d5)];return this[_0x4746e9(0x647)][_0x4746e9(0x19f)]===_0x4746e9(0x5a4)?_0x4ffecd[_0x4746e9(0x2b0)]||_0x4746e9(0x2b0):_0x4ffecd[_0x4746e9(0x5c9)]||_0x4746e9(0x5c9);}else{if(_0x4746e9(0x761)==='umrvg'){var _0x4d6933=_0x8d53d7(_0x4746e9(0x271))[_0x4746e9(0x7ad)][_0x4746e9(0x312)]();_0x176ecf[_0x4746e9(0x267)]();if(_0x28187b)_0x5a6696(_0x4d6933['focus'][_0x4746e9(0xfe)](_0x4d6933),0x190);}else return Scene_MenuBase[_0x4746e9(0x468)][_0x4746e9(0x487)]['call'](this);}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x288)]=Scene_Name[_0x140e58(0x468)][_0x140e58(0x25b)],Scene_Name[_0x140e58(0x468)][_0x140e58(0x25b)]=function(){const _0x56628b=_0x140e58;this[_0x56628b(0x4ff)]()?this[_0x56628b(0x3e1)]():VisuMZ['CoreEngine'][_0x56628b(0x288)][_0x56628b(0x129)](this);},Scene_Name[_0x140e58(0x468)][_0x140e58(0x4ff)]=function(){const _0xe5da30=_0x140e58,_0x40c86c=VisuMZ[_0xe5da30(0x370)]['Settings'][_0xe5da30(0x7d5)];if(!_0x40c86c)return![];const _0x379715=_0x40c86c[_0xe5da30(0x593)];if(!_0x379715)return![];const _0x4371c1=this[_0xe5da30(0x149)][_0xe5da30(0x6f8)]()[_0xe5da30(0x77c)]();for(const _0x4db27a of _0x379715){if('tMnJI'===_0xe5da30(0x768)){let _0x435c0e=0x0;for(const _0x162b8b of _0x218044['CoreEngine'][_0xe5da30(0x452)][_0xe5da30(0x3d3)]['DisplayedParams']){const _0xbf1012=this[_0xe5da30(0x50f)](),_0x17ad6a=this['paramY'](_0x435c0e);this[_0xe5da30(0x2df)](_0xbf1012,_0x17ad6a,_0x162b8b),_0x435c0e++;}}else{if(_0x4371c1[_0xe5da30(0x7fd)](_0x4db27a[_0xe5da30(0x77c)]()))return!![];}}return![];},Scene_Name[_0x140e58(0x468)][_0x140e58(0x3e1)]=function(){const _0x2c3b64=_0x140e58;SoundManager[_0x2c3b64(0x256)]();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x4c3)]=Scene_Battle[_0x140e58(0x468)][_0x140e58(0x8b3)],Scene_Battle['prototype'][_0x140e58(0x8b3)]=function(){const _0x1a5b0e=_0x140e58;VisuMZ[_0x1a5b0e(0x370)][_0x1a5b0e(0x4c3)][_0x1a5b0e(0x129)](this);if($gameTemp['_playTestFastMode'])this[_0x1a5b0e(0x31c)]();},Scene_Battle['prototype'][_0x140e58(0x31c)]=function(){const _0x5c4a6c=_0x140e58;!BattleManager['isInputting']()&&!this[_0x5c4a6c(0x2fd)]&&!$gameMessage[_0x5c4a6c(0x156)]()&&(this[_0x5c4a6c(0x2fd)]=!![],this[_0x5c4a6c(0x8b3)](),SceneManager[_0x5c4a6c(0x19c)](),this[_0x5c4a6c(0x2fd)]=![]);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x697)]=Scene_Battle[_0x140e58(0x468)]['createCancelButton'],Scene_Battle[_0x140e58(0x468)][_0x140e58(0xc3)]=function(){const _0x4210ef=_0x140e58;VisuMZ[_0x4210ef(0x370)][_0x4210ef(0x697)][_0x4210ef(0x129)](this),SceneManager[_0x4210ef(0x888)]()&&(_0x4210ef(0x1c6)!==_0x4210ef(0x1c6)?this[_0x4210ef(0x741)][_0x4210ef(0x67c)](_0xb030a5[_0x4210ef(0x579)][_0x4210ef(0x41d)]):this[_0x4210ef(0x7a7)]());},Scene_Battle['prototype'][_0x140e58(0x7a7)]=function(){const _0x554f08=_0x140e58;this[_0x554f08(0x302)]['x']=Graphics[_0x554f08(0x754)]+0x4,this[_0x554f08(0x46b)]()?this[_0x554f08(0x302)]['y']=Graphics[_0x554f08(0x6f1)]-this[_0x554f08(0x4ac)]():this[_0x554f08(0x302)]['y']=0x0;},VisuMZ['CoreEngine'][_0x140e58(0x154)]=Sprite_Button[_0x140e58(0x468)][_0x140e58(0x2cd)],Sprite_Button[_0x140e58(0x468)][_0x140e58(0x2cd)]=function(_0x24c374){const _0x3e8edc=_0x140e58;VisuMZ[_0x3e8edc(0x370)][_0x3e8edc(0x154)][_0x3e8edc(0x129)](this,_0x24c374),this[_0x3e8edc(0x189)]();},Sprite_Button['prototype'][_0x140e58(0x189)]=function(){const _0x222dc9=_0x140e58,_0x2259e0=VisuMZ[_0x222dc9(0x370)][_0x222dc9(0x452)]['UI'];this['_isButtonHidden']=![];switch(this['_buttonType']){case'cancel':this['_isButtonHidden']=!_0x2259e0[_0x222dc9(0x116)];break;case _0x222dc9(0x5b1):case _0x222dc9(0x627):this['_isButtonHidden']=!_0x2259e0[_0x222dc9(0x2a1)];break;case _0x222dc9(0x3ce):case'up':case _0x222dc9(0x10b):case _0x222dc9(0xbf):case'ok':this['_isButtonHidden']=!_0x2259e0[_0x222dc9(0x6cd)];break;case _0x222dc9(0x170):this['_isButtonHidden']=!_0x2259e0[_0x222dc9(0x27d)];break;}},VisuMZ[_0x140e58(0x370)][_0x140e58(0xff)]=Sprite_Button['prototype'][_0x140e58(0x75a)],Sprite_Button[_0x140e58(0x468)][_0x140e58(0x75a)]=function(){const _0x51a834=_0x140e58;if(SceneManager[_0x51a834(0x273)]()||this['_isButtonHidden'])this[_0x51a834(0x804)]();else{if('Riiih'!==_0x51a834(0x21b)){const _0x34b74c=_0x344abc['CoreEngine'][_0x51a834(0x214)][_0x27a660],_0x1626b0=this[_0x34b74c];return _0x4668fc['CoreEngine'][_0x51a834(0x70e)][_0x58d2c4]===_0x51a834(0x29a)?_0x1626b0:_0x2ec907?_0x45488a(_0x45135c[_0x51a834(0x372)](_0x1626b0*0x64))+'%':_0x1626b0;}else VisuMZ[_0x51a834(0x370)][_0x51a834(0xff)][_0x51a834(0x129)](this);}},Sprite_Button['prototype'][_0x140e58(0x804)]=function(){const _0x42baa5=_0x140e58;this[_0x42baa5(0x111)]=![],this[_0x42baa5(0x335)]=0x0,this['x']=Graphics[_0x42baa5(0x3b1)]*0xa,this['y']=Graphics[_0x42baa5(0x757)]*0xa;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x263)]=Sprite_Battler[_0x140e58(0x468)][_0x140e58(0x6a5)],Sprite_Battler['prototype']['startMove']=function(_0x3aac50,_0x37817d,_0x1a179b){const _0x18a5fc=_0x140e58;(this[_0x18a5fc(0x3a3)]!==_0x3aac50||this[_0x18a5fc(0x375)]!==_0x37817d)&&(this[_0x18a5fc(0x318)]('Linear'),this[_0x18a5fc(0x30b)]=_0x1a179b),VisuMZ[_0x18a5fc(0x370)][_0x18a5fc(0x263)][_0x18a5fc(0x129)](this,_0x3aac50,_0x37817d,_0x1a179b);},Sprite_Battler[_0x140e58(0x468)][_0x140e58(0x318)]=function(_0x3aebb1){this['_moveEasingType']=_0x3aebb1;},Sprite_Battler['prototype'][_0x140e58(0x2d7)]=function(){const _0x221cab=_0x140e58;if(this['_movementDuration']<=0x0)return;const _0x37d9e=this['_movementDuration'],_0x277bcb=this['_movementWholeDuration'],_0x3d7332=this[_0x221cab(0x14c)];this[_0x221cab(0x298)]=this[_0x221cab(0x16e)](this['_offsetX'],this[_0x221cab(0x3a3)],_0x37d9e,_0x277bcb,_0x3d7332),this[_0x221cab(0x357)]=this['applyEasing'](this['_offsetY'],this[_0x221cab(0x375)],_0x37d9e,_0x277bcb,_0x3d7332),this['_movementDuration']--;if(this['_movementDuration']<=0x0)this['onMoveEnd']();},Sprite_Battler[_0x140e58(0x468)][_0x140e58(0x16e)]=function(_0x3996b8,_0x411f02,_0x15cc22,_0x5a1a4b,_0x4653a2){const _0xea829=_0x140e58,_0x2a8164=VisuMZ[_0xea829(0x46f)]((_0x5a1a4b-_0x15cc22)/_0x5a1a4b,_0x4653a2||_0xea829(0x563)),_0x11d7ad=VisuMZ['ApplyEasing']((_0x5a1a4b-_0x15cc22+0x1)/_0x5a1a4b,_0x4653a2||_0xea829(0x563)),_0x583e40=(_0x3996b8-_0x411f02*_0x2a8164)/(0x1-_0x2a8164);return _0x583e40+(_0x411f02-_0x583e40)*_0x11d7ad;},VisuMZ['CoreEngine']['Sprite_Actor_setActorHome']=Sprite_Actor['prototype'][_0x140e58(0x878)],Sprite_Actor['prototype']['setActorHome']=function(_0x825f6f){const _0xb63c7=_0x140e58;VisuMZ[_0xb63c7(0x370)][_0xb63c7(0x452)]['UI'][_0xb63c7(0x762)]?this[_0xb63c7(0x662)](_0x825f6f):VisuMZ[_0xb63c7(0x370)][_0xb63c7(0xc5)][_0xb63c7(0x129)](this,_0x825f6f);},Sprite_Actor[_0x140e58(0x468)]['setActorHomeRepositioned']=function(_0xfc702a){const _0xc48101=_0x140e58;let _0x1f24f2=Math[_0xc48101(0x372)](Graphics[_0xc48101(0x3b1)]/0x2+0xc0);_0x1f24f2-=Math[_0xc48101(0x184)]((Graphics[_0xc48101(0x3b1)]-Graphics[_0xc48101(0x754)])/0x2),_0x1f24f2+=_0xfc702a*0x20;let _0x26ff7e=Graphics['height']-0xc8-$gameParty[_0xc48101(0x58a)]()*0x30;_0x26ff7e-=Math['floor']((Graphics['height']-Graphics[_0xc48101(0x6f1)])/0x2),_0x26ff7e+=_0xfc702a*0x30,this[_0xc48101(0x41e)](_0x1f24f2,_0x26ff7e);},Sprite_Actor['prototype'][_0x140e58(0x54b)]=function(){this['startMove'](0x4b0,0x0,0x78);},Sprite_Animation[_0x140e58(0x468)]['setMute']=function(_0x36a2e1){const _0x3b6b24=_0x140e58;this[_0x3b6b24(0x59a)]=_0x36a2e1;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x125)]=Sprite_Animation[_0x140e58(0x468)][_0x140e58(0x81b)],Sprite_Animation[_0x140e58(0x468)][_0x140e58(0x81b)]=function(){const _0x57272c=_0x140e58;if(this[_0x57272c(0x59a)])return;VisuMZ['CoreEngine'][_0x57272c(0x125)][_0x57272c(0x129)](this);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x546)]=Sprite_Animation['prototype']['setViewport'],Sprite_Animation[_0x140e58(0x468)][_0x140e58(0x3f9)]=function(_0x4530b5){const _0x4246be=_0x140e58;if(this[_0x4246be(0x707)]()){if(_0x4246be(0x702)!=='UWUtS')try{_0x25f798['CoreEngine'][_0x4246be(0x3fa)][_0x4246be(0x129)](this,_0x22079d);}catch(_0x3b3d5e){if(_0x230607[_0x4246be(0x4c1)]())_0x3ab563[_0x4246be(0x6be)](_0x3b3d5e);}else this[_0x4246be(0x890)](_0x4530b5);}else _0x4246be(0x221)===_0x4246be(0x5af)?!_0x46d1f9[_0x4246be(0x78d)]()&&this[_0x4246be(0x437)](_0xf5a9ba):VisuMZ[_0x4246be(0x370)][_0x4246be(0x546)][_0x4246be(0x129)](this,_0x4530b5);},Sprite_Animation[_0x140e58(0x468)]['isAnimationOffsetXMirrored']=function(){const _0x180f3a=_0x140e58;if(!this[_0x180f3a(0x6cc)])return![];const _0x3c39e5=this[_0x180f3a(0x6cc)][_0x180f3a(0x6f8)]||'';if(_0x3c39e5[_0x180f3a(0x461)](/<MIRROR OFFSET X>/i))return!![];if(_0x3c39e5['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x180f3a(0x370)][_0x180f3a(0x452)][_0x180f3a(0x1f0)]['AnimationMirrorOffset'];},Sprite_Animation[_0x140e58(0x468)][_0x140e58(0x890)]=function(_0x5997d6){const _0x551013=_0x140e58,_0x24d777=this[_0x551013(0x811)],_0x1a4c88=this[_0x551013(0x811)],_0x204399=this[_0x551013(0x6cc)][_0x551013(0x591)]*(this['_mirror']?-0x1:0x1)-_0x24d777/0x2,_0x4ded2a=this[_0x551013(0x6cc)][_0x551013(0x6d9)]-_0x1a4c88/0x2,_0x207f48=this[_0x551013(0x4bb)](_0x5997d6);_0x5997d6['gl'][_0x551013(0x841)](_0x204399+_0x207f48['x'],_0x4ded2a+_0x207f48['y'],_0x24d777,_0x1a4c88);},Sprite_Animation[_0x140e58(0x468)][_0x140e58(0x3ac)]=function(_0x1c2d5c){const _0x16602a=_0x140e58;if(_0x1c2d5c[_0x16602a(0x6d0)]){}const _0x2191d7=this[_0x16602a(0x6cc)][_0x16602a(0x6f8)];let _0x58efc9=_0x1c2d5c[_0x16602a(0x757)]*_0x1c2d5c['scale']['y'],_0xa0c317=0x0,_0x2d991a=-_0x58efc9/0x2;if(_0x2191d7[_0x16602a(0x461)](/<(?:HEAD|HEADER|TOP)>/i))_0x2d991a=-_0x58efc9;if(_0x2191d7[_0x16602a(0x461)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2d991a=0x0;if(this[_0x16602a(0x6cc)]['alignBottom'])_0x2d991a=0x0;if(_0x2191d7['match'](/<(?:LEFT)>/i))_0xa0c317=-_0x1c2d5c[_0x16602a(0x3b1)]/0x2;if(_0x2191d7[_0x16602a(0x461)](/<(?:RIGHT)>/i))_0xa0c317=_0x1c2d5c[_0x16602a(0x3b1)]/0x2;_0x2191d7['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0xa0c317=Number(RegExp['$1'])*_0x1c2d5c[_0x16602a(0x3b1)]);if(_0x2191d7['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if('lqqiG'===_0x16602a(0x752))_0x2d991a=(0x1-Number(RegExp['$1']))*-_0x58efc9;else{if(!this['isNormalPriority']())return![];else{const _0x138b9d=_0xf38410[_0x16602a(0x509)](_0x292609,_0x32db84)[_0x16602a(0x6b3)](_0x42533c=>_0x42533c['isNormalPriority']());return _0x138b9d[_0x16602a(0x4d7)]>0x0;}}}_0x2191d7[_0x16602a(0x461)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0xa0c317=Number(RegExp['$1'])*_0x1c2d5c['width'],_0x2d991a=(0x1-Number(RegExp['$2']))*-_0x58efc9);if(_0x2191d7[_0x16602a(0x461)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0xa0c317+=Number(RegExp['$1']);if(_0x2191d7[_0x16602a(0x461)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2d991a+=Number(RegExp['$1']);_0x2191d7[_0x16602a(0x461)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x16602a(0x3f6)===_0x16602a(0x3f6)?(_0xa0c317+=Number(RegExp['$1']),_0x2d991a+=Number(RegExp['$2'])):(this['_spriteset'][_0x16602a(0x8b3)](),this[_0x16602a(0x165)][_0x16602a(0x373)](),this[_0x16602a(0x4cf)]['visible']=![],_0x40f40b[_0x16602a(0x496)]()));const _0x3442c7=new Point(_0xa0c317,_0x2d991a);return _0x1c2d5c['updateTransform'](),_0x1c2d5c['worldTransform'][_0x16602a(0x802)](_0x3442c7);},Sprite_AnimationMV[_0x140e58(0x468)][_0x140e58(0x532)]=function(_0x14204d){const _0x555d19=_0x140e58;this[_0x555d19(0x59a)]=_0x14204d;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x65d)]=Sprite_AnimationMV['prototype'][_0x140e58(0xc0)],Sprite_AnimationMV[_0x140e58(0x468)][_0x140e58(0xc0)]=function(_0x2fa60c){const _0x89f4a5=_0x140e58;if(this[_0x89f4a5(0x59a)]){if(_0x89f4a5(0x1af)===_0x89f4a5(0x1af))_0x2fa60c=JsonEx[_0x89f4a5(0x778)](_0x2fa60c),_0x2fa60c['se']&&(_0x2fa60c['se'][_0x89f4a5(0x486)]=0x0);else return this['_scene']&&this[_0x89f4a5(0x8a1)]instanceof _0x255875;}VisuMZ['CoreEngine']['Sprite_AnimationMV_processTimingData']['call'](this,_0x2fa60c);},Sprite_Damage['prototype'][_0x140e58(0x7b8)]=function(_0x55a10c){const _0x3e0650=_0x140e58;let _0x23951a=Math[_0x3e0650(0x3bc)](_0x55a10c)['toString']();this[_0x3e0650(0x323)]()&&(_0x23951a=VisuMZ[_0x3e0650(0x7e0)](_0x23951a));const _0x561f91=this['fontSize'](),_0x479fee=Math[_0x3e0650(0x184)](_0x561f91*0.75);for(let _0x2f3a67=0x0;_0x2f3a67<_0x23951a[_0x3e0650(0x4d7)];_0x2f3a67++){const _0xd5f362=this[_0x3e0650(0x84d)](_0x479fee,_0x561f91);_0xd5f362[_0x3e0650(0x78a)]['drawText'](_0x23951a[_0x2f3a67],0x0,0x0,_0x479fee,_0x561f91,_0x3e0650(0x5c3)),_0xd5f362['x']=(_0x2f3a67-(_0x23951a['length']-0x1)/0x2)*_0x479fee,_0xd5f362['dy']=-_0x2f3a67;}},Sprite_Damage[_0x140e58(0x468)][_0x140e58(0x323)]=function(){const _0x4161b8=_0x140e58;return VisuMZ[_0x4161b8(0x370)][_0x4161b8(0x452)][_0x4161b8(0x1f0)]['DigitGroupingDamageSprites'];},Sprite_Damage[_0x140e58(0x468)][_0x140e58(0x564)]=function(){const _0x150e36=_0x140e58;return ColorManager[_0x150e36(0x636)]();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x328)]=Sprite_Gauge[_0x140e58(0x468)][_0x140e58(0x3e9)],Sprite_Gauge[_0x140e58(0x468)]['gaugeRate']=function(){const _0x56fe21=_0x140e58;return VisuMZ[_0x56fe21(0x370)][_0x56fe21(0x328)][_0x56fe21(0x129)](this)[_0x56fe21(0x16b)](0x0,0x1);},VisuMZ['CoreEngine'][_0x140e58(0x62a)]=Sprite_Gauge[_0x140e58(0x468)][_0x140e58(0x229)],Sprite_Gauge[_0x140e58(0x468)][_0x140e58(0x229)]=function(){const _0x5c57d0=_0x140e58;let _0x53e0c3=VisuMZ[_0x5c57d0(0x370)][_0x5c57d0(0x62a)][_0x5c57d0(0x129)](this);return _0x53e0c3;},Sprite_Gauge[_0x140e58(0x468)][_0x140e58(0x2d0)]=function(){const _0x1f4648=_0x140e58;let _0x4a76cd=this[_0x1f4648(0x229)]();this[_0x1f4648(0x323)]()&&(_0x4a76cd=VisuMZ[_0x1f4648(0x7e0)](_0x4a76cd));const _0x23c5f2=this[_0x1f4648(0x7c4)]()-0x1,_0x2dad05=this['textHeight']?this['textHeight']():this[_0x1f4648(0x592)]();this[_0x1f4648(0x34b)](),this[_0x1f4648(0x78a)][_0x1f4648(0xd0)](_0x4a76cd,0x0,0x0,_0x23c5f2,_0x2dad05,_0x1f4648(0x1c0));},Sprite_Gauge['prototype']['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0x140e58(0x468)][_0x140e58(0x323)]=function(){const _0x3f355b=_0x140e58;return VisuMZ[_0x3f355b(0x370)]['Settings']['QoL'][_0x3f355b(0xce)];},Sprite_Gauge[_0x140e58(0x468)][_0x140e58(0x564)]=function(){const _0x54f81f=_0x140e58;return ColorManager[_0x54f81f(0x76e)]();},VisuMZ[_0x140e58(0x370)]['Sprite_Picture_loadBitmap']=Sprite_Picture['prototype'][_0x140e58(0x1d5)],Sprite_Picture['prototype'][_0x140e58(0x1d5)]=function(){const _0x13f3fc=_0x140e58;this['_pictureName'][_0x13f3fc(0x461)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?_0x13f3fc(0x82e)!==_0x13f3fc(0x82e)?this[_0x13f3fc(0x64a)][_0x28896a]=this[_0x13f3fc(0x419)](_0x4c24a4(_0x480d6f)):this['loadIconBitmap'](Number(RegExp['$1'])):_0x13f3fc(0x506)===_0x13f3fc(0x406)?(_0x2e0586['CoreEngine'][_0x13f3fc(0x697)][_0x13f3fc(0x129)](this),_0x16848c[_0x13f3fc(0x888)]()&&this[_0x13f3fc(0x7a7)]()):VisuMZ[_0x13f3fc(0x370)][_0x13f3fc(0x777)][_0x13f3fc(0x129)](this);},Sprite_Picture[_0x140e58(0x468)][_0x140e58(0x706)]=function(_0x56edb8){const _0x52632d=_0x140e58,_0x56f41d=ImageManager['iconWidth'],_0x5b3bf8=ImageManager[_0x52632d(0x637)],_0x415d43=this['_pictureName'][_0x52632d(0x461)](/SMOOTH/i);this[_0x52632d(0x78a)]=new Bitmap(_0x56f41d,_0x5b3bf8);const _0xd9f138=ImageManager[_0x52632d(0x3aa)]('IconSet'),_0x12f08c=_0x56edb8%0x10*_0x56f41d,_0x173752=Math[_0x52632d(0x184)](_0x56edb8/0x10)*_0x5b3bf8;this[_0x52632d(0x78a)][_0x52632d(0x5bc)]=_0x415d43,this[_0x52632d(0x78a)][_0x52632d(0x2f5)](_0xd9f138,_0x12f08c,_0x173752,_0x56f41d,_0x5b3bf8,0x0,0x0,_0x56f41d,_0x5b3bf8);};function Sprite_TitlePictureButton(){const _0x2e57a8=_0x140e58;this[_0x2e57a8(0x2cd)](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x140e58(0x39c)](Sprite_Clickable[_0x140e58(0x468)]),Sprite_TitlePictureButton['prototype'][_0x140e58(0x4fd)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x140e58(0x468)][_0x140e58(0x2cd)]=function(_0x35e0f8){const _0x1323dd=_0x140e58;Sprite_Clickable[_0x1323dd(0x468)][_0x1323dd(0x2cd)][_0x1323dd(0x129)](this),this['_data']=_0x35e0f8,this[_0x1323dd(0x797)]=null,this[_0x1323dd(0x843)]();},Sprite_TitlePictureButton[_0x140e58(0x468)][_0x140e58(0x843)]=function(){const _0x3cc538=_0x140e58;this['x']=Graphics[_0x3cc538(0x3b1)],this['y']=Graphics['height'],this[_0x3cc538(0x111)]=![],this[_0x3cc538(0x2b4)]();},Sprite_TitlePictureButton[_0x140e58(0x468)][_0x140e58(0x2b4)]=function(){const _0x69d2dd=_0x140e58;this[_0x69d2dd(0x78a)]=ImageManager[_0x69d2dd(0x1fb)](this[_0x69d2dd(0x17f)]['PictureFilename']),this['bitmap'][_0x69d2dd(0x1f2)](this[_0x69d2dd(0x828)][_0x69d2dd(0xfe)](this));},Sprite_TitlePictureButton[_0x140e58(0x468)]['onButtonImageLoad']=function(){const _0x576164=_0x140e58;this[_0x576164(0x17f)]['OnLoadJS'][_0x576164(0x129)](this),this[_0x576164(0x17f)][_0x576164(0x4a0)][_0x576164(0x129)](this),this['setClickHandler'](this[_0x576164(0x17f)][_0x576164(0x5d8)]['bind'](this));},Sprite_TitlePictureButton['prototype'][_0x140e58(0x8b3)]=function(){const _0x552d21=_0x140e58;Sprite_Clickable['prototype'][_0x552d21(0x8b3)][_0x552d21(0x129)](this),this[_0x552d21(0x75a)](),this[_0x552d21(0x313)]();},Sprite_TitlePictureButton[_0x140e58(0x468)][_0x140e58(0x358)]=function(){const _0x1e1aa0=_0x140e58;return VisuMZ[_0x1e1aa0(0x370)][_0x1e1aa0(0x452)][_0x1e1aa0(0x505)][_0x1e1aa0(0x3dc)][_0x1e1aa0(0x635)];},Sprite_TitlePictureButton['prototype'][_0x140e58(0x75a)]=function(){const _0x4c5ac0=_0x140e58;if(this[_0x4c5ac0(0x1a0)]||this[_0x4c5ac0(0x62b)])this[_0x4c5ac0(0x335)]=0xff;else{if(_0x4c5ac0(0x466)===_0x4c5ac0(0x3f4)){if(_0x3ef9a2[_0x4c5ac0(0x370)][_0x4c5ac0(0x452)]['UI'][_0x4c5ac0(0x14e)]){const _0x16d54e=_0x130bec[_0x4c5ac0(0x3b1)]-_0x52203d[_0x4c5ac0(0x754)]-_0x588c72[_0x4c5ac0(0x370)][_0x4c5ac0(0x452)]['UI'][_0x4c5ac0(0x815)]*0x2,_0x469134=_0x3bcfb9['prototype'][_0x4c5ac0(0x5d7)][_0x4c5ac0(0x129)](this)*0x4;if(_0x16d54e>=_0x469134)_0x2b72d5[_0x4c5ac0(0x136)](!![]);}}else this[_0x4c5ac0(0x335)]+=this[_0x4c5ac0(0x111)]?this['fadeSpeed']():-0x1*this[_0x4c5ac0(0x358)](),this['opacity']=Math[_0x4c5ac0(0x6a4)](0xc0,this['opacity']);}},Sprite_TitlePictureButton[_0x140e58(0x468)][_0x140e58(0x36e)]=function(_0x227be3){const _0x2c9224=_0x140e58;this[_0x2c9224(0x797)]=_0x227be3;},Sprite_TitlePictureButton[_0x140e58(0x468)]['onClick']=function(){const _0x5968bf=_0x140e58;this[_0x5968bf(0x797)]&&this['_clickHandler']();},VisuMZ['CoreEngine'][_0x140e58(0x5e5)]=Spriteset_Base['prototype'][_0x140e58(0x2cd)],Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x2cd)]=function(){const _0x5daea0=_0x140e58;VisuMZ[_0x5daea0(0x370)][_0x5daea0(0x5e5)][_0x5daea0(0x129)](this),this[_0x5daea0(0xd1)]();},Spriteset_Base['prototype'][_0x140e58(0xd1)]=function(){const _0xf0bf5b=_0x140e58;this['_fauxAnimationSprites']=[],this[_0xf0bf5b(0x148)]=[],this[_0xf0bf5b(0x446)]=this[_0xf0bf5b(0x61a)]['x'],this[_0xf0bf5b(0x5d4)]=this[_0xf0bf5b(0x61a)]['y'];},VisuMZ['CoreEngine']['Spriteset_Base_destroy']=Spriteset_Base[_0x140e58(0x468)]['destroy'],Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x734)]=function(_0x325f29){const _0x53b919=_0x140e58;this[_0x53b919(0x1d4)](),this[_0x53b919(0x696)](),VisuMZ[_0x53b919(0x370)][_0x53b919(0x860)][_0x53b919(0x129)](this,_0x325f29);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x2ab)]=Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x8b3)],Spriteset_Base['prototype'][_0x140e58(0x8b3)]=function(){const _0x5590a0=_0x140e58;VisuMZ[_0x5590a0(0x370)][_0x5590a0(0x2ab)][_0x5590a0(0x129)](this),this[_0x5590a0(0x7d6)](),this[_0x5590a0(0x89e)](),this[_0x5590a0(0x12b)]();},Spriteset_Base['prototype'][_0x140e58(0x7d6)]=function(){const _0x32dc33=_0x140e58;if(!VisuMZ['CoreEngine']['Settings'][_0x32dc33(0x1f0)][_0x32dc33(0x6b2)])return;if(this[_0x32dc33(0x446)]===this[_0x32dc33(0x61a)]['x']&&this[_0x32dc33(0x5d4)]===this[_0x32dc33(0x61a)]['y'])return;this[_0x32dc33(0x51a)](),this[_0x32dc33(0x446)]=this['scale']['x'],this[_0x32dc33(0x5d4)]=this[_0x32dc33(0x61a)]['y'];},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x51a)]=function(){const _0x48c686=_0x140e58;if(this[_0x48c686(0x61a)]['x']!==0x0){if(_0x48c686(0x6fb)===_0x48c686(0x6fb))this['_pictureContainer']['scale']['x']=0x1/this[_0x48c686(0x61a)]['x'],this[_0x48c686(0x755)]['x']=-(this['x']/this[_0x48c686(0x61a)]['x']);else{let _0x28fc7f=_0x4bff47[_0x48c686(0x1d1)](0x0,this[_0x48c686(0x1b6)]());const _0x186167=this[_0x48c686(0x2c9)](),_0x492f67=this['maxCols']();if(this[_0x48c686(0x191)]()&&_0x28fc7f>0x0||_0x49f6bd&&_0x492f67===0x1){_0x28fc7f-=_0x492f67;if(_0x28fc7f<=0x0)_0x28fc7f=0x0;this[_0x48c686(0x822)](_0x28fc7f);}else!this[_0x48c686(0x191)]()&&((_0x28fc7f>=_0x492f67||_0x4e8823&&_0x492f67===0x1)&&this[_0x48c686(0x822)]((_0x28fc7f-_0x492f67+_0x186167)%_0x186167));}}this[_0x48c686(0x61a)]['y']!==0x0&&(this[_0x48c686(0x755)][_0x48c686(0x61a)]['y']=0x1/this['scale']['y'],this[_0x48c686(0x755)]['y']=-(this['y']/this['scale']['y']));},VisuMZ['CoreEngine'][_0x140e58(0x72a)]=Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x14b)],Spriteset_Base['prototype']['updatePosition']=function(){const _0x491eec=_0x140e58;VisuMZ[_0x491eec(0x370)][_0x491eec(0x72a)][_0x491eec(0x129)](this),this[_0x491eec(0x175)]();},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x175)]=function(){const _0x55e577=_0x140e58;if(!$gameScreen)return;if($gameScreen[_0x55e577(0x498)]<=0x0)return;this['x']-=Math[_0x55e577(0x372)]($gameScreen[_0x55e577(0x780)]());const _0x3bc50a=$gameScreen[_0x55e577(0x2bb)]();switch($gameScreen[_0x55e577(0x2bb)]()){case _0x55e577(0x5dc):this[_0x55e577(0x89a)]();break;case _0x55e577(0x6a0):this['updatePositionCoreEngineShakeHorz']();break;case _0x55e577(0x85e):this[_0x55e577(0x3d7)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x89a)]=function(){const _0x125a38=_0x140e58,_0x1840ef=VisuMZ['CoreEngine']['Settings'][_0x125a38(0x77e)];if(_0x1840ef&&_0x1840ef[_0x125a38(0x2b8)])return _0x1840ef[_0x125a38(0x2b8)][_0x125a38(0x129)](this);this['x']+=Math[_0x125a38(0x372)]($gameScreen['shake']());},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x646)]=function(){const _0x328200=_0x140e58,_0x3510f7=VisuMZ[_0x328200(0x370)]['Settings']['ScreenShake'];if(_0x3510f7&&_0x3510f7[_0x328200(0x16f)])return _0x3510f7[_0x328200(0x16f)][_0x328200(0x129)](this);const _0x62a83c=$gameScreen['_shakePower']*0.75,_0x2cba89=$gameScreen['_shakeSpeed']*0.6,_0x1211fb=$gameScreen[_0x328200(0x498)];this['x']+=Math[_0x328200(0x372)](Math['randomInt'](_0x62a83c)-Math[_0x328200(0x2f7)](_0x2cba89))*(Math[_0x328200(0x6a4)](_0x1211fb,0x1e)*0.5),this['y']+=Math['round'](Math[_0x328200(0x2f7)](_0x62a83c)-Math['randomInt'](_0x2cba89))*(Math[_0x328200(0x6a4)](_0x1211fb,0x1e)*0.5);},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x45a)]=function(){const _0x51f275=_0x140e58,_0x39985b=VisuMZ[_0x51f275(0x370)]['Settings'][_0x51f275(0x77e)];if(_0x39985b&&_0x39985b[_0x51f275(0x2a8)])return _0x39985b[_0x51f275(0x2a8)][_0x51f275(0x129)](this);const _0x536004=$gameScreen[_0x51f275(0x43e)]*0.75,_0x33eb12=$gameScreen['_shakeSpeed']*0.6,_0x363c1f=$gameScreen[_0x51f275(0x498)];this['x']+=Math[_0x51f275(0x372)](Math[_0x51f275(0x2f7)](_0x536004)-Math['randomInt'](_0x33eb12))*(Math[_0x51f275(0x6a4)](_0x363c1f,0x1e)*0.5);},Spriteset_Base[_0x140e58(0x468)]['updatePositionCoreEngineShakeVert']=function(){const _0x42e434=_0x140e58,_0x58b27d=VisuMZ[_0x42e434(0x370)][_0x42e434(0x452)][_0x42e434(0x77e)];if(_0x58b27d&&_0x58b27d[_0x42e434(0x24c)])return _0x58b27d[_0x42e434(0x24c)][_0x42e434(0x129)](this);const _0x1637ff=$gameScreen['_shakePower']*0.75,_0x54969f=$gameScreen['_shakeSpeed']*0.6,_0x319dda=$gameScreen[_0x42e434(0x498)];this['y']+=Math[_0x42e434(0x372)](Math[_0x42e434(0x2f7)](_0x1637ff)-Math[_0x42e434(0x2f7)](_0x54969f))*(Math[_0x42e434(0x6a4)](_0x319dda,0x1e)*0.5);},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x89e)]=function(){const _0x4fd8cc=_0x140e58;for(const _0x5727fd of this[_0x4fd8cc(0x1bd)]){if(!_0x5727fd['isPlaying']()){if(_0x4fd8cc(0x3a7)===_0x4fd8cc(0x3a7))this['removeFauxAnimation'](_0x5727fd);else return _0x1ad5bb(_0x2c8e4d['$1']);}}this[_0x4fd8cc(0x382)]();},Spriteset_Base[_0x140e58(0x468)]['processFauxAnimationRequests']=function(){const _0x2760fa=_0x140e58;for(;;){if(_0x2760fa(0x667)===_0x2760fa(0x473))this[_0x2760fa(0x7b2)]=![];else{const _0x5cfad8=$gameTemp[_0x2760fa(0x13f)]();if(_0x5cfad8)this[_0x2760fa(0x1ed)](_0x5cfad8);else{if(_0x2760fa(0x86e)==='psBsU')this[_0x2760fa(0x2fa)]();else break;}}}},Spriteset_Base['prototype'][_0x140e58(0x1ed)]=function(_0x43da44){const _0x5b7aa4=_0x140e58,_0x5eb778=$dataAnimations[_0x43da44['animationId']],_0x1cf853=_0x43da44[_0x5b7aa4(0x166)],_0xd80acd=_0x43da44[_0x5b7aa4(0x472)],_0x2a1e29=_0x43da44[_0x5b7aa4(0x74b)];let _0x2da2e0=this[_0x5b7aa4(0x871)]();const _0x3eced0=this['animationNextDelay']();if(this[_0x5b7aa4(0xf8)](_0x5eb778))for(const _0x1b93e2 of _0x1cf853){this[_0x5b7aa4(0x4e9)]([_0x1b93e2],_0x5eb778,_0xd80acd,_0x2da2e0,_0x2a1e29),_0x2da2e0+=_0x3eced0;}else this[_0x5b7aa4(0x4e9)](_0x1cf853,_0x5eb778,_0xd80acd,_0x2da2e0,_0x2a1e29);},Spriteset_Base[_0x140e58(0x468)]['createFauxAnimationSprite']=function(_0x34c14f,_0x3c49c3,_0x30146f,_0x5e6007,_0x59ffa2){const _0x3b9037=_0x140e58,_0x445b9b=this[_0x3b9037(0x8b4)](_0x3c49c3),_0x5b4a80=new(_0x445b9b?Sprite_AnimationMV:Sprite_Animation)(),_0x48a401=this[_0x3b9037(0x195)](_0x34c14f);this['animationShouldMirror'](_0x34c14f[0x0])&&(_0x30146f=!_0x30146f),_0x5b4a80[_0x3b9037(0x4ce)]=_0x34c14f,_0x5b4a80[_0x3b9037(0x843)](_0x48a401,_0x3c49c3,_0x30146f,_0x5e6007),_0x5b4a80[_0x3b9037(0x532)](_0x59ffa2),this[_0x3b9037(0x578)][_0x3b9037(0x837)](_0x5b4a80),this[_0x3b9037(0x1bd)][_0x3b9037(0x750)](_0x5b4a80);},Spriteset_Base['prototype'][_0x140e58(0x5cd)]=function(_0x165d03){const _0x2813cd=_0x140e58;this[_0x2813cd(0x1bd)][_0x2813cd(0x2fe)](_0x165d03),this[_0x2813cd(0x578)][_0x2813cd(0x45c)](_0x165d03);for(const _0x5a9768 of _0x165d03[_0x2813cd(0x4ce)]){if('rKJZw'!==_0x2813cd(0x519)){if(_0x5a9768[_0x2813cd(0x2ac)]){if(_0x2813cd(0x503)!==_0x2813cd(0x2e5))_0x5a9768[_0x2813cd(0x2ac)]();else{let _0x4a5f5a=0x0,_0x527fed=_0x254ab0[_0x2813cd(0x757)]-this[_0x2813cd(0x172)](),_0x4539a6=_0x2d07e2['width'],_0x50bbd0=this[_0x2813cd(0x172)]();return new _0x2690f5(_0x4a5f5a,_0x527fed,_0x4539a6,_0x50bbd0);}}}else{const _0x50c25b=this['rightArrowWidth']();this[_0x2813cd(0x848)](_0x264c48[_0x2813cd(0x834)]());const _0x41d925=_0x5cc900[_0x2813cd(0x370)][_0x2813cd(0x452)]['UI']['ParamArrow'];this[_0x2813cd(0xd0)](_0x41d925,_0x115698,_0x5f7469,_0x50c25b,_0x2813cd(0x5c3));}}_0x165d03[_0x2813cd(0x734)]();},Spriteset_Base['prototype'][_0x140e58(0x1d4)]=function(){const _0x23d552=_0x140e58;for(const _0x3b11ad of this[_0x23d552(0x1bd)]){this['removeFauxAnimation'](_0x3b11ad);}},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x86b)]=function(){const _0x5df44c=_0x140e58;return this[_0x5df44c(0x1bd)]['length']>0x0;},Spriteset_Base['prototype'][_0x140e58(0x12b)]=function(){const _0x20527e=_0x140e58;for(const _0x5969bf of this['_pointAnimationSprites']){!_0x5969bf[_0x20527e(0x78d)]()&&this[_0x20527e(0x437)](_0x5969bf);}this['processPointAnimationRequests']();},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x258)]=function(){const _0x53bf5c=_0x140e58;for(;;){const _0x5ea8a4=$gameTemp[_0x53bf5c(0x340)]();if(_0x5ea8a4){if('yRcKK'===_0x53bf5c(0x6c1))return _0x524a56[_0x53bf5c(0x370)]['Settings'][_0x53bf5c(0x1f0)]['AccuracyBoost']&&this[_0x53bf5c(0x1e5)]()['isActor']()?this[_0x53bf5c(0x1e5)]()[_0x53bf5c(0x763)]+0.05:this[_0x53bf5c(0x1e5)]()[_0x53bf5c(0x763)];else this[_0x53bf5c(0x669)](_0x5ea8a4);}else break;}},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x669)]=function(_0x306ba0){const _0xa725c0=_0x140e58,_0x161401=$dataAnimations[_0x306ba0[_0xa725c0(0x134)]],_0x543aa8=this[_0xa725c0(0x877)](_0x306ba0),_0x37de40=_0x306ba0['mirror'],_0x397145=_0x306ba0[_0xa725c0(0x74b)];let _0x10a3c0=this[_0xa725c0(0x871)]();const _0x3d5aff=this[_0xa725c0(0x249)]();if(this['isAnimationForEach'](_0x161401)){if('azjqm'===_0xa725c0(0x38e))return _0x4ed552;else for(const _0x2dc08b of _0x543aa8){this['createPointAnimationSprite']([_0x2dc08b],_0x161401,_0x37de40,_0x10a3c0,_0x397145),_0x10a3c0+=_0x3d5aff;}}else{if(_0xa725c0(0x6c4)===_0xa725c0(0x745))return _0x407f41['actor']()?_0x375e13['actor']()[_0xa725c0(0x29f)](_0x2a6e7a):_0xdfad7[_0xa725c0(0x468)]['isEnabled']['call'](this,_0x11e36b);else this['createPointAnimationSprite'](_0x543aa8,_0x161401,_0x37de40,_0x10a3c0,_0x397145);}},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x877)]=function(_0x15e4c0){const _0xd3d6d6=_0x140e58,_0x28879b=new Sprite_Clickable();_0x28879b['x']=_0x15e4c0['x'],_0x28879b['y']=_0x15e4c0['y'],_0x28879b['z']=0x64;const _0x58c23a=this[_0xd3d6d6(0x39a)]();return _0x58c23a[_0xd3d6d6(0x837)](_0x28879b),[_0x28879b];},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x39a)]=function(){return this;},Spriteset_Map[_0x140e58(0x468)][_0x140e58(0x39a)]=function(){const _0x2108c0=_0x140e58;return this[_0x2108c0(0x73e)]||this;},Spriteset_Battle[_0x140e58(0x468)][_0x140e58(0x39a)]=function(){return this['_battleField']||this;},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x599)]=function(_0x54097b,_0x64e04,_0x5db81b,_0x2b6b1e,_0x35ac05){const _0x26040b=_0x140e58,_0x33b63c=this[_0x26040b(0x8b4)](_0x64e04),_0x3ee5df=new(_0x33b63c?Sprite_AnimationMV:Sprite_Animation)();_0x3ee5df[_0x26040b(0x4ce)]=_0x54097b,_0x3ee5df[_0x26040b(0x843)](_0x54097b,_0x64e04,_0x5db81b,_0x2b6b1e),_0x3ee5df[_0x26040b(0x532)](_0x35ac05),this[_0x26040b(0x578)][_0x26040b(0x837)](_0x3ee5df),this[_0x26040b(0x148)]['push'](_0x3ee5df);},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x437)]=function(_0x16925c){const _0x23da4a=_0x140e58;this[_0x23da4a(0x148)][_0x23da4a(0x2fe)](_0x16925c),this[_0x23da4a(0x578)]['removeChild'](_0x16925c);for(const _0x3e530d of _0x16925c[_0x23da4a(0x4ce)]){_0x3e530d[_0x23da4a(0x2ac)]&&_0x3e530d[_0x23da4a(0x2ac)]();const _0x39f9bb=this[_0x23da4a(0x39a)]();if(_0x39f9bb)_0x39f9bb[_0x23da4a(0x45c)](_0x3e530d);}_0x16925c[_0x23da4a(0x734)]();},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x696)]=function(){const _0x2d68f7=_0x140e58;for(const _0x4e0052 of this['_pointAnimationSprites']){this[_0x2d68f7(0x437)](_0x4e0052);}},Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x613)]=function(){const _0x13a2ca=_0x140e58;return this['_pointAnimationSprites'][_0x13a2ca(0x4d7)]>0x0;},VisuMZ['CoreEngine']['Spriteset_Base_isAnimationPlaying']=Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x168)],Spriteset_Base[_0x140e58(0x468)][_0x140e58(0x168)]=function(){const _0x157e53=_0x140e58;return VisuMZ[_0x157e53(0x370)][_0x157e53(0x1f6)][_0x157e53(0x129)](this)||this['isPointAnimationPlaying']();},Spriteset_Battle[_0x140e58(0x468)][_0x140e58(0x392)]=function(){const _0x37b6b8=_0x140e58;this[_0x37b6b8(0x863)]=new PIXI[(_0x37b6b8(0x4e2))][(_0x37b6b8(0x568))](clamp=!![]),this[_0x37b6b8(0x866)]=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager['backgroundBitmap'](),this['_backgroundSprite']['filters']=[this[_0x37b6b8(0x863)]],this[_0x37b6b8(0x574)][_0x37b6b8(0x837)](this[_0x37b6b8(0x866)]);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x882)]=Spriteset_Battle[_0x140e58(0x468)][_0x140e58(0x5dd)],Spriteset_Battle['prototype'][_0x140e58(0x5dd)]=function(){const _0x540c91=_0x140e58;if(this[_0x540c91(0x63e)]()){if(_0x540c91(0x25f)===_0x540c91(0x42d)){const _0x105e4e=_0x26136d['_pictureCoordinatesMode']||0x0;(_0x105e4e<0x0||_0x105e4e>0x64||_0x64e07f['isCancelled']()||_0x5bd5e2['isTriggered'](_0x540c91(0x42b)))&&(_0x3147d3[_0x540c91(0x862)]=_0x8a45d9,_0x4c5c12[_0x540c91(0x827)](),_0x5a18f2['clear']());const _0x36ddb6=_0x157dca[_0x540c91(0x2b3)](_0x105e4e);return _0x36ddb6&&(_0x36ddb6['_x']=_0x3ebd71['_x'],_0x36ddb6['_y']=_0x53897d['_y']),_0x44006b[_0x540c91(0x370)][_0x540c91(0x2c8)](),_0x5b3c4c[_0x540c91(0x862)]!==_0x3748ad;}else this[_0x540c91(0x305)]();}VisuMZ['CoreEngine']['Spriteset_Battle_createEnemies'][_0x540c91(0x129)](this);},Spriteset_Battle['prototype'][_0x140e58(0x63e)]=function(){const _0x494e09=_0x140e58,_0x21c707=VisuMZ[_0x494e09(0x370)][_0x494e09(0x452)][_0x494e09(0x272)];if(!_0x21c707)return![];if(Utils[_0x494e09(0x485)]>=_0x494e09(0x52b)&&!_0x21c707['RepositionEnemies130'])return![];return _0x21c707[_0x494e09(0x85b)];},Spriteset_Battle['prototype']['repositionEnemiesByResolution']=function(){const _0x51a155=_0x140e58;for(member of $gameTroop['members']()){member[_0x51a155(0x7f7)]();}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x7c0)]=Window_Base[_0x140e58(0x468)]['initialize'],Window_Base[_0x140e58(0x468)][_0x140e58(0x2cd)]=function(_0x4024ae){const _0x45755c=_0x140e58;_0x4024ae['x']=Math[_0x45755c(0x372)](_0x4024ae['x']),_0x4024ae['y']=Math[_0x45755c(0x372)](_0x4024ae['y']),_0x4024ae[_0x45755c(0x3b1)]=Math[_0x45755c(0x372)](_0x4024ae['width']),_0x4024ae[_0x45755c(0x757)]=Math[_0x45755c(0x372)](_0x4024ae[_0x45755c(0x757)]),this['initDigitGrouping'](),VisuMZ[_0x45755c(0x370)][_0x45755c(0x7c0)][_0x45755c(0x129)](this,_0x4024ae),this[_0x45755c(0x840)]();},Window_Base[_0x140e58(0x468)][_0x140e58(0x2d5)]=function(){const _0x22fe3d=_0x140e58;this[_0x22fe3d(0x69e)]=VisuMZ[_0x22fe3d(0x370)][_0x22fe3d(0x452)][_0x22fe3d(0x1f0)][_0x22fe3d(0xe3)],this['_digitGroupingEx']=VisuMZ[_0x22fe3d(0x370)][_0x22fe3d(0x452)]['QoL']['DigitGroupingExText'];},Window_Base[_0x140e58(0x468)][_0x140e58(0x172)]=function(){const _0x41bfd0=_0x140e58;return VisuMZ[_0x41bfd0(0x370)][_0x41bfd0(0x452)][_0x41bfd0(0x7ad)][_0x41bfd0(0x46d)];},Window_Base[_0x140e58(0x468)][_0x140e58(0x50f)]=function(){const _0x49103d=_0x140e58;return VisuMZ[_0x49103d(0x370)]['Settings'][_0x49103d(0x7ad)][_0x49103d(0x5ff)];},Window_Base[_0x140e58(0x468)][_0x140e58(0x7dd)]=function(){const _0x2ab027=_0x140e58;if($gameSystem['windowOpacity']){if(_0x2ab027(0x236)==='ZFpFf')this[_0x2ab027(0x5e9)]=$gameSystem[_0x2ab027(0x781)]();else{this[_0x2ab027(0x84e)]={};if(_0x14f6cc[_0x2ab027(0x370)][_0x2ab027(0x452)][_0x2ab027(0x1f0)][_0x2ab027(0x39b)])this[_0x2ab027(0x7eb)]=this[_0x2ab027(0x239)];if(_0x1a3842[_0x2ab027(0x370)][_0x2ab027(0x452)][_0x2ab027(0x1f0)][_0x2ab027(0x6a8)])this[_0x2ab027(0x54c)]=this[_0x2ab027(0x50c)];}}else this['backOpacity']=VisuMZ[_0x2ab027(0x370)][_0x2ab027(0x452)][_0x2ab027(0x7ad)][_0x2ab027(0x867)];},Window_Base['prototype'][_0x140e58(0x6df)]=function(){const _0x555396=_0x140e58;return VisuMZ[_0x555396(0x370)][_0x555396(0x452)][_0x555396(0x7ad)]['TranslucentOpacity'];},Window_Base['prototype'][_0x140e58(0x246)]=function(){const _0x31cb7c=_0x140e58;return VisuMZ[_0x31cb7c(0x370)][_0x31cb7c(0x452)][_0x31cb7c(0x7ad)][_0x31cb7c(0xe8)];},VisuMZ[_0x140e58(0x370)][_0x140e58(0x540)]=Window_Base[_0x140e58(0x468)][_0x140e58(0x8b3)],Window_Base['prototype'][_0x140e58(0x8b3)]=function(){const _0xee36e4=_0x140e58;VisuMZ[_0xee36e4(0x370)][_0xee36e4(0x540)][_0xee36e4(0x129)](this),this[_0xee36e4(0x2bd)]();},Window_Base['prototype']['updateOpen']=function(){const _0x1b5921=_0x140e58;if(this['_opening']){this[_0x1b5921(0x383)]+=this['openingSpeed']();if(this[_0x1b5921(0x4d6)]()){if('mEMmU'!==_0x1b5921(0x789))return _0x4a68fe[_0x1b5921(0x370)]['Settings']['Window'][_0x1b5921(0xe8)];else this[_0x1b5921(0x105)]=![];}}},Window_Base[_0x140e58(0x468)]['updateClose']=function(){const _0x33a650=_0x140e58;this['_closing']&&(this[_0x33a650(0x383)]-=this['openingSpeed'](),this[_0x33a650(0x3f7)]()&&(this[_0x33a650(0x7b2)]=![]));},VisuMZ[_0x140e58(0x370)]['Window_Base_drawText']=Window_Base[_0x140e58(0x468)]['drawText'],Window_Base[_0x140e58(0x468)][_0x140e58(0xd0)]=function(_0x241ce5,_0x2f0867,_0x4b285e,_0x254c2f,_0x323b1f){const _0x21bec0=_0x140e58;if(this[_0x21bec0(0x323)]())_0x241ce5=VisuMZ['GroupDigits'](_0x241ce5);VisuMZ['CoreEngine'][_0x21bec0(0x6e4)][_0x21bec0(0x129)](this,_0x241ce5,_0x2f0867,_0x4b285e,_0x254c2f,_0x323b1f);},Window_Base[_0x140e58(0x468)][_0x140e58(0x323)]=function(){return this['_digitGrouping'];},VisuMZ[_0x140e58(0x370)][_0x140e58(0x448)]=Window_Base['prototype']['createTextState'],Window_Base[_0x140e58(0x468)][_0x140e58(0x71e)]=function(_0x47fa7f,_0x31dda3,_0x269969,_0x891b24){const _0x261a54=_0x140e58;var _0x297bd5=VisuMZ[_0x261a54(0x370)][_0x261a54(0x448)][_0x261a54(0x129)](this,_0x47fa7f,_0x31dda3,_0x269969,_0x891b24);if(this[_0x261a54(0x4b1)]())_0x297bd5[_0x261a54(0x215)]=VisuMZ[_0x261a54(0x7e0)](_0x297bd5[_0x261a54(0x215)]);return _0x297bd5;},Window_Base[_0x140e58(0x468)]['useDigitGroupingEx']=function(){const _0xc3a3d2=_0x140e58;return this[_0xc3a3d2(0x74d)];},Window_Base[_0x140e58(0x468)][_0x140e58(0x35a)]=function(_0xe05588){this['_digitGrouping']=_0xe05588;},Window_Base[_0x140e58(0x468)][_0x140e58(0x3d5)]=function(_0x5dbd7d){const _0x475171=_0x140e58;this[_0x475171(0x74d)]=_0x5dbd7d;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x6a9)]=Window_Base[_0x140e58(0x468)][_0x140e58(0x5c4)],Window_Base[_0x140e58(0x468)]['drawIcon']=function(_0x51e10c,_0x11092b,_0x3974cc){const _0x56d47b=_0x140e58;_0x11092b=Math['round'](_0x11092b),_0x3974cc=Math[_0x56d47b(0x372)](_0x3974cc),VisuMZ['CoreEngine'][_0x56d47b(0x6a9)][_0x56d47b(0x129)](this,_0x51e10c,_0x11092b,_0x3974cc);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x893)]=Window_Base[_0x140e58(0x468)][_0x140e58(0x27b)],Window_Base[_0x140e58(0x468)][_0x140e58(0x27b)]=function(_0x361592,_0x5773bb,_0x1c673b,_0x2961d3,_0x32f092,_0x12d8be){const _0xe6765a=_0x140e58;_0x32f092=_0x32f092||ImageManager['faceWidth'],_0x12d8be=_0x12d8be||ImageManager[_0xe6765a(0x28b)],_0x1c673b=Math[_0xe6765a(0x372)](_0x1c673b),_0x2961d3=Math[_0xe6765a(0x372)](_0x2961d3),_0x32f092=Math[_0xe6765a(0x372)](_0x32f092),_0x12d8be=Math[_0xe6765a(0x372)](_0x12d8be),VisuMZ[_0xe6765a(0x370)][_0xe6765a(0x893)][_0xe6765a(0x129)](this,_0x361592,_0x5773bb,_0x1c673b,_0x2961d3,_0x32f092,_0x12d8be);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x7b7)]=Window_Base[_0x140e58(0x468)]['drawCharacter'],Window_Base['prototype']['drawCharacter']=function(_0x22bf66,_0x5f437e,_0x195f69,_0x2865d0){const _0x251764=_0x140e58;_0x195f69=Math['round'](_0x195f69),_0x2865d0=Math[_0x251764(0x372)](_0x2865d0),VisuMZ[_0x251764(0x370)]['Window_Base_drawCharacter'][_0x251764(0x129)](this,_0x22bf66,_0x5f437e,_0x195f69,_0x2865d0);},VisuMZ['CoreEngine'][_0x140e58(0x5fb)]=Window_Selectable[_0x140e58(0x468)][_0x140e58(0x738)],Window_Selectable[_0x140e58(0x468)][_0x140e58(0x738)]=function(_0x41b477){const _0x593a85=_0x140e58;let _0x21d598=VisuMZ[_0x593a85(0x370)][_0x593a85(0x5fb)][_0x593a85(0x129)](this,_0x41b477);return _0x21d598['x']=Math[_0x593a85(0x372)](_0x21d598['x']),_0x21d598['y']=Math[_0x593a85(0x372)](_0x21d598['y']),_0x21d598[_0x593a85(0x3b1)]=Math[_0x593a85(0x372)](_0x21d598[_0x593a85(0x3b1)]),_0x21d598['height']=Math[_0x593a85(0x372)](_0x21d598[_0x593a85(0x757)]),_0x21d598;},VisuMZ['CoreEngine']['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x140e58(0x468)][_0x140e58(0x25d)],Window_StatusBase[_0x140e58(0x468)]['drawActorSimpleStatus']=function(_0x3580b7,_0x4900a0,_0x12c989){const _0x5af5f9=_0x140e58;_0x4900a0=Math['round'](_0x4900a0),_0x12c989=Math['round'](_0x12c989),VisuMZ[_0x5af5f9(0x370)]['Window_StatusBase_drawActorSimpleStatus'][_0x5af5f9(0x129)](this,_0x3580b7,_0x4900a0,_0x12c989);},Window_Base[_0x140e58(0x468)][_0x140e58(0x840)]=function(){const _0x216e83=_0x140e58;this[_0x216e83(0x6ce)]={'duration':0x0,'wholeDuration':0x0,'type':_0x216e83(0x2f4),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x216e83(0x61a)]['x'],'targetScaleY':this[_0x216e83(0x61a)]['y'],'targetOpacity':this[_0x216e83(0x335)],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x216e83(0x19b)]};},Window_Base[_0x140e58(0x468)][_0x140e58(0x2bd)]=function(){const _0x49c0c2=_0x140e58;if(!this['_coreEasing'])return;if(this['_coreEasing']['duration']<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x49c0c2(0x6ce)]['targetX']),this['y']=this[_0x49c0c2(0x873)](this['y'],this[_0x49c0c2(0x6ce)]['targetY']),this[_0x49c0c2(0x61a)]['x']=this[_0x49c0c2(0x873)](this[_0x49c0c2(0x61a)]['x'],this[_0x49c0c2(0x6ce)]['targetScaleX']),this[_0x49c0c2(0x61a)]['y']=this[_0x49c0c2(0x873)](this[_0x49c0c2(0x61a)]['y'],this[_0x49c0c2(0x6ce)][_0x49c0c2(0x7e9)]),this[_0x49c0c2(0x335)]=this['applyCoreEasing'](this[_0x49c0c2(0x335)],this[_0x49c0c2(0x6ce)][_0x49c0c2(0x311)]),this[_0x49c0c2(0x5e9)]=this[_0x49c0c2(0x873)](this['backOpacity'],this[_0x49c0c2(0x6ce)][_0x49c0c2(0x29d)]),this['contentsOpacity']=this[_0x49c0c2(0x873)](this[_0x49c0c2(0x19b)],this[_0x49c0c2(0x6ce)][_0x49c0c2(0x420)]),this[_0x49c0c2(0x6ce)]['duration']--;},Window_Base[_0x140e58(0x468)]['applyCoreEasing']=function(_0x1bae3c,_0x12d036){const _0x4df3a5=_0x140e58;if(!this['_coreEasing'])return _0x12d036;const _0x1c47b4=this[_0x4df3a5(0x6ce)][_0x4df3a5(0x20d)],_0x3fc67b=this[_0x4df3a5(0x6ce)]['wholeDuration'],_0x1bffb9=this[_0x4df3a5(0x361)]((_0x3fc67b-_0x1c47b4)/_0x3fc67b),_0x3e7382=this[_0x4df3a5(0x361)]((_0x3fc67b-_0x1c47b4+0x1)/_0x3fc67b),_0x5e8035=(_0x1bae3c-_0x12d036*_0x1bffb9)/(0x1-_0x1bffb9);return _0x5e8035+(_0x12d036-_0x5e8035)*_0x3e7382;},Window_Base['prototype']['calcCoreEasing']=function(_0x1ea33e){const _0x284a1c=_0x140e58;if(!this[_0x284a1c(0x6ce)])return _0x1ea33e;return VisuMZ['ApplyEasing'](_0x1ea33e,this[_0x284a1c(0x6ce)]['type']||_0x284a1c(0x2f4));},Window_Base[_0x140e58(0x468)]['anchorCoreEasing']=function(_0x30d808,_0x4dc4e9){const _0x2c7058=_0x140e58;if(!this[_0x2c7058(0x6ce)])return;this['x']=this[_0x2c7058(0x6ce)][_0x2c7058(0x539)],this['y']=this['_coreEasing'][_0x2c7058(0x7b3)],this[_0x2c7058(0x61a)]['x']=this[_0x2c7058(0x6ce)][_0x2c7058(0x57f)],this[_0x2c7058(0x61a)]['y']=this[_0x2c7058(0x6ce)][_0x2c7058(0x7e9)],this[_0x2c7058(0x335)]=this['_coreEasing'][_0x2c7058(0x311)],this['backOpacity']=this[_0x2c7058(0x6ce)][_0x2c7058(0x29d)],this[_0x2c7058(0x19b)]=this[_0x2c7058(0x6ce)][_0x2c7058(0x420)],this[_0x2c7058(0x1d2)](_0x30d808,_0x4dc4e9,this['x'],this['y'],this[_0x2c7058(0x61a)]['x'],this[_0x2c7058(0x61a)]['y'],this[_0x2c7058(0x335)],this['backOpacity'],this[_0x2c7058(0x19b)]);},Window_Base[_0x140e58(0x468)]['setupCoreEasing']=function(_0x3dc563,_0x4bbc49,_0x4e05de,_0x3c298b,_0x3a06f5,_0x1ac573,_0x2cb44d,_0x5cbf89,_0x20482e){const _0x25cc80=_0x140e58;this[_0x25cc80(0x6ce)]={'duration':_0x3dc563,'wholeDuration':_0x3dc563,'type':_0x4bbc49,'targetX':_0x4e05de,'targetY':_0x3c298b,'targetScaleX':_0x3a06f5,'targetScaleY':_0x1ac573,'targetOpacity':_0x2cb44d,'targetBackOpacity':_0x5cbf89,'targetContentsOpacity':_0x20482e};},Window_Base[_0x140e58(0x468)][_0x140e58(0x28c)]=function(_0x181ff7,_0x234d99,_0x2ddc91,_0x3b29fb,_0x2336dc){const _0x229725=_0x140e58;this['resetFontSettings'](),this[_0x229725(0x7be)][_0x229725(0x1b8)]=VisuMZ['CoreEngine']['Settings']['Gold'][_0x229725(0x4b4)];const _0x3b84af=VisuMZ[_0x229725(0x370)][_0x229725(0x452)][_0x229725(0x30f)][_0x229725(0x1e9)];if(_0x3b84af>0x0&&_0x234d99===TextManager[_0x229725(0x5b9)]){if('KyVYq'===_0x229725(0x7c3)){const _0x22e086=_0x3b29fb+(this[_0x229725(0x172)]()-ImageManager[_0x229725(0x637)])/0x2;this[_0x229725(0x5c4)](_0x3b84af,_0x2ddc91+(_0x2336dc-ImageManager[_0x229725(0x3d6)]),_0x22e086),_0x2336dc-=ImageManager[_0x229725(0x3d6)]+0x4;}else _0x47f816['CoreEngine'][_0x229725(0x50a)][_0x229725(0x129)](this);}else{if(_0x229725(0x4b5)!==_0x229725(0x4b5)){const _0x45e7c7=_0x229725(0x66d);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x45e7c7])return this[_0x229725(0x64a)][_0x45e7c7];const _0x3b4974=_0x1b89f2[_0x229725(0x370)][_0x229725(0x452)][_0x229725(0x543)][_0x229725(0x6ee)];return this[_0x229725(0x45f)](_0x45e7c7,_0x3b4974);}else this[_0x229725(0x848)](ColorManager['systemColor']()),this['drawText'](_0x234d99,_0x2ddc91,_0x3b29fb,_0x2336dc,_0x229725(0x1c0)),_0x2336dc-=this[_0x229725(0x851)](_0x234d99)+0x6;}this[_0x229725(0x353)]();const _0x534065=this[_0x229725(0x851)](this[_0x229725(0x69e)]?VisuMZ[_0x229725(0x7e0)](_0x181ff7):_0x181ff7);_0x534065>_0x2336dc?this[_0x229725(0xd0)](VisuMZ[_0x229725(0x370)][_0x229725(0x452)][_0x229725(0x30f)][_0x229725(0x64e)],_0x2ddc91,_0x3b29fb,_0x2336dc,'right'):_0x229725(0x80f)!=='SDtxQ'?this[_0x229725(0xd0)](_0x181ff7,_0x2ddc91,_0x3b29fb,_0x2336dc,_0x229725(0x1c0)):(_0x5802c3['CoreEngine'][_0x229725(0xfb)][_0x229725(0x129)](this),_0x37079b[_0x229725(0x25a)]('keypress',this[_0x229725(0x115)][_0x229725(0xfe)](this))),this[_0x229725(0x54f)]();},Window_Base[_0x140e58(0x468)][_0x140e58(0x160)]=function(_0x25c6d0,_0x226dc8,_0x1cfc12,_0x2d387b,_0xfc5163){const _0x151989=_0x140e58,_0x4bf6c=ImageManager[_0x151989(0x3aa)](_0x151989(0x4b7)),_0x2e4b60=ImageManager['iconWidth'],_0x55c317=ImageManager['iconHeight'],_0x16d4c2=_0x25c6d0%0x10*_0x2e4b60,_0x26b61a=Math[_0x151989(0x184)](_0x25c6d0/0x10)*_0x55c317,_0x3e4e10=_0x2d387b,_0x3f4816=_0x2d387b;this['contents'][_0x151989(0x33f)][_0x151989(0x847)]=_0xfc5163,this['contents'][_0x151989(0x2f5)](_0x4bf6c,_0x16d4c2,_0x26b61a,_0x2e4b60,_0x55c317,_0x226dc8,_0x1cfc12,_0x3e4e10,_0x3f4816),this['contents'][_0x151989(0x33f)][_0x151989(0x847)]=!![];},Window_Base['prototype']['drawGauge']=function(_0x9efa5a,_0x51f9c3,_0x29b3c0,_0x35b64d,_0x588ef3,_0x19aa59){const _0x26493f=_0x140e58,_0x52f88f=Math[_0x26493f(0x184)]((_0x29b3c0-0x2)*_0x35b64d),_0x8bb56f=Sprite_Gauge[_0x26493f(0x468)][_0x26493f(0x264)]['call'](this),_0x105e5d=_0x51f9c3+this[_0x26493f(0x172)]()-_0x8bb56f-0x2;this[_0x26493f(0x7be)]['fillRect'](_0x9efa5a,_0x105e5d,_0x29b3c0,_0x8bb56f,ColorManager[_0x26493f(0x895)]()),this[_0x26493f(0x7be)][_0x26493f(0x7ce)](_0x9efa5a+0x1,_0x105e5d+0x1,_0x52f88f,_0x8bb56f-0x2,_0x588ef3,_0x19aa59);},Window_Selectable['prototype'][_0x140e58(0x652)]=function(_0x376f54){const _0x32db47=_0x140e58;let _0x3bb612=this[_0x32db47(0x1b6)]();const _0x3bbd28=this[_0x32db47(0x2c9)](),_0x48dc8f=this['maxCols']();if(this['isUseModernControls']()&&(_0x3bb612<_0x3bbd28||_0x376f54&&_0x48dc8f===0x1)){_0x3bb612+=_0x48dc8f;if(_0x3bb612>=_0x3bbd28)_0x3bb612=_0x3bbd28-0x1;this['smoothSelect'](_0x3bb612);}else!this[_0x32db47(0x191)]()&&((_0x3bb612<_0x3bbd28-_0x48dc8f||_0x376f54&&_0x48dc8f===0x1)&&this[_0x32db47(0x822)]((_0x3bb612+_0x48dc8f)%_0x3bbd28));},VisuMZ[_0x140e58(0x370)][_0x140e58(0x315)]=Window_Selectable['prototype']['cursorDown'],Window_Selectable['prototype'][_0x140e58(0x652)]=function(_0x133e98){const _0x311ddd=_0x140e58;this['isUseModernControls']()&&_0x133e98&&this[_0x311ddd(0x806)]()===0x1&&this[_0x311ddd(0x1b6)]()===this[_0x311ddd(0x2c9)]()-0x1?_0x311ddd(0x8b6)===_0x311ddd(0x8b6)?this[_0x311ddd(0x822)](0x0):this[_0x311ddd(0x2d2)][_0x311ddd(0x67c)](_0x4b7f67[_0x311ddd(0x579)]['NumberBgType']):_0x311ddd(0x2cf)===_0x311ddd(0x2cf)?VisuMZ[_0x311ddd(0x370)][_0x311ddd(0x315)][_0x311ddd(0x129)](this,_0x133e98):this[_0x311ddd(0x409)]=_0x50509c;},Window_Selectable[_0x140e58(0x468)][_0x140e58(0x5ee)]=function(_0x27b5b4){const _0x2e0188=_0x140e58;let _0x3dacf4=Math[_0x2e0188(0x1d1)](0x0,this[_0x2e0188(0x1b6)]());const _0x30c698=this[_0x2e0188(0x2c9)](),_0x3c68e3=this[_0x2e0188(0x806)]();if(this[_0x2e0188(0x191)]()&&_0x3dacf4>0x0||_0x27b5b4&&_0x3c68e3===0x1){if('aGHyz'===_0x2e0188(0x200))return this[_0x2e0188(0x501)]!==_0x4b5d24['_origin']||this[_0x2e0188(0x22f)]!==_0x2148a0['_x']||this[_0x2e0188(0x4d1)]!==_0xb727ec['_y'];else{_0x3dacf4-=_0x3c68e3;if(_0x3dacf4<=0x0)_0x3dacf4=0x0;this[_0x2e0188(0x822)](_0x3dacf4);}}else!this[_0x2e0188(0x191)]()&&(_0x2e0188(0x7ac)!==_0x2e0188(0x7ac)?(_0x445d86(_0x2e0188(0x70d)[_0x2e0188(0x722)](_0xa56694,_0x55e4da,_0x22ed6d)),_0x5a32d8['exit']()):(_0x3dacf4>=_0x3c68e3||_0x27b5b4&&_0x3c68e3===0x1)&&this[_0x2e0188(0x822)]((_0x3dacf4-_0x3c68e3+_0x30c698)%_0x30c698));},VisuMZ['CoreEngine']['Window_Selectable_cursorUp']=Window_Selectable['prototype'][_0x140e58(0x5ee)],Window_Selectable[_0x140e58(0x468)]['cursorUp']=function(_0x55ef78){const _0x19e7b3=_0x140e58;if(this[_0x19e7b3(0x191)]()&&_0x55ef78&&this['maxCols']()===0x1&&this['index']()===0x0)'bAaXN'!==_0x19e7b3(0x81a)?this[_0x19e7b3(0x822)](this[_0x19e7b3(0x2c9)]()-0x1):(this[_0x19e7b3(0x383)]+=this[_0x19e7b3(0x246)](),this[_0x19e7b3(0x4d6)]()&&(this[_0x19e7b3(0x105)]=![]));else{if(_0x19e7b3(0x190)!==_0x19e7b3(0x3c8))VisuMZ['CoreEngine'][_0x19e7b3(0x829)][_0x19e7b3(0x129)](this,_0x55ef78);else{const _0x55bf3b=_0x4f0d9f[_0x19e7b3(0x673)](_0x5afe79)+0x1;let _0x121c03=_0x489000+_0x19e7b3(0x65f),_0x16fc9e=_0x31d2d6[_0x19e7b3(0x370)]['ExtractStrFromList'](_0x45e7df[_0x19e7b3(0x351)]);if(_0x16fc9e['length']>0x0){if(_0x306d8a[_0x19e7b3(0x4d7)]>0x0)_0x3b78c1+=_0x6f2250+_0x19e7b3(0x6aa);else{const _0x121ce0=_0x1e50b0[_0x181ed6][_0x19e7b3(0x6f8)];_0x53220a+=_0x6cca3e+_0x19e7b3(0x74f)[_0x19e7b3(0x722)](_0x9ac743,_0x121ce0||'Unnamed')+_0x6e6667;}_0x17d562+=_0x121c03[_0x19e7b3(0x722)](_0x643cef,_0x29ca1e,_0x55bf3b,_0x16fc9e);}}}},Window_Selectable[_0x140e58(0x468)][_0x140e58(0x191)]=function(){const _0x2337f0=_0x140e58;return VisuMZ[_0x2337f0(0x370)][_0x2337f0(0x452)]['QoL'][_0x2337f0(0x2e1)];},VisuMZ['CoreEngine'][_0x140e58(0x816)]=Window_Selectable[_0x140e58(0x468)][_0x140e58(0x3d8)],Window_Selectable[_0x140e58(0x468)][_0x140e58(0x3d8)]=function(){const _0x1b44de=_0x140e58;if(this[_0x1b44de(0x191)]())this['processCursorMoveModernControls'](),this[_0x1b44de(0x2b9)]();else{if(_0x1b44de(0x7b6)!==_0x1b44de(0x7b6))return this[_0x1b44de(0x1b0)]();else VisuMZ[_0x1b44de(0x370)][_0x1b44de(0x816)]['call'](this);}},Window_Selectable['prototype'][_0x140e58(0x5e6)]=function(){return!![];},Window_Selectable[_0x140e58(0x468)][_0x140e58(0x3e2)]=function(){const _0x14b7ea=_0x140e58;if(this[_0x14b7ea(0xda)]()){const _0x441b03=this[_0x14b7ea(0x1b6)]();if(Input[_0x14b7ea(0x615)](_0x14b7ea(0x3ce))){if(_0x14b7ea(0x3ba)==='HuGjM'){if(this['_CoreEngineSettings']===_0x171db6)this['initCoreEngine']();if(this[_0x14b7ea(0x6f2)]['TimeProgress']===_0x1f726a)this['initCoreEngine']();this['_CoreEngineSettings']['FontSize']=_0xfe77a;}else Input[_0x14b7ea(0x26f)](_0x14b7ea(0xd7))&&this[_0x14b7ea(0x5e6)]()?this[_0x14b7ea(0x77d)]():this[_0x14b7ea(0x652)](Input[_0x14b7ea(0x709)]('down'));}if(Input[_0x14b7ea(0x615)]('up')){if(_0x14b7ea(0x7bc)!==_0x14b7ea(0x3a2))Input[_0x14b7ea(0x26f)](_0x14b7ea(0xd7))&&this[_0x14b7ea(0x5e6)]()?this['cursorPageup']():this['cursorUp'](Input[_0x14b7ea(0x709)]('up'));else{if(_0x3f0bfd[_0x14b7ea(0x6d7)]())return;_0x220943[_0x14b7ea(0x222)](_0x5dde1a,_0x212750);const _0x452d94=_0x2d3373[_0x14b7ea(0x4cb)],_0x472f4f=(_0x36b53e['Chance']||0x0)/0x64;for(const _0x772c92 of _0x452d94){const _0xe86c89=_0x59c315[_0x14b7ea(0x839)]()<=_0x472f4f;_0x32aa2a[_0x14b7ea(0x477)](_0x772c92,_0xe86c89);}}}Input['isRepeated'](_0x14b7ea(0x1c0))&&this[_0x14b7ea(0x65b)](Input['isTriggered'](_0x14b7ea(0x1c0))),Input[_0x14b7ea(0x615)](_0x14b7ea(0x332))&&this[_0x14b7ea(0x193)](Input[_0x14b7ea(0x709)]('left')),!this[_0x14b7ea(0x457)](_0x14b7ea(0x627))&&Input[_0x14b7ea(0x615)]('pagedown')&&(_0x14b7ea(0x2fc)===_0x14b7ea(0x68c)?_0x55b689+=_0x488037(_0xc74042):this[_0x14b7ea(0x77d)]()),!this[_0x14b7ea(0x457)](_0x14b7ea(0x5b1))&&Input[_0x14b7ea(0x615)](_0x14b7ea(0x5b1))&&this[_0x14b7ea(0x4c4)](),this[_0x14b7ea(0x1b6)]()!==_0x441b03&&this[_0x14b7ea(0x7c9)]();}},Window_Selectable['prototype'][_0x140e58(0x2b9)]=function(){const _0x472c32=_0x140e58;if(this[_0x472c32(0xda)]()){const _0x57a6e6=this[_0x472c32(0x1b6)]();if(Input[_0x472c32(0x709)]('home')){if('BDqUk'!==_0x472c32(0x337))this['smoothSelect'](Math[_0x472c32(0x6a4)](this[_0x472c32(0x1b6)](),0x0));else return _0x509163['outlineColorGauge']();}Input[_0x472c32(0x709)]('end')&&this[_0x472c32(0x822)](Math[_0x472c32(0x1d1)](this[_0x472c32(0x1b6)](),this[_0x472c32(0x2c9)]()-0x1)),this[_0x472c32(0x1b6)]()!==_0x57a6e6&&this['playCursorSound']();}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x7d1)]=Window_Selectable[_0x140e58(0x468)]['processTouch'],Window_Selectable[_0x140e58(0x468)][_0x140e58(0x313)]=function(){const _0x4c0536=_0x140e58;this[_0x4c0536(0x191)]()?_0x4c0536(0xcb)===_0x4c0536(0x6e2)?(this[_0x4c0536(0x741)]&&this[_0x4c0536(0x741)]['setBackgroundType'](_0x257a01[_0x4c0536(0x579)]['HelpBgType']),this[_0x4c0536(0x5ab)]&&this['_listWindow'][_0x4c0536(0x67c)](_0x53ff61['layoutSettings'][_0x4c0536(0x61f)])):this[_0x4c0536(0x2ea)]():VisuMZ[_0x4c0536(0x370)][_0x4c0536(0x7d1)]['call'](this);},Window_Selectable[_0x140e58(0x468)][_0x140e58(0x2ea)]=function(){const _0x11d919=_0x140e58;VisuMZ[_0x11d919(0x370)]['Window_Selectable_processTouch']['call'](this);},Window_Selectable[_0x140e58(0x468)]['colSpacing']=function(){const _0x1d2419=_0x140e58;return VisuMZ[_0x1d2419(0x370)][_0x1d2419(0x452)][_0x1d2419(0x7ad)]['ColSpacing'];},Window_Selectable[_0x140e58(0x468)][_0x140e58(0x39e)]=function(){const _0x1569e1=_0x140e58;return VisuMZ[_0x1569e1(0x370)]['Settings'][_0x1569e1(0x7ad)][_0x1569e1(0x146)];},Window_Selectable[_0x140e58(0x468)]['itemHeight']=function(){const _0x44be23=_0x140e58;return Window_Scrollable[_0x44be23(0x468)][_0x44be23(0x2ba)][_0x44be23(0x129)](this)+VisuMZ[_0x44be23(0x370)][_0x44be23(0x452)][_0x44be23(0x7ad)][_0x44be23(0x384)];;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x30e)]=Window_Selectable['prototype'][_0x140e58(0x623)],Window_Selectable[_0x140e58(0x468)]['drawBackgroundRect']=function(_0x237cd9){const _0x3a918d=_0x140e58,_0x197f4c=VisuMZ[_0x3a918d(0x370)][_0x3a918d(0x452)][_0x3a918d(0x7ad)];if(_0x197f4c[_0x3a918d(0x7c7)]===![])return;_0x197f4c[_0x3a918d(0x800)]?_0x3a918d(0x44b)!==_0x3a918d(0x44b)?this[_0x3a918d(0x191)]()?(this[_0x3a918d(0x3e2)](),this[_0x3a918d(0x2b9)]()):_0x15c30a['CoreEngine'][_0x3a918d(0x816)][_0x3a918d(0x129)](this):_0x197f4c['DrawItemBackgroundJS'][_0x3a918d(0x129)](this,_0x237cd9):VisuMZ['CoreEngine'][_0x3a918d(0x30e)]['call'](this,_0x237cd9);},VisuMZ[_0x140e58(0x370)]['Window_Gold_refresh']=Window_Gold[_0x140e58(0x468)][_0x140e58(0x308)],Window_Gold[_0x140e58(0x468)][_0x140e58(0x308)]=function(){const _0x276eca=_0x140e58;if(this[_0x276eca(0x884)]()){if(_0x276eca(0x139)!==_0x276eca(0x139))return typeof _0x311f89===_0x276eca(0x610)?_0x59221d[_0x276eca(0x370)][_0x276eca(0x21f)][_0x276eca(0x129)](this,_0x4ebe62):this['paramName'](_0x45147b);else this[_0x276eca(0x1a4)]();}else _0x276eca(0x4c8)!==_0x276eca(0x60c)?VisuMZ[_0x276eca(0x370)][_0x276eca(0x642)][_0x276eca(0x129)](this):(_0x187e51[_0x276eca(0x370)][_0x276eca(0x842)][_0x276eca(0x129)](this),this[_0x276eca(0x409)]=_0x1bb650,this['_inputSpecialKeyCode']=_0x504e8e,this['_gamepadWait']=_0x5e093f[_0x276eca(0x73a)]);},Window_Gold['prototype'][_0x140e58(0x884)]=function(){const _0x2fadb0=_0x140e58;if(TextManager['currencyUnit']!==this[_0x2fadb0(0x5b9)]())return![];return VisuMZ['CoreEngine'][_0x2fadb0(0x452)][_0x2fadb0(0x30f)][_0x2fadb0(0x52d)];},Window_Gold[_0x140e58(0x468)][_0x140e58(0x1a4)]=function(){const _0x30c57b=_0x140e58;this[_0x30c57b(0x54f)](),this['contents'][_0x30c57b(0x827)](),this[_0x30c57b(0x7be)][_0x30c57b(0x1b8)]=VisuMZ['CoreEngine'][_0x30c57b(0x452)][_0x30c57b(0x30f)][_0x30c57b(0x4b4)];const _0x19985c=VisuMZ['CoreEngine'][_0x30c57b(0x452)][_0x30c57b(0x30f)][_0x30c57b(0x1e9)],_0x4462db=this[_0x30c57b(0x8b7)](0x0);if(_0x19985c>0x0){if(_0x30c57b(0x629)===_0x30c57b(0x629)){const _0x11b676=_0x4462db['y']+(this[_0x30c57b(0x172)]()-ImageManager[_0x30c57b(0x637)])/0x2;this['drawIcon'](_0x19985c,_0x4462db['x'],_0x11b676);const _0x417c61=ImageManager[_0x30c57b(0x3d6)]+0x4;_0x4462db['x']+=_0x417c61,_0x4462db['width']-=_0x417c61;}else return _0x2dd1c6;}this[_0x30c57b(0x848)](ColorManager[_0x30c57b(0x834)]()),this[_0x30c57b(0xd0)](this[_0x30c57b(0x5b9)](),_0x4462db['x'],_0x4462db['y'],_0x4462db['width'],'left');const _0x54a3a4=this[_0x30c57b(0x851)](this[_0x30c57b(0x5b9)]())+0x6;;_0x4462db['x']+=_0x54a3a4,_0x4462db[_0x30c57b(0x3b1)]-=_0x54a3a4,this['resetTextColor']();const _0x3ab619=this[_0x30c57b(0x51c)](),_0x455eec=this[_0x30c57b(0x851)](this[_0x30c57b(0x69e)]?VisuMZ['GroupDigits'](this[_0x30c57b(0x51c)]()):this[_0x30c57b(0x51c)]());_0x455eec>_0x4462db[_0x30c57b(0x3b1)]?this[_0x30c57b(0xd0)](VisuMZ[_0x30c57b(0x370)]['Settings']['Gold'][_0x30c57b(0x64e)],_0x4462db['x'],_0x4462db['y'],_0x4462db[_0x30c57b(0x3b1)],_0x30c57b(0x1c0)):_0x30c57b(0x872)!==_0x30c57b(0x293)?this[_0x30c57b(0xd0)](this['value'](),_0x4462db['x'],_0x4462db['y'],_0x4462db['width'],_0x30c57b(0x1c0)):this[_0x30c57b(0x78a)][_0x30c57b(0x734)](),this[_0x30c57b(0x54f)]();},Window_StatusBase[_0x140e58(0x468)][_0x140e58(0x6f0)]=function(_0x23584c,_0x1b6c3a,_0x595343,_0x1dd8d2,_0x347c99){const _0x1e66ae=_0x140e58;_0x1dd8d2=String(_0x1dd8d2||'')[_0x1e66ae(0x5a9)]();if(VisuMZ['CoreEngine'][_0x1e66ae(0x452)][_0x1e66ae(0x3d3)][_0x1e66ae(0x36c)]){const _0x9265c2=VisuMZ[_0x1e66ae(0x5ce)](_0x1dd8d2);if(_0x347c99)this[_0x1e66ae(0x160)](_0x9265c2,_0x23584c,_0x1b6c3a,this[_0x1e66ae(0x161)]()),_0x595343-=this[_0x1e66ae(0x161)]()+0x2,_0x23584c+=this[_0x1e66ae(0x161)]()+0x2;else{if(_0x1e66ae(0x18f)!==_0x1e66ae(0x287))this['drawIcon'](_0x9265c2,_0x23584c+0x2,_0x1b6c3a+0x2),_0x595343-=ImageManager[_0x1e66ae(0x3d6)]+0x4,_0x23584c+=ImageManager['iconWidth']+0x4;else return this[_0x1e66ae(0x2d1)];}}const _0x3f39f7=TextManager[_0x1e66ae(0x2bf)](_0x1dd8d2);this[_0x1e66ae(0x54f)](),this[_0x1e66ae(0x848)](ColorManager[_0x1e66ae(0x834)]());if(_0x347c99)_0x1e66ae(0x79d)!==_0x1e66ae(0x818)?(this[_0x1e66ae(0x7be)]['fontSize']=this[_0x1e66ae(0x50e)](),this['contents'][_0x1e66ae(0xd0)](_0x3f39f7,_0x23584c,_0x1b6c3a,_0x595343,this[_0x1e66ae(0x161)](),_0x1e66ae(0x332))):(this[_0x1e66ae(0x6d1)]=![],this[_0x1e66ae(0x83e)]=!_0x4e6bed[_0x1e66ae(0x370)][_0x1e66ae(0x452)]['UI']['ShowButtons']);else{if(_0x1e66ae(0x651)!=='QlkHE')this['drawText'](_0x3f39f7,_0x23584c,_0x1b6c3a,_0x595343);else{if(_0xa1aa5f[_0x1e66ae(0x6d7)]())return;_0x342562[_0x1e66ae(0x222)](_0x41e983,_0x57a5b7);const _0x39869a=_0x2d0ba4[_0x1e66ae(0xea)];if(_0x39869a[_0x1e66ae(0x461)](/Front/i))_0x39812c['setSideView'](![]);else _0x39869a[_0x1e66ae(0x461)](/Side/i)?_0x9196ad['setSideView'](!![]):_0x22068c[_0x1e66ae(0x638)](!_0x114e83[_0x1e66ae(0x27e)]());}}this[_0x1e66ae(0x54f)]();},Window_StatusBase[_0x140e58(0x468)]['smallParamFontSize']=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x140e58(0x468)][_0x140e58(0x29e)]=function(_0x54fa5b,_0x4fb35e,_0x3dcf7e,_0x4436dd){const _0x56391f=_0x140e58;_0x4436dd=_0x4436dd||0xa8,this[_0x56391f(0x353)]();if(VisuMZ[_0x56391f(0x370)]['Settings']['UI'][_0x56391f(0x2f9)])this[_0x56391f(0x396)](_0x54fa5b['currentClass']()[_0x56391f(0x6f8)],_0x4fb35e,_0x3dcf7e,_0x4436dd);else{if('yoHYV'==='PNtPz'){this[_0x56391f(0x410)]();const _0x53c9db=_0x20d744['titleCommandWindow'][_0x56391f(0x83d)],_0x5008be=this[_0x56391f(0x6fa)]();this[_0x56391f(0x765)]=new _0x55ebb8(_0x5008be),this[_0x56391f(0x765)][_0x56391f(0x67c)](_0x53c9db);const _0x5adb72=this['commandWindowRect']();this['_commandWindow'][_0x56391f(0x554)](_0x5adb72['x'],_0x5adb72['y'],_0x5adb72[_0x56391f(0x3b1)],_0x5adb72[_0x56391f(0x757)]),this[_0x56391f(0x5a5)](this[_0x56391f(0x765)]);}else{const _0x4aa716=_0x54fa5b['currentClass']()[_0x56391f(0x6f8)][_0x56391f(0x7a2)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x4aa716,_0x4fb35e,_0x3dcf7e,_0x4436dd);}}},Window_StatusBase[_0x140e58(0x468)][_0x140e58(0x6f3)]=function(_0x5f0176,_0x1b7e7e,_0x2991a3,_0x1c56f0){const _0x2fdb74=_0x140e58;_0x1c56f0=_0x1c56f0||0x10e,this[_0x2fdb74(0x353)]();if(VisuMZ[_0x2fdb74(0x370)][_0x2fdb74(0x452)]['UI']['TextCodeNicknames'])this[_0x2fdb74(0x396)](_0x5f0176[_0x2fdb74(0x5e4)](),_0x1b7e7e,_0x2991a3,_0x1c56f0);else{if(_0x2fdb74(0x6d2)==='tAcku'){const _0x47faf1=_0x5f0176[_0x2fdb74(0x5e4)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x2fdb74(0xd0)](_0x5f0176['nickname'](),_0x1b7e7e,_0x2991a3,_0x1c56f0);}else _0x39323a[_0x2fdb74(0x827)](),this[_0x2fdb74(0x19f)]==='keyboard'?this[_0x2fdb74(0x1b2)]('default'):this['switchModes']('keyboard');}},VisuMZ[_0x140e58(0x370)][_0x140e58(0x5df)]=Window_StatusBase[_0x140e58(0x468)][_0x140e58(0x23a)],Window_StatusBase[_0x140e58(0x468)][_0x140e58(0x23a)]=function(_0x55914d,_0x256403,_0x3961fa){const _0x3b3137=_0x140e58;if(this[_0x3b3137(0x7c8)]())this[_0x3b3137(0x45b)](_0x55914d,_0x256403,_0x3961fa);VisuMZ['CoreEngine'][_0x3b3137(0x5df)][_0x3b3137(0x129)](this,_0x55914d,_0x256403,_0x3961fa);},Window_StatusBase[_0x140e58(0x468)][_0x140e58(0x7c8)]=function(){const _0x2e3384=_0x140e58;return VisuMZ[_0x2e3384(0x370)][_0x2e3384(0x452)]['UI'][_0x2e3384(0x55e)];},Window_StatusBase[_0x140e58(0x468)]['drawActorExpGauge']=function(_0x5828b2,_0x3c7310,_0x2c6064){const _0x486a5a=_0x140e58;if(!_0x5828b2)return;if(!_0x5828b2['isActor']())return;const _0x52ca0a=0x80,_0xe9f579=_0x5828b2['expRate']();let _0x596e12=ColorManager[_0x486a5a(0x3b3)](),_0x4cc25d=ColorManager['expGaugeColor2']();_0xe9f579>=0x1&&(_0x486a5a(0x525)===_0x486a5a(0x525)?(_0x596e12=ColorManager[_0x486a5a(0x7ae)](),_0x4cc25d=ColorManager[_0x486a5a(0x243)]()):(_0x4d0aef[_0x486a5a(0xe9)](),this[_0x486a5a(0x367)](_0x486a5a(0x2d3)))),this[_0x486a5a(0x80c)](_0x3c7310,_0x2c6064,_0x52ca0a,_0xe9f579,_0x596e12,_0x4cc25d);},Window_EquipStatus[_0x140e58(0x468)][_0x140e58(0x7b9)]=function(){const _0x54af6d=_0x140e58;let _0x4705ab=0x0;for(const _0x1f57b7 of VisuMZ[_0x54af6d(0x370)]['Settings'][_0x54af6d(0x3d3)][_0x54af6d(0x73d)]){const _0x5b4f3=this[_0x54af6d(0x50f)](),_0x36f7e8=this[_0x54af6d(0x307)](_0x4705ab);this[_0x54af6d(0x2df)](_0x5b4f3,_0x36f7e8,_0x1f57b7),_0x4705ab++;}},Window_EquipStatus['prototype']['drawParamName']=function(_0x4c70f1,_0x618bb5,_0x4141c5){const _0x30fae6=_0x140e58,_0x2bbacf=this[_0x30fae6(0x704)]()-this['itemPadding']()*0x2;this[_0x30fae6(0x6f0)](_0x4c70f1,_0x618bb5,_0x2bbacf,_0x4141c5,![]);},Window_EquipStatus[_0x140e58(0x468)][_0x140e58(0x7c5)]=function(_0x547d87,_0x21268a,_0x293a51){const _0x5c86d6=_0x140e58,_0xedd490=this[_0x5c86d6(0x418)]();this['resetTextColor'](),this['drawText'](this[_0x5c86d6(0x17e)]['paramValueByName'](_0x293a51,!![]),_0x547d87,_0x21268a,_0xedd490,_0x5c86d6(0x1c0));},Window_EquipStatus[_0x140e58(0x468)]['drawRightArrow']=function(_0x47a60b,_0x6b93ca){const _0x181b09=_0x140e58,_0x34a52d=this['rightArrowWidth']();this['changeTextColor'](ColorManager['systemColor']());const _0x3219c0=VisuMZ[_0x181b09(0x370)][_0x181b09(0x452)]['UI'][_0x181b09(0x6bf)];this[_0x181b09(0xd0)](_0x3219c0,_0x47a60b,_0x6b93ca,_0x34a52d,_0x181b09(0x5c3));},Window_EquipStatus[_0x140e58(0x468)]['drawNewParam']=function(_0x2210cd,_0x216e8a,_0x3e2c33){const _0x4ed5f6=_0x140e58,_0x5bfb45=this[_0x4ed5f6(0x418)](),_0xdc8b40=this['_tempActor'][_0x4ed5f6(0x224)](_0x3e2c33),_0x444e74=_0xdc8b40-this['_actor']['paramValueByName'](_0x3e2c33);this[_0x4ed5f6(0x848)](ColorManager[_0x4ed5f6(0x37c)](_0x444e74)),this[_0x4ed5f6(0xd0)](this[_0x4ed5f6(0x8a2)][_0x4ed5f6(0x224)](_0x3e2c33,!![]),_0x2210cd,_0x216e8a,_0x5bfb45,_0x4ed5f6(0x1c0));},VisuMZ[_0x140e58(0x370)][_0x140e58(0x6ea)]=Window_EquipItem[_0x140e58(0x468)][_0x140e58(0x374)],Window_EquipItem[_0x140e58(0x468)][_0x140e58(0x374)]=function(_0x2a60bd){const _0x1619e3=_0x140e58;if(_0x2a60bd&&this[_0x1619e3(0x17e)]){if('NkpwG'===_0x1619e3(0x4ba))return this[_0x1619e3(0x17e)][_0x1619e3(0x61e)](_0x2a60bd);else{if(!this[_0x1619e3(0xda)]())return;_0x23951e[_0x1619e3(0x1cb)]()?this[_0x1619e3(0x618)]():_0x541de3[_0x1619e3(0x468)][_0x1619e3(0x3d8)][_0x1619e3(0x129)](this);}}else return VisuMZ[_0x1619e3(0x370)][_0x1619e3(0x6ea)]['call'](this,_0x2a60bd);},Window_StatusParams['prototype']['maxItems']=function(){const _0x82ae1a=_0x140e58;return VisuMZ[_0x82ae1a(0x370)][_0x82ae1a(0x452)][_0x82ae1a(0x3d3)]['DisplayedParams'][_0x82ae1a(0x4d7)];},Window_StatusParams[_0x140e58(0x468)]['drawItem']=function(_0x1f8a34){const _0x55ad54=_0x140e58,_0x5374ad=this['itemLineRect'](_0x1f8a34),_0x577e2d=VisuMZ[_0x55ad54(0x370)][_0x55ad54(0x452)]['Param'][_0x55ad54(0x73d)][_0x1f8a34],_0x3045ba=TextManager['param'](_0x577e2d),_0x37cec6=this[_0x55ad54(0x17e)][_0x55ad54(0x224)](_0x577e2d,!![]);this[_0x55ad54(0x6f0)](_0x5374ad['x'],_0x5374ad['y'],0xa0,_0x577e2d,![]),this['resetTextColor'](),this[_0x55ad54(0xd0)](_0x37cec6,_0x5374ad['x']+0xa0,_0x5374ad['y'],0x3c,_0x55ad54(0x1c0));};function _0x3658(){const _0x4256f6=['format','_playTestFastMode','isNwjs','Renderer','isMenuButtonAssistEnabled','strokeRect','equips','LLrDP','Spriteset_Base_updatePosition','SParamVocab9','%1:\x20Exit\x20','buyWindowRect','ColorTPGauge1','OazrF','RIGHT','setActionState','concat','xfAde','destroy','CpafO','_stored_mpGaugeColor1','skillTypeWindowRect','itemRect','_gamepadWait','keyRepeatWait','_isPlaytest','Origin','DisplayedParams','_tilemap','FDR','SwrGT','_helpWindow','ceil','zzKKY','UNDERSCORE','QYPQN','makeActionList','_upArrowSprite','hDVNR','setColorTone','Scene_Skill_create','mute','Type','_digitGroupingEx','PAUSE','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','push','Padding','lqqiG','THEZB','boxWidth','_pictureContainer','startShake','height','drawCircle','yMbTi','updateOpacity','ItemBackColor1','IconParam0','processKeyboardHandling','restore','_refreshPauseSign','Smooth','PqnYV','RepositionActors','hit','xparamFlat1','_commandWindow','tilesets','hqvgD','pIIKG','Plus1','skillTypes','ApQcE','Game_Interpreter_command122','MoThB','outlineColorGauge','TimeProgress','traitObjects','INSINE','TurKB','innerWidth','processKeyboardBackspace','clearRect','sAYyD','Sprite_Picture_loadBitmap','makeDeepCopy','catchLoadError','buttonAssistKey1','isActiveTpb','toLowerCase','cursorPagedown','ScreenShake','win32','shake','windowOpacity','updateLastTarget','IconParam6','_anchor','Window_NameInput_processTouch','ARRAYEVAL','IMzMc','Window_NameInput_cursorLeft','mEMmU','bitmap','WIN_OEM_CUSEL','parameters','isPlaying','HASH','NumberBgType','_stored_tpGaugeColor1','HELP','SLASH','processEscape','Subtitle','faceWidth','xuxvP','_clickHandler','UQMGG','ExportAllTroopText','command122','abUiN','cos','oJjAc','VisuMZ_2_BattleSystemETB','AnimationPoint','qwsxw','ColorTPGauge2','replace','playTestCtrlT','advanced','SystemSetWindowPadding','SICMg','repositionCancelButtonSideButtonLayout','GuWRi','ExportStrFromAllMaps','INOUTEXPO','Scene_Status_create','TgJIX','Window','maxLvGaugeColor1','xparamPlus','JSON','Scene_Name_create','_closing','targetY','playOk','Game_Picture_updateMove','LQwoR','Window_Base_drawCharacter','createDigits','drawAllParams','CrisisRate','return\x200','sIFvT','skipBranch','contents','ActorBgType','Window_Base_initialize','processHandling','SwitchToggleRange','KyVYq','bitmapWidth','drawCurrentParam','Bitmap_strokeRect','ShowItemBackground','isExpGaugeDrawn','playCursorSound','BTB','_timerSprite','RevertPreserveNumbers','CONVERT','gradientFillRect','isMaskingEnabled','TRAIT_PARAM','Window_Selectable_processTouch','FontSize','SSsYC','WIN_OEM_AUTO','KeyboardInput','updatePictureAntiZoom','substring','createDimmerSprite','RnnRP','FTB','IconParam7','mhZrL','updateBackOpacity','_coreEngineShakeStyle','cxtGm','GroupDigits','PRESERVCONVERSION(%1)','VHBuM','BukmF','pztuz','EJcIq','GameEnd','_setupEventHandlers','loadTitle1','targetScaleY','eMppm','_hp','ALTGR','dsDCY','SlotRect','_itemWindow','setSize','evaded','goto','VisuMZ_2_BattleSystemFTB','StatusEquipBgType','displayY','INOUTQUINT','moveRelativeToResolutionChange','Y:\x20%1','setupBattleTestItems','F22','Rate1','_clientArea','includes','INSERT','SwitchActorText','DrawItemBackgroundJS','lTLVw','apply','ffpLT','hideButtonFromView','ExtractStrFromTroop','maxCols','JSglk','status','CIJVK','mainFontSize','showFauxAnimations','drawGauge','PIPE','_skillTypeWindow','LHOQs','CommandList','_viewportSize','skills','processDigitChange','bgs','BoxMargin','Window_Selectable_processCursorMove','CLOSE_BRACKET','MtLBn','SceneManager_isGameActive','FpFOJ','processSoundTimings','ActorMPColor','yFKea','CNT','SkillMenu','_centerElement','MULTIPLY','smoothSelect','WIN_OEM_PA1','IconParam4','PictureEraseRange','NameInputMessage','clear','onButtonImageLoad','Window_Selectable_cursorUp','VfKXE','BattleSystem','transform','DOWN','omeIT','map','showPicture','GoldMax','SParamVocab3','BuyBgType','systemColor','DimColor2','Chance','addChild','normal','random','_stored_tpCostColor','Pixelated','F12','background','_hideButtons','WASD','initCoreEasing','viewport','Input_clear','setup','Game_Map_setup','kNcbT','pQjhi','imageSmoothingEnabled','changeTextColor','moveMenuButtonSideButtonLayout','BgFilename1','performMiss','updateKeyText','createChildSprite','_cache','updateData','Input_onKeyDown','textWidth','XRGWP','lLqce','Nqetd','HaSsx','ActorRect','<%1\x20%2:[\x20]','_pointAnimationQueue','IconSParam1','Window_NameInput_cursorUp','RepositionEnemies','%1/','Bitmap_drawTextOutline','vertical','MIN_SAFE_INTEGER','Spriteset_Base_destroy','playTestF6','_pictureCoordinatesMode','_backgroundFilter','BTestAddedQuantity','ATK','_backgroundSprite','BackOpacity','_realScale','ShowButtons','context','isFauxAnimationPlaying','buttonAssistKey%1','StatusParamsBgType','szTMH','mpGaugeColor1','BitRQ','animationBaseDelay','dzWff','applyCoreEasing','Page','WilbK','_coreEasingType','createPointAnimationTargets','setActorHome','IconSParam4','hTQGz','EiXQW','areButtonsOutsideMainUI','sparamRateJS','isDying','forceStencil','font-smooth','keypress','Spriteset_Battle_createEnemies','Scene_Menu_create','isItemStyle','LgDKK','KMhns','getBattleSystem','isSideButtonLayout','OutlineColorGauge','TGR','CodeJS','OqAhV','OPEN_PAREN','TextFmt','_dimmerSprite','setViewportCoreEngineFix','Speed','URL','Window_Base_drawFace','CTB','gaugeBackColor','eATlm','〘Common\x20Event\x20%1:\x20%2〙\x20Start','ExportStrFromAllTroops','QUOTE','updatePositionCoreEngineShakeOriginal','Basic','jskgv','CKNcU','updateFauxAnimations','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','GRD','_scene','_tempActor','jWSTB','_onceParallelInterpreters','SLEEP','CANCEL','displayX','defineProperty','mpGaugeColor2','terms','DefaultMode','_stored_gaugeBackColor','XmRcm','needsUpdate','FunctionName','Flat','calcEasing','getBackgroundOpacity','update','isMVAnimation','NUMPAD2','riwZH','itemLineRect','up2','processTimingData','ARRAYFUNC','OptionsBgType','createCancelButton','dguAo','Sprite_Actor_setActorHome','inputWindowRect','WIN_OEM_FINISH','BaseTexture','startNormalGame','jbbHf','ROdNi','ESC','renderNoMask','DigitGroupingGaugeSprites','_makeFontNameText','drawText','initMembersCoreEngine','Window_NameInput_processHandling','khPJN','MenuBg','IconXParam4','tYEBP','shift','AccuracyBoost','repeat','isCursorMovable','NUMPAD8','isGamepadTriggered','reserveNewGameCommonEvent','ShopMenu','HASLz','#%1','render','4014423kaPJta','DigitGroupingStandardText','F21','INBOUNCE','ColorMaxLvGauge1','Bitmap_gradientFillRect','OpenSpeed','playMiss','option','CLEAR','checkSmartEventCollision','_stored_hpGaugeColor2','LEFT','SceneManager_onKeyDown','consumeItem','IconXParam5','categoryWindowRect','characters','keyCode','Game_Action_updateLastTarget','IconXParam7','uTdZV','isAnimationForEach','removeOnceParallelInterpreter','Scene_Map_createSpriteset','Input_setupEventHandlers','_statusWindow','CommandWidth','bind','Sprite_Button_updateOpacity','CommonEventID','DTB','_width','nah','KeyUnlisted','_opening','LqTiQ','Untitled','usKqg','DefaultStyle','process_VisuMZ_CoreEngine_CustomParameters','down2','show','YzKsq','isTouchedInsideFrame','blendFunc','XCRrv','visible','VisuMZ_2_BattleSystemOTB','getLevel','escape','_onKeyPress','cancelShowButton','Abbreviation','initialBattleSystem','destroyCoreEngineMarkedBitmaps','_defaultStretchMode','Game_Interpreter_PluginCommand','pcvNh','stencilFunc','getInputMultiButtonStrings','isBottomHelpMode','actorWindowRect','yYIBr','playCancel','pictureId','fromCharCode','Sprite_Animation_processSoundTimings','BgType','outlineColor','AnimationID','call','DIVIDE','updatePointAnimations','pictures','HelpRect','paramName','helpAreaTop','dummyWindowRect','HYPHEN_MINUS','playCursor','_drawTextShadow','animationId','Scene_Map_createMenuButton','setSideButtonLayout','Bitmap_drawCircle','Tilemap_addShadow','taHyP','SwitchRandomizeRange','setAttack','CifWM','onerror','mpCostColor','retrieveFauxAnimation','_goldWindow','Bitmap_clearRect','RegExp','registerCommand','ShowDevTools','measureTextWidth','RowSpacing','jXInD','_pointAnimationSprites','_editWindow','expRate','updatePosition','_moveEasingType','_dummyWindow','SideButtons','Enable','paramRate2','Symbol','suQcz','OYKLD','Sprite_Button_initialize','eva','isBusy','cYEkW','goldWindowRect','maxGold','CustomParamIcons','ShowJS','bjkeb','params','TPB\x20WAIT','ColorDeath','drawIconBySize','gaugeLineHeight','tab','origin','forceOutOfPlaytest','_mapNameWindow','targets','paramMax','isAnimationPlaying','helpWindowRect','updateScene','clamp','type','initBasic','applyEasing','randomJS','menu','SystemSetSideView','lineHeight','InputRect','ExportString','updatePositionCoreEngine','StatusBgType','_stored_crisisColor','Window_NameInput_initialize','profileWindowRect','PfyFK','ExtJS','SParamVocab2','SXzbF','_actor','_data','ezSXC','ItemBgType','updateAnchor','Scene_MenuBase_mainAreaHeight','floor','poXXY','VisuMZ_2_BattleSystemPTB','MODECHANGE','QCTVg','initButtonHidden','TILDE','rgba(0,\x200,\x200,\x201.0)','IconSParam8','playEscape','DHAEs','IWZhB','fjsqU','isUseModernControls','isMapScrollLinked','cursorLeft','ykMtk','makeTargetSprites','asin','system','KCqLK','Game_System_initialize','missed','contentsOpacity','updateEffekseer','OUTCIRC','_pageupButton','_mode','_pressed','Scene_MenuBase_mainAreaTop','NUM_LOCK','gameTitle','drawGoldItemStyle','_refreshArrows','MINUS','_number','paramBase','Mute','OUTCUBIC','deathColor','onEscapeSuccess','YIitQ','pow','IieZo','mainAreaTopSideButtonLayout','RgsFl','switchModes','none','updateDocumentTitle','worldTransform','index','iFbwl','fontSize','CIRCUMFLEX','EoJvg','Game_Temp_initialize','Graphics_centerElement','_fauxAnimationSprites','XParamVocab6','setAnchor','right','ExtractStrFromMap','XHDwi','QwertyLayout','yNQhA','data/','ngrNm','IconSParam5','MAX_SAFE_INTEGER','loadMapData','_smooth','isNumpadPressed','charCode','PictureCoordinatesMode','titleCommandWindow','XParamVocab3','bRjqM','max','setupCoreEasing','END','removeAllFauxAnimations','loadBitmap','Actor','VEweo','\x5c}❪SHIFT❫\x5c{','Game_BattlerBase_refresh','title','PositionY','Rate2','_screenX','0.00','test','gyBxc','KeySHIFT','KeyItemProtect','ButtonHeight','createWindowLayer','subject','getButtonAssistLocation','PGUP','PERCENT','GoldIcon','paramBaseAboveLevel99','Window_ShopSell_isEnabled','_duration','createFauxAnimation','JgFVD','DummyRect','QoL','performEscape','addLoadListener','Scene_Equip_create','qsSSV','rxKPL','Spriteset_Base_isAnimationPlaying','outbounce','titles1','paramFlatJS','Game_Picture_move','loadPicture','mvpqy','setCoreEngineUpdateWindowBg','rlCLO','key%1','gXAxv','EQUAL','ADD','sparamPlus2','process_VisuMZ_CoreEngine_Notetags','AllMaps','buttonAssistText%1','ColorMaxLvGauge2','VisuMZ_2_BattleSystemSTB','padZero','NTMPP','ProfileRect','VisuMZ_1_OptionsCore','duration','requestFauxAnimation','isGameActive','ColorMPGauge2','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','sqrt','SParamVocab8','CustomParamAbb','text','lEQPQ','getCombinedScrollingText','textHeight','ctGaugeColor1','ImprovedAccuracySystem','Riiih','isInstanceOfSceneMap','xparamRate2','Mirror','TextManager_param','mWCzU','GHTKt','ConvertParams','uiAreaHeight','paramValueByName','BgFilename2','tileWidth','ButtonAssist','bgm','currentValue','rpiKW','paramPlusJS','animations','ParseStateNotetags','adjustSprite','_lastX','focus','areTileShadowsHidden','MapOnceParallel','_buyWindow','44SOIhVA','setEasingType','ZFpFf','FadeSpeed','4004690tQfMeD','mhp','drawActorLevel','_baseTexture','loadTitle2','cdWif','INBACK','feCIl','ARRAYNUM','ColorCTGauge1','Scene_Base_createWindowLayer','maxLvGaugeColor2','uruap','isItem','openingSpeed','makeFontBigger','_targetY','animationNextDelay','IconSParam0','parseForcedGameTroopSettingsCoreEngine','vertJS','ParseClassNotetags','wCUYU','command105','ZERO','stypeId','PuGCk','updateOrigin','DimColor1','SnapshotOpacity','playBuzzer','process_VisuMZ_CoreEngine_Settings','processPointAnimationRequests','_stored_mpCostColor','addEventListener','onInputOk','_registerKeyInput','drawActorSimpleStatus','_stored_maxLvGaugeColor1','QTmBq','hpGaugeColor2','xparamPlusJS','pages','Sprite_Battler_startMove','gaugeHeight','TitlePicButtons','ruVWq','showDevTools','exportAllMapStrings','createTroopNote','TRG','_height','YWhFR','SideView','makeCoreEngineCommandList','isPressed','gHIDf','nw.gui','ScreenResolution','areButtonsHidden','NUMPAD4','onload','VOLUME_DOWN','dbyzO','qrLzC','CommandRect','processAlwaysEscape','drawFace','SCROLL_LOCK','menuShowButton','isSideView','createBuffer','initVisuMZCoreEngine','_targetX','OUTQUINT','JUNJA','Ouqqw','updateDashToggle','Input_shouldPreventDefault','SDLFm','Scene_Name_onInputOk','ScaleY','eVrRn','faceHeight','drawCurrencyValue','EncounterRateMinimum','NewGameBoot','zAiJF','buttonAssistText4','wholeDuration','IconParam2','SrXOT','OUTQUAD','platform','isGamepadButtonPressed','_bitmap','_offsetX','itemWindowRect','integer','mSIMk','clearForcedGameTroopSettingsCoreEngine','targetBackOpacity','drawActorClass','canUse','SEMICOLON','pagedownShowButton','(\x5cd+\x5c.?\x5cd+)>','jWNdI','Game_Screen_initialize','Show\x20Scrolling\x20Text\x20Script\x20Error','tJMRO','_addShadow','horzJS','enter','StatusRect','Spriteset_Base_update','endAnimation','setHandler','MCR','zOcOw','Keyboard','BTestArmors','69018mLEkNI','picture','setupButtonImage','PDR','terminate','cWqqi','originalJS','processCursorHomeEndTrigger','itemHeight','getCoreEngineScreenShakeStyle','OutlineColor','updateCoreEasing','Scene_Boot_updateDocumentTitle','param','createSpriteset','RaABU','paramPlus','children','MEV','_pauseSignSprite','Flat2','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','updatePictureCoordinates','maxItems','drawSegment','Duration','INQUAD','initialize','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','xXubn','drawValue','_lastPluginCommandInterpreter','_numberWindow','evade','Bitmap_initialize','initDigitGrouping','F23','updateMove','Bomol','loadGameImagesCoreEngine','SUBTRACT','mainAreaHeightSideButtonLayout','$dataMap','slotWindowRect','OUTQUART','drawItem','setBackgroundOpacity','ModernControls','LATIN1','iDAlM','exportAllTroopStrings','QxJlL','DwPdb','CupzE','subtitle','determineSideButtonLayoutValid','processTouchModernControls','VwdUj','changeClass','SCALE_MODES','KANA','SHIFT','SParameterFormula','BlendMode','levelUpRecovery','OTB','LINEAR','blt','TPB\x20ACTIVE','randomInt','EndingID','TextCodeClassNames','process_VisuMZ_CoreEngine_jsQuickFunctions','([\x5c+\x5c-]\x5cd+)>','nWlyg','_playtestF7Looping','remove','Scene_Item_create','dimColor1','hMXZA','_cancelButton','IconParam5','QUESTION_MARK','repositionEnemiesByResolution','Window_NameInput_cursorPagedown','paramY','refresh','FOfzj','sparamFlat2','_movementWholeDuration','isOpenAndActive','_profileWindow','Window_Selectable_drawBackgroundRect','Gold','beeHo','targetOpacity','get','processTouch','REPLACE','Window_Selectable_cursorDown','isCollidedWithEvents','updateMainMultiply','setMoveEasingType','qcmjw','stencilOp','cowtD','updatePlayTestF7','xzsLF','kcbCy','nGHLH','SwoGW','rXPik','\x5c}❪TAB❫\x5c{','useDigitGrouping','MRF','commandWindowRows','Input_pollGamepads','Bitmap_resize','Sprite_Gauge_gaugeRate','powerUpColor','OPEN_CURLY_BRACKET','windowPadding','child_process','OUTBACK','_stored_mpGaugeColor2','_updateFilterArea','CreateBattleSystemID','alwaysDash','left','learnings','_backSprite1','opacity','〘Common\x20Event\x20%1:\x20%2〙\x20End','lwimi','IconSParam7','qvMJv','XParamVocab8','Game_Action_itemHit','SParamVocab7','isSmartEventCollisionOn','buttonAssistWindowSideRect','_context','retrievePointAnimation','STRUCT','pendingColor','_fauxAnimationQueue','Window_NameInput_refresh','EnableNameInput','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','15CylZvf','mamzD','loadSystemImages','CVacX','setupValueFont','onLoad','initCoreEngineScreenShake','zxgGz','WIN_OEM_PA2','ColorManager_loadWindowskin','list','_stored_hpGaugeColor1','resetTextColor','updateMotion','XdjXK','_sellWindow','_offsetY','fadeSpeed','DELETE','enableDigitGrouping','_targetAnchor','level','makeFontSmaller','resetBattleSystem','yGpOx','uiAreaWidth','calcCoreEasing','_createInternalTextures','toLocaleString','Pzxgw','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','nrHzo','requestMotion','VOLUME_UP','makeAutoBattleActions','Upper\x20Left','wTabi','DrawIcons','darwin','setClickHandler','trim','CoreEngine','Scene_MenuBase_helpAreaTop','round','hide','isEnabled','_targetOffsetY','pigSB','Power','dashToggle','_isWindow','getInputButtonString','NoTileShadows','paramchangeTextColor','Window_NumberInput_processDigitChange','setBattleSystem','BuyRect','buttonAssistSwitch','windowRect','processFauxAnimationRequests','openness','ItemHeight','padding','FxHBx','IconSParam6','NameMenu','_pictureCoordinatesWindow','loadWindowskin','_internalTextures','FbvUm','createCommandWindow','dKsBC','stringKeyMap','Window_NumberInput_start','setFrame','createBackground','INCIRC','hmsnq','stretch','drawTextEx','tmQcT','initCoreEngine','NewGameCommonEventAll','getPointAnimationLayer','LevelUpFullHp','create','makeCommandList','rowSpacing','AUycV','XParamVocab9','getCustomBackgroundSettings','sEPsr','_targetOffsetX','〘Show\x20Text〙\x0a','_forcedTroopView','WIN_OEM_CLEAR','qoKpZ','172wzwYMR','Vhels','loadSystem','Input_update','targetSpritePosition','yegcW','ctrl','ColorHPGauge1','PositionX','width','AGI','expGaugeColor1','VisuMZ_2_BattleSystemBTB','waiting','ColorNormal','_shouldPreventDefault','Location','onXhrError','zPzfw','_optionsWindow','abs','buttonAssistCancel','nxUWQ','item','yqYih','RaoZB','Sprite_Picture_updateOrigin','stop','nukkp','EquipMenu','_active','setWindowPadding','MSpKT','IconXParam8','ZGZlv','_hideTileShadows','XParamVocab4','Scene_Map_updateScene','down','pop','ParseActorNotetags','setCoreEngineScreenShakeStyle','ParseWeaponNotetags','Param','_drawTextOutline','enableDigitGroupingEx','iconWidth','updatePositionCoreEngineShakeVert','processCursorMove','CRI','uUIgE','nvRHD','Title','EQUALS','RQYXk','alpha','NUMPAD0','onInputBannedWords','processCursorMoveModernControls','NUMPAD1','Game_Picture_x','enemy','rFNaV','usableSkills','GET','gaugeRate','PTB','setLastPluginCommandInterpreter','_screenY','cJZTU','KtACY','buttonAssistOffset3','ImgLoad','EnableJS','NumberRect','ParamChange','ePCco','Scene_MenuBase_createPageButtons','wAget','isClosed','SkillTypeRect','setViewport','Game_Character_processMoveCommand','CEV','image-rendering','createPageButtons','INOUTCIRC','_stored_maxLvGaugeColor2','Game_Interpreter_updateWaitMode','18776HErubG','ryoQx','FontSmoothing','GoldBgType','_animationQueue','DnCqc','ARRAYSTR','StatusMenu','_inputString','HIT','_scaleX','buttonAssistOffset4','EXCLAMATION','PRINT','hEzsj','createTitleButtons','ExtractStrFromList','MAXMP','code','useFontWidthFix','Window_NameInput_cursorRight','xdg-open','MAT','paramWidth','textColor','SNjqK','UODBK','FINAL','HelpBgType','setHome','processMoveCommand','targetContentsOpacity','HYnDW','Scene_Options_create','vEOLb','setupNewGame','_encounterCount','LUK','ValueJS','RightMenus','_menuButton','clearCachedKeys','cancel','CRSEL','OTVzS','save','ItemBackColor2','send','setEnemyAction','createJsQuickFunction','NVhjV','targetEvaRate','anchor','ActorHPColor','removePointAnimation','application/json','DigitGroupingLocale','createFauxAnimationQueue','currentLevelExp','OpenURL','onKeyDown','_shakePower','QYKqz','Game_Event_isCollidedWithEvents','Plus2','fJGLB','helpAreaBottom','SEPARATOR','font','_cacheScaleX','_stored_expGaugeColor1','Window_Base_createTextState','XParamVocab2','writeFile','CHHUp','INOUTBACK','CustomParamNames','isNormalPriority','ParseAllNotetags','numberWindowRect','VisuMZ_2_BattleSystemCTB','Settings','overrideMimeType','ColorPowerUp','SParamVocab1','measureTextWidthNoRounding','isHandled','_stored_deathColor','actor','updatePositionCoreEngineShakeHorz','drawActorExpGauge','removeChild','_statusParamsWindow','responseText','getColorDataFromPluginParameters','EXR','match','nuHcH','reservePlayTestNewGameCommonEvent','NTmBS','keyMapper','evgYc','(\x5cd+)([%％])>','prototype','drawGameVersion','kUczd','isBottomButtonMode','TCR','LineHeight','_stored_tpGaugeColor2','ApplyEasing','SwitchToggleOne','InputBgType','mirror','miZLx','add','kkaoW','fillStyle','setValue','PQYwu','paramRate1','MRG','faces','DRkub','BTestItems','statusWindowRect','startAnimation','Total','9285RUpCBl','F16','CAPSLOCK','_refreshBack','RPGMAKER_VERSION','volume','buttonAssistText1','helpAreaHeight','%1%2','sv_enemies','Window_NameInput_cursorPageup','sparam','contentsBack','DEF','pgQcA','join','F14','aedOY','mainAreaHeight','GREATER_THAN','eyIXL','snapForBackground','rbwvX','_shakeDuration','playLoad','encounterStep','NUMPAD6','isActor','byHDI','connected','makeEncounterCount','PositionJS','%1\x0a','DataManager_setupNewGame','WIN_OEM_FJ_ROYA','IconSParam9','(\x5cd+)>','buttonAssistKey4','_buttonAssistWindow','EVAL','fillRect','gainGold','IconSParam3','buttonAreaHeight','Scene_Boot_startNormalGame','yuERo','normalColor','wHIYs','useDigitGroupingEx','NUMPAD7','select','GoldFontSize','oGLBb','pointX','IconSet','FontShadows','processBack','NkpwG','targetPosition','SParamVocab4','xtLAy','mpColor','createButtonAssistWindow','_downArrowSprite','isPlaytest','_currentMap','Scene_Battle_update','cursorPageup','RnQRk','SWYHO','AOhVb','ZPohy','FzAmD','NONCONVERT','IDs','ScaleX','IconSParam2','targetObjects','_windowLayer','eAqvn','_lastY','UMqiC','DocumentTitleFmt','Game_Picture_y','DATABASE','isOpen','length','openURL','BACKSPACE','Game_Troop_setup','yScrollLinkedOffset','_inputSpecialKeyCode','VOLUME_MUTE','isAlive','markCoreEngineModified','ALT','IaZfM','filters','ZOOM','PRINTSCREEN','F18','PictureID','Scene_Title_drawGameTitle','requestPointAnimation','createFauxAnimationSprite','ItemMenu','gainItem','MultiKeyFmt','buttonAssistKey5','_stored_ctGaugeColor2','drawGameTitle','ColorCTGauge2','EnableMasking','battlebacks2','fMDLb','Scene_MenuBase_createCancelButton','STB','CategoryBgType','F10','deselect','COMMA','itemHitImprovedAccuracy','ForceNoPlayTest','isWindowMaskingEnabled','constructor','KEEP','doesNameContainBannedWords','EVA','_lastOrigin','initialLevel','QfdWG','Control\x20Variables\x20Script\x20Error','MenuLayout','RAeNx','EditRect','oqEyC','eventsXyNt','Game_Interpreter_command355','expGaugeColor2','mmp','Scene_GameEnd_createBackground','smallParamFontSize','itemPadding','IconXParam0','buttons','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','xparamPlus2','BSAkn','listWindowRect','Plus','wait','exit','NeVQj','adjustPictureAntiZoom','note','value','buttonAssistKey2','version','setAction','pixelated','WindowLayer_render','SParamVocab6','subjectHitRate','Flat1','GwRke','VRVlp','home','INOUTELASTIC','_opacity','DfPAE','1.3.0','Scene_Boot_loadSystemImages','ItemStyle','hAVeP','destroyed','EXSEL','wPOLk','setMute','OUTSINE','wtVuF','start','DECIMAL','levelUp','XidVz','targetX','<JS\x20%1\x20%2:[\x20](.*)>','EscapeAlways','Wait','_storedStack','ASTERISK','sparamFlatJS','Window_Base_update','osaQn','onNameOk','Color','LoadError','ARRAYSTRUCT','Sprite_Animation_setViewport','tileHeight','PixelateImageRendering','_targetScaleY','MzZxP','retreat','_mp','OPEN_BRACKET','buttonAssistOffset5','resetFontSettings','qUUgH','xScrollLinkedOffset','makeDocumentTitle','iIquS','move','CLOSE_CURLY_BRACKET','FontWidthFix','seVolume','helpAreaTopSideButtonLayout','Bitmap_drawText','_actorWindow','IconXParam3','toFixed','cZmDw','LvExpGauge','onDatabaseLoaded','pointY','TitleCommandList','setCommonEvent','Linear','valueOutlineColor','([\x5c+\x5c-]\x5cd+)([%％])>','MDF','_margin','BlurFilter','catchUnknownError','NewGameCommonEvent','MDR','setGuard','addOnceParallelInterpreter','OpenConsole','CTRL','ExportCurMapText','SPACE','tZgwD','ParseSkillNotetags','_baseSprite','TextStr','_pagedownButton','HWJnd','_effectsContainer','layoutSettings','Sprite_destroy','isGamepadConnected','applyForcedGameTroopSettingsCoreEngine','clearStencil','INOUTQUAD','targetScaleX','evaluate','sin','QBNSu','Scene_MenuBase_createBackground','Center','scaleMode','ONE','_customModified','active','attackSkillId','maxBattleMembers','cRRbd','F7key','nextLevelExp','HOME','flush','qKVhO','offsetX','bitmapHeight','BannedWords','\x20Origin:\x20%1','EnableNumberInput','tpGaugeColor1','_changingClass','sceneTerminationClearEffects','createPointAnimationSprite','_muteSound','vunfc','scaleSprite','StatusParamsRect','processKeyboardHome','_stored_expGaugeColor2','pressed','OXEGc','backgroundBitmap','_forcedBattleSys','keyboard','addWindow','OUTBOUNCE','NUMPAD3','CategoryRect','toUpperCase','NtvNH','_listWindow','currentClass','WIN_ICO_CLEAR','isSpecialCode','Jwcnv','EditBgType','pageup','Game_Picture_initBasic','process_VisuMZ_CoreEngine_RegExp','backspace','isArrowPressed','NUMPAD5','vZgDh','OkText','currencyUnit','Game_BattlerBase_initMembers','STENCIL_BUFFER_BIT','smooth','F19','_spriteset','buttonAssistOffset2','batch','FNQHa','BottomButtons','center','drawIcon','getLastPluginCommandInterpreter','fillText','bgmVolume','IconParam3','Manual','IconParam1','EUXoF','vpQiM','removeFauxAnimation','GetParamIcon','BattleManager_processEscape','SgHBn','mainCommandWidth','Graphics_printError','_commonEventLayers','_cacheScaleY','Bitmap_fillRect','bgsVolume','blockWidth','CallHandlerJS','command357','ckxej','editWindowRect','original','createEnemies','_balloonQueue','Window_StatusBase_drawActorLevel','yAUkh','ocxPg','mapId','STR','nickname','Spriteset_Base_initialize','allowShiftScrolling','ColorMPGauge1','COLON','backOpacity','502356uYBRzq','_slotWindow','PictureShowIcon','centerSprite','cursorUp','text%1','XParamVocab5','buttonY','%2%1%3','Bitmap_measureTextWidth','GoldRect','DamageColor','UpdatePictureCoordinates','buttonAssistWindowRect','rgba(0,\x200,\x200,\x200.7)','icUac','STENCIL_TEST','Window_Selectable_itemRect','oHzRl','Scene_Battle_createSpriteset','_repositioned','ItemPadding','Map%1.json','uODYy','INQUART','_backSprite2','disable','WIN_OEM_ENLW','battlebacks1','encounterStepsMinimum','INOUTQUART','split','checkCacheKey','isFullDocumentTitle','aqKyQ','isSceneMap','》Comment《\x0a%1\x0a','ParamMax','number','INELASTIC','makeInputButtonString','isPointAnimationPlaying','StartID','isRepeated','ItemRect','dsChL','processKeyboardDigitChange','itypeId','scale','processKeyboardDelete','11SalTkT','9gEZcKQ','canEquip','ListBgType','zndEp','command355','isTpb','drawBackgroundRect','contains','startAutoNewGame','framebuffer','pagedown','isRightInputMode','LSORr','Sprite_Gauge_currentValue','_hovered','kmqUJ','IconXParam1','IconXParam9','cobnC','storeMapData','ttfFh','ctrlKey','buttonAssistText3','_battlerName','ButtonFadeSpeed','outlineColorDmg','iconHeight','setSideView','Game_Picture_calcEasing','CancelText','ExportAllMapText','Game_Interpreter_command105','_maxDigits','coreEngineRepositionEnemies','SystemLoadImages','LoadMenu','〘Scrolling\x20Text〙\x0a','Window_Gold_refresh','getGamepads','HRG','OUTELASTIC','updatePositionCoreEngineShakeRand','_inputWindow','setTargetAnchor','_storedMapText','_colorCache','IaPBz','charAt','mainAreaBottom','GoldOverlap','_stored_ctGaugeColor1','INOUTCUBIC','HWoqk','cursorDown','_categoryWindow','Izalz','sLDBR','Unnamed','SELECT','F6key','moveCancelButtonSideButtonLayout','open','cursorRight','ProfileBgType','Sprite_AnimationMV_processTimingData','playOnceParallelInterpreter','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','ETB','Conditional\x20Branch\x20Script\x20Error','setActorHomeRepositioned','updateMain','buttonAssistOk','FUCIq','sellWindowRect','noWxx','SceneManager_initialize','createPointAnimation','createPointAnimationQueue','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','IconXParam6','_stored_pendingColor','xparamFlat2','itemSuccessRate','updateWaitMode','FUNC','oWVaB','indexOf','_origin','top','ENTER','ZcbrO','string','DAdAJ','mev','sv_actors','setBackgroundType','buttonAssistOffset%1','MaGPL','_commandList','ParseItemNotetags','createCustomBackgroundImages','updateShadow','isSceneBattle','buttonAssistOffset1','PHA','SystemLoadAudio','getColor','FBzjF','optSideView','textSizeEx','_targetOpacity','JsGmu','EISU','atbActive','KZiZV','isMaxLevel','MPdpL','enemies','MAX_GL_TEXTURES','pictureButtons','PreserveNumbers','removeAllPointAnimations','Scene_Battle_createCancelButton','sparamFlatBonus','ParseArmorNotetags','Rate','qLkAo','hpColor','reduce','_digitGrouping','CLOSE_PAREN','horizontal','tpCostColor','drawGameSubtitle','Game_Actor_paramBase','min','startMove','Game_Action_itemEva','CommandBgType','LevelUpFullMp','Window_Base_drawIcon','\x0a\x0a\x0a\x0a\x0a','MainMenu','itemEva','damageColor','isCancelled','Scene_Map_updateMainMultiply','ocjjn','duvZi','AntiZoomPictures','filter','OWkXG','Game_Interpreter_command111','easingType','ARRAYJSON','successRate','runCombinedScrollingTextAsCode','buttonAssistWindowButtonRect','setupCoreEngine','zuZYp','_statusEquipWindow','log','ParamArrow','style','hArRU','xparam','paramRateJS','mXVxg','_troopId','NUMPAD9','parallaxes','mainAreaTop','maxLevel','powerDownColor','WZRRs','_animation','numberShowButton','_coreEasing','CONTEXT_MENU','_mainSprite','_sideButtonLayout','tAcku','clearOnceParallelInterpreters','Max','innerHeight','KeyTAB','inBattle','bFaht','offsetY','CustomParam','JyjCY','Script\x20Call\x20Error','isKeyItem','img/%1/','translucentOpacity','default','aodzC','knjWr','ParseEnemyNotetags','Window_Base_drawText','process_VisuMZ_CoreEngine_Functions','meVolume','titles2','guardSkillId','ColorHPGauge2','Window_EquipItem_isEnabled','HANJA','Game_Party_consumeItem','sIqHV','ColorTPCost','MAXHP','drawParamText','boxHeight','_CoreEngineSettings','drawActorNickname','GAOCN','UBtBx','isPhysical','UJPXX','name','tpColor','commandWindowRect','GswUF','xUCGZ','Game_Actor_levelUp','onKeyDownKeysF6F7','Scene_Base_terminateAnimationClearBugFix','members','Window_NameInput_cursorDown','UWUtS','parse','paramX','DashToggleR','loadIconBitmap','isAnimationOffsetXMirrored','resize','isTriggered','beCdW','EgWQZ','_centerElementCoreEngine','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','CustomParamType','_stored_systemColor','RequireFocus','addCommand','JivfS','sparamRate1','button','dimColor2','_windowskin','movePageButtonSideButtonLayout','REC','XParamVocab7','itemHit','35661OLMaBK','UUPSZ','OS_KEY','createTextState','Scene_Shop_create','isOptionValid','exp'];_0x3658=function(){return _0x4256f6;};return _0x3658();}if(VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)]['KeyboardInput'][_0x140e58(0x345)]){VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x140e58(0x1c3)]&&(Window_NameInput[_0x140e58(0x2e2)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x140e58(0x874),'OK']);;VisuMZ[_0x140e58(0x370)][_0x140e58(0x178)]=Window_NameInput[_0x140e58(0x468)][_0x140e58(0x2cd)],Window_NameInput[_0x140e58(0x468)]['initialize']=function(_0x4cce6a){const _0x20f527=_0x140e58;this['_mode']=this['defaultInputMode'](),VisuMZ[_0x20f527(0x370)][_0x20f527(0x178)][_0x20f527(0x129)](this,_0x4cce6a);if(this[_0x20f527(0x19f)]===_0x20f527(0x6e0)){if(_0x20f527(0x620)==='lEpCQ'){if(!_0x37ae02[_0x20f527(0x4c1)]())return;if(!_0x3154cc[_0x20f527(0x724)]())return;_0x46b235[_0x20f527(0x8a1)][_0x20f527(0x3c6)]=![],_0x374a62[_0x20f527(0x370)][_0x20f527(0x898)]();}else this['select'](0x0);}else Input[_0x20f527(0x827)](),this[_0x20f527(0x4f8)]();},Window_NameInput[_0x140e58(0x468)]['defaultInputMode']=function(){const _0x3b9a20=_0x140e58;if(Input[_0x3b9a20(0x57b)]())return'default';return VisuMZ['CoreEngine']['Settings'][_0x3b9a20(0x7d5)][_0x3b9a20(0x8ab)]||'keyboard';},VisuMZ[_0x140e58(0x370)]['Window_NameInput_processHandling']=Window_NameInput[_0x140e58(0x468)][_0x140e58(0x7c1)],Window_NameInput['prototype'][_0x140e58(0x7c1)]=function(){const _0x2be04a=_0x140e58;if(!this[_0x2be04a(0x4d6)]())return;if(!this[_0x2be04a(0x588)])return;if(this[_0x2be04a(0x19f)]==='keyboard'&&Input[_0x2be04a(0xdc)]())_0x2be04a(0x6e1)!==_0x2be04a(0x22a)?this[_0x2be04a(0x1b2)](_0x2be04a(0x6e0)):_0x1c2fde[_0x2be04a(0x7f3)]&&(this[_0x2be04a(0x5a3)]=_0x2be04a(0x7da));else{if(Input[_0x2be04a(0x5ae)](_0x2be04a(0x5b4)))_0x2be04a(0xc4)!==_0x2be04a(0xc4)?_0x222ede+=_0x2c939+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x2be04a(0x722)](_0x4c8830,_0x458959[_0x2be04a(0x6f8)]||_0x2be04a(0x656))+_0xdb22d5:(Input[_0x2be04a(0x827)](),this[_0x2be04a(0x4b9)]());else{if(Input['isTriggered'](_0x2be04a(0x162))){if(_0x2be04a(0x541)!==_0x2be04a(0x541)){_0x5e7fab['CoreEngine'][_0x2be04a(0x452)]['MenuLayout'][_0x2be04a(0x3dc)]['drawGameTitle'][_0x2be04a(0x129)](this);if(_0x46c950['subtitle']!==''&&_0x181dcf[_0x2be04a(0x2e8)]!==_0x2be04a(0x794))this['drawGameSubtitle']();if(_0x3f7b98[_0x2be04a(0x51e)]!==''&&_0x380609['version']!==_0x2be04a(0x1de))this[_0x2be04a(0x469)]();}else{Input['clear']();if(this[_0x2be04a(0x19f)]==='keyboard')this[_0x2be04a(0x1b2)](_0x2be04a(0x6e0));else{if(_0x2be04a(0x1c4)!==_0x2be04a(0x58b))this[_0x2be04a(0x1b2)]('keyboard');else return _0x211cc4['CoreEngine'][_0x2be04a(0x639)][_0x2be04a(0x129)](this,_0x407c39);}}}else{if(this[_0x2be04a(0x19f)]===_0x2be04a(0x5a4))this[_0x2be04a(0x75d)]();else Input[_0x2be04a(0x5ae)](_0x2be04a(0x114))?(Input[_0x2be04a(0x827)](),this[_0x2be04a(0x1b2)](_0x2be04a(0x5a4))):VisuMZ[_0x2be04a(0x370)][_0x2be04a(0xd2)]['call'](this);}}}},VisuMZ['CoreEngine'][_0x140e58(0x785)]=Window_NameInput['prototype'][_0x140e58(0x313)],Window_NameInput['prototype'][_0x140e58(0x313)]=function(){const _0x3791c7=_0x140e58;if(!this[_0x3791c7(0x30c)]())return;if(this[_0x3791c7(0x19f)]===_0x3791c7(0x5a4)){if(_0x3791c7(0x475)===_0x3791c7(0x339))_0xf0e3e5['atbActive']=!![];else{if(TouchInput[_0x3791c7(0x709)]()&&this[_0x3791c7(0x10e)]())this[_0x3791c7(0x1b2)]('default');else{if(TouchInput[_0x3791c7(0x6ae)]()){if(_0x3791c7(0x6db)==='vHdSs')return _0x32a2aa[_0x3791c7(0x155)];else this['switchModes'](_0x3791c7(0x6e0));}}}}else VisuMZ[_0x3791c7(0x370)][_0x3791c7(0x785)][_0x3791c7(0x129)](this);},Window_NameInput[_0x140e58(0x468)][_0x140e58(0x75d)]=function(){const _0x5f3a28=_0x140e58;if(Input['isSpecialCode'](_0x5f3a28(0x2a9))){if(_0x5f3a28(0x6fc)!=='DxHae')Input[_0x5f3a28(0x827)](),this[_0x5f3a28(0x542)]();else for(const _0x35849d of _0x4c5449){if(_0x35849d&&_0x35849d[_0x5f3a28(0x49e)]){if(this[_0x5f3a28(0x296)](_0x35849d))return!![];}}}else{if(Input['_inputString']!==undefined){let _0x59979f=Input[_0x5f3a28(0x409)],_0x13e42a=_0x59979f[_0x5f3a28(0x4d7)];for(let _0x4806b6=0x0;_0x4806b6<_0x13e42a;++_0x4806b6){if('iGoaj'==='foDHE'){if(_0x5f0607[_0x5f3a28(0x5b9)]!==this[_0x5f3a28(0x5b9)]())return![];return _0x20a87d['CoreEngine'][_0x5f3a28(0x452)][_0x5f3a28(0x30f)][_0x5f3a28(0x52d)];}else this[_0x5f3a28(0x149)][_0x5f3a28(0x474)](_0x59979f[_0x4806b6])?_0x5f3a28(0x67e)!==_0x5f3a28(0x10d)?SoundManager[_0x5f3a28(0x7b4)]():_0x4c472a[_0x5f3a28(0x1d5)](_0x2f4c55,_0x1db5b7):SoundManager['playBuzzer']();}Input[_0x5f3a28(0x827)]();}}},Window_NameInput['prototype'][_0x140e58(0x1b2)]=function(_0x41b1e5){const _0x242aa7=_0x140e58;let _0x24cece=this[_0x242aa7(0x19f)];this[_0x242aa7(0x19f)]=_0x41b1e5,_0x24cece!==this[_0x242aa7(0x19f)]&&(_0x242aa7(0x590)===_0x242aa7(0x590)?(this[_0x242aa7(0x308)](),SoundManager['playOk'](),this['_mode']===_0x242aa7(0x6e0)?this['select'](0x0):this['select'](-0x1)):_0x5744f8[_0x242aa7(0x638)](!_0x43ce5f['isSideView']()));},VisuMZ[_0x140e58(0x370)][_0x140e58(0x701)]=Window_NameInput[_0x140e58(0x468)][_0x140e58(0x652)],Window_NameInput[_0x140e58(0x468)][_0x140e58(0x652)]=function(_0x2bd099){const _0x554403=_0x140e58;if(this[_0x554403(0x19f)]===_0x554403(0x5a4)&&!Input[_0x554403(0x5b5)]())return;if(Input[_0x554403(0x1cb)]())return;VisuMZ[_0x554403(0x370)][_0x554403(0x701)][_0x554403(0x129)](this,_0x2bd099),this[_0x554403(0x1b2)]('default');},VisuMZ[_0x140e58(0x370)][_0x140e58(0x85a)]=Window_NameInput[_0x140e58(0x468)]['cursorUp'],Window_NameInput[_0x140e58(0x468)][_0x140e58(0x5ee)]=function(_0x952131){const _0x4cddf1=_0x140e58;if(this[_0x4cddf1(0x19f)]==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x4cddf1(0x1cb)]())return;VisuMZ[_0x4cddf1(0x370)][_0x4cddf1(0x85a)][_0x4cddf1(0x129)](this,_0x952131),this[_0x4cddf1(0x1b2)](_0x4cddf1(0x6e0));},VisuMZ[_0x140e58(0x370)][_0x140e58(0x415)]=Window_NameInput[_0x140e58(0x468)]['cursorRight'],Window_NameInput[_0x140e58(0x468)]['cursorRight']=function(_0x180b66){const _0x7a8030=_0x140e58;if(this[_0x7a8030(0x19f)]===_0x7a8030(0x5a4)&&!Input[_0x7a8030(0x5b5)]())return;if(Input[_0x7a8030(0x1cb)]())return;VisuMZ[_0x7a8030(0x370)][_0x7a8030(0x415)][_0x7a8030(0x129)](this,_0x180b66),this[_0x7a8030(0x1b2)]('default');},VisuMZ[_0x140e58(0x370)]['Window_NameInput_cursorLeft']=Window_NameInput[_0x140e58(0x468)]['cursorLeft'],Window_NameInput[_0x140e58(0x468)][_0x140e58(0x193)]=function(_0x407723){const _0x33c1e6=_0x140e58;if(this['_mode']===_0x33c1e6(0x5a4)&&!Input[_0x33c1e6(0x5b5)]())return;if(Input[_0x33c1e6(0x1cb)]())return;VisuMZ['CoreEngine'][_0x33c1e6(0x788)][_0x33c1e6(0x129)](this,_0x407723),this[_0x33c1e6(0x1b2)]('default');},VisuMZ['CoreEngine'][_0x140e58(0x306)]=Window_NameInput['prototype'][_0x140e58(0x77d)],Window_NameInput[_0x140e58(0x468)][_0x140e58(0x77d)]=function(){const _0x31d42b=_0x140e58;if(this[_0x31d42b(0x19f)]===_0x31d42b(0x5a4))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x31d42b(0x370)][_0x31d42b(0x306)]['call'](this),this[_0x31d42b(0x1b2)]('default');},VisuMZ[_0x140e58(0x370)][_0x140e58(0x48b)]=Window_NameInput[_0x140e58(0x468)][_0x140e58(0x4c4)],Window_NameInput[_0x140e58(0x468)][_0x140e58(0x4c4)]=function(){const _0x2eaf99=_0x140e58;if(this['_mode']==='keyboard')return;if(Input[_0x2eaf99(0x1cb)]())return;VisuMZ[_0x2eaf99(0x370)]['Window_NameInput_cursorPageup']['call'](this),this['switchModes'](_0x2eaf99(0x6e0));},VisuMZ[_0x140e58(0x370)][_0x140e58(0x344)]=Window_NameInput[_0x140e58(0x468)]['refresh'],Window_NameInput[_0x140e58(0x468)]['refresh']=function(){const _0x4144a3=_0x140e58;if(this[_0x4144a3(0x19f)]===_0x4144a3(0x5a4)){if('nhOIj'!==_0x4144a3(0x1e0)){this[_0x4144a3(0x7be)][_0x4144a3(0x827)](),this[_0x4144a3(0x48d)][_0x4144a3(0x827)](),this['resetTextColor']();let _0x3d35a2=VisuMZ[_0x4144a3(0x370)]['Settings'][_0x4144a3(0x7d5)][_0x4144a3(0x826)][_0x4144a3(0x609)]('\x0a'),_0x47d2ac=_0x3d35a2[_0x4144a3(0x4d7)],_0x325ed8=(this['innerHeight']-_0x47d2ac*this['lineHeight']())/0x2;for(let _0x5678fc=0x0;_0x5678fc<_0x47d2ac;++_0x5678fc){let _0x498bbe=_0x3d35a2[_0x5678fc],_0x120c80=this[_0x4144a3(0x68a)](_0x498bbe)[_0x4144a3(0x3b1)],_0x5c6aa4=Math[_0x4144a3(0x184)]((this['contents'][_0x4144a3(0x3b1)]-_0x120c80)/0x2);this[_0x4144a3(0x396)](_0x498bbe,_0x5c6aa4,_0x325ed8),_0x325ed8+=this[_0x4144a3(0x172)]();}}else return[0x25,0x26,0x27,0x28][_0x4144a3(0x624)](this[_0x4144a3(0x4dc)]);}else{if(_0x4144a3(0x6d8)===_0x4144a3(0x6d8))VisuMZ[_0x4144a3(0x370)][_0x4144a3(0x344)]['call'](this);else return _0x4144a3(0x7ca);}};};VisuMZ[_0x140e58(0x370)][_0x140e58(0x1eb)]=Window_ShopSell[_0x140e58(0x468)][_0x140e58(0x374)],Window_ShopSell[_0x140e58(0x468)][_0x140e58(0x374)]=function(_0x5e33e7){const _0x3d98d9=_0x140e58;if(VisuMZ[_0x3d98d9(0x370)][_0x3d98d9(0x452)][_0x3d98d9(0x1f0)]['KeyItemProtect']&&DataManager[_0x3d98d9(0x6dd)](_0x5e33e7)){if('LXrzJ'!==_0x3d98d9(0x5a1))return![];else{this[_0x3d98d9(0x4dc)]=_0x2e2782[_0x3d98d9(0xf4)];let _0x1bd4f8=_0x542bd0[_0x3d98d9(0x124)](_0x433816['charCode']);this[_0x3d98d9(0x409)]===_0x349c7b?this[_0x3d98d9(0x409)]=_0x1bd4f8:this[_0x3d98d9(0x409)]+=_0x1bd4f8;}}else return VisuMZ['CoreEngine'][_0x3d98d9(0x1eb)][_0x3d98d9(0x129)](this,_0x5e33e7);},Window_NumberInput[_0x140e58(0x468)][_0x140e58(0x191)]=function(){return![];};VisuMZ[_0x140e58(0x370)]['Settings'][_0x140e58(0x7d5)][_0x140e58(0x595)]&&(VisuMZ[_0x140e58(0x370)][_0x140e58(0x390)]=Window_NumberInput[_0x140e58(0x468)][_0x140e58(0x535)],Window_NumberInput[_0x140e58(0x468)][_0x140e58(0x535)]=function(){const _0x5af035=_0x140e58;VisuMZ[_0x5af035(0x370)][_0x5af035(0x390)][_0x5af035(0x129)](this),this[_0x5af035(0x4b3)](this[_0x5af035(0x63d)]-0x1),Input[_0x5af035(0x827)]();},VisuMZ[_0x140e58(0x370)][_0x140e58(0x37d)]=Window_NumberInput[_0x140e58(0x468)][_0x140e58(0x813)],Window_NumberInput['prototype'][_0x140e58(0x813)]=function(){const _0x3da44e=_0x140e58;if(!this[_0x3da44e(0x30c)]())return;if(Input['isNumpadPressed']())this['processKeyboardDigitChange']();else{if(Input['isSpecialCode']('backspace'))this['processKeyboardBackspace']();else{if(Input[_0x3da44e(0x4dc)]===0x2e)this[_0x3da44e(0x61b)]();else{if(Input[_0x3da44e(0x4dc)]===0x24)this[_0x3da44e(0x59e)]();else Input[_0x3da44e(0x4dc)]===0x23?this['processKeyboardEnd']():VisuMZ[_0x3da44e(0x370)][_0x3da44e(0x37d)]['call'](this);}}}},Window_NumberInput[_0x140e58(0x468)][_0x140e58(0x3d8)]=function(){const _0x508286=_0x140e58;if(!this['isCursorMovable']())return;if(Input[_0x508286(0x1cb)]())'rEfqX'===_0x508286(0x277)?this[_0x508286(0x4e9)](_0x4bb9b9,_0x31b50e,_0x5165ff,_0x11792d,_0x51665d):this[_0x508286(0x618)]();else{if('wrJGA'===_0x508286(0x679)){const _0x26afef=_0x2a3c91[_0x508286(0x580)]();_0x26afef>_0x50eae6&&(_0x365792=_0x26afef,this[_0x508286(0x51f)](_0x12dc72,_0x45f6b7));}else Window_Selectable[_0x508286(0x468)][_0x508286(0x3d8)][_0x508286(0x129)](this);}},Window_NumberInput[_0x140e58(0x468)]['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x140e58(0x468)][_0x140e58(0x618)]=function(){const _0x4b0c8e=_0x140e58;if(String(this[_0x4b0c8e(0x1a7)])[_0x4b0c8e(0x4d7)]>=this[_0x4b0c8e(0x63d)])return;const _0xa47f6a=Number(String(this[_0x4b0c8e(0x1a7)])+Input[_0x4b0c8e(0x409)]);if(isNaN(_0xa47f6a))return;this['_number']=_0xa47f6a;const _0x967e55='9'[_0x4b0c8e(0xd9)](this[_0x4b0c8e(0x63d)]);this['_number']=this['_number'][_0x4b0c8e(0x16b)](0x0,_0x967e55),Input[_0x4b0c8e(0x827)](),this[_0x4b0c8e(0x308)](),SoundManager[_0x4b0c8e(0x132)](),this[_0x4b0c8e(0x4b3)](this['_maxDigits']-0x1);},Window_NumberInput[_0x140e58(0x468)][_0x140e58(0x774)]=function(){const _0x48517b=_0x140e58;this[_0x48517b(0x1a7)]=Number(String(this['_number'])['slice'](0x0,-0x1)),this[_0x48517b(0x1a7)]=Math[_0x48517b(0x1d1)](0x0,this[_0x48517b(0x1a7)]),Input[_0x48517b(0x827)](),this[_0x48517b(0x308)](),SoundManager[_0x48517b(0x132)](),this[_0x48517b(0x4b3)](this[_0x48517b(0x63d)]-0x1);},Window_NumberInput[_0x140e58(0x468)][_0x140e58(0x61b)]=function(){const _0x107037=_0x140e58;this[_0x107037(0x1a7)]=Number(String(this[_0x107037(0x1a7)])[_0x107037(0x7d7)](0x1)),this[_0x107037(0x1a7)]=Math['max'](0x0,this[_0x107037(0x1a7)]),Input[_0x107037(0x827)](),this[_0x107037(0x308)](),SoundManager['playCursor'](),this[_0x107037(0x4b3)](this[_0x107037(0x63d)]-0x1);});;Window_TitleCommand['_commandList']=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)][_0x140e58(0x561)],Window_TitleCommand[_0x140e58(0x468)][_0x140e58(0x39d)]=function(){const _0x487d1f=_0x140e58;this[_0x487d1f(0x26e)]();},Window_TitleCommand[_0x140e58(0x468)][_0x140e58(0x26e)]=function(){const _0x598e85=_0x140e58;for(const _0x2de886 of Window_TitleCommand[_0x598e85(0x67f)]){if(_0x2de886[_0x598e85(0x15b)][_0x598e85(0x129)](this)){const _0x43e593=_0x2de886[_0x598e85(0x151)];let _0x3f73a5=_0x2de886['TextStr'];if(['',_0x598e85(0x107)][_0x598e85(0x7fd)](_0x3f73a5))_0x3f73a5=_0x2de886['TextJS'][_0x598e85(0x129)](this);const _0x190c36=_0x2de886[_0x598e85(0x3f1)][_0x598e85(0x129)](this),_0x19a952=_0x2de886[_0x598e85(0x17b)][_0x598e85(0x129)](this);this[_0x598e85(0x711)](_0x3f73a5,_0x43e593,_0x190c36,_0x19a952),this[_0x598e85(0x2ad)](_0x43e593,_0x2de886[_0x598e85(0x5d8)][_0x598e85(0xfe)](this,_0x19a952));}}},Window_GameEnd[_0x140e58(0x67f)]=VisuMZ[_0x140e58(0x370)][_0x140e58(0x452)][_0x140e58(0x505)][_0x140e58(0x7e6)][_0x140e58(0x810)],Window_GameEnd[_0x140e58(0x468)][_0x140e58(0x39d)]=function(){const _0x9369ea=_0x140e58;this[_0x9369ea(0x26e)]();},Window_GameEnd[_0x140e58(0x468)][_0x140e58(0x26e)]=function(){const _0x8c64ab=_0x140e58;for(const _0x3d5b54 of Window_GameEnd[_0x8c64ab(0x67f)]){if(_0x3d5b54[_0x8c64ab(0x15b)][_0x8c64ab(0x129)](this)){if(_0x8c64ab(0x5fc)===_0x8c64ab(0x41a))return _0x5c55b2['CoreEngine'][_0x8c64ab(0x452)]['UI'][_0x8c64ab(0x5c2)];else{const _0x564071=_0x3d5b54[_0x8c64ab(0x151)];let _0x227628=_0x3d5b54[_0x8c64ab(0x575)];if(['',_0x8c64ab(0x107)]['includes'](_0x227628))_0x227628=_0x3d5b54['TextJS'][_0x8c64ab(0x129)](this);const _0x1c206b=_0x3d5b54['EnableJS']['call'](this),_0x24ff44=_0x3d5b54['ExtJS'][_0x8c64ab(0x129)](this);this['addCommand'](_0x227628,_0x564071,_0x1c206b,_0x24ff44),this['setHandler'](_0x564071,_0x3d5b54[_0x8c64ab(0x5d8)][_0x8c64ab(0xfe)](this,_0x24ff44));}}}};function _0x2d25(_0x11937c,_0x24ffac){const _0x365820=_0x3658();return _0x2d25=function(_0x2d257a,_0x2305c3){_0x2d257a=_0x2d257a-0xbf;let _0x5dd990=_0x365820[_0x2d257a];return _0x5dd990;},_0x2d25(_0x11937c,_0x24ffac);}function Window_ButtonAssist(){const _0x3343a8=_0x140e58;this[_0x3343a8(0x2cd)](...arguments);}Window_ButtonAssist['prototype']=Object[_0x140e58(0x39c)](Window_Base[_0x140e58(0x468)]),Window_ButtonAssist[_0x140e58(0x468)][_0x140e58(0x4fd)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x140e58(0x2cd)]=function(_0x4a09cb){const _0x2badfc=_0x140e58;this[_0x2badfc(0x17f)]={},Window_Base[_0x2badfc(0x468)][_0x2badfc(0x2cd)][_0x2badfc(0x129)](this,_0x4a09cb),this[_0x2badfc(0x67c)](VisuMZ[_0x2badfc(0x370)]['Settings'][_0x2badfc(0x227)][_0x2badfc(0x126)]||0x0),this[_0x2badfc(0x308)]();},Window_ButtonAssist['prototype'][_0x140e58(0x247)]=function(){const _0x3f487b=_0x140e58;this[_0x3f487b(0x7be)][_0x3f487b(0x1b8)]<=0x60&&(this[_0x3f487b(0x7be)][_0x3f487b(0x1b8)]+=0x6);},Window_ButtonAssist['prototype'][_0x140e58(0x35d)]=function(){const _0x2dc722=_0x140e58;this[_0x2dc722(0x7be)][_0x2dc722(0x1b8)]>=0x18&&(this[_0x2dc722(0x7be)][_0x2dc722(0x1b8)]-=0x6);},Window_ButtonAssist['prototype']['update']=function(){const _0x2bf05c=_0x140e58;Window_Base[_0x2bf05c(0x468)][_0x2bf05c(0x8b3)][_0x2bf05c(0x129)](this),this[_0x2bf05c(0x84c)]();},Window_ButtonAssist[_0x140e58(0x468)]['updatePadding']=function(){const _0x1219d0=_0x140e58;this[_0x1219d0(0x385)]=SceneManager[_0x1219d0(0x8a1)]['getButtonAssistLocation']()!==_0x1219d0(0x714)?0x0:0x8;},Window_ButtonAssist[_0x140e58(0x468)][_0x140e58(0x84c)]=function(){const _0x212c3e=_0x140e58,_0x5adce=SceneManager[_0x212c3e(0x8a1)];for(let _0x4d049c=0x1;_0x4d049c<=0x5;_0x4d049c++){if(_0x212c3e(0x6b0)!==_0x212c3e(0x6b0)){if(this[_0x212c3e(0x7c8)]())this[_0x212c3e(0x45b)](_0x3b68b0,_0x292d3c,_0x9820b2);_0x308bbf[_0x212c3e(0x370)][_0x212c3e(0x5df)][_0x212c3e(0x129)](this,_0x2e132d,_0x420383,_0x1642e8);}else{if(this[_0x212c3e(0x17f)][_0x212c3e(0x1ff)[_0x212c3e(0x722)](_0x4d049c)]!==_0x5adce[_0x212c3e(0x86c)[_0x212c3e(0x722)](_0x4d049c)]()){if(_0x212c3e(0x1fc)!==_0x212c3e(0x87a))return this[_0x212c3e(0x308)]();else this[_0x212c3e(0x6d1)]=_0x1bfe27;}if(this[_0x212c3e(0x17f)][_0x212c3e(0x5ef)['format'](_0x4d049c)]!==_0x5adce[_0x212c3e(0x206)[_0x212c3e(0x722)](_0x4d049c)]())return this[_0x212c3e(0x308)]();}}},Window_ButtonAssist[_0x140e58(0x468)][_0x140e58(0x308)]=function(){const _0x5e1c18=_0x140e58;this['contents'][_0x5e1c18(0x827)]();for(let _0x1adbe5=0x1;_0x1adbe5<=0x5;_0x1adbe5++){if(_0x5e1c18(0x3c4)!==_0x5e1c18(0x3c4)){const _0xc497dc=this[_0x5e1c18(0x1b6)]();_0x1112e8['isTriggered']('home')&&this[_0x5e1c18(0x822)](_0x363326[_0x5e1c18(0x6a4)](this[_0x5e1c18(0x1b6)](),0x0)),_0x1d2575[_0x5e1c18(0x709)]('end')&&this[_0x5e1c18(0x822)](_0x55809a['max'](this['index'](),this['maxItems']()-0x1)),this[_0x5e1c18(0x1b6)]()!==_0xc497dc&&this[_0x5e1c18(0x7c9)]();}else this[_0x5e1c18(0x2ca)](_0x1adbe5);}},Window_ButtonAssist[_0x140e58(0x468)]['drawSegment']=function(_0x29bb29){const _0xe0c2d9=_0x140e58,_0x2a5c20=this[_0xe0c2d9(0x773)]/0x5,_0x1e43b7=SceneManager[_0xe0c2d9(0x8a1)],_0x313fe5=_0x1e43b7[_0xe0c2d9(0x86c)['format'](_0x29bb29)](),_0x128ef1=_0x1e43b7[_0xe0c2d9(0x206)[_0xe0c2d9(0x722)](_0x29bb29)]();this[_0xe0c2d9(0x17f)]['key%1'[_0xe0c2d9(0x722)](_0x29bb29)]=_0x313fe5,this[_0xe0c2d9(0x17f)][_0xe0c2d9(0x5ef)['format'](_0x29bb29)]=_0x128ef1;if(_0x313fe5==='')return;if(_0x128ef1==='')return;const _0x2762e7=_0x1e43b7[_0xe0c2d9(0x67d)[_0xe0c2d9(0x722)](_0x29bb29)](),_0x519af8=this[_0xe0c2d9(0x50f)](),_0xaf6a42=_0x2a5c20*(_0x29bb29-0x1)+_0x519af8+_0x2762e7,_0x562b07=VisuMZ[_0xe0c2d9(0x370)]['Settings'][_0xe0c2d9(0x227)][_0xe0c2d9(0x88e)];this[_0xe0c2d9(0x396)](_0x562b07['format'](_0x313fe5,_0x128ef1),_0xaf6a42,0x0,_0x2a5c20-_0x519af8*0x2);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x400)]=Game_Interpreter[_0x140e58(0x468)][_0x140e58(0x670)],Game_Interpreter[_0x140e58(0x468)][_0x140e58(0x670)]=function(){const _0x58112f=_0x140e58;if($gameTemp[_0x58112f(0x862)]!==undefined){if(_0x58112f(0x886)==='KMhns')return VisuMZ[_0x58112f(0x370)]['UpdatePictureCoordinates']();else{const _0x34f52b=_0x8fd141(_0x22cd84['$1']);_0x34f52b!==_0x14bf40[_0x1dd9ed][_0x58112f(0x51e)]&&(_0x34072e(_0x58112f(0x512)[_0x58112f(0x722)](_0x314de6,_0x34f52b)),_0xf894d5[_0x58112f(0x518)]());}}return VisuMZ[_0x58112f(0x370)][_0x58112f(0x400)][_0x58112f(0x129)](this);},VisuMZ[_0x140e58(0x370)][_0x140e58(0x5f6)]=function(){const _0x526881=_0x140e58,_0xcb7477=$gameTemp[_0x526881(0x862)]||0x0;(_0xcb7477<0x0||_0xcb7477>0x64||TouchInput[_0x526881(0x6ae)]()||Input['isTriggered'](_0x526881(0x42b)))&&($gameTemp[_0x526881(0x862)]=undefined,Input[_0x526881(0x827)](),TouchInput[_0x526881(0x827)]());const _0x4487c7=$gameScreen[_0x526881(0x2b3)](_0xcb7477);return _0x4487c7&&(_0x4487c7['_x']=TouchInput['_x'],_0x4487c7['_y']=TouchInput['_y']),VisuMZ['CoreEngine']['updatePictureCoordinates'](),$gameTemp[_0x526881(0x862)]!==undefined;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x2c8)]=function(){const _0x5249a2=_0x140e58,_0x42061e=SceneManager['_scene'];if(!_0x42061e)return;!_0x42061e['_pictureCoordinatesWindow']&&(SoundManager['playLoad'](),_0x42061e[_0x5249a2(0x389)]=new Window_PictureCoordinates(),_0x42061e[_0x5249a2(0x837)](_0x42061e['_pictureCoordinatesWindow']));if($gameTemp[_0x5249a2(0x862)]===undefined){if(_0x5249a2(0x3de)!=='RQYXk'){const _0x2b4b27=_0x5249a2(0x600)[_0x5249a2(0x722)](_0x186248[_0x5249a2(0x209)](0x3)),_0x4943c4=new _0x423b64(),_0xdd032='data/'+_0x2b4b27;_0x4943c4[_0x5249a2(0x65a)]('GET',_0xdd032),_0x4943c4[_0x5249a2(0x453)](_0x5249a2(0x438)),_0x4943c4['onload']=()=>this[_0x5249a2(0x630)](_0x4943c4,_0x12f2e,_0x2b4b27,_0xdd032),_0x4943c4[_0x5249a2(0x13d)]=()=>_0x335e83[_0x5249a2(0x3b9)](_0x5249a2(0x2dc),_0x2b4b27,_0xdd032),_0x4943c4[_0x5249a2(0x430)]();}else SoundManager[_0x5249a2(0x122)](),_0x42061e[_0x5249a2(0x45c)](_0x42061e[_0x5249a2(0x389)]),_0x42061e[_0x5249a2(0x389)]=undefined;}};function Window_PictureCoordinates(){this['initialize'](...arguments);}Window_PictureCoordinates['prototype']=Object[_0x140e58(0x39c)](Window_Base[_0x140e58(0x468)]),Window_PictureCoordinates[_0x140e58(0x468)][_0x140e58(0x4fd)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x140e58(0x468)][_0x140e58(0x2cd)]=function(){const _0x1431f6=_0x140e58;this[_0x1431f6(0x501)]=_0x1431f6(0x103),this[_0x1431f6(0x22f)]='nah',this[_0x1431f6(0x4d1)]='nah';const _0x39292b=this['windowRect']();Window_Base[_0x1431f6(0x468)][_0x1431f6(0x2cd)]['call'](this,_0x39292b),this[_0x1431f6(0x67c)](0x2);},Window_PictureCoordinates[_0x140e58(0x468)][_0x140e58(0x381)]=function(){const _0x2b83e3=_0x140e58;let _0x757c06=0x0,_0x105aba=Graphics[_0x2b83e3(0x757)]-this['lineHeight'](),_0x18a7bf=Graphics[_0x2b83e3(0x3b1)],_0x135a4c=this[_0x2b83e3(0x172)]();return new Rectangle(_0x757c06,_0x105aba,_0x18a7bf,_0x135a4c);},Window_PictureCoordinates[_0x140e58(0x468)]['updatePadding']=function(){const _0x2750cb=_0x140e58;this[_0x2750cb(0x385)]=0x0;},Window_PictureCoordinates[_0x140e58(0x468)][_0x140e58(0x8b3)]=function(){const _0x5c9876=_0x140e58;Window_Base[_0x5c9876(0x468)][_0x5c9876(0x8b3)]['call'](this),this[_0x5c9876(0x84f)]();},Window_PictureCoordinates[_0x140e58(0x468)]['updateData']=function(){const _0x210ea0=_0x140e58;if(!this[_0x210ea0(0x8ae)]())return;this[_0x210ea0(0x308)]();},Window_PictureCoordinates[_0x140e58(0x468)][_0x140e58(0x8ae)]=function(){const _0x54cc34=_0x140e58,_0x4ae663=$gameTemp[_0x54cc34(0x862)],_0x451b70=$gameScreen[_0x54cc34(0x2b3)](_0x4ae663);if(_0x451b70){if(_0x54cc34(0x270)===_0x54cc34(0x270))return this['_lastOrigin']!==_0x451b70['_origin']||this[_0x54cc34(0x22f)]!==_0x451b70['_x']||this[_0x54cc34(0x4d1)]!==_0x451b70['_y'];else{var _0x4ba2ec=_0x36f97d(_0x2a3447['$1']);_0x1af745+=_0x4ba2ec;}}else{if('RzsrX'===_0x54cc34(0x4c7))_0x35b761=_0x2b7508['makeDeepCopy'](_0x2191a6),_0x24c728['se']&&(_0x1fa6e5['se']['volume']=0x0);else return![];}},Window_PictureCoordinates[_0x140e58(0x468)][_0x140e58(0x308)]=function(){const _0x28456a=_0x140e58;this['contents']['clear']();const _0x56ad55=$gameTemp[_0x28456a(0x862)],_0x56fd90=$gameScreen[_0x28456a(0x2b3)](_0x56ad55);if(!_0x56fd90)return;this['_lastOrigin']=_0x56fd90[_0x28456a(0x674)],this[_0x28456a(0x22f)]=_0x56fd90['_x'],this['_lastY']=_0x56fd90['_y'];const _0x4a63ea=ColorManager['itemBackColor1']();this[_0x28456a(0x7be)][_0x28456a(0x4a9)](0x0,0x0,this[_0x28456a(0x773)],this[_0x28456a(0x6d5)],_0x4a63ea);const _0x66e978=_0x28456a(0x594)[_0x28456a(0x722)](_0x56fd90['_origin']===0x0?_0x28456a(0x36a):_0x28456a(0x584)),_0xa521bd='X:\x20%1'['format'](_0x56fd90['_x']),_0x4b4705=_0x28456a(0x7f8)[_0x28456a(0x722)](_0x56fd90['_y']),_0x2e339f=_0x28456a(0x72c)['format'](TextManager[_0x28456a(0x37a)](_0x28456a(0x42b)));let _0x214ea7=Math[_0x28456a(0x184)](this[_0x28456a(0x773)]/0x4);this[_0x28456a(0xd0)](_0x66e978,_0x214ea7*0x0,0x0,_0x214ea7),this['drawText'](_0xa521bd,_0x214ea7*0x1,0x0,_0x214ea7,'center'),this[_0x28456a(0xd0)](_0x4b4705,_0x214ea7*0x2,0x0,_0x214ea7,'center');const _0x5e53d9=this[_0x28456a(0x68a)](_0x2e339f)[_0x28456a(0x3b1)],_0x7970b3=this[_0x28456a(0x773)]-_0x5e53d9;this[_0x28456a(0x396)](_0x2e339f,_0x7970b3,0x0,_0x5e53d9);},VisuMZ[_0x140e58(0x144)]=function(_0x95fa76){const _0x3552de=_0x140e58;if(Utils[_0x3552de(0x720)](_0x3552de(0x1df))){if('MZLRm'===_0x3552de(0x577))this[_0x3552de(0x35b)]=_0x9a3285;else{var _0x4ae87d=require(_0x3552de(0x271))[_0x3552de(0x7ad)][_0x3552de(0x312)]();SceneManager[_0x3552de(0x267)]();if(_0x95fa76)setTimeout(_0x4ae87d[_0x3552de(0x230)][_0x3552de(0xfe)](_0x4ae87d),0x190);}}},VisuMZ['ApplyEasing']=function(_0x46c64f,_0x93a670){const _0x46014b=_0x140e58;_0x93a670=_0x93a670[_0x46014b(0x5a9)]();var _0x34cfa6=1.70158,_0x5ae98b=0.7;switch(_0x93a670){case _0x46014b(0x2f4):return _0x46c64f;case _0x46014b(0x771):return-0x1*Math[_0x46014b(0x79c)](_0x46c64f*(Math['PI']/0x2))+0x1;case _0x46014b(0x533):return Math[_0x46014b(0x581)](_0x46c64f*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math[_0x46014b(0x79c)](Math['PI']*_0x46c64f)-0x1);case _0x46014b(0x2cc):return _0x46c64f*_0x46c64f;case _0x46014b(0x294):return _0x46c64f*(0x2-_0x46c64f);case _0x46014b(0x57e):return _0x46c64f<0.5?0x2*_0x46c64f*_0x46c64f:-0x1+(0x4-0x2*_0x46c64f)*_0x46c64f;case'INCUBIC':return _0x46c64f*_0x46c64f*_0x46c64f;case _0x46014b(0x1aa):var _0x5026dc=_0x46c64f-0x1;return _0x5026dc*_0x5026dc*_0x5026dc+0x1;case _0x46014b(0x650):return _0x46c64f<0.5?0x4*_0x46c64f*_0x46c64f*_0x46c64f:(_0x46c64f-0x1)*(0x2*_0x46c64f-0x2)*(0x2*_0x46c64f-0x2)+0x1;case _0x46014b(0x602):return _0x46c64f*_0x46c64f*_0x46c64f*_0x46c64f;case _0x46014b(0x2de):var _0x5026dc=_0x46c64f-0x1;return 0x1-_0x5026dc*_0x5026dc*_0x5026dc*_0x5026dc;case _0x46014b(0x608):var _0x5026dc=_0x46c64f-0x1;return _0x46c64f<0.5?0x8*_0x46c64f*_0x46c64f*_0x46c64f*_0x46c64f:0x1-0x8*_0x5026dc*_0x5026dc*_0x5026dc*_0x5026dc;case'INQUINT':return _0x46c64f*_0x46c64f*_0x46c64f*_0x46c64f*_0x46c64f;case _0x46014b(0x282):var _0x5026dc=_0x46c64f-0x1;return 0x1+_0x5026dc*_0x5026dc*_0x5026dc*_0x5026dc*_0x5026dc;case _0x46014b(0x7f6):var _0x5026dc=_0x46c64f-0x1;return _0x46c64f<0.5?0x10*_0x46c64f*_0x46c64f*_0x46c64f*_0x46c64f*_0x46c64f:0x1+0x10*_0x5026dc*_0x5026dc*_0x5026dc*_0x5026dc*_0x5026dc;case'INEXPO':if(_0x46c64f===0x0){if(_0x46014b(0x885)===_0x46014b(0x462))this[_0x46014b(0x822)](0x0);else return 0x0;}return Math[_0x46014b(0x1ae)](0x2,0xa*(_0x46c64f-0x1));case'OUTEXPO':if(_0x46c64f===0x1){if('yYIBr'===_0x46014b(0x121))return 0x1;else{_0x385535[_0x46014b(0x370)][_0x46014b(0x452)][_0x46014b(0x1f0)][_0x46014b(0x403)]&&(_0x38390b['style'][_0x46014b(0x880)]=_0x46014b(0x1b3));_0x1b65d0['CoreEngine']['Settings'][_0x46014b(0x1f0)][_0x46014b(0x548)]&&(_0x39849f['style'][_0x46014b(0x3fc)]=_0x46014b(0x520));const _0x10398d=_0x1ff799[_0x46014b(0x1d1)](0x0,_0x1032d3[_0x46014b(0x184)](_0x3fc14d[_0x46014b(0x3b1)]*this[_0x46014b(0x868)])),_0x3e8aaf=_0x21cffa[_0x46014b(0x1d1)](0x0,_0x4101d8[_0x46014b(0x184)](_0x4f4755[_0x46014b(0x757)]*this[_0x46014b(0x868)]));_0x504d43['style'][_0x46014b(0x3b1)]=_0x10398d+'px',_0x10d525[_0x46014b(0x6c0)][_0x46014b(0x757)]=_0x3e8aaf+'px';}}return-Math[_0x46014b(0x1ae)](0x2,-0xa*_0x46c64f)+0x1;case _0x46014b(0x7aa):if(_0x46c64f===0x0||_0x46c64f===0x1)return _0x46c64f;var _0x359e10=_0x46c64f*0x2,_0x3a277d=_0x359e10-0x1;if(_0x359e10<0x1){if(_0x46014b(0x15c)!==_0x46014b(0x15c))_0x534e8e['CoreEngine'][_0x46014b(0x2a4)][_0x46014b(0x129)](this),this[_0x46014b(0x34d)]();else return 0.5*Math['pow'](0x2,0xa*_0x3a277d);}return 0.5*(-Math[_0x46014b(0x1ae)](0x2,-0xa*_0x3a277d)+0x2);case _0x46014b(0x393):var _0x359e10=_0x46c64f/0x1;return-0x1*(Math[_0x46014b(0x212)](0x1-_0x359e10*_0x46c64f)-0x1);case _0x46014b(0x19d):var _0x5026dc=_0x46c64f-0x1;return Math['sqrt'](0x1-_0x5026dc*_0x5026dc);case _0x46014b(0x3fe):var _0x359e10=_0x46c64f*0x2,_0x3a277d=_0x359e10-0x2;if(_0x359e10<0x1)return _0x46014b(0x2d8)!=='erGPy'?-0.5*(Math[_0x46014b(0x212)](0x1-_0x359e10*_0x359e10)-0x1):_0x30d610[_0x46014b(0x579)][_0x46014b(0x616)][_0x46014b(0x129)](this);return 0.5*(Math[_0x46014b(0x212)](0x1-_0x3a277d*_0x3a277d)+0x1);case _0x46014b(0x23e):return _0x46c64f*_0x46c64f*((_0x34cfa6+0x1)*_0x46c64f-_0x34cfa6);case _0x46014b(0x32d):var _0x359e10=_0x46c64f/0x1-0x1;return _0x359e10*_0x359e10*((_0x34cfa6+0x1)*_0x359e10+_0x34cfa6)+0x1;break;case _0x46014b(0x44c):var _0x359e10=_0x46c64f*0x2,_0x2f30ab=_0x359e10-0x2,_0x36741e=_0x34cfa6*1.525;if(_0x359e10<0x1){if(_0x46014b(0x2e7)==='CupzE')return 0.5*_0x359e10*_0x359e10*((_0x36741e+0x1)*_0x359e10-_0x36741e);else{let _0x311adf=this[_0x46014b(0x229)]();this['useDigitGrouping']()&&(_0x311adf=_0x554354[_0x46014b(0x7e0)](_0x311adf));const _0x224e8f=this[_0x46014b(0x7c4)]()-0x1,_0x544454=this[_0x46014b(0x218)]?this[_0x46014b(0x218)]():this[_0x46014b(0x592)]();this[_0x46014b(0x34b)](),this[_0x46014b(0x78a)]['drawText'](_0x311adf,0x0,0x0,_0x224e8f,_0x544454,'right');}}return 0.5*(_0x2f30ab*_0x2f30ab*((_0x36741e+0x1)*_0x2f30ab+_0x36741e)+0x2);case _0x46014b(0x611):if(_0x46c64f===0x0||_0x46c64f===0x1)return _0x46c64f;var _0x359e10=_0x46c64f/0x1,_0x3a277d=_0x359e10-0x1,_0x4822ea=0x1-_0x5ae98b,_0x36741e=_0x4822ea/(0x2*Math['PI'])*Math[_0x46014b(0x196)](0x1);return-(Math[_0x46014b(0x1ae)](0x2,0xa*_0x3a277d)*Math[_0x46014b(0x581)]((_0x3a277d-_0x36741e)*(0x2*Math['PI'])/_0x4822ea));case _0x46014b(0x645):var _0x4822ea=0x1-_0x5ae98b,_0x359e10=_0x46c64f*0x2;if(_0x46c64f===0x0||_0x46c64f===0x1)return _0x46c64f;var _0x36741e=_0x4822ea/(0x2*Math['PI'])*Math[_0x46014b(0x196)](0x1);return Math[_0x46014b(0x1ae)](0x2,-0xa*_0x359e10)*Math[_0x46014b(0x581)]((_0x359e10-_0x36741e)*(0x2*Math['PI'])/_0x4822ea)+0x1;case _0x46014b(0x528):var _0x4822ea=0x1-_0x5ae98b;if(_0x46c64f===0x0||_0x46c64f===0x1)return _0x46c64f;var _0x359e10=_0x46c64f*0x2,_0x3a277d=_0x359e10-0x1,_0x36741e=_0x4822ea/(0x2*Math['PI'])*Math[_0x46014b(0x196)](0x1);if(_0x359e10<0x1)return-0.5*(Math[_0x46014b(0x1ae)](0x2,0xa*_0x3a277d)*Math['sin']((_0x3a277d-_0x36741e)*(0x2*Math['PI'])/_0x4822ea));return Math[_0x46014b(0x1ae)](0x2,-0xa*_0x3a277d)*Math[_0x46014b(0x581)]((_0x3a277d-_0x36741e)*(0x2*Math['PI'])/_0x4822ea)*0.5+0x1;case _0x46014b(0x5a6):var _0x359e10=_0x46c64f/0x1;if(_0x359e10<0x1/2.75){if(_0x46014b(0x23d)!=='cdWif')this[_0x46014b(0x77d)]();else return 7.5625*_0x359e10*_0x359e10;}else{if(_0x359e10<0x2/2.75){var _0x2f30ab=_0x359e10-1.5/2.75;return 7.5625*_0x2f30ab*_0x2f30ab+0.75;}else{if(_0x359e10<2.5/2.75){if('Pzxgw'===_0x46014b(0x364)){var _0x2f30ab=_0x359e10-2.25/2.75;return 7.5625*_0x2f30ab*_0x2f30ab+0.9375;}else return![];}else{if(_0x46014b(0x7a6)==='SICMg'){var _0x2f30ab=_0x359e10-2.625/2.75;return 7.5625*_0x2f30ab*_0x2f30ab+0.984375;}else this[_0x46014b(0x437)](_0x3c3e02);}}}case _0x46014b(0xe5):var _0x1c5bea=0x1-VisuMZ[_0x46014b(0x46f)](0x1-_0x46c64f,'outbounce');return _0x1c5bea;case'INOUTBOUNCE':if(_0x46c64f<0.5){if(_0x46014b(0x550)==='qUUgH')var _0x1c5bea=VisuMZ[_0x46014b(0x46f)](_0x46c64f*0x2,'inbounce')*0.5;else return _0x10160e[_0x46014b(0x24c)]['call'](this);}else var _0x1c5bea=VisuMZ[_0x46014b(0x46f)](_0x46c64f*0x2-0x1,_0x46014b(0x1f7))*0.5+0.5;return _0x1c5bea;default:return _0x46c64f;}},VisuMZ[_0x140e58(0x5ce)]=function(_0x37cbae){const _0x404c35=_0x140e58;_0x37cbae=String(_0x37cbae)[_0x404c35(0x5a9)]();const _0x1e3694=VisuMZ['CoreEngine'][_0x404c35(0x452)]['Param'];if(_0x37cbae===_0x404c35(0x6ef))return _0x1e3694[_0x404c35(0x75c)];if(_0x37cbae==='MAXMP')return _0x1e3694[_0x404c35(0x5ca)];if(_0x37cbae===_0x404c35(0x865))return _0x1e3694['IconParam2'];if(_0x37cbae===_0x404c35(0x48e))return _0x1e3694[_0x404c35(0x5c8)];if(_0x37cbae===_0x404c35(0x417))return _0x1e3694[_0x404c35(0x824)];if(_0x37cbae==='MDF')return _0x1e3694[_0x404c35(0x303)];if(_0x37cbae===_0x404c35(0x3b2))return _0x1e3694[_0x404c35(0x783)];if(_0x37cbae===_0x404c35(0x426))return _0x1e3694[_0x404c35(0x7db)];if(_0x37cbae===_0x404c35(0x40a))return _0x1e3694[_0x404c35(0x510)];if(_0x37cbae===_0x404c35(0x500))return _0x1e3694['IconXParam1'];if(_0x37cbae==='CRI')return _0x1e3694['IconXParam2'];if(_0x37cbae===_0x404c35(0x3fb))return _0x1e3694[_0x404c35(0x55b)];if(_0x37cbae===_0x404c35(0x2c4))return _0x1e3694[_0x404c35(0xd5)];if(_0x37cbae==='MRF')return _0x1e3694[_0x404c35(0xf1)];if(_0x37cbae===_0x404c35(0x81e))return _0x1e3694[_0x404c35(0x66c)];if(_0x37cbae===_0x404c35(0x644))return _0x1e3694[_0x404c35(0xf6)];if(_0x37cbae===_0x404c35(0x47a))return _0x1e3694[_0x404c35(0x3c9)];if(_0x37cbae===_0x404c35(0x26a))return _0x1e3694[_0x404c35(0x62e)];if(_0x37cbae==='TGR')return _0x1e3694[_0x404c35(0x24a)];if(_0x37cbae===_0x404c35(0x8a0))return _0x1e3694[_0x404c35(0x859)];if(_0x37cbae==='REC')return _0x1e3694['IconSParam2'];if(_0x37cbae===_0x404c35(0x685))return _0x1e3694['IconSParam3'];if(_0x37cbae==='MCR')return _0x1e3694[_0x404c35(0x879)];if(_0x37cbae===_0x404c35(0x46c))return _0x1e3694[_0x404c35(0x1c7)];if(_0x37cbae===_0x404c35(0x2b5))return _0x1e3694[_0x404c35(0x387)];if(_0x37cbae===_0x404c35(0x56b))return _0x1e3694[_0x404c35(0x338)];if(_0x37cbae===_0x404c35(0x73f))return _0x1e3694[_0x404c35(0x18c)];if(_0x37cbae===_0x404c35(0x460))return _0x1e3694[_0x404c35(0x4a4)];if(VisuMZ['CoreEngine'][_0x404c35(0x15a)][_0x37cbae])return VisuMZ['CoreEngine'][_0x404c35(0x15a)][_0x37cbae]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x319896,_0x1411a7,_0x444b28){const _0x242421=_0x140e58;if(_0x444b28===undefined&&_0x319896%0x1===0x0)return _0x319896;if(_0x444b28!==undefined&&['MAXHP',_0x242421(0x412),_0x242421(0x865),_0x242421(0x48e),_0x242421(0x417),_0x242421(0x566),_0x242421(0x3b2),'LUK'][_0x242421(0x7fd)](String(_0x444b28)[_0x242421(0x5a9)]()[_0x242421(0x36f)]()))return _0x319896;_0x1411a7=_0x1411a7||0x0;if(VisuMZ[_0x242421(0x370)][_0x242421(0x214)][_0x444b28])return VisuMZ[_0x242421(0x370)][_0x242421(0x70e)][_0x444b28]===_0x242421(0x29a)?_0x319896:String((_0x319896*0x64)[_0x242421(0x55c)](_0x1411a7))+'%';return String((_0x319896*0x64)[_0x242421(0x55c)](_0x1411a7))+'%';},VisuMZ[_0x140e58(0x7e0)]=function(_0x112bdc){const _0x194b77=_0x140e58;_0x112bdc=String(_0x112bdc);if(!_0x112bdc)return _0x112bdc;if(typeof _0x112bdc!==_0x194b77(0x678))return _0x112bdc;const _0xea22c9=VisuMZ['CoreEngine'][_0x194b77(0x452)][_0x194b77(0x1f0)][_0x194b77(0x439)]||'en-US',_0x300756={'maximumFractionDigits':0x6};_0x112bdc=_0x112bdc['replace'](/\[(.*?)\]/g,(_0x383dc6,_0x47b939)=>{const _0x1afd9b=_0x194b77;return VisuMZ[_0x1afd9b(0x695)](_0x47b939,'[',']');}),_0x112bdc=_0x112bdc[_0x194b77(0x7a2)](/<(.*?)>/g,(_0x4735a9,_0x1594a6)=>{const _0x74f501=_0x194b77;return VisuMZ[_0x74f501(0x695)](_0x1594a6,'<','>');}),_0x112bdc=_0x112bdc['replace'](/\{\{(.*?)\}\}/g,(_0x2913e7,_0x587f7c)=>{return VisuMZ['PreserveNumbers'](_0x587f7c,'','');}),_0x112bdc=_0x112bdc[_0x194b77(0x7a2)](/(\d+\.?\d*)/g,(_0x15eeea,_0x5c1cfe)=>{const _0x4ce419=_0x194b77;let _0x4a3f7d=_0x5c1cfe;if(_0x4a3f7d[0x0]==='0')return _0x4a3f7d;if(_0x4a3f7d[_0x4a3f7d[_0x4ce419(0x4d7)]-0x1]==='.')return Number(_0x4a3f7d)['toLocaleString'](_0xea22c9,_0x300756)+'.';else return _0x4a3f7d[_0x4a3f7d[_0x4ce419(0x4d7)]-0x1]===','?Number(_0x4a3f7d)[_0x4ce419(0x363)](_0xea22c9,_0x300756)+',':Number(_0x4a3f7d)['toLocaleString'](_0xea22c9,_0x300756);});let _0x128c80=0x3;while(_0x128c80--){_0x194b77(0x5e0)==='tVicK'?(_0x1b72b4[_0x194b77(0x370)][_0x194b77(0x350)][_0x194b77(0x129)](this),this['_colorCache']=this['_colorCache']||{}):_0x112bdc=VisuMZ[_0x194b77(0x7cc)](_0x112bdc);}return _0x112bdc;},VisuMZ[_0x140e58(0x695)]=function(_0x10cc6,_0x2346d9,_0x28bd94){const _0x23c730=_0x140e58;return _0x10cc6=_0x10cc6[_0x23c730(0x7a2)](/(\d)/gi,(_0x3fd574,_0x51bba1)=>_0x23c730(0x7e1)[_0x23c730(0x722)](Number(_0x51bba1))),_0x23c730(0x5f2)[_0x23c730(0x722)](_0x10cc6,_0x2346d9,_0x28bd94);},VisuMZ[_0x140e58(0x7cc)]=function(_0x5d87c7){const _0x3368dd=_0x140e58;return _0x5d87c7=_0x5d87c7[_0x3368dd(0x7a2)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x43742d,_0x122c40)=>Number(parseInt(_0x122c40))),_0x5d87c7;},VisuMZ[_0x140e58(0x4d8)]=function(_0x1437d4){const _0xb0b1af=_0x140e58;SoundManager[_0xb0b1af(0x7b4)]();if(!Utils['isNwjs']()){if(_0xb0b1af(0x68f)!=='KZiZV')return _0x33f656[_0xb0b1af(0x370)]['Settings'][_0xb0b1af(0x543)]['ActorTPColor'][_0xb0b1af(0x129)](this,_0x1ef7b2);else{const _0x30d757=window[_0xb0b1af(0x65a)](_0x1437d4,'_blank');}}else{if(_0xb0b1af(0x854)!==_0xb0b1af(0x3da)){const _0x23582a=process['platform']==_0xb0b1af(0x36d)?_0xb0b1af(0x65a):process[_0xb0b1af(0x295)]==_0xb0b1af(0x77f)?'start':_0xb0b1af(0x416);require(_0xb0b1af(0x32c))['exec'](_0x23582a+'\x20'+_0x1437d4);}else return _0x30e777[_0xb0b1af(0x370)][_0xb0b1af(0x452)][_0xb0b1af(0x7ad)][_0xb0b1af(0x5ff)];}},Game_Picture['prototype'][_0x140e58(0x435)]=function(){const _0x13f129=_0x140e58;return this[_0x13f129(0x784)];},VisuMZ[_0x140e58(0x370)][_0x140e58(0x5b2)]=Game_Picture['prototype'][_0x140e58(0x16d)],Game_Picture[_0x140e58(0x468)][_0x140e58(0x16d)]=function(){const _0x3d762f=_0x140e58;VisuMZ['CoreEngine']['Game_Picture_initBasic'][_0x3d762f(0x129)](this),this[_0x3d762f(0x784)]={'x':0x0,'y':0x0},this[_0x3d762f(0x35b)]={'x':0x0,'y':0x0};},VisuMZ[_0x140e58(0x370)][_0x140e58(0x7b5)]=Game_Picture['prototype']['updateMove'],Game_Picture[_0x140e58(0x468)][_0x140e58(0x2d7)]=function(){const _0x3bfa37=_0x140e58;this[_0x3bfa37(0x182)]();const _0x35a3a7=this[_0x3bfa37(0x1ec)];VisuMZ[_0x3bfa37(0x370)][_0x3bfa37(0x7b5)][_0x3bfa37(0x129)](this);if(_0x35a3a7>0x0&&this['_duration']<=0x0){if(_0x3bfa37(0x7e4)!==_0x3bfa37(0x807))this['_x']=this[_0x3bfa37(0x281)],this['_y']=this[_0x3bfa37(0x248)],this[_0x3bfa37(0x40b)]=this['_targetScaleX'],this['_scaleY']=this[_0x3bfa37(0x549)],this[_0x3bfa37(0x529)]=this[_0x3bfa37(0x68b)],this[_0x3bfa37(0x784)]&&(this[_0x3bfa37(0x784)]['x']=this[_0x3bfa37(0x35b)]['x'],this[_0x3bfa37(0x784)]['y']=this[_0x3bfa37(0x35b)]['y']);else return _0x223a36[_0x3bfa37(0x87c)]()?this[_0x3bfa37(0x1b0)]():_0x112a45[_0x3bfa37(0x370)][_0x3bfa37(0x1a1)][_0x3bfa37(0x129)](this);}},VisuMZ['CoreEngine']['Game_Picture_show']=Game_Picture[_0x140e58(0x468)][_0x140e58(0x10c)],Game_Picture[_0x140e58(0x468)][_0x140e58(0x10c)]=function(_0xb1d431,_0x166c0e,_0x5d43bc,_0x1d317c,_0x1637df,_0x2bb8b1,_0x5b7c4,_0x203a4a){const _0x42ae72=_0x140e58;VisuMZ[_0x42ae72(0x370)]['Game_Picture_show'][_0x42ae72(0x129)](this,_0xb1d431,_0x166c0e,_0x5d43bc,_0x1d317c,_0x1637df,_0x2bb8b1,_0x5b7c4,_0x203a4a),this[_0x42ae72(0x1bf)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x166c0e]||{'x':0x0,'y':0x0});},VisuMZ[_0x140e58(0x370)][_0x140e58(0x1fa)]=Game_Picture[_0x140e58(0x468)]['move'],Game_Picture[_0x140e58(0x468)][_0x140e58(0x554)]=function(_0x3b8fb2,_0x5a939d,_0x5b6b3c,_0xe1227a,_0x2c36ee,_0x3695a1,_0x2a379a,_0x9cec94,_0x199740){const _0x139bbf=_0x140e58;VisuMZ[_0x139bbf(0x370)][_0x139bbf(0x1fa)][_0x139bbf(0x129)](this,_0x3b8fb2,_0x5a939d,_0x5b6b3c,_0xe1227a,_0x2c36ee,_0x3695a1,_0x2a379a,_0x9cec94,_0x199740),this[_0x139bbf(0x648)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3b8fb2]||{'x':0x0,'y':0x0});},Game_Picture[_0x140e58(0x468)]['updateAnchor']=function(){const _0x30fd26=_0x140e58;this[_0x30fd26(0x1ec)]>0x0&&(this['_anchor']['x']=this[_0x30fd26(0x16e)](this[_0x30fd26(0x784)]['x'],this[_0x30fd26(0x35b)]['x']),this[_0x30fd26(0x784)]['y']=this[_0x30fd26(0x16e)](this['_anchor']['y'],this[_0x30fd26(0x35b)]['y']));},Game_Picture[_0x140e58(0x468)][_0x140e58(0x1bf)]=function(_0x56960c){const _0x1ea902=_0x140e58;this[_0x1ea902(0x784)]=_0x56960c,this[_0x1ea902(0x35b)]=JsonEx[_0x1ea902(0x778)](this[_0x1ea902(0x784)]);},Game_Picture[_0x140e58(0x468)]['setTargetAnchor']=function(_0x47257d){const _0x5dde18=_0x140e58;this[_0x5dde18(0x35b)]=_0x47257d;},VisuMZ[_0x140e58(0x370)][_0x140e58(0x3c2)]=Sprite_Picture['prototype'][_0x140e58(0x253)],Sprite_Picture['prototype'][_0x140e58(0x253)]=function(){const _0x4ce281=_0x140e58,_0x336411=this[_0x4ce281(0x2b3)]();!_0x336411['anchor']()?VisuMZ[_0x4ce281(0x370)][_0x4ce281(0x3c2)]['call'](this):(this['anchor']['x']=_0x336411[_0x4ce281(0x435)]()['x'],this[_0x4ce281(0x435)]['y']=_0x336411[_0x4ce281(0x435)]()['y']);},Game_Action[_0x140e58(0x468)][_0x140e58(0x431)]=function(_0x747f4){const _0x592db0=_0x140e58;if(_0x747f4){if(_0x592db0(0x787)===_0x592db0(0x89c)){const _0x1617b2=_0x21ea88[_0x35a82b][_0x592db0(0x6f8)];_0x5ec123+=_0x25afb1+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x592db0(0x722)](_0x1eafdd,_0x1617b2||_0x592db0(0x656))+_0x35f195;}else{const _0xd33523=_0x747f4['skillId'];if(_0xd33523===0x1&&this[_0x592db0(0x1e5)]()[_0x592db0(0x589)]()!==0x1)this[_0x592db0(0x13b)]();else _0xd33523===0x2&&this[_0x592db0(0x1e5)]()[_0x592db0(0x6e8)]()!==0x2?this[_0x592db0(0x56c)]():_0x592db0(0x767)!==_0x592db0(0x767)?this[_0x592db0(0xd0)](_0x113048[_0x592db0(0x370)][_0x592db0(0x452)][_0x592db0(0x30f)][_0x592db0(0x64e)],_0x3b9907['x'],_0x496e26['y'],_0x4d4f30[_0x592db0(0x3b1)],'right'):this['setSkill'](_0xd33523);}}else{if(_0x592db0(0x5f9)!==_0x592db0(0x3be))this[_0x592db0(0x827)]();else{const _0x4ac2b4=_0x506a61(this['constructor'][_0x592db0(0x6f8)]),_0x23836=this[_0x592db0(0x3a1)](_0x4ac2b4);_0x23836&&(_0x23836[_0x592db0(0x84a)]!==''||_0x23836[_0x592db0(0x225)]!=='')&&(this['_backSprite1']=new _0x3d7703(_0x471e60[_0x592db0(0x7e8)](_0x23836[_0x592db0(0x84a)])),this[_0x592db0(0x603)]=new _0x566f61(_0x562267[_0x592db0(0x23c)](_0x23836[_0x592db0(0x225)])),this[_0x592db0(0x837)](this['_backSprite1']),this[_0x592db0(0x837)](this[_0x592db0(0x603)]),this[_0x592db0(0x334)][_0x592db0(0x78a)][_0x592db0(0x1f2)](this[_0x592db0(0x22e)]['bind'](this,this[_0x592db0(0x334)])),this[_0x592db0(0x603)][_0x592db0(0x78a)][_0x592db0(0x1f2)](this['adjustSprite'][_0x592db0(0xfe)](this,this[_0x592db0(0x603)])));}}},Game_Actor['prototype'][_0x140e58(0x3e7)]=function(){const _0x21636e=_0x140e58;return this[_0x21636e(0x812)]()[_0x21636e(0x6b3)](_0x80b095=>this[_0x21636e(0x29f)](_0x80b095)&&this[_0x21636e(0x76a)]()[_0x21636e(0x7fd)](_0x80b095[_0x21636e(0x251)]));},Window_Base[_0x140e58(0x468)][_0x140e58(0x7d8)]=function(){const _0x96dc4d=_0x140e58;this['_dimmerSprite']=new Sprite(),this[_0x96dc4d(0x88f)][_0x96dc4d(0x78a)]=new Bitmap(0x0,0x0),this[_0x96dc4d(0x88f)]['x']=0x0,this['addChildToBack'](this[_0x96dc4d(0x88f)]);},Window_Base[_0x140e58(0x468)]['refreshDimmerBitmap']=function(){const _0x46835c=_0x140e58;if(this[_0x46835c(0x88f)]){const _0x8658d=this[_0x46835c(0x88f)][_0x46835c(0x78a)],_0x5a81f5=this[_0x46835c(0x3b1)],_0x419391=this['height'],_0x2583e1=this[_0x46835c(0x385)],_0x24c3ed=ColorManager[_0x46835c(0x300)](),_0x927344=ColorManager['dimColor2']();_0x8658d[_0x46835c(0x708)](_0x5a81f5,_0x419391),_0x8658d[_0x46835c(0x7ce)](0x0,0x0,_0x5a81f5,_0x2583e1,_0x927344,_0x24c3ed,!![]),_0x8658d['fillRect'](0x0,_0x2583e1,_0x5a81f5,_0x419391-_0x2583e1*0x2,_0x24c3ed),_0x8658d[_0x46835c(0x7ce)](0x0,_0x419391-_0x2583e1,_0x5a81f5,_0x2583e1,_0x24c3ed,_0x927344,!![]),this[_0x46835c(0x88f)][_0x46835c(0x391)](0x0,0x0,_0x5a81f5,_0x419391);}},Game_Actor[_0x140e58(0x468)][_0x140e58(0x369)]=function(){const _0x46b7de=_0x140e58;for(let _0x3b1546=0x0;_0x3b1546<this['numActions']();_0x3b1546++){const _0x370097=this['makeActionList']();let _0x1ed861=Number[_0x46b7de(0x85f)];this[_0x46b7de(0x51f)](_0x3b1546,_0x370097[0x0]);for(const _0x59e16b of _0x370097){if(_0x46b7de(0x508)!==_0x46b7de(0x508))_0x37f482=_0x485b6b[_0x46b7de(0x370)][_0x46b7de(0x371)]['call'](this);else{const _0x239b3d=_0x59e16b[_0x46b7de(0x580)]();if(_0x239b3d>_0x1ed861){if(_0x46b7de(0x538)!==_0x46b7de(0x194))_0x1ed861=_0x239b3d,this['setAction'](_0x3b1546,_0x59e16b);else return _0x3b97f3[_0x46b7de(0x579)][_0x46b7de(0x2aa)][_0x46b7de(0x129)](this);}}}}this[_0x46b7de(0x731)](_0x46b7de(0x3b5));},Window_BattleItem[_0x140e58(0x468)][_0x140e58(0x374)]=function(_0x231d08){const _0x889a0d=_0x140e58;if(BattleManager[_0x889a0d(0x459)]()){if(_0x889a0d(0x310)===_0x889a0d(0x88c))_0x33cba0['CoreEngine'][_0x889a0d(0x422)][_0x889a0d(0x129)](this),this[_0x889a0d(0x1fd)]();else return BattleManager[_0x889a0d(0x459)]()[_0x889a0d(0x29f)](_0x231d08);}else return Window_ItemList[_0x889a0d(0x468)][_0x889a0d(0x374)][_0x889a0d(0x129)](this,_0x231d08);},VisuMZ[_0x140e58(0x370)][_0x140e58(0xfa)]=Scene_Map[_0x140e58(0x468)]['createSpriteset'],Scene_Map[_0x140e58(0x468)][_0x140e58(0x2c0)]=function(){const _0x90e03c=_0x140e58;VisuMZ[_0x90e03c(0x370)][_0x90e03c(0xfa)]['call'](this);const _0x193b1a=this[_0x90e03c(0x5be)][_0x90e03c(0x7cb)];if(_0x193b1a)this[_0x90e03c(0x837)](_0x193b1a);},VisuMZ['CoreEngine'][_0x140e58(0x5fd)]=Scene_Battle[_0x140e58(0x468)][_0x140e58(0x2c0)],Scene_Battle['prototype'][_0x140e58(0x2c0)]=function(){const _0x355abc=_0x140e58;VisuMZ['CoreEngine'][_0x355abc(0x5fd)][_0x355abc(0x129)](this);const _0xb4cb41=this[_0x355abc(0x5be)][_0x355abc(0x7cb)];if(_0xb4cb41)this[_0x355abc(0x837)](_0xb4cb41);},Sprite_Actor[_0x140e58(0x468)][_0x140e58(0x8b3)]=function(){const _0x34d4c5=_0x140e58;Sprite_Battler[_0x34d4c5(0x468)][_0x34d4c5(0x8b3)][_0x34d4c5(0x129)](this),this[_0x34d4c5(0x682)]();if(this['_actor'])this[_0x34d4c5(0x354)]();else{if(this[_0x34d4c5(0x634)]!==''){if(_0x34d4c5(0x62c)===_0x34d4c5(0x62c))this[_0x34d4c5(0x634)]='';else return this[_0x34d4c5(0x551)]();}}},Window[_0x140e58(0x468)][_0x140e58(0x1a5)]=function(){const _0x1cae95=_0x140e58,_0x50d3bb=this[_0x1cae95(0x102)],_0x5c28c2=this[_0x1cae95(0x26b)],_0x1ced1a=0x18,_0x4e9685=_0x1ced1a/0x2,_0xc9ca67=0x60+_0x1ced1a,_0x37ca3a=0x0+_0x1ced1a;this['_downArrowSprite'][_0x1cae95(0x78a)]=this[_0x1cae95(0x716)],this[_0x1cae95(0x4c0)][_0x1cae95(0x435)]['x']=0.5,this['_downArrowSprite']['anchor']['y']=0.5,this[_0x1cae95(0x4c0)]['setFrame'](_0xc9ca67+_0x4e9685,_0x37ca3a+_0x4e9685+_0x1ced1a,_0x1ced1a,_0x4e9685),this[_0x1cae95(0x4c0)][_0x1cae95(0x554)](Math[_0x1cae95(0x372)](_0x50d3bb/0x2),Math[_0x1cae95(0x372)](_0x5c28c2-_0x4e9685)),this['_upArrowSprite']['bitmap']=this['_windowskin'],this[_0x1cae95(0x747)][_0x1cae95(0x435)]['x']=0.5,this[_0x1cae95(0x747)][_0x1cae95(0x435)]['y']=0.5,this[_0x1cae95(0x747)][_0x1cae95(0x391)](_0xc9ca67+_0x4e9685,_0x37ca3a,_0x1ced1a,_0x4e9685),this[_0x1cae95(0x747)][_0x1cae95(0x554)](Math['round'](_0x50d3bb/0x2),Math[_0x1cae95(0x372)](_0x4e9685));},Window[_0x140e58(0x468)][_0x140e58(0x75f)]=function(){const _0x4f0670=_0x140e58,_0xe93c3e=0x90,_0x2ebe52=0x60,_0x3d8ea5=0x18;this['_pauseSignSprite'][_0x4f0670(0x78a)]=this['_windowskin'],this[_0x4f0670(0x2c5)]['anchor']['x']=0.5,this[_0x4f0670(0x2c5)][_0x4f0670(0x435)]['y']=0x1,this[_0x4f0670(0x2c5)]['move'](Math[_0x4f0670(0x372)](this[_0x4f0670(0x102)]/0x2),this[_0x4f0670(0x26b)]),this['_pauseSignSprite'][_0x4f0670(0x391)](_0xe93c3e,_0x2ebe52,_0x3d8ea5,_0x3d8ea5),this[_0x4f0670(0x2c5)][_0x4f0670(0x3df)]=0xff;},Window[_0x140e58(0x468)][_0x140e58(0x32f)]=function(){const _0x3ff44b=_0x140e58,_0x108fda=this[_0x3ff44b(0x7fc)][_0x3ff44b(0x1b5)][_0x3ff44b(0x802)](new Point(0x0,0x0)),_0x19381d=this[_0x3ff44b(0x7fc)]['filterArea'];_0x19381d['x']=_0x108fda['x']+this[_0x3ff44b(0x163)]['x'],_0x19381d['y']=_0x108fda['y']+this['origin']['y'],_0x19381d[_0x3ff44b(0x3b1)]=Math['ceil'](this['innerWidth']*this['scale']['x']),_0x19381d[_0x3ff44b(0x757)]=Math[_0x3ff44b(0x742)](this['innerHeight']*this[_0x3ff44b(0x61a)]['y']);},Window[_0x140e58(0x468)][_0x140e58(0x484)]=function(){const _0x55c8bc=_0x140e58,_0x2f4370=this[_0x55c8bc(0x567)],_0x3ad958=Math[_0x55c8bc(0x1d1)](0x0,this[_0x55c8bc(0x102)]-_0x2f4370*0x2),_0x30f1ef=Math['max'](0x0,this[_0x55c8bc(0x26b)]-_0x2f4370*0x2),_0x66475=this['_backSprite'],_0x1624c3=_0x66475[_0x55c8bc(0x2c3)][0x0];_0x66475[_0x55c8bc(0x78a)]=this[_0x55c8bc(0x716)],_0x66475[_0x55c8bc(0x391)](0x0,0x0,0x60,0x60),_0x66475['move'](_0x2f4370,_0x2f4370),_0x66475[_0x55c8bc(0x61a)]['x']=_0x3ad958/0x60,_0x66475[_0x55c8bc(0x61a)]['y']=_0x30f1ef/0x60,_0x1624c3[_0x55c8bc(0x78a)]=this['_windowskin'],_0x1624c3['setFrame'](0x0,0x60,0x60,0x60),_0x1624c3[_0x55c8bc(0x554)](0x0,0x0,_0x3ad958,_0x30f1ef),_0x1624c3[_0x55c8bc(0x61a)]['x']=0x1/_0x66475['scale']['x'],_0x1624c3[_0x55c8bc(0x61a)]['y']=0x1/_0x66475[_0x55c8bc(0x61a)]['y'],_0x66475[_0x55c8bc(0x749)](this['_colorTone']);},Game_Temp[_0x140e58(0x468)][_0x140e58(0x598)]=function(){const _0x176a27=_0x140e58;this[_0x176a27(0x405)]=[],this[_0x176a27(0x343)]=[],this[_0x176a27(0x858)]=[],this[_0x176a27(0x5de)]=[];},VisuMZ['CoreEngine'][_0x140e58(0x6ff)]=Scene_Base['prototype'][_0x140e58(0x2b6)],Scene_Base[_0x140e58(0x468)][_0x140e58(0x2b6)]=function(){const _0x5c9caf=_0x140e58;if($gameTemp)$gameTemp[_0x5c9caf(0x598)]();VisuMZ['CoreEngine']['Scene_Base_terminateAnimationClearBugFix']['call'](this);},Bitmap[_0x140e58(0x468)][_0x140e58(0x456)]=function(_0x1b6829){const _0x110160=_0x140e58,_0x5c61f8=this[_0x110160(0x86a)];_0x5c61f8[_0x110160(0x42e)](),_0x5c61f8[_0x110160(0x445)]=this[_0x110160(0xcf)]();const _0x3c9a99=_0x5c61f8['measureText'](_0x1b6829)[_0x110160(0x3b1)];return _0x5c61f8[_0x110160(0x75e)](),_0x3c9a99;},Window_Message['prototype'][_0x140e58(0x851)]=function(_0x54a437){const _0x537033=_0x140e58;if(this['useFontWidthFix']()){if('FNQHa'===_0x537033(0x5c1))return this[_0x537033(0x7be)][_0x537033(0x456)](_0x54a437);else{if(this[_0x537033(0x323)]())_0x28bcfb=_0x4e93d5[_0x537033(0x7e0)](_0xdb7fbc);_0x33f56a['CoreEngine']['Window_Base_drawText'][_0x537033(0x129)](this,_0xaf1437,_0x4be2f3,_0x387bc2,_0x2a039b,_0x2f5487);}}else return Window_Base[_0x537033(0x468)][_0x537033(0x851)][_0x537033(0x129)](this,_0x54a437);},Window_Message[_0x140e58(0x468)][_0x140e58(0x414)]=function(){const _0x5d9916=_0x140e58;return VisuMZ[_0x5d9916(0x370)][_0x5d9916(0x452)][_0x5d9916(0x1f0)]['FontWidthFix']??!![];};