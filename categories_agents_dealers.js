function validate_add_category() {
    //disable button
    btn_disable('#btn_add_category');

    var status = true;
    var val ;
    var err ;

    clear_errors();	

    // validate category name field
    val = $('#txt_category_name').val();
    err = $('#txt_category_name_error');
    if(is_empty(val)) {
        err.text('The category name field is required.');
        status = false;
    }

    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_add_category');
    }

    return status;
			
}//end of function

function validate_add_agent() {
    //disable button
    btn_disable('#btn_add_agent');

    var status = true;
    var val ;
    var err ;

    clear_errors();	

    // validate agent name field
    val = $('#txt_agent_name').val();
    err = $('#txt_agent_name_error');
    if(is_empty(val)) {
        err.text('The agent name field is required.');
        status = false;
    }
    // validate agent contact field
    val = $('#txt_agent_contact').val();
    err = $('#txt_agent_contact_error');
    if(is_empty(val)) {
        err.text('The contact field is required.');
        status = false;
    }

    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_add_agent');
    }

    return status;
			
}//end of function

function validate_add_dealer() {
    //disable button
    btn_disable('#btn_add_dealer');

    var status = true;
    var val ;
    var err ;

    clear_errors();	

    // validate dealer name field
    val = $('#txt_dealer_name').val();
    err = $('#txt_dealer_name_error');
    if(is_empty(val)) {
        err.text('The dealer name field is required.');
        status = false;
    }
    // validate agent contact field
    val = $('#txt_dealer_contact').val();
    err = $('#txt_dealer_contact_error');
    if(is_empty(val)) {
        err.text('The contact field is required.');
        status = false;
    }

    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_add_dealer');
    }

    return status;
			
}//end of function

//initialize submit button
$(function() {
    $('#btn_add_category').removeAttr('disabled');
    $('#btn_add_agent').removeAttr('disabled');
    $('#btn_add_dealer').removeAttr('disabled');
});

/*end of file*/