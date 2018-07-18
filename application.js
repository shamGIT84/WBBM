/*
+--------------------------------------------------------------------------
|	Web-based Bookstore Management for Wisdom Bookshop 
|	File: 		application.js
|	Content:	Application-wide javascript definitions
+--------------------------------------------------------------------------
*/

/* search area validation */
function validate_search() {
    var val = $('#txt_value').val().trim();
    if(val.length == 0) {
        $('#search_error_text').removeAttr('style');
        $('#search_error_text').text('Search value is required.');
        $('#txt_value').val('');

        setInterval(function() { 
            $('#search_error_text').fadeOut(1000, function() {
                $('#search_error_text').text('');
            });  
        }, 10000);

        return false;
    } else {
        return true;
    }
}//end of function
	
	
/* notification autohide */
function notification_autohide() {
    var timeout_id;
    timeout_id = setTimeout(function() { 
        $('.wbbm-alert-autohide').slideUp(1000, function() {
            $('.wbbm-alert-autohide').empty();
        });  
    }, 5000);
    $('.wbbm-alert-autohide').mouseover(function() {
            clearTimeout(timeout_id);
        });
    $('.wbbm-alert-autohide').mouseout(function(){
        timeout_id = setTimeout(function() { 
        $('.wbbm-alert-autohide').slideUp(1000, function() {
            $('.wbbm-alert-autohide').empty();
        });  
    }, 5000);
    });
}//end of function
$(function() {
   notification_autohide();
});
	
/* initialize tooltips */
$(function(){
        $('.btn').tooltip();
});
	
//----- set url for message dialogs -----
function show_message(obj) {
    var url  = $(obj).attr('data-url');
    var elem = $(obj).attr('data-target') + ' a' ;
    $(elem).attr('href', url);
}       

/* Button enabling and diasbling*/
function btn_enable(btn) {
    $(btn).removeAttr('disabled');
}//end of function

function btn_disable(btn) {
    $(btn).attr('disabled','disabled');
}//end of function
	
/*end of file*/