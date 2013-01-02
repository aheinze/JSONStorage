;(function(win, ls){

    win.Storage = {
        "select": function(name){
            return (new Storage(name));
        }
    };

    function Storage(name){

        this.name = name;
        this._data();
    };

    Storage.prototype._store = function(key){
        ls.setItem("storage-"+this.name,  JSON.stringify(this.data));
    };

    Storage.prototype._data = function(key){
        this.data = JSON.parse(ls.getItem("storage-"+this.name) || '{}');
    };

    Storage.prototype.get = function(key, def){
        return this.data[key] !== undefined ? this.data[key] : def;
    };

    Storage.prototype.set = function(key, value){
        this.data[key] = value;
        this._store();
    };

    Storage.prototype.exists = function(key){
        return this.get(key, "___no___") !== "___no___";
    };

    Storage.prototype.del = function(){
        
        var keys = arguments,
            key  = null;

        for (var i=0;i<keys.length;i++){

            key = keys[i];

            if(this.exists(key)){
                delete this.data[key];
                this._store();
            }
        }
    };

    Storage.prototype.type = function(key){
        
        var key = this.get(key);

        if(typeof(key) === 'object'){
            return JSON.stringify(key)[0] === "[" ? "list":"set";
        }

        return typeof(key);
    };

    Storage.prototype.append = function(key, value){
        var value   = String(value),
            current = String(this.get(key, "")),
            newone  = current+value;

        this.set(key, newone);

        return newone.length;
    };

    Storage.prototype.incr = function(key, by){
        var by      = by || 1,
            current = Number(this.get(key, 0)),
            newone  = current+by;

        this.set(key, newone);

        return newone;
    };

    Storage.prototype.decr = function(key, by){
        var by = by || 1;
        return this.incr(key, (by * -1));
    };

    Storage.prototype.lpush = function(key, value){
        var list = this.get(key, []),
            ret  = list.unshift(value);

        this.set(key, list);
        return ret;
    };

    Storage.prototype.rpush = function(key, value){
        var list = this.get(key, []),
            ret  = list.push(value);

        this.set(key, list);
        return ret;
    };

    Storage.prototype.lset = function(key, index, value){
        var list = this.get(key, []);

        if(index < 0) {
            index = list.length - Math.abs(index); 
        }

        if (list[index]) {
            list[index] = value;
            this.set(key, list);
            return true;
        }

        return false;
    };

    Storage.prototype.lindex = function(key, index){
        var list = this.get(key, []);

        if (index < 0) {
            index = list.length - Math.abs(index); 
        }

        return list[index] ? list[index] : null;
    };

})(window, localStorage);