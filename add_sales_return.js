function validate_add_sales_return() {

    //disable button
    btn_disable('#btn_add_sales_return');

    var status = true;
    var val ;
    var err = $('#error_text');
    var elem;

    clear_errors();

    //validate select fields
    if($("input[name^=chk_select_book_]:checked").length == 0) {
        err.text("At least one book entry must be selected or no book eligible for return.");
        status = false;
    }
    
    //validate data-grid
    if(status) {
        $('div.data-row').each(function(){ 
            id = $(this).attr('data-row-id');
            if($('#chk_select_book_' + id).is(':checked')){ //book is selected

                //validate quantity returned
                elem = $('#txt_quantity_returned_' + id);
                val  = elem.val();
                
                if(is_empty(val)) {
                    err.text('The quantity returned field is required.');
                    elem.parent().addClass('has-error');
                    status = false;
                    return false;
                }else if(!is_natural_no_zero(val)) {
                    err.text('The quantity returned field must contain a number greater than zero.');
                    elem.parent().addClass("has-error");
                    status = false;
                    return false;
                }else if(parseInt($('#hddn_max_returnable_' + id).val()) < parseInt(val)) { 
                    err.text('The quantity returned field must not be greater than the quantity allowed.');
                    elem.parent().addClass('has-error');
                    status = false;
                    return false;
                }
                
                if(status) {
                    //validate price purchased
                    elem = $('#txt_quantity_given_' + id);
                    val  = elem.val();

                    if(is_empty(val)) {
                        err.text('The quantity given field is required.');
                        elem.parent().addClass('has-error');
                        status = false;
                        return false;
                    } else if(!is_natural(val)) {
                        err.text('The quantity given field must contain a positive integer.');
                        elem.parent().addClass("has-error");
                        status = false;
                        return false;
                    } else if(parseInt($('#txt_quantity_returned_' + id).val()) < parseInt(val)) { 
                        err.text('The quantity given field must not be greater than the quantity returned.');
                        elem.parent().addClass('has-error');
                        status = false;
                        return false;
                    } else if(parseInt($('#hddn_max_allowed_stock_' + id).val()) < parseInt(val)) { 
                        err.text('The quantity given field must not be greater than the allowed stock.');
                        elem.parent().addClass('has-error');
                        status = false;
                        return false;
                    }
                } // if - validate quantity-given
                
            }//if	
        });//each
    } //outer if
    
    //add error status for error elements
    change_status();

    //change button status
    if( !status ){
        btn_enable('#btn_add_sales_return');
    }

    return status;

}//end of function

//change the status of the input fields according to the checkbox status
function set_row(obj) {
    var id = $(obj).attr('data-row');
    if(!$('#chk_select_book_' + id).is(':checked')) {//unchecked
        clear_errors();
        $('#txt_quantity_returned_' + id).val('').attr('disabled','disabled');
        $('#txt_quantity_given_' + id).val('0').attr('disabled','disabled');;
    } else {
        $('#txt_quantity_returned_' + id).removeAttr('disabled');
        $('#txt_quantity_given_' + id).removeAttr('disabled');
    }
    
}//end of function

//disable all rows when clear all
function disable_rows() {
    $('input[name^=txt_quantity_returned_]').attr('disabled','disabled');
    $('input[name^=txt_quantity_given_]').attr('disabled','disabled');;
}

//initialization
$(function() {
    //enable submit button
    $('#btn_add_sales_return').removeAttr('disabled');
});

/*end of file*/