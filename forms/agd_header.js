/**
 * @properties={typeid:24,uuid:"5BCA5B71-546F-4B17-8C44-EADA13937EC0"}
 */
function getButtonObject()
{
	var _enabled = globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA);
	var btnObj = _super.getButtonObject();
	
		btnObj.btn_new = { visible: _enabled, enabled: _enabled };
		btnObj.btn_edit = { visible: _enabled, enabled: _enabled };
		btnObj.btn_delete = { visible: _enabled, enabled: _enabled };
		btnObj.btn_duplicate = { visible: false, enabled: false };
		
	return btnObj;
}

/** *
 * @param _event
 *
 * @properties={typeid:24,uuid:"EF7AB10C-AA08-41AA-8CAD-017A6E4D2A46"}
 */
function dc_rec_next(_event)
{
	if(foundset.getSelectedIndex() == foundset.getSize())
	   globals.ma_utl_showInfoDialog("E\' stato raggiunto l\'ultima ditta.","Vai alla ditta successivo");
	else
	  _super.dc_rec_next(_event);
}

/** *
 * @param _event
 *
 * @properties={typeid:24,uuid:"7E9C2E93-55FC-4EEA-B112-988689790FEB"}
 */
function dc_rec_prev(_event) {
	
	if(foundset.getSelectedIndex() == 1)
	   globals.ma_utl_showInfoDialog("E\' stato raggiunto la prima ditta.","Vai alla ditta precedente");
	else
	  _super.dc_rec_prev(_event)
}
