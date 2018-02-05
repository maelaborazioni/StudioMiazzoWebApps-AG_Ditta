/**
 * @properties={typeid:24,uuid:"D7BBA87D-C50A-483E-BD5B-DCF74864D5AF"}
 */
function getButtonObject()
{
	var _enabled = globals.getTipologiaDitta(idditta) == globals.Tipologia.ESTERNA
	               || globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA);
	
	var btnObj = _super.getButtonObject();
	
		btnObj.btn_new = { enabled: false };
		btnObj.btn_edit = { enabled: _enabled };
		btnObj.btn_delete = { enabled: false };
		btnObj.btn_duplicate = { enabled: false };
		
	return btnObj;
}

/**
 * @param _rec
 *
 * @properties={typeid:24,uuid:"E0BF4EC8-7C84-4B94-9BBB-7C2A1BC35C7B"}
 */
function updateTipoSoggetto(_rec)
{
	codtiposoggetto = _rec['codice'];
}

/**
 * @param _rec
 *
 * @properties={typeid:24,uuid:"F05F4901-82A9-47FF-A433-A9587A023E91"}
 */
function updateNaturaGiuridica(_rec)
{
	codnaturagiuridica = _rec['codice'];
}
/**
*
* @param {Boolean} firstShow
* @param {JSEvent} event
* @param {Boolean} svyNavBaseOnShow
*
* @properties={typeid:24,uuid:"ADFAAB20-7503-4C3E-81EE-83BEB25B43A5"}
*/
function onShowForm(firstShow, event, svyNavBaseOnShow) 
{
	controller.readOnly = true;
	return _super.onShowForm(firstShow, event, false)
}
