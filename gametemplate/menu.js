function Menu(name, pos, width, height)
{
	this.pos = pos;
	this.width = width;
	this.height = height;
	this.visible = true;
	this.element = createDiv('').class("panel")
		.style("position:absolute; top: "+this.pos.y+"px; left: "+this.pos.x+"px; "+
			"width: "+this.width+"px; height: "+this.height+"px;");

	this.elements = [];

	this.add = function(item) {
		this.elements.push(item);
		item.menu = this;
		this.element.child(item.element);
	}

	this.show = function() {
		this.visible = true;
		this.element.show();
	}
	this.hide = function() {
		this.visible = false;
		this.element.hide();
	}

	const m = this;
	let header = createDiv('<h1>'+name+'</h1></div').class("header"),
		closer = createButton('X').class('closer').mouseClicked(function() {m.hide();});
	header.child(closer);
	this.element.child(header);
}

function Panel(name, id, cssclass)
{
	this.name = name;
	this.element = createDiv('').class(cssclass).id(id);
	this.elements = [];

	this.add = function(item) {
		this.elements.push(item);
		item.menu = this;
		this.element.child(item.element);
	}
}

function Button(name, callback, cssclass = 'button')
{
	this.menu = null; // will be overwritten when added to a menu
	this.name = name;
	this.callback = callback;
	this.element = createButton(name).class(cssclass);
	this.element.mouseClicked(callback);
	// this.element.touchEnded(callback);
}

function Item(content, callback = null, cssclass = null)
{
	this.menu = null; // will be overwritten when added to a menu
	this.element = createDiv(content);
	if (cssclass) this.element.class(cssclass);
	if (callback) this.element.mouseClicked(callback);
}
function Image(url, callback = null, cssclass = null)
{
	this.menu = null; // will be overwritten when added to a menu
	this.element = createImg(url);
	if (cssclass) this.element.class(cssclass);
	if (callback) this.element.mouseClicked(callback);
}

