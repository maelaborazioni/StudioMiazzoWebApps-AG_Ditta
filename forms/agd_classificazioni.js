/**
 * @properties={typeid:24,uuid:"631969DD-D76C-40A8-9FF8-75A2448C3ED7"}
 */
function getButtonObject()
{
	var _enabled = globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA);
	
	var btnObj = _super.getButtonObject();
	
		btnObj.btn_new = { enabled: _enabled };
		btnObj.btn_edit = { enabled: _enabled };
		btnObj.btn_delete = { enabled: _enabled };
		btnObj.btn_duplicate = { visible:false, enabled: false };
		
	return btnObj;
}
