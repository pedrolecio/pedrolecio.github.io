//============================================================================
// Eli_FontManager.js
//============================================================================

/*:
@plugindesc v1.1 - Manage several font settings for your game!
@author Hakuen Studio

@help 
Made and tested with Rpg Maker Mv 1.6.2.
Always have a backup of your project!
******************************************************************************
                            Join me on Patreon!
                    https://www.patreon.com/hakuenstudio
******************************************************************************
==============================================================================
Introduction
==============================================================================

Natively, RPG Maker MV has no options to change the font of your project. 
Although there is a way to switch manually, it will change the font for the 
entire game. 
This plugin enables you to load as many fonts as you like and also gives you 
the possibility to display different fonts for each window!

==============================================================================
Features
==============================================================================

• Load as many fonts as you like.
• Load font templates with different styles for quick use within the game.
• You can use different fonts for each window.
• Change fonts within the game with plugin commands or script calls.

==============================================================================
How to use
==============================================================================

In the plugin parameters, choose the default font and his settings for the 
game.
Then in the extra fonts parameter, you can add as many fonts as you like. 

There are two different parameters here:
• Font file - Enter the name of the .ttf font file here. Font Face will be how 
you will reference this font within your project.
• Window names - Here you can place the windows that will use this font. 
*You cannot repeat window names in other extra sources.
*Unlisted windows will assume the default font for you.

• These are the following window names, standard for RPG Maker MV:

Window_BattleActor	    Window_BattleEnemy
Window_BattleItem	    Window_BattleSkill
Window_PartyCommand	    Window_ActorCommand
Window_BattleLog	    Window_BattleStatus
Window_EquipCommand	    Window_EquipItem
Window_EquipSlot	    Window_EquipStatus
Window_Gold		        Window_Help
Window_ItemCategory	    Window_ItemList
Window_MapName		    Window_Message
Window_NameEdit		    Window_NameInput
Window_NumberInput	    Window_MenuActor
Window_MenuCommand	    Window_MenuStatus
Window_Options		    Window_SkillList
Window_SkillStatus	    Window_SkillType
Window_Status		    Window_SavefileList
Window_EventItem	    Window_GameEnd
Window_ShopBuy		    Window_ShopCommand
Window_ShopNumber	    Window_ShopSell
Window_ShopStatus	    Window_ScrollText
Window_ChoiceList	    Window_TitleCommand
Window_DebugEdit	    Window_DebugRange

If you want to add a font for a non-standard window, you just need to know 
its name and put it in the parameter field.
These names are case sensitive, so be careful.

==============================================================================
Plugin Commands
==============================================================================

FontSize 	    window size
FontColor 	    window color
FontOutWidth 	window size
FontOutColor 	window color
FontItalic 	    window true / false
FontFace 	    window fontFaceName

• Examples:

FontSize Window_Message 22
FontFace Window_Message TimerFont
FontColor #ffffff
FontColor white
FontColor rgba(150_75_45_0.5)
FontColor rgb(150_75_45)

You can also change all properties at once:

FontChangeAll Property Value

Example:

FontChangeAll size 10
* It will change the size of all fonts to 10.

*The window's and fontFace names are case sensitive.

==============================================================================
Script Calls
==============================================================================

$eliFont.change('Window_Name', 'Property', 'value')

Replace 'Property' with the following values(they are case sensitive):
size
face
outColor
outWidth
textColor
italic

• Examples:

$eliFont.change('Window_Message', 'size', 10);
$eliFont.change('Window_Message', 'textColor', 'rgba(75, 80, 40, 0.5)');
$eliFont.change('Window_Message', 'italic', true/false);

==============================================================================
Terms of Use
==============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

==============================================================================
Contact
==============================================================================

RM Web - https://forums.rpgmakerweb.com/index.php?members/eliaquim.123037/
Centro Rpg Maker - https://centrorpg.com/index.php?action=profile
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio
Facebook - https://www.facebook.com/hakuenstudio

==============================================================================
Update log
==============================================================================
Version 1.1 - 08/22/2020
- Changes in the script calls. Please, see help file.
- Code restructuring.
Version 1.0 - 08/07/2020
- Released!
Version 0.2 - 08/05/2020
- Added plugin commands.
Version 0.1 - 07/30/2020
- Beta Plugin release!

@param size
@text Default size
@type number
@desc The size of the font. Default is 28.
@default 28

@param face
@text Default Font Face
@type text
@desc Choose your font face here. This is the how you will reference the font in-game.
@default GameFont

@param textColor
@text Default Text Color
@type text
@desc Choose a color for the text. Can use name, hex and rgba values.
Default is #ffffff
@default #ffffff

@param outColor
@text Default OutColor
@type text
@desc Choose a color for the outline. Can use name, hex and rgba values.
Default is rgba(0, 0, 0, 0.5).
@default rgba(0, 0, 0, 0.5)

@param outWidth
@text Default OutWidth
@type number
@desc Default value is 4.
@default 4

@param italic
@text Default Italic
@type boolean
@desc Set to true to use italic font and false to not.
@default false

@param list
@text Extra fonts
@type struct<allFonts>[]
@desc Load here all the fonts you will use in your game.
@default ["{\"face\":\"GameFont\",\"file\":\"mplus-1m-regular\",\"outlineColor\":\"rgba(0, 0, 0, 0.5)\",\"outlineWidth\":\"4\",\"color\":\"#ffffff\",\"italic\":\"false\"}"]

*/

