/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"B7FD5907-D4DE-4D6A-A781-4EB311DD9B1D",variableType:-4}
 */
var vDeleteResponsabili = false;

/**
 * @param {JSFoundset} _foundset
 * @return none
 *
 * @properties={typeid:24,uuid:"E0E5F21E-7694-4C30-9A63-1EEF227A9559"}
 */
function filterAteco(_foundset)
{
	_foundset.addFoundSetFilterParam('codtipo','=','ATE','livelliAtecoFilter')
	return _foundset
}

/**
 * @param {JSFoundset} _foundset
 * @return none
 *
 * @properties={typeid:24,uuid:"FF47C430-7D30-42A4-9A2C-7C85215A8403"}
 */
function filterIncendio(_foundset)
{
	_foundset.addFoundSetFilterParam('codtipo','=','INC','livelliIncendioFilter')
	return _foundset
}

/**
 * @properties={typeid:24,uuid:"6E01BA2D-44F8-464C-AF6A-8FE9F93D1250"}
 */
function getButtonObject()
{
	var _btnObj = _super.getButtonObject()
	_btnObj.btn_new = new Object()
	_btnObj.btn_new.enabled = foundset && foundset.getSize() > 0 ? false : true
	
	_btnObj.btn_edit = new Object()
	_btnObj.btn_edit.enabled = foundset && foundset.getSize() > 0 ? true : false;
	
//	_btnObj.btn_delete = new Object()
//	_btnObj.btn_delete.enabled = false
	
	_btnObj.btn_duplicate = new Object()
	_btnObj.btn_duplicate.enabled = false
	
	return _btnObj
}

/**
 * @properties={typeid:24,uuid:"A9BFC701-E6A8-47D3-9167-F8E3CDA6B5CB"}
 */
function dc_save_post(_foundset)
{
	return deleteResponsabili() ? 0 : -1;
}

/**
 * @param {JSFoundset} _foundset
 * @param {Boolean} _multiDelete
 *
 * @properties={typeid:24,uuid:"FF4BAF78-12B8-42F2-A332-FE48BE584613"}
 */
function dc_delete_pre(_foundset,_multiDelete)
{
	if(_super.dc_delete_pre(_foundset, _multiDelete) !== -1)
	{
		return deleteResponsabili() ? 0 : -1;
	}
	
	return -1;
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"96E1ADE2-6CB3-4407-9A57-C661A60CB9A7"}
 */
function setDeleteResponsabili(oldValue, newValue, event) 
{
	vDeleteResponsabili = true; // oldValue !== newValue is always true
	return vDeleteResponsabili;
}

/**
 * @properties={typeid:24,uuid:"C9DA7A11-C4CD-4E8A-8CE0-877284BE3A9C"}
 * @AllowToRunInFind
 */
function deleteResponsabili()
{
	var success = false
	var answer = false;
	
	/**
	 * Find all active related roles
	 */
//	var sicurezza2Fs = sicurezza_datigenerali_to_ditte.ditte_to_ditte_funzionipersone_sicurezza2.duplicateFoundSet();
//	var sicurezza3Fs = sicurezza_datigenerali_to_ditte.ditte_to_ditte_funzionipersone_sicurezza3.duplicateFoundSet();
//	
//	if(sicurezza2Fs)
//	{
//		if(sicurezza2Fs.find())
//		{
//			sicurezza2Fs.datarevoca = '^||>=' + globals.formatForFind(globals.TODAY);
//			sicurezza2Fs.datacessazione = '^||<=' + globals.formatForFind(globals.TODAY);
//			
//			sicurezza2Fs.search();
//		}
//		else
//		{
//			return false;
//		}
//	}
//	
//	if(sicurezza3Fs && sicurezza3Fs.find())
//	{
//		if(sicurezza3Fs.find())
//		{
//			sicurezza3Fs.datarevoca = '^||>=' + globals.formatForFind(globals.TODAY);
//			sicurezza3Fs.datacessazione = '^||<=' + globals.formatForFind(globals.TODAY);
//			
//			sicurezza3Fs.search();
//		}
//		else
//		{
//			return false;
//		}
//	}
	
	var sicurezzaFs = sicurezza_datigenerali_to_ditte && sicurezza_datigenerali_to_ditte.ditte_to_ditte_funzionipersone_sicurezza && sicurezza_datigenerali_to_ditte.ditte_to_ditte_funzionipersone_sicurezza.duplicateFoundSet();
		
	if(sicurezzaFs)
	{
		if(sicurezzaFs.find())
		{
			sicurezzaFs.datarevoca = '^||>=' + globals.formatForFind(globals.TODAY);
			sicurezzaFs.datacessazione = '^||>=' + globals.formatForFind(globals.TODAY);
			
			sicurezzaFs.search();
		}
		else
		{
			return false;
		}
	}
	
	if(vDeleteResponsabili && sicurezzaFs && sicurezzaFs.getSize() > 0)
	{
		answer = globals.ma_utl_showYesNoQuestion('Le impostazioni di gestione della sicurezza sono state modificate.<br/>I responsabili attivi saranno rimossi. Continuare?', 'i18n:servoy.general.warning');
		if(answer)
		{
			success = sicurezzaFs.deleteAllRecords();
		}
	}
	else
	{
		success = true
	}
	
	return success;
}

/**
 * @properties={typeid:24,uuid:"1300A14C-D098-4103-86EF-A581508148E4"}
 */
function gotoBrowse()
{
	_super.gotoBrowse();
	globals.disableFunzioni(datorenominato === 1);
}
