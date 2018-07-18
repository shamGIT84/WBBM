function validate_edit_agent() {
    //disable button
    btn_disable('#btn_edit_agent');

    var status = true;
    var val ;
    var err ;

    clear_errors();	

    // validate agent contact field
    val = $('#txt_contact').val();
    err = $('#txt_contact_error');
    if(is_empty(val)) {
        err.text('The contact field is required.');
        status = false;
    }

    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_edit_agent');
    }

    return status;
			
}//end of function

//initialize submit button
$(function() {
    $('#btn_edit_agent').removeAttr('disabled');
});

/*end of file*/