/*~struct~allFonts:

@param file
@text Font File
@type text
@desc Choose your font file here. Must be a ttf file but don't write the extension here.
@default

@param face
@text Font Face
@type text
@desc Choose your font face here. This is the how you will reference the font in-game.
@default

@param textColor
@text Text Color
@type text
@desc Choose a color for the text. Can use name, hex and rgba values.
@default #ffffff

@param outColor
@text Outline Color
@type text
@desc Choose a color for the outline. Can use name, hex and rgba values.
Default is rgba(0, 0, 0, 0.5).
@default rgba(0, 0, 0, 0.5)

@param outWidth
@text Outline Width
@type number
@desc Default value is 4.
@default 4

@param italic
@text Italic?
@type boolean
@desc Set to true to use italic font and false to not.
@default false

@param winNames
@text Windows using this font
@type text
@desc Put here the window's names that will be using this font. Please look at the list in the help file.
@default

*/

/*:pt
@plugindesc v1.2 - Ajuste várias configurações de fonte para o seu jogo!
@author Hakuen Studio

@help 
******************************************************************************
                          Junte-se a mim no Patreon!
                    https://www.patreon.com/hakuenstudio
******************************************************************************
==============================================================================
Introdução
==============================================================================

Nativamente o RPG Maker MV não tem opções de mudar a fonte do seu projeto. 
Apesar de haver uma maneira de mudar manualmente, isso mudará a fonte para o 
jogo inteiro. 
Esse plugin habilita você carregar quantas fontes quiser e também lhe dá a 
possibilidade de exibir fontes diferentes para cada janela!

==============================================================================
Funcionalidades
==============================================================================

Carregue quantas fontes quiser.
Carregue modelos de fonte com estilos diferentes para usar rapidamente 
dentro do jogo.
Pode usar diferentes fontes para cada janela.
Mudar as fontes dentro do jogo com comandos de plugin ou script calls.

==============================================================================
Como usar
==============================================================================

Nos parâmetros de plugin, escolha a fonte e suas configurações padrões para o 
jogo.
Em seguida no parâmetro fontes extras, você poderá adicionar quantas fontes 
quiser. 

Existem dois parâmetros diferentes aqui:
• Font file - Coloque aqui o nome do arquivo de fonte .ttf. A Font Face será 
como você referenciará esta fonte dentro do seu projeto.
• Window names - Aqui você pode colocar as janelas que usarão essa fonte. 
Você não pode repetir nomes de janelas nas outras fontes extras.
As janelas não listadas assumirão a fonte padrão para si.

Essas são os seguintes nomes de janelas, padrão do RPG Maker MV:

Window_BattleActor	    Window_BattleEnemy
Window_BattleItem	    Window_BattleSkill
Window_PartyCommand	    Window_ActorCommand
Window_BattleLog	    Window_BattleStatus
Window_EquipCommand	    Window_EquipItem
Window_EquipSlot	    Window_EquipStatus
Window_Gold		        Window_Help
Window_ItemCategory	    Window_ItemList
Window_MapName		    Window_Message
Window_NameEdit		    Window_NameInput
Window_NumberInput	    Window_MenuActor
Window_MenuCommand	    Window_MenuStatus
Window_Options		    Window_SkillList
Window_SkillStatus	    Window_SkillType
Window_Status		    Window_SavefileList
Window_EventItem	    Window_GameEnd
Window_ShopBuy		    Window_ShopCommand
Window_ShopNumber	    Window_ShopSell
Window_ShopStatus	    Window_ScrollText
Window_ChoiceList	    Window_TitleCommand
Window_DebugEdit	    Window_DebugRange

Se você quiser adicionar uma fonte para uma janela não padrão, você só 
precisa saber o nome dela e colocar no campo do parâmetro.
Esses nomes tem diferença entre maiúscula e minúscula, então tenha 
atenção.

==============================================================================
Comandos de plugin
==============================================================================

FontSize 	    janela size
FontColor 	    janela color
FontOutWidth 	janela size
FontOutColor 	janela color
FontItalic 	    janela true/false
FontFace 	    janela nome

Exemplos:

FontSize Window_Message 22
FontFace Window_Message TimerFont
FontColor #ffffff
FontColor white
FontColor rgba(150_75_45_0.5)

Você também pode alterar todas as propriedades de uma vez:

FontChangeAll Propriedade valor

• Exemplo:

FontChangeAll size 10
*Vai mudar o tamanho de todas as fontes para 10.

==============================================================================
Script Calls
==============================================================================

$eliFont.change('Window_Name', 'Property', 'value')

Substitua 'Property' pelos seguintes valores(faz diferença maiúscula e 
minúscula):
size
face
outColor
outWidth
textColor
italic

• Exemplos:

$eliFont.change('Window_Message', 'size', 10);
$eliFont.change('Window_Message', 'textColor', 'rgba(75, 80, 40, 0.5)');
$eliFont.change('Window_Message', 'italic', true/false);

==============================================================================
Termos de uso
==============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

==============================================================================
Contato
==============================================================================

RM Web - https://forums.rpgmakerweb.com/index.php?members/eliaquim.123037/
Centro Rpg Maker - https://centrorpg.com/index.php?action=profile
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio
Facebook - https://www.facebook.com/hakuenstudio

==============================================================================
Log de Atualizações
==============================================================================
Versão 1.1 - 22/08/2020
- Mudança nas script calls. Veja o arquivo de ajuda.
- Reestruturação do código.
Versão 1.0 - 07/08/2020
- Lançado!
Versão 0.2 - 05/08/2020
- Adicionado comandos de plugins.
Versão 0.1 - 30/07/2020
- Lançamento beta!

@param size
@text Tamanho padrão
@type number
@desc O tamanho da fonte. O padrão é 28.
@default 28

@param face
@text Font face padrão.
@type text
@desc Esse é o font face padrão.
@default GameFont

@param textColor
@text Cor padrão do texto
@type text
@desc Escolha uma cor para o texto. Pode ser nomes html, hex, rgb ou rgba.
O padrão é #ffffff
@default #ffffff

@param outColor
@text Cor padrão do contorno
@type text
@desc Escolha uma cor para o contorno. Pode ser nomes html, hex, rgb ou rgba.
O padrão é rgba(0, 0, 0, 0.5).
@default rgba(0, 0, 0, 0.5)

@param outWidth
@text Largura padrão do contorno
@type number
@desc O padrão é 4.
@default 4

@param italic
@text Italic
@type boolean
@desc Coloque true para usar itálico.
@default false

@param list
@text Fontes extras
@type struct<allFonts>[]
@desc Aqui você pode carregar todas as fontes para o seu jogo.
@default ["{\"face\":\"GameFont\",\"file\":\"mplus-1m-regular\",\"outlineColor\":\"rgba(0, 0, 0, 0.5)\",\"outlineWidth\":\"4\",\"color\":\"#ffffff\",\"italic\":\"false\"}"]

*/

