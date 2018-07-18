function validate_add_book() {
    //disable button
    btn_disable('#btn_add_book');

    var status = true;
    var val ;
    var err ;

    clear_errors();	

    // validate ISBN field
    val = $('#txt_isbn').val();
    err = $('#txt_isbn_error');
    if(is_empty(val)) {
        err.text('The ISBN field is required.');
        status = false;
    }else if(!is_isbn(val)) {
        err.text('The ISBN field must contain 10 or 13 digits number.');
        status = false;
    }

    // validate title field
    val = $('#txt_title').val();
    err = $('#txt_title_error');
    if(is_empty(val)) {
        err.text('The book title field is required.');
        status = false;
    }

    // validate author field
    val = $('#txt_author').val();
    err = $('#txt_author_error');
    if(is_empty(val)) {
        err.text('The author field is required.');
        status = false;
    }

    // validate publisher field
    val = $('#txt_publisher').val();
    err = $('#txt_publisher_error');
    if(is_empty(val)) {
        err.text('The publisher field is required.');
        status = false;
    }

    // validate category field
    val = $('#lst_category').val();
    err = $('#lst_category_error');
    if(is_empty(val)) {
        err.text('The category field is required.');
        status = false;
    }

    // validate agent field
    val = $('#lst_agent').val();
    err = $('#lst_agent_error');
    if(is_empty(val)) {
        err.text('The agent field is required.');
        status = false;
    }

    // validate min-stock field
    val = $('#txt_min_stock').val();
    err = $('#txt_min_stock_error');
    if(is_empty(val)) {
        err.text('The min-stock field is required.');
        status = false;
    } else if(is_negative(val) || !is_integer(val)) {
        err.text('The min-stock field must contain a non-negative integer.');
        status = false;
    }

    // validate max-stock field
    val = $('#txt_max_stock').val();
    err = $('#txt_max_stock_error');
    if(is_empty(val)) {
        err.text('The max-stock field is required.');
        status = false;
    } else if(is_negative(val) || !is_integer(val)) {
        err.text('The max-stock field must contain a non-negative integer.');
        status = false;
    } else if(parseInt(val) > max_stock) {
        err.text('The max-stock field must not be grater than default-max-value,' + max_stock + '.');
        status = false;
    } else if(parseInt(val) < parseInt($('#txt_min_stock').val())) {
        err.text('The max-stock field must not be less than min-stock.');
        status = false;
    }

    // validate purchase price field
    val = $('#txt_purchase_price').val();
    err = $('#txt_purchase_price_error');
    if(is_empty(val)) {
        err.text('The purchase price field is required.');
        status = false;
    } else if(!is_currency(val)) {
        err.text('The purchase price field must contain a currency value.');
        status = false;
    } else if(parseFloat(val) > max_pur_price) {
        err.text('The purchase price field must not be greater than defualt-max-value,' + max_pur_price + '.');
        status = false;
    }

    // validate list price field
    val = $('#txt_list_price').val();
    err = $('#txt_list_price_error');
    if(is_empty(val)) {
        err.text('The list price field is required.');
        status = false;
    } else if(!is_currency(val)) {
        err.text('The list price field must contain a currency value.');
        status = false;
    } else if(parseFloat(val) > max_lst_price) {
        err.text('The list price field must not be greater than defualt-max-value,' + max_lst_price + '.');
        status = false;
    }

    // validate discount field
    val = $('#txt_discount').val();
    err = $('#txt_discount_error');
    if(is_empty(val)) {
        err.text('The discount field is required.');
        status = false;
    } else if(is_negative(val) || !is_integer(val)) {
        err.text('The discount field must contain a non-negative integer.');
        status = false;
    } else if(parseInt(val) > max_discount) {
        err.text('The discount field must not be grater than default-max-value,' + max_discount + '.');
        status = false;
    }

    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_add_book');
    }

    return status;
			
}//end of function

//initialize submit button
$(function() {
    $('#btn_add_book').removeAttr('disabled');
});
/*end of file*/