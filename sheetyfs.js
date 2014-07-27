
SheetyFS = (function(){
    SheetyFS = {};
    SheetyFS.index = {};
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
                for (i = 0; i < data.feed.entry.length; i++){
                    user = data.feed.entry[i].content.$t.split(',');
                    that.index[user[0]] = user[1];
                }

            },
            async: false,
        });

    };

    SheetyFS.getRow = function(){
        lol = [];
        $.ajax({
            dataType: "json",
            url: "https://spreadsheets.google.com/feeds/cells/"+this.key+"/od6/public/values?alt=json&min-row="+this.index[this.uname]+"&max-row="+this.index[this.uname],
            success: function(data){
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