/*~struct~allFonts:pt

@param file
@text Arquivo da fonte
@type text
@desc Deve ser um arquivo .ttf. Mas não escreva a extensão aqui.
@default

@param face
@text Font Face
@type text
@desc Escolha um nome para sua fonte. É com esse que você a referenciará no jogo.
@default

@param textColor
@text Cor do text
@type text
@desc Escolha uma cor para o texto. Pode ser nomes html, hex, rgb ou rgba.
O padrão é #ffffff
@default #ffffff

@param outColor
@text Cor do contorno
@type text
@desc Escolha uma cor para o contorno. Pode ser nomes html, hex, rgb ou rgba.
O padrão é rgba(0, 0, 0, 0.5).
@default rgba(0, 0, 0, 0.5)

@param outWidth
@text Largura do contorno
@type number
@desc O valor padrão é 4.
@default 4

@param italic
@text Italico
@type boolean
@desc Coloque true se quiser usar itálico.
@default false

@param winNames
@text Janelas
@type text
@desc Coloque aqui o nome das janelas que usarão essa fonte. Consulte a lista no arquivo de ajuda.
@default

*/

"use strict"

var Imported = Imported || {};
Imported.Eli_FontManager = true;

var Eli = Eli || {};
Eli.FontManager = Eli.FontManager || {};

