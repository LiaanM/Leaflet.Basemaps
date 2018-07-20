L.Control.Basemaps=L.Control.extend({_map:null,includes:L.Evented?L.Evented.prototype:L.Mixin.Event,options:{position:"bottomright",tileX:0,tileY:0,tileZ:0,layers:[]},basemap:null,onAdd:function(t){this._map=t;var e=L.DomUtil.create("div","basemaps leaflet-control closed");return L.DomEvent.disableClickPropagation(e),L.Browser.touch||L.DomEvent.disableScrollPropagation(e),this.options.basemaps.forEach(function(o,s){var a="basemap";0===s?(this.basemap=o,this._map.addLayer(o),a+=" active"):1===s&&(a+=" alt");var i;if(o.options.isconURL)i=o.options.iconURL;else{var n={x:this.options.tileX,y:this.options.tileY};if(i=L.Util.template(o._url,L.extend({s:o._getSubdomain(n),x:n.x,y:o.options.tms?o._globalTileRange.max.y-n.y:n.y,z:this.options.tileZ},o.options)),o instanceof L.TileLayer.WMS){o._map=t;var l=o.options.crs||t.options.crs,r=L.extend({},o.wmsParams),m=parseFloat(r.version),p=m>=1.3?"crs":"srs";r[p]=l.code;var c=L.point(n);c.z=this.options.tileZ;var d=o._tileCoordsToBounds(c),v=l.project(d.getNorthWest()),h=l.project(d.getSouthEast()),b=(m>=1.3&&l===L.CRS.EPSG4326?[h.y,v.x,v.y,h.x]:[v.x,h.y,h.x,v.y]).join(",");i+=L.Util.getParamString(r,i,o.options.uppercase)+(o.options.uppercase?"&BBOX=":"&bbox=")+b}}var u=L.DomUtil.create("div",a,e),y=L.DomUtil.create("img",null,u);y.src=i,o.options&&o.options.label&&(y.title=o.options.label),L.DomEvent.on(u,"click",function(){if(o!=this.basemap){t.removeLayer(this.basemap),t.addLayer(o),o.bringToBack(),t.fire("baselayerchange",o),this.basemap=o,L.DomUtil.removeClass(e.getElementsByClassName("basemap active")[0],"active"),L.DomUtil.addClass(u,"active");var a=(s+1)%this.options.basemaps.length;L.DomUtil.removeClass(e.getElementsByClassName("basemap alt")[0],"alt"),L.DomUtil.addClass(e.getElementsByClassName("basemap")[a],"alt")}},this)},this),this.options.basemaps.length>2&&(L.DomEvent.on(e,"mouseenter",function(){L.DomUtil.removeClass(e,"closed")},this),L.DomEvent.on(e,"mouseleave",function(){L.DomUtil.addClass(e,"closed")},this)),this._container=e,this._container}}),L.control.basemaps=function(t){return new L.Control.Basemaps(t)};