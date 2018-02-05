
/**
 *
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 *
 * @properties={typeid:24,uuid:"848351CE-E58A-457F-8C07-6E5641D528A0"}
 */
function dc_new(_event, _triggerForm, _forceForm)
{
	if(foundset.ditte_to_ditte_inailgenerale && foundset.ditte_to_ditte_inailgenerale.getSize())
	{
		if(foundset.ditte_to_ditte_inailposizioni && foundset.ditte_to_ditte_inailposizioni.getSize())
		{
			var frm = forms.agd_inail_vocitariffa_dtl_edit;
			frm._isInEdit = false;
		    globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova voce di tariffa INAIL');
		}
		else
		{
			var frmPos = forms.agd_inail_posizione_dtl_edit;
			globals.ma_utl_showFormInDialog(frmPos.controller.getName(),'Inserisci una nuova posizione INAIL');
		}
	}
	else
	{
		var frmInail = forms.agd_inail_dati_generali_dtl_edit;
	    globals.ma_utl_showFormInDialog(frmInail.controller.getName(),'Inserisci una nuova sede INAIL'); 
	}
}

/**
*
* @param event
* @param triggerForm
* @param forceForm
*
* @properties={typeid:24,uuid:"8972C134-CC2F-46C8-A89E-FD3490013DB6"}
*/
function dc_edit(event, triggerForm, forceForm) 
{
	if(foundset.ditte_to_ditte_inailposizioni && foundset.ditte_to_ditte_inailposizioni.getSize()
		&& foundset.ditte_to_ditte_inailposizioni.ditte_inailposizioni_to_ditte_inailvocitariffa && foundset.ditte_to_ditte_inailposizioni.ditte_inailposizioni_to_ditte_inailvocitariffa.getSize())
	{
		var frm = forms.agd_inail_vocitariffa_dtl_edit;
		frm._isInEdit = true;
		frm._idInailVociTariffa = foundset.ditte_to_ditte_inailposizioni.ditte_inailposizioni_to_ditte_inailvocitariffa.iddittainailvocetariffa;
	    globals.ma_utl_showFormInDialog(frm.controller.getName(),'Modifica la voce di tariffa INAIL');
	}
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
* @param {Boolean} _noConfirm
*
* @properties={typeid:24,uuid:"1CC245F1-0A19-4807-A6BA-B45665632394"}
*/
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	globals.ma_utl_showInfoDialog('Under construction...');
}