Eli.needBook = function() {
    if(!Eli.alert){
        window.alert(`Eli's_Book.js was not found. 
Please download the latest version for free.`);
        if(confirm) {
            window.open('https://hakuenstudio.itch.io/elis-book-rpg-maker-mv');
        }
        Eli.alert = true;
    }
};

if(!Imported.Eli_Book) Eli.needBook();

Eli.FontManager.Parameters = PluginManager.parameters('Eli_FontManager');
Eli.FontManager.Param = eli.convertParameters(Eli.FontManager.Parameters) || {};

class Eli_FontManager {

    constructor(){};

    loadAllFonts(){
        const font = this.gameFonts();
        for(let i = 0, l = font.length; i < l; i++){
            Graphics.loadFont(font[i].face, `/fonts/${font[i].file}.ttf`);
        }
    };

    gameFonts(){
        return Eli.FontManager.Param.list;
    };

    gameEli(){
        return $gameEli.fontManager();
    };

    windowsFonts(){ // A list of all windows and his fonts
        return this.gameEli()._windowsFonts;
    };

    windowFont(winName){ // current font for a window.
        return this.windowsFonts()[winName];
    };

    addFontToWindow(winName){
        const presetConfig = Eli.FontManager.Param.list.find(item => item.winNames.includes(winName));
        this.gameEli()._windowsFonts[winName] = {
            size:       Eli.FontManager.Param.size,
            face:       presetConfig  ? presetConfig.face      : Eli.FontManager.Param.face,
            textColor:  presetConfig  ? presetConfig.textColor : Eli.FontManager.Param.textColor,
            outColor:   presetConfig  ? presetConfig.outColor  : Eli.FontManager.Param.outColor,
            outWidth:   presetConfig  ? presetConfig.outWidth  : Eli.FontManager.Param.outWidth,
            italic:     presetConfig  ? presetConfig.italic    : Eli.FontManager.Param.italic,
        }
    };

    change(winName, property, value){ // Change propertys of a window fonts.
        return this.gameEli()._windowsFonts[winName][property] = value;
    };

    executeCommand(command, args){
        const allCommands = {
            FONTSIZE: 'changeSize',
            FONTCOLOR: 'changeColor',
            FONTOUTWIDTH: 'changeOutWidth',
            FONTOUTCOLOR: 'changeOutColor',
            FONTITALIC: 'changeItalic',
            FONTFACE: 'changeFontFace',
            FONTCHANGEALL: 'changeAll'
        }
        const result = allCommands[command.toUpperCase()];
        if(result) this[result](args);
    };
    
    changeSize(args){
        this.change(args[0], 'size', args[1]);
    };
    
