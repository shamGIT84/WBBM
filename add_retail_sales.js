//clear errors, reset hidden values & description
function reset_panel() {
    $('#txt_sku').parent().removeClass('has-error');
    $('#txt_quantity').parent().removeClass('has-error');
    $('span#error_text1').text('');
    $('#hddn_title').val('');
    $('#hddn_cur_stock').val('');
    $('#hddn_list_price').val('');
    $('#hddn_title_discount').val('');
    $('#hddn_price_sold').val('');
    $('#hddn_is_search').val('0');
    $('p#description').text('');
    $('#hddn_book_status').val('');
}//end of function

//clear top panel
function clear_panel() {
    reset_panel();
    $('#txt_quantity').val('');
    $('#txt_sku').val('').focus();
}//end of function

//get book details via AJAX
function get_book() {
    reset_panel();
    var status = true;
    var err    = $('span#error_text1');
    
    
    //validate sku
    var elem = $('#txt_sku')
    var val = elem.val();
    if(is_empty(val)) {
        err.text('SKU is required.');
        elem.parent().addClass('has-error');
        status = false;
    } else if(!is_natural_no_zero(val)) {
        err.text('SKU must be a number greater than zero.');
        elem.parent().addClass('has-error');
        status = false;
    }
    
    if(status) { //sku is in correct format, retrieve data
        var dest_url =  base_url + "/" + val ;
        $.ajax({
            url: dest_url,
            dataType: 'json',
            success : function(data){
                if(data == 'not-exist') {
                    err.text('SKU does not exist.');
                } else {
                    $('p#description').text(data['description']);
                    $('#hddn_title').val(data['title']);
                    $('#hddn_book_status').val(data['book_status']);
                    $('#hddn_list_price').val(data['list_price']);
                    $('#hddn_discount').val(data['discount']);
                    $('#hddn_price_sold').val(data['price_sold']);
                    $('#hddn_is_search').val('1');
                    
                    //calculate cur_stock
                    var cur_stock = data['cur_stock'];
                    if($('tr#' + val).length) {
                        cur_stock -= parseInt($('#hddn_quantity_sold_' + val).val());
                    }
                    $('#hddn_cur_stock').val(cur_stock);
                }
            },
            error : function() {
                       err.text('Error in procee. Try again');
                    }
        });//end of ajax function
        
    } 
}//end of function

function add_book() {
    var status = true;
    var elem ;
    var val;
    var err    = $('span#error_text1');
    
    clear_errors();
    
    //to clean-out previous errors if any
    $('#txt_sku').parent().removeClass('has-error');
    $('#txt_quantity').parent().removeClass('has-error');
    $('span#error_text1').text('');
    
    //validate is search
    val = $('#hddn_is_search').val();
    if(val == '0'){
        status = false;
        err.text('Please Search before add');
    } else { //check quantity
        elem = $('#txt_quantity');
        val  = elem.val();
        if(is_empty(val)) {
            err.text('quantity is required.');
            elem.parent().addClass('has-error');
            status = false;
        } else if(!is_natural_no_zero(val)) {
            err.text('quantity must be a number greater than zero.');
            elem.parent().addClass('has-error');
            status = false;
        } else if(parseInt(val) > parseInt($('#hddn_cur_stock').val())) {
            err.text('quantity must be equal or greater than current stock ' + $('#hddn_cur_stock').val() + '.');
            elem.parent().addClass('has-error');
            status = false;
        }
    }
    
    if(status) { //add to sales
        var id       = $('#txt_sku').val();
        var quantity = parseInt($('#txt_quantity').val());
        var amount   = parseFloat($('#hddn_price_sold').val()) * quantity;
        
        //update total amount
        $('#txt_total_amount').val((amount + parseFloat($('#txt_total_amount').val())).toFixed(2));
        //reset net amount and balance
        $('#txt_net_amount').val('0.00');
        $('#txt_balance').val('0.00');
        
        if($('tr#' + id).length) { //existing one - update
            quantity += parseInt($('#hddn_quantity_sold_' + id).val()); 
            amount   += parseFloat($('#hddn_amount_' + id).val());
            $('#hddn_quantity_sold_' + id).val(quantity);
            $('#quantity_' + id).text(quantity);
            $('#hddn_amount_' + id).val(amount);
            $('#amount_' + id).text(amount.toFixed(2));
        
        } else { //non-existing one - add
            
            var title       = $('#hddn_title').val();
            var list_price  = $('#hddn_list_price').val();
            var discount    = $('#hddn_discount').val();
            var book_status = $('#hddn_book_status').val();
            
            var html = "<tr id='" + id + "'>\n\
                            <td>\n\
                                <div class='form-group'>\n\
                                    <div class='col-sm-12' >" ;
                                        if(book_status == '1') {
                                            html += "<p class='form-control-static'>" + id + "</p>";
                                        } else {
                                            html += "<p class='form-control-static text-danger'>" + id + "</p>";
                                        }
                html +=                "<input type='hidden' name='hddn_sales_sku_" + id + "' value='" + id + "' />\n\
                                    </div>\n\
                                </div>\n\
                            </td>\n\
                            <td>\n\
                                <div class='form-group'>\n\
                                    <div class='col-sm-12' >\n\
                                        <p class='form-control-static'>" + title + "</p>\n\
                                    </div>\n\
                                </div>\n\
                            </td>\n\
                            <td>\n\
                                <div class='form-group'>\n\
                                    <div class='col-sm-12 text-right'>\n\
                                        <p class='form-control-static'>" + list_price + "</p>\n\
                                        <input type='hidden' name='hddn_list_price_" + id + "' value='" + list_price + "' />\n\
                                    </div>\n\
                                </div>\n\
                            </td>\n\
                            <td>\n\
                                <div class='form-group'>\n\
                                    <div class='col-sm-12 text-right'>\n\
                                        <p class='form-control-static'>" + discount + "</p>\n\
                                        <input type='hidden' name='hddn_discount_" + id + "' value='" + discount + "' />\n\
                                    </div>\n\
                                </div>\n\
                            </td>\n\
                            <td>\n\
                                <div class='form-group'>\n\
                                    <div class='col-sm-12 text-right'>\n\
                                        <p class='form-control-static' id='quantity_" + id + "' >" + quantity + "</p>\n\
                                        <input type='hidden' id='hddn_quantity_sold_" + id + "' name='hddn_quantity_sold_" + id + "' value='" + quantity + "' />\n\
                                    </div>\n\
                                </div>\n\
                            </td>\n\
                            <td>\n\
                                <div class='form-group'>\n\
                                    <div class='col-sm-12 text-right'>\n\
                                        <p class='form-control-static' id='amount_" + id + "' >" + amount.toFixed(2) + "</p>\n\
                                        <input type='hidden' id='hddn_amount_" + id + "' value='" + amount + "' />\n\
                                    </div>\n\
                                </div>\n\
                            </td>\n\
                            <td>\n\
                                <div class='form-group'>\n\
                                    <div class='col-sm-12 text-right'>\n\
                                        <button type='button' class='btn btn-danger btn-xs' data-toggle='tooltip' data-placement='bottom' title='cancel book' onclick='remove_book(\"" + id + "\")'><span class='glyphicon glyphicon-minus'></button>\n\
                                    </div>\n\
                                </div>\n\
                            </td>\n\
                        </tr>";
                $('tbody#data-grid').append(html);
        }
        clear_panel();
    }
}//end of function

