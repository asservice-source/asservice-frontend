(function(window) { // Begin scoping function

    window.messageBox = {};
    window.messageBox = {
               
        response: function(conf){
            window.messageBox.callback(conf);
        }
        , callback: function(result){}
        , init: function(template){
            if($('#message-box-container').length<=0){
                $('body').append('<div id="message-box-container"></div>');
                
            } 
            
            $('#message-box-container').html(template);
            $('#message-box-container>.modal').modal();
            $('.message-box').on('hidden.bs.modal', function (e) {
                $('body').addClass('modal-open');
            });
        }
        ,alert: function(title, message, callback){
            if(callback){
                this.callback = callback;
            }else{
                this.callback = function(result){}
            }
            var html = '<div class="modal fade message-box" id="message-box-alert" data-backdrop="false" data-keyboard="false" tabindex="-1" role="dialog">';
            html += '<div class="modal-dialog" role="document">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<h4 class="modal-title">' + title + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += '<p>' + message + '</p>';
            html += '</div>';
            html += '<div class="modal-footer">';
            html += '<button type="button" class="btn btn-primary" data-dismiss="modal" onClick="window.messageBox.response(true);">ตกลง</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            this.init(html);
        }
        ,confirm: function(title, message, callback){
            if(callback){
                this.callback = callback;
            }else{
                this.callback = function(result){}
            }
            var html = '<div class="modal fade message-box" id="message-box-confirm" data-backdrop="false" data-keyboard="false" tabindex="-1" role="dialog">';
            html += '<div class="modal-dialog" role="document">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<h4 class="modal-title">' + title + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += '<p>' + message + '</p>';
            html += '</div>';
            html += '<div class="modal-footer">';
            html += '<button type="button" class="btn btn-primary" data-dismiss="modal" onClick="window.messageBox.response(false);">ไม่ใช่</button>';
            html += '<button type="button" class="btn btn-primary" data-dismiss="modal" onClick="window.messageBox.response(true);">ใช่</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            this.init(html);
        }
    }   
            
})(window);

    


