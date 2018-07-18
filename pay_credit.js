function validate_pay_credit() {
    //disable button
    btn_disable('#btn_pay_credit');

    var status = true;
    var val ;
    var err ;

    clear_errors();	

    // validate amount paid field
    val = $('#txt_amount_paid').val();
    err = $('#txt_amount_paid_error');
    if(is_empty(val)) {
        err.text('The amount paid field is required.');
        status = false;
    } else if(!is_currency_no_zero(val)) {
        err.text('The amount field must contain a currency value greater than zero.');
        status = false;
    } else if(parseFloat(val) > parseFloat($('#hddn_credit_amount').val())) {
       err.text('The amount field must be equal or less than credit amount.');
       status = false; 
    }

    // validate cheque_no field
    val = $('#txt_cheque_no').val();
    err = $('#txt_cheque_no_error');
    if(!is_empty(val) && !is_cheque(val)) {
        err.text('The cheque no. field must contain six digits.');
        status = false;
    }

    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_pay_credit');
    }

    return status;
			
}//end of function

//initialize submit button
$(function() {
    $('#btn_pay_credit').removeAttr('disabled');
});

/*end of file*/