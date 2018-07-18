function validate_edit_user() {
    //disable button
    btn_disable('#btn_edit_user');

    var status = true;
    var val ;
    var err ;

    clear_errors();
    
    // validate new email field
    val = $('#txt_email').val();
    err = $('#txt_email_error');
    if(is_empty(val)) {
        err.text('The new email field is required.');
        status = false;
    }else if(!is_email(val)) {
        err.text('The new email field must contain a valid email.');
        status = false;
    }

    // validate new designation field
    val = $("#txt_designation").val();
    err = $("#txt_designation_error");
    if(is_empty(val)) {
        err.text("The new designation field is required.");
        status = false;
    }

    // validate user role field
    val = $('#lst_user_role').val();
    err = $('#lst_user_role_error');
    if(is_empty(val)) {
        err.text('The new user role field is required.');
        status = false;
    }

    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_edit_user');
    }

    return status;
			
}//end of function

//initialize submit button
$(function() {
    $('#btn_edit_user').removeAttr('disabled');
});

/*end of file*/