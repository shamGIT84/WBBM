    <?php $this->load->view('templates/header_temp'); ?>
    <title>Administration | WISDOM Books</title>
    <style type="text/css"></style>

    <script type="text/javascript" src="<?php echo $this->config->item('js'). 'form_validation.js';?>"></script>
    <script type="text/javascript" src="<?php echo $this->config->item('js'). 'validation/add_user.js';?>"></script>
	
</head>
<body>
    <section class="container-fluid">
        <!--main menu-->
        <?php $this->load->view('templates/menu_temp'); ?>
        
        <!--main area-->
        <div class="row wbbm-application-main">
            <section class="col-sm-12">

                <br/>
                <section class="row">
                    <div class="col-sm-12">
                        <ul class="nav nav-tabs">
                            <li><a href="<?php echo site_url('administration'); ?>" >Users</a></li>
                            <li class="active" ><a>New User</a></li>
                            <li><a href="<?php echo site_url('administration/maintenance'); ?>" >Maintenance</a></li>
                        </ul>
                    </div>
                </section>

                <!--form-->
                <br/><br/>
                <section class="row">
                    <div class="col-sm-10 col-sm-offset-1">
                        <form class="form-horizontal" action="<?php echo site_url('administration/add_user'); ?>" method="post" onsubmit="return validate_add_user()">
                            <div class="form-group">
                                <label class="col-sm-3 text-right"><span class="form-data-required">* </span>NIC No <br/><span style="font-weight:normal;color:gray">Will be taken as User ID</span></label>
                                <div class="col-sm-4" id="block_nic">
                                    <input type="text" id="txt_nic" name="txt_nic" class="form-control"  value="<?php echo set_value("txt_nic"); ?>" maxlength="12" autofocus/>
                                    <span class="help-block" id="txt_nic_error" data-block="block_nic"><?php echo form_error("txt_nic"); ?></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 text-right"><span class="form-data-required">* </span>User Full Name</label>
                                <div class="col-sm-4" id="block_first_name">
                                    <input type="text" id="txt_first_name" name="txt_first_name" class="form-control" placeholder="first name" maxlength="30" value="<?php echo set_value("txt_first_name"); ?>"  />
                                    <span class="help-block" id="txt_first_name_error" data-block="block_first_name"></span>
                                </div>
                                <div class="col-sm-4" id="block_last_name">
                                    <input type="text" id="txt_last_name" name="txt_last_name" class="form-control" placeholder="last name" maxlength="70" value="<?php echo set_value("txt_last_name"); ?>" />
                                    <span class="help-block" id="txt_last_name_error" data-block="block_last_name"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 text-right"><span class="form-data-required">* </span>Email</label>
                                <div class="col-sm-5" id="block_email">
                                    <input type="text" id="txt_email" name="txt_email" class="form-control"  value="<?php echo set_value("txt_email"); ?>" maxlength="250"/>
                                    <span class="help-block" id="txt_email_error" data-block="block_email"><?php echo form_error("txt_email"); ?></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 text-right"><span class="form-data-required">* </span>Designation</label>
                                <div class="col-sm-4" id="block_designation">
                                    <input type="text" id="txt_designation" name="txt_designation" class="form-control"  value="<?php echo set_value("txt_designation"); ?>" />
                                    <span class="help-block" id="txt_designation_error" data-block="block_designation"><?php echo form_error("txt_designation"); ?></span>
                                </div>
                            </div>
                            <div class="form-group" id="block_user_role">
                                <label class="col-sm-3 text-right"><span class="form-data-required">* </span>User Role</label>
                                <div class="col-sm-3">
                                    <select id="lst_user_role" name="lst_user_role" class="form-control">
                                       <option value="operator" <?php echo set_select('lst_user_role', 'operator', TRUE); ?> >Operator</option>
                                       <option value="manager" <?php echo set_select('lst_user_role', 'manager'); ?> >Manager</option>
                                       <?php
                                            if($user_role == 'super-admin') {
                                                echo "<option value='admin' " . set_select('lst_user_role', 'admin') . ">Admin</option>" ;
                                            }
                                       ?>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-8 col-sm-offset-3">
                                    <button id="btn_add_user" type="submit" class="btn btn-primary" disabled > Add User </button>
                                    <button type="reset" class="btn btn-primary" onclick="clear_errors()"> Clear Details </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <br/><br/>

            </section><!--end of page content-->
        </div><!--end of main area-->

        <!--page footer-->
        <?php $this->load->view('templates/footer_temp'); ?>