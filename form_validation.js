/*
+--------------------------------------------------------------------------
|	Web-based Bookstore Management for Wisdom Bookshop 
|	File: 		form_validation.js
|	Content:	Application-wide form validation definitions
+--------------------------------------------------------------------------
*/

/* -------- common functions ---------- */

    //clear all errors
    function clear_errors() {
        $("span.help-block").text("");
        $("*").removeClass("has-error");
    }//end of function

    //add error status for error-set elements
    function change_status() {
        $("span[id $='_error']").each(function(){
            if($(this).text().trim().length > 0) { //error has been set.		
                var elem_target = "#" + $(this).attr("data-block");
                $(elem_target).addClass("has-error");
            }
        });
    }//end of function	
	
    //run change_status when loading page to enable assisgning statuas for server side validation aswell.
    $(function(){
        change_status();
    });

/* ------- validation definitions ----------- */	
	
function is_empty(arg) { //the %s field is required
    if(arg == null){ return true;}
    arg = arg.trim();
    return arg.length == 0;
}

//numeric validation function [check emptiness saparately because empty are evaluated as zero!]

function is_currency(arg) { //The %s field must contain a currency value.
    var myReg = /^\d+(\.\d+)?$/;
    return myReg.test(arg) && Number(arg) >= 0;
}

function is_currency_no_zero(arg) { //The %s field must contain a currency value greater than zero.
    var myReg = /^\d+(\.\d+)?$/;
    return myReg.test(arg) && Number(arg) > 0;
}

function is_integer(arg) {
    var myreg =/^[\-+]?[0-9]+$/;
    return myreg.test(arg);
}

function is_natural(arg) { //The %s field must contain positive integer.
    var myreg =/^[0-9]+$/ ; 
    return myreg.test(arg);
}

function is_natural_no_zero(arg) { // The %s field must contain a number greater than zero.
    var myreg =/^[0-9]+$/ ; 
    return myreg.test(arg) && arg != 0;
}
			
function is_negative(arg) {
	return is_numeric(arg) && arg<0;
}

//---text validation functions ---------

function is_nic(arg) {	//The % field must contain a valid NIC number.
    var myreg1 = /^\d{9}[VvXx]$/ ;
    var myreg2 = /^\d{12}$/ ;
    if(myreg1.test(arg) || myreg2.test(arg)) {
        return true;
    } else {
        return false;
    };
}

function is_isbn(arg) {	//The % field must contain a 10 or 13 digits number.
    var myreg1 = /^\d{10}$/ ;
    var myreg2 = /^\d{13}$/ ;
    if(myreg1.test(arg) || myreg2.test(arg)) {
        return true;
    } else {
        return false;
    };
}
			
function is_cheque(arg) { //The % field must conatin six digits.
    var myReg = /^\d{6}$/;
    return myReg.test(arg);
}

function is_email(arg) { //The % field must conatin a valid email address.
    var myReg = /^[A-Za-z0-9\!\#\$\%\'\*\+\-\/\=\?\^\_\`\{\|\}\~]([A-Za-z0-9\!\#\$\%\'\*\+\-\/\=\?\^\_\`\{\|\}\~]\.?)*[A-Za-z0-9\!\#\$\%\'\*\+\-\/\=\?\^\_\`\{\|\}\~]+@[A-Za-z0-9\!\#\$\%\'\*\+\-\/\=\?\^\_\`\{\|\}\~]+([A-Za-z0-9\!\#\$\%\'\*\+\-\/\=\?\^\_\`\{\|\}\~]\.?)*[A-Za-z0-9\!\#\$\%\'\*\+\-\/\=\?\^\_\`\{\|\}\~]+\.[A-Za-z]{2,}$/ ;
    return myReg.test(arg);
}
	
//end of file	