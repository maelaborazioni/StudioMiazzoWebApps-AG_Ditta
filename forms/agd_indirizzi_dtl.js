/**
 * @properties={typeid:24,uuid:"1B1A29A7-FD8A-4EBB-92D3-1D89A5897843"}
 */
function getButtonObject()
{
	var _enabled = globals.getTipologiaDitta(idditta) == globals.Tipologia.ESTERNA
	               || globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA);
	
	var btnObj = _super.getButtonObject();
	
		btnObj.btn_new = { enabled: _enabled };
		btnObj.btn_edit = { enabled: _enabled };
		btnObj.btn_delete = { enabled: _enabled };
		btnObj.btn_duplicate = { enabled: false };
		
	return btnObj;
}

/**
 * @param _rec
 *
 * @properties={typeid:24,uuid:"D290B6FD-5C17-4F89-AD36-F80410E00A9C"}
 */
function updateComune(_rec)
{
	codcomune = _rec['codcomune'];
}