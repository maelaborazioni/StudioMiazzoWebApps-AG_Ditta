/**
 * @properties={typeid:24,uuid:"3FC9F7F4-27AF-40F2-A88B-1789864F6484"}
 */
function getButtonObject()
{
	var btnObj = _super.getButtonObject();
	
		btnObj.btn_new = { visible: true, enabled: true };
		btnObj.btn_edit = { visible: true, enabled: true };
		btnObj.btn_delete = { visible: true, enabled: true };
		btnObj.btn_duplicate = { visible: false, enabled: false };
		
	return btnObj;
}