L.Control.Basemaps=L.Control.extend({_map:null,includes:L.Evented,options:{position:"bottomright",tileX:0,tileY:0,tileZ:0,layers:[]},basemap:null,onAdd:function(t){this._map=t;var e=L.DomUtil.create("div","basemaps leaflet-control closed");return L.DomEvent.disableClickPropagation(e),L.Browser.touch||L.DomEvent.disableScrollPropagation(e),this.options.basemaps.forEach(function(o,s){var a="basemap";0===s?(this.basemap=o,this._map.addLayer(o),a+=" active"):1===s&&(a+=" alt");var i={x:this.options.tileX,y:this.options.tileY},n=L.Util.template(o._url,L.extend({s:o._getSubdomain(i),x:i.x,y:o.options.tms?o._globalTileRange.max.y-i.y:i.y,z:this.options.tileZ},o.options));if(o instanceof L.TileLayer.WMS){o._map=t;var l=o.options.crs||t.options.crs,r=L.extend({},o.wmsParams),m=parseFloat(r.version),p=m>=1.3?"crs":"srs";r[p]=l.code;var c=L.point(i);c.z=this.options.tileZ;var d=o._tileCoordsToBounds(c),h=l.project(d.getNorthWest()),v=l.project(d.getSouthEast()),b=(m>=1.3&&l===EPSG4326?[v.y,h.x,h.y,v.x]:[h.x,v.y,v.x,h.y]).join(",");n+=L.Util.getParamString(r,n,o.options.uppercase)+(o.options.uppercase?"&BBOX=":"&bbox=")+b}var u=L.DomUtil.create("div",a,e),g=L.DomUtil.create("img",null,u);g.src=n,o.options&&o.options.label&&(g.title=o.options.label),L.DomEvent.on(u,"click",function(){if(o!=this.basemap){t.removeLayer(this.basemap),t.addLayer(o),o.bringToBack(),t.fire("baselayerchange",o),this.basemap=o,L.DomUtil.removeClass(document.getElementsByClassName("basemap active")[0],"active"),L.DomUtil.addClass(u,"active");var e=(s+1)%this.options.basemaps.length;L.DomUtil.removeClass(document.getElementsByClassName("basemap alt")[0],"alt"),L.DomUtil.addClass(document.getElementsByClassName("basemap")[e],"alt")}},this)},this),this.options.basemaps.length>2&&(L.DomEvent.on(e,"mouseenter",function(){L.DomUtil.removeClass(e,"closed")},this),L.DomEvent.on(e,"mouseleave",function(){L.DomUtil.addClass(e,"closed")},this)),this._container=e,this._container}}),L.control.basemaps=function(t){return new L.Control.Basemaps(t)};