var labelManage = (function(){
    return {
        loadLabel: function(){
            $.getJSON( "../assets/languages.json", function( data ) {
                labelsConfig = data; 
                console.log("=== Load Labels Config ===");
                console.log(labelsConfig);
              });
        },
        getLabel: function(key, lang){
            if(labelsConfig==undefined){
                this.loadLabel();
              }else{
                lang = (lang==undefined?'th':lang);
                return labelsConfig[key][lang];
              }
        },
        initLables: function(target){
            setTimeout(function(){ 
            var $labels;
            if(target==undefined){
                $labels = $('label[label]');
            }else{
                $labels = $(target + ' label[label]');
            }
              $.each($labels, function(){
                var keyLBL = $(this).attr('label');
                console.log(keyLBL);
                $(this).text(labelManage.getLabel(keyLBL));
              });
          
             }, 150);
        }
    }
})(labelManage||{})
labelManage.loadLabel()