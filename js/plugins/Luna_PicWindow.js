//=============================================================================
// Luna_PicWindow.js
//=============================================================================
//=============================================================================
// Build Date: 2020-09-19 18:17:07
//=============================================================================
//=============================================================================
// Made with LunaTea -- Haxe
//=============================================================================

// Generated by Haxe 4.1.3
/*:
@author LunaTechs - Kino
@plugindesc This plugin allows you to open up a picture window Phoenix Wright style<LunaPicWindow>.

@target MV MZ

* @param x
* @text Window X Position
* @desc Picture window x position.
* @default 283
*
* @param y
* @text Window Y Position
* @desc Picture window y position.
* @default 150
*
* @param width
* @text Window Width
* @desc Picture window width.
* @default 250
*
* @param height
* @text Window Height
* @desc Picture window height.
* @default 250

@command showPicWindow
@text Show Picture Window
@desc Shows the picture window with the designated image file from your picture folder.
@arg fileName

@command showWindow
@text Show Picture Window
@text Show Window
@desc Shows the picture window without updating the image file.

@command closeWindow
@text Close Window
@desc Closes the picture window.


@help
This plugin allows you to have a press start button before the title screen information.

=====Script Calls=====

Shows the picture by name in the picture window.
LunaPictureWindow.showPic(imageName)

Shows the window without updating the picture.
LunaPictureWindow.show()


Hides the picture window by 
LunaPictureWindow.hide()

MIT License
Copyright (c) 2020 LunaTechsDev
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE
*/





(function ($hx_exports, $global) { "use strict"
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {};
class EReg {
	constructor(r,opt) {
		this.r = new RegExp(r,opt.split("u").join(""))
	}
	match(s) {
		if(this.r.global) {
			this.r.lastIndex = 0
		}
		this.r.m = this.r.exec(s)
		this.r.s = s
		return this.r.m != null;
	}
}
EReg.__name__ = true
class LunaPictureWindow extends Window_Base {
	constructor(x,y,width,height) {
		let rect = new Rectangle(x,y,width,height)
		super(rect);
		this.openness = 0
		this.hide()
	}
	repaint() {
		if(this.contents != null) {
			this.contents.clear()
			this.paintPicture()
		}
	}
	paintPicture() {
		this.contents.blt(this._pic,0,0,this._pic.width,this._pic.height,0,0,this.contentsWidth(),this.contentsHeight())
	}
	setPicture(pic) {
		this._pic = pic
	}
}
$hx_exports["LunaPictureWindow"] = LunaPictureWindow
LunaPictureWindow.__name__ = true
class LunaPicWindow {
	static main() {
		let _this = $plugins
		let _g = []
		let _g1 = 0
		while(_g1 < _this.length) {
			let v = _this[_g1]
			++_g1
			if(new EReg("<LunaPicWindow>","ig").match(v.description)) {
				_g.push(v)
			}
		}
		let plugin = _g[0]
		let params = plugin.parameters
		LunaPicWindow.LPParams = { x : parseInt(params["x"],10), y : parseInt(params["y"],10), width : parseInt(params["width"],10), height : parseInt(params["height"],10)}
		
//=============================================================================
// Scene_Map
//=============================================================================
      
		let _sceneMapCreateAllWindows = Scene_Map.prototype.createAllWindows
		Scene_Map.prototype.createAllWindows = function() {
			_sceneMapCreateAllWindows.call(this)
			LunaPicWindow.createPictureWindow(this)
		}
		
//=============================================================================
// Plugin Commands
//=============================================================================
      
		PluginManager.registerCommand(plugin.name,"showPicWindow",function(argObj) {
			LunaPicWindow.showPic(argObj.fileName)
		})
		PluginManager.registerCommand(plugin.name,"showWindow",function(_) {
			LunaPicWindow.showWindow()
		})
		PluginManager.registerCommand(plugin.name,"hideWindow",function(_) {
			LunaPicWindow.hideWindow()
		})
	}
	static createPictureWindow(scene) {
		let picWindow = new LunaPictureWindow(LunaPicWindow.LPParams.x,LunaPicWindow.LPParams.y,LunaPicWindow.LPParams.width,LunaPicWindow.LPParams.height)
		scene._picWindow = picWindow
		LunaPicWindow.setupWinEvents(picWindow)
		scene.addWindow(picWindow)
		LunaPicWindow.PicWindow = picWindow
	}
	static setupWinEvents(win) {
		LunaPicWindow.listener.on("show",function() {
			win.show()
			win.open()
		})
		LunaPicWindow.listener.on("showpic",function(picture) {
			win.setPicture(picture)
			win.repaint()
			win.show()
			win.open()
		})
		LunaPicWindow.listener.on("hide",function() {
			win.close()
			win.hide()
		})
	}
	static showPic(imageName) {
		let picture = ImageManager.loadPicture(imageName,0)
		picture.addLoadListener(function(bitmap) {
			if(bitmap.isReady() && ((SceneManager._scene) instanceof Scene_Map)) {
				LunaPicWindow.listener.emit("showpic",bitmap)
			}
		})
	}
	static showWindow() {
		if(LunaPicWindow.PicWindow != null) {
			LunaPicWindow.listener.emit("show")
		}
	}
	static hideWindow() {
		if(LunaPicWindow.PicWindow != null) {
			LunaPicWindow.listener.emit("hide")
		}
	}
}
$hx_exports["LunaPicWindow"] = LunaPicWindow
LunaPicWindow.__name__ = true
Math.__name__ = true
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0
		this.array = array
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o)
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object"
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__]
				let n = e.__constructs__[o._hx_index]
				let con = e[n]
				if(con.__params__) {
					s = s + "\t"
					return n + "(" + ((function($this) {
						var $r
						let _g = []
						{
							let _g1 = 0
							let _g2 = con.__params__
							while(true) {
								if(!(_g1 < _g2.length)) {
									break
								}
								let p = _g2[_g1]
								_g1 = _g1 + 1
								_g.push(js_Boot.__string_rec(o[p],s))
							}
						}
						$r = _g
						return $r;
					}(this))).join(",") + ")"
				} else {
					return n;
				}
			}
			if(((o) instanceof Array)) {
				let str = "["
				s += "\t";
				let _g = 0
				let _g1 = o.length
				while(_g < _g1) {
					let i = _g++
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr
			try {
				tostr = o.toString
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString()
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n"
			s += "\t";
			let hasp = o.hasOwnProperty != null
			let k = null
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1)
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true
class _$LTGlobals_$ {
}
_$LTGlobals_$.__name__ = true
class utils_Fn {
	static proto(obj) {
		return obj.prototype;
	}
	static updateProto(obj,fn) {
		return (fn)(obj.prototype);
	}
	static updateEntity(obj,fn) {
		return (fn)(obj);
	}
}
utils_Fn.__name__ = true
String.__name__ = true
Array.__name__ = true
js_Boot.__toStr = ({ }).toString
LunaPicWindow.listener = new PIXI.utils.EventEmitter()
LunaPicWindow.main()
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, {})

//# sourceMappingURL=Luna_PicWindow.js.map