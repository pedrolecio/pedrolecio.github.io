//============================================================================
// Eli_ChoicePictures.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book
@orderAfter EliMZ_EasingPicture

@plugindesc Show different pictures for each choice.
@author Hakuen Studio | v2.0.0
@url https://hakuenstudio.itch.io/

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

● Build and play a game that the player is able to make choices is cool! 
Although Rpg Maker Mz choices is nice, this plugin made it better while it 
implements a feature that let's you show pictures while the player hover 
over/select different choices!

============================================================================
Features
============================================================================

● Show different pictures depending on what choice is highlighted.

============================================================================
How to use
============================================================================

● You just have to use the plugin command to setup each picture for each 
choice. You can't have more choices than pictures.
If you have 5 choices, you have to setup 5 pictures or more in the plugin 
command. They can be empty pictures, but has to be there.
● Use always before the choice command.
● If you are using EliMZ_EasingPictures, you can use the plugin command
to set the easing type by Id before setup each picture.

============================================================================
Terms of Use
============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio

============================================================================
Update log
============================================================================
Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.

Version 1.1.0 - 11/29/2020
- Added compatibility with EliMZ_EasingPictures.
- No need to enable or disable the plugin anymore. It will handle it 
automatically.

Version 1.0.3 - 11/11/2020
- Fixed a bug that was not letting the user disable the plugin.

Version 1.0.2 - 11/09/2020
- Fixed a bug when hover the mouse over the choices.

Version 1.0.1 - 10/28/2020
- Code clean up.

Version 1.0.0 - 10/20/2020
- Plugin release!

@param enable
@text Enable by default
@type boolean
@desc Enable or disable the pictures for choices by default.
@default true

@command enablePlugin
@text Enable Choice Pic
@desc Choose to enable or disable choice picture

@arg enable
@text Enable choice pictures ?
@type boolean
@default true

@command setupPictures
@text Setup Choice Pictures
@desc Setup each pictures for each choice.

@arg id
@text Picture Id
@type number
@min 1
@max 100
@desc Choose the id for all choice pictures.
@default 1

@arg pictures
@text All pictures
@type struct<stlist>[]
@desc Choose the default pictures for each index.
@default ["{\"name\":\"Actor1_1\",\"origin\":\"UpperLeft\",\"x1\":\"0\",\"y1\":\"0\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}","{\"name\":\"Actor1_2\",\"origin\":\"UpperLeft\",\"x1\":\"300\",\"y1\":\"0\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}","{\"name\":\"Actor1_3\",\"origin\":\"UpperLeft\",\"x1\":\"0\",\"y1\":\"300\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}","{\"name\":\"Actor1_4\",\"origin\":\"UpperLeft\",\"x1\":\"0\",\"y1\":\"0\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}","{\"name\":\"Actor1_5\",\"origin\":\"UpperLeft\",\"x1\":\"0\",\"y1\":\"0\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}","{\"name\":\"Actor1_6\",\"origin\":\"UpperLeft\",\"x1\":\"0\",\"y1\":\"0\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}"]

*/

/*~struct~stlist:

@param name
@text Picture Name
@type file
@dir img/pictures

@param origin
@text Origin
@type select
@option UpperLeft
@option Center
@desc Choose the origin of the picture.
@default UpperLeft

@param x1
@text Initial X
@type text
@desc The initial X position. You can use formula and \v[id] too.
@default 0

@param y1
@text Initial Y
@type text
@desc The initial Y position. You can use formula and \v[id] too.
@default 0

@param x2
@text Final X
@type text
@desc The final X position. You can use formula and \v[id] too.
@default 0

@param y2
@text Final Y
@type text
@desc The final Y position. You can use formula and \v[id] too.
@default 0

@param scaleX
@text Scale X
@type number
@min -1000
@max 1000
@desc the scale X
@default 100

@param scaleY
@text Scale Y
@type number
@min -1000
@max 1000
@desc The scale Y
@default 100

@param opacity
@text Opacity
@type number
@desc The opacity of the picture.
@default 255

@param blendMode
@text Blend mode
@type select
@desc Choose blend Type
@option Normal
@option Additive
@option Multiply
@option Screen
@default Normal

@param duration
@text Duration
@type number
@desc The duration.
@default 60

@param easingType
@text Easing
@type select
@option Constant speed
@option Slow start
@option Slow end
@option Slow start and end
@desc Select the easy type.
@default Constant speed

*/

"use strict"

var Eli = Eli || {};
var Imported = Imported || {};
Imported.Eli_ChoicePictures = true;

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */

{

    const installWarning = `You must have installed the EliMZ_Book plugin above all Eli plugins.
Please download it for free.`
    const pluginName = (() => {
        const url = String(document.currentScript._url);
        const start = url.indexOf('Eli');
        const end = url.length - 3;
        const pluginName = url.substring(start, end);

        return pluginName;
    })();
    const requiredVersion = ['3','0','0']
    const updateWarning = `${pluginName} needs an updated version of EliMZ_Book.
Please download it for free.`

    function callEliBook(){
        window.open('https://hakuenstudio.itch.io/')
    };
    
    function needInstallBook() {
        if(!Eli.alert){

            if(window.confirm(installWarning)) callEliBook();
            Eli.alert = true;
        }
    };

    function needUpdateBook() {
        if(!Eli.alert){

            if(window.confirm(updateWarning)) callEliBook();
            Eli.alert = true;
        }
    };
    
    if(!Imported.Eli_Book) needInstallBook();
    if(Eli.Book.Version < requiredVersion) needUpdateBook();
     
}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.ChoicePictures = {

    parameters: EliPluginManager.createParameters() || {},
    alias: this.alias || {},
    id: 0,
    list: new Array(6),
    oldIndex: null,
    enable: false,

    initialize(){
        this.list.fill(this.defaultPicture());
        EliPluginManager.registerCommands(this);
    },

    defaultPicture(){
        return {
            name: '',
            origin: 0,
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            scaleX: 100,
            scaleY: 100,
            opacity: 255,
            blendMode: 0,
            duration: 0,
            easingType: 0,
        }
    },

    isEnable(){
        return this.enable;
    },

    getList(){
        return this.list;
    },

    getId(){
        return this.id;
    },

    setList(newList){
        this.list = newList;
    },

    setId(id){
        this.id = id;
    },

    enablePicture(boolean){
        this.enable = boolean;
    },

    preload(){
        if(this.isEnable()) {

            for(const picture of this.getList()){
                ImageManager.loadPicture(picture.name);
            }
        }
    },

    showIfCan(index){
        if(this.oldIndex !== index){
            this.show(index);
            this.oldIndex = index;
        }
    },

    show(index){
        if($gameMessage.isChoice() && this.isEnable()){
            const id = this.getId();
            const picture = this.getList()[index];
            const {name, origin, x1, y1, x2, y2, scaleX, scaleY, opacity, 
                    blendMode, duration, easingType} = picture;
            
            $gameScreen.showPicture(id, name, origin, x1, y1, scaleX, scaleY, 
                    opacity, blendMode);
            $gameScreen.movePicture(id, origin, x2, y2, scaleX, scaleY, opacity, 
                    blendMode, duration, easingType);
        }
    },

    erase(){
        if(this.isEnable()){

            if(Imported.Eli_EasingPicture){
                Eli.EasingPicture.resetEasing(this.id)
            }
            $gameScreen.erasePicture(this.getId());
            this.enablePicture(false);
        }
    },

/* ----------------------------- PLUGIN COMMANDS ---------------------------- */

    enablePlugin(args){
        this.enablePicture(EliBook.toBoolean(args.enable));
    },

    setupPictures(args){
        args = EliPluginManager.convertParameters(args);
        const {id, pictures } = args;
        this.setId(id);

        for(const picture of pictures){
            picture.origin = EliBook.getPicOrigin(picture.origin);
            picture.blendMode = EliBook.getBlendMode(picture.blendMode);
            picture.x1 = EliBook.processEscapeVarOrFormula(picture.x1);
            picture.y1 = EliBook.processEscapeVarOrFormula(picture.y1);
            picture.x2 = EliBook.processEscapeVarOrFormula(picture.x2);
            picture.y2 = EliBook.processEscapeVarOrFormula(picture.y2);
            picture.easingType  = EliBook.getDefaultEasingType(picture.easingType);      
        }

        this.setList(pictures);
        this.enablePicture(true);

    },

};

Eli.ChoicePictures.initialize();

const Plugin = Eli.ChoicePictures;
const Alias = Eli.ChoicePictures.alias;

/* ========================================================================== */
/*                                   OBJECTS                                  */
/* ========================================================================== */

if(Imported.Eli_EasingPicture){

Game_Picture.prototype.stopEasing = function(){
    this.initEasing();
    this._duration = 0;
    this._currentDuration = 0;
    this._easingType = 0;
    if(Plugin.isEnable() && Plugin.id === this._id){
        
    }else{
        Eli.EasingPicture.resetEasing(this._id);
    }
};

}

/* ========================================================================== */
/*                             WINDOW CHOICE LIST                             */
/* ========================================================================== */

Alias.Window_ChoiceList_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function() {
    Alias.Window_ChoiceList_start.call(this);
    Plugin.oldIndex = 0;
    Plugin.preload();
    Plugin.show(this._index);
};

Alias.Window_ChoiceList_select = Window_ChoiceList.prototype.select;
Window_ChoiceList.prototype.select = function(index) {
    Alias.Window_ChoiceList_select.call(this, index);
    Plugin.showIfCan(index);
};

Alias.Window_ChoiceList_close = Window_ChoiceList.prototype.close;
Window_ChoiceList.prototype.close = function() {
    Alias.Window_ChoiceList_close.call(this);
    Plugin.erase();
};

}