function validate_add_requisition() {
    //disable button
    btn_disable('#btn_add_requisition');

    var status = true;
    var val ;
    var err ;

    clear_errors();	

    // validate note field
    val = $('#txt_note').val();
    err = $('#txt_note_error');
    if(is_empty(val)) {
        err.text('The note field is required.');
        status = false;
    }

    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_add_requisition');
    }

    return status;
			
}//end of function

//initialize submit button
$(function() {
    $('#btn_add_requisition').removeAttr('disabled');
});

/*end of file*/