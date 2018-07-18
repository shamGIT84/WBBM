function validate_data_grid() {
    var status = true
    var val ;
    var err ;
    var elem;

    //validate select fields
    err = $("#error_text");
    if($("input[name^=chk_select_book_]:checked").length == 0) {
        err.text("At least one book entry must be selected.");
        status = false;
    }
        
    //validate data-grid
    $('div.data-row').each(function() { 
        id = $(this).attr('data-row-id');
        if($('#chk_select_book_' + id).is(':checked')){ //book is selected

            //validate quantity purchased
            elem = $('#txt_quantity_purchased_' + id);
            val  = elem.val();

            if(is_empty(val)) {
                err.text('The quantity purchased field is required.');
                elem.parent().addClass('has-error');
                status = false;
                return false;
            }else if(!is_natural_no_zero(val)) {
                err.text('The quantity purchased field must contain a number greater than zero.');
                elem.parent().addClass("has-error");
                status = false;
                return false;
            }else if(parseInt($('#hddn_quantity_ordered_' + id).val()) < parseInt(val)) { 
                err.text('The quantity purchased field must not be greater than the quantity ordered.');
                elem.parent().addClass('has-error');
                status = false;
                return false;
            }
            //validate price purchased
            elem = $('#txt_price_purchased_' + id);
            val  = elem.val();

            if(is_empty(val)) {
                err.text('The price purchased field is required.');
                elem.parent().addClass('has-error');
                status = false;
                return false;
            } else if(!is_currency_no_zero(val)) {
                err.text('The price purchased field must contain a currency value greater than zero.');
                elem.parent().addClass("has-error");
                status = false;
                return false;
            } else if(parseFloat(val) > max_purchase_price) { 
                err.text('The price purchased field must not be greater than the default max,'+ max_purchase_price +'.');
                elem.parent().addClass('has-error');
                status = false;
                return false;
            }
        }//if	
    });//each
    
    //validate discount
    if(status) {
        elem = $('#txt_discount');
        val  = elem.val();
        if(is_empty(val)) {
            err.text('The discount field is required.');
            elem.parent().addClass('has-error');
            status = false;
        } else if(!is_natural(val)) {
            err.text('The discount field must contain a positive integer.');
            elem.parent().addClass('has-error');
            status = false;
        } else if(parseFloat(val) > max_discount) { 
            err.text('The price purchased field must not be greater than the default max,'+ max_discount +'.');
            elem.parent().addClass('has-error');
            status = false;
            return false;
        }
    }
    return status;
}//end of function

function validate_complete_purchase() {

    //disable button
    btn_disable('#btn_add_purchase');

    var status = true;
    var val ;
    var err ;
    var elem;

    clear_errors();

    //validate invoice field
    val = $("#txt_invoice_no").val()
    err = $("#txt_invoice_no_error");
    if(is_empty(val)) {
        err.text("Teh invoice no. field is required.");
        status = false;
    }

    //validate data grid
    if(status) {
        status = validate_data_grid();
    }

    //validate total amount
    if(status) {
        elem = $('#txt_net_amount');
        err = $("#error_text"); 
        val  = elem.val();
        if( is_empty(val) ){
            err.text('Calcuate the net amount before adding the order.');
            elem.parent().addClass("has-error");
            status = false;
        }
    }
    //add error status for error elements
    change_status();

    //change button status
    if( !status ){
        btn_enable('#btn_add_purchase');
    }

    return status;

}//end of function

//set total amount to zero
function set_zero() {
    $('#txt_total_amount').val('');
    $('#txt_net_amount').val('');
}//end of function

//set total amount and row amount to zero
function set_zero_row(id) {
    $('#txt_amount_' + id).val('');
    $('#txt_total_amount').val('');
    $('#txt_net_amount').val('');
}//end of function

//change the status of the input fields according to the checkbox status
function set_row(obj) {
    var id = $(obj).attr('data-row');
    if(!$('#chk_select_book_' + id).is(':checked')) {//unchecked
        clear_errors();
        $('#txt_quantity_purchased_' + id).val('').attr('disabled','disabled');
        $('#txt_price_purchased_' + id).val('').attr('disabled','disabled');;
    } else {
        $('#txt_quantity_purchased_' + id).val($('#hddn_quantity_ordered_' + id).val()).removeAttr('disabled');
        $('#txt_price_purchased_' + id).val($('#hddn_price_ordered_' + id).val()).removeAttr('disabled');
    }
    set_zero_row(id);
}//end of function

function calculate() {
    
    clear_errors();
    set_zero();
    var total_amount = 0.00;
    if(validate_data_grid()) {
        $('div.data-row').each(function() { 
            var id = $(this).attr('data-row-id');
            if($('#chk_select_book_' + id).is(':checked')){ //book is selected
                var amount = parseFloat($('#txt_price_purchased_' + id).val()) * parseInt($('#txt_quantity_purchased_' + id).val());
                total_amount += amount;
                $('#txt_amount_' + id).val(amount.toFixed(2)); 
            }
        });
        $('#txt_total_amount').val(total_amount.toFixed(2));
        var discount = parseFloat($('#txt_discount').val());
        var net_amount = total_amount - (total_amount * discount /100);
        $('#txt_net_amount').val(net_amount.toFixed(2));
    }
}//end of function

//initialization
$(function() {
    //enable submit button
    $('#btn_complete_purchase').removeAttr('disabled');
});

/*end of file*/