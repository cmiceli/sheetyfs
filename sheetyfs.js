
SheetyFS = (function(){
    SheetyFS = {};
    SheetyFS.index = undefined;
    SheetyFS.key = "";
    SheetyFS.uname = "";

    SheetyFS.setup = function(uname, key){
        this.uname = uname;
        this.key = key; 
    };

    SheetyFS.getIndex = function(){
        var that = this;
        $.ajax({
            dataType:"json",
            url: "https://spreadsheets.google.com/feeds/cells/"+this.key+"/od6/public/values?alt=json&min-row=1&max-row=1",
            success: function(data){
                that.index = {};
                for (i = 0; i < data.feed.entry.length; i++){
                    user = data.feed.entry[i].content.$t.split(',');
                    that.index[user[0]] = user[1];
                }

            },
            async: false,
        });

    };

    SheetyFS.getRow = function(min, max){
        var that = this;
        if (that.index === undefined) {
            that.getIndex();
        }
        lol = [];
        url = "https://spreadsheets.google.com/feeds/cells/"+this.key+"/od6/public/values?alt=json&min-row="+this.index[this.uname]+"&max-row="+this.index[this.uname];
        if (min !== undefined){
            url = url+"&min-col="+min;
        }
        if (max !== undefined){
            url = url+"&max-col="+max;
        }
        $.ajax({
            dataType: "json",
            url: url,
            success: function(data){
                if (data.feed.entry === undefined) {
                    return;
                }
                for (i = 0; i < data.feed.entry.length; i++){
                    lol.push(data.feed.entry[i].content.$t);
                }
            },
            async: false,
        });
        return lol;
    };

    return SheetyFS;
})();