    changeColor(args){
        this.change(args[0], 'textColor', eli.convertColors(args[1]));
    };
    
    changeOutWidth(args){
        this.change(args[0], 'outWidth', +args[1]);
    };
    
    changeOutColor(args){
        this.change(args[0], 'outColor', eli.convertColors(args[1]));
    };
    
    changeItalic(args){
        this.change(args[0], 'italic', eli.toBoolean(args[1]));
    };
    
    changeFontFace(args){
        this.change(args[0], 'face', args[1]);
    };
    
    changeAll(args){
        const windowList = Object.keys(this.windowsFonts());
        const property = { size:'size', face:'face', color:'textColor', outcolor:'outColor', outwidth:'outWidth', italic:'italic' };
        for(let i = 0, l = windowList.length; i < l; i++){
            const winName = windowList[i];
            const fontProperty = property[args[0].toLowerCase()];
            const value = isNaN(args[1]) ? args[1] : +args[1];
            this.change(winName, fontProperty, value);
        }
    };
};

const $eliFont = new Eli_FontManager();
$eliFont.loadAllFonts();

//==============================================================\\
//                          GAME FONT                           \\
//==============================================================\\

Eli.FontManager.Game_Eli_initialize = Game_Eli.prototype.initialize;
Game_Eli.prototype.initialize = function(){
	Eli.FontManager.Game_Eli_initialize.call(this);
    this.contents.fontManager = {};
    this.contents.fontManager._windowsFonts = {};
};

Game_Eli.prototype.fontManager = function(){
	return this.contents.fontManager;
};

//==============================================================\\
//                          WINDOWS                             \\
//==============================================================\\

Eli.FontManager.Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
    Eli.FontManager.Window_Base_initialize.call(this, x, y, width, height);
    this._winName = this.constructor.name;
    this.initFont();
};

Eli.FontManager.Window_Base_standardFontFace = Window_Base.prototype.standardFontFace;
Window_Base.prototype.standardFontFace = function() {
    const alias = Eli.FontManager.Window_Base_standardFontFace.call(this);
    return this.font() ? this.font().face : alias
};

Eli.FontManager.Window_Base_standardPadding = Window_Base.prototype.standardPadding;
Window_Base.prototype.standardPadding = function() {
    const alias = Eli.FontManager.Window_Base_standardPadding.call(this);
    if(this.standardOutlineWidth() > 4){
        return 18 - 4 + this.standardOutlineWidth();
    } else {
        return alias;
    }
};

Eli.FontManager.Window_Base_normalColor = Window_Base.prototype.normalColor;
Window_Base.prototype.normalColor = function() {
    const alias = Eli.FontManager.Window_Base_normalColor.call(this);
    return this.font() ? this.font().textColor : alias;
};

Eli.FontManager.Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    this.contents.outlineColor = this.standardOutlineColor();
    this.contents.outlineWidth = this.standardOutlineWidth();
    this.contents.fontItalic = this.standardItalic();
    Eli.FontManager.Window_Base_resetFontSettings.call(this);
};

Window_Base.prototype.initFont = function(){
    if(!$eliFont.windowFont(this._winName)){ // $eliFont._font[this._winName]
        $eliFont.addFontToWindow(this._winName);
    }
};

Window_Base.prototype.font = function() {
    return $eliFont.windowFont(this._winName) ? $eliFont.windowFont(this._winName) : null;
};

Window_Base.prototype.standardFontSize = function() { // Overwrite
    return this.font() ? this.font().size : 28;
};

Window_Base.prototype.standardOutlineColor = function() {
    return this.font() ? this.font().outColor : 'rgba(0, 0, 0, 0.5)';
};

Window_Base.prototype.standardOutlineWidth = function() {
    return this.font() ? this.font().outWidth : 4;
};

Window_Base.prototype.standardItalic = function() {
    return this.font() ? this.font().italic : false;
};

//==============================================================\\
//                   COMANDOS DE PLUGIN                         \\
//==============================================================\\

Eli.FontManager.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
Eli.FontManager.Game_Interpreter_pluginCommand.call(this, command, args);
    $eliFont.executeCommand(command, args);
};