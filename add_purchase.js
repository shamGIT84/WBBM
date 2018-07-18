function validate_data_grid() {
    var status = true
    var val ;
    var err ;
    var elem;

    //validate select fields
    err = $("#error_text");
    if($("input[name^=chk_select_book_]:checked").length == 0) {
        err.text("At least one book must be selected to order.");
        status = false;
    }
        
    //validate data-grid
    $('div.data-row').each(function(){ 
        id = $(this).attr('data-row-id');
        if($('#chk_select_book_' + id).is(':checked')){ //book is selected

            //validate quantity ordered
            elem = $('#txt_quantity_ordered_' + id);
            val  = elem.val();

            if(is_empty(val)) {
                err.text('The quantity ordered field is required.');
                elem.parent().addClass('has-error');
                status = false;
                return false;
            } else if(!is_natural_no_zero(val)) {
                err.text('The quantity ordered field must contain a number greater than zero.');
                elem.parent().addClass("has-error");
                status = false;
                return false;
            } else if(parseInt($('#hddn_max_allowed_stock_' + id).val()) < parseInt(val)) { 
                err.text('The quantity allowed field must not be greater than max allowed quantity.');
                elem.parent().addClass('has-error');
                status = false;
                return false;
            }
        }//if	
    });//each
    return status;
}//end of function

function validate_add_purchase() {

    //disable button
    btn_disable('#btn_add_purchase');

    var status = true;
    var val ;
    var err ;
    var elem;

    clear_errors();

    //validate agent field
    val = $("#lst_agent_id").val()
    err = $("#lst_agent_id_error");
    if(is_empty(val)) {
        err.text("Agent field is required.");
        status = false;
    }

    //validate data grid
    if(status) {
        status = validate_data_grid();
    }

    //validate total amount
    if(status) {
        elem = $('#txt_total_amount');
        err = $("#error_text"); 
        val  = elem.val();
        if( is_empty(val) ){
            err.text('Calcuate the total amount before adding the order');
            elem.parent().addClass("has-error");
            status = false;
        }
    }
    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_add_purchase');
    }

    return status;

}//end of function

//set total amount to zero
function set_zero() {
    $('#txt_total_amount').val('');
}//end of function

//set total amount and row amount to zero
function set_zero_row(id) {
    $('#txt_amount_' + id).val('');
    $('#txt_total_amount').val('');
}//end of function

//change the status of the input fields according to the checkbox status
function set_row(obj) {
    var id = $(obj).attr('data-row');
    if(!$('#chk_select_book_' + id).is(':checked')) {//unchecked
        clear_errors();
        $('#txt_quantity_ordered_' + id).val('').attr('disabled','disabled');
        $('#txt_amount_' + id).val('');
    } else {
        $('#txt_quantity_ordered_' + id).removeAttr('disabled');
    }
    set_zero();
}//end of function

function add_default_text() {
    var html="<tr><td colspan='9' align='center'><br/>Select the Agent.</td></tr>";
    $('tbody#data-grid').html(html);
}//end of function

function populate_data_grid(obj) {
    var agent_id = $(obj).val();
    
    if(is_empty(agent_id)) { //agent hasn't selected
        add_default_text();
    } else {
        //waiting text untill data retrieve and populated
        var html="<tr><td colspan='9' align='center'><br/>Loading........</td></tr>";
        $('tbody#data-grid').html(html);
        
        var dest_url =  base_url + "/" + agent_id ;
        $.ajax({
            url: dest_url,
            dataType: 'json',
            success : function(data){
                        if( data.length > 0 ){
                            var html = '';
                            for(i=0;i<data.length;i++){
                                var id = data[i]['sku'];
                                
                                html  +="<tr>\n\
                                            <td class='text-center'>\n\
                                                <div class='form-group form-group-sm data-row' data-row-id='" + id + "' >\n\
                                                    <div class='col-sm-7 text-center' >\n\
                                                        <input type='checkbox' id='chk_select_book_" + id + "' name='chk_select_book_" + id + "' data-row='" + id + "' value='" + id + "' class='form-control'  onclick='set_row(this)' />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                            <td>\n\
                                                <div class='form-group'>\n\
                                                    <div class='col-sm-12' >\n\
                                                        <p class='form-control-static'>" + data[i]['sku'] + "</p>\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                            <td>\n\
                                                <div class='form-group'>\n\
                                                    <div class='col-sm-12' >\n\
                                                        <p class='form-control-static'>" + data[i]['description'] + "</p>\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                            <td>\n\
                                                <div class='form-group'>\n\
                                                    <div class='col-sm-12 text-center' >\n\
                                                        <p class='form-control-static'>" + data[i]['last_sold'] + "</p>\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                            <td>\n\
                                                <div class='form-group'>\n\
                                                    <div class='col-sm-12 text-center'>\n\
                                                        <p class='form-control-static'>" + data[i]['cur_stock'] + "</p>\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                            <td>\n\
                                                <div class='form-group'>\n\
                                                    <div class='col-sm-12 text-center'>\n\
                                                        <p class='form-control-static'>" + data[i]['max_allowed_stock'] + "</p>\n\
                                                        <input type='hidden' id='hddn_max_allowed_stock_" + id + "' value='" + data[i]['max_allowed_stock'] + "' />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                            <td>\n\
                                                <div class='form-group'>\n\
                                                    <div class='col-sm-12 text-right'>\n\
                                                        <p class='form-control-static'>" + data[i]['purchase_price'] + "</p>\n\
                                                        <input type='hidden' id='hddn_purchase_price_" + id + "' name='hddn_purchase_price_" + id + "' value='" + data[i]['purchase_price'] + "' />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                            <td>\n\
                                                <div class='form-group-sm'  >\n\
                                                    <div class='col-sm-12 text-center' id='block_quantity_ordered_" + id + "'>\n\
                                                        <input type='text' id='txt_quantity_ordered_" + id + "' name='txt_quantity_ordered_" + id + "' class='form-control text-right' maxlength='11' onchange='set_zero_row(\"" + id + "\")' disabled />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                            <td>\n\
                                                <div class='form-group-sm'>\n\
                                                    <div class='col-sm-12 wbbm-col-no-right-padding'>\n\
                                                        <input type='text' id='txt_amount_" + id + "' class='form-control text-right' readonly />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                        </tr>";
                                             
                            }//for
                            $('tbody#data-grid').html(html);
                        } else { //empty data set
                            var html="<tr><td colspan='9' align='center'><br/>There is no low stock to be ordered.</td></tr>";
                            $('tbody#data-grid').html(html);
                        }    
                      },
            error : function() {
                        var html="<tr><td colspan='9' align='center'><br/><span class='text-danger'>Error loading data</span></td></tr>";
                        $('tbody#data-grid').html(html);
                    }
        });//end of ajax function
    }
}

function calculate() {
    clear_errors();
    set_zero();
    var total_amount = 0.00;
    
    if(validate_data_grid()) {
        $('div.data-row').each(function() { 
            var id = $(this).attr('data-row-id');
            if($('#chk_select_book_' + id).is(':checked')){ //book is selected
                var amount = parseFloat($('#hddn_purchase_price_' + id).val()) * parseInt($('#txt_quantity_ordered_' + id).val());
                total_amount += amount;
                $('#txt_amount_' + id).val(amount.toFixed(2)); 
            }
        });
        $('#txt_total_amount').val(total_amount.toFixed(2));
    }
    
}//end of function

//initialization
$(function() {
    add_default_text();
    //enable submit button
    $('#btn_add_purchase').removeAttr('disabled');
});

/*end of file*/