/**
 * @properties={typeid:24,uuid:"B0509904-BB8D-4C3A-BB50-48F3572395C2"}
 */
function gotoEdit()
{
	elements.btn_edit.enabled = false
	elements.btn_delete.enabled = false
}

/**
 * @properties={typeid:24,uuid:"3044AD4D-7DE2-4D45-B7CA-9104756D4C64"}
 */
function gotoBrowse()
{
	elements.btn_edit.enabled = true
	elements.btn_delete.enabled = true
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {JSFoundset} _foundset
 * @param {Boolean} _multiDelete
 *
 * @properties={typeid:24,uuid:"3051FCAD-FA5E-4158-9079-0119E2C8DC05"}
 */
function dc_delete_pre(_foundset, _multiDelete)
{
//	_super.dc_delete_pre(_foundset,_multiDelete)
//	// Elimina i responsabili per l'archivio eliminato.
//	if(_foundset != null && _foundset.privacy_dittatabarchivio_to_privacy_archivio != null && _foundset.privacy_dittatabarchivio_to_privacy_archivio.getSize() > 0)
//	{
//		var _answer = globals.ma_utl_showYesNoQuestion('I responsabili assegnati all\'archivio selezionato saranno rimossi. Continuare?','i18n:hr.msg.attention')
//		if(!_answer)
//		{
//			return -1
//		}
//	}
//	
//	return 0
}

/**
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"616F219C-CA27-4574-A209-30AD08E15AFA"}
 */
function _editArchivio(_event)
{
//	globals.ma_utl_showEditDialog(forms.aggiungi_archivio.controller.getName(),foundset,'HR_Req_archivio','Modifica archivio')
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _triggerForm
 * @param _forceForm
 * @param _noConfirm
 *
 * @properties={typeid:24,uuid:"E877B07D-9F77-4F4C-83FD-F7F513EE1312"}
 */
function dc_delete(event, _triggerForm, _forceForm, _noConfirm) {
//	return _super.dc_delete(event, _triggerForm, controller.getName())
}

