// TODO: remove this once https://github.com/naomap/leaflet-fusesearch/pull/26 has been merged
L.Control.FuseSearchExtended = L.Control.FuseSearch.extend({
    _createControl: function() {
        var ctrl = L.Control.FuseSearch.prototype._createControl.call(this);
        L.DomEvent.on(this._openButton, 'wheel', L.DomEvent.stopPropagation);
        return ctrl;
    },
    _clearControl: function() {
        L.DomEvent.off(this._openButton, 'wheel', L.DomEvent.stopPropagation);
        L.Control.FuseSearch.prototype._clearControl.call(this);
    },
    _createPanel: function(map) {
        var pane = L.Control.FuseSearch.prototype._createPanel.call(this, map);
        L.DomEvent.on(this._panel, 'wheel', L.DomEvent.stopPropagation);
        return pane;
    },
    _clearPanel: function(map) {
        L.DomEvent.off(this._panel, 'wheel', L.DomEvent.stopPropagation);
        L.Control.FuseSearch.prototype._clearPanel.call(this, map);
    }
})

L.control.fuseSearchExtended = function(options) {
    return new L.Control.FuseSearchExtended(options);
};
