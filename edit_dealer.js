function validate_edit_dealer() {
    //disable button
    btn_disable('#btn_edit_dealer');

    var status = true;
    var val ;
    var err ;

    clear_errors();	

    // validate dealer contact field
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
        btn_enable('#btn_edit_dealer');
    }

    return status;
			
}//end of function

//initialize submit button
$(function() {
    $('#btn_edit_dealer').removeAttr('disabled');
});

/*end of file*/