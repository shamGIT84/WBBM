function validate_add_user() {
    //disable button
    btn_disable('#btn_add_user');

    var status = true;
    var val ;
    var err ;

    clear_errors();	

    // validate NIC field
    val = $('#txt_nic').val();
    err = $('#txt_nic_error');
    if(is_empty(val)) {
        err.text('The NIC No. field is required.');
        status = false;
    }else if(!is_nic(val)) {
        err.text('The NIC No. field must contain a valid NIC number.');
        status = false;
    }

    // validate first name field
    val = $('#txt_first_name').val();
    err = $('#txt_first_name_error');
    if(is_empty(val)) {
        err.text('The first name field is required.');
        status = false;
    }

    // validate last name field
    val = $('#txt_last_name').val();
    err = $('#txt_last_name_error');
    if(is_empty(val)) {
        err.text('The last name field is required.');
        status = false;
    }
    
    // validate email field
    val = $('#txt_email').val();
    err = $('#txt_email_error');
    if(is_empty(val)) {
        err.text('The email field is required.');
        status = false;
    }else if(!is_email(val)) {
        err.text('The email field must contain a valid email.');
        status = false;
    }

    // validate designation field
    val = $('#txt_designation').val();
    err = $('#txt_designation_error');
    if(is_empty(val)) {
        err.text('The designation field is required.');
        status = false;
    }

    // validate user role field
    val = $('#lst_user_role').val();
    err = $('#lst_user_role_error');
    if(is_empty(val)) {
        err.text('The user role field is required.');
        status = false;
    }

    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_add_user');
    }

    return status;
			
}//end of function

//initialize submit button
$(function() {
    $('#btn_add_user').removeAttr('disabled');
});

/*end of file*/