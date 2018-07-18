function validate_add_purchase_return() {

    //disable button
    btn_disable('#btn_add_purchase_return');

    var status = true;
    var val ;
    var err ;
    
    clear_errors();

    //validate agent field
    val = $("#lst_agent_id").val()
    err = $("#lst_agent_id_error");
    if(is_empty(val)) {
        err.text("Agent field is required.");
        status = false;
    }

    //validate data grid
    err = $("#error_text");
    if($("input[name^=chk_select_return_]:checked").length == 0) {
        err.text("At least one sales return must be selected to order.");
        status = false;
    }

    //add error status for error elements
    change_status();

    //change button status
    if(!status) {
        btn_enable('#btn_add_purchase_return');
    }

    return status;

}//end of function

function add_default_text() {
    var html="<tr><td colspan='5' align='center'><br/>Select the Agent.</td></tr>";
    $('tbody#data-grid').html(html);
}//end of function

function populate_data_grid(obj) {
    var agent_id = $(obj).val();
    
    if(is_empty(agent_id)) { //agent hasn't selected
        add_default_text();
    } else {
        //waiting text untill data retrieve and populated
        var html="<tr><td colspan='5' align='center'><br/>Loading........</td></tr>";
        $('tbody#data-grid').html(html);
        
        var dest_url =  base_url + "/" + agent_id ;
        $.ajax({
            url: dest_url,
            dataType: 'json',
            success : function(data){
                        if( data.length > 0 ){
                            var html = '';
                            for(i=0;i<data.length;i++){
                                var id = data[i]['return_id'];
                                
                                html  +="<tr>\n\
                                            <td class='text-center'>\n\
                                                <div class='form-group form-group-sm data-row' data-row-id='" + id + "' >\n\
                                                    <div class='col-sm-7 text-center' >\n\
                                                        <input type='checkbox' id='chk_select_return_" + id + "' name='chk_select_return_" + id + "' data-row='" + id + "' value='" + id + "' class='form-control'  checked />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                            <td>\n\
                                                <div class='form-group'>\n\
                                                    <div class='col-sm-12 text-center' >\n\
                                                        <p class='form-control-static'>" + data[i]['sales_id'] + "</p>\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                            <td>\n\
                                                <div class='form-group'>\n\
                                                    <div class='col-sm-12 text-center' >";
                                                        if(data[i]['book_status'] == 0) {
                                                            html += "<p class='form-control-static text-danger'>" + data[i]['sku'] + "</p>";
                                                        } else {
                                                            html += "<p class='form-control-static'>" + data[i]['sku'] + "</p>";
                                                        }
                                    html +=        "</div>\n\
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
                                                        <p class='form-control-static'>" + data[i]['quantity_returned'] + "</p>\n\
                                                    </div>\n\
                                                </div>\n\
                                            </td>\n\
                                        </tr>";
                                             
                            }//for
                            $('tbody#data-grid').html(html);
                        } else { //empty data set
                            var html="<tr><td colspan='5' align='center'><br/>There is no sales returns to be ordered.</td></tr>";
                            $('tbody#data-grid').html(html);
                        }    
                      },
            error : function() {
                        var html="<tr><td colspan='5' align='center'><br/><span class='text-danger'>Error loading data</span></td></tr>";
                        $('tbody#data-grid').html(html);
                    }
        });//end of ajax function
    }
}

//initialization
$(function() {
    add_default_text();
    //enable submit button
    $('#btn_add_purchase_return').removeAttr('disabled');
});

/*end of file*/