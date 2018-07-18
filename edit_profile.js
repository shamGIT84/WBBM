function validate_edit_profile() {
    //disable button
    btn_disable('#btn_edit_profile');

    var status = true;
    
    clear_errors();	

    // validate passwords
    var cur_psw 	= $('#psw_current_password').val();
    var err_cur_psw 	= $('#psw_current_password_error');
    var new_psw 	= $('#psw_new_password').val();
    var err_new_psw 	= $('#psw_new_password_error');
    var retype_psw 	= $('#psw_retype_password').val();
    var err_retype_psw 	= $('#psw_retype_password_error');

    if(is_empty(cur_psw)) { //validate current password
        err_cur_psw.text('The current password field is required.');
        status = false;
    }
    
    if(is_empty(new_psw)) { //validate new password
        err_new_psw.text('The new password field is required.');
        status = false;
    }
    
    if(is_empty(retype_psw)) { //validate retype password
        err_retype_psw.text('The retype password field is required.');
        status = false;
    }
    
    if(status && new_psw != retype_psw) { //validate password match
        err_retype_psw.text('The passwords are mismatched.');
        status = false;
    } 	
 
    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_edit_profile');
    }

    return status;

}//end of function

//initialize
$(function() {
    $('#btn_edit_profile').removeAttr('disabled');
});

/*end of file*/