function remove_book(row_id) {
    clear_errors();
    //update total amount
    var amount = $('#hddn_amount_' + row_id).val();
    $('#txt_total_amount').val((parseFloat($('#txt_total_amount').val()) - amount).toFixed(2));
    //reset net amount and balance
    $('#txt_net_amount').val('0.00');
    $('#txt_balance').val('0.00');
    
    //remove the row
    $('tr#' + row_id).remove(); 
   
}

//clear data-grid when clear all the inputs.
function remove_all_books() {
    $('tbody#data-grid').empty();
    $('#txt_sku').focus();
}//end of function

//for calculate button
function calculate() {
    var status = true;
    var err = $('#error_text2');
    var net_amount = 0.00;
    var balance    = 0.00;
    var total_amount = parseFloat($('#txt_total_amount').val())
    var elem_discount= $('#txt_discount');
    var discount     = elem_discount.val();
    var elem_payment = $('#txt_payment');
    var payment      = elem_payment.val();
    
    clear_errors();
    
    //validate total amount and discount
    if(total_amount == 0.00) {
        status = false;
        err.text('At least one sales must be added.');
    } else if(is_empty(discount)) { 
        status = false;
        err.text('The discount field is required.');
        elem_discount.parent().addClass('has-error');
    } else if(!is_natural(discount)) {
        status = false;
        err.text('The discount field must contain a positive integer.');
        elem_discount.parent().addClass('has-error');
    } else if(parseInt(discount) > max_discount) {
        status = false;
        err.text('The discount field must not be greater than default max,' + max_discount + '.');
        elem_discount.parent().addClass('has-error');
    }
    
    //clauclate net-amount if total amount & discount are valid.
    if(status) {
        net_amount = total_amount - (total_amount * discount / 100);
    }
    
    //validate payment
    if(status) {
        if(is_empty(payment)) { 
            status = false;
            err.text('The payment field is required.');
            elem_payment.parent().addClass('has-error');
        } else if(!is_currency_no_zero(payment)) {
            status = false;
            err.text('The payment field must contain a currency value greater than zero.');
            elem_payment.parent().addClass('has-error');
        } else if(parseFloat(payment) < net_amount) { 
            status = false;
            err.text('The payment field must not be less than net-amount.');
            elem_payment.parent().addClass('has-error');
        }
    }
    //calulate balance
    if(status) {
        balance = parseFloat(payment) - net_amount;
    }
    
    //assign values
    $('#txt_net_amount').val(net_amount.toFixed(2));
    $('#txt_balance').val(balance.toFixed(2));

    return status;
}//end of function

function validate_add_sales() {
    return calculate();
}//end of function

//initilize
$(function() {
    $('#btn_add_sales').removeAttr('disabled');
});

/*end of file*